import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api, { type Producto } from '../api/client'
import { useAuth } from '../context/AuthContext'

export default function Wishlist() {
  const { user } = useAuth()
  const [productos, setProductos] = useState<Producto[]>([])
  const [loading, setLoading] = useState(true)

  const fetchWishlist = () => {
    if (!user) return
    setLoading(true)
    api.get(`/deseos/${user.id}`)
      .then((res) => setProductos(res.data.desea || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchWishlist() }, [user])

  const remove = async (productId: number) => {
    try {
      await api.delete(`/deseos/${productId}`)
      setProductos((prev) => prev.filter((p) => p.id !== productId))
    } catch {}
  }

  if (!user) return (
    <div className="max-w-7xl mx-auto px-4 py-16 text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Inicia sesión para ver tus favoritos</h2>
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
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Mis favoritos</h1>

      {productos.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg mb-4">No tienes productos favoritos</p>
          <Link to="/productos" className="btn-primary">Explorar productos</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productos.map((p) => (
            <div key={p.id} className="card overflow-hidden group">
              <Link to={`/productos/${p.id}`}>
                <div className="aspect-square bg-gray-100">
                  <img src={p.foto} alt={p.nombre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                </div>
              </Link>
              <div className="p-4">
                <Link to={`/productos/${p.id}`}>
                  <h3 className="font-semibold text-gray-900 truncate">{p.nombre}</h3>
                </Link>
                <p className="text-primary-600 font-bold mt-1">{p.precioDescuento.toFixed(2)}€</p>
                <button onClick={() => remove(p.id)} className="text-red-500 text-sm mt-2 hover:underline">
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
