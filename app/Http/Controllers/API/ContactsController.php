<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Requests\API\ContactRequest;
use App\Http\Controllers\API\ApiProtectedController;
use App\Model\Contact;
use App\Model\ContactInfo;
use App\Http\Controllers\API\Transformer\ContactTransformer;

class ContactsController extends ApiProtectedController
{
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
    public function store(Request $request)
    {
        try{
            $contact = new Contact;
            $contact->user_id = $this->user->id;
            $contact->first_name = $request->first;
            $contact->last_name = $request->last;
            $contact->save();
            $emails=$request->emails;
            if(isset($emails) && count($emails)>0 ){
                foreach($emails as $info){
                    if($info['email']){
                        $params ['email'] = $info['email'];
                        $params['contact_id'] = $contact->id;
                        ContactInfo::create($params);
                    }
                }
            }
            $messege = ['messege' => true];
        } catch(\Exception $e){
            $messege = ['messege' => $e->getMessage()];
        }
        return $messege;
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
   public function update(Request $request, $id)
    {
        try{
            $contact = Contact::where('user_id', $this->user->id)->findOrFail($id);

            if($contact instanceof Contact){
                $contact->first_name = $request->first;
                $contact->last_name = $request->last;
                $contact->save();
                ContactInfo::where('contact_id', $id)->delete();
                $emails = $request->emails;
                if(isset($emails) && count($emails>0 )){
                      foreach($emails as $info){
                          if($info['email']){
                              $params ['email'] = $info['email'];
                              $params['contact_id'] = $id;
                              ContactInfo::create($params);
                          }
                      }
                }
            }

            $messege = ['messege' => true];
        }catch(\Exception $e){
            $messege = ['messege' => $e->getMessage()];
        }

        return $messege;
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
        $contact->delete();
        return ['message'=>true];
    }
}
