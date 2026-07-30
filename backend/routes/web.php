<?php

use App\Http\Controllers\Admin\AdminAuthController;
use App\Http\Controllers\Admin\AdminCategoriaController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminEspecificacionController;
use App\Http\Controllers\Admin\AdminProductoController;
use App\Http\Controllers\Admin\AdminUserController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// Admin auth (sin middleware)
Route::get('/admin/login', [AdminAuthController::class, 'showLogin'])->name('admin.login');
Route::post('/admin/login', [AdminAuthController::class, 'login'])->name('admin.login.post');

// Panel admin protegido
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::post('/logout', [AdminAuthController::class, 'logout'])->name('logout');

    Route::get('/', [AdminDashboardController::class, 'index'])->name('dashboard');

    Route::resource('productos', AdminProductoController::class)->except(['show']);
    Route::resource('categorias', AdminCategoriaController::class)->except(['show']);
    Route::resource('usuarios', AdminUserController::class)->except(['show'])->parameters(['usuarios' => 'usuario']);
    Route::resource('especificaciones', AdminEspecificacionController::class)->except(['show']);
});
