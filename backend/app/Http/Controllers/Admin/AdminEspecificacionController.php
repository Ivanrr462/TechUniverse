<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\especificaciones;
use Illuminate\Http\Request;

class AdminEspecificacionController extends Controller
{
    public function index(Request $request)
    {
        $query = especificaciones::withCount('productos');

        if ($request->filled('search')) {
            $query->where('nombre', 'like', '%'.$request->search.'%');
        }

        $especificaciones = $query->orderBy('nombre')->paginate(20)->withQueryString();

        return view('admin.especificaciones.index', compact('especificaciones'));
    }

    public function create()
    {
        return view('admin.especificaciones.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255|unique:especificaciones,nombre',
        ]);

        especificaciones::create(['nombre' => $request->nombre]);

        return redirect()->route('admin.especificaciones.index')
            ->with('success', 'Especificación creada correctamente.');
    }

    public function edit(especificaciones $especificacione)
    {
        return view('admin.especificaciones.edit', ['especificacion' => $especificacione]);
    }

    public function update(Request $request, especificaciones $especificacione)
    {
        $request->validate([
            'nombre' => 'required|string|max:255|unique:especificaciones,nombre,'.$especificacione->id,
        ]);

        $especificacione->update(['nombre' => $request->nombre]);

        return redirect()->route('admin.especificaciones.index')
            ->with('success', 'Especificación actualizada correctamente.');
    }

    public function destroy(especificaciones $especificacione)
    {
        $especificacione->delete();

        return redirect()->route('admin.especificaciones.index')
            ->with('success', 'Especificación eliminada correctamente.');
    }
}
