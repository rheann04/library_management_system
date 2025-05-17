<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentAuthController;

// Public routes
Route::post('/students/register', [StudentAuthController::class, 'register']);
Route::post('/students/login', [StudentAuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/students/logout', [StudentAuthController::class, 'logout']);
});

// ... existing code ... 