<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductoCesta extends Model
{
    protected $fillable = ['cesta_id', 'producto_id', 'cantidad', 'precio_unitario'];

    public function cesta()
    {
        return $this->belongsTo(Cesta::class);
    }

    public function producto()
    {
        return $this->belongsTo(Producto::class);
    }
}
