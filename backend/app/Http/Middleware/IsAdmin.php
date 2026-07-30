<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle($request, Closure $next)
    {
        $user = $request->user();

        if (! $user || $user->rol !== 'admin') {
            abort(403, 'Acceso denegado');
        }

        return $next($request);
    }
}
