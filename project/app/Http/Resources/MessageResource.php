<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @OA\Schema(
 *     title="MessageResource",
 *     description="Message resource",
 *     @OA\Xml(
 *         name="MessageResource"
 *     )
 * )
 */
class MessageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->resource->id,
            'user_id' => $this->resource->user_id,
            'to_user_id' => $this->resource->to_user_id,
            'message' => $this->resource->message,
            'created_at' => $this->resource->created_at,
        ];
    }

    /**
     * @OA\Property(
     *     title="Data",
     *     description="Data wrapper"
     * )
     *
     * @var \App\Models\Message[]
     */
    private $data;
}
