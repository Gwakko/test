<?php

namespace App\Console\Commands\Users;

use App\Contracts\Services\UserServiceContract;
use Illuminate\Console\Command;

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
        $user = $userService->create($this->arguments());

        $this->info(sprintf('Create user with ID: %s', $user->id));

        return 0;
    }
}
