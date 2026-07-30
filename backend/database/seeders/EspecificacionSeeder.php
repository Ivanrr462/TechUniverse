<?php

namespace Database\Seeders;

use App\Models\especificaciones;
use Illuminate\Database\Seeder;

class EspecificacionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Especificaciones generales
        especificaciones::create(['nombre' => 'Procesador']);
        especificaciones::create(['nombre' => 'Memoria RAM']);
        especificaciones::create(['nombre' => 'Almacenamiento']);
        especificaciones::create(['nombre' => 'Pantalla']);
        especificaciones::create(['nombre' => 'Batería']);
        especificaciones::create(['nombre' => 'Cámara']);
        especificaciones::create(['nombre' => 'Peso']);
        especificaciones::create(['nombre' => 'Sistema Operativo']);
        especificaciones::create(['nombre' => 'Resolución']);
        especificaciones::create(['nombre' => 'Tamaño Pantalla']);
        especificaciones::create(['nombre' => 'Frecuencia Refresco']);
        especificaciones::create(['nombre' => 'Conectividad']);
        especificaciones::create(['nombre' => 'Puertos']);
        especificaciones::create(['nombre' => 'Duración Batería']);
        especificaciones::create(['nombre' => 'Carga Rápida']);
        especificaciones::create(['nombre' => 'Resistencia']);
        especificaciones::create(['nombre' => 'Colores disponibles']);
        especificaciones::create(['nombre' => 'Garantía']);
    }
}
