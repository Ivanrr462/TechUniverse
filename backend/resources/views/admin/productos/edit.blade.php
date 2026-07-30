@extends('admin.layouts.app')

@section('title', 'Editar producto')

@section('header-actions')
    <a href="{{ route('admin.productos.index') }}"
       class="text-sm text-slate-500 hover:text-slate-700 transition-colors">
        ← Volver a productos
    </a>
@endsection

@section('content')

<div class="max-w-3xl">
    <form method="POST" action="{{ route('admin.productos.update', $producto) }}" enctype="multipart/form-data"
          class="space-y-6">
        @csrf
        @method('PUT')

        <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-5">
            <h2 class="font-semibold text-slate-700 text-sm uppercase tracking-wide border-b border-slate-100 pb-3">
                Datos del producto
            </h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div class="sm:col-span-2">
                    <label class="block text-sm font-medium text-slate-700 mb-1.5">Nombre <span class="text-rose-500">*</span></label>
                    <input type="text" name="nombre" value="{{ old('nombre', $producto->nombre) }}" required
                           class="w-full border rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500
                                  {{ $errors->has('nombre') ? 'border-red-400' : 'border-slate-300' }}">
                    @error('nombre') <p class="mt-1 text-xs text-red-600">{{ $message }}</p> @enderror
                </div>

                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1.5">Categoría <span class="text-rose-500">*</span></label>
                    <select name="categoria_id" required
                            class="w-full border rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500
                                   {{ $errors->has('categoria_id') ? 'border-red-400' : 'border-slate-300' }}">
                        @foreach ($categorias as $cat)
                            <option value="{{ $cat->id }}"
                                    {{ old('categoria_id', $producto->categoria_id) == $cat->id ? 'selected' : '' }}>
                                {{ $cat->nombre }}
                            </option>
                        @endforeach
                    </select>
                    @error('categoria_id') <p class="mt-1 text-xs text-red-600">{{ $message }}</p> @enderror
                </div>

                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1.5">Precio (€) <span class="text-rose-500">*</span></label>
                    <input type="number" name="precio" value="{{ old('precio', $producto->precio) }}" min="0.01" step="0.01" required
                           class="w-full border rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500
                                  {{ $errors->has('precio') ? 'border-red-400' : 'border-slate-300' }}">
                    @error('precio') <p class="mt-1 text-xs text-red-600">{{ $message }}</p> @enderror
                </div>

                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1.5">Stock</label>
                    <input type="number" name="stock" value="{{ old('stock', $producto->stock) }}" min="0"
                           class="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    @error('stock') <p class="mt-1 text-xs text-red-600">{{ $message }}</p> @enderror
                </div>

                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1.5">Descuento (%)</label>
                    <input type="number" name="descuento" value="{{ old('descuento', $producto->descuento ?? 0) }}" min="0" max="100"
                           class="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    @error('descuento') <p class="mt-1 text-xs text-red-600">{{ $message }}</p> @enderror
                </div>

                <div class="sm:col-span-2">
                    <label class="block text-sm font-medium text-slate-700 mb-1.5">Descripción</label>
                    <textarea name="descripcion" rows="3"
                              class="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none">{{ old('descripcion', $producto->descripcion) }}</textarea>
                    @error('descripcion') <p class="mt-1 text-xs text-red-600">{{ $message }}</p> @enderror
                </div>

                <div class="sm:col-span-2">
                    <label class="block text-sm font-medium text-slate-700 mb-2">Foto</label>

                    {{-- Foto actual --}}
                    @if ($producto->foto)
                        <div class="mb-4 p-3 bg-slate-50 border border-slate-200 rounded-lg inline-flex flex-col items-start gap-2">
                            <p class="text-xs font-medium text-slate-500">Foto actual</p>
                            <img src="{{ $producto->foto_url }}" alt="{{ $producto->nombre }}"
                                 class="h-40 w-40 object-cover rounded-lg border border-slate-200 shadow-sm">
                        </div>
                    @else
                        <p class="mb-3 text-xs text-slate-400 italic">Este producto no tiene foto.</p>
                    @endif

                    {{-- Subir nueva --}}
                    <label class="block text-xs font-medium text-slate-500 mb-1.5">
                        {{ $producto->foto ? 'Reemplazar foto' : 'Subir foto' }}
                    </label>
                    <input type="file" name="foto" accept="image/*" id="foto-input"
                           class="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:bg-indigo-50 file:text-indigo-700">
                    <p class="mt-1 text-xs text-slate-400">Máx. 4MB · R2. Si no seleccionas archivo se mantiene la foto actual.</p>
                    @error('foto') <p class="mt-1 text-xs text-red-600">{{ $message }}</p> @enderror

                    {{-- Preview de la nueva foto antes de guardar --}}
                    <div id="foto-preview-wrap" class="hidden mt-3">
                        <p class="text-xs font-medium text-slate-500 mb-1.5">Nueva foto (previsualización)</p>
                        <img id="foto-preview" class="h-40 w-40 object-cover rounded-lg border border-slate-200 shadow-sm">
                    </div>
                </div>
            </div>
        </div>

        {{-- Especificaciones --}}
        <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <h2 class="font-semibold text-slate-700 text-sm uppercase tracking-wide">Especificaciones</h2>
                <button type="button" onclick="addSpec()"
                        class="inline-flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
                    </svg>
                    Añadir
                </button>
            </div>

            <div id="specs-container" class="space-y-3">
                {{-- Relleno via JS con valores actuales --}}
            </div>
            <p id="specs-empty" class="text-sm text-slate-400 text-center py-4 hidden">
                Sin especificaciones. Pulsa "Añadir" para agregar.
            </p>
        </div>

        <div class="flex gap-3">
            <button type="submit"
                    class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors">
                Guardar cambios
            </button>
            <a href="{{ route('admin.productos.index') }}"
               class="border border-slate-300 hover:bg-slate-50 text-slate-600 font-medium px-6 py-2.5 rounded-lg text-sm transition-colors">
                Cancelar
            </a>
        </div>
    </form>
