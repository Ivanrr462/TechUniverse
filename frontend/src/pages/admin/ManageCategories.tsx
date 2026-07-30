import { useState, useEffect } from 'react'
import api, { type Categoria } from '../../api/client'

export default function ManageCategories() {
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [nombre, setNombre] = useState('')
  const [editing, setEditing] = useState<number | null>(null)
  const [editNombre, setEditNombre] = useState('')

  const fetchCategories = () => {
    setLoading(true)
    api.get('/categoria')
      .then((res) => setCategorias(res.data))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchCategories() }, [])

  const create = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nombre.trim()) return
    try {
      await api.post('/categoria', { nombre })
      setMessage('Categoría creada')
      setNombre('')
      fetchCategories()
    } catch { setMessage('Error al crear') }
  }

  const update = async (id: number) => {
    if (!editNombre.trim()) return
    try {
      await api.put(`/categoria/${id}`, { nombre: editNombre })
      setMessage('Categoría actualizada')
      setEditing(null)
      fetchCategories()
    } catch { setMessage('Error al actualizar') }
  }

  const remove = async (id: number) => {
    if (!confirm('¿Eliminar esta categoría?')) return
    try {
      await api.delete(`/categoria/${id}`)
      setMessage('Categoría eliminada')
      fetchCategories()
    } catch { setMessage('Error al eliminar') }
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
    </div>
  )

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Categorías</h1>

      {message && (
        <div className={`p-4 rounded-lg mb-6 ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}

      <form onSubmit={create} className="flex gap-3 mb-8">
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nueva categoría" className="input-field flex-1" required />
        <button type="submit" className="btn-primary">Crear</button>
      </form>

      <div className="space-y-2">
        {categorias.map((cat) => (
          <div key={cat.id} className="card p-4 flex items-center justify-between">
            {editing === cat.id ? (
              <div className="flex gap-2 flex-1 mr-4">
                <input type="text" value={editNombre} onChange={(e) => setEditNombre(e.target.value)} className="input-field flex-1" />
                <button onClick={() => update(cat.id)} className="btn-primary text-sm">Guardar</button>
                <button onClick={() => setEditing(null)} className="btn-secondary text-sm">Cancelar</button>
              </div>
            ) : (
              <>
                <span className="font-medium text-gray-900">{cat.nombre}</span>
                <div className="flex gap-2">
                  <button onClick={() => { setEditing(cat.id); setEditNombre(cat.nombre) }} className="text-primary-600 hover:underline text-sm">Editar</button>
                  <button onClick={() => remove(cat.id)} className="text-red-500 hover:underline text-sm">Eliminar</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
