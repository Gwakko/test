<?php

namespace App\Console\Commands\Users;

use App\Contracts\Services\UserServiceContract;
use Illuminate\Console\Command;
use Illuminate\Validation\ValidationException;

/**
 * Class CreateCommand
 * @package App\Console\Commands\Users
 */
class CreateCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'users:create
                            {email : User email}
                            {password : User password}
                            {name="John Doe" : User name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create user';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @param UserServiceContract $userService
     * @return int
     * @throws \Illuminate\Validation\ValidationException
     */
    public function handle(UserServiceContract $userService)
    {
        try
        {
            $user = $userService->create($this->arguments());

            $this->info(sprintf('Create user with ID: %s', $user->id));
        }
        catch (ValidationException $exception) {
            foreach ($exception->errors() as $error => $messages) {
                foreach ($messages as $message) {
                    $this->error(sprintf('[%s]: %s', $error, $message));
                }
            }
        }

        return 0;
    }
}
