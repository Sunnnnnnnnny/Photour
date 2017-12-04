<?php
/**
 * Created by PhpStorm.
 * User: st
 * Date: 2017/11/12
 * Time: 20:37
 */

namespace App\Api\Controllers;

use App\User;
use App\Api\Controllers\BaseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends BaseController
{
    public function authenticate(Request $request)
    {
        // grab credentials from the request
        $credentials = $request->only('email', 'password');
        try {
            // attempt to verify the credentials and create a token for the user
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => '用户名或密码错误！']);
            }
        } catch (JWTException $e) {
            // something went wrong whilst attempting to encode the token
            return response()->json(['error' => 'could_not_create_token'], 500);
        }
        // all good so return the token
        return response()->json(compact('token'));
    }

    public function getAuthenticatedUser()
    {
        try {
            if (!$user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }
        } catch (TokenExpiredException $e) {
            return response()->json(['token_expired'], $e->getStatusCode());
        } catch (TokenInvalidException $e) {
            return response()->json(['token_invalid'], $e->getStatusCode());
        } catch (JWTException $e) {
            return response()->json(['token_absent'], $e->getStatusCode());
        }
        // the token is valid and we have found the user via the sub claim
        return response()->json(compact('user'));
    }

    public function register(Request $request)
    {
        // grab credentials from the request
        $registerInfo = $request->only('username', 'email', 'password');
        $registerInfo["password"] = Hash::make($registerInfo["password"]);
        if (!User::where('username', $registerInfo["username"])->get()->isEmpty()) {
            return response()->json(['error' => '用户名已被注册！']);
        } else if (!User::where('email', $registerInfo["email"])->get()->isEmpty()) {
            return response()->json(['error' => '邮箱已被注册！']);
        } else {
//            $registerInfo["phone"] = "";
//            $registerInfo["gender"] = "男";
            $id = User::create($registerInfo)->id;
            DB::table('albums')->insert([
                'author_id' => $id,
                'permission' => "public",
                'name' => "默认相册",
                'description' => ""
            ]);
            return response()->json(['success' => '注册成功！']);
        }
    }

    public function fetchCurrentUserById(Request $request)
    {
        $userId = $request->userId;
        $user = DB::table('Users')->where('id', $userId)->get();
        return response()->json(compact('user'));
    }

    public function editUserInfo(Request $request)
    {
        $userId = $request->userId;
        $username = $request->username;
        $phone = $request->phone;
        $gender = $request->gender;
        if (DB::table('Users')->where('id', $userId)->get()->isEmpty()) {
            return response()->json([
                'message' => '不存在该用户！',
            ]);
        } else {
            DB::table('Users')
                ->where('id', $userId)
                ->update([
                    'username' => $username,
                    'phone' => $phone,
                    'gender' => $gender
                ]);
            return response()->json([
                'message' => 'success',
            ]);
        }
    }

    public function editUserPw(Request $request)
    {
        $userId = $request->userId;
        $oldPw = $request->password;
        $newPw = $request->newPw;
        $confirmPw = $request->comfirmPw;
//        return response()->json([
//            'message' => Hash::check((string)$oldPw, DB::table('Users')->where('id', $userId)->value('password')),
//            'oldPw' => (string)$oldPw,
//            'realPw' => DB::table('Users')->where('id', $userId)->value('password')
//        ]);
        if (DB::table('Users')->where('id', $userId)->get()->isEmpty()) {
            return response()->json([
                'message' => '不存在该用户！',
            ]);
        } else if (!Hash::check((string)$oldPw, DB::table('Users')->where('id', $userId)->value('password'))) {
            return response()->json([
                'message' => '用户密码错误！',
            ]);
        } else if (!$newPw === $confirmPw) {
            return response()->json([
                'message' => '两次密码不一致！',
            ]);
        } else {
            DB::table('Users')
                ->where('id', $userId)
                ->update(['password' => Hash::make($newPw)]);
            return response()->json([
                'message' => 'success',
            ]);
        }
    }

    public function editUserTags(Request $request)
    {
        $userId = $request->userId;
        $tags = $request->tags;
        if (DB::table('Users')->where('id', $userId)->get()->isEmpty()) {
            return response()->json([
                'message' => '不存在该用户！',
            ]);
        } else {
            DB::table('Users')
                ->where('id', $userId)
                ->update(['tags' => $tags]);
            return response()->json([
                'message' => 'success',
            ]);
        }
    }
}