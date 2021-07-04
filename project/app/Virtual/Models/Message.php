<?php

namespace App\Virtual\Models;

/**
 * @OA\Schema(
 *     title="Message",
 *     description="Message model",
 *     @OA\Xml(
 *         name="Mewssage"
 *     )
 * )
 */
class Message
{
    /**
     * @OA\Property(
     *     title="ID",
     *     description="ID",
     *     format="int64",
     *     example=1
     * )
     *
     * @var integer
     */
    private $id;

    /**
     * @OA\Property(
     *      title="Author ID",
     *      description="Author's id of the message",
     *      format="int64",
     *      example=1
     * )
     *
     * @var integer
     */
    public $user_id;

    /**
     * @OA\Property(
     *      title="Recipient ID",
     *      description="Recipient's id of the messaget",
     *      format="int64",
     *      example=1
     * )
     *
     * @var integer
     */
    public $to_user_id;

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

    /**
     * @OA\Property(
     *     title="Created at",
     *     description="Created at",
     *     example="2020-01-27 17:50:45",
     *     format="datetime",
     *     type="string"
     * )
     *
     * @var \DateTime
     */
    public $created_at;

    /**
     * @OA\Property(
     *     title="Updated at",
     *     description="Updated at",
     *     example="2020-01-27 17:50:45",
     *     format="datetime",
     *     type="string"
     * )
     *
     * @var \DateTime
     */
    public $updated_at;
}
