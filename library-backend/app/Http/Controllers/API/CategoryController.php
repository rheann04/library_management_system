<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $categories = Category::with('books')->get();
        return response()->json($categories);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:categories',
            'description' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $category = Category::create($request->all());
        return response()->json($category, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category): JsonResponse
    {
        return response()->json($category->load('books'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'string|max:255|unique:categories,name,' . $category->id,
            'description' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $category->update($request->all());
        return response()->json($category);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category): JsonResponse
    {
        $category->delete();
        return response()->json(null, 204);
    }
}
