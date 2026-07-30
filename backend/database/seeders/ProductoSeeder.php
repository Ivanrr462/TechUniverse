<?php

namespace Database\Seeders;

use App\Models\Producto;
use Illuminate\Database\Seeder;

class ProductoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Smartphones (30)
        Producto::create(['nombre' => 'iPhone 15 Pro Max', 'precio' => 1299.99, 'descuento' => 15, 'stock' => 25, 'descripcion' => 'Smartphone de última generación con A17 Pro chip', 'categoria_id' => 1, 'foto' => 'https://pub-45ac6957fba64f04a0f8a0fd40292c60.r2.dev/productos/JhoGaLnIwpUwMrVa4OoJbiduXa4HVPrPk91lSePP.jpg']);
        Producto::create(['nombre' => 'Samsung Galaxy S24 Ultra', 'precio' => 1199.99, 'stock' => 30, 'descripcion' => 'Flagship Samsung con AI y cámara 200MP', 'categoria_id' => 1, 'foto' => 'https://pub-45ac6957fba64f04a0f8a0fd40292c60.r2.dev/productos/01KQZ4W9EZN0PG9V4Y61QH4JVM.jpg']);
        Producto::create(['nombre' => 'Google Pixel 8 Pro', 'precio' => 999.99, 'stock' => 20, 'descripcion' => 'Smartphone Google con procesamiento de AI', 'categoria_id' => 1, 'foto' => 'https://pub-45ac6957fba64f04a0f8a0fd40292c60.r2.dev/productos/ToEDyzOEUKesuLvpmeBxNpHu1uJ07PVueKA7cmvv.jpg']);
        Producto::create(['nombre' => 'OnePlus 12', 'precio' => 899.99, 'stock' => 15, 'descripcion' => 'Smartphone con carga rápida 100W', 'categoria_id' => 1]);
        Producto::create(['nombre' => 'Xiaomi 14 Ultra', 'precio' => 799.99, 'descuento' => 10, 'stock' => 22, 'descripcion' => 'Smartphone con sensor Leica 1 pulgada', 'categoria_id' => 1, 'foto' => 'https://pub-45ac6957fba64f04a0f8a0fd40292c60.r2.dev/productos/WTrmiLrazP76Yr84hQ0REPEDkFg9tUHt8LmJmYkn.jpg']);
        Producto::create(['nombre' => 'iPhone 15', 'precio' => 999.99, 'stock' => 28, 'descripcion' => 'iPhone con Dynamic Island y USB-C', 'categoria_id' => 1]);
        Producto::create(['nombre' => 'Samsung Galaxy A54', 'precio' => 499.99, 'stock' => 35, 'descripcion' => 'Smartphone de rango medio Samsung', 'categoria_id' => 1]);
        Producto::create(['nombre' => 'Poco F5 Pro', 'precio' => 599.99, 'stock' => 18, 'descripcion' => 'Smartphone gaming con Snapdragon 8 Gen 2', 'categoria_id' => 1]);
        Producto::create(['nombre' => 'Motorola Edge 50', 'precio' => 549.99, 'stock' => 20, 'descripcion' => 'Motorola con diseño curved', 'categoria_id' => 1]);
        Producto::create(['nombre' => 'Nokia G42 5G', 'precio' => 349.99, 'stock' => 25, 'descripcion' => 'Nokia con conectividad 5G', 'categoria_id' => 1]);
        Producto::create(['nombre' => 'Oppo Find X7', 'precio' => 749.99, 'stock' => 16, 'descripcion' => 'Oppo con display periscope 3x', 'categoria_id' => 1]);
        Producto::create(['nombre' => 'Realme 12 Pro+', 'precio' => 449.99, 'descuento' => 20, 'stock' => 30, 'descripcion' => 'Realme con carga 120W', 'categoria_id' => 1]);
        Producto::create(['nombre' => 'HTC U24 Pro', 'precio' => 699.99, 'stock' => 12, 'descripcion' => 'HTC con Snapdragon 8 Gen 3 Leading', 'categoria_id' => 1]);
        Producto::create(['nombre' => 'Sony Xperia 5 V', 'precio' => 899.99, 'stock' => 14, 'descripcion' => 'Sony con display 21:9', 'categoria_id' => 1]);
        Producto::create(['nombre' => 'Samsung Galaxy Z Fold 6', 'precio' => 1899.99, 'stock' => 8, 'descripcion' => 'Samsung con pantalla plegable', 'categoria_id' => 1]);
        Producto::create(['nombre' => 'iPhone 14 Pro', 'precio' => 899.99, 'stock' => 20, 'descripcion' => 'iPhone anterior con Dynamic Island', 'categoria_id' => 1]);
        Producto::create(['nombre' => 'Google Pixel 7a', 'precio' => 649.99, 'stock' => 25, 'descripcion' => 'Google Pixel asequible', 'categoria_id' => 1]);
        Producto::create(['nombre' => 'OnePlus 11', 'precio' => 649.99, 'descuento' => 5, 'stock' => 18, 'descripcion' => 'OnePlus con carga 100W', 'categoria_id' => 1]);
        Producto::create(['nombre' => 'Xiaomi 13T', 'precio' => 699.99, 'stock' => 22, 'descripcion' => 'Xiaomi con Leica y 144W carga', 'categoria_id' => 1]);
        Producto::create(['nombre' => 'Vivo X90', 'precio' => 749.99, 'stock' => 16, 'descripcion' => 'Vivo con procesador visual V2', 'categoria_id' => 1]);
        Producto::create(['nombre' => 'Infinix Zero 30', 'precio' => 399.99, 'stock' => 28, 'descripcion' => 'Infinix con carga 180W', 'categoria_id' => 1]);
        Producto::create(['nombre' => 'Tecno Camon 20', 'precio' => 299.99, 'stock' => 32, 'descripcion' => 'Tecno con cámara de 108MP', 'categoria_id' => 1]);
        Producto::create(['nombre' => 'Samsung Galaxy M54', 'precio' => 399.99, 'stock' => 30, 'descripcion' => 'Samsung Galaxy M con batería 5000mAh', 'categoria_id' => 1]);
        Producto::create(['nombre' => 'Poco M6 Pro', 'precio' => 349.99, 'stock' => 26, 'descripcion' => 'Poco M con MediaTek Helio G99', 'categoria_id' => 1]);
        Producto::create(['nombre' => 'Motorola Moto G54', 'precio' => 299.99, 'stock' => 28, 'descripcion' => 'Moto G con display 90Hz', 'categoria_id' => 1]);
        Producto::create(['nombre' => 'Redmi Note 13', 'precio' => 249.99, 'stock' => 35, 'descripcion' => 'Redmi Note con AMOLED', 'categoria_id' => 1]);
        Producto::create(['nombre' => 'Nothing Phone 2', 'precio' => 549.99, 'stock' => 12, 'descripcion' => 'Nothing con diseño transparente', 'categoria_id' => 1]);
        Producto::create(['nombre' => 'ASUS ROG Phone 7 Ultimate', 'precio' => 1199.99, 'stock' => 10, 'descripcion' => 'ASUS gaming phone con 24GB RAM', 'categoria_id' => 1]);
        Producto::create(['nombre' => 'iPhone 13', 'precio' => 749.99, 'stock' => 18, 'descripcion' => 'iPhone generación anterior', 'categoria_id' => 1]);
        Producto::create(['nombre' => 'Samsung Galaxy S23', 'precio' => 799.99, 'stock' => 20, 'descripcion' => 'Samsung flagship anterior', 'categoria_id' => 1]);

        // Portátiles (30)
        Producto::create(['nombre' => 'MacBook Pro 16" M3 Max', 'precio' => 3499.99, 'descuento' => 12, 'stock' => 12, 'descripcion' => 'MacBook Pro con chip M3 Max', 'categoria_id' => 2, 'foto' => 'https://pub-45ac6957fba64f04a0f8a0fd40292c60.r2.dev/productos/Sh0GWPVUVnMGRLBYfsse4FrusbUdVNVS5L96b0h5.jpg']);
        Producto::create(['nombre' => 'Dell XPS 15 Plus', 'precio' => 2199.99, 'stock' => 15, 'descripcion' => 'Dell XPS con Intel Core i9', 'categoria_id' => 2, 'foto' => 'https://pub-45ac6957fba64f04a0f8a0fd40292c60.r2.dev/productos/eE6F84yNDiS2ggpKW4hScqu5BVAobe3kcthjq8t3.jpg']);
        Producto::create(['nombre' => 'HP Spectre x360 16', 'precio' => 2099.99, 'stock' => 14, 'descripcion' => 'HP convertible 2 en 1', 'categoria_id' => 2, 'foto' => 'https://pub-45ac6957fba64f04a0f8a0fd40292c60.r2.dev/productos/MW6IZCmnGOnTthmu5M8i3VZWBjq9UEaEzn2JwQpw.jpg']);
        Producto::create(['nombre' => 'Lenovo ThinkPad X1 Carbon', 'precio' => 1799.99, 'stock' => 18, 'descripcion' => 'Lenovo business laptop', 'categoria_id' => 2, 'foto' => 'https://pub-45ac6957fba64f04a0f8a0fd40292c60.r2.dev/productos/Cq0mgIOaS5pk0g7jSMTY3aLYIDfW7ZTjKJiRG7j4.jpg']);
        Producto::create(['nombre' => 'ASUS ROG Zephyrus G16', 'precio' => 2499.99, 'stock' => 10, 'descripcion' => 'ASUS gaming con RTX 4090', 'categoria_id' => 2]);
        Producto::create(['nombre' => 'MacBook Air M2 13"', 'precio' => 1699.99, 'stock' => 20, 'descripcion' => 'MacBook Air ultradelgada', 'categoria_id' => 2]);
        Producto::create(['nombre' => 'Dell Inspiron 15 Plus', 'precio' => 899.99, 'stock' => 25, 'descripcion' => 'Dell asequible 15 pulgadas', 'categoria_id' => 2]);
        Producto::create(['nombre' => 'HP Pavilion 15', 'precio' => 799.99, 'stock' => 28, 'descripcion' => 'HP Pavilion básico', 'categoria_id' => 2]);
        Producto::create(['nombre' => 'Lenovo IdeaPad 5 Pro', 'precio' => 999.99, 'stock' => 22, 'descripcion' => 'Lenovo IdeaPad con AMD Ryzen', 'categoria_id' => 2]);
        Producto::create(['nombre' => 'ASUS VivoBook 15', 'precio' => 649.99, 'stock' => 30, 'descripcion' => 'ASUS VivoBook ultraportátil', 'categoria_id' => 2]);
        Producto::create(['nombre' => 'Acer Swift 5', 'precio' => 849.99, 'stock' => 20, 'descripcion' => 'Acer Swift lightweight', 'categoria_id' => 2]);
        Producto::create(['nombre' => 'Microsoft Surface Laptop 5', 'precio' => 1599.99, 'stock' => 16, 'descripcion' => 'Microsoft Surface con Intel', 'categoria_id' => 2]);
        Producto::create(['nombre' => 'Samsung Galaxy Book2 Pro', 'precio' => 1399.99, 'stock' => 12, 'descripcion' => 'Samsung Galaxy Book OLED', 'categoria_id' => 2]);
        Producto::create(['nombre' => 'LG Gram 16', 'precio' => 1299.99, 'stock' => 14, 'descripcion' => 'LG Gram ultraligera', 'categoria_id' => 2]);
        Producto::create(['nombre' => 'Razer Blade 14', 'precio' => 1999.99, 'stock' => 8, 'descripcion' => 'Razer gaming compacta', 'categoria_id' => 2]);
        Producto::create(['nombre' => 'ASUS TUF Gaming A15', 'precio' => 1199.99, 'stock' => 16, 'descripcion' => 'ASUS TUF gaming asequible', 'categoria_id' => 2]);
        Producto::create(['nombre' => 'HP OMEN 16', 'precio' => 1399.99, 'stock' => 13, 'descripcion' => 'HP OMEN gaming 16 pulgadas', 'categoria_id' => 2]);
        Producto::create(['nombre' => 'Dell G15', 'precio' => 1099.99, 'stock' => 17, 'descripcion' => 'Dell G series gaming', 'categoria_id' => 2]);
        Producto::create(['nombre' => 'Lenovo LOQ 16', 'precio' => 1299.99, 'stock' => 14, 'descripcion' => 'Lenovo LOQ gaming', 'categoria_id' => 2]);
        Producto::create(['nombre' => 'MSI GF63 Thin', 'precio' => 999.99, 'stock' => 19, 'descripcion' => 'MSI gaming compacta', 'categoria_id' => 2]);
        Producto::create(['nombre' => 'MacBook Pro 14" M2', 'precio' => 2499.99, 'stock' => 11, 'descripcion' => 'MacBook Pro anterior', 'categoria_id' => 2]);
        Producto::create(['nombre' => 'Dell Precision 5490', 'precio' => 2999.99, 'stock' => 9, 'descripcion' => 'Dell workstation profesional', 'categoria_id' => 2]);
        Producto::create(['nombre' => 'Lenovo ThinkPad P1', 'precio' => 2799.99, 'stock' => 10, 'descripcion' => 'Lenovo ThinkPad workstation', 'categoria_id' => 2]);
        Producto::create(['nombre' => 'HP ZBook Firefly 16', 'precio' => 1999.99, 'stock' => 12, 'descripcion' => 'HP workstation portátil', 'categoria_id' => 2]);
        Producto::create(['nombre' => 'ASUS ProArt StudioBook', 'precio' => 2199.99, 'stock' => 8, 'descripcion' => 'ASUS para creadores', 'categoria_id' => 2]);
        Producto::create(['nombre' => 'Microsoft Surface Book 3', 'precio' => 1899.99, 'stock' => 10, 'descripcion' => 'Microsoft Surface hybrid', 'categoria_id' => 2]);
        Producto::create(['nombre' => 'Acer ConceptD 7', 'precio' => 2299.99, 'stock' => 7, 'descripcion' => 'Acer para diseñadores', 'categoria_id' => 2]);
        Producto::create(['nombre' => 'Positivo Motion Q432B', 'precio' => 399.99, 'stock' => 25, 'descripcion' => 'Positivo básica', 'categoria_id' => 2]);
        Producto::create(['nombre' => 'Multilaser M11W Plus', 'precio' => 349.99, 'stock' => 28, 'descripcion' => 'Multilaser asequible', 'categoria_id' => 2]);
        Producto::create(['nombre' => 'CCE Ultra Thin', 'precio' => 499.99, 'stock' => 20, 'descripcion' => 'CCE ultradelgada', 'categoria_id' => 2]);

        // Tablets (30)
        Producto::create(['nombre' => 'iPad Pro 12.9" M2', 'precio' => 1899.99, 'stock' => 14, 'descripcion' => 'iPad Pro con chip M2', 'categoria_id' => 3]);
        Producto::create(['nombre' => 'Samsung Galaxy Tab S9 Ultra', 'precio' => 1599.99, 'descuento' => 8, 'stock' => 16, 'descripcion' => 'Samsung tablet con S Pen', 'categoria_id' => 3]);
        Producto::create(['nombre' => 'iPad Air 5', 'precio' => 1199.99, 'stock' => 20, 'descripcion' => 'iPad Air con M1', 'categoria_id' => 3]);
        Producto::create(['nombre' => 'Lenovo Tab P11 Pro Gen 2', 'precio' => 799.99, 'stock' => 22, 'descripcion' => 'Lenovo tablet OLED', 'categoria_id' => 3]);
        Producto::create(['nombre' => 'Samsung Galaxy Tab S9+', 'precio' => 1299.99, 'stock' => 18, 'descripcion' => 'Samsung Galaxy Tab grande', 'categoria_id' => 3]);
        Producto::create(['nombre' => 'iPad 10', 'precio' => 599.99, 'stock' => 28, 'descripcion' => 'iPad básico 10 generación', 'categoria_id' => 3]);
        Producto::create(['nombre' => 'Microsoft Surface Go 3', 'precio' => 499.99, 'stock' => 20, 'descripcion' => 'Microsoft Surface portátil', 'categoria_id' => 3]);
        Producto::create(['nombre' => 'OnePlus Pad', 'precio' => 899.99, 'stock' => 16, 'descripcion' => 'OnePlus tablet con 144Hz', 'categoria_id' => 3]);
        Producto::create(['nombre' => 'Xiaomi Pad 6', 'precio' => 599.99, 'stock' => 24, 'descripcion' => 'Xiaomi tablet MediaTek', 'categoria_id' => 3]);
        Producto::create(['nombre' => 'Oppo Pad Air', 'precio' => 699.99, 'stock' => 18, 'descripcion' => 'Oppo tablet delgada', 'categoria_id' => 3]);
        Producto::create(['nombre' => 'Samsung Galaxy Tab A8', 'precio' => 399.99, 'stock' => 30, 'descripcion' => 'Samsung Galaxy Tab asequible', 'categoria_id' => 3]);
        Producto::create(['nombre' => 'Lenovo Tab M10', 'precio' => 299.99, 'stock' => 32, 'descripcion' => 'Lenovo tablet básica', 'categoria_id' => 3]);
        Producto::create(['nombre' => 'Amazon Fire HD 10', 'precio' => 199.99, 'stock' => 35, 'descripcion' => 'Amazon Fire tablet', 'categoria_id' => 3]);
        Producto::create(['nombre' => 'iPad Pro 11" M2', 'precio' => 1499.99, 'stock' => 12, 'descripcion' => 'iPad Pro 11 con M2', 'categoria_id' => 3]);
        Producto::create(['nombre' => 'Samsung Galaxy Tab S8', 'precio' => 999.99, 'stock' => 17, 'descripcion' => 'Samsung Galaxy Tab S8', 'categoria_id' => 3]);
        Producto::create(['nombre' => 'Realme Pad X', 'precio' => 449.99, 'stock' => 20, 'descripcion' => 'Realme tablet 2.5K', 'categoria_id' => 3]);
        Producto::create(['nombre' => 'Poco Pad', 'precio' => 349.99, 'stock' => 22, 'descripcion' => 'Poco tablet asequible', 'categoria_id' => 3]);
        Producto::create(['nombre' => 'Huawei MatePad 11.5"', 'precio' => 749.99, 'stock' => 15, 'descripcion' => 'Huawei tablet grande', 'categoria_id' => 3]);
        Producto::create(['nombre' => 'ZTE Tab M10 Pro', 'precio' => 399.99, 'stock' => 18, 'descripcion' => 'ZTE tablet 10 pulgadas', 'categoria_id' => 3]);
        Producto::create(['nombre' => 'Nokia Tab T20', 'precio' => 299.99, 'stock' => 25, 'descripcion' => 'Nokia tablet básica', 'categoria_id' => 3]);
        Producto::create(['nombre' => 'iPad Mini 6', 'precio' => 899.99, 'stock' => 16, 'descripcion' => 'iPad Mini compacta', 'categoria_id' => 3]);
        Producto::create(['nombre' => 'Surface Laptop Studio', 'precio' => 2799.99, 'stock' => 8, 'descripcion' => 'Microsoft Surface Studio', 'categoria_id' => 3]);
        Producto::create(['nombre' => 'Samsung Galaxy Tab Active Pro', 'precio' => 999.99, 'stock' => 10, 'descripcion' => 'Samsung Tab resistente', 'categoria_id' => 3]);
        Producto::create(['nombre' => 'Lenovo Yoga Tab Pro', 'precio' => 1099.99, 'stock' => 12, 'descripcion' => 'Lenovo Yoga tablet premium', 'categoria_id' => 3]);
        Producto::create(['nombre' => 'ASUS ZenPad 8', 'precio' => 349.99, 'stock' => 21, 'descripcion' => 'ASUS ZenPad compacta', 'categoria_id' => 3]);
        Producto::create(['nombre' => 'Alcatel Tab 3T 8"', 'precio' => 249.99, 'stock' => 28, 'descripcion' => 'Alcatel tablet 8 pulgadas', 'categoria_id' => 3]);
        Producto::create(['nombre' => 'Thomson TEO10', 'precio' => 199.99, 'stock' => 30, 'descripcion' => 'Thomson tablet básica', 'categoria_id' => 3]);
        Producto::create(['nombre' => 'Micromax Canvas Tab', 'precio' => 169.99, 'stock' => 32, 'descripcion' => 'Micromax tablet asequible', 'categoria_id' => 3]);
        Producto::create(['nombre' => 'Videocon VT75', 'precio' => 149.99, 'stock' => 28, 'descripcion' => 'Videocon tablet básica', 'categoria_id' => 3]);

        // Audio (30)
        Producto::create(['nombre' => 'Sony WH-1000XM5', 'precio' => 399.99, 'descuento' => 10, 'stock' => 20, 'descripcion' => 'Sony auriculares con ANC', 'categoria_id' => 4]);
        Producto::create(['nombre' => 'Bose QuietComfort Ultra', 'precio' => 439.99, 'stock' => 16, 'descripcion' => 'Bose con ANC premium', 'categoria_id' => 4]);
        Producto::create(['nombre' => 'Apple AirPods Max', 'precio' => 599.99, 'stock' => 12, 'descripcion' => 'Apple auriculares espaciales', 'categoria_id' => 4]);
        Producto::create(['nombre' => 'Sennheiser Momentum 4', 'precio' => 349.99, 'stock' => 18, 'descripcion' => 'Sennheiser batería 60 horas', 'categoria_id' => 4]);
        Producto::create(['nombre' => 'JBL Tour Pro 2', 'precio' => 299.99, 'stock' => 22, 'descripcion' => 'JBL earbuds con ANC', 'categoria_id' => 4]);
        Producto::create(['nombre' => 'AirPods Pro 2', 'precio' => 249.99, 'stock' => 28, 'descripcion' => 'Apple AirPods Pro', 'categoria_id' => 4]);
        Producto::create(['nombre' => 'Samsung Galaxy Buds2 Pro', 'precio' => 199.99, 'stock' => 26, 'descripcion' => 'Samsung earbuds ANC', 'categoria_id' => 4]);
        Producto::create(['nombre' => 'Google Pixel Buds Pro', 'precio' => 199.99, 'stock' => 24, 'descripcion' => 'Google earbuds con Tensor', 'categoria_id' => 4]);
        Producto::create(['nombre' => 'Beats Studio Pro', 'precio' => 449.99, 'stock' => 14, 'descripcion' => 'Beats auriculares profesionales', 'categoria_id' => 4]);
        Producto::create(['nombre' => 'Audio-Technica ATH-M50x', 'precio' => 199.99, 'stock' => 25, 'descripcion' => 'Audio-Technica estudio', 'categoria_id' => 4]);
        Producto::create(['nombre' => 'Shure SM7B', 'precio' => 399.99, 'stock' => 10, 'descripcion' => 'Shure micrófono profesional', 'categoria_id' => 4]);
        Producto::create(['nombre' => 'Rode NT-SF1', 'precio' => 349.99, 'stock' => 8, 'descripcion' => 'Rode micrófono estéreo', 'categoria_id' => 4]);
        Producto::create(['nombre' => 'Sony MDR-Z1R', 'precio' => 899.99, 'stock' => 5, 'descripcion' => 'Sony auriculares premium', 'categoria_id' => 4]);
        Producto::create(['nombre' => 'Focal Stellia', 'precio' => 1099.99, 'stock' => 4, 'descripcion' => 'Focal auriculares clase A', 'categoria_id' => 4]);
        Producto::create(['nombre' => 'AUDEZE LCD-5', 'precio' => 1499.99, 'stock' => 3, 'descripcion' => 'AUDEZE planar magnético', 'categoria_id' => 4]);
        Producto::create(['nombre' => 'OnePlus Buds Pro 2', 'precio' => 179.99, 'stock' => 22, 'descripcion' => 'OnePlus earbuds ANC', 'categoria_id' => 4]);
        Producto::create(['nombre' => 'Nothing Ear', 'precio' => 149.99, 'stock' => 26, 'descripcion' => 'Nothing earbuds transparentes', 'categoria_id' => 4]);
        Producto::create(['nombre' => 'OPPO Enco X2', 'precio' => 169.99, 'stock' => 20, 'descripcion' => 'OPPO earbuds ANC', 'categoria_id' => 4]);
        Producto::create(['nombre' => 'JBL Flip 6', 'precio' => 129.99, 'stock' => 28, 'descripcion' => 'JBL altavoz portátil', 'categoria_id' => 4]);
        Producto::create(['nombre' => 'Beats Fit Pro', 'precio' => 199.99, 'stock' => 24, 'descripcion' => 'Beats earbuds fitness', 'categoria_id' => 4]);
        Producto::create(['nombre' => 'Anker Soundcore Liberty 4', 'precio' => 99.99, 'stock' => 32, 'descripcion' => 'Anker earbuds asequibles', 'categoria_id' => 4]);
        Producto::create(['nombre' => 'Soundcore Space Q45', 'precio' => 149.99, 'stock' => 28, 'descripcion' => 'Anker auriculares ANC', 'categoria_id' => 4]);
        Producto::create(['nombre' => 'Philips Fidelio L3', 'precio' => 349.99, 'stock' => 12, 'descripcion' => 'Philips auriculares premium', 'categoria_id' => 4]);
        Producto::create(['nombre' => 'Marshall Major IV', 'precio' => 249.99, 'stock' => 16, 'descripcion' => 'Marshall auriculares retro', 'categoria_id' => 4]);
        Producto::create(['nombre' => 'Harman Kardon Onyx', 'precio' => 149.99, 'stock' => 20, 'descripcion' => 'Harman altavoz compacto', 'categoria_id' => 4]);
        Producto::create(['nombre' => 'Logitech UE Boom 3', 'precio' => 119.99, 'stock' => 25, 'descripcion' => 'Logitech altavoz 360', 'categoria_id' => 4]);
        Producto::create(['nombre' => 'UE Wonderboom 3', 'precio' => 99.99, 'stock' => 28, 'descripcion' => 'UE altavoz pequeño', 'categoria_id' => 4]);
        Producto::create(['nombre' => 'Bang & Olufsen Beoplay A1', 'precio' => 199.99, 'stock' => 14, 'descripcion' => 'Bang & Olufsen altavoz', 'categoria_id' => 4]);
        Producto::create(['nombre' => 'Vivo TWS 3', 'precio' => 89.99, 'stock' => 30, 'descripcion' => 'Vivo earbuds asequibles', 'categoria_id' => 4]);
        Producto::create(['nombre' => 'Realme Buds Air 3', 'precio' => 79.99, 'stock' => 32, 'descripcion' => 'Realme earbuds ANC', 'categoria_id' => 4]);

        // Televisores (30)
        Producto::create(['nombre' => 'Samsung 85" QN90C', 'precio' => 2999.99, 'descuento' => 18, 'stock' => 4, 'descripcion' => 'Samsung QLED 85 pulgadas', 'categoria_id' => 5]);
        Producto::create(['nombre' => 'LG 77" OLED M4', 'precio' => 2899.99, 'stock' => 5, 'descripcion' => 'LG OLED 77 pulgadas', 'categoria_id' => 5]);
        Producto::create(['nombre' => 'Sony 65" K95XR', 'precio' => 1999.99, 'stock' => 6, 'descripcion' => 'Sony Mini-LED 65', 'categoria_id' => 5]);
        Producto::create(['nombre' => 'TCL 75" C745', 'precio' => 899.99, 'stock' => 10, 'descripcion' => 'TCL QLED 75 pulgadas', 'categoria_id' => 5]);
        Producto::create(['nombre' => 'Hisense 65" U8K', 'precio' => 799.99, 'stock' => 12, 'descripcion' => 'Hisense Mini-LED', 'categoria_id' => 5]);
        Producto::create(['nombre' => 'Samsung 65" QLED QN90C', 'precio' => 1499.99, 'stock' => 8, 'descripcion' => 'Samsung QLED 65', 'categoria_id' => 5]);
        Producto::create(['nombre' => 'LG 55" OLED C4', 'precio' => 1399.99, 'stock' => 9, 'descripcion' => 'LG OLED 55 pulgadas', 'categoria_id' => 5]);
        Producto::create(['nombre' => 'Sony 55" K95XR', 'precio' => 1199.99, 'stock' => 10, 'descripcion' => 'Sony Mini-LED 55', 'categoria_id' => 5]);
        Producto::create(['nombre' => 'Philips 65" PUS8807', 'precio' => 999.99, 'stock' => 8, 'descripcion' => 'Philips LED 65 pulgadas', 'categoria_id' => 5]);
        Producto::create(['nombre' => 'Panasonic 55" MZ2000', 'precio' => 1099.99, 'stock' => 7, 'descripcion' => 'Panasonic OLED 55', 'categoria_id' => 5]);
        Producto::create(['nombre' => 'LG 43" QNED90', 'precio' => 649.99, 'stock' => 14, 'descripcion' => 'LG QNED 43 pulgadas', 'categoria_id' => 5]);
        Producto::create(['nombre' => 'Samsung 55" Crystal UHD', 'precio' => 499.99, 'stock' => 16, 'descripcion' => 'Samsung Crystal 55', 'categoria_id' => 5]);
        Producto::create(['nombre' => 'TCL 55" C655', 'precio' => 449.99, 'stock' => 18, 'descripcion' => 'TCL QLED 55', 'categoria_id' => 5]);
        Producto::create(['nombre' => 'Hisense 55" A95K', 'precio' => 549.99, 'stock' => 15, 'descripcion' => 'Hisense QLED 55', 'categoria_id' => 5]);
        Producto::create(['nombre' => 'Grundig 55" Vision 7', 'precio' => 399.99, 'stock' => 16, 'descripcion' => 'Grundig 55 pulgadas', 'categoria_id' => 5]);
        Producto::create(['nombre' => 'Amazon Fire TV 55"', 'precio' => 399.99, 'stock' => 18, 'descripcion' => 'Amazon Fire TV 55', 'categoria_id' => 5]);
        Producto::create(['nombre' => 'Xiaomi Mi TV 65"', 'precio' => 449.99, 'stock' => 14, 'descripcion' => 'Xiaomi TV 65 pulgadas', 'categoria_id' => 5]);
        Producto::create(['nombre' => 'OnePlus TV 55"', 'precio' => 399.99, 'stock' => 16, 'descripcion' => 'OnePlus TV 55', 'categoria_id' => 5]);
        Producto::create(['nombre' => 'BPL 50" Smart TV', 'precio' => 299.99, 'stock' => 20, 'descripcion' => 'BPL Smart TV 50', 'categoria_id' => 5]);
        Producto::create(['nombre' => 'Daiwa 43" Smart TV', 'precio' => 249.99, 'stock' => 22, 'descripcion' => 'Daiwa Smart TV 43', 'categoria_id' => 5]);
        Producto::create(['nombre' => 'LG 32" HD', 'precio' => 199.99, 'stock' => 26, 'descripcion' => 'LG TV 32 HD', 'categoria_id' => 5]);
        Producto::create(['nombre' => 'Samsung 43" Crystal UHD', 'precio' => 349.99, 'stock' => 18, 'descripcion' => 'Samsung Crystal 43', 'categoria_id' => 5]);
        Producto::create(['nombre' => 'Sony 43" X80L', 'precio' => 449.99, 'stock' => 14, 'descripcion' => 'Sony Bravia 43', 'categoria_id' => 5]);
        Producto::create(['nombre' => 'LG 50" QNED99', 'precio' => 999.99, 'stock' => 8, 'descripcion' => 'LG QNED 50', 'categoria_id' => 5]);
        Producto::create(['nombre' => 'Samsung 98" DU9000', 'precio' => 3499.99, 'stock' => 2, 'descripcion' => 'Samsung TV gigante 98"', 'categoria_id' => 5]);
        Producto::create(['nombre' => 'Vizio 75" P-Series', 'precio' => 899.99, 'stock' => 10, 'descripcion' => 'Vizio TV 75 pulgadas', 'categoria_id' => 5]);
        Producto::create(['nombre' => 'TCL 98" QM8210', 'precio' => 1999.99, 'stock' => 3, 'descripcion' => 'TCL TV 98 pulgadas', 'categoria_id' => 5]);
        Producto::create(['nombre' => 'IRBIS 24" Smart TV', 'precio' => 149.99, 'stock' => 24, 'descripcion' => 'IRBIS TV 24', 'categoria_id' => 5]);
        Producto::create(['nombre' => 'HYUNDAI 32" LED', 'precio' => 169.99, 'stock' => 22, 'descripcion' => 'Hyundai TV 32 LED', 'categoria_id' => 5]);
        Producto::create(['nombre' => 'Konka 24" HD LED', 'precio' => 129.99, 'stock' => 26, 'descripcion' => 'Konka TV 24 HD', 'categoria_id' => 5]);

        // Electrodomésticos (30)
        Producto::create(['nombre' => 'Refrigerador Samsung 700L', 'precio' => 1499.99, 'stock' => 6, 'descripcion' => 'Refrigerador Samsung inverter', 'categoria_id' => 6]);
        Producto::create(['nombre' => 'Lavadora LG 21kg', 'precio' => 899.99, 'stock' => 8, 'descripcion' => 'Lavadora LG IA', 'categoria_id' => 6]);
        Producto::create(['nombre' => 'Horno Ariston 65L', 'precio' => 749.99, 'stock' => 10, 'descripcion' => 'Horno Ariston multifunción', 'categoria_id' => 6]);
        Producto::create(['nombre' => 'Lavavajillas Bosch 14 servicios', 'precio' => 699.99, 'stock' => 8, 'descripcion' => 'Lavavajillas Bosch silencioso', 'categoria_id' => 6]);
        Producto::create(['nombre' => 'Microondas Electrolux 30L', 'precio' => 349.99, 'stock' => 14, 'descripcion' => 'Microondas Electrolux inverter', 'categoria_id' => 6]);
        Producto::create(['nombre' => 'Secadora Samsung 9kg', 'precio' => 799.99, 'stock' => 7, 'descripcion' => 'Secadora Samsung bomba calor', 'categoria_id' => 6]);
        Producto::create(['nombre' => 'Refrigerador Whirlpool 600L', 'precio' => 1199.99, 'stock' => 7, 'descripcion' => 'Whirlpool refrigerador grande', 'categoria_id' => 6]);
        Producto::create(['nombre' => 'Lavadora Electrolux 18kg', 'precio' => 749.99, 'stock' => 9, 'descripcion' => 'Lavadora Electrolux turbo', 'categoria_id' => 6]);
        Producto::create(['nombre' => 'Horno Electrolux Multifunción', 'precio' => 599.99, 'stock' => 11, 'descripcion' => 'Electrolux horno eléctrico', 'categoria_id' => 6]);
        Producto::create(['nombre' => 'Aire acondicionado LG 24000BTU', 'precio' => 549.99, 'stock' => 12, 'descripcion' => 'LG aire inverter 24000', 'categoria_id' => 6]);
        Producto::create(['nombre' => 'Ventilador de techo Giai', 'precio' => 149.99, 'stock' => 20, 'descripcion' => 'Ventilador techo silencioso', 'categoria_id' => 6]);
        Producto::create(['nombre' => 'Purificador Coway', 'precio' => 449.99, 'stock' => 10, 'descripcion' => 'Coway purificador HEPA', 'categoria_id' => 6]);
        Producto::create(['nombre' => 'Calefactor Electrolux 3000W', 'precio' => 199.99, 'stock' => 16, 'descripcion' => 'Calefactor eléctrico', 'categoria_id' => 6]);
        Producto::create(['nombre' => 'Humidificador Philco', 'precio' => 249.99, 'stock' => 14, 'descripcion' => 'Humidificador ultrasónico', 'categoria_id' => 6]);
        Producto::create(['nombre' => 'Aspiradora Karcher', 'precio' => 399.99, 'stock' => 12, 'descripcion' => 'Karcher aspiradora profesional', 'categoria_id' => 6]);
        Producto::create(['nombre' => 'Licuadora Oster', 'precio' => 99.99, 'stock' => 24, 'descripcion' => 'Licuadora Oster potente', 'categoria_id' => 6]);
        Producto::create(['nombre' => 'Batidora KitchenAid', 'precio' => 149.99, 'stock' => 16, 'descripcion' => 'KitchenAid batidora Stand', 'categoria_id' => 6]);
        Producto::create(['nombre' => 'Freidora de aire Electrolux', 'precio' => 299.99, 'stock' => 14, 'descripcion' => 'Freidora aire 5.5L', 'categoria_id' => 6]);
        Producto::create(['nombre' => 'Olla express Tramontina', 'precio' => 129.99, 'stock' => 22, 'descripcion' => 'Tramontina olla 8L', 'categoria_id' => 6]);
        Producto::create(['nombre' => 'Plancha Mondial', 'precio' => 89.99, 'stock' => 26, 'descripcion' => 'Plancha Mondial cerámica', 'categoria_id' => 6]);
        Producto::create(['nombre' => 'Tostador Oster', 'precio' => 69.99, 'stock' => 28, 'descripcion' => 'Tostador automático', 'categoria_id' => 6]);
        Producto::create(['nombre' => 'Hervidor Electrolux', 'precio' => 49.99, 'stock' => 32, 'descripcion' => 'Hervidor eléctrico', 'categoria_id' => 6]);
        Producto::create(['nombre' => 'Cafetera Braun', 'precio' => 199.99, 'stock' => 18, 'descripcion' => 'Braun cafetera 12 tazas', 'categoria_id' => 6]);
        Producto::create(['nombre' => 'Exprimidor Electrolux', 'precio' => 149.99, 'stock' => 20, 'descripcion' => 'Exprimidor automático', 'categoria_id' => 6]);
        Producto::create(['nombre' => 'Minipimer Philco', 'precio' => 49.99, 'stock' => 30, 'descripcion' => 'Minipimer 300W', 'categoria_id' => 6]);
        Producto::create(['nombre' => 'Refrigerador CONSUL 400L', 'precio' => 799.99, 'stock' => 9, 'descripcion' => 'CONSUL refrigerador', 'categoria_id' => 6]);
        Producto::create(['nombre' => 'Lavadora Consul 15kg', 'precio' => 599.99, 'stock' => 11, 'descripcion' => 'CONSUL lavadora', 'categoria_id' => 6]);
        Producto::create(['nombre' => 'Estufa Electrolux 4Q', 'precio' => 499.99, 'stock' => 10, 'descripcion' => 'Estufa 4 quemadores', 'categoria_id' => 6]);
        Producto::create(['nombre' => 'Foco LED 15W Intelbras', 'precio' => 9.99, 'stock' => 100, 'descripcion' => 'Bombilla LED blanca fría', 'categoria_id' => 6]);
        Producto::create(['nombre' => 'Bombilla Inteligente Positivo', 'precio' => 59.99, 'stock' => 50, 'descripcion' => 'Bombilla smart WiFi RGB', 'categoria_id' => 6]);

        // Fotografía (30)
        Producto::create(['nombre' => 'Canon EOS R5', 'precio' => 3499.99, 'stock' => 5, 'descripcion' => 'Canon mirrorless 45MP', 'categoria_id' => 7]);
        Producto::create(['nombre' => 'Nikon Z 9', 'precio' => 3899.99, 'stock' => 4, 'descripcion' => 'Nikon Z9 professional', 'categoria_id' => 7]);
        Producto::create(['nombre' => 'Sony A7R V', 'precio' => 3699.99, 'stock' => 5, 'descripcion' => 'Sony A7R V 61MP', 'categoria_id' => 7]);
        Producto::create(['nombre' => 'Canon EOS R6', 'precio' => 1899.99, 'stock' => 8, 'descripcion' => 'Canon R6 20MP', 'categoria_id' => 7]);
        Producto::create(['nombre' => 'Nikon Z 8', 'precio' => 3099.99, 'stock' => 6, 'descripcion' => 'Nikon Z8 45MP', 'categoria_id' => 7]);
        Producto::create(['nombre' => 'Sony A7IV', 'precio' => 2099.99, 'stock' => 9, 'descripcion' => 'Sony A7IV 61MP', 'categoria_id' => 7]);
        Producto::create(['nombre' => 'Canon EOS RP', 'precio' => 999.99, 'stock' => 12, 'descripcion' => 'Canon mirrorless full-frame', 'categoria_id' => 7]);
        Producto::create(['nombre' => 'Nikon Z 6II', 'precio' => 1599.99, 'stock' => 10, 'descripcion' => 'Nikon Z6 II híbrida', 'categoria_id' => 7]);
        Producto::create(['nombre' => 'Sony A6600', 'precio' => 1399.99, 'stock' => 11, 'descripcion' => 'Sony APS-C profesional', 'categoria_id' => 7]);
        Producto::create(['nombre' => 'Fujifilm X-T5', 'precio' => 1799.99, 'stock' => 8, 'descripcion' => 'Fujifilm X-T5 40MP', 'categoria_id' => 7]);
        Producto::create(['nombre' => 'Panasonic Lumix GH6', 'precio' => 1999.99, 'stock' => 7, 'descripcion' => 'Lumix GH6 video profesional', 'categoria_id' => 7]);
        Producto::create(['nombre' => 'Olympus OM-D E-M1 Mark III', 'precio' => 1699.99, 'stock' => 9, 'descripcion' => 'Olympus MFT profesional', 'categoria_id' => 7]);
        Producto::create(['nombre' => 'Leica Q2', 'precio' => 4999.99, 'stock' => 3, 'descripcion' => 'Leica compacta full-frame', 'categoria_id' => 7]);
        Producto::create(['nombre' => 'Hasselblad X2D 100C', 'precio' => 8199.99, 'stock' => 2, 'descripcion' => 'Hasselblad formato medio', 'categoria_id' => 7]);
        Producto::create(['nombre' => 'Canon EOS R7', 'precio' => 1499.99, 'stock' => 10, 'descripcion' => 'Canon APS-C avanzada', 'categoria_id' => 7]);
        Producto::create(['nombre' => 'Nikon Z 50', 'precio' => 999.99, 'stock' => 14, 'descripcion' => 'Nikon Z50 APS-C', 'categoria_id' => 7]);
        Producto::create(['nombre' => 'Sony A6400', 'precio' => 1199.99, 'stock' => 13, 'descripcion' => 'Sony A6400 compacta', 'categoria_id' => 7]);
        Producto::create(['nombre' => 'Fujifilm X-S20', 'precio' => 1299.99, 'stock' => 12, 'descripcion' => 'Fujifilm X-S20 híbrida', 'categoria_id' => 7]);
        Producto::create(['nombre' => 'Panasonic Lumix S5II', 'precio' => 1999.99, 'stock' => 7, 'descripcion' => 'Lumix S5II full-frame', 'categoria_id' => 7]);
        Producto::create(['nombre' => 'Olympus PEN-F', 'precio' => 1199.99, 'stock' => 10, 'descripcion' => 'Olympus PEN retro', 'categoria_id' => 7]);
        Producto::create(['nombre' => 'Canon EOS M50 Mark II', 'precio' => 799.99, 'stock' => 18, 'descripcion' => 'Canon M50 vlogging', 'categoria_id' => 7]);
        Producto::create(['nombre' => 'Nikon D850', 'precio' => 2499.99, 'stock' => 6, 'descripcion' => 'Nikon DSLR profesional', 'categoria_id' => 7]);
        Producto::create(['nombre' => 'Sony A99 II', 'precio' => 2999.99, 'stock' => 5, 'descripcion' => 'Sony A99 II DSLR', 'categoria_id' => 7]);
        Producto::create(['nombre' => 'Fujifilm GFX 50S II', 'precio' => 3999.99, 'stock' => 4, 'descripcion' => 'Fujifilm formato medio', 'categoria_id' => 7]);
        Producto::create(['nombre' => 'Panasonic Lumix G9 II', 'precio' => 1799.99, 'stock' => 9, 'descripcion' => 'Lumix G9 II MFT', 'categoria_id' => 7]);
        Producto::create(['nombre' => 'Olympus OM-D E-M5 Mark III', 'precio' => 1299.99, 'stock' => 11, 'descripcion' => 'Olympus M5 III MFT', 'categoria_id' => 7]);
        Producto::create(['nombre' => 'Leica SL2', 'precio' => 5999.99, 'stock' => 3, 'descripcion' => 'Leica SL2 full-frame', 'categoria_id' => 7]);
        Producto::create(['nombre' => 'Hasselblad 907X 50C', 'precio' => 7399.99, 'stock' => 2, 'descripcion' => 'Hasselblad 907X formato medio', 'categoria_id' => 7]);
        Producto::create(['nombre' => 'Canon EOS R50', 'precio' => 899.99, 'stock' => 15, 'descripcion' => 'Canon R50 compacta', 'categoria_id' => 7]);
        Producto::create(['nombre' => 'Nikon Z fc', 'precio' => 1199.99, 'stock' => 13, 'descripcion' => 'Nikon Z fc retro', 'categoria_id' => 7]);

        // Accesorios (30)
        Producto::create(['nombre' => 'Cargador Rápido Anker 100W USB-C', 'precio' => 99, 'stock' => 35, 'descripcion' => 'Anker charger 100W GaN', 'categoria_id' => 8]);
        Producto::create(['nombre' => 'Cable USB-C Belkin', 'precio' => 39, 'stock' => 50, 'descripcion' => 'Belkin USB-C braided', 'categoria_id' => 8]);
        Producto::create(['nombre' => 'Protector Pantalla Tempered Glass', 'precio' => 29, 'stock' => 60, 'descripcion' => 'Vidrio templado 9H', 'categoria_id' => 8]);
        Producto::create(['nombre' => 'Funda Spigen para iPhone', 'precio' => 39, 'stock' => 45, 'descripcion' => 'Spigen case slim iPhone', 'categoria_id' => 8]);
        Producto::create(['nombre' => 'Powerbank Anker 20000mAh', 'precio' => 149, 'stock' => 20, 'descripcion' => 'Anker powerbank dual USB-C', 'categoria_id' => 8]);
        Producto::create(['nombre' => 'Cargador Inalámbrico Belkin', 'precio' => 89, 'stock' => 25, 'descripcion' => 'Belkin wireless charger', 'categoria_id' => 8]);
        Producto::create(['nombre' => 'Adaptador USB-C a HDMI', 'precio' => 59, 'stock' => 30, 'descripcion' => 'Adaptador HDMI 4K', 'categoria_id' => 8]);
        Producto::create(['nombre' => 'Hub USB Anker 7 en 1', 'precio' => 199, 'stock' => 16, 'descripcion' => 'Anker hub USB 3.0', 'categoria_id' => 8]);
        Producto::create(['nombre' => 'Soporte Móvil Gravity', 'precio' => 29, 'stock' => 40, 'descripcion' => 'Gravity soporte ventosa', 'categoria_id' => 8]);
        Producto::create(['nombre' => 'Adaptador de Audio 3.5mm', 'precio' => 19, 'stock' => 50, 'descripcion' => 'Adaptador USB-C a jack 3.5mm', 'categoria_id' => 8]);
        Producto::create(['nombre' => 'Correa para Cámara Peak Design', 'precio' => 99, 'stock' => 18, 'descripcion' => 'Peak Design camera strap', 'categoria_id' => 8]);
        Producto::create(['nombre' => 'Llavero AirTag Apple', 'precio' => 49, 'stock' => 30, 'descripcion' => 'Apple AirTag con llavero', 'categoria_id' => 8]);
        Producto::create(['nombre' => 'Funda Laptop Incase', 'precio' => 129, 'stock' => 16, 'descripcion' => 'Incase laptop sleeve 15"', 'categoria_id' => 8]);
        Producto::create(['nombre' => 'Mochila Lowepro', 'precio' => 199, 'stock' => 12, 'descripcion' => 'Lowepro ProTactic backpack', 'categoria_id' => 8]);
        Producto::create(['nombre' => 'Protector Lightning Elago', 'precio' => 19, 'stock' => 45, 'descripcion' => 'Elago lightning connector cap', 'categoria_id' => 8]);
        Producto::create(['nombre' => 'Clip Universal Sujetador', 'precio' => 9, 'stock' => 70, 'descripcion' => 'Clip universal teléfono', 'categoria_id' => 8]);
        Producto::create(['nombre' => 'Limpiador Pantalla', 'precio' => 29, 'stock' => 40, 'descripcion' => 'Spray limpiador pantalla', 'categoria_id' => 8]);
        Producto::create(['nombre' => 'Paño Mikrofibra', 'precio' => 19, 'stock' => 50, 'descripcion' => 'Paño micrófibra 30x30cm', 'categoria_id' => 8]);
        Producto::create(['nombre' => 'Adhesivo para Lentes', 'precio' => 39, 'stock' => 35, 'descripcion' => 'Adhesivo lente flexible', 'categoria_id' => 8]);
        Producto::create(['nombre' => 'Pegatinas Smartphone', 'precio' => 29, 'stock' => 60, 'descripcion' => 'Pack 50 pegatinas variadas', 'categoria_id' => 8]);
        Producto::create(['nombre' => 'Anillo Soporte PopSocket', 'precio' => 39, 'stock' => 38, 'descripcion' => 'PopSocket anillo dorado', 'categoria_id' => 8]);
        Producto::create(['nombre' => 'Estuche Auriculares', 'precio' => 59, 'stock' => 28, 'descripcion' => 'Estuche EVA auriculares', 'categoria_id' => 8]);
        Producto::create(['nombre' => 'Adaptador OTG USB', 'precio' => 29, 'stock' => 42, 'descripcion' => 'Adaptador micro USB OTG', 'categoria_id' => 8]);
        Producto::create(['nombre' => 'Extensor Selfie', 'precio' => 49, 'stock' => 32, 'descripcion' => 'Monopod bluetooth plegable', 'categoria_id' => 8]);
        Producto::create(['nombre' => 'Filtro Lente Circular', 'precio' => 129, 'stock' => 14, 'descripcion' => 'Filtro CPL 67mm', 'categoria_id' => 8]);
        Producto::create(['nombre' => 'Objetivo Gran Angular 0.75x', 'precio' => 89, 'stock' => 20, 'descripcion' => 'Lente gran angular 0.75x', 'categoria_id' => 8]);
        Producto::create(['nombre' => 'Lente Macro para Smartphone', 'precio' => 69, 'stock' => 24, 'descripcion' => 'Lente macro clip 10x', 'categoria_id' => 8]);
        Producto::create(['nombre' => 'Clip Lentes Smartphone', 'precio' => 39, 'stock' => 36, 'descripcion' => 'Clip universal 3 lentes', 'categoria_id' => 8]);
        Producto::create(['nombre' => 'Cordón de Seguridad', 'precio' => 19, 'stock' => 55, 'descripcion' => 'Cordón nylon ajustable', 'categoria_id' => 8]);
        Producto::create(['nombre' => 'Etiqueta RFID Paquete', 'precio' => 49, 'stock' => 40, 'descripcion' => 'Etiqueta RFID x5 pack', 'categoria_id' => 8]);

        // Videojuegos (30)
        Producto::create(['nombre' => 'PlayStation 5 Console', 'precio' => 799, 'stock' => 8, 'descripcion' => 'PlayStation 5 Disc Edition', 'categoria_id' => 9]);
        Producto::create(['nombre' => 'Xbox Series X Console', 'precio' => 799, 'stock' => 8, 'descripcion' => 'Xbox Series X 1TB', 'categoria_id' => 9]);
        Producto::create(['nombre' => 'Nintendo Switch OLED', 'precio' => 449, 'stock' => 12, 'descripcion' => 'Nintendo Switch OLED blanca', 'categoria_id' => 9]);
        Producto::create(['nombre' => 'EA FC 25', 'precio' => 199, 'stock' => 20, 'descripcion' => 'EA Sports FC 25 PS5', 'categoria_id' => 9]);
        Producto::create(['nombre' => 'Call of Duty Black Ops 6', 'precio' => 199, 'stock' => 18, 'descripcion' => 'Call of Duty Black Ops 6', 'categoria_id' => 9]);
        Producto::create(['nombre' => 'Dragon Age The Veilguard', 'precio' => 199, 'stock' => 15, 'descripcion' => 'Dragon Age Veilguard', 'categoria_id' => 9]);
        Producto::create(['nombre' => 'S.T.A.L.K.E.R. 2', 'precio' => 199, 'stock' => 14, 'descripcion' => 'STALKER 2 Heart of Chornobyl', 'categoria_id' => 9]);
        Producto::create(['nombre' => 'Metaphor ReFantazio', 'precio' => 199, 'stock' => 16, 'descripcion' => 'Metaphor ReFantazio JRPG', 'categoria_id' => 9]);
        Producto::create(['nombre' => 'The Legend of Zelda Tears of Kingdom', 'precio' => 199, 'stock' => 12, 'descripcion' => 'Zelda Tears of the Kingdom', 'categoria_id' => 9]);
        Producto::create(['nombre' => 'Super Mario Bros Wonder', 'precio' => 149, 'stock' => 16, 'descripcion' => 'Super Mario Bros Wonder', 'categoria_id' => 9]);
        Producto::create(['nombre' => 'Elden Ring Shadow of the Erdtree', 'precio' => 149, 'stock' => 18, 'descripcion' => 'Elden Ring DLC completo', 'categoria_id' => 9]);
        Producto::create(['nombre' => 'Final Fantasy VII Rebirth', 'precio' => 199, 'stock' => 14, 'descripcion' => 'Final Fantasy VII Rebirth', 'categoria_id' => 9]);
        Producto::create(['nombre' => 'Hollow Knight Silksong', 'precio' => 149, 'stock' => 16, 'descripcion' => 'Hollow Knight Silksong', 'categoria_id' => 9]);
        Producto::create(['nombre' => 'Tekken 8', 'precio' => 149, 'stock' => 14, 'descripcion' => 'Tekken 8 fighting game', 'categoria_id' => 9]);
        Producto::create(['nombre' => 'Street Fighter 6', 'precio' => 149, 'stock' => 15, 'descripcion' => 'Street Fighter 6', 'categoria_id' => 9]);
        Producto::create(['nombre' => 'Gran Turismo 7', 'precio' => 149, 'stock' => 13, 'descripcion' => 'Gran Turismo 7 racing', 'categoria_id' => 9]);
        Producto::create(['nombre' => 'Forza Motorsport', 'precio' => 149, 'stock' => 12, 'descripcion' => 'Forza Motorsport Xbox', 'categoria_id' => 9]);
        Producto::create(['nombre' => 'Starfield', 'precio' => 149, 'stock' => 11, 'descripcion' => 'Starfield RPG Space', 'categoria_id' => 9]);
        Producto::create(['nombre' => 'Indiana Jones and the Great Circle', 'precio' => 199, 'stock' => 10, 'descripcion' => 'Indiana Jones game', 'categoria_id' => 9]);
        Producto::create(['nombre' => 'Control Ultimate Edition', 'precio' => 99, 'stock' => 16, 'descripcion' => 'Control juego acción', 'categoria_id' => 9]);
        Producto::create(['nombre' => 'Cyberpunk 2077', 'precio' => 149, 'stock' => 17, 'descripcion' => 'Cyberpunk 2077 RPG', 'categoria_id' => 9]);
        Producto::create(['nombre' => 'The Witcher 3', 'precio' => 129, 'stock' => 18, 'descripcion' => 'Witcher 3 RPG action', 'categoria_id' => 9]);
        Producto::create(['nombre' => 'Hogwarts Legacy', 'precio' => 129, 'stock' => 16, 'descripcion' => 'Hogwarts Legacy Harry Potter', 'categoria_id' => 9]);
        Producto::create(['nombre' => 'Red Dead Redemption 2', 'precio' => 129, 'stock' => 15, 'descripcion' => 'Red Dead 2 western', 'categoria_id' => 9]);
        Producto::create(['nombre' => 'GTA VI', 'precio' => 199, 'stock' => 9, 'descripcion' => 'Grand Theft Auto VI', 'categoria_id' => 9]);
        Producto::create(['nombre' => 'Palworld', 'precio' => 99, 'stock' => 22, 'descripcion' => 'Palworld adventure game', 'categoria_id' => 9]);
        Producto::create(['nombre' => 'Minecraft', 'precio' => 79, 'stock' => 30, 'descripcion' => 'Minecraft sandbox game', 'categoria_id' => 9]);
        Producto::create(['nombre' => 'Among Us', 'precio' => 49, 'stock' => 25, 'descripcion' => 'Among Us party game', 'categoria_id' => 9]);
        Producto::create(['nombre' => 'Roblox Card 50 Robux', 'precio' => 49, 'stock' => 40, 'descripcion' => 'Roblox gift card 50', 'categoria_id' => 9]);
        Producto::create(['nombre' => 'PlayStation Plus 1 Mes', 'precio' => 99, 'stock' => 50, 'descripcion' => 'PS Plus suscripción 1 mes', 'categoria_id' => 9]);
    }
}
