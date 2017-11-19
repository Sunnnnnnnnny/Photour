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

$factory->define(App\Album::class, function (Faker $faker) {
    static $permission = array("private", "public");

    return [
        'author_id' => rand(1, 10),
        'permission' => $permission[rand(0, 1)],
        'name' => '相册名称',
        'description' => '相册描述相册描述相册描述'
    ];
});
