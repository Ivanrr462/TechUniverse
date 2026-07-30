<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(
            [CategoriaSeeder::class,
                EspecificacionSeeder::class,
                ProductoSeeder::class,
                ProductoEspecificacionSeeder::class,
                UsersSeeder::class,
                DeseosSeeder::class]
        );
    }
}
