<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory;

    protected $fillable = ['nombre', 'precio', 'stock', 'descripcion', 'descuento', 'categoria_id', 'foto'];

    protected $appends = ['foto_url', 'precio_descuento'];

    public function getPrecioDescuentoAttribute(): float
    {
        $precio = (float) $this->precio;
        $descuento = (float) ($this->descuento ?? 0);

        return $descuento > 0
            ? round($precio - ($precio * ($descuento / 100)), 2)
            : $precio;
    }

    public function getFotoUrlAttribute(): string
    {
        $default = 'https://pub-45ac6957fba64f04a0f8a0fd40292c60.r2.dev/productos/dvEcf0VxtjxaHq3yAHBw9uQr4CW4keFw3GFAUvqa.jpg';

        if (! $this->foto || $this->foto === '') {
            return $default;
        }

        // Foto ya es URL completa (formato nuevo o default antiguo)
        if (str_starts_with($this->foto, 'http')) {
            return $this->foto;
        }

        // Foto es ruta relativa (formato antiguo): reconstruir solo si tenemos la base
        $base = config('filesystems.disks.r2.url') ?: env('R2_PUBLIC_URL');
        if (! $base) {
            return $default; // Sin base configurada, evitar URL rota
        }

        return rtrim($base, '/').'/'.$this->foto;
    }

    public function categoria()
    {
        return $this->belongsTo(Categoria::class);
    }

    public function usuariosQueLoDesean()
    {
        return $this->belongsToMany(User::class, 'producto_user');
    }

    public function cestas()
    {
        return $this->belongsToMany(Cesta::class, 'producto_cestas', 'producto_id', 'cesta_id');
    }

    public function especificaciones()
    {
        return $this->belongsToMany(especificaciones::class, 'producto_especificacions', 'producto_id', 'especificacion_id')
            ->withPivot('valor')
            ->withTimestamps();
    }

    public function productoEspecificaciones()
    {
        return $this->hasMany(ProductoEspecificacion::class);
    }
}
