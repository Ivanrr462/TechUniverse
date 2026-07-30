@extends('admin.layouts.app')

@section('title', 'Editar usuario')

@section('header-actions')
    <a href="{{ route('admin.usuarios.index') }}"
       class="text-sm text-slate-500 hover:text-slate-700 transition-colors">
        ← Volver a usuarios
    </a>
@endsection

@section('content')

<div class="max-w-md">
    <form method="POST" action="{{ route('admin.usuarios.update', $usuario) }}" class="space-y-5">
        @csrf
        @method('PUT')

        <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
            <h2 class="font-semibold text-slate-700 text-sm uppercase tracking-wide border-b border-slate-100 pb-3">
                Datos del usuario
            </h2>

            <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">Nombre <span class="text-rose-500">*</span></label>
                <input type="text" name="name" value="{{ old('name', $usuario->name) }}" required
                       class="w-full border rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500
                              {{ $errors->has('name') ? 'border-red-400' : 'border-slate-300' }}">
                @error('name') <p class="mt-1 text-xs text-red-600">{{ $message }}</p> @enderror
            </div>

            <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">Email <span class="text-rose-500">*</span></label>
                <input type="email" name="email" value="{{ old('email', $usuario->email) }}" required
                       class="w-full border rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500
                              {{ $errors->has('email') ? 'border-red-400' : 'border-slate-300' }}">
                @error('email') <p class="mt-1 text-xs text-red-600">{{ $message }}</p> @enderror
            </div>

            <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">Nueva contraseña</label>
                <input type="password" name="password"
                       class="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500
                              {{ $errors->has('password') ? 'border-red-400' : '' }}"
                       placeholder="Dejar vacío para no cambiar">
                @error('password') <p class="mt-1 text-xs text-red-600">{{ $message }}</p> @enderror
            </div>

            <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">Confirmar contraseña</label>
                <input type="password" name="password_confirmation"
                       class="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
            </div>

            <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">Rol <span class="text-rose-500">*</span></label>
                <select name="rol" required
                        class="w-full border rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500
                               {{ $errors->has('rol') ? 'border-red-400' : 'border-slate-300' }}">
                    <option value="usuario" {{ old('rol', $usuario->rol) === 'usuario' ? 'selected' : '' }}>Usuario</option>
                    <option value="admin" {{ old('rol', $usuario->rol) === 'admin' ? 'selected' : '' }}>Admin</option>
                </select>
                @error('rol') <p class="mt-1 text-xs text-red-600">{{ $message }}</p> @enderror
            </div>
        </div>

        <div class="flex gap-3">
            <button type="submit"
                    class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors">
                Guardar cambios
            </button>
            <a href="{{ route('admin.usuarios.index') }}"
               class="border border-slate-300 hover:bg-slate-50 text-slate-600 font-medium px-6 py-2.5 rounded-lg text-sm transition-colors">
                Cancelar
            </a>
        </div>
    </form>
</div>

@endsection
