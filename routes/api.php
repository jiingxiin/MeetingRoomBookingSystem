<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MeetingRoomBookingController;
use App\Http\Controllers\StatusController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('bookings', [MeetingRoomBookingController::class, 'showAll']);
Route::post('booking', [MeetingRoomBookingController::class, 'store']);
Route::get('create', [StatusController::class, 'dropDownStatus']);
Route::put('/bookings/update/{id}', [MeetingRoomBookingController::class, 'update']);
Route::delete('/bookings/delete/{id}', [MeetingRoomBookingController::class, 'delete']);
