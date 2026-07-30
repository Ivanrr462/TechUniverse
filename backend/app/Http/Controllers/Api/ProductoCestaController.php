<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Producto;
use App\Models\ProductoCesta;
use Illuminate\Http\Request;

/**
 * @OA\Tag(
 *     name="Cesta Productos",
 *     description="Gestion de productos dentro de la cesta del usuario autenticado"
 * )
 */
class ProductoCestaController extends Controller
{
    /**
     * @OA\Post(
     *     path="/api/cesta/productos",
     *     summary="Añadir un producto a la cesta",
     *     description="Añade un producto a la cesta del usuario autenticado. Si ya existe, incrementa la cantidad",
     *     tags={"Cesta Productos"},
     *     security={{"bearerAuth":{}}},
     *
     *     @OA\RequestBody(
     *         required=true,
     *
     *         @OA\JsonContent(
     *             required={"producto_id", "cantidad"},
     *
     *             @OA\Property(property="producto_id", type="integer", example=1),
     *             @OA\Property(property="cantidad", type="integer", minimum=1, example=2)
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="Producto añadido a la cesta",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="message", type="string", example="Producto añadido a la cesta")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=401,
     *         description="No autenticado",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="error", type="string", example="No autenticado")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=404,
     *         description="Cesta no encontrada",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="error", type="string", example="Cesta no encontrada")
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
            'cantidad' => 'required|integer|min:1',
        ]);

        $user = $request->user();

        if (! $user) {
            return response()->json(['error' => 'No autenticado'], 401);
        }

        $cesta = $user->cesta;

        if (! $cesta) {
            return response()->json(['error' => 'Cesta no encontrada'], 404);
        }

        $producto = Producto::find($request->producto_id);

        $productoEnCesta = ProductoCesta::where('cesta_id', $cesta->id)
            ->where('producto_id', $request->producto_id)
            ->first();

        if ($productoEnCesta) {
            $productoEnCesta->cantidad += $request->cantidad;
            $productoEnCesta->save();
        } else {
            ProductoCesta::create([
                'cesta_id' => $cesta->id,
                'producto_id' => $request->producto_id,
                'cantidad' => $request->cantidad,
                'precio_unitario' => $producto->precio,
            ]);
        }

        return response()->json(['message' => 'Producto añadido a la cesta']);
    }

    /**
     * @OA\Put(
     *     path="/api/cesta/productos/{id}",
     *     summary="Actualizar la cantidad de un producto en la cesta",
     *     description="Actualiza la cantidad de un producto especifico en la cesta del usuario autenticado",
     *     tags={"Cesta Productos"},
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
     *         @OA\JsonContent(
     *             required={"cantidad"},
     *
     *             @OA\Property(property="cantidad", type="integer", minimum=1, example=3)
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="Cantidad actualizada correctamente",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="message", type="string", example="Cantidad actualizada")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=401,
     *         description="No autenticado",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="error", type="string", example="No autenticado")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=404,
     *         description="Producto no encontrado en la cesta",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="error", type="string", example="Producto no encontrado en la cesta")
     *         )
     *     )
     * )
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'cantidad' => 'required|integer|min:1',
        ]);

        $user = $request->user();

        if (! $user) {
            return response()->json(['error' => 'No autenticado'], 401);
        }

        $cesta = $user->cesta;

        if (! $cesta) {
            return response()->json(['error' => 'Cesta no encontrada'], 404);
        }

        $productoEnCesta = ProductoCesta::where('cesta_id', $cesta->id)
            ->where('producto_id', $id)
            ->first();

        if (! $productoEnCesta) {
            return response()->json(['error' => 'Producto no encontrado en la cesta'], 404);
        }

        $productoEnCesta->cantidad = $request->cantidad;
        $productoEnCesta->save();

        return response()->json(['message' => 'Cantidad actualizada']);
    }

    /**
     * @OA\Delete(
     *     path="/api/cesta/productos/{id}",
     *     summary="Eliminar un producto de la cesta",
     *     description="Elimina un producto especifico de la cesta del usuario autenticado",
     *     tags={"Cesta Productos"},
     *     security={{"bearerAuth":{}}},
     *
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID del producto a eliminar de la cesta",
     *
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="Producto eliminado de la cesta",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="message", type="string", example="Producto eliminado de la cesta")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=401,
     *         description="No autenticado",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="error", type="string", example="No autenticado")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=404,
     *         description="Producto no encontrado en la cesta",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="error", type="string", example="Producto no encontrado en la cesta")
     *         )
     *     )
     * )
     */
    public function destroy(string $id)
    {
        $user = request()->user();

        if (! $user) {
            return response()->json(['error' => 'No autenticado'], 401);
        }

        $cesta = $user->cesta;

        if (! $cesta) {
            return response()->json(['error' => 'Cesta no encontrada'], 404);
        }

        $productoEnCesta = ProductoCesta::where('cesta_id', $cesta->id)
            ->where('producto_id', $id)
            ->first();

        if (! $productoEnCesta) {
            return response()->json(['error' => 'Producto no encontrado en la cesta'], 404);
        }

        $productoEnCesta->delete();

        return response()->json(['message' => 'Producto eliminado de la cesta']);
    }
}
