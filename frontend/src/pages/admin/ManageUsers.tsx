import { useState, useEffect } from 'react'
import api, { type User } from '../../api/client'

export default function ManageUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  const fetchUsers = () => {
    setLoading(true)
    api.get('/usuarios')
      .then((res) => setUsers(res.data))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchUsers() }, [])

  const deleteUser = async (id: number) => {
    if (!confirm('¿Eliminar este usuario?')) return
    try {
      await api.delete(`/usuarios/${id}`)
      setMessage('Usuario eliminado')
      fetchUsers()
    } catch { setMessage('Error al eliminar') }
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
    </div>
  )

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Usuarios</h1>

      {message && (
        <div className={`p-4 rounded-lg mb-6 ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Nombre</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Email</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Rol</th>
              <th className="text-right px-4 py-3 font-medium text-gray-500">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{u.name || u.nombre}</td>
                <td className="px-4 py-3 text-gray-500">{u.email || u.correo}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${u.rol === 'admin' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                    {u.rol}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => deleteUser(u.id)} className="text-red-500 hover:text-red-700 text-sm">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
