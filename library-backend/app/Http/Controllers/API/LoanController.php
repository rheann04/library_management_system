<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Loan;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class LoanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $loans = Loan::with(['user', 'book'])->get();
        return response()->json($loans);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'book_id' => 'required|exists:books,id',
            'issue_date' => 'required|date',
            'due_date' => 'required|date|after:issue_date',
            'notes' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Check if book is available
        $book = Book::find($request->book_id);
        if (!$book || $book->status !== 'available' || $book->quantity < 1) {
            return response()->json(['error' => 'Book is not available for loan'], 422);
        }

        // Create loan
        $loan = Loan::create([
            'user_id' => auth()->id(),
            'book_id' => $request->book_id,
            'issue_date' => $request->issue_date,
            'due_date' => $request->due_date,
            'status' => 'borrowed',
            'notes' => $request->notes
        ]);

        // Update book status if last copy
        if ($book->quantity <= 1) {
            $book->update(['status' => 'unavailable']);
        }
        $book->decrement('quantity');

        return response()->json($loan->load(['user', 'book']), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Loan $loan): JsonResponse
    {
        return response()->json($loan->load(['user', 'book']));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Loan $loan): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'due_date' => 'date|after:issue_date',
            'notes' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $loan->update($request->only(['due_date', 'notes']));
        return response()->json($loan);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Loan $loan): JsonResponse
    {
        // Only allow deletion if book is returned
        if ($loan->status === 'borrowed') {
            return response()->json(['error' => 'Cannot delete active loan'], 422);
        }

        $loan->delete();
        return response()->json(null, 204);
    }

    public function returnBook(Loan $loan): JsonResponse
    {
        if ($loan->status !== 'borrowed') {
            return response()->json(['error' => 'Book is already returned'], 422);
        }

        $loan->update([
            'return_date' => Carbon::now(),
            'status' => 'returned'
        ]);

        // Update book availability
        $book = $loan->book;
        $book->increment('quantity');
        if ($book->status === 'unavailable') {
            $book->update(['status' => 'available']);
        }

        return response()->json($loan->load(['user', 'book']));
    }

    public function overdue(): JsonResponse
    {
        $overdueLoans = Loan::where('status', 'borrowed')
            ->where('due_date', '<', Carbon::now())
            ->with(['user', 'book'])
            ->get();

        return response()->json($overdueLoans);
    }
}
