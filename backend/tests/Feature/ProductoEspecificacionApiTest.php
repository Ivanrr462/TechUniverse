<?php

namespace Tests\Feature;

use App\Models\especificaciones;
use App\Models\Producto;
use App\Models\ProductoEspecificacion;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class ProductoEspecificacionApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_puede_añadir_especificacion_a_producto()
    {
        $admin = User::factory()->create(['rol' => 'admin']);
        Sanctum::actingAs($admin, ['*']);

        $producto = Producto::factory()->create();
        $especificacion = especificaciones::factory()->create();

        $response = $this->postJson('/api/especificacion/productos', [
            'producto_id' => $producto->id,
            'especificacion_id' => $especificacion->id,
            'valor' => 'Intel i7 11th Gen',
        ]);

        $response->assertStatus(201)
            ->assertJsonFragment([
                'message' => 'Especificacion añadida al producto',
            ]);

        $this->assertDatabaseHas('producto_especificacions', [
            'producto_id' => $producto->id,
            'especificacion_id' => $especificacion->id,
            'valor' => 'Intel i7 11th Gen',
        ]);
    }

    public function test_puede_actualizar_valor_especificacion_en_producto()
    {
        $admin = User::factory()->create(['rol' => 'admin']);
        Sanctum::actingAs($admin, ['*']);

        $producto = Producto::factory()->create();
        $especificacion = especificaciones::factory()->create();

        $productoEspec = ProductoEspecificacion::create([
            'producto_id' => $producto->id,
            'especificacion_id' => $especificacion->id,
            'valor' => 'Intel i5',
        ]);

        $response = $this->putJson("/api/especificacion/productos/{$productoEspec->id}", [
            'valor' => 'Intel i7 12th Gen',
        ]);

        $response->assertStatus(200)
            ->assertJsonFragment([
                'message' => 'Especificacion actualizada',
            ]);

        $this->assertDatabaseHas('producto_especificacions', [
            'id' => $productoEspec->id,
            'valor' => 'Intel i7 12th Gen',
        ]);
    }

    public function test_puede_eliminar_especificacion_de_producto()
    {
        $admin = User::factory()->create(['rol' => 'admin']);
        Sanctum::actingAs($admin, ['*']);

        $producto = Producto::factory()->create();
        $especificacion = especificaciones::factory()->create();

        $productoEspec = ProductoEspecificacion::create([
            'producto_id' => $producto->id,
            'especificacion_id' => $especificacion->id,
            'valor' => 'Intel i7',
        ]);

        $response = $this->deleteJson("/api/especificacion/productos/{$productoEspec->id}");

        $response->assertStatus(200)
            ->assertJsonFragment([
                'message' => 'Especificacion eliminada del producto',
            ]);

        $this->assertDatabaseMissing('producto_especificacions', [
            'id' => $productoEspec->id,
        ]);
    }

    public function test_devuelve_404_si_especificacion_no_existe_al_actualizar()
    {
        $admin = User::factory()->create(['rol' => 'admin']);
        Sanctum::actingAs($admin, ['*']);

        $response = $this->putJson('/api/especificacion/productos/999', [
            'valor' => 'Test',
        ]);

        $response->assertStatus(404);
    }

    public function test_devuelve_404_si_especificacion_no_existe_al_eliminar()
    {
        $admin = User::factory()->create(['rol' => 'admin']);
        Sanctum::actingAs($admin, ['*']);

        $response = $this->deleteJson('/api/especificacion/productos/999');

        $response->assertStatus(404);
    }
}
