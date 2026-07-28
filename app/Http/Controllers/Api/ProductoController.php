<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductoResource;
use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

/**
 * @OA\Tag(
 *     name="Productos",
 *     description="Gestión de productos"
 * )
 *
 * @OA\Schema(
 *     schema="Producto",
 *     type="object",
 *
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="nombre", type="string", example="Laptop Gaming"),
 *     @OA\Property(property="precio", type="number", format="float", example=1500.00),
 *     @OA\Property(property="descuento", type="number", format="float", example=15.00),
 *     @OA\Property(property="precioDescuento", type="number", format="float", example=1275.00),
 *     @OA\Property(property="stock", type="integer", example=10),
 *     @OA\Property(property="descripcion", type="string", nullable=true, example="Descripcion del producto"),
 *     @OA\Property(property="modificado", type="string", nullable=true, example="2024-01-15 10:30:00"),
 *     @OA\Property(property="foto", type="string", nullable=true, example="https://cdn.example.com/productos/laptop.jpg"),
 *     @OA\Property(
 *         property="categoria",
 *         type="object",
 *         nullable=true,
 *         @OA\Property(property="nombre", type="string", example="Electronica")
 *     ),
 *     @OA\Property(
 *         property="especificaciones",
 *         type="array",
 *
 *         @OA\Items(
 *             type="object",
 *
 *             @OA\Property(property="nombre", type="string", example="RAM"),
 *             @OA\Property(property="valor", type="string", example="16GB")
 *         )
 *     )
 * )
 */
