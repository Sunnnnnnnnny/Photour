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

            // 使用我们新建的uploads本地存储空间（目录）
            $path = $file->store('photos', 'uploads');
            return response()->json([
                'status_code' => 200,
                'message' => 'success',
                'photo' => $path,
                'name' => $originalName,
                'data' => $request->input()
            ]);

        } else {
            return response()->json(['message' => '文件未通过验证'], 500);
        }
    }
}