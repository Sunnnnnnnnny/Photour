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
        $api->get('user/get', 'AuthController@fetchCurrentUserById');
        $api->post('user/editInfo', 'AuthController@editUserInfo');
        $api->post('user/editPw', 'AuthController@editUserPw');
        $api->post('user/editTags', 'AuthController@editUserTags');


        $api->get('photos', 'PhotosController@fetchPhotos');
        $api->get('photos/get', 'PhotosController@fetchPhotoByUrl');
        $api->post('photos/upload', 'PhotosController@uploadPhotos');
        $api->post('photos/like', 'PhotosController@likePhotos');
        $api->get('photos/favourites', 'PhotosController@getFavouritePhotos');
        $api->get('photos/delete', 'PhotosController@deletePhoto');


        $api->get('albums', 'AlbumsController@fetchAlbums');
        $api->get('albums/photos', 'AlbumsController@fetchPhotosInAlbums');
        $api->post('albums/create', 'AlbumsController@createAlbum');
        $api->get('albums/delete', 'AlbumsController@deleteAlbum');

        $api->get('events', 'EventsController@fetchEvents');
        $api->post('events/create', 'EventsController@createEvent');

        $api->post('comments/add', 'CommentsController@addComment');
        $api->get('comments', 'CommentsController@fetchComments');

        $api->get('follows', 'FollowsController@fetchFollows');
        $api->post('follows/edit', 'FollowsController@editFollows');

        $api->get('search', 'SearchController@search');

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
