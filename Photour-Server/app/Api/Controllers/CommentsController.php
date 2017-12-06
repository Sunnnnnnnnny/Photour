<?php
/**
 * Created by PhpStorm.
 * User: st
 * Date: 2017/12/5
 * Time: 18:17
 */

namespace App\Api\Controllers;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

use Dingo\Api\Http\Request;
use Dingo\Api\Exception\StoreResourceFailedException;

class CommentsController extends Controller
{
    public function addComment(Request $request)
    {
        $create_at = date('Y-m-d H:i:s');
        $author_name = DB::table('Users')->where('id', (integer)$request->userId)->value('username');
        $pic_url = DB::table('Users')->where('id', (integer)$request->userId)->value('pic_url');
//        return response()->json([
//            'author_id' => (integer)$request->userId,
//            'author_name' => $author_name,
//            'pic_url' => $pic_url
//        ]);
        $id = DB::table('comments')->insertGetId([
            'author_id' => (integer)$request->userId,
            'photo_id' => (integer)$request->photoId,
            'content' => (string)$request->commentContent,
            'create_at' => $create_at,
            'author_name' => $author_name,
            'pic_url' => $pic_url
        ]);
        return response()->json([
            'message' => 'success',
            'comment' => DB::table('comments')->where('id', $id)->first()
        ]);
    }

    public function fetchComments(Request $request)
    {
        $comments = DB::table('comments')->where('photo_id', $request->photoId)->get();
        return response()->json([
            'message' => 'success',
            'comments' => $comments
        ]);
    }
}