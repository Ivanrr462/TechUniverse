import axios from 'axios'

const API_BASE = 'https://ivan123.alwaysdata.net/api'

const api = axios.create({
  baseURL: API_BASE,
  headers: { Accept: 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(err)
  }
)

export default api

export interface Producto {
  id: number
  nombre: string
  precio: number
  descuento: number
  precioDescuento: number
  stock: number
  descripcion: string
  foto: string
  categoria: { nombre: string } | null
  especificaciones: { nombre: string; valor: string }[]
}

export interface Categoria {
  id: number
  nombre: string
  productos?: Producto[]
}

export interface Cesta {
  id: number
  usuario: { id: number; nombre: string; correo: string }
  productos: CestaProducto[]
  precio_total: number
  cantidad_total: number
}

export interface CestaProducto {
  id: number
  nombre: string
  foto: string
  precio_unitario: number
  descuento: number
  precioDescuento: number
  cantidad: number
  subtotal: number
}

export interface User {
  id: number
  name: string
  email: string
  rol: string
  nombre?: string
  correo?: string
}

export interface Especificacion {
  id: number
  nombre: string
  productos?: { id: number; nombre: string; valor: string }[]
}
