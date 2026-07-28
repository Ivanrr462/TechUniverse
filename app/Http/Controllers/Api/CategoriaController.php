<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoriaConProductosResource;
use App\Http\Resources\CategoriaResource;
use App\Models\Categoria;
use Illuminate\Http\Request;

/**
 * @OA\Tag(
 *     name="Categorias",
 *     description="Gestion de categorias"
 * )
 *
 * @OA\Schema(
 *     schema="Categoria",
 *     type="object",
 *
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="nombre", type="string", example="Electronica")
 * )
 *
 * @OA\Schema(
 *     schema="CategoriaConProductos",
 *     type="object",
 *
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="nombre", type="string", example="Electronica"),
 *     @OA\Property(
 *         property="productos",
 *         type="array",
 *
 *         @OA\Items(
 *             type="object",
 *
 *             @OA\Property(property="id", type="integer", example=1),
 *             @OA\Property(property="stock", type="integer", example=10),
 *             @OA\Property(property="nombre", type="string", example="Laptop Gaming"),
 *             @OA\Property(property="foto", type="string", nullable=true, example="https://cdn.example.com/productos/laptop.jpg"),
 *             @OA\Property(property="descripcion", type="string", nullable=true, example="Descripcion del producto"),
 *             @OA\Property(property="precio_unitario", type="number", format="float", example=1500.00),
 *             @OA\Property(property="descuento", type="number", format="float", example=15.00),
 *             @OA\Property(property="precioDescuento", type="number", format="float", example=1275.00)
 *         )
 *     )
 * )
 */
class CategoriaController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/categoria",
     *     summary="Listar todas las categorias",
     *     description="Retorna una lista de todas las categorias",
     *     tags={"Categorias"},
     *
     *     @OA\Response(
     *         response=200,
     *         description="Lista de categorias obtenida correctamente",
     *
     *         @OA\JsonContent(
     *             type="array",
     *
     *             @OA\Items(ref="#/components/schemas/Categoria")
     *         )
     *     )
     * )
     */
    public function index()
    {
        $categoria = Categoria::get();

        return CategoriaResource::collection($categoria);
    }

    /**
     * @OA\Get(
     *     path="/api/categoria/productos",
     *     summary="Listar todas las categorias con sus productos",
     *     description="Retorna una lista de todas las categorias incluyendo sus productos",
     *     tags={"Categorias"},
     *
     *     @OA\Response(
     *         response=200,
     *         description="Lista de categorias con productos obtenida correctamente",
     *
     *         @OA\JsonContent(
     *             type="array",
     *
     *             @OA\Items(ref="#/components/schemas/CategoriaConProductos")
     *         )
     *     )
     * )
     */
    public function indexProductos()
    {
        $categoria = Categoria::with('productos')->get();

        return CategoriaConProductosResource::collection($categoria);
    }

    /**
     * @OA\Post(
     *     path="/api/categoria",
     *     summary="Crear una nueva categoria",
     *     description="Crea una nueva categoria",
     *     tags={"Categorias"},
     *     security={{"bearerAuth":{}}},
     *
     *     @OA\RequestBody(
     *         required=true,
     *
     *         @OA\JsonContent(
     *             required={"nombre"},
     *
     *             @OA\Property(property="nombre", type="string", maxLength=255, example="Electronica")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=201,
     *         description="Categoria creada con exito",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="mensaje", type="string", example="Categoria creada con exito"),
     *             @OA\Property(property="data", ref="#/components/schemas/Categoria")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=422,
     *         description="Error de validacion",
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
        ]);

        $categoria = Categoria::create($validated);

        return response()->json([
            'mensaje' => 'Categoria creada con éxito',
            'data' => new CategoriaResource($categoria),
        ], 201);
    }

    /**
     * @OA\Get(
     *     path="/api/categoria/{categoria}",
     *     summary="Obtener una categoria por ID",
     *     description="Retorna una categoria especifica con sus productos",
     *     tags={"Categorias"},
     *
     *     @OA\Parameter(
     *         name="categoria",
     *         in="path",
     *         required=true,
     *         description="ID de la categoria",
     *
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="Categoria encontrada",
     *
     *         @OA\JsonContent(ref="#/components/schemas/CategoriaConProductos")
     *     ),
     *
     *     @OA\Response(
     *         response=404,
     *         description="Categoria no encontrada",
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
        $categoria = Categoria::find($id);

        if (! $categoria) {
            return response()->json(['error' => 'No encontrado'], 404);
        }

        $productos = $categoria->productos()->paginate(12);

        $categoria->productos = $productos;

        return new CategoriaConProductosResource($categoria);
    }

    /**
     * @OA\Put(
     *     path="/api/categoria/{categoria}",
     *     summary="Actualizar una categoria",
     *     description="Actualiza el nombre de una categoria existente",
     *     tags={"Categorias"},
     *     security={{"bearerAuth":{}}},
     *
     *     @OA\Parameter(
     *         name="categoria",
     *         in="path",
     *         required=true,
     *         description="ID de la categoria a actualizar",
     *
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *
     *     @OA\RequestBody(
     *         required=true,
     *
     *         @OA\JsonContent(
     *             required={"nombre"},
     *
     *             @OA\Property(property="nombre", type="string", maxLength=255, example="Informatica")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="Categoria actualizada correctamente",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="mensaje", type="string", example="Actualizado correctamente"),
     *             @OA\Property(property="data", ref="#/components/schemas/Categoria")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=404,
     *         description="Categoria no encontrada",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="error", type="string", example="No encontrado")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=422,
     *         description="Error de validacion",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="message", type="string", example="The nombre field is required."),
     *             @OA\Property(property="errors", type="object")
     *         )
     *     )
     * )
     */
    public function update(Request $request, string $id)
    {
        $categoria = Categoria::find($id);

        if (! $categoria) {
            return response()->json(['error' => 'No encontrado'], 404);
        }

        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
        ]);

        $categoria->update($validated);

        return response()->json([
            'mensaje' => 'Actualizado correctamente',
            'data' => new CategoriaResource($categoria),
        ], 200);
    }

    /**
     * @OA\Delete(
     *     path="/api/categoria/{categoria}",
     *     summary="Eliminar una categoria",
     *     description="Elimina una categoria por su ID",
     *     tags={"Categorias"},
     *     security={{"bearerAuth":{}}},
     *
     *     @OA\Parameter(
     *         name="categoria",
     *         in="path",
     *         required=true,
     *         description="ID de la categoria a eliminar",
     *
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="Categoria eliminada correctamente",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="mensaje", type="string", example="Eliminado correctamente")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=404,
     *         description="Categoria no encontrada",
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
        $categoria = Categoria::find($id);

        if (! $categoria) {
            return response()->json(['error' => 'No encontrado'], 404);
        }

        $categoria->delete();

        return response()->json(['mensaje' => 'Eliminado correctamente'], 200);
    }
}
