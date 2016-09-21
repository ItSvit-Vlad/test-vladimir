<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\API\BaseApiController;


class ApiProtectedController extends BaseApiController
{

    protected $user;

    public function __construct()
    {
        $this->user = \JWTAuth::parseToken()->authenticate();
    }

}
