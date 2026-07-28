<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CestaResource;
use Illuminate\Http\Request;

/**
 * @OA\Tag(
 *     name="Cesta",
 *     description="Gestion de la cesta de compra del usuario autenticado"
 * )
 *
 * @OA\Schema(
 *     schema="Cesta",
 *     type="object",
 *
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(
 *         property="usuario",
 *         type="object",
 *         @OA\Property(property="id", type="integer", example=1),
 *         @OA\Property(property="nombre", type="string", example="Juan Garcia"),
 *         @OA\Property(property="correo", type="string", format="email", example="juan@example.com")
 *     ),
 *     @OA\Property(
 *         property="productos",
 *         type="array",
 *
 *         @OA\Items(
 *             type="object",
 *
 *             @OA\Property(property="id", type="integer", example=1),
 *             @OA\Property(property="nombre", type="string", example="Laptop Gaming"),
 *             @OA\Property(property="foto", type="string", nullable=true, example="https://cdn.example.com/productos/laptop.jpg"),
 *             @OA\Property(property="precio_unitario", type="number", format="float", example=1500.00),
 *             @OA\Property(property="descuento", type="number", format="float", example=15.00),
 *             @OA\Property(property="precioDescuento", type="number", format="float", example=1275.00),
 *             @OA\Property(property="cantidad", type="integer", example=2),
 *             @OA\Property(property="subtotal", type="number", format="float", example=2550.00)
 *         )
 *     ),
 *     @OA\Property(property="precio_total", type="number", format="float", example=2550.00),
 *     @OA\Property(property="cantidad_total", type="integer", example=2)
 * )
 */
class CestaController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/cesta",
     *     summary="Obtener la cesta del usuario autenticado",
     *     description="Retorna la cesta de compra con todos los productos del usuario autenticado",
     *     tags={"Cesta"},
     *     security={{"bearerAuth":{}}},
     *
     *     @OA\Response(
     *         response=200,
     *         description="Cesta obtenida correctamente",
     *
     *         @OA\JsonContent(ref="#/components/schemas/Cesta")
     *     ),
     *
     *     @OA\Response(
     *         response=401,
     *         description="No autenticado",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="mensaje", type="string", example="No autenticado")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=404,
     *         description="Cesta no encontrada",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="mensaje", type="string", example="Cesta no encontrada")
     *         )
     *     )
     * )
     */
    public function index(Request $request)
    {
        $user = $request->user();

        if (! $user) {
            return response()->json(['mensaje' => 'No autenticado'], 401);
        }

        $cesta = $user->cesta()->with('productosIngresados')->first();

        if (! $cesta) {
            return response()->json(['mensaje' => 'Cesta no encontrada'], 404);
        }

        return new CestaResource($cesta);
    }
}
