<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * @OA\Schema(
 *      title="Store Message request",
 *      description="Store Message request body data",
 *      type="object",
 *      required={"message"}
 * )
 */
class MessageRequest extends FormRequest
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
            'message' => ['required', 'string'],
        ];
    }

    /**
     * @OA\Property(
     *      title="Message",
     *      description="Message content",
     *      example="A nice project"
     * )
     *
     * @var string
     */
    public $message;
}
