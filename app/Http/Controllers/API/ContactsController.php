<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\API\BaseApiController;

class ContactsController extends BaseApiController
{
    protected $table = "contacts";
}
