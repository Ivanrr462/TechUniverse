<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\WishlistResource;
use App\Models\User;
use Illuminate\Http\Request;

/**
 * @OA\Tag(
 *     name="Wishlist",
 *     description="Gestion de wishlists de usuarios"
 * )
 *
 * @OA\Schema(
 *     schema="Wishlist",
 *     type="object",
 *
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="nombre", type="string", example="Juan Garcia"),
 *     @OA\Property(property="correo", type="string", format="email", example="juan@example.com"),
 *     @OA\Property(
 *         property="desea",
 *         type="array",
 *
 *         @OA\Items(ref="#/components/schemas/Producto")
 *     )
 * )
 */
class WishlistController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/deseos",
     *     summary="Listar todos los usuarios con su wishlist",
     *     description="Retorna todos los usuarios con sus productos deseados",
     *     tags={"Wishlist"},
     *     security={{"bearerAuth":{}}},
     *
     *     @OA\Response(
     *         response=200,
     *         description="Lista de wishlists obtenida correctamente",
     *
     *         @OA\JsonContent(
     *             type="array",
     *
     *             @OA\Items(ref="#/components/schemas/Wishlist")
     *         )
     *     )
     * )
     */
    public function index()
    {
        $users = User::has('deseos')->with('deseos')->get();

        return WishlistResource::collection($users);
    }

    /**
     * @OA\Get(
     *     path="/api/deseos/{id}",
     *     summary="Obtener la wishlist de un usuario",
     *     description="Retorna la wishlist de un usuario especifico",
     *     tags={"Wishlist"},
     *     security={{"bearerAuth":{}}},
     *
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID del usuario",
     *
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="Wishlist encontrada",
     *
     *         @OA\JsonContent(ref="#/components/schemas/Wishlist")
     *     ),
     *
     *     @OA\Response(
     *         response=404,
     *         description="Usuario no encontrado",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="error", type="string", example="Usuario no encontrado")
     *         )
     *     )
     * )
     */
    public function show(string $id)
    {
        $user = User::with('deseos')->find($id);

        if (! $user) {
            return response()->json(['error' => 'Usuario no encontrado'], 404);
        }

        return new WishlistResource($user);
    }

    /**
     * @OA\Post(
     *     path="/api/deseos",
     *     summary="Añadir un producto a la wishlist",
     *     description="Añade un producto a la wishlist del usuario autenticado. Si ya existe, no lo duplica",
     *     tags={"Wishlist"},
     *     security={{"bearerAuth":{}}},
     *
     *     @OA\RequestBody(
     *         required=true,
     *
     *         @OA\JsonContent(
     *             required={"producto_id"},
     *
     *             @OA\Property(property="producto_id", type="integer", example=3)
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=201,
     *         description="Producto añadido a la wishlist",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="mensaje", type="string", example="Producto añadido a la wishlist"),
     *             @OA\Property(property="data", ref="#/components/schemas/Wishlist")
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
        $validated = $request->validate([
            'producto_id' => 'required|exists:productos,id',
        ]);

        $user = $request->user();

        if (! $user) {
            return response()->json(['error' => 'No autenticado'], 401);
        }

        $user->deseos()->syncWithoutDetaching($validated['producto_id']);

        return response()->json([
            'mensaje' => 'Producto añadido a la wishlist',
            'data' => new WishlistResource($user->load('deseos')),
        ], 201);
    }

    /**
     * @OA\Delete(
     *     path="/api/deseos/{id}",
     *     summary="Eliminar un producto de la wishlist",
     *     description="Elimina un producto especifico de la wishlist del usuario autenticado",
     *     tags={"Wishlist"},
     *     security={{"bearerAuth":{}}},
     *
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID del producto a eliminar de la wishlist",
     *
     *         @OA\Schema(type="integer", example=3)
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="Producto eliminado de la wishlist",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="mensaje", type="string", example="Producto eliminado de la wishlist")
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
     *         description="Producto no encontrado en la wishlist",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="error", type="string", example="Producto no encontrado en la wishlist")
     *         )
     *     )
     * )
     */
    public function destroy(Request $request, string $id)
    {
        $user = $request->user();

        if (! $user) {
            return response()->json(['error' => 'No autenticado'], 401);
        }

        $user->deseos()->detach($id);

        return response()->json([
            'mensaje' => 'Producto eliminado de la wishlist',
        ], 200);
    }
}