</div>

@endsection

@push('scripts')
<script>
const especificaciones = @json($especificaciones);
const existingSpecs = @json($producto->productoEspecificaciones->map(fn($pe) => ['especificacion_id' => $pe->especificacion_id, 'valor' => $pe->valor]));
let specIndex = 0;

function addSpec(specId = '', valor = '') {
    const container = document.getElementById('specs-container');
    document.getElementById('specs-empty').classList.add('hidden');

    const row = document.createElement('div');
    row.className = 'flex gap-3 items-center';
    row.dataset.specRow = specIndex;

    const options = especificaciones.map(e =>
        `<option value="${e.id}" ${e.id == specId ? 'selected' : ''}>${e.nombre}</option>`
    ).join('');

    row.innerHTML = `
        <select name="especificaciones[${specIndex}][especificacion_id]"
                class="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="">Selecciona especificación</option>
            ${options}
        </select>
        <input type="text" name="especificaciones[${specIndex}][valor]" value="${valor}"
               placeholder="Valor (ej: 16GB)"
               class="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
        <button type="button" onclick="removeSpec(this)"
                class="text-slate-400 hover:text-rose-500 transition-colors flex-shrink-0">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
        </button>
    `;
    container.appendChild(row);
    specIndex++;
}

function removeSpec(btn) {
    btn.closest('[data-spec-row]').remove();
    if (!document.querySelectorAll('[data-spec-row]').length) {
        document.getElementById('specs-empty').classList.remove('hidden');
    }
}

// Cargar especificaciones existentes
if (existingSpecs.length) {
    existingSpecs.forEach(s => addSpec(s.especificacion_id, s.valor));
} else {
    document.getElementById('specs-empty').classList.remove('hidden');
}

// Preview de foto
document.getElementById('foto-input').addEventListener('change', function () {
    const preview = document.getElementById('foto-preview');
    const wrap = document.getElementById('foto-preview-wrap');
    if (this.files && this.files[0]) {
        preview.src = URL.createObjectURL(this.files[0]);
        wrap.classList.remove('hidden');
    }
});
</script>
@endpush
