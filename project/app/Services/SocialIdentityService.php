<?php

namespace App\Services;

use App\Contracts\Services\SocialIdentityServiceContract;
use App\Models\SocialIdentity;

class SocialIdentityService extends Service implements SocialIdentityServiceContract
{
    /**
     * @return array
     */
    public function rules(): array
    {
        return [
            'provider' => ['string', 'max:255'],
            'provider_id' => ['integer'],
        ];
    }

    /**
     * Get model instance
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function model()
    {
        return SocialIdentity::query();
    }

    /**
     * Assign user to social identity
     *
     * @param int $userId User ID
     * @param int $socialIdentityId Social Identity ID
     * @return int
     */
    public function assignUserId(int $userId, int $socialIdentityId)
    {
        return $this->model()
            ->where('id', $socialIdentityId)
            ->update([
                'user_id' => $userId
            ]);
    }

    /**
     * Create And Assign Identity Provider If not exists
     *
     * @param array $data Input Data
     * @param int $userId User Id
     * @return \Illuminate\Database\Eloquent\Builder|\Illuminate\Database\Eloquent\Model|object
     * @throws \Illuminate\Validation\ValidationException
     */
    public function createProviderIfNotExists(array $data, int $userId)
    {
        $model = $this->model()->where('user_id', $userId);
        foreach ($data as $key => $value) {
            $model->where($key, $value);
        }

        $socialIdentity = $model->first();
        if (null !== $socialIdentity) {
            return $socialIdentity;
        }

        $socialIdentity = $this->create($data);

        $this->assignUserId($userId, $socialIdentity->id);

        return $socialIdentity->refresh();
    }
}
