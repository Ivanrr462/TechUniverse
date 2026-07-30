<?php

namespace Tests\Feature;

use App\Models\especificaciones;
use App\Models\Producto;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class EspecificacionApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_puede_listar_especificaciones()
    {
        especificaciones::factory()->count(3)->create();

        $response = $this->getJson('/api/especificacion');

        $response->assertStatus(200)
            ->assertJsonCount(3, 'data');
    }

    public function test_puede_listar_especificaciones_con_productos()
    {
        $especificacion = especificaciones::factory()->create();
        $producto = Producto::factory()->create();

        $especificacion->productoEspecificaciones()->create([
            'producto_id' => $producto->id,
            'especificacion_id' => $especificacion->id,
            'valor' => 'Intel i7',
        ]);

        $response = $this->getJson('/api/especificacion/productos');

        $response->assertStatus(200)
            ->assertJsonCount(1, 'data');
    }

    public function test_puede_mostrar_especificacion_con_productos()
    {
        $especificacion = especificaciones::factory()->create();
        $producto = Producto::factory()->create();

        $especificacion->productoEspecificaciones()->create([
            'especificacion_id' => $especificacion->id,
            'producto_id' => $producto->id,
            'valor' => 'Intel i7',
        ]);

        $response = $this->getJson("/api/especificacion/{$especificacion->id}");

        $response->assertStatus(200)
            ->assertJsonStructure(['data']);
    }

    public function test_devuelve_404_si_especificacion_no_existe()
    {
        $admin = User::factory()->create(['rol' => 'admin']);
        Sanctum::actingAs($admin, ['*']);

        $response = $this->getJson('/api/especificacion/999');

        $response->assertStatus(404);
    }

    public function test_puede_crear_especificacion()
    {
        $admin = User::factory()->create(['rol' => 'admin']);
        Sanctum::actingAs($admin, ['*']);

        $data = [
            'nombre' => 'Nueva Especificacion',
        ];

        $response = $this->postJson('/api/especificacion', $data);

        $response->assertStatus(201)
            ->assertJsonFragment([
                'mensaje' => 'Especificacion creada con éxito',
            ]);

        $this->assertDatabaseHas('especificaciones', [
            'nombre' => 'Nueva Especificacion',
        ]);
    }

    public function test_puede_actualizar_especificacion()
    {
        $admin = User::factory()->create(['rol' => 'admin']);
        Sanctum::actingAs($admin, ['*']);

        $especificacion = especificaciones::factory()->create();

        $data = [
            'nombre' => 'Especificacion Actualizada',
        ];

        $response = $this->putJson("/api/especificacion/{$especificacion->id}", $data);

        $response->assertStatus(200)
            ->assertJsonFragment([
                'mensaje' => 'Actualizado correctamente',
            ]);

        $this->assertDatabaseHas('especificaciones', [
            'nombre' => 'Especificacion Actualizada',
        ]);
    }

    public function test_puede_eliminar_especificacion()
    {
        $admin = User::factory()->create(['rol' => 'admin']);
        Sanctum::actingAs($admin, ['*']);

        $especificacion = especificaciones::factory()->create();

        $response = $this->deleteJson("/api/especificacion/{$especificacion->id}");

        $response->assertStatus(200);

        $this->assertDatabaseMissing('especificaciones', [
            'id' => $especificacion->id,
        ]);
    }
}
