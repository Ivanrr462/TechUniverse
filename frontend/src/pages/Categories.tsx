import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api, { type Categoria } from '../api/client'

export default function Categories() {
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/categoria/productos')
      .then((res) => setCategorias(res.data))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Categorías</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categorias.map((cat) => (
          <Link key={cat.id} to={`/categorias/${cat.id}`} className="card p-6 hover:border-primary-300 group">
            <h2 className="font-semibold text-lg text-gray-900 group-hover:text-primary-600 transition-colors">{cat.nombre}</h2>
            <p className="text-sm text-gray-500 mt-1">{cat.productos?.length || 0} productos</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
