import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'

import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Categories from './pages/Categories'
import CategoryDetail from './pages/CategoryDetail'
import Login from './pages/Login'
import Register from './pages/Register'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import Profile from './pages/Profile'
import AdminDashboard from './pages/admin/Dashboard'
import ManageProducts from './pages/admin/ManageProducts'
import ManageCategories from './pages/admin/ManageCategories'
import ManageUsers from './pages/admin/ManageUsers'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/productos" element={<Products />} />
              <Route path="/productos/:id" element={<ProductDetail />} />
              <Route path="/categorias" element={<Categories />} />
              <Route path="/categorias/:id" element={<CategoryDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cesta" element={
                <ProtectedRoute><Cart /></ProtectedRoute>
              } />
              <Route path="/deseos" element={
                <ProtectedRoute><Wishlist /></ProtectedRoute>
              } />
              <Route path="/perfil" element={
                <ProtectedRoute><Profile /></ProtectedRoute>
              } />
              <Route path="/admin" element={
                <ProtectedRoute requireAdmin><AdminDashboard /></ProtectedRoute>
              } />
              <Route path="/admin/productos" element={
                <ProtectedRoute requireAdmin><ManageProducts /></ProtectedRoute>
              } />
              <Route path="/admin/categorias" element={
                <ProtectedRoute requireAdmin><ManageCategories /></ProtectedRoute>
              } />
              <Route path="/admin/usuarios" element={
                <ProtectedRoute requireAdmin><ManageUsers /></ProtectedRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}
