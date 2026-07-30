export interface Especificacion {
  nombre: string;
  valor: string;
}

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  descuento: number;
  precioDescuento: number;
  stock: number;
  descripcion: string;
  modificado?: string;
  foto: string | null;
  categoria?: { id?: number; nombre: string } | null;
  especificaciones?: Especificacion[];
}

export interface Categoria {
  id: number;
  nombre: string;
}

export interface PaginatedMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface Paginated<T> {
  data: T[];
  meta: PaginatedMeta;
}

export interface User {
  id: number;
  name: string;
  email: string;
  rol?: string;
}

export interface LoginResponse {
  mensaje?: string;
  access_token: string;
  token_type?: string;
  user: User;
}

export interface CartItem {
  id: number;
  nombre: string;
  foto: string | null;
  precio_unitario: number;
  descuento: number;
  precioDescuento: number;
  cantidad: number;
  subtotal: number;
}

export interface Cart {
  id: number;
  usuario: { id: number; nombre: string; correo: string };
  productos: CartItem[];
  precio_total: number;
  cantidad_total: number;
}

export type SortOption = "novedad" | "precio_asc" | "precio_desc";
