<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DeseosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::find(2);

        if ($user) {
            // Añadir productos a la wishlist del usuario 2
            $user->deseos()->attach([5, 15, 30]);
        }
    }
}
