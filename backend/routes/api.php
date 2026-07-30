<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoriaController;
use App\Http\Controllers\Api\CestaController;
use App\Http\Controllers\Api\EspecifiacionController;
use App\Http\Controllers\Api\ProductoCestaController;
use App\Http\Controllers\Api\ProductoController;
use App\Http\Controllers\Api\ProductoEspecifiacionController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\WishlistController;
use Illuminate\Support\Facades\Route;

// ── Auth ────────────────────────────────────────────────────────────────────
Route::post('/register', [AuthController::class, 'register'])->name('api.register');
Route::post('/login', [AuthController::class, 'login'])->name('api.login');
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum')->name('api.logout');
Route::get('/user', [AuthController::class, 'me'])->middleware('auth:sanctum')->name('api.user');

// ── Productos públicos ───────────────────────────────────────────────────────
Route::get('/productos/count', [ProductoController::class, 'count'])->name('api.productos.count');
Route::get('/productos/oferta', [ProductoController::class, 'oferta'])->name('api.productos.oferta');
Route::get('/productos', [ProductoController::class, 'index'])->name('api.productos.index');
Route::get('/productos/{id}', [ProductoController::class, 'show'])->name('api.productos.show');

// ── Categorías públicas ──────────────────────────────────────────────────────
Route::get('/categoria/productos', [CategoriaController::class, 'indexProductos'])->name('api.categoria.productos');
Route::get('/categoria', [CategoriaController::class, 'index'])->name('api.categoria.index');
Route::get('/categoria/{categoria}', [CategoriaController::class, 'show'])->name('api.categoria.show');

// ── Especificaciones públicas ────────────────────────────────────────────────
Route::get('/especificacion/productos', [EspecifiacionController::class, 'indexProductos'])->name('api.especificacion.productos');
Route::get('/especificacion', [EspecifiacionController::class, 'index'])->name('api.especificacion.index');
Route::get('/especificacion/{id}', [EspecifiacionController::class, 'show'])->name('api.especificacion.show');

// ── Usuario autenticado ──────────────────────────────────────────────────────
Route::middleware(['auth:sanctum', 'rol:usuario'])->group(function () {
    Route::get('/deseos/{id}', [WishlistController::class, 'show'])->name('api.deseos.show');
    Route::post('/deseos', [WishlistController::class, 'store'])->name('api.deseos.store');
    Route::delete('/deseos/{id}', [WishlistController::class, 'destroy'])->name('api.deseos.destroy');

    Route::get('/cesta', [CestaController::class, 'index'])->name('api.cesta.index');

    Route::post('/cesta/productos', [ProductoCestaController::class, 'store'])->name('api.cesta.productos.store');
    Route::put('/cesta/productos/{id}', [ProductoCestaController::class, 'update'])->name('api.cesta.productos.update');
    Route::delete('/cesta/productos/{id}', [ProductoCestaController::class, 'destroy'])->name('api.cesta.productos.destroy');
});

// ── Admin ────────────────────────────────────────────────────────────────────
Route::middleware(['auth:sanctum', 'rol:admin'])->group(function () {
    Route::get('/deseos', [WishlistController::class, 'index'])->name('api.deseos.index');

    // Productos
    Route::post('/productos', [ProductoController::class, 'store'])->name('api.productos.store');
    Route::put('/productos/{id}', [ProductoController::class, 'update'])->name('api.productos.update');
    Route::patch('/productos/{id}', [ProductoController::class, 'update'])->name('api.productos.update.patch');
    Route::delete('/productos/{id}', [ProductoController::class, 'destroy'])->name('api.productos.destroy');

    // Categorías
    Route::post('/categoria', [CategoriaController::class, 'store'])->name('api.categoria.store');
    Route::put('/categoria/{categoria}', [CategoriaController::class, 'update'])->name('api.categoria.update');
    Route::delete('/categoria/{categoria}', [CategoriaController::class, 'destroy'])->name('api.categoria.destroy');

    // Especificaciones
    Route::post('/especificacion', [EspecifiacionController::class, 'store'])->name('api.especificacion.store');
    Route::put('/especificacion/{id}', [EspecifiacionController::class, 'update'])->name('api.especificacion.update');
    Route::delete('/especificacion/{id}', [EspecifiacionController::class, 'destroy'])->name('api.especificacion.destroy');

    Route::post('/especificacion/productos', [ProductoEspecifiacionController::class, 'store'])->name('api.especificacion.productos.store');
    Route::put('/especificacion/productos/{id}', [ProductoEspecifiacionController::class, 'update'])->name('api.especificacion.productos.update');
    Route::delete('/especificacion/productos/{id}', [ProductoEspecifiacionController::class, 'destroy'])->name('api.especificacion.productos.destroy');

    // Usuarios
    Route::apiResource('/usuarios', UserController::class, ['as' => 'api']);
});

Route::get('/no-autenticado', [AuthController::class, 'noAutenticado'])->name('api.no-autenticado');
