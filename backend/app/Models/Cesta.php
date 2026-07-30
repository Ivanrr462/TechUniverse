<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cesta extends Model
{
    protected $fillable = ['user_id', 'stripe_intent_id'];

    public function productosIngresados()
    {
        return $this->belongsToMany(Producto::class, 'producto_cestas', 'cesta_id', 'producto_id')
            ->withPivot('precio_unitario', 'cantidad');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
