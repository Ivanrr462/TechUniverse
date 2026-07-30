@extends('admin.layouts.app')

@section('title', 'Editar especificación')

@section('header-actions')
    <a href="{{ route('admin.especificaciones.index') }}"
       class="text-sm text-slate-500 hover:text-slate-700 transition-colors">
        ← Volver a especificaciones
    </a>
@endsection

@section('content')

<div class="max-w-md">
    <form method="POST" action="{{ route('admin.especificaciones.update', $especificacion) }}" class="space-y-5">
        @csrf
        @method('PUT')

        <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
            <h2 class="font-semibold text-slate-700 text-sm uppercase tracking-wide border-b border-slate-100 pb-3">
                Datos de la especificación
            </h2>

            <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">
                    Nombre <span class="text-rose-500">*</span>
                </label>
                <input type="text" name="nombre" value="{{ old('nombre', $especificacion->nombre) }}" required
                       class="w-full border rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500
                              {{ $errors->has('nombre') ? 'border-red-400' : 'border-slate-300' }}">
                @error('nombre') <p class="mt-1 text-xs text-red-600">{{ $message }}</p> @enderror
            </div>
        </div>

        <div class="flex gap-3">
            <button type="submit"
                    class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors">
                Guardar cambios
            </button>
            <a href="{{ route('admin.especificaciones.index') }}"
               class="border border-slate-300 hover:bg-slate-50 text-slate-600 font-medium px-6 py-2.5 rounded-lg text-sm transition-colors">
                Cancelar
            </a>
        </div>
    </form>
</div>

@endsection
