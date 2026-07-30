<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\EspecificacionConProductosResource;
use App\Http\Resources\EspecificacionResource;
use App\Models\especificaciones;
use Illuminate\Http\Request;

/**
 * @OA\Tag(
 *     name="Especificaciones",
 *     description="Gestion de especificaciones"
 * )
 *
 * @OA\Schema(
 *     schema="Especificacion",
 *     type="object",
 *
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="nombre", type="string", example="RAM")
 * )
 *
 * @OA\Schema(
 *     schema="EspecificacionConProductos",
 *     type="object",
 *
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="nombre", type="string", example="RAM"),
 *     @OA\Property(
 *         property="productos",
 *         type="array",
 *
 *         @OA\Items(
 *             type="object",
 *
 *             @OA\Property(property="id", type="integer", example=1),
 *             @OA\Property(property="nombre", type="string", example="Laptop Gaming"),
 *             @OA\Property(property="valor", type="string", example="16GB")
 *         )
 *     )
 * )
 */
class EspecifiacionController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/especificacion",
     *     summary="Listar todas las especificaciones",
     *     description="Retorna una lista de todas las especificaciones",
     *     tags={"Especificaciones"},
     *
     *     @OA\Response(
     *         response=200,
     *         description="Lista de especificaciones obtenida correctamente",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(
     *                 property="data",
     *                 type="array",
     *
     *                 @OA\Items(ref="#/components/schemas/Especificacion")
     *             )
     *         )
     *     )
     * )
     */
    public function index()
    {
        $especificaciones = especificaciones::get();

        return response()->json([
            'data' => EspecificacionResource::collection($especificaciones),
        ]);
    }

    /**
     * @OA\Get(
     *     path="/api/especificacion/productos",
     *     summary="Listar todas las especificaciones con sus productos",
     *     description="Retorna una lista de todas las especificaciones incluyendo sus productos asociados",
     *     tags={"Especificaciones"},
     *
     *     @OA\Response(
     *         response=200,
     *         description="Lista de especificaciones con productos obtenida correctamente",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(
     *                 property="data",
     *                 type="array",
     *
     *                 @OA\Items(ref="#/components/schemas/EspecificacionConProductos")
     *             )
     *         )
     *     )
     * )
     */
    public function indexProductos()
    {
        $especificaciones = especificaciones::with('productoEspecificaciones.producto')->get();

        return response()->json([
            'data' => EspecificacionConProductosResource::collection($especificaciones),
        ]);
    }

    /**
     * @OA\Post(
     *     path="/api/especificacion",
     *     summary="Crear una nueva especificacion",
     *     description="Crea una nueva especificacion",
     *     tags={"Especificaciones"},
     *     security={{"bearerAuth":{}}},
     *
     *     @OA\RequestBody(
     *         required=true,
     *
     *         @OA\JsonContent(
     *             required={"nombre"},
     *
     *             @OA\Property(property="nombre", type="string", maxLength=255, example="RAM")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=201,
     *         description="Especificacion creada con exito",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="mensaje", type="string", example="Especificacion creada con exito"),
     *             @OA\Property(property="data", ref="#/components/schemas/Especificacion")
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

        $especificacion = especificaciones::create($validated);

        return response()->json([
            'mensaje' => 'Especificacion creada con éxito',
            'data' => new EspecificacionResource($especificacion),
        ], 201);
    }

    /**
     * @OA\Get(
     *     path="/api/especificacion/{id}",
     *     summary="Obtener una especificacion por ID",
     *     description="Retorna una especificacion especifica con sus productos asociados",
     *     tags={"Especificaciones"},
     *
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID de la especificacion",
     *
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="Especificacion encontrada",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="data", ref="#/components/schemas/EspecificacionConProductos")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=404,
     *         description="Especificacion no encontrada",
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
        $especificacion = especificaciones::with('productoEspecificaciones.producto')->find($id);

        if (! $especificacion) {
            return response()->json(['error' => 'No encontrado'], 404);
        }

        return response()->json([
            'data' => new EspecificacionConProductosResource($especificacion),
        ]);
    }

    /**
     * @OA\Put(
     *     path="/api/especificacion/{id}",
     *     summary="Actualizar una especificacion",
     *     description="Actualiza el nombre de una especificacion existente",
     *     tags={"Especificaciones"},
     *     security={{"bearerAuth":{}}},
     *
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID de la especificacion a actualizar",
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
     *             @OA\Property(property="nombre", type="string", maxLength=255, example="GPU")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="Especificacion actualizada correctamente",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="mensaje", type="string", example="Actualizado correctamente"),
     *             @OA\Property(property="data", ref="#/components/schemas/Especificacion")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=404,
     *         description="Especificacion no encontrada",
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
        $especificacion = especificaciones::find($id);

        if (! $especificacion) {
            return response()->json(['error' => 'No encontrado'], 404);
        }

        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
        ]);

        $especificacion->update($validated);

        return response()->json([
            'mensaje' => 'Actualizado correctamente',
            'data' => new EspecificacionResource($especificacion),
        ], 200);
    }

    /**
     * @OA\Delete(
     *     path="/api/especificacion/{id}",
     *     summary="Eliminar una especificacion",
     *     description="Elimina una especificacion por su ID",
     *     tags={"Especificaciones"},
     *     security={{"bearerAuth":{}}},
     *
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID de la especificacion a eliminar",
     *
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="Especificacion eliminada correctamente",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="mensaje", type="string", example="Eliminado correctamente")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=404,
     *         description="Especificacion no encontrada",
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
        $especificacion = especificaciones::find($id);

        if (! $especificacion) {
            return response()->json(['error' => 'No encontrado'], 404);
        }

        $especificacion->delete();

        return response()->json(['mensaje' => 'Eliminado correctamente'], 200);
    }
}
