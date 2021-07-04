<?php

namespace App\Virtual\Models;

/**
 * @OA\Schema(
 *     title="User",
 *     description="User model",
 *     @OA\Xml(
 *         name="User"
 *     )
 * )
 */
class User
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
     *      title="User Name",
     *      description="Name of the user",
     *      example="John Doe"
     * )
     *
     * @var string
     */
    public $name;

    /**
     * @OA\Property(
     *      title="User Email",
     *      description="User Email",
     *      example="john.doe@example.com"
     * )
     *
     * @var string
     */
    public $email;

    /**
     * @OA\Property(
     *      title="Nickname",
     *      description="Nickname of the user in social identity service",
     *      example="Unicorn"
     * )
     *
     * @var string
     */
    public $nickname;

    /**
     * @OA\Property(
     *      title="Avatar Url",
     *      description="Avatar url in social identity service",
     *      example="https://example.com/static/user-unicorn.png"
     * )
     *
     * @var string
     */
    public $avatar_url;

    /**
     * @OA\Property(
     *      title="User Role",
     *      description="User role in community",
     *      example="user"
     * )
     *
     * @var string
     */
    public $role;
}
