<?php

use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(App\Photo::class, function (Faker $faker) {

    static $url_cnt = 1;

    return [
        'author_id' => rand(1, 10),
        'album_id' => rand(1, 20),
        'url' => (string)($url_cnt++) . '.jpeg',
        'likes' => rand(5, 200),
    ];
});
