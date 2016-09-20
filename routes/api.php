<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

$api = app('Dingo\Api\Routing\Router');

$api->version('v1', function ($api) {

    $api->group( ['middleware' => 'api.throttle', 'limit' => 105, 'expires' => 1], function ($api) {
        $api->post('login', 'App\Http\Controllers\API\AuthController@authenticate');
        $api->post('register', 'App\Http\Controllers\API\AuthController@register');
    });

    // All routes in here are protected and thus need a valid token
    $api->group( ['middleware' => ['jwt.auth'], 'prefix' => 'api'], function ($api) {

       
    });



});

