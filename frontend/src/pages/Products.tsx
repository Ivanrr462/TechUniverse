import { useState, useEffect } from 'react'
import api, { type Producto } from '../api/client'
import ProductCard from '../components/ProductCard'

export default function Products() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const [sort, setSort] = useState('')
  const [total, setTotal] = useState(0)

  useEffect(() => {
    setLoading(true)
    const params: Record<string, string | number> = { page }
    if (sort) params.sort = sort
    api.get('/productos', { params })
      .then((res) => {
        setProductos(res.data.data)
        setLastPage(res.data.meta.last_page)
        setTotal(res.data.meta.total)
      })
      .finally(() => setLoading(false))
  }, [page, sort])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Productos</h1>
          <p className="text-gray-500 mt-1">{total} productos encontrados</p>
        </div>
        <select
          value={sort}
          onChange={(e) => { setSort(e.target.value); setPage(1) }}
          className="input-field w-full sm:w-56"
        >
          <option value="">Por defecto</option>
          <option value="precio_asc">Precio: menor a mayor</option>
          <option value="precio_desc">Precio: mayor a menor</option>
          <option value="novedad_desc">Más nuevos primero</option>
          <option value="novedad_asc">Más antiguos primero</option>
        </select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productos.map((p) => <ProductCard key={p.id} producto={p} />)}
          </div>

          {lastPage > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="btn-secondary text-sm"
              >
                Anterior
              </button>
              <span className="text-sm text-gray-500">
                Página {page} de {lastPage}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(lastPage, p + 1))}
                disabled={page === lastPage}
                className="btn-secondary text-sm"
              >
                Siguiente
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
