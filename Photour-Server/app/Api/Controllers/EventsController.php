<?php
/**
 * Created by PhpStorm.
 * User: st
 * Date: 2017/12/4
 * Time: 16:30
 */

namespace App\Api\Controllers;

use App\User;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

use Dingo\Api\Http\Request;
use Dingo\Api\Exception\StoreResourceFailedException;

class EventsController extends Controller
{
    public function createEvent(Request $request)
    {
        $create_at = date('Y-m-d H:i:s');
        $author_id = (integer)$request->userId;
        $photo_id = $request->type === 'upload' ? DB::table('photos')->where('author_id', $author_id)->max('id') : (integer)$request->photoId;
        $content = (string)$request->eventContent;
        DB::table('events')->insert([
            'author_id' => $author_id,
            'photo_id' => $photo_id,
            'content' => $content,
            'type' => $request->type,
            'create_at' => $create_at
        ]);
        return response()->json([
            'message' => 'success'
        ]);
    }

    public function fetchEvents(Request $request)
    {
        $author_id = (integer)$request->userId;
        if ($author_id) {
            $events = DB::table('events')->where('author_id', $author_id)->orderBy('create_at', 'desc')->get();
        } else {
            $events = DB::table('events')->orderBy('create_at', 'desc')->get();
        }
        foreach ($events as $event) {
            $event->author_name = DB::table('Users')->where('id', $author_id)->value('username');
            $event->photo = DB::table('photos')->where('id', $event->photo_id)->first();
            $author = DB::table('Users')->select('username')->where('id', $event->photo->author_id)->get();
            $event->photo->author = $author;
            $comments = DB::table('comments')->where('photo_id', $event->photo->id)->orderBy('create_at', 'desc')->get();
            $event->photo->comments = $comments;
            if ($author_id) {
                if (DB::table('likes')->where([
                    ['author_id', '=', $author_id],
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
        return json_encode($events);
    }
}