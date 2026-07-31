# TechUniverse Frontend

<div align="center">
  <img src="https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react&logoColor=white">
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/Vite-6.4-646CFF?logo=vite&logoColor=white">
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.2-06B6D4?logo=tailwindcss&logoColor=white">
  <img src="https://img.shields.io/badge/Zustand-5.0-E34F26?logo=&logoColor=white">
</div>

SPA (client-side) moderna para el e-commerce TechUniverse. Construida con **Vite + React 19 + TanStack Router**, renderizado 100% en el navegador, y datos cacheados en localStorage para evitar llamadas API innecesarias. Desplegada en Vercel.

---

## ✨ Funcionalidades

- Catálogo completo con búsqueda, filtro por categoría y ordenación (precio/novedad)
- Página de ofertas con productos rebajados
- Carrito de compra con gestión de cantidades (autenticado)
- Lista de deseos / wishlist (autenticado)
- Registro e inicio de sesión
- Panel de cuenta con resumen de cesta y favoritos
- **Caché local** — productos, categorías y detalles se almacenan en localStorage (TTL configurable)
- Diseño responsive con animaciones

---

## 🚀 Stack principal

| Tecnología | Versión | Uso |
|-----------|---------|-----|
| React | 19.2 | UI |
| Vite | 6.4 | Bundler y dev server |
| TanStack Router | 1.170 | Enrutamiento file-based tipado |
| TanStack React Query | 5.101 | Fetching y caché en memoria |
| Zustand | 5.0 | Estado global (auth persistido) |
| Tailwind CSS | 4.2 | Estilos |
| Axios | 1.18 | Peticiones HTTP |
| Radix UI + shadcn/ui | — | Componentes accesibles |
| Sonner | 2.0 | Notificaciones toast |
| Zod | 3.24 | Validación de esquemas |
| Lucide | 0.575 | Iconos |

---

## 📁 Estructura

```
src/
├── routes/                   # Páginas (file-based routing de TanStack)
│   ├── __root.tsx            # Layout raíz (QueryClientProvider, SEO)
│   ├── index.tsx             # Home (hero, ofertas, categorías, novedades)
│   ├── productos.index.tsx   # Catálogo con filtros y paginación
│   ├── productos.$id.tsx     # Detalle de producto
│   ├── categorias.tsx        # Listado de categorías
│   ├── ofertas.tsx           # Productos rebajados
│   ├── login.tsx             # Inicio de sesión
│   ├── registro.tsx          # Registro de usuario
│   ├── _authenticated.tsx    # Layout para rutas protegidas
│   ├── _authenticated.carrito.tsx
│   ├── _authenticated.wishlist.tsx
│   └── _authenticated.cuenta.tsx
├── components/               # Componentes UI reutilizables
│   ├── Layout.tsx            # Layout principal (Navbar + Footer)
│   ├── ProductCard.tsx       # Tarjeta de producto
│   ├── Pagination.tsx        # Paginación
│   └── States.tsx            # Spinner, EmptyState, ErrorState
├── hooks/                    # Hooks TanStack Query
│   ├── useProducts.ts        # Productos, catálogo, ordenación cliente
│   ├── useCategories.ts      # Categorías
│   ├── useCart.ts            # Carrito (fetch + mutations)
│   ├── useWishlist.ts        # Wishlist (fetch + mutations)
│   └── useAuth.ts            # Auth (login, register, logout)
├── services/                 # Capa API con caché localStorage
│   ├── products.service.ts   # Productos cacheados 30 min
│   ├── categories.service.ts # Categorías cacheadas 60 min
│   ├── cart.service.ts       # Carrito (siempre fresco)
│   ├── wishlist.service.ts   # Wishlist (siempre fresco)
│   └── auth.service.ts       # Auth
├── store/
│   └── auth.store.ts         # Zustand persist (token + user)
├── lib/
│   ├── api.ts                # Cliente Axios con interceptors
│   ├── cache.ts              # Utilidad localStorage con TTL
│   ├── format.ts             # Formateo de precios
│   └── utils.ts              # Utilidades generales
├── types/
│   └── index.ts              # Tipos compartidos
└── assets/                   # Imágenes estáticas
```

---

## ⚡ Uso local

```bash
cd frontend
npm install
npm run dev
```

Abre `http://localhost:5173`.

---

## 🔌 API

Consume `https://ivan123.alwaysdata.net/api/` (configurable en `src/lib/api.ts` vía `VITE_API_URL`).

Los endpoints públicos (productos, categorías) se cachean en localStorage:
- **Productos** → 30 minutos
- **Categorías** → 60 minutos
- **Detalle de producto** → 60 minutos

Carrito y wishlist siempre piden datos frescos.

---

## 🏗️ Build producción

```bash
npm run build     # Vite build → dist/
npx vite preview  # Preview local
```

El build genera `dist/` con los assets estáticos (JS, CSS e imágenes).

---

## 🚀 Deploy en Vercel

El proyecto está configurado para desplegarse en Vercel usando el archivo `vercel.json`:

```json
{
  "buildCommand": "vite build",
  "outputDirectory": "dist",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

Pasos:

1. En el dashboard de Vercel, conecta el repositorio y configura:
   - **Root Directory** → `frontend/`
   - **Framework Preset** → `Vite`
   - **Build Command** → `vite build`
   - **Output Directory** → `dist`
2. Vercel genera los assets y sirve `index.html` para todas las rutas (rewrite SPA), permitiendo el routing de TanStack Router en el cliente.

> ⚠️ Importante: el directorio `.vercel/` (build output de deploys previos) está en `.gitignore` y no debe committearse, ya que Vercel lo usaría como output final en lugar del `dist/` generado por `vite build`.

---

## 📦 Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build producción |
| `npm run preview` | Preview del build |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |

---

## 📝 Notas

- El backend ya incluye su propio panel de administración (FilamentPHP). Este frontend se enfoca en la experiencia de tienda para el usuario final.
- Las rutas protegidas (`/carrito`, `/wishlist`, `/cuenta`) redirigen a `/login` si no hay sesión.
- La caché se invalida automáticamente al expirar el TTL; también se puede borrar manualmente con `clearCache()` desde consola.
- Este proyecto no usa SSR: es una SPA que renderiza todo en el cliente, así que el SEO se gestiona con los meta tags definidos en las rutas.
