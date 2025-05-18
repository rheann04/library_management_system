<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\BookController;
use App\Http\Controllers\API\AuthorController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\LoanController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // Books
    Route::apiResource('books', BookController::class);
    
    // Authors
    Route::apiResource('authors', AuthorController::class);
    
    // Categories
    Route::apiResource('categories', CategoryController::class);
    
    // Loans
    Route::apiResource('loans', LoanController::class);
    Route::post('/loans/{loan}/return', [LoanController::class, 'returnBook']);
    Route::get('/loans/overdue', [LoanController::class, 'overdue']);
});
