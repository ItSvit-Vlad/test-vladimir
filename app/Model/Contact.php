<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $table = 'contacts';

    protected $fillable = [
        'user_id', 'name',
    ];

    /**
     * Get the user that owns the contact.
     */
    public function user()
    {
        return $this->belongsTo('App\Model\User');
    }


    /**
     * Get the emails for the contact.
     */
    public function emails()
    {
        return $this->hasMany('App\Model\Email','user_id');
    }
}
