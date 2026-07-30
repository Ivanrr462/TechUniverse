<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

/**
 * @OA\Tag(
 *     name="Usuarios",
 *     description="Gestion de usuarios"
 * )
 *
 * @OA\Schema(
 *     schema="Usuario",
 *     type="object",
 *
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="nombre", type="string", example="Juan Garcia"),
 *     @OA\Property(property="correo", type="string", format="email", example="juan@example.com"),
 *     @OA\Property(property="rol", type="string", enum={"usuario", "admin"}, example="usuario")
 * )
 */
class UserController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/usuarios",
     *     summary="Listar todos los usuarios",
     *     description="Retorna una lista de todos los usuarios registrados",
     *     tags={"Usuarios"},
     *     security={{"bearerAuth":{}}},
     *
     *     @OA\Response(
     *         response=200,
     *         description="Lista de usuarios obtenida correctamente",
     *
     *         @OA\JsonContent(
     *             type="array",
     *
     *             @OA\Items(ref="#/components/schemas/Usuario")
     *         )
     *     )
     * )
     */
    public function index()
    {
        $usuario = User::get();

        return UserResource::collection($usuario);
    }

    /**
     * @OA\Post(
     *     path="/api/usuarios",
     *     summary="Crear un nuevo usuario",
     *     description="Crea un nuevo usuario con rol 'usuario' por defecto",
     *     tags={"Usuarios"},
     *     security={{"bearerAuth":{}}},
     *
     *     @OA\RequestBody(
     *         required=true,
     *
     *         @OA\JsonContent(
     *             required={"name", "email", "password"},
     *
     *             @OA\Property(property="name", type="string", maxLength=255, example="Juan Garcia"),
     *             @OA\Property(property="email", type="string", format="email", example="juan@example.com"),
     *             @OA\Property(property="password", type="string", minLength=6, example="secret123")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=201,
     *         description="Usuario creado con exito",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="mensaje", type="string", example="Usuario creado con exito"),
     *             @OA\Property(property="data", ref="#/components/schemas/Usuario")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=422,
     *         description="Error de validacion",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="message", type="string", example="The email has already been taken."),
     *             @OA\Property(property="errors", type="object")
     *         )
     *     )
     * )
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
        ]);

        $validated['rol'] = 'usuario';
        $validated['password'] = Hash::make($validated['password']);

        $usuario = User::create($validated);

        return response()->json([
            'mensaje' => 'Usuario creado con éxito',
            'data' => new UserResource($usuario),
        ], 201);
    }

    /**
     * @OA\Get(
     *     path="/api/usuarios/{id}",
     *     summary="Obtener un usuario por ID",
     *     description="Retorna un usuario especifico por su ID",
     *     tags={"Usuarios"},
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
     *         description="Usuario encontrado",
     *
     *         @OA\JsonContent(ref="#/components/schemas/Usuario")
     *     ),
     *
     *     @OA\Response(
     *         response=404,
     *         description="Usuario no encontrado",
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
        $usuario = User::find($id);

        if (! $usuario) {
            return response()->json(['error' => 'No encontrado'], 404);
        }

        return new UserResource($usuario);
    }

    /**
     * @OA\Put(
     *     path="/api/usuarios/{id}",
     *     summary="Actualizar un usuario",
     *     description="Actualiza los datos de un usuario. Todos los campos son opcionales",
     *     tags={"Usuarios"},
     *     security={{"bearerAuth":{}}},
     *
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID del usuario a actualizar",
     *
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *
     *     @OA\RequestBody(
     *         required=true,
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="name", type="string", maxLength=255, example="Juan Garcia"),
     *             @OA\Property(property="email", type="string", format="email", example="juan@example.com"),
     *             @OA\Property(property="password", type="string", minLength=6, example="nuevapass123"),
     *             @OA\Property(property="role", type="string", enum={"usuario", "admin"}, example="admin")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="Usuario actualizado con exito",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="mensaje", type="string", example="Usuario actualizado con exito"),
     *             @OA\Property(property="data", ref="#/components/schemas/Usuario")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=404,
     *         description="Usuario no encontrado",
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
     *             @OA\Property(property="message", type="string", example="The email has already been taken."),
     *             @OA\Property(property="errors", type="object")
     *         )
     *     )
     * )
     */
    public function update(Request $request, $id)
    {
        $usuario = User::find($id);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,'.$id,
            'password' => 'sometimes|string|min:6',
            'role' => 'sometimes|string|in:usuario,admin',
        ]);

        if ($request->filled('password')) {
            $validated['password'] = Hash::make($request->password);
        }

        $usuario->update($validated);

        return response()->json([
            'mensaje' => 'Usuario actualizado con éxito',
            'data' => new UserResource($usuario),
        ]);
    }

    /**
     * @OA\Delete(
     *     path="/api/usuarios/{id}",
     *     summary="Eliminar un usuario",
     *     description="Elimina un usuario por su ID",
     *     tags={"Usuarios"},
     *     security={{"bearerAuth":{}}},
     *
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID del usuario a eliminar",
     *
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="Usuario eliminado correctamente",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="mensaje", type="string", example="Eliminado correctamente")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=404,
     *         description="Usuario no encontrado",
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
        $usuario = User::find($id);

        if (! $usuario) {
            return response()->json(['error' => 'No encontrado'], 404);
        }

        $usuario->delete();

        return response()->json(['mensaje' => 'Eliminado correctamente'], 200);
    }
}
