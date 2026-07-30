import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api, { type Producto } from '../api/client'
import ProductCard from '../components/ProductCard'

export default function CategoryDetail() {
  const { id } = useParams<{ id: string }>()
  const [categoria, setCategoria] = useState<{ id: number; nombre: string } | null>(null)
  const [productos, setProductos] = useState<Producto[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    api.get(`/categoria/${id}`)
      .then((res) => {
        setCategoria({ id: res.data.id, nombre: res.data.nombre })
        setProductos(res.data.productos?.data || res.data.productos || [])
      })
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
    </div>
  )

  if (!categoria) return (
    <div className="max-w-7xl mx-auto px-4 py-16 text-center">
      <h2 className="text-2xl font-bold">Categoría no encontrada</h2>
      <Link to="/categorias" className="text-primary-600 mt-4 inline-block">Ver categorías</Link>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-primary-600">Inicio</Link>
        <span className="mx-2">/</span>
        <Link to="/categorias" className="hover:text-primary-600">Categorías</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{categoria.nombre}</span>
      </nav>

      <h1 className="text-2xl font-bold text-gray-900 mb-8">{categoria.nombre}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productos.map((p) => <ProductCard key={p.id} producto={p} />)}
      </div>

      {productos.length === 0 && (
        <p className="text-gray-500 text-center py-12">No hay productos en esta categoría</p>
      )}
    </div>
  )
}
