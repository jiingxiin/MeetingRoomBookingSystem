<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Gate;

Route::view('/', 'welcome');
Auth::routes();
Route::get('/login/admin', [LoginController::class, 'showAdminLoginForm']);
Route::get('/login/user', [LoginController::class,'showUserLoginForm']);

Route::get('/register/user', [RegisterController::class,'showUserRegisterForm']);
Route::post('/login/admin', [LoginController::class,'adminLogin']);
Route::post('/login/user', [LoginController::class,'userLogin']);

Route::post('/register/user', [RegisterController::class,'createUser']);
Route::group(['middleware' => 'auth:user'], function () {
 Route::view('/user', 'user');
});
Route::group(['middleware' => 'auth:admin'], function () {
 
 Route::view('/admin', 'admin');
});
Route::get('logout', [LoginController::class,'logout']);
Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');


Route::get('/posts/create', [PostController::class, 'create'])->middleware('can:isUser')->name('post.create');
Route::get('/posts/edit', [PostController::class, 'edit'])->middleware('can:isAdmin')->name('post.edit');
Route::get('/posts/delete', [PostController::class, 'delete'])->middleware('can:isAdmin')->name('post.delete');
Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
