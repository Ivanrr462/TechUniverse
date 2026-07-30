<?php

namespace App\Http\Controllers;

/**
 * @OA\Info(
 *     title="API TechUniverse",
 *     version="1.2.0",
 *     description="Documentacion de la API TechUniverse"
 * )
 *
 * @OA\Server(
 *     url=L5_SWAGGER_CONST_HOST,
 *     description="Servidor principal"
 * )
 *
 * @OA\SecurityScheme(
 *     securityScheme="bearerAuth",
 *     type="http",
 *     scheme="bearer",
 *     bearerFormat="JWT"
 * )
 */
abstract class Controller
{
    //
}