class ProductoController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/productos",
     *     summary="Listar productos con paginación",
     *     description="Retorna una lista paginada de productos, incluyendo su categoría y especificaciones. Permite ordenación opcional por precio o novedad.",
     *     tags={"Productos"},
     *
     *     @OA\Parameter(
     *         name="page",
     *         in="query",
     *         description="Número de página a obtener",
     *         required=false,
     *         example=1,
     *
     *         @OA\Schema(type="integer")
     *     ),
     *
     *     @OA\Parameter(
     *         name="sort",
     *         in="query",
     *         description="Criterio de ordenación opcional",
     *         required=false,
     *
     *         @OA\Schema(
     *             type="string",
     *             enum={"precio_asc", "precio_desc", "novedad_asc", "novedad_desc"}
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="Lista paginada de productos obtenida correctamente",
     *
     *         @OA\JsonContent(
     *             type="object",
     *
     *             @OA\Property(
     *                 property="data",
     *                 type="array",
     *
     *                 @OA\Items(ref="#/components/schemas/Producto")
     *             ),
     *
     *             @OA\Property(
     *                 property="meta",
     *                 type="object",
     *                 @OA\Property(property="current_page", type="integer", example=1),
     *                 @OA\Property(property="last_page", type="integer", example=5),
     *                 @OA\Property(property="per_page", type="integer", example=12),
     *                 @OA\Property(property="total", type="integer", example=60)
     *             )
     *         )
     *     )
     * )
     */
    public function index(Request $request)
    {
        $query = Producto::with('categoria', 'productoEspecificaciones.especificacion');

        $sortMap = [
            'precio_asc' => ['precio', 'asc'],
            'precio_desc' => ['precio', 'desc'],
            'novedad_asc' => ['updated_at', 'asc'],
            'novedad_desc' => ['updated_at', 'desc'],
        ];

        $sort = $request->query('sort');

        if ($sort && array_key_exists($sort, $sortMap)) {
            [$column, $direction] = $sortMap[$sort];
            $query->orderBy($column, $direction);
        }

        return ProductoResource::collection($query->paginate(12));
    }

    /**
     * @OA\Get(
     *     path="/api/productos/{id}",
     *     summary="Obtener un producto por ID",
     *     description="Retorna un producto específico con su categoría y especificaciones",
     *     tags={"Productos"},
     *
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID del producto",
     *
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="Producto encontrado",
     *
     *         @OA\JsonContent(ref="#/components/schemas/Producto")
     *     ),
     *
     *     @OA\Response(
     *         response=404,
     *         description="Producto no encontrado",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="error", type="string", example="No encontrado")
     *         )
     *     )
     * )
     */
    public function show(string $id)
    {
        $producto = Producto::with('categoria', 'productoEspecificaciones.especificacion')->find($id);

        if (! $producto) {
            return response()->json(['error' => 'No encontrado'], 404);
        }

        return new ProductoResource($producto);
    }

    /**
     * @OA\Get(
     *     path="/api/productos/count",
     *     summary="Contar total de productos",
     *     description="Retorna el número total de productos en la base de datos.",
     *     tags={"Productos"},
     *
     *     @OA\Response(
     *         response=200,
     *         description="Total de productos obtenido correctamente",
     *
     *         @OA\JsonContent(
     *             type="object",
     *
     *             @OA\Property(property="total", type="integer", example=60)
     *         )
     *     )
     * )
     */
    public function count()
    {
        return response()->json([
            'total' => Producto::count(),
        ]);
    }

    /**
     * @OA\Get(
     *     path="/api/productos/oferta",
     *     summary="Listar productos en oferta",
     *     description="Retorna una lista paginada de productos que tienen descuento mayor a 0.",
     *     tags={"Productos"},
     *
     *     @OA\Parameter(
     *         name="page",
     *         in="query",
     *         description="Número de página a obtener",
     *         required=false,
     *         example=1,
     *
     *         @OA\Schema(type="integer")
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="Lista paginada de productos en oferta obtenida correctamente",
     *
     *         @OA\JsonContent(
     *             type="object",
     *
     *             @OA\Property(
     *                 property="data",
     *                 type="array",
     *
     *                 @OA\Items(ref="#/components/schemas/Producto")
     *             ),
     *
     *             @OA\Property(
     *                 property="meta",
     *                 type="object",
     *                 @OA\Property(property="current_page", type="integer", example=1),
     *                 @OA\Property(property="last_page", type="integer", example=3),
     *                 @OA\Property(property="per_page", type="integer", example=12),
     *                 @OA\Property(property="total", type="integer", example=30)
     *             )
     *         )
     *     )
     * )
     */
    public function oferta()
    {
        $productos = Producto::with('categoria', 'productoEspecificaciones.especificacion')
            ->where('descuento', '>', 0);

        return ProductoResource::collection($productos->paginate(12));
    }

    /**
     * @OA\Post(
     *     path="/api/productos",
     *     summary="Crear un nuevo producto",
     *     description="Crea un producto nuevo con imagen subida a R2",
     *     tags={"Productos"},
     *     security={{"bearerAuth":{}}},
     *
     *     @OA\RequestBody(
     *         required=true,
     *
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *
     *             @OA\Schema(
     *                 required={"nombre", "precio", "categoria_id", "foto"},
     *
     *                 @OA\Property(property="nombre", type="string", maxLength=255, example="Laptop Gaming"),
     *                 @OA\Property(property="precio", type="number", format="float", minimum=0.01, example=1500.00),
     *                 @OA\Property(property="descripcion", type="string", maxLength=255, nullable=true, example="Descripción opcional"),
     *                 @OA\Property(property="categoria_id", type="integer", minimum=1, example=2),
     *                 @OA\Property(property="foto", type="string", format="binary", description="Imagen del producto (máx. 4MB)")
     *             )
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=201,
     *         description="Producto creado con éxito",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="mensaje", type="string", example="Producto creado con éxito"),
     *             @OA\Property(property="data", ref="#/components/schemas/Producto")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=422,
     *         description="Error de validación",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="message", type="string", example="The nombre field is required."),
     *             @OA\Property(property="errors", type="object")
     *         )
     *     )
     * )
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'precio' => 'required|numeric|min:0.01',
            'descripcion' => 'nullable|string|max:255',
            'categoria_id' => 'required|integer|min:1',
            'foto' => 'required|image|max:4096',
        ]);

        $path = $request->file('foto')->storePublicly('productos', 'r2');
        $fotoUrl = rtrim(config('filesystems.disks.r2.url', env('R2_PUBLIC_URL', '')), '/').'/'.$path;

        $producto = Producto::create([
            'nombre' => $validated['nombre'],
            'precio' => $validated['precio'],
            'descripcion' => $validated['descripcion'],
            'categoria_id' => $validated['categoria_id'],
            'foto' => $fotoUrl,
        ]);

        return response()->json([
            'mensaje' => 'Producto creado con éxito',
            'data' => new ProductoResource($producto->load('categoria', 'productoEspecificaciones.especificacion')),
        ], 201);
    }

    /**
     * @OA\Put(
     *     path="/api/productos/{id}",
     *     summary="Actualizar un producto",
     *     description="Actualiza los datos de un producto",
     *     tags={"Productos"},
     *     security={{"bearerAuth":{}}},
     *
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID del producto a actualizar",
     *
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *
     *     @OA\RequestBody(
     *         required=true,
     *
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *
     *             @OA\Schema(
     *
     *                 @OA\Property(property="nombre", type="string", maxLength=255, nullable=true, example="Laptop Pro"),
     *                 @OA\Property(property="precio", type="number", format="float", minimum=0.01, nullable=true, example=2000.00),
     *                 @OA\Property(property="descripcion", type="string", maxLength=255, nullable=true, example="Nueva descripción"),
     *                 @OA\Property(property="categoria_id", type="integer", minimum=1, nullable=true, example=3),
     *                 @OA\Property(property="stock", type="integer", minimum=0, nullable=true, example=10),
     *                 @OA\Property(property="foto", type="string", format="binary", nullable=true, description="Nueva imagen (máx. 4MB)")
     *             )
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="Producto actualizado correctamente",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="mensaje", type="string", example="Actualizado correctamente"),
     *             @OA\Property(property="data", ref="#/components/schemas/Producto")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=404,
     *         description="Producto no encontrado",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="error", type="string", example="No encontrado")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=422,
     *         description="Error de validación",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="message", type="string", example="The precio must be an integer."),
     *             @OA\Property(property="errors", type="object")
     *         )
     *     )
     * )
     */
    public function update(Request $request, string $id)
    {
        $producto = Producto::find($id);

        if (! $producto) {
            return response()->json(['error' => 'No encontrado'], 404);
        }

        $validated = $request->validate([
            'nombre' => 'nullable|string|max:255',
            'precio' => 'nullable|numeric|min:0.01',
            'descripcion' => 'nullable|string|max:255',
            'categoria_id' => 'nullable|integer|min:1',
            'stock' => 'nullable|integer|min:0',
            'foto' => 'nullable|image|max:4096',
        ]);

        if ($request->hasFile('foto')) {
            if ($producto->foto && ! str_starts_with($producto->foto, 'http')) {
                Storage::disk('r2')->delete($producto->foto);
            }
            $path = $request->file('foto')->storePublicly('productos', 'r2');
            $validated['foto'] = rtrim(config('filesystems.disks.r2.url', env('R2_PUBLIC_URL', '')), '/').'/'.$path;
        }

        $producto->update($validated);

        return response()->json([
            'mensaje' => 'Actualizado correctamente',
            'data' => new ProductoResource(
                $producto->load('categoria', 'productoEspecificaciones.especificacion')
            ),
        ], 200);
    }

    /**
     * @OA\Delete(
     *     path="/api/productos/{id}",
     *     summary="Eliminar un producto",
     *     description="Elimina un producto y su imagen del bucket R2",
     *     tags={"Productos"},
     *     security={{"bearerAuth":{}}},
     *
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID del producto a eliminar",
     *
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="Producto eliminado correctamente",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="mensaje", type="string", example="Eliminado correctamente")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=404,
     *         description="Producto no encontrado",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="error", type="string", example="No encontrado")
     *         )
     *     )
     * )
     */
    public function destroy(string $id)
    {
        $producto = Producto::find($id);

        if (! $producto) {
            return response()->json(['error' => 'No encontrado'], 404);
        }

        if ($producto->foto && ! str_starts_with($producto->foto, 'http')) {
            Storage::disk('r2')->delete($producto->foto);
        }

        $producto->delete();

        return response()->json(['mensaje' => 'Eliminado correctamente'], 200);
    }
}
