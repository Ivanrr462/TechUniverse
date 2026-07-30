<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class UsuarioApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_puede_listar_usuarios()
    {
        $admin = User::factory()->create(['rol' => 'admin']);
        User::factory()->count(2)->create();

        Sanctum::actingAs($admin, ['*']);

        $response = $this->getJson('/api/usuarios');

        $response->assertStatus(200)
            ->assertJsonCount(3, 'data');
    }

    public function test_puede_mostrar_un_usuario()
    {
        $admin = User::factory()->create(['rol' => 'admin']);
        $usuario = User::factory()->create();

        Sanctum::actingAs($admin, ['*']);

        $response = $this->getJson("/api/usuarios/{$usuario->id}");

        $response->assertStatus(200)
            ->assertJsonStructure(['data']);
    }

    public function test_devuelve_404_si_usuario_no_existe()
    {
        $admin = User::factory()->create(['rol' => 'admin']);
        Sanctum::actingAs($admin, ['*']);

        $response = $this->getJson('/api/usuarios/999');

        $response->assertStatus(404);
    }

    public function test_puede_crear_usuario()
    {
        $admin = User::factory()->create(['rol' => 'admin']);
        Sanctum::actingAs($admin, ['*']);

        $data = [
            'name' => 'Juan Pérez',
            'email' => 'juan@example.com',
            'password' => 'secreto123',
        ];

        $response = $this->postJson('/api/usuarios', $data);

        $response->assertStatus(201)
            ->assertJsonFragment([
                'mensaje' => 'Usuario creado con éxito',
            ]);

        $this->assertDatabaseHas('users', [
            'email' => 'juan@example.com',
        ]);
    }

    public function test_puede_actualizar_usuario()
    {
        $admin = User::factory()->create(['rol' => 'admin']);
        $usuario = User::factory()->create();

        Sanctum::actingAs($admin, ['*']);

        $data = [
            'name' => 'Nombre Actualizado',
            'email' => 'nuevoemail@example.com',
        ];

        $response = $this->putJson("/api/usuarios/{$usuario->id}", $data);

        $response->assertStatus(200)
            ->assertJsonFragment([
                'mensaje' => 'Usuario actualizado con éxito',
            ]);

        $this->assertDatabaseHas('users', [
            'email' => 'nuevoemail@example.com',
        ]);
    }

    public function test_puede_eliminar_usuario()
    {
        $admin = User::factory()->create(['rol' => 'admin']);
        $usuario = User::factory()->create();

        Sanctum::actingAs($admin, ['*']);

        $response = $this->deleteJson("/api/usuarios/{$usuario->id}");

        $response->assertStatus(200)
            ->assertJsonFragment([
                'mensaje' => 'Eliminado correctamente',
            ]);

        $this->assertDatabaseMissing('users', [
            'id' => $usuario->id,
        ]);
    }
}
