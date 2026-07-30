import { useAuth } from '../context/AuthContext'

export default function Profile() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Mi perfil</h1>
      <div className="card p-6 space-y-4">
        <div>
          <label className="text-sm text-gray-500">Nombre</label>
          <p className="font-medium text-gray-900">{user.name}</p>
        </div>
        <div>
          <label className="text-sm text-gray-500">Email</label>
          <p className="font-medium text-gray-900">{user.email}</p>
        </div>
        <div>
          <label className="text-sm text-gray-500">Rol</label>
          <p className="font-medium text-gray-900 capitalize">{user.rol}</p>
        </div>
      </div>
    </div>
  )
}
