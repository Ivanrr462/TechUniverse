# 📋 Changelog

Todos los cambios notables de la API TechUniverse se documentan en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es/1.0.0/).

---

## [1.3.0]

### ✨ Añadido
- Mejoras en los endpoints y recursos de productos, categorías, carrito y wishlist.
- Ajustes en la documentación Swagger y en la respuesta de la API.

### 🔧 Cambiado
- Refactor y limpieza de controladores y recursos para un backend más consistente.
- Mejoras en las pruebas de API y eliminación de tests redundantes.
- Simplificación de componentes administrativos y limpieza de código obsoleto.

### 🐛 Corregido
- Correcciones de calidad de código y ajustes de lint.
- Optimización de la estructura interna para facilitar mantenimiento y escalabilidad.

---

## [1.2.0]

### ✨ Añadido
- Nuevo panel administrativo y endpoint de ofertas.
- Descuentos configurables para productos.
- Nuevas fotos y mejoras en los seeders.

### 🔧 Cambiado
- Mejoras en los resources y correcciones aplicadas en Swagger y pruebas.
- Ajustes de lint y calidad de código.
- Limpieza y refactor del panel de administración previo.

### 🐛 Corregido
- Errores en la subida de fotos.
- Problemas de Cloudflare y compatibilidad en recursos.

---

## [1.1.0]

### ✨ Añadido
- Nuevo endpoint `GET /api/productos/count` que devuelve el total de productos registrados en la base de datos.
- Parámetro opcional `?sort` en `GET /api/productos` para ordenación dinámica:
  - `?sort=precio_asc` → productos más baratos primero
  - `?sort=precio_desc` → productos más caros primero
  - `?sort=novedad_asc` → productos más antiguos primero
  - `?sort=novedad_desc` → productos más nuevos primero

### 🔧 Cambiado
- El endpoint `GET /api/productos` ahora acepta el parámetro `?sort` sin romper el comportamiento por defecto (sin ordenación si no se envía).

---

## [1.0.0]

### ✨ Añadido

#### 🔧 Core del Backend
- CRUD completo para:
  - Productos  
  - Categorías  
  - Especificaciones técnicas  
  - Usuarios
- Relaciones entre entidades totalmente implementadas.
- Validación robusta en endpoints.
- Respuestas JSON estandarizadas.

#### 🔐 Autenticación y Seguridad
- Autenticación basada en tokens con **Laravel Sanctum**.
- Middleware de protección para rutas sensibles.

#### 🛒 Funcionalidades de E‑commerce
- Carrito de compra (Cesta)
- Wishlist (Lista de deseos)
- Gestión de stock y disponibilidad

#### 🧱 Panel de Administración
- Panel admin construido con **FilamentPHP**:
  - Gestión visual de productos, categorías, especificaciones y usuarios
  - Acceso restringido a administradores
  - Formularios y tablas dinámicas

#### 📘 Documentación API
- Documentación completa con **Swagger (OpenAPI 3.0)** usando L5‑Swagger.
- Endpoints documentados con ejemplos de request/response.
- Generación automática del archivo `api-docs.json`.
