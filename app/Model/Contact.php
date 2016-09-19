<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $table = 'contacts';

    protected $fillable = [
        'user_id', 'name', 
    ];

    public function user()
    {
        return $this->belongsTo('App\Model\User');
    }

    public function emails()
    {
        return $this->hasMany('App\Model\Email','user_id');
    }
}
