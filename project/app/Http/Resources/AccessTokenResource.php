<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AccessTokenResource extends JsonResource
{
    private $user;

    public function __construct($resource, $user)
    {
        parent::__construct($resource);

        $this->user = $user;
    }

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'access_token' => $this->resource->accessToken,
            'user' => $this->user
        ];
    }
}
