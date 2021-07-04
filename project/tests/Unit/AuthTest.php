<?php

namespace Tests\Unit;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->artisan('passport:install');
    }

    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_user_auth()
    {
        $user = \App\Models\User::factory()->create();

        auth()->login($user);

        $this->assertAuthenticatedAs($user);
    }

    public function test_user_access_token_generation()
    {
        $user = \App\Models\User::factory()->create();
        $token = $user->createToken('test.jwt');

        $this->assertIsString($token->accessToken);
    }

    public function test_user_access_token_api_authentication()
    {
        $user = \App\Models\User::factory()->create();
        $token = $user->createToken('test.jwt');

        $response = $this->withToken($token->accessToken)->get('/api/v1/users');
        $response->assertOk();
        $response->assertSuccessful();
    }

    public function test_api_unauthorized()
    {
        $response = $this->getJson('/api/v1/users');
        $response->assertUnauthorized();
    }
}
