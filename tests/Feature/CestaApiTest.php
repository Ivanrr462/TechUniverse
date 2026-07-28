<?php

namespace Tests\Feature;

use App\Models\Producto;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class CestaApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_puede_ver_cesta_sin_descuento()
    {
        $user = User::factory()->create();
        $user->cesta()->create();

        $producto = Producto::factory()->create(['precio' => 100, 'descuento' => 0]);
        $user->cesta->productosIngresados()->attach($producto->id, [
            'cantidad' => 2,
            'precio_unitario' => 100,
        ]);

        Sanctum::actingAs($user, ['*']);

        $response = $this->getJson('/api/cesta');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'usuario' => ['id', 'nombre', 'correo'],
                    'productos',
                    'precio_total',
                    'cantidad_total',
                ],
            ])
            ->assertJsonPath('data.precio_total', 200)
            ->assertJsonPath('data.cantidad_total', 2)
            ->assertJsonPath('data.productos.0.precio_unitario', 100)
            ->assertJsonPath('data.productos.0.descuento', 0)
            ->assertJsonPath('data.productos.0.precioDescuento', 100)
            ->assertJsonPath('data.productos.0.cantidad', 2)
            ->assertJsonPath('data.productos.0.subtotal', 200)
            ->assertJsonPath('data.usuario.correo', $user->email);
    }

    public function test_puede_ver_cesta_con_descuento()
    {
        $user = User::factory()->create();
        $user->cesta()->create();

        $producto = Producto::factory()->create(['precio' => 100, 'descuento' => 10]);
        $user->cesta->productosIngresados()->attach($producto->id, [
            'cantidad' => 2,
            'precio_unitario' => 100,
        ]);

        Sanctum::actingAs($user, ['*']);

        $response = $this->getJson('/api/cesta');

        // precioDescuento = 100 - (100 * 10/100) = 90
        // subtotal = 90 * 2 = 180
        $response->assertStatus(200)
            ->assertJsonPath('data.precio_total', 180)
            ->assertJsonPath('data.cantidad_total', 2)
            ->assertJsonPath('data.productos.0.precio_unitario', 100)
            ->assertJsonPath('data.productos.0.descuento', 10)
            ->assertJsonPath('data.productos.0.precioDescuento', 90)
            ->assertJsonPath('data.productos.0.subtotal', 180)
            ->assertJsonPath('data.cantidad_total', 2);
    }

    public function test_cesta_vacia_devuelve_totales_en_cero()
    {
        $user = User::factory()->create();
        $user->cesta()->create();

        Sanctum::actingAs($user, ['*']);

        $response = $this->getJson('/api/cesta');

        $response->assertStatus(200)
            ->assertJsonPath('data.precio_total', 0)
            ->assertJsonPath('data.cantidad_total', 0)
            ->assertJsonPath('data.productos', []);
    }

    public function test_no_autenticado_no_puede_ver_cesta()
    {
        $response = $this->getJson('/api/cesta');

        $response->assertStatus(401);
    }
}
