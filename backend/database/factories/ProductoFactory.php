<?php

namespace Database\Factories;

use App\Models\Categoria;
use App\Models\Producto;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Producto>
 */
class ProductoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nombre' => $this->faker->word(),
            'precio' => $this->faker->numberBetween(10, 1000),
            'descripcion' => $this->faker->sentence(),
            'categoria_id' => Categoria::factory(),
            'stock' => $this->faker->numberBetween(0, 50),
        ];
    }
}
