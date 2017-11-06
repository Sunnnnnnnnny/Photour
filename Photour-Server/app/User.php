<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $table = 'users';

    protected $fillable = [
        'username', 'password', 'email', 'phone', 'gender', 'pic_url'
    ];

    protected $hidden = [
        'password', 'remember_token'
    ];

    //
}
