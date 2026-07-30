<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Categoria;
use App\Models\Producto;
use App\Models\User;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_productos' => Producto::count(),
            'total_usuarios' => User::count(),
            'total_categorias' => Categoria::count(),
            'sin_stock' => Producto::where('stock', 0)->count(),
        ];

        $productos_recientes = Producto::with('categoria')->latest()->take(5)->get();

        return view('admin.dashboard', compact('stats', 'productos_recientes'));
    }
}
