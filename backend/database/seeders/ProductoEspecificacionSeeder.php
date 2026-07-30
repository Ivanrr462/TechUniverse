<?php

namespace Database\Seeders;

use App\Models\ProductoEspecificacion;
use Illuminate\Database\Seeder;

class ProductoEspecificacionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // iPhone 15 Pro Max (Producto ID 1)
        ProductoEspecificacion::create(['producto_id' => 1, 'especificacion_id' => 1, 'valor' => 'Apple A17 Pro']);
        ProductoEspecificacion::create(['producto_id' => 1, 'especificacion_id' => 2, 'valor' => '8GB']);
        ProductoEspecificacion::create(['producto_id' => 1, 'especificacion_id' => 3, 'valor' => '256GB/512GB/1TB']);
        ProductoEspecificacion::create(['producto_id' => 1, 'especificacion_id' => 10, 'valor' => '6.7 pulgadas']);

        // Samsung Galaxy S24 Ultra (Producto ID 2)
        ProductoEspecificacion::create(['producto_id' => 2, 'especificacion_id' => 1, 'valor' => 'Snapdragon 8 Gen 3']);
        ProductoEspecificacion::create(['producto_id' => 2, 'especificacion_id' => 2, 'valor' => '12GB']);
        ProductoEspecificacion::create(['producto_id' => 2, 'especificacion_id' => 3, 'valor' => '256GB/512GB']);
        ProductoEspecificacion::create(['producto_id' => 2, 'especificacion_id' => 6, 'valor' => '200+50+12+10MP']);

        // Google Pixel 8 Pro (Producto ID 3)
        ProductoEspecificacion::create(['producto_id' => 3, 'especificacion_id' => 1, 'valor' => 'Google Tensor G3']);
        ProductoEspecificacion::create(['producto_id' => 3, 'especificacion_id' => 2, 'valor' => '12GB']);
        ProductoEspecificacion::create(['producto_id' => 3, 'especificacion_id' => 3, 'valor' => '256GB/512GB']);
        ProductoEspecificacion::create(['producto_id' => 3, 'especificacion_id' => 6, 'valor' => '50+48+48MP']);

        // MacBook Pro 16" M3 Max (Producto ID 31)
        ProductoEspecificacion::create(['producto_id' => 31, 'especificacion_id' => 1, 'valor' => 'Apple M3 Max (12-core)']);
        ProductoEspecificacion::create(['producto_id' => 31, 'especificacion_id' => 2, 'valor' => '36GB']);
        ProductoEspecificacion::create(['producto_id' => 31, 'especificacion_id' => 10, 'valor' => '16 pulgadas']);
        ProductoEspecificacion::create(['producto_id' => 31, 'especificacion_id' => 14, 'valor' => '19 horas de batería']);

        // Dell XPS 15 Plus (Producto ID 32)
        ProductoEspecificacion::create(['producto_id' => 32, 'especificacion_id' => 1, 'valor' => 'Intel Core i9-13900H']);
        ProductoEspecificacion::create(['producto_id' => 32, 'especificacion_id' => 2, 'valor' => '32GB DDR5']);
        ProductoEspecificacion::create(['producto_id' => 32, 'especificacion_id' => 10, 'valor' => '15.6 pulgadas']);
        ProductoEspecificacion::create(['producto_id' => 32, 'especificacion_id' => 11, 'valor' => '120Hz OLED']);

        // iPad Pro 12.9" M2 (Producto ID 61)
        ProductoEspecificacion::create(['producto_id' => 61, 'especificacion_id' => 1, 'valor' => 'Apple M2']);
        ProductoEspecificacion::create(['producto_id' => 61, 'especificacion_id' => 2, 'valor' => '8GB']);
        ProductoEspecificacion::create(['producto_id' => 61, 'especificacion_id' => 3, 'valor' => '128GB/256GB/512GB']);
        ProductoEspecificacion::create(['producto_id' => 61, 'especificacion_id' => 10, 'valor' => '12.9 pulgadas']);

        // Sony WH-1000XM5 (Producto ID 91)
        ProductoEspecificacion::create(['producto_id' => 91, 'especificacion_id' => 12, 'valor' => 'Bluetooth 5.3, 3.5mm']);
        ProductoEspecificacion::create(['producto_id' => 91, 'especificacion_id' => 14, 'valor' => '30 horas']);
        ProductoEspecificacion::create(['producto_id' => 91, 'especificacion_id' => 7, 'valor' => '250 gramos']);
        ProductoEspecificacion::create(['producto_id' => 91, 'especificacion_id' => 18, 'valor' => '1 año limitada']);

        // Samsung 85" QN90C TV (Producto ID 121)
        ProductoEspecificacion::create(['producto_id' => 121, 'especificacion_id' => 10, 'valor' => '85 pulgadas']);
        ProductoEspecificacion::create(['producto_id' => 121, 'especificacion_id' => 9, 'valor' => '4K (3840 x 2160)']);
        ProductoEspecificacion::create(['producto_id' => 121, 'especificacion_id' => 11, 'valor' => '120Hz']);
        ProductoEspecificacion::create(['producto_id' => 121, 'especificacion_id' => 1, 'valor' => 'Samsung Quantum Processor']);

        // Refrigerador Samsung 700L (Producto ID 151)
        ProductoEspecificacion::create(['producto_id' => 151, 'especificacion_id' => 10, 'valor' => '700 litros']);
        ProductoEspecificacion::create(['producto_id' => 151, 'especificacion_id' => 7, 'valor' => '90.2 kg']);
        ProductoEspecificacion::create(['producto_id' => 151, 'especificacion_id' => 1, 'valor' => 'Compresor Inverter']);
        ProductoEspecificacion::create(['producto_id' => 151, 'especificacion_id' => 16, 'valor' => 'Acero Inoxidable resistente']);

        // Canon EOS R5 (Producto ID 181)
        ProductoEspecificacion::create(['producto_id' => 181, 'especificacion_id' => 1, 'valor' => 'Canon DIGIC X']);
        ProductoEspecificacion::create(['producto_id' => 181, 'especificacion_id' => 9, 'valor' => '45 MP Full Frame']);
        ProductoEspecificacion::create(['producto_id' => 181, 'especificacion_id' => 7, 'valor' => '738 gramos']);
        ProductoEspecificacion::create(['producto_id' => 181, 'especificacion_id' => 6, 'valor' => 'Canon RF Lens Mount']);

        // Anker Soundcore Liberty 4 (Producto ID 211)
        ProductoEspecificacion::create(['producto_id' => 211, 'especificacion_id' => 12, 'valor' => 'Bluetooth 5.3']);
        ProductoEspecificacion::create(['producto_id' => 211, 'especificacion_id' => 14, 'valor' => '10 horas + estuche 50h']);
        ProductoEspecificacion::create(['producto_id' => 211, 'especificacion_id' => 7, 'valor' => '4.2 gramos por earbud']);
        ProductoEspecificacion::create(['producto_id' => 211, 'especificacion_id' => 16, 'valor' => 'IPX4 Resistencia agua']);

        // PlayStation 5 Console (Producto ID 241)
        ProductoEspecificacion::create(['producto_id' => 241, 'especificacion_id' => 1, 'valor' => 'AMD Ryzen Zen 2 8-core']);
        ProductoEspecificacion::create(['producto_id' => 241, 'especificacion_id' => 2, 'valor' => '16GB GDDR6']);
        ProductoEspecificacion::create(['producto_id' => 241, 'especificacion_id' => 3, 'valor' => '825GB SSD']);
        ProductoEspecificacion::create(['producto_id' => 241, 'especificacion_id' => 11, 'valor' => 'Hasta 4K 120Hz']);
    }
}
