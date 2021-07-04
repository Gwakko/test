<?php

namespace Tests\Unit;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DatabaseTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_insert_user_to_database()
    {
        $user = \App\Models\User::factory()->create();

        $this->assertDatabaseHas('users', [
            'email' => $user->email
        ]);
    }
}
