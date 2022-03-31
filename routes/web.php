<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StatusController;
use App\Http\Controllers\MeetingRoomController;
use App\Http\Controllers\MeetingRoomBookingController;

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

// Route::get('/create', function () {
//     return view('welcome');
// });

// Route::get('/create', [StatusController::class, 'dropDownStatus']);
Route::get('/create', [MeetingRoomBookingController::class, 'passInfo']);
// Route::get('/create', [MeetingRoomBookingController::class, 'dropDownMeetingRoom']);
// Route::get('/create', [MeetingRoomController::class, 'dropDownMeetingRoom']);

Route::get('/admin/home', function () {
    return view('admin-home');
});

Route::get('/user/home', function () {
    return view('user-home');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
