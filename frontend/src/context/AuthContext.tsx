import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import api from '../api/client'

interface AuthContextType {
  user: { id: number; name: string; email: string; rol: string } | null
  token: string | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthContextType['user'] | null>(null)
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (token) {
      api.get('/user')
        .then((res) => setUser(res.data))
        .catch(() => {
          localStorage.removeItem('token')
          setToken(null)
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [token])

  const login = async (email: string, password: string) => {
    const res = await api.post('/login', { email, password })
    const data = res.data
    localStorage.setItem('token', data.access_token)
    setToken(data.access_token)
    setUser(data.user)
  }

  const register = async (name: string, email: string, password: string) => {
    await api.post('/register', { name, email, password })
  }

  const logout = async () => {
    try {
      await api.post('/logout')
    } catch {
      // ignore
    }
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
  }

  const isAdmin = user?.rol === 'admin'

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
