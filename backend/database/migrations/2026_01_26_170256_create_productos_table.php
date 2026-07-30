<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('productos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->decimal('precio', 10, 2);
            $table->integer('stock')->default(0);
            $table->string('descripcion');
            $table->decimal('descuento', 5, 2)->default(0);
            $table->string('foto')->nullable()->default('https://pub-45ac6957fba64f04a0f8a0fd40292c60.r2.dev/productos/dvEcf0VxtjxaHq3yAHBw9uQr4CW4keFw3GFAUvqa.jpg');
            $table->foreignId('categoria_id')
                ->references('id')
                ->on('categorias')
                ->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('productos');
    }
};
