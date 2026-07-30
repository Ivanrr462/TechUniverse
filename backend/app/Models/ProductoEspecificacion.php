<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductoEspecificacion extends Model
{
    protected $fillable = ['producto_id', 'especificacion_id', 'valor'];

    public function producto()
    {
        return $this->belongsTo(Producto::class);
    }

    public function especificacion()
    {
        return $this->belongsTo(especificaciones::class, 'especificacion_id');
    }
}
