# TechUniverse API — Backend

<div align="center">
  <img src="https://img.shields.io/badge/PHP-%23777BB4.svg?style=for-the-badge&logo=php&logoColor=white">
  <img src="https://img.shields.io/badge/Laravel-%23FF2D20.svg?style=for-the-badge&logo=laravel&logoColor=white">
  <img src="https://img.shields.io/badge/MySQL-%234479A1.svg?style=for-the-badge&logo=mysql&logoColor=white">
  <img src="https://img.shields.io/badge/OpenAPI-Swagger-%2385EA2D.svg?style=for-the-badge&logo=swagger&logoColor=black">
</div>

API REST Laravel 11 para el e-commerce TechUniverse. Documentación de todos los endpoints, autenticación Sanctum y panel FilamentPHP.

---

## 📋 Endpoints

### Auth
| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| POST | `/api/register` | No | Registrar usuario (`name`, `email`, `password`) |
| POST | `/api/login` | No | Iniciar sesión → devuelve token |
| POST | `/api/logout` | Sí | Cerrar sesión |
| GET | `/api/user` | Sí | Datos del usuario autenticado |

### Productos
| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| GET | `/api/productos` | No | Lista paginada (12/pp). `?sort=precio_asc\|precio_desc\|novedad_asc\|novedad_desc` |
| GET | `/api/productos/{id}` | No | Detalle de producto |
| GET | `/api/productos/count` | No | Total de productos |
| GET | `/api/productos/oferta` | No | Productos con descuento |
| POST | `/api/productos` | Admin | Crear producto |
| PUT | `/api/productos/{id}` | Admin | Actualizar producto |
| DELETE | `/api/productos/{id}` | Admin | Eliminar producto |

### Categorías
| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| GET | `/api/categoria` | No | Lista de categorías |
| GET | `/api/categoria/productos` | No | Categorías con productos |
| GET | `/api/categoria/{id}` | No | Categoría con sus productos |
| POST | `/api/categoria` | Admin | Crear categoría |
| PUT | `/api/categoria/{id}` | Admin | Actualizar categoría |
| DELETE | `/api/categoria/{id}` | Admin | Eliminar categoría |

### Carrito (Cesta)
| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| GET | `/api/cesta` | Usuario | Ver carrito |
| POST | `/api/cesta/productos` | Usuario | Añadir producto (`producto_id`, `cantidad`) |
| PUT | `/api/cesta/productos/{id}` | Usuario | Actualizar cantidad |
| DELETE | `/api/cesta/productos/{id}` | Usuario | Eliminar producto del carrito |

### Wishlist (Deseos)
| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| GET | `/api/deseos` | Admin | Todas las wishlists |
| GET | `/api/deseos/{id}` | Usuario | Wishlist de un usuario |
| POST | `/api/deseos` | Usuario | Añadir a favoritos (`producto_id`) |
| DELETE | `/api/deseos/{id}` | Usuario | Quitar de favoritos |

### Especificaciones
| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| GET | `/api/especificacion` | No | Lista de especificaciones |
| GET | `/api/especificacion/productos` | No | Especificaciones con productos |
| GET | `/api/especificacion/{id}` | No | Detalle de especificación |
| POST | `/api/especificacion` | Admin | Crear especificación |
| PUT | `/api/especificacion/{id}` | Admin | Actualizar |
| DELETE | `/api/especificacion/{id}` | Admin | Eliminar |

### Usuarios (Admin)
| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| GET | `/api/usuarios` | Admin | Lista de usuarios |
| POST | `/api/usuarios` | Admin | Crear usuario |
| GET | `/api/usuarios/{id}` | Admin | Ver usuario |
| PUT | `/api/usuarios/{id}` | Admin | Actualizar usuario |
| DELETE | `/api/usuarios/{id}` | Admin | Eliminar usuario |

---

## 🚀 Instalación

```bash
cd backend
cp .env.example .env
composer install
php artisan key:generate
# Configurar BD en .env
php artisan migrate --seed
php artisan serve
```

## 🧪 Tests

```bash
php artisan test
```

## 📖 Documentación Swagger

```bash
php artisan l5-swagger:generate
```

Accede a `/api/documentation` para ver la UI de Swagger.

---

> Historial completo de versiones en [CHANGELOG.md](./CHANGELOG.md)
