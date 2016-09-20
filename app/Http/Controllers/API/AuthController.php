<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseApiController;
use App\Http\Requests\API\UserAuthRequest;
use App\Http\Requests\API\UserRegisterRequest;
use App\Model\User;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Http\Request;

class AuthController extends BaseApiController
{
    /**
     * Registration new user
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(UserRegisterRequest $request)
    {
            $newUser = [
                'name' => $request->get('name'),
                'email' => $request->get('email'),
                'password' => bcrypt($request->get('password')),
            ];
            $user = User::create($newUser);
            $token = JWTAuth::fromUser($user);
            return response()->json(compact('token'));
    }

    public function authenticate(UserAuthRequest $request)
    {
        // grab credentials from the request
        $credentials = $request->only('email', 'password', 'save');
        
        try {
            // attempt to verify the credentials and create a token for the user
            if (! $token = \JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }
        } catch (JWTException $e) {
            // something went wrong whilst attempting to encode the token
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        // all good so return the token
        return response()->json(compact('token'));
    }


}
