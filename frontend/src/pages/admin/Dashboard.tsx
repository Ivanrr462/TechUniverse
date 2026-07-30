import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api/client'

interface Stats {
  productos: number
  categorias: number
  usuarios: number
  ofertas: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ productos: 0, categorias: 0, usuarios: 0, ofertas: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.get('/productos/count'),
      api.get('/categoria'),
      api.get('/productos/oferta'),
      api.get('/usuarios'),
    ]).then(([prodRes, catRes, ofertaRes, userRes]) => {
      setStats({
        productos: prodRes.data.total,
        categorias: catRes.data.length,
        ofertas: ofertaRes.data.data?.length || 0,
        usuarios: userRes.data.length,
      })
    }).finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
    </div>
  )

  const cards = [
    { label: 'Productos', value: stats.productos, link: '/admin/productos', color: 'bg-blue-500' },
    { label: 'Categorías', value: stats.categorias, link: '/admin/categorias', color: 'bg-green-500' },
    { label: 'Ofertas', value: stats.ofertas, link: '/admin/productos', color: 'bg-red-500' },
    { label: 'Usuarios', value: stats.usuarios, link: '/admin/usuarios', color: 'bg-purple-500' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Panel de administración</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {cards.map((card) => (
          <Link key={card.label} to={card.link} className="card p-6 hover:shadow-lg transition-shadow">
            <div className={`w-12 h-12 rounded-lg ${card.color} flex items-center justify-center mb-4`}>
              <span className="text-white text-xl font-bold">{card.value}</span>
            </div>
            <h3 className="font-semibold text-gray-900">{card.label}</h3>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/admin/productos" className="card p-6 hover:border-primary-300">
          <h3 className="font-semibold text-lg">Gestionar productos</h3>
          <p className="text-sm text-gray-500 mt-1">Crear, editar y eliminar productos</p>
        </Link>
        <Link to="/admin/categorias" className="card p-6 hover:border-primary-300">
          <h3 className="font-semibold text-lg">Gestionar categorías</h3>
          <p className="text-sm text-gray-500 mt-1">Administrar categorías</p>
        </Link>
        <Link to="/admin/usuarios" className="card p-6 hover:border-primary-300">
          <h3 className="font-semibold text-lg">Gestionar usuarios</h3>
          <p className="text-sm text-gray-500 mt-1">Ver y administrar usuarios</p>
        </Link>
      </div>
    </div>
  )
}
