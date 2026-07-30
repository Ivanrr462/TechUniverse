<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Acceso — TechStore Admin</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-900 min-h-screen flex items-center justify-center p-4">

<div class="w-full max-w-sm">
    <div class="text-center mb-8">
        <h1 class="text-2xl font-bold text-white">TechStore</h1>
        <p class="text-slate-400 text-sm mt-1">Panel de administración</p>
    </div>

    <div class="bg-white rounded-2xl shadow-xl p-8">
        <h2 class="text-lg font-semibold text-slate-800 mb-6">Inicia sesión</h2>

        <form method="POST" action="{{ route('admin.login.post') }}" class="space-y-4">
            @csrf

            <div>
                <label for="email" class="block text-sm font-medium text-slate-700 mb-1.5">
                    Correo electrónico
                </label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    value="{{ old('email') }}"
                    required
                    autofocus
                    class="w-full px-3.5 py-2.5 border rounded-lg text-sm text-slate-900
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                           {{ $errors->has('email') ? 'border-red-400 bg-red-50' : 'border-slate-300' }}"
                    placeholder="admin@ejemplo.com"
                >
                @error('email')
                    <p class="mt-1.5 text-xs text-red-600">{{ $message }}</p>
                @enderror
            </div>

            <div>
                <label for="password" class="block text-sm font-medium text-slate-700 mb-1.5">
                    Contraseña
                </label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    required
                    class="w-full px-3.5 py-2.5 border rounded-lg text-sm text-slate-900
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                           {{ $errors->has('password') ? 'border-red-400 bg-red-50' : 'border-slate-300' }}"
                    placeholder="••••••••"
                >
                @error('password')
                    <p class="mt-1.5 text-xs text-red-600">{{ $message }}</p>
                @enderror
            </div>

            <button
                type="submit"
                class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-4 rounded-lg text-sm transition-colors mt-2">
                Entrar
            </button>
        </form>
    </div>
</div>

</body>
</html>
