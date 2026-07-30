<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

// Recurso para mostrar las categorias con los prodcutos
class CategoriaConProductosResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nombre' => $this->nombre,
            'productos' => $this->productos->map(function ($producto) {
                return [
                    'id' => $producto->id,
                    'stock' => $producto->stock,
                    'nombre' => $producto->nombre,
                    'foto' => $producto->foto_url,
                    'descripcion' => $producto->descripcion,
                    'precio_unitario' => (float) $producto->precio,
                    'descuento' => (float) ($producto->descuento ?? 0),
                    'precioDescuento' => $producto->precio_descuento,
                ];
            }),
        ];
    }
}
