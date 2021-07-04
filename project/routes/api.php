<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::name('api.')->group(function() {

    Route::prefix('v1')->name('v1.')->group(function() {

        Route::middleware('auth:api')->group(function() {

            Route::resource('users', \App\Http\Controllers\Api\V1\UsersController::class);

            Route::prefix('users/{to_user_id}')->group(function() {

                Route::get('messages', [\App\Http\Controllers\Api\V1\MessageController::class, 'index']);
                Route::post('messages', [\App\Http\Controllers\Api\V1\MessageController::class, 'store']);

            });

        });

    });

});
