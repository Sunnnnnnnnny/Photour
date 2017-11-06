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

$factory->define(App\User::class, function (Faker $faker) {
    static $password;

    static $gender_cnt = 0;

    return [
        'username' => $faker->name,
        'password' => $password ?: $password = bcrypt('123456'),
        'email' => $faker->unique()->safeEmail,
        'phone' => $faker->phoneNumber,
        'gender' => $gender_cnt++ % 2 == 1 ? '男' : '女',
        'pic_url' => '',
        'remember_token' => str_random(10),
    ];
});
