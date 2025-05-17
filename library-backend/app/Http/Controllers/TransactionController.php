<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function getRecentActivity()
    {
        $recentActivity = Transaction::with(['student:id,first_name,last_name', 'book:id,title'])
            ->orderBy('transaction_date', 'desc')
            ->take(10)
            ->get()
            ->map(function ($transaction) {
                return [
                    'student' => $transaction->student->first_name . ' ' . $transaction->student->last_name,
                    'book' => $transaction->book->title,
                    'action' => $transaction->action,
                    'date' => $transaction->transaction_date->format('Y-m-d')
                ];
            });

        return response()->json([
            'status' => 'success',
            'data' => $recentActivity
        ]);
    }
} 