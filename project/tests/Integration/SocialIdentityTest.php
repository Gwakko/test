<?php

namespace Tests\Integration;

use Laravel\Socialite\SocialiteManager;
use Tests\TestCase;
use Laravel\Socialite\Facades\Socialite;

class SocialIdentityTest extends TestCase
{
    public function test_social_identity_manager_instance_creation()
    {
        $instance = $this->app->make(SocialiteManager::class);

        $this->assertInstanceOf(
            \Illuminate\Support\Manager::class,
            $instance,
            'Socialite Manager Instance Not Created'
        );
    }

    public function test_social_identity_integration_invalid_driver()
    {
        $this->expectErrorMessage('Driver [unknown] not supported.');

        $driver = Socialite::driver('unknown');
    }

    public function test_social_identity_github_integration()
    {
        $driver = Socialite::driver('github');

        $this->assertInstanceOf(
            \Laravel\Socialite\Contracts\Provider::class,
            $driver,
            'Socialite Driver For Github Not Created'
        );
    }

    public function test_social_identity_instagram_integration()
    {
        $driver = Socialite::driver('instagram');

        $this->assertInstanceOf(
            \Laravel\Socialite\Contracts\Provider::class,
            $driver,
            'Socialite Driver For Instagram Not Created'
        );
    }
}
