<?php

namespace App\Contracts\Services;

interface SocialIdentityServiceContract extends ServiceContract
{
    /**
     * Get model instance
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function model();

    /**
     * Assign user to social identity
     *
     * @param int $userId User ID
     * @param int $socialIdentityId Social Identity ID
     * @return int
     */
    public function assignUserId(int $userId, int $socialIdentityId);

    /**
     * Create And Assign Identity Provider If not exists
     *
     * @param array $data Input Data
     * @param int $userId User Id
     * @return \Illuminate\Database\Eloquent\Builder|\Illuminate\Database\Eloquent\Model|object
     * @throws \Illuminate\Validation\ValidationException
     */
    public function createProviderIfNotExists(array $data, int $userId);
}
