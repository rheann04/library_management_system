<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $books = Book::with(['author', 'category'])->get();
        return response()->json($books);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'isbn' => 'required|string|unique:books',
            'description' => 'nullable|string',
            'author_id' => 'required|exists:authors,id',
            'category_id' => 'required|exists:categories,id',
            'quantity' => 'required|integer|min:0',
            'location' => 'nullable|string|max:255',
            'status' => 'required|in:available,unavailable'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $book = Book::create($request->all());
        return response()->json($book, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Book $book): JsonResponse
    {
        return response()->json($book->load(['author', 'category']));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Book $book): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => 'string|max:255',
            'isbn' => 'string|unique:books,isbn,' . $book->id,
            'description' => 'nullable|string',
            'author_id' => 'exists:authors,id',
            'category_id' => 'exists:categories,id',
            'quantity' => 'integer|min:0',
            'location' => 'nullable|string|max:255',
            'status' => 'in:available,unavailable'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $book->update($request->all());
        return response()->json($book);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book): JsonResponse
    {
        $book->delete();
        return response()->json(null, 204);
    }
}
