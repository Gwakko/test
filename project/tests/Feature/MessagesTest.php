<?php

namespace Tests\Feature;

use App\Models\Message;
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
    }

    public function test_authenticated_user_can_get_messsages()
    {
        $user = User::factory()->make([
            'id' => 1
        ]);

        $user->save();

        $user2 = User::factory()->make([
            'id' => 2
        ]);

        $user2->save();

        Message::factory()->count(10)->create();

        $apiUrl = sprintf('/api/v1/users/%s/messages', $user->id);

        $accessToken = $user->createToken('test.app')->accessToken;

        $response = $this->withToken($accessToken)->getJson($apiUrl);
        $response->assertOk();

        $response->assertJsonStructure([
            'data' => [
                [
                    'id',
                    'user_id',
                    'to_user_id',
                    'message',
                    'created_at',
                ]
            ]
        ]);
    }

    public function test_can_create_new_message()
    {
        $userSender = User::factory()->create();
        $userRecipient = User::factory()->create();

        $apiUrl = sprintf('/api/v1/users/%s/messages', $userRecipient->id);

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

        $this->assertDatabaseHas('messages', [
            'user_id' => $userSender->id,
            'to_user_id' => $userRecipient->id,
        ]);
    }
}
