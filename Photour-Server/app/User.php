<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Auth\Authenticatable as AuthenticableTrait;

class User extends \Eloquent implements Authenticatable
{

    use AuthenticableTrait;

    protected $table = 'users';

    protected $fillable = [
        'username', 'password', 'email', 'phone', 'gender', 'pic_url'
    ];

    protected $hidden = [
        'password', 'remember_token'
    ];

    //
}
