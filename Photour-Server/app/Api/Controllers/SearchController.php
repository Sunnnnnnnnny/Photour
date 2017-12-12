<?php
/**
 * Created by PhpStorm.
 * User: st
 * Date: 2017/12/7
 * Time: 17:02
 */

namespace App\Api\Controllers;

use App\User;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

use Dingo\Api\Http\Request;
use Dingo\Api\Exception\StoreResourceFailedException;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $input = $request->input;
        $userId = $request->input('userId');
        $users = DB::table('Users')
            ->where('username', 'like', '%' . $input . '%')
            ->orWhere('tags', 'like', '%' . $input . '%')
            ->get();
        $photos = DB::table('photos')
            ->where('description', 'like', '%' . $input . '%')
            ->orWhere('tags', 'like', '%' . $input . '%')
            ->orderBy('likes', 'desc')
            ->get();
        foreach ($photos as $photo) {
            $author = DB::table('Users')->select('username')->where('id', $photo->author_id)->get();
            $photo->author = $author;
            $comments = DB::table('comments')->where('photo_id', $photo->id)->get();
            $photo->comments = $comments;
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
        $events = DB::table('events')
            ->where('content', 'like', '%' . $input . '%')
            ->orderBy('create_at', 'desc')
            ->get();
        foreach ($events as $event) {
            $event->author_name = DB::table('Users')->where('id', $event->author_id)->value('username');
            $event->photo = DB::table('photos')->where('id', $event->photo_id)->first();
            $author = DB::table('Users')->select('username')->where('id', $event->photo->author_id)->get();
            $event->photo->author = $author;
            $comments = DB::table('comments')->where('photo_id', $event->photo->id)->orderBy('create_at', 'desc')->get();
            $event->photo->comments = $comments;
            if ($userId) {
                if (DB::table('likes')->where([
                    ['author_id', '=', $userId],
                    ['photo_id', '=', $event->photo->id]
                ])->get()->isEmpty()
                ) {
                    $event->photo->liked = false;
                } else {
                    $event->photo->liked = true;
                }
            } else {
                $event->photo->liked = false;
            }
        }
        return response()->json([
            'users' => $users,
            'photos' => $photos,
            'events' => $events
        ]);
    }
}