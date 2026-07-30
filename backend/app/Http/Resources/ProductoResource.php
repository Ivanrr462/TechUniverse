<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductoResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nombre' => $this->nombre,
            'precio' => (float) $this->precio,
            'descuento' => (float) ($this->descuento ?? 0),
            'precioDescuento' => $this->precio_descuento,
            'stock' => $this->stock,
            'descripcion' => $this->descripcion,

            'modificado' => $this->updated_at
                ? $this->updated_at->format('Y-m-d H:i:s')
                : null,

            'foto' => $this->foto_url,

            'categoria' => $this->categoria ? [
                'nombre' => $this->categoria->nombre,
            ] : null,

            'especificaciones' => $this->productoEspecificaciones->map(function ($productoEspec) {
                return [
                    'nombre' => $productoEspec->especificacion->nombre,
                    'valor' => $productoEspec->valor,
                ];
            }),
        ];
    }
}
