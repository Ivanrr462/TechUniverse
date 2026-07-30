<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

/**
 * @OA\Tag(
 *     name="Auth",
 *     description="Registro, login y logout de usuarios"
 * )
 */
class AuthController extends Controller
{
    /**
     * @OA\Post(
     *     path="/api/register",
     *     summary="Registrar un nuevo usuario",
     *     description="Crea un nuevo usuario con rol 'usuario' y genera su cesta automaticamente. No devuelve token, el usuario debe hacer login despues",
     *     tags={"Auth"},
     *
     *     @OA\RequestBody(
     *         required=true,
     *
     *         @OA\JsonContent(
     *             required={"name", "email", "password"},
     *
     *             @OA\Property(property="name", type="string", maxLength=255, example="Juan Garcia"),
     *             @OA\Property(property="email", type="string", format="email", example="juan@example.com"),
     *             @OA\Property(property="password", type="string", minLength=8, example="secret123")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=201,
     *         description="Usuario registrado exitosamente",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="mensaje", type="string", example="Usuario registrado exitosamente. Por favor inicia sesion."),
     *             @OA\Property(property="user", ref="#/components/schemas/Usuario")
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
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'rol' => 'usuario',
        ]);

        $user->cesta()->create();

        return response()->json([
            'mensaje' => 'Usuario registrado exitosamente. Por favor inicia sesión.',
            'user' => $user,
        ], 201);
    }

    /**
     * @OA\Post(
     *     path="/api/login",
     *     summary="Iniciar sesion",
     *     description="Autentica al usuario y devuelve un token Bearer. Redirige a /dashboard si es admin o /inicio si es usuario",
     *     tags={"Auth"},
     *
     *     @OA\RequestBody(
     *         required=true,
     *
     *         @OA\JsonContent(
     *             required={"email", "password"},
     *
     *             @OA\Property(property="email", type="string", format="email", example="juan@example.com"),
     *             @OA\Property(property="password", type="string", example="secret123")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="Login exitoso",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="mensaje", type="string", example="Hola Juan Garcia"),
     *             @OA\Property(property="access_token", type="string", example="1|abc123xyz..."),
     *             @OA\Property(property="token_type", type="string", example="Bearer"),
     *             @OA\Property(property="user", ref="#/components/schemas/Usuario"),
     *             @OA\Property(property="redireccion", type="string", example="/inicio")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=401,
     *         description="Credenciales invalidas",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="mensaje", type="string", example="Credenciales invalidas")
     *         )
     *     )
     * )
     */
    public function login(Request $request)
    {
        if (! Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['mensaje' => 'Credenciales inválidas'], 401);
        }

        $user = User::where('email', $request->email)->firstOrFail();

        $redireccion = $user->rol === 'admin' ? '/dashboard' : '/inicio';
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'mensaje' => 'Hola '.$user->name,
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user,
            'redireccion' => $redireccion,
        ]);
    }

    /**
     * @OA\Post(
     *     path="/api/logout",
     *     summary="Cerrar sesion",
     *     description="Invalida el token Bearer del usuario autenticado",
     *     tags={"Auth"},
     *     security={{"bearerAuth":{}}},
     *
     *     @OA\Response(
     *         response=200,
     *         description="Sesion cerrada correctamente",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="mensaje", type="string", example="Sesion cerrada correctamente")
     *         )
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
     *     )
     * )
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['mensaje' => 'Sesión cerrada correctamente']);
    }

    /**
     * @OA\Get(
     *     path="/api/user",
     *     summary="Obtener el usuario autenticado",
     *     description="Retorna los datos del usuario autenticado mediante el token Bearer",
     *     tags={"Auth"},
     *     security={{"bearerAuth":{}}},
     *
     *     @OA\Response(
     *         response=200,
     *         description="Datos del usuario autenticado",
     *
     *         @OA\JsonContent(ref="#/components/schemas/Usuario")
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
     *     )
     * )
     */
    public function me(Request $request)
    {
        return response()->json($request->user());
    }

    /**
     * @OA\Get(
     *     path="/api/no-autenticado",
     *     summary="Respuesta de no autenticado",
     *     description="Endpoint al que redirige Sanctum cuando el usuario no esta autenticado",
     *     tags={"Auth"},
     *
     *     @OA\Response(
     *         response=401,
     *         description="No autenticado",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="mensaje", type="string", example="No autenticado")
     *         )
     *     )
     * )
     */
    public function noAutenticado()
    {
        return response()->json(['mensaje' => 'No autenticado'], 401);
    }
}
