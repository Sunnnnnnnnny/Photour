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
        if (User::where('username', $registerInfo["username"])) {
            return response()->json(['error' => '用户名已被注册！']);
        } else if (User::where('email', $registerInfo["email"])) {
            return response()->json(['error' => '邮箱已被注册！']);
        } else {
            User::create($registerInfo);
            return response()->json(['success' => '注册成功！']);
        }
    }
}