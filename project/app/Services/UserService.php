<?php

namespace App\Services;

use App\Contracts\Services\UserServiceContract;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class UserService extends Service implements UserServiceContract
{
    /**
     * @return array
     */
    public function rules(): array
    {
        return [
            'name' => ['string', 'max:255'],
            'email' => ['string', 'email', 'max:255', 'unique:users'],
            'password' => ['string', 'min:8'],
            'nickname' => ['string', 'max:255'],
            'avatar_url' => ['string', 'max:255'],
        ];
    }

    /**
     * Get model instance
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function model(): Builder
    {
        return User::query();
    }

    /**
     * @return \Illuminate\Contracts\Auth\Authenticatable|Model|null
     */
    public function currentUser()
    {
        return auth()->user();
    }

    public function findByEmail(string $email)
    {
        return $this->model()->where('email', $email)->first();
    }

    public function isExistsByEmail(string $email)
    {
        return $this->model()->where('email', $email)->exists();
    }

    public function all()
    {
        return $this->model()->orderByDesc('created_at')->orderBy('name')->orderBy('nickname')->get();
    }
}
