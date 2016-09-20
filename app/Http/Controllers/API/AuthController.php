<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseApiController;
use App\Http\Requests\API\UserRequest;
use App\Model\User;
use Dingo\Api\Facade\API;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Http\Request;

class AuthController extends BaseApiController
{
    /**
     * Registration new user
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(UserRequest $request)
    {
            $newUser = [
                'name' => $request->get('name'),
                'email' => $request->get('email'),
                'password' => bcrypt($request->get('password')),
            ];
            $user = User::create($newUser);
            $token = \JWTAuth::fromUser($user);
            return response()->json(compact('token'));
    }
}
