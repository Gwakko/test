<?php

namespace App\Services;

use App\Contracts\Services\MessageServiceContract;
use App\Models\Message;
use Illuminate\Database\Eloquent\Builder;

class MessageService extends Service implements MessageServiceContract
{
    public function rules(): array
    {
        return [
            'user_id' => ['required', 'integer', 'exists:users,id'],
            'to_user_id' => ['required', 'integer', 'exists:users,id'],
            'message' => ['required', 'string'],
        ];
    }

    public function model()
    {
        return Message::query();
    }

    /**
     * Get list of messages by sender and receiver
     *
     * @param int $senderId
     * @param int $receiverId
     * @return \Illuminate\Database\Eloquent\Builder[]|\Illuminate\Database\Eloquent\Collection
     */
    public function allBySenderAnReceiverID(int $senderId, int $receiverId)
    {
        return $this->model()
            ->where(function ($query) use ($senderId, $receiverId) {
                /**
                 * @var Builder $query
                 */
                $query->where('user_id', $senderId)->where('to_user_id', $receiverId);
            })
            ->orWhere(function ($query) use ($senderId, $receiverId) {
                /**
                 * @var Builder $query
                 */
                $query->where('user_id', $receiverId)->where('to_user_id', $senderId);
            })
            ->orderBy('created_at')
            ->get();
    }
}
