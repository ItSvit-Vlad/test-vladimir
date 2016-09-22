<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Requests\API\ContactInfoRequest;
use App\Http\Controllers\API\ApiProtectedController;
use App\Model\ContactInfo;
use App\Model\Contact;
use App\Http\Controllers\API\Transformer\ContactInfoTransformer;

class ContactsInfoController extends ApiProtectedController
{

    /**
     * Show the contact information
     *
     * Get a JSON representation of all the contacts
     * @param  int  $id
     * @Get('/')
     */
    public function index($id)
    {

        $contact = Contact::where('user_id', $this->user->id)->findOrFail($id);

        if($contact instanceof Contact){
            $contactInfo = ContactInfo::where('contact_id', $id)->get();
            return $this->collection($contactInfo, new ContactInfoTransformer);
        }

    }

    /**
     * Store a new information in the contact.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ContactInfoRequest $request)
    {
        $contact = Contact::where('user_id', $this->user->id)->findOrFail($request->get('contact_id'));
        if ($contact instanceof Contact) {
            $params = $request->only(['email', 'contact_id']);
            return ContactInfo::create($params);
        }

    }

    /**
     * Display the specified information from the contact.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($contactId, $id)
    {
        $contact = Contact::where('user_id', $this->user->id)->findOrFail($contactId);
        if ($contact instanceof Contact) {
            return $this->item(ContactInfo::where('contact_id', $contactId)->findOrFail($id), new ContactInfoTransformer);
        }

    }

    /**
     * Update the information in the contact.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ContactInfoRequest $request, $id)
    {
        $contact = Contact::where('user_id', $this->user->id)->findOrFail($request->get('contact_id'));

        if ($contact) {
            $contactInfo = ContactInfo::where('contact_id', $request->get('contact_id'))->findOrFail($id);
            $contactInfo->update($request->only(['email']));
            return $contactInfo;
        }
    }

    /**
     * Remove the specified information from the contact.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $contact = false;
        $contactInfo = ContactInfo::findOrFail($id);
        if ($contactInfo instanceof ContactInfo) {
            $contact = Contact::findOrFail($contactInfo->contact_id);
        }
        if ($contact instanceof  Contact) {
            return $contactInfo->destroy();
        }
      
    }
}
