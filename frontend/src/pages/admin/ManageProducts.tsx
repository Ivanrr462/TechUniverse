import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api, { type Producto } from '../../api/client'

export default function ManageProducts() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  const fetchProducts = () => {
    setLoading(true)
    api.get('/productos?per_page=100')
      .then((res) => setProductos(res.data.data))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchProducts() }, [])

  const deleteProduct = async (id: number) => {
    if (!confirm('¿Eliminar este producto?')) return
    try {
      await api.delete(`/productos/${id}`)
      setMessage('Producto eliminado')
      fetchProducts()
    } catch { setMessage('Error al eliminar') }
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
    </div>
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Productos</h1>
        <Link to="/admin/productos/nuevo" className="btn-primary">Añadir producto</Link>
      </div>

      {message && (
        <div className={`p-4 rounded-lg mb-6 ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Producto</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Precio</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Stock</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Descuento</th>
              <th className="text-right px-4 py-3 font-medium text-gray-500">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {productos.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 flex items-center gap-3">
                  <img src={p.foto} alt={p.nombre} className="w-10 h-10 rounded object-cover" />
                  <span className="font-medium text-gray-900">{p.nombre}</span>
                </td>
                <td className="px-4 py-3">{p.precioDescuento.toFixed(2)}€</td>
                <td className="px-4 py-3">{p.stock}</td>
                <td className="px-4 py-3">{p.descuento > 0 ? `-${p.descuento}%` : '-'}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => deleteProduct(p.id)} className="text-red-500 hover:text-red-700 text-sm">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
