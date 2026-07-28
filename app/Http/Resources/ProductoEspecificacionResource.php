<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductoEspecificacionResource extends JsonResource
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
            'producto_id' => $this->producto_id,
            'especificacion_id' => $this->especificacion_id,
            'valor' => $this->valor,
            'producto' => $this->whenLoaded('producto', function () {
                return [
                    'id' => $this->producto->id,
                    'nombre' => $this->producto->nombre,
                ];
            }),
            'especificacion' => $this->whenLoaded('especificacion', function () {
                return [
                    'id' => $this->especificacion->id,
                    'nombre' => $this->especificacion->nombre,
                ];
            }),
        ];
    }
}
