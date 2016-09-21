<?php

namespace App\Http\Controllers\API\Transformer;

use App\Model\Contact;
use League\Fractal\TransformerAbstract;

class ContactTransformer extends TransformerAbstract
{
	public function transform(Contact $contact)
	{
		
		return [
			'contact_id' => $contact->id,
			'first_name' => $contact->first_name,
			'last_name' => $contact->last_name,
		];
	}
}