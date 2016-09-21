<?php

namespace App\Http\Requests\API;

use Illuminate\Foundation\Http\FormRequest;

class ContactRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'first_name' => 'required|min:2|max:30|regex:/^[a-zA-Z]/',
            'last_name' => 'required|min:2|max:30|regex:/^[a-zA-Z]/',
        ];
    }
}
