import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api, { type Producto, type Categoria } from '../api/client'
import ProductCard from '../components/ProductCard'

export default function Home() {
  const [ofertas, setOfertas] = useState<Producto[]>([])
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.get('/productos/oferta?per_page=8'),
      api.get('/categoria/productos'),
      api.get('/productos/count'),
    ]).then(([ofertasRes, catsRes, countRes]) => {
      setOfertas(ofertasRes.data.data || ofertasRes.data)
      setCategorias(catsRes.data)
      setCount(countRes.data.total)
    }).finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
    </div>
  )

  return (
    <div>
      <section className="bg-gradient-to-br from-primary-700 to-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">TechUniverse</h1>
            <p className="text-xl text-primary-100 mb-8">Descubre los mejores productos tecnológicos con los mejores precios.</p>
            <div className="flex gap-4">
              <Link to="/productos" className="bg-white text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
                Ver productos
              </Link>
              <Link to="/categorias" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                Categorías
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-6 text-center">
            <p className="text-3xl font-bold text-primary-600">{count}</p>
            <p className="text-gray-500 mt-1">Productos disponibles</p>
          </div>
          <div className="card p-6 text-center">
            <p className="text-3xl font-bold text-primary-600">{categorias.length}</p>
            <p className="text-gray-500 mt-1">Categorías</p>
          </div>
          <div className="card p-6 text-center">
            <p className="text-3xl font-bold text-primary-600">{ofertas.length}</p>
            <p className="text-gray-500 mt-1">Ofertas activas</p>
          </div>
        </div>
      </section>

      {ofertas.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Ofertas especiales</h2>
            <Link to="/productos" className="text-primary-600 font-medium hover:underline">Ver todas</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {ofertas.map((p) => <ProductCard key={p.id} producto={p} />)}
          </div>
        </section>
      )}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Categorías</h2>
          <Link to="/categorias" className="text-primary-600 font-medium hover:underline">Ver todas</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categorias.slice(0, 6).map((cat) => (
            <Link key={cat.id} to={`/categorias/${cat.id}`} className="card p-6 hover:border-primary-300">
              <h3 className="font-semibold text-lg text-gray-900">{cat.nombre}</h3>
              <p className="text-sm text-gray-500 mt-1">{cat.productos?.length || 0} productos</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
