<?php

namespace App\Http\Controllers\Api\V1;

use App\Contracts\Services\MessageServiceContract;
use App\Contracts\Services\UserServiceContract;
use App\Events\Users\NewMessage;
use App\Http\Controllers\Controller;
use App\Http\Requests\MessageRequest;
use App\Http\Resources\MessageResource;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    /**
     * @var MessageServiceContract
     */
    private $messageService;
    /**
     * @var UserServiceContract
     */
    private $userService;

    public function __construct(UserServiceContract $userService, MessageServiceContract $messageService)
    {

        $this->messageService = $messageService;
        $this->userService = $userService;
    }

    /**
     * @OA\Get(
     *      path="/users/{to_user_id}/messages",
     *      operationId="getMessagesList",
     *      tags={"Messages"},
     *      summary="Get list of messages",
     *      description="Returns list of messages",
     *     security={{"token": {}}},
     *     @OA\Parameter(
     *          name="to_user_id",
     *          in="path",
     *          required=true,
     *          @OA\Schema(
     *              type="int64"
     *          ),
     *          description="Recipient ID",
     *          example=1
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *          @OA\JsonContent(ref="#/components/schemas/MessageResource")
     *       ),
     *      @OA\Response(
     *          response=401,
     *          description="Unauthenticated",
     *      ),
     *      @OA\Response(
     *          response=403,
     *          description="Forbidden"
     *      )
     * )
     */
    public function index(int $to_user_id)
    {
        $currentUser = $this->userService->currentUser();

        $messages = $this->messageService->allBySenderAnReceiverID($currentUser->id, $to_user_id);

        return MessageResource::collection($messages);
    }

    /**
     * @OA\Post(
     *      path="/users/{to_user_id}/messages",
     *      operationId="storeMessage",
     *      tags={"Messages"},
     *      summary="Store new message",
     *      description="Returns message data",
     *     security={{"token": {}}},
     *     @OA\Parameter(
     *          name="to_user_id",
     *          in="path",
     *          required=true,
     *          @OA\Schema(
     *              type="int64"
     *          ),
     *          description="Recipient ID",
     *          example=1
     *      ),
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(ref="#/components/schemas/MessageRequest")
     *      ),
     *      @OA\Response(
     *          response=201,
     *          description="Successful operation",
     *          @OA\JsonContent(ref="#/components/schemas/Message")
     *       ),
     *      @OA\Response(
     *          response=400,
     *          description="Bad Request"
     *      ),
     *      @OA\Response(
     *          response=401,
     *          description="Unauthenticated",
     *      ),
     *      @OA\Response(
     *          response=403,
     *          description="Forbidden"
     *      )
     * )
     */
    public function store(MessageRequest $request, int $to_user_id)
    {
        $currentUser = $this->userService->currentUser();

        $message = $this->messageService->create($request->validated() + [
            'user_id' => $currentUser->id,
            'to_user_id' => $to_user_id,
        ]);

//        broadcast(new NewMessage($message));

        return new MessageResource($message);
    }
}
