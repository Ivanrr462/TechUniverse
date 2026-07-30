<?php

namespace Tests\Feature;

use App\Models\Categoria;
use App\Models\Producto;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class CategoriaApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_puede_listar_categorias()
    {
        Categoria::factory()->count(3)->create();

        $response = $this->getJson('/api/categoria');

        $response->assertStatus(200)
            ->assertJsonCount(3, 'data');
    }

    public function test_puede_listar_categorias_con_productos()
    {
        $categoria = Categoria::factory()
            ->has(Producto::factory()->count(2))
            ->create();

        $response = $this->getJson('/api/categoria/productos');

        $response->assertStatus(200)
            ->assertJsonCount(1, 'data');
    }

    public function test_puede_mostrar_categoria_con_productos()
    {
        $categoria = Categoria::factory()
            ->has(Producto::factory()->count(2))
            ->create();

        $response = $this->getJson("/api/categoria/{$categoria->id}");

        $response->assertStatus(200)
            ->assertJsonStructure(['data']);
    }

    public function test_devuelve_404_si_categoria_no_existe()
    {
        $admin = User::factory()->create(['rol' => 'admin']);
        Sanctum::actingAs($admin, ['*']);

        $response = $this->getJson('/api/categoria/999');

        $response->assertStatus(404);
    }

    public function test_puede_crear_categoria()
    {
        $admin = User::factory()->create(['rol' => 'admin']);
        Sanctum::actingAs($admin, ['*']);

        $data = [
            'nombre' => 'Nueva Categoria',
        ];

        $response = $this->postJson('/api/categoria', $data);

        $response->assertStatus(201)
            ->assertJsonFragment([
                'mensaje' => 'Categoria creada con éxito',
            ]);

        $this->assertDatabaseHas('categorias', [
            'nombre' => 'Nueva Categoria',
        ]);
    }

    public function test_puede_actualizar_categoria()
    {
        $admin = User::factory()->create(['rol' => 'admin']);
        Sanctum::actingAs($admin, ['*']);

        $categoria = Categoria::factory()->create();

        $data = [
            'nombre' => 'Categoria Actualizada',
        ];

        $response = $this->putJson("/api/categoria/{$categoria->id}", $data);

        $response->assertStatus(200)
            ->assertJsonFragment([
                'mensaje' => 'Actualizado correctamente',
            ]);

        $this->assertDatabaseHas('categorias', [
            'nombre' => 'Categoria Actualizada',
        ]);
    }

    public function test_puede_eliminar_categoria()
    {
        $admin = User::factory()->create(['rol' => 'admin']);
        Sanctum::actingAs($admin, ['*']);

        $categoria = Categoria::factory()->create();

        $response = $this->deleteJson("/api/categoria/{$categoria->id}");

        $response->assertStatus(200);

        $this->assertDatabaseMissing('categorias', [
            'id' => $categoria->id,
        ]);
    }
}
