<?php

namespace App\Contracts\Services;

interface MessageServiceContract extends ServiceContract
{
    /**
     * Get list of messages by sender and receiver
     *
     * @param int $senderId
     * @param int $receiverId
     * @return \Illuminate\Database\Eloquent\Builder[]|\Illuminate\Database\Eloquent\Collection
     */
    public function allBySenderAnReceiverID(int $senderId, int $receiverId);
}
