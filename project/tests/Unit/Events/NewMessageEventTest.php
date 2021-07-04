<?php

namespace Tests\Unit\Events;

use App\Events\Users\NewMessage;
use App\Models\Message;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\TestCase;

class NewMessageEventTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_event_contructor()
    {
        $message = Message::factory()->makeOne();

        $event = new NewMessage($message);

        $this->assertSame($message, $event->message);
    }
}
