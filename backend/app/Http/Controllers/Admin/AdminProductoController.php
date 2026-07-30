<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Categoria;
use App\Models\especificaciones;
use App\Models\Producto;
use App\Models\ProductoEspecificacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AdminProductoController extends Controller
{
    private function r2Url(string $path): string
    {
        $base = rtrim(config('filesystems.disks.r2.url', env('R2_PUBLIC_URL', '')), '/');

        return $base.'/'.$path;
    }

    public function index(Request $request)
    {
        $query = Producto::with('categoria')->latest();

        if ($request->filled('search')) {
            $query->where('nombre', 'like', '%'.$request->search.'%');
        }

        if ($request->filled('categoria')) {
            $query->where('categoria_id', $request->categoria);
        }

        $productos = $query->paginate(15)->withQueryString();
        $categorias = Categoria::orderBy('nombre')->get();

        return view('admin.productos.index', compact('productos', 'categorias'));
    }

    public function create()
    {
        $categorias = Categoria::orderBy('nombre')->get();
        $especificaciones = especificaciones::orderBy('nombre')->get();

        return view('admin.productos.create', compact('categorias', 'especificaciones'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'precio' => 'required|numeric|min:0.01',
            'stock' => 'nullable|integer|min:0',
            'descripcion' => 'nullable|string',
            'descuento' => 'nullable|numeric|min:0|max:100',
            'categoria_id' => 'required|exists:categorias,id',
            'foto' => 'required|image|max:4096',
            'especificaciones' => 'nullable|array',
            'especificaciones.*.especificacion_id' => 'required|exists:especificaciones,id',
            'especificaciones.*.valor' => 'required|string|max:255',
        ]);

        $path = $request->file('foto')->storePublicly('productos', 'r2');

        if (! $path) {
            return back()->withErrors(['foto' => 'Error al subir la foto a R2. Revisa las credenciales y permisos.'])->withInput();
        }

        $producto = Producto::create([
            'nombre' => $validated['nombre'],
            'precio' => $validated['precio'],
            'stock' => $validated['stock'] ?? 0,
            'descripcion' => $validated['descripcion'] ?? null,
            'descuento' => $validated['descuento'] ?? 0,
            'categoria_id' => $validated['categoria_id'],
            'foto' => $this->r2Url($path),
        ]);

        if (! empty($validated['especificaciones'])) {
            foreach ($validated['especificaciones'] as $spec) {
                ProductoEspecificacion::create([
                    'producto_id' => $producto->id,
                    'especificacion_id' => $spec['especificacion_id'],
                    'valor' => $spec['valor'],
                ]);
            }
        }

        return redirect()->route('admin.productos.index')
            ->with('success', 'Producto creado correctamente.');
    }

    public function edit(Producto $producto)
    {
        $categorias = Categoria::orderBy('nombre')->get();
        $especificaciones = especificaciones::orderBy('nombre')->get();
        $producto->load('productoEspecificaciones.especificacion');

        return view('admin.productos.edit', compact('producto', 'categorias', 'especificaciones'));
    }

    public function update(Request $request, Producto $producto)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'precio' => 'required|numeric|min:0.01',
            'stock' => 'nullable|integer|min:0',
            'descripcion' => 'nullable|string',
            'descuento' => 'nullable|numeric|min:0|max:100',
            'categoria_id' => 'required|exists:categorias,id',
            'foto' => 'nullable|image|max:4096',
            'especificaciones' => 'nullable|array',
            'especificaciones.*.especificacion_id' => 'required|exists:especificaciones,id',
            'especificaciones.*.valor' => 'required|string|max:255',
        ]);

        $data = [
            'nombre' => $validated['nombre'],
            'precio' => $validated['precio'],
            'stock' => $validated['stock'] ?? 0,
            'descripcion' => $validated['descripcion'] ?? null,
            'descuento' => $validated['descuento'] ?? 0,
            'categoria_id' => $validated['categoria_id'],
        ];

        if ($request->hasFile('foto')) {
            if ($producto->foto && ! str_starts_with($producto->foto, 'http')) {
                Storage::disk('r2')->delete($producto->foto);
            }
            $newPath = $request->file('foto')->storePublicly('productos', 'r2');
            if (! $newPath) {
                return back()->withErrors(['foto' => 'Error al subir la foto a R2. Revisa las credenciales y permisos.'])->withInput();
            }
            $data['foto'] = $this->r2Url($newPath);
        }

        $producto->update($data);

        $producto->productoEspecificaciones()->delete();

        if (! empty($validated['especificaciones'])) {
            foreach ($validated['especificaciones'] as $spec) {
                ProductoEspecificacion::create([
                    'producto_id' => $producto->id,
                    'especificacion_id' => $spec['especificacion_id'],
                    'valor' => $spec['valor'],
                ]);
            }
        }

        return redirect()->route('admin.productos.index')
            ->with('success', 'Producto actualizado correctamente.');
    }

    public function destroy(Producto $producto)
    {
        if ($producto->foto && ! str_starts_with($producto->foto, 'http')) {
            Storage::disk('r2')->delete($producto->foto);
        }

        $producto->delete();

        return redirect()->route('admin.productos.index')
            ->with('success', 'Producto eliminado correctamente.');
    }
}
