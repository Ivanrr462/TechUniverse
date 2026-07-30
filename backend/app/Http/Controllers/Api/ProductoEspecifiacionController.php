<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductoEspecificacionResource;
use App\Models\especificaciones;
use App\Models\Producto;
use App\Models\ProductoEspecificacion;
use Illuminate\Http\Request;

/**
 * @OA\Tag(
 *     name="Producto Especificaciones",
 *     description="Gestion de especificaciones asociadas a productos"
 * )
 *
 * @OA\Schema(
 *     schema="ProductoEspecificacion",
 *     type="object",
 *
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="producto_id", type="integer", example=1),
 *     @OA\Property(property="especificacion_id", type="integer", example=2),
 *     @OA\Property(property="valor", type="string", example="16GB"),
 *     @OA\Property(property="producto", ref="#/components/schemas/Producto"),
 *     @OA\Property(property="especificacion", ref="#/components/schemas/Especificacion")
 * )
 */
class ProductoEspecifiacionController extends Controller
{
    /**
     * @OA\Post(
     *     path="/api/especificacion/productos",
     *     summary="Añadir una especificacion a un producto",
     *     description="Asocia una especificacion con un valor a un producto",
     *     tags={"Producto Especificaciones"},
     *     security={{"bearerAuth":{}}},
     *
     *     @OA\RequestBody(
     *         required=true,
     *
     *         @OA\JsonContent(
     *             required={"producto_id", "especificacion_id", "valor"},
     *
     *             @OA\Property(property="producto_id", type="integer", example=1),
     *             @OA\Property(property="especificacion_id", type="integer", example=2),
     *             @OA\Property(property="valor", type="string", maxLength=255, example="16GB")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=201,
     *         description="Especificacion añadida al producto",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="message", type="string", example="Especificacion añadida al producto"),
     *             @OA\Property(property="data", ref="#/components/schemas/ProductoEspecificacion")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=422,
     *         description="Error de validacion",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="message", type="string", example="The producto_id field is required."),
     *             @OA\Property(property="errors", type="object")
     *         )
     *     )
     * )
     */
    public function store(Request $request)
    {
        $request->validate([
            'producto_id' => 'required|exists:productos,id',
            'especificacion_id' => 'required|exists:especificaciones,id',
            'valor' => 'required|string|max:255',
        ]);

        $productoPecificacion = ProductoEspecificacion::create([
            'producto_id' => $request->producto_id,
            'especificacion_id' => $request->especificacion_id,
            'valor' => $request->valor,
        ]);

        return response()->json([
            'message' => 'Especificacion añadida al producto',
            'data' => new ProductoEspecificacionResource($productoPecificacion),
        ], 201);
    }

    /**
     * @OA\Put(
     *     path="/api/especificacion/productos/{id}",
     *     summary="Actualizar el valor de una especificacion de un producto",
     *     description="Actualiza el valor de una especificacion asociada a un producto",
     *     tags={"Producto Especificaciones"},
     *     security={{"bearerAuth":{}}},
     *
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID del registro producto-especificacion",
     *
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *
     *     @OA\RequestBody(
     *         required=true,
     *
     *         @OA\JsonContent(
     *             required={"valor"},
     *
     *             @OA\Property(property="valor", type="string", maxLength=255, example="32GB")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="Especificacion actualizada correctamente",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="message", type="string", example="Especificacion actualizada"),
     *             @OA\Property(property="data", ref="#/components/schemas/ProductoEspecificacion")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=404,
     *         description="Especificacion no encontrada en el producto",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="error", type="string", example="Especificacion no encontrada en el producto")
     *         )
     *     )
     * )
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'valor' => 'required|string|max:255',
        ]);

        $productoEspecificacion = ProductoEspecificacion::find($id);

        if (! $productoEspecificacion) {
            return response()->json(['error' => 'Especificacion no encontrada en el producto'], 404);
        }

        $productoEspecificacion->valor = $request->valor;
        $productoEspecificacion->save();

        return response()->json([
            'message' => 'Especificacion actualizada',
            'data' => new ProductoEspecificacionResource($productoEspecificacion),
        ]);
    }

    /**
     * @OA\Delete(
     *     path="/api/especificacion/productos/{id}",
     *     summary="Eliminar una especificacion de un producto",
     *     description="Elimina la asociacion entre una especificacion y un producto",
     *     tags={"Producto Especificaciones"},
     *     security={{"bearerAuth":{}}},
     *
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID del registro producto-especificacion a eliminar",
     *
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="Especificacion eliminada del producto",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="message", type="string", example="Especificacion eliminada del producto")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=404,
     *         description="Especificacion no encontrada",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="error", type="string", example="Especificacion no encontrada")
     *         )
     *     )
     * )
     */
    public function destroy(string $id)
    {
        $productoEspecificacion = ProductoEspecificacion::find($id);

        if (! $productoEspecificacion) {
            return response()->json(['error' => 'Especificacion no encontrada'], 404);
        }

        $productoEspecificacion->delete();

        return response()->json(['message' => 'Especificacion eliminada del producto']);
    }
}
