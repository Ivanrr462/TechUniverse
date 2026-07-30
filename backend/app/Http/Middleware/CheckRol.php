<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRol
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next, string $rol): Response
    {
        if (! $request->user()) {
            return response()->json(['mensaje' => 'No autenticado'], 401);
        }

        if ($request->user()->rol === 'admin' || $request->user()->rol === $rol) {
            return $next($request);
        }

        return response()->json(['mensaje' => 'No tienes permisos para acceder aquí'], 403);
    }
}
