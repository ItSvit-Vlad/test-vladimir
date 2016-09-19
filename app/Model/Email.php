<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Email extends Model
{
    protected $table = 'emails';

    protected $fillable = [
        'contact_id', 'email',
    ];

    public function contact()
    {
        return $this->belongsTo('App\Model\Contact');
    }
    
}
