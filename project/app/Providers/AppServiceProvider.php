<?php

namespace App\Providers;

use App\Contracts\Services\MessageServiceContract;
use App\Contracts\Services\SocialIdentityServiceContract;
use App\Contracts\Services\UserServiceContract;
use App\Services\MessageService;
use App\Services\SocialIdentityService;
use App\Services\UserService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(
            UserServiceContract::class,
            UserService::class
        );

        $this->app->singleton(
            SocialIdentityServiceContract::class,
            SocialIdentityService::class
        );

        $this->app->singleton(
            MessageServiceContract::class,
            MessageService::class
        );
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
