<?php
/**
 * Created by PhpStorm.
 * User: st
 * Date: 2017/11/17
 * Time: 13:31
 */

namespace App\Http\Controllers\Photo;

use App\User;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class FetchPhotosController extends Controller
{
    public function fetchPhotos()
    {
        $photos = DB::table('photos')->get();
        foreach ($photos as $photo) {
//            $author = DB::table('Users')->select('id', 'id as' . $photo->author_id)->get();
            $author = DB::table('Users')->select('username')->where('id', $photo->author_id)->get();
            $photo->author = $author;
//            echo $author_name;
        }
        return json_encode($photos);
    }
}