<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AuthApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_puede_registrar_usuario()
    {
        $data = [
            'name' => 'Ana Gómez',
            'email' => 'ana@example.com',
            'password' => 'secreto123',
        ];

        $response = $this->postJson('/api/register', $data);

        $response->assertStatus(201)
            ->assertJsonFragment([
                'mensaje' => 'Usuario registrado exitosamente. Por favor inicia sesión.',
            ]);

        $this->assertDatabaseHas('users', [
            'email' => 'ana@example.com',
        ]);
    }

    public function test_puede_iniciar_sesion_y_recibir_token()
    {
        $user = User::factory()->create([
            'email' => 'usuario@example.com',
            'password' => Hash::make('password123'),
        ]);

        $response = $this->postJson('/api/login', [
            'email' => $user->email,
            'password' => 'password123',
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure(['access_token', 'token_type', 'user', 'mensaje']);
    }

    public function test_puede_cerrar_sesion_con_usuario_autenticado()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user, ['*']);

        $response = $this->postJson('/api/logout');

        $response->assertStatus(200)
            ->assertJsonFragment([
                'mensaje' => 'Sesión cerrada correctamente',
            ]);
    }
}
