@extends('admin.layouts.app')

@section('title', 'Usuarios')

@section('header-actions')
    <a href="{{ route('admin.usuarios.create') }}"
       class="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
        </svg>
        Nuevo usuario
    </a>
@endsection

@section('content')

<form method="GET" class="flex flex-wrap gap-3 mb-5">
    <input type="text" name="search" value="{{ request('search') }}" placeholder="Buscar nombre o email..."
           class="border border-slate-300 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64">
    <select name="rol"
            class="border border-slate-300 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
        <option value="">Todos los roles</option>
        <option value="admin" {{ request('rol') === 'admin' ? 'selected' : '' }}>Admin</option>
        <option value="usuario" {{ request('rol') === 'usuario' ? 'selected' : '' }}>Usuario</option>
    </select>
    <button type="submit"
            class="bg-slate-700 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
        Filtrar
    </button>
    @if (request('search') || request('rol'))
        <a href="{{ route('admin.usuarios.index') }}"
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
                <th class="px-5 py-3 text-left">Email</th>
                <th class="px-5 py-3 text-center">Rol</th>
                <th class="px-5 py-3 text-center">Registrado</th>
                <th class="px-5 py-3 text-center">Acciones</th>
            </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
            @forelse ($usuarios as $usuario)
                <tr class="hover:bg-slate-50 transition-colors">
                    <td class="px-5 py-3.5">
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 rounded-full {{ $usuario->rol === 'admin' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600' }} flex items-center justify-center text-xs font-semibold flex-shrink-0">
                                {{ strtoupper(substr($usuario->name, 0, 1)) }}
                            </div>
                            <span class="font-medium text-slate-800">{{ $usuario->name }}</span>
                        </div>
                    </td>
                    <td class="px-5 py-3.5 text-slate-500">{{ $usuario->email }}</td>
                    <td class="px-5 py-3.5 text-center">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            {{ $usuario->rol === 'admin' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600' }}">
                            {{ $usuario->rol }}
                        </span>
                    </td>
                    <td class="px-5 py-3.5 text-center text-slate-400 text-xs">
                        {{ $usuario->created_at->format('d/m/Y') }}
                    </td>
                    <td class="px-5 py-3.5">
                        <div class="flex items-center justify-center gap-2">
                            <a href="{{ route('admin.usuarios.edit', $usuario) }}"
                               class="text-slate-400 hover:text-indigo-600 transition-colors" title="Editar">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                </svg>
                            </a>
                            @if ($usuario->id !== auth()->id())
                                <form method="POST" action="{{ route('admin.usuarios.destroy', $usuario) }}"
                                      onsubmit="return confirm('¿Eliminar este usuario?')">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="text-slate-400 hover:text-rose-600 transition-colors" title="Eliminar">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                        </svg>
                                    </button>
                                </form>
                            @endif
                        </div>
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="5" class="px-5 py-12 text-center text-sm text-slate-400">
                        No se encontraron usuarios.
                    </td>
                </tr>
            @endforelse
        </tbody>
    </table>
    @if ($usuarios->hasPages())
        <div class="px-5 py-4 border-t border-slate-200">{{ $usuarios->links() }}</div>
    @endif
</div>

@endsection
