# TechUniverse — E-commerce completo

<div align="center">
  <img src="https://img.shields.io/badge/PHP-%23777BB4.svg?style=for-the-badge&logo=php&logoColor=white">
  <img src="https://img.shields.io/badge/Laravel-%23FF2D20.svg?style=for-the-badge&logo=laravel&logoColor=white">
  <img src="https://img.shields.io/badge/React-%2361DAFB.svg?style=for-the-badge&logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/TypeScript-%233178C6.svg?style=for-the-badge&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/Tailwind_CSS-%2306B6D4.svg?style=for-the-badge&logo=tailwindcss&logoColor=white">
  <img src="https://img.shields.io/badge/MySQL-%234479A1.svg?style=for-the-badge&logo=mysql&logoColor=white">
  <br />
  <img src="https://img.shields.io/badge/Vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white">
  <img src="https://img.shields.io/badge/Zustand-%23E34F26.svg?style=for-the-badge&logo=&logoColor=white">
</div>

---

Aplicación completa de e-commerce de tecnología dividida en dos partes:

| Carpeta | Tecnología | Descripción |
|---------|-----------|-------------|
| [`backend/`](./backend) | Laravel 11 + PHP 8 + MySQL | API REST con autenticación Sanctum, panel admin FilamentPHP y documentación Swagger |
| [`frontend/`](./frontend) | Vite + React 19 + TypeScript + Tailwind CSS v4 | SPA (client-side) con TanStack Router, catálogo, carrito, wishlist y caché local |

---

## 🚀 Inicio rápido

```bash
git clone https://github.com/Ivanrr462/API-Ecommerce.git
cd API-Ecommerce

# Backend
cd backend
cp .env.example .env
composer install
php artisan key:generate
# Configurar BD en .env y luego:
php artisan migrate --seed
php artisan serve

# Frontend (nueva terminal)
cd frontend
npm install
npm run dev
```

Frontend disponible en `http://localhost:5173`, backend en `http://localhost:8000`.

---

## 📁 Estructura del proyecto

```
API-Ecommerce/
├── backend/                    # API Laravel 11
│   ├── app/
│   │   ├── Http/Controllers/Api/   ← Producto, Categoria, Cesta, Wishlist, Auth…
│   │   ├── Http/Resources/         ← Transformadores de respuesta JSON
│   │   └── Models/
│   ├── config/
│   ├── database/
│   ├── routes/
│   │   └── api.php                 ← Definición de todos los endpoints
│   └── ...
├── frontend/                   # SPA Vite (client-side) + TanStack Router
│   ├── src/
│   │   ├── routes/                 ← Páginas (TanStack Router file-based)
│   │   ├── components/             ← UI reutilizable (shadcn/ui + Radix)
│   │   ├── hooks/                  ← Hooks TanStack Query (useProducts, useCart…)
│   │   ├── services/               ← Llamadas API con caché localStorage
│   │   ├── store/                  ← Estado global (Zustand persist)
│   │   ├── lib/                    ← API client, utilidades, caché
│   │   └── types/                  ← Tipos TypeScript
│   ├── vercel.json                 ← Config de deploy (Vite build + SPA rewrites)
│   └── ...
└── README.md
```

---

## ✨ Funcionalidades

- Catálogo de productos con búsqueda, filtro por categoría y ordenación (precio/novedad)
- Carrito de compra con gestión de cantidades
- Lista de deseos (wishlist)
- Autenticación de usuarios (register/login)
- Ofertas y descuentos destacados
- Especificaciones técnicas de productos
- **Caché local en localStorage** — productos, categorías y detalles se cachean para evitar llamadas API en recargas
- Panel de administración propio del backend (FilamentPHP)

---

## 🔌 API

La API base es `https://ivan123.alwaysdata.net/api/`. Endpoints principales:

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| POST | `/api/login` | No | Iniciar sesión |
| POST | `/api/register` | No | Registrar usuario |
| GET | `/api/productos` | No | Catálogo paginado (`?sort=`, `?page=`) |
| GET | `/api/productos/{id}` | No | Detalle de producto |
| GET | `/api/productos/oferta` | No | Productos con descuento |
| GET | `/api/categoria` | No | Lista de categorías |
| GET | `/api/cesta` | Sí | Carrito del usuario |
| POST | `/api/deseos` | Sí | Añadir a wishlist |

Documentación completa de endpoints en [`backend/README.md`](./backend/README.md).

---

## 📝 Licencia

MIT — Desarrollado por [Iván Ríos](https://github.com/Ivanrr462)
