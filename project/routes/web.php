<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::prefix('auth')->name('auth.')->group(function() {

    Route::get('sign-in', [App\Http\Controllers\Auth\LoginController::class, 'signIn'])->name('sign-in');
    Route::post('sign-in', [App\Http\Controllers\Auth\LoginController::class, 'login'])->name('login');

    Route::get('social/{user_id}/post-callback', [App\Http\Controllers\Auth\LoginController::class, 'signInSocial'])->name('sign-in.social');

    Route::middleware('auth:api')->group(function() {

        Route::post('token/sign-in', [App\Http\Controllers\Auth\LoginController::class, 'loginToken'])->name('login-token');
        Route::post('logout', [App\Http\Controllers\Auth\LoginController::class, 'logout'])->name('logout');

    });

    Route::prefix('instagram')->group(function() {

        Route::get('/', [App\Http\Controllers\Auth\SocialiteController::class, 'instagram'])->name('instagram');
        Route::get('callback', [App\Http\Controllers\Auth\SocialiteController::class, 'instagramCallback'])->name('instagram.callback');

    });

    Route::prefix('github')->group(function() {

        Route::get('/', [App\Http\Controllers\Auth\SocialiteController::class, 'github'])->name('github');
        Route::get('callback', [App\Http\Controllers\Auth\SocialiteController::class, 'githubCallback'])->name('github.callback');

    });

});

Route::get('{any}', function () {
    return view('spa.app');
})->where(['any' => '.*']);
