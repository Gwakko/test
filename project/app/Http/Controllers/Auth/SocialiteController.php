<?php

namespace App\Http\Controllers\Auth;

use App\Contracts\Services\SocialIdentityServiceContract;
use App\Contracts\Services\UserServiceContract;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController extends Controller
{
    /**
     * @var UserServiceContract
     */
    private $userService;

    /**
     * @var SocialIdentityServiceContract
     */
    private $socialIdentityService;

    /**
     * The path to the "home" route for your application.
     *
     * This is used by Laravel authentication to redirect users after login.
     *
     * @var string
     */
    public const HOME = '/social/callback';

    public function __construct(
        UserServiceContract $userService,
        SocialIdentityServiceContract $socialIdentityService
    )
    {
        $this->userService = $userService;
        $this->socialIdentityService = $socialIdentityService;
    }

    public function instagram()
    {
        return $this->redirect('instagram');
    }

    public function instagramCallback()
    {
        return $this->callback('instagram');
    }

    public function github()
    {
        return $this->redirect('github');
    }

    public function githubCallback()
    {
        return $this->callback('github');
    }

    /**
     * @param string $provider
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    private function redirect(string $provider): \Symfony\Component\HttpFoundation\RedirectResponse
    {
        return Socialite::driver($provider)->redirect();
    }

    /**
     * @param string $provider
     * @return \Illuminate\Http\RedirectResponse
     */
    private function callback(string $provider): \Illuminate\Http\RedirectResponse
    {
        $user = Socialite::driver($provider)->stateless()->user();

        $isExistsByEmail = $this->userService->isExistsByEmail($user->getEmail());

        if (!$isExistsByEmail) {
            $newUser = $this->userService->create([
                'name' => $user->getName() ?? $user->getNickname(),
                'email' => $user->getEmail(),
                'password' => Str::random(36),
                'nickname' => $user->getNickname(),
                'avatar_url' => $user->getAvatar(),
            ]);

            $socialIdentity = $this->socialIdentityService->create([
                'provider' => $provider,
                'provider_id' => $user->getId(),
            ]);

            $this->socialIdentityService->assignUserId($newUser->id, $socialIdentity->id);
        }
        else {
            $newUser = $this->userService->findByEmail($user->getEmail());
        }

        $params = http_build_query([
            'url' => url()->temporarySignedRoute(
                'auth.sign-in.social',
                now()->addMinutes(5),
                [
                    'user_id' => $newUser->id
                ]
            )
        ]);

        return redirect()->to(self::HOME.'?'.$params);
    }
}
