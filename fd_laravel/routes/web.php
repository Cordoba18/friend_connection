<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PublicationController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\DetailsProfileController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('login');
});


Route::get('login', [LoginController::class, 'login'])->name('login');
Route::post('login/logueo', [LoginController::class, 'logueo'])->name('login.logueo');

Route::get('/home', [PublicationController::class, 'index'])->name('home');
Route::get('home/loading_departaments', [PublicationController::class, 'loading_departaments'])->name('home.loading_departaments');
Route::get('home/loading_citys/{id}', [PublicationController::class, 'loading_citys'])->name('home.loading_citys');
Route::get('home/loading_dates_user', [PublicationController::class, 'loading_dates_user'])->name('home.loading_dates_user');
Route::post('home/save_dates_user', [PublicationController::class, 'save_dates_user'])->name('home.save_dates_user');
Route::post('home/save_publication', [PublicationController::class, 'save_publication'])->name('home.save_publication');
Route::get('home/save_like/{id}', [PublicationController::class, 'save_like'])->name('home.save_like');
Route::get('home/add_likes/{id}', [PublicationController::class, 'add_likes'])->name('home.add_likes');
Route::get('home/getcomments/{id}', [PublicationController::class, 'getcomments'])->name('home.getcomments');
Route::get('home/count_comments/{id}', [PublicationController::class, 'count_comments'])->name('home.count_comments');
Route::post('home/save_comment', [PublicationController::class, 'save_comment'])->name('home.save_comment');
Route::post('home/delete_comment', [PublicationController::class, 'delete_comment'])->name('home.delete_comment');


Route::get('/home/details/{id}', [DetailsProfileController::class, 'index'])->name('home.details');
Route::post('home/details/delete_comment_details', [DetailsProfileController::class, 'delete_comment_details'])->name('home.delete_comment_details');


Route::get('register', [UserController::class, 'register'])->name('register');
Route::post('register/new_user', [UserController::class, 'new_user'])->name('register.new_user');
Route::post('register/validate_email', [UserController::class, 'validate_email'])->name('register.validate_email');
Route::post('delete_user', [UserController::class, 'delete_user'])->name('delete_user');
Route::post('closed_session', [UserController::class, 'closed_session'])->name('closed_session');
