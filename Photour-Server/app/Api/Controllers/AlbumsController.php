<?php
/**
 * Created by PhpStorm.
 * User: st
 * Date: 2017/11/20
 * Time: 20:40
 */

namespace App\Api\Controllers;

use App\User;
use App\Album;
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

    public function fetchPhotosInAlbums(Request $request)
    {
        $albumId = $request->albumId;
        $userId = $request->userId;
        $photos = DB::table('photos')->where('album_id', $albumId)->get();
        foreach ($photos as $photo) {
            $author = DB::table('Users')->select('username')->where('id', $photo->author_id)->get();
            $photo->author = $author;
            if ($userId) {
                if (DB::table('likes')->where([
                    ['author_id', '=', $userId],
                    ['photo_id', '=', $photo->id]
                ])->get()->isEmpty()
                ) {
                    $photo->liked = false;
                } else {
                    $photo->liked = true;
                }
            } else {
                $photo->liked = false;
            }
        }
        return json_encode($photos);
    }

    public function createAlbum(Request $request)
    {
        if (!DB::table('albums')->where('name', $request->name)->get()->isEmpty()) {
            return response()->json([
                'message' => '相册名称重复！',
            ]);
        } else {
            DB::table('albums')->insert([
                'author_id' => $request->author_id,
                'name' => $request->name,
                'description' => $request->description,
                'permission' => $request->permission == '公开' ? 'public' : 'private'
            ]);
            return response()->json([
                'message' => 'success',
            ]);
        }

    }
}