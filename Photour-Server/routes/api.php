<?php

use Illuminate\Http\Request;

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
    $api->group(['namespace' => 'App\Api\Controllers'], function ($api) {
        $api->post('user/login', 'AuthController@authenticate');
        $api->post('user/register', 'AuthController@register');
        $api->get('photos', 'PhotosController@fetchPhotos');
        $api->post('photos/upload', 'PhotosController@uploadPhotos');
        $api->get('albums', 'AlbumsController@fetchAlbums');

        $api->group(['middleware' => 'jwt.auth'], function ($api) {
            $api->get('user/me', 'AuthController@getAuthenticatedUser');
        });
    });

});

//Route::get('/users', function (Request $request) {
//    return response()->json(['name' => 'Tom']);
//})


//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});
