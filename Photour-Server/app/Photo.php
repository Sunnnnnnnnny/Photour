<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
    //
    protected $table = 'photos';

    protected $fillable = [
        'author', 'author_id', 'album_id', 'url', 'likes'
    ];
}
