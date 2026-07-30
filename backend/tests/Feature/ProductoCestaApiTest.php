<?php

namespace Tests\Feature;

use App\Models\Producto;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class ProductoCestaApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_puede_añadir_producto_a_cesta()
    {
        $user = User::factory()->create();
        $user->cesta()->create();

        $producto = Producto::factory()->create(['precio' => 50]);

        Sanctum::actingAs($user, ['*']);

        $response = $this->postJson('/api/cesta/productos', [
            'producto_id' => $producto->id,
            'cantidad' => 2,
        ]);

        $response->assertStatus(200)
            ->assertJsonFragment([
                'message' => 'Producto añadido a la cesta',
            ]);

        $this->assertDatabaseHas('producto_cestas', [
            'cesta_id' => $user->cesta->id,
            'producto_id' => $producto->id,
            'cantidad' => 2,
            'precio_unitario' => 50,
        ]);
    }

    public function test_puede_actualizar_cantidad_producto_en_cesta()
    {
        $user = User::factory()->create();
        $user->cesta()->create();

        $producto = Producto::factory()->create(['precio' => 60]);
        $user->cesta->productosIngresados()->attach($producto->id, [
            'cantidad' => 1,
            'precio_unitario' => 60,
        ]);

        Sanctum::actingAs($user, ['*']);

        $response = $this->putJson("/api/cesta/productos/{$producto->id}", [
            'cantidad' => 3,
        ]);

        $response->assertStatus(200)
            ->assertJsonFragment([
                'message' => 'Cantidad actualizada',
            ]);

        $this->assertDatabaseHas('producto_cestas', [
            'cesta_id' => $user->cesta->id,
            'producto_id' => $producto->id,
            'cantidad' => 3,
        ]);
    }

    public function test_puede_eliminar_producto_de_cesta()
    {
        $user = User::factory()->create();
        $user->cesta()->create();

        $producto = Producto::factory()->create(['precio' => 80]);
        $user->cesta->productosIngresados()->attach($producto->id, [
            'cantidad' => 1,
            'precio_unitario' => 80,
        ]);

        Sanctum::actingAs($user, ['*']);

        $response = $this->deleteJson("/api/cesta/productos/{$producto->id}");

        $response->assertStatus(200)
            ->assertJsonFragment([
                'message' => 'Producto eliminado de la cesta',
            ]);

        $this->assertDatabaseMissing('producto_cestas', [
            'cesta_id' => $user->cesta->id,
            'producto_id' => $producto->id,
        ]);
    }
}
