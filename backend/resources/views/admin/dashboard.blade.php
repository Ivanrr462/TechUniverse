@extends('admin.layouts.app')

@section('title', 'Dashboard')

@section('content')

{{-- Stats --}}
<div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
    @php
        $cards = [
            ['label' => 'Productos', 'value' => $stats['total_productos'], 'color' => 'bg-indigo-500', 'icon' => '<path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>'],
            ['label' => 'Usuarios', 'value' => $stats['total_usuarios'], 'color' => 'bg-sky-500', 'icon' => '<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>'],
            ['label' => 'Categorías', 'value' => $stats['total_categorias'], 'color' => 'bg-violet-500', 'icon' => '<path stroke-linecap="round" stroke-linejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>'],
            ['label' => 'Sin stock', 'value' => $stats['sin_stock'], 'color' => 'bg-rose-500', 'icon' => '<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>'],
        ];
    @endphp

    @foreach ($cards as $card)
        <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex items-center gap-4">
            <div class="{{ $card['color'] }} rounded-xl p-3 flex-shrink-0">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    {!! $card['icon'] !!}
                </svg>
            </div>
            <div>
                <p class="text-2xl font-bold text-slate-800">{{ $card['value'] }}</p>
                <p class="text-sm text-slate-500">{{ $card['label'] }}</p>
            </div>
        </div>
    @endforeach
</div>

{{-- Productos recientes --}}
<div class="bg-white rounded-xl shadow-sm border border-slate-200">
    <div class="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
        <h2 class="font-semibold text-slate-800">Productos recientes</h2>
        <a href="{{ route('admin.productos.index') }}" class="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
            Ver todos →
        </a>
    </div>
    <div class="divide-y divide-slate-100">
        @forelse ($productos_recientes as $producto)
            <div class="flex items-center gap-4 px-6 py-3.5">
                @if ($producto->foto)
                    <img src="{{ $producto->foto_url }}" alt="{{ $producto->nombre }}"
                         class="w-10 h-10 rounded-lg object-cover flex-shrink-0 bg-slate-100">
                @else
                    <div class="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                        <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                    </div>
                @endif
                <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-slate-800 truncate">{{ $producto->nombre }}</p>
                    <p class="text-xs text-slate-400">{{ $producto->categoria?->nombre ?? '—' }}</p>
                </div>
                <div class="text-right">
                    <p class="text-sm font-semibold text-slate-800">{{ number_format($producto->precio, 2) }} €</p>
                    <p class="text-xs {{ $producto->stock === 0 ? 'text-rose-500' : 'text-emerald-600' }}">
                        Stock: {{ $producto->stock }}
                    </p>
                </div>
                <a href="{{ route('admin.productos.edit', $producto) }}"
                   class="ml-2 text-slate-400 hover:text-indigo-600 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                </a>
            </div>
        @empty
            <p class="px-6 py-8 text-center text-sm text-slate-400">No hay productos todavía.</p>
        @endforelse
    </div>
</div>

@endsection
