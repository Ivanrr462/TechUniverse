<?php

namespace Database\Factories;

use App\Models\especificaciones;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<especificaciones>
 */
class EspecificacionFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     */
    protected $model = especificaciones::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nombre' => $this->faker->unique()->words(2, true),
        ];
    }
}
