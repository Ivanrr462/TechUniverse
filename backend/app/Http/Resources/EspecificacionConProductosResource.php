<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EspecificacionConProductosResource extends JsonResource
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
            'productos' => $this->productoEspecificaciones->map(function ($productoEspec) {
                return [
                    'id' => $productoEspec->producto_id,
                    'nombre' => $productoEspec->producto->nombre,
                    'valor' => $productoEspec->valor,
                ];
            }),
        ];
    }
}
