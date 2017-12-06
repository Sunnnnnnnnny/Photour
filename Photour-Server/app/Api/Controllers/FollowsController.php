<?php
/**
 * Created by PhpStorm.
 * User: st
 * Date: 2017/12/6
 * Time: 19:26
 */

namespace App\Api\Controllers;

use App\User;
use App\Album;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

use Dingo\Api\Http\Request;
use Dingo\Api\Exception\StoreResourceFailedException;

class FollowsController extends Controller
{
    public function fetchFollows(Request $request)
    {
        $followers = DB::table('follows')->select('follower_id')->where('following_id', (integer)$request->userId)->get(); // 粉丝
        $followings = DB::table('follows')->select('following_id')->where('follower_id', (integer)$request->userId)->get(); // 关注
        $followings_array = [];
        $followers_array = [];
        foreach ($followings as $following) {
            array_push($followings_array, (integer)$following->following_id);
        }
        foreach ($followers as $follower) {
            array_push($followers_array, (integer)$follower->follower_id);
        }
        return response()->json([
            'fans' => $followers_array,
            'followings' => $followings_array
        ]);
    }

    public function editFollows(Request $request)
    {
        $isFollowing = $request->isFollowing;
        if ($isFollowing) {
            //添加关注
            DB::table('follows')->insert([
                'following_id' => $request->followId,
                'follower_id' => $request->userId
            ]);
            return response()->json([
                'message' => 'success',
                'type' => 'add'
            ]);
        } else {
            //取消关注
            if (DB::table('follows')->where([
                ['following_id', '=', $request->followId],
                ['follower_id', '=', $request->userId]
            ])->get()->isEmpty()
            ) {
                return response()->json([
                    'message' => '操作失败！',
                    'type' => 'remove'
                ]);
            } else {
                DB::table('follows')->where([
                    ['following_id', '=', $request->followId],
                    ['follower_id', '=', $request->userId]
                ])->delete();
                return response()->json([
                    'message' => 'success',
                    'type' => 'remove'
                ]);
            }

        }
    }

}