@extends('admin.layouts.app')

@section('title', 'Especificaciones')

@section('header-actions')
    <a href="{{ route('admin.especificaciones.create') }}"
       class="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
        </svg>
        Nueva especificación
    </a>
@endsection

@section('content')

<form method="GET" class="flex gap-3 mb-5">
    <input type="text" name="search" value="{{ request('search') }}" placeholder="Buscar especificación..."
           class="border border-slate-300 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64">
    <button type="submit"
            class="bg-slate-700 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
        Filtrar
    </button>
    @if (request('search'))
        <a href="{{ route('admin.especificaciones.index') }}"
           class="border border-slate-300 hover:bg-slate-50 text-slate-600 px-4 py-2 rounded-lg text-sm transition-colors">
            Limpiar
        </a>
    @endif
</form>

<div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
    <table class="w-full text-sm">
        <thead>
            <tr class="bg-slate-50 border-b border-slate-200 text-slate-600 text-xs uppercase tracking-wide">
                <th class="px-5 py-3 text-left">Nombre</th>
                <th class="px-5 py-3 text-center">Productos</th>
                <th class="px-5 py-3 text-center">Acciones</th>
            </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
            @forelse ($especificaciones as $spec)
                <tr class="hover:bg-slate-50 transition-colors">
                    <td class="px-5 py-3.5 font-medium text-slate-800">{{ $spec->nombre }}</td>
                    <td class="px-5 py-3.5 text-center text-slate-500">{{ $spec->productos_count }}</td>
                    <td class="px-5 py-3.5">
                        <div class="flex items-center justify-center gap-2">
                            <a href="{{ route('admin.especificaciones.edit', $spec) }}"
                               class="text-slate-400 hover:text-indigo-600 transition-colors" title="Editar">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                </svg>
                            </a>
                            <form method="POST" action="{{ route('admin.especificaciones.destroy', $spec) }}"
                                  onsubmit="return confirm('¿Eliminar esta especificación?')">
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
                    <td colspan="3" class="px-5 py-12 text-center text-sm text-slate-400">
                        No se encontraron especificaciones.
                    </td>
                </tr>
            @endforelse
        </tbody>
    </table>
    @if ($especificaciones->hasPages())
        <div class="px-5 py-4 border-t border-slate-200">{{ $especificaciones->links() }}</div>
    @endif
</div>

@endsection
