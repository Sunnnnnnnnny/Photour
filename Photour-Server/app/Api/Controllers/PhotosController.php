<?php
/**
 * Created by PhpStorm.
 * User: st
 * Date: 2017/11/17
 * Time: 13:31
 */

namespace App\Api\Controllers;

use App\User;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

use Dingo\Api\Http\Request;
use Dingo\Api\Exception\StoreResourceFailedException;
use Storage;

class PhotosController extends Controller
{
    public function fetchPhotos(Request $request)
    {
        $userId = $request->input('userId');
        $photos = DB::table('photos')->get();
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
        return json_encode($photos);
    }

    public function fetchPhotoByUrl(Request $request)
    {
        $photoUrl = $request->photoUrl;
        $userId = $request->userId;
        $photo = DB::table('photos')->where('url', $photoUrl)->first();
        $author = DB::table('Users')->select('username')->where('id', $photo->author_id)->get();
        $photo->author = $author;
        $comments = DB::table('comments')->where('photo_id', $photo->id)->orderBy('create_at', 'desc')->get();
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
        return response()->json($photo);
    }

    public function uploadPhotos(Request $request)
    {
        if (!$request->hasFile('file')) {
            return response()->json(['message' => '无法获取上传文件'], 500);
        }
        $file = $request->file('file');

        if ($file->isValid()) {
            // 获取文件相关信息
            $originalName = $file->getClientOriginalName(); // 文件原名
            $ext = $file->getClientOriginalExtension();     // 扩展名
            $realPath = $file->getRealPath();   //临时文件的绝对路径
            $type = $file->getClientMimeType();     // image/jpeg
            $album = $request->input('album');
            $tags = $request->input('tags');
            $description = $request->input('description');
            $userId = $request->input('userId');
            $albumId = DB::table('albums')->where([
                ['author_id', '=', $userId],
                ['name', '=', $album],
            ])->value('id');

            // 使用我们新建的uploads本地存储空间（目录）
            $path = $file->store('photos', 'uploads');
            $array = explode("/", $path);

            DB::table('photos')->insert([
                'author_id' => $userId,
                'album_id' => $albumId,
                'url' => $array[sizeof($array) - 1],
                'likes' => 0,
                'comments' => 0,
                'tags' => $tags,
                'description' => $description
            ]);

            return response()->json([
                'status_code' => 200,
                'message' => 'success'
            ]);

        } else {
            return response()->json(['message' => '文件未通过验证'], 500);
        }
    }

    public function likePhotos(Request $request)
    {
        $userId = $request->input('userId');
        $photoId = $request->input('photoId');
        if (DB::table('likes')->where([
            ['author_id', '=', $userId],
            ['photo_id', '=', $photoId]
        ])->get()->isEmpty()
        ) {
            // 点赞
            DB::table('likes')->insert([
                'author_id' => $userId,
                'photo_id' => $photoId
            ]);
            DB::table('photos')->where('id', $photoId)->increment('likes', 1);
        } else {
            // 取消点赞
            DB::table('likes')->where([
                ['author_id', '=', $userId],
                ['photo_id', '=', $photoId]
            ])->delete();
            DB::table('photos')->where('id', $photoId)->decrement('likes', 1);
        }
        return response()->json([
            'status_code' => 200,
            'message' => 'success',
        ]);
    }

    public function getFavouritePhotos(Request $request)
    {
        $userId = $request->input('userId');

        $photos = DB::table('photos')
            ->join('likes', 'photos.id', '=', 'likes.photo_id')
            ->where('likes.author_id', $userId)
            ->get();
        foreach ($photos as $photo) {
            $author = DB::table('Users')->select('username')->where('id', $photo->author_id)->get();
            $photo->author = $author;
            $comments = DB::table('comments')->where('photo_id', $photo->id)->get();
            $photo->comments = $comments;
            $photo->liked = true;
        }
        return response()->json([
            'status_code' => 200,
            'photoUrls' => $photos,
        ]);
    }

    public function deletePhoto(Request $request)
    {
        $photoId = $request->photoId;
        if (DB::table('photos')->where('id', $photoId)->get()->isEmpty()) {
            return response()->json([
                'message' => '不存在该照片！',
            ]);
        } else {
            DB::table('photos')->where('id', $photoId)->delete();
            return response()->json([
                'message' => 'success',
            ]);
        }
    }
}