import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api, { type Producto } from '../api/client'
import { useAuth } from '../context/AuthContext'

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuth()
  const [producto, setProducto] = useState<Producto | null>(null)
  const [loading, setLoading] = useState(true)
  const [cantidad, setCantidad] = useState(1)
  const [message, setMessage] = useState('')
  const [adding, setAdding] = useState(false)
  const [wishlist, setWishlist] = useState(false)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    api.get(`/productos/${id}`)
      .then((res) => setProducto(res.data))
      .finally(() => setLoading(false))
  }, [id])

  const addToCart = async () => {
    if (!user) { setMessage('Debes iniciar sesión'); return }
    setAdding(true)
    try {
      await api.post('/cesta/productos', { producto_id: Number(id), cantidad })
      setMessage('Producto añadido al carrito')
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Error al añadir')
    }
    setAdding(false)
  }

  const addToWishlist = async () => {
    if (!user) { setMessage('Debes iniciar sesión'); return }
    try {
      await api.post('/deseos', { producto_id: Number(id) })
      setWishlist(true)
      setMessage('Añadido a favoritos')
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Error')
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
    </div>
  )

  if (!producto) return (
    <div className="max-w-7xl mx-auto px-4 py-16 text-center">
      <h2 className="text-2xl font-bold text-gray-900">Producto no encontrado</h2>
      <Link to="/productos" className="text-primary-600 mt-4 inline-block">Volver a productos</Link>
    </div>
  )

  const hasDiscount = producto.descuento > 0

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-primary-600">Inicio</Link>
        <span className="mx-2">/</span>
        <Link to="/productos" className="hover:text-primary-600">Productos</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{producto.nombre}</span>
      </nav>

      {message && (
        <div className={`p-4 rounded-lg mb-6 ${message.includes('Error') || message.includes('Debes') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
          <img src={producto.foto} alt={producto.nombre} className="w-full h-full object-cover" />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900">{producto.nombre}</h1>
          {producto.categoria && (
            <Link to={`/categorias/${producto.categoria.nombre}`} className="text-sm text-primary-600 hover:underline mt-1 inline-block">
              {producto.categoria.nombre}
            </Link>
          )}

          <div className="mt-4 flex items-baseline gap-3">
            {hasDiscount ? (
              <>
                <span className="text-3xl font-bold text-primary-600">{producto.precioDescuento.toFixed(2)}€</span>
                <span className="text-xl text-gray-400 line-through">{producto.precio.toFixed(2)}€</span>
                <span className="bg-red-100 text-red-700 text-sm font-semibold px-2 py-0.5 rounded">-{producto.descuento}%</span>
              </>
            ) : (
              <span className="text-3xl font-bold text-gray-900">{producto.precio.toFixed(2)}€</span>
            )}
          </div>

          <p className={`mt-2 font-medium ${producto.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
            {producto.stock > 0 ? `En stock (${producto.stock} unidades)` : 'Agotado'}
          </p>

          {producto.descripcion && (
            <p className="mt-6 text-gray-600 leading-relaxed">{producto.descripcion}</p>
          )}

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button onClick={() => setCantidad(Math.max(1, cantidad - 1))} className="px-3 py-2 hover:bg-gray-100">-</button>
              <span className="px-4 py-2 font-medium min-w-[3rem] text-center">{cantidad}</span>
              <button onClick={() => setCantidad(Math.min(producto.stock, cantidad + 1))} className="px-3 py-2 hover:bg-gray-100">+</button>
            </div>
            <button onClick={addToCart} disabled={adding || producto.stock === 0} className="btn-primary flex-1">
              {adding ? 'Añadiendo...' : 'Añadir al carrito'}
            </button>
            {user && (
              <button onClick={addToWishlist} className={`p-3 rounded-lg border ${wishlist ? 'bg-red-50 border-red-200 text-red-500' : 'border-gray-300 text-gray-400 hover:text-red-500'}`}>
                <svg className="w-6 h-6" fill={wishlist ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            )}
          </div>

          {producto.especificaciones && producto.especificaciones.length > 0 && (
            <div className="mt-10">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Especificaciones</h3>
              <div className="border border-gray-200 rounded-lg divide-y divide-gray-200">
                {producto.especificaciones.map((esp, i) => (
                  <div key={i} className="flex px-4 py-3">
                    <span className="w-1/2 text-gray-500 text-sm">{esp.nombre}</span>
                    <span className="w-1/2 text-gray-900 text-sm font-medium">{esp.valor}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
