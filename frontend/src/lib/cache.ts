const CACHE_PREFIX = "techuniverse_cache_"

interface CacheEntry<T> {
  data: T
  timestamp: number
}

export function getCache<T>(key: string, ttlMs: number): T | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key)
    if (!raw) return null
    const entry: CacheEntry<T> = JSON.parse(raw)
    if (Date.now() - entry.timestamp > ttlMs) {
      localStorage.removeItem(CACHE_PREFIX + key)
      return null
    }
    return entry.data
  } catch {
    return null
  }
}

export function setCache<T>(key: string, data: T): void {
  if (typeof window === "undefined") return
  try {
    const entry: CacheEntry<T> = { data, timestamp: Date.now() }
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(entry))
  } catch {
    // localStorage lleno o deshabilitado
  }
}

export function clearCache(): void {
  if (typeof window === "undefined") return
  const keys = Object.keys(localStorage).filter((k) => k.startsWith(CACHE_PREFIX))
  keys.forEach((k) => localStorage.removeItem(k))
}
