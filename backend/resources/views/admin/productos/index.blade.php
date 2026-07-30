@extends('admin.layouts.app')

@section('title', 'Productos')

@section('header-actions')
    <a href="{{ route('admin.productos.create') }}"
       class="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
        </svg>
        Nuevo producto
    </a>
@endsection

@section('content')

{{-- Filtros --}}
<form method="GET" class="flex flex-wrap gap-3 mb-5">
    <input
        type="text"
        name="search"
        value="{{ request('search') }}"
        placeholder="Buscar por nombre..."
        class="border border-slate-300 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
    >
    <select name="categoria"
            class="border border-slate-300 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
        <option value="">Todas las categorías</option>
        @foreach ($categorias as $cat)
            <option value="{{ $cat->id }}" {{ request('categoria') == $cat->id ? 'selected' : '' }}>
                {{ $cat->nombre }}
            </option>
        @endforeach
    </select>
    <button type="submit"
            class="bg-slate-700 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
        Filtrar
    </button>
    @if (request('search') || request('categoria'))
        <a href="{{ route('admin.productos.index') }}"
           class="border border-slate-300 hover:bg-slate-50 text-slate-600 px-4 py-2 rounded-lg text-sm transition-colors">
            Limpiar
        </a>
    @endif
</form>

<div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
    <table class="w-full text-sm">
        <thead>
            <tr class="bg-slate-50 border-b border-slate-200 text-slate-600 text-xs uppercase tracking-wide">
                <th class="px-5 py-3 text-left">Producto</th>
                <th class="px-5 py-3 text-left">Categoría</th>
                <th class="px-5 py-3 text-right">Precio</th>
                <th class="px-5 py-3 text-right">Descuento</th>
                <th class="px-5 py-3 text-right">Stock</th>
                <th class="px-5 py-3 text-center">Acciones</th>
            </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
            @forelse ($productos as $producto)
                <tr class="hover:bg-slate-50 transition-colors">
                    <td class="px-5 py-3.5">
                        <div class="flex items-center gap-3">
                            @if ($producto->foto)
                                <img src="{{ $producto->foto_url }}" alt="{{ $producto->nombre }}"
                                     title="{{ $producto->foto }}"
                                     class="w-9 h-9 rounded-lg object-cover bg-slate-100 flex-shrink-0">
                            @else
                                <div class="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                                    <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                    </svg>
                                </div>
                            @endif
                            <span class="font-medium text-slate-800">{{ $producto->nombre }}</span>
                        </div>
                    </td>
                    <td class="px-5 py-3.5 text-slate-500">{{ $producto->categoria?->nombre ?? '—' }}</td>
                    <td class="px-5 py-3.5 text-right font-medium text-slate-800">{{ number_format($producto->precio, 2) }} €</td>
                    <td class="px-5 py-3.5 text-right">
                        @if ($producto->descuento > 0)
                            <span class="inline-flex items-center bg-amber-100 text-amber-700 text-xs font-medium px-2 py-0.5 rounded-full">
                                -{{ $producto->descuento }}%
                            </span>
                        @else
                            <span class="text-slate-400">—</span>
                        @endif
                    </td>
                    <td class="px-5 py-3.5 text-right">
                        <span class="{{ $producto->stock === 0 ? 'text-rose-600 font-semibold' : 'text-slate-700' }}">
                            {{ $producto->stock }}
                        </span>
                    </td>
                    <td class="px-5 py-3.5">
                        <div class="flex items-center justify-center gap-2">
                            <a href="{{ route('admin.productos.edit', $producto) }}"
                               class="text-slate-400 hover:text-indigo-600 transition-colors" title="Editar">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                </svg>
                            </a>
                            <form method="POST" action="{{ route('admin.productos.destroy', $producto) }}"
                                  onsubmit="return confirm('¿Eliminar este producto?')">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="text-slate-400 hover:text-rose-600 transition-colors" title="Eliminar">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                    </svg>
                                </button>
                            </form>
                        </div>
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="6" class="px-5 py-12 text-center text-sm text-slate-400">
                        No se encontraron productos.
                    </td>
                </tr>
            @endforelse
        </tbody>
    </table>

    @if ($productos->hasPages())
        <div class="px-5 py-4 border-t border-slate-200">
            {{ $productos->links() }}
        </div>
    @endif
</div>

@endsection
