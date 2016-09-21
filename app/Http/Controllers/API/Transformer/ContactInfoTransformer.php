<?php

namespace App\Http\Controllers\API\Transformer;

use App\Model\ContactInfo;
use League\Fractal\TransformerAbstract;

class ContactInfoTransformer extends TransformerAbstract
{

	public function transform(ContactInfo $contactInfo)
	{

		return [
			'info_id' => $contactInfo->id,
			'contact_id' => $contactInfo->contact_id,
			'email' => $contactInfo->email,
		];
	}
}