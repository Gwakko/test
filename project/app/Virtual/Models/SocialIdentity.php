<?php

namespace App\Virtual\Models;

/**
 * @OA\Schema(
 *     title="Social Identity",
 *     description="Social Identity model",
 *     @OA\Xml(
 *         name="SocialIdentity"
 *     )
 * )
 */
class SocialIdentity
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
     *      title="User ID",
     *      description="User id of the social identity",
     *      format="int64",
     *      example=1
     * )
     *
     * @var integer
     */
    public $user_id;

    /**
     * @OA\Property(
     *      title="Provider Name",
     *      description="Provider Name of the social identity",
     *      example="instagram"
     * )
     *
     * @var string
     */
    public $provider;

    /**
     * @OA\Property(
     *      title="Provider ID",
     *      description="Provider id of the social identity. Original user id from Social Identity service",
     *      format="int64",
     *      example=1
     * )
     *
     * @var integer
     */
    public $provider_id;

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

    /**
     * @OA\Property(
     *     title="User",
     *     description="User model"
     * )
     *
     * @var \App\Models\User
     */
    private $user;
}
