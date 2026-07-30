import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api, { type CestaProducto } from '../api/client'
import { useAuth } from '../context/AuthContext'

export default function Cart() {
  const { user } = useAuth()
  const [productos, setProductos] = useState<CestaProducto[]>([])
  const [precioTotal, setPrecioTotal] = useState(0)
  const [cantidadTotal, setCantidadTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  const fetchCart = () => {
    if (!user) return
    setLoading(true)
    api.get('/cesta')
      .then((res) => {
        setProductos(res.data.productos)
        setPrecioTotal(res.data.precio_total)
        setCantidadTotal(res.data.cantidad_total)
      })
      .catch(() => setMessage('Error al cargar el carrito'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchCart() }, [user])

  const updateQuantity = async (productId: number, cantidad: number) => {
    try {
      await api.put(`/cesta/productos/${productId}`, { cantidad })
      fetchCart()
    } catch { setMessage('Error al actualizar') }
  }

  const removeItem = async (productId: number) => {
    try {
      await api.delete(`/cesta/productos/${productId}`)
      fetchCart()
    } catch { setMessage('Error al eliminar') }
  }

  if (!user) return (
    <div className="max-w-7xl mx-auto px-4 py-16 text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Inicia sesión para ver tu carrito</h2>
      <Link to="/login" className="btn-primary">Iniciar sesión</Link>
    </div>
  )

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Tu carrito</h1>

      {message && (
        <div className={`p-4 rounded-lg mb-6 ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}

      {productos.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg mb-4">Tu carrito está vacío</p>
          <Link to="/productos" className="btn-primary">Ver productos</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {productos.map((item) => (
              <div key={item.id} className="card p-4 flex gap-4 items-center">
                <img src={item.foto} alt={item.nombre} className="w-20 h-20 object-cover rounded-lg" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{item.nombre}</h3>
                  <p className="text-primary-600 font-bold mt-1">
                    {(item.precioDescuento ?? item.precio_unitario).toFixed(2)}€
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQuantity(item.id, item.cantidad - 1)} className="w-8 h-8 rounded border hover:bg-gray-100">-</button>
                  <span className="w-8 text-center font-medium">{item.cantidad}</span>
                  <button onClick={() => updateQuantity(item.id, item.cantidad + 1)} className="w-8 h-8 rounded border hover:bg-gray-100">+</button>
                </div>
                <p className="font-semibold text-gray-900 w-20 text-right">{item.subtotal.toFixed(2)}€</p>
                <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700 p-1">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <div className="card p-6 h-fit">
            <h3 className="font-semibold text-lg text-gray-900 mb-4">Resumen</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Productos</span>
                <span>{cantidadTotal} unidades</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="font-bold text-xl text-primary-600">{precioTotal.toFixed(2)}€</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
