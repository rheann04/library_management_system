<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Author;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class AuthorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $authors = Author::with('books')->get();
        return response()->json($authors);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'biography' => 'nullable|string',
            'email' => 'nullable|email|max:255',
            'website' => 'nullable|url|max:255'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $author = Author::create($request->all());
        return response()->json($author, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Author $author): JsonResponse
    {
        return response()->json($author->load('books'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Author $author): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'string|max:255',
            'biography' => 'nullable|string',
            'email' => 'nullable|email|max:255',
            'website' => 'nullable|url|max:255'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $author->update($request->all());
        return response()->json($author);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Author $author): JsonResponse
    {
        $author->delete();
        return response()->json(null, 204);
    }
}
