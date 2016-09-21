<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Requests\API\ContactRequest;
use App\Http\Controllers\API\ApiProtectedController;
use App\Model\Contact;
use App\Http\Controllers\API\Transformer\ContactTransformer;

class ContactsController extends ApiProtectedController
{

    public function __construct(Request $request)
    {
        dd($request);
    }
    /**
     * Show all contacts
     *
     * Get a JSON representation of all the contacts
     *
     * @Get('/')
     */
    public function index()
    {
        
        $contactList = Contact::where('user_id', $this->user->id)->get();
        return $this->collection($contactList, new ContactTransformer);
    }

    /**
     * Store a new contact in the database.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ContactRequest $request)
    {
        $params =$request->only(['first_name', 'last_name']);
        $params['user_id'] = $this->user->id;
        return Contact::create($params);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return $this->item(Contact::where('user_id', $this->user->id)->findOrFail($id), new ContactTransformer);
    }

    /**
     * Update the contact in the database.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ContactRequest $request, $id)
    {
        $contact = Contact::where('user_id', $this->user->id)->findOrFail($id);
        $contact->update($request->only(['first_name', 'last_name']));
        return $contact;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $contact = Contact::where('user_id', $this->user->id)->findOrFail($id);
        return $contact->destroy();
    }
}
