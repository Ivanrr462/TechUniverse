<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CestaResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'usuario' => [
                'id' => $this->user->id,
                'nombre' => $this->user->name,
                'correo' => $this->user->email,
            ],
            'productos' => $this->productosIngresados->map(function ($producto) {
                $precio = (float) $producto->pivot->precio_unitario;
                $descuento = (float) ($producto->descuento ?? 0);
                $precioDescuento = $descuento > 0
                    ? round($precio - ($precio * ($descuento / 100)), 2)
                    : $precio;

                return [
                    'id' => $producto->id,
                    'nombre' => $producto->nombre,
                    'foto' => $producto->foto_url,
                    'precio_unitario' => $precio,
                    'descuento' => $descuento,
                    'precioDescuento' => $precioDescuento,
                    'cantidad' => $producto->pivot->cantidad,
                    'subtotal' => round($precioDescuento * $producto->pivot->cantidad, 2),
                ];
            }),
            'precio_total' => round($this->productosIngresados->sum(function ($producto) {
                $precio = (float) $producto->pivot->precio_unitario;
                $descuento = (float) ($producto->descuento ?? 0);
                $efectivo = $descuento > 0
                    ? round($precio - ($precio * ($descuento / 100)), 2)
                    : $precio;

                return $efectivo * $producto->pivot->cantidad;
            }), 2),
            'cantidad_total' => $this->productosIngresados->sum(function ($producto) {
                return $producto->pivot->cantidad;
            }),
        ];
    }
}
