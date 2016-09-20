<?php namespace App\Http\Requests\API;

use Dingo\Api\Http\FormRequest;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|min:2|max:30|regex:/^[a-zA-Z]/',
            'password' => 'required|confirmed|min:6',
            'email' => 'required|email|max:45|unique:users,email',
        ];
    }
}
