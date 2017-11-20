<?php
/**
 * Created by PhpStorm.
 * User: st
 * Date: 2017/11/20
 * Time: 20:40
 */

namespace App\Api\Controllers;

use App\User;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

use Dingo\Api\Http\Request;
use Dingo\Api\Exception\StoreResourceFailedException;

class AlbumsController extends Controller
{
    public function fetchAlbums(Request $request)
    {
        $userId = $request->userId;
        $albums = DB::table('albums')->where('author_id', $userId)->get();
        return json_encode($albums);
    }
}