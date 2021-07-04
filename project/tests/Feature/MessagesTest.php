<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Str;
use Tests\TestCase;

class MessagesTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->artisan('passport:install');
    }

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_authentication_required()
    {
        $user = User::factory()->create();

        $apiUrl = sprintf('/api/v1/users/%s/messages', $user->id);

        $response = $this->getJson($apiUrl);
        $response->assertUnauthorized();

        $accessToken = $user->createToken('test.app')->accessToken;

        $response = $this->withToken($accessToken)->getJson($apiUrl);
        $response->assertOk();
    }

    public function test_can_create_new_message()
    {
        $users = User::factory()->count(25)->create();

        $userSender = $users->random()->first();
        $userRecipient = $users->filter(static function ($user) use ($userSender) {
            return $user->id !== $userSender->id;
        })->random()->first();

        $apiUrl = sprintf('/api/v1/users/%s/messages', $userRecipient->id);

        $response = $this->getJson($apiUrl);
        $response->assertUnauthorized();

        $accessToken = $userSender->createToken('test.app')->accessToken;

        $message = Str::random(50);
        $response = $this->withToken($accessToken)->postJson($apiUrl, [
            'message' => $message,
        ]);

        $response->assertCreated();

        $response->assertSeeText($message);

        $response->assertJsonStructure([
            'data' => [
                'id',
                'user_id',
                'to_user_id',
                'message',
                'created_at',
            ]
        ]);
    }
}
