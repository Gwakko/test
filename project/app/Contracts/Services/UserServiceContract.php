<?php

namespace App\Contracts\Services;

use Illuminate\Database\Eloquent\Model;

interface UserServiceContract extends ServiceContract
{
    /**
     * Find Model By Email
     *
     * @param string $email
     * @return \Illuminate\Database\Eloquent\Builder|\Illuminate\Database\Eloquent\Builder[]|\Illuminate\Database\Eloquent\Collection|\Illuminate\Database\Eloquent\Model|null
     */
    public function findByEmail(string $email);
    /**
     * Find Model By Email
     *
     * @param string $email
     * @return \Illuminate\Database\Eloquent\Builder|\Illuminate\Database\Eloquent\Builder[]|\Illuminate\Database\Eloquent\Collection|\Illuminate\Database\Eloquent\Model|null
     */
    public function isExistsByEmail(string $email);

    /**
     * Get current user
     *
     * @return \Illuminate\Contracts\Auth\Authenticatable|Model|null
     */
    public function currentUser();
}
