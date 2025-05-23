"use client";

import React, { useState } from "react";

export default function BooksPage() {
  // Static dummy data for at least 5 books
  const [books, setBooks] = useState([
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", isbn: "9780743273565", genre: "Classic", status: "Available", copies: 3, publisher: "Scribner", publishedYear: "1925", description: "A novel set in the Roaring Twenties." },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", isbn: "9780061120084", genre: "Classic", status: "Borrowed", copies: 2, publisher: "J.B. Lippincott & Co.", publishedYear: "1960", description: "A story of racial injustice in the Deep South." },
    { id: 3, title: "1984", author: "George Orwell", isbn: "9780451524935", genre: "Dystopian", status: "Available", copies: 4, publisher: "Secker & Warburg", publishedYear: "1949", description: "A dystopian novel about totalitarianism." },
    { id: 4, title: "Pride and Prejudice", author: "Jane Austen", isbn: "9780141439518", genre: "Romance", status: "Available", copies: 5, publisher: "T. Egerton", publishedYear: "1813", description: "A classic romance novel." },
    { id: 5, title: "The Hobbit", author: "J.R.R. Tolkien", isbn: "9780547928227", genre: "Fantasy", status: "Borrowed", copies: 1, publisher: "George Allen & Unwin", publishedYear: "1937", description: "A fantasy adventure novel." },
  ]);

  // For search and sort
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");

  // For editing
  const [editBook, setEditBook] = useState(null);

  // Handle book edit
  const handleBookEdit = (book) => setEditBook({ ...book });
  const handleBookEditChange = (e) => setEditBook({ ...editBook, [e.target.name]: e.target.value });
  const handleBookEditSave = () => {
    setBooks(books.map(b => b.id === editBook.id ? editBook : b));
    setEditBook(null);
  };

  // Handle book delete
  const handleBookDelete = (id) => setBooks(books.filter(b => b.id !== id));

  // Search and filter logic
  const filteredBooks = books.filter(book => {
    const q = searchQuery.toLowerCase();
    return (
      book.title.toLowerCase().includes(q) ||
      book.author.toLowerCase().includes(q) ||
      book.isbn.toLowerCase().includes(q) ||
      book.genre.toLowerCase().includes(q)
    );
  });

  // Sort logic
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    if (typeof aValue === 'string') aValue = aValue.toLowerCase();
    if (typeof bValue === 'string') bValue = bValue.toLowerCase();
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    } else {
      return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
    }
  });

  // Handle search submit
  const handleSearch = (e) => {
    e.preventDefault();
    // Filtering is already handled reactively
  };

  // Handle sort change
  const handleSortChange = (e) => {
    const [newSortBy, newSortOrder] = e.target.value.split("-");
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-semibold mb-6">Books Management</h2>
      <div className="bg-white rounded-xl shadow-lg p-6 text-black">
        <div className="flex justify-between items-center mb-6">
            <form onSubmit={handleSearch} className="flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search books..."
                  value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border rounded-l-lg focus:outline-none focus:border-blue-500 text-black w-64"
                />
                <svg
                  className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <button 
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
              >
                Search
              </button>
            </form>
            <div className="flex items-center space-x-2">
              <label htmlFor="sort" className="text-sm font-medium text-gray-700">Sort by:</label>
              <select
                id="sort"
                value={`${sortBy}-${sortOrder}`}
                onChange={handleSortChange}
                className="rounded-md border border-gray-300 py-2 px-3 text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="title-asc">Title (A-Z)</option>
                <option value="title-desc">Title (Z-A)</option>
                <option value="author-asc">Author (A-Z)</option>
                <option value="author-desc">Author (Z-A)</option>
                <option value="genre-asc">Genre (A-Z)</option>
                <option value="genre-desc">Genre (Z-A)</option>
                <option value="copies-asc">Copies (Low to High)</option>
                <option value="copies-desc">Copies (High to Low)</option>
              <option value="status-asc">Status (Available First)</option>
              <option value="status-desc">Status (Borrowed First)</option>
              </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left py-3 px-4 font-semibold">Title</th>
                <th className="text-left py-3 px-4 font-semibold">Author</th>
                <th className="text-left py-3 px-4 font-semibold">ISBN</th>
                <th className="text-left py-3 px-4 font-semibold">Genre</th>
                <th className="text-left py-3 px-4 font-semibold">Status</th>
                <th className="text-left py-3 px-4 font-semibold">Copies</th>
                <th className="text-left py-3 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedBooks.map(book => (
                <tr key={book.id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4">{book.title}</td>
                  <td className="py-3 px-4">{book.author}</td>
                  <td className="py-3 px-4">{book.isbn}</td>
                  <td className="py-3 px-4">{book.genre}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${book.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{book.status}</span>
                  </td>
                  <td className="py-3 px-4">{book.copies}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleBookEdit(book)}
                        className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleBookDelete(book.id)}
                        className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {editBook && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-md">
            <h3 className="text-lg font-bold mb-2">Edit Book</h3>
            <input name="title" value={editBook.title} onChange={handleBookEditChange} className="block mb-2 border w-full px-2 py-1" placeholder="Title" />
            <input name="author" value={editBook.author} onChange={handleBookEditChange} className="block mb-2 border w-full px-2 py-1" placeholder="Author" />
            <input name="isbn" value={editBook.isbn} onChange={handleBookEditChange} className="block mb-2 border w-full px-2 py-1" placeholder="ISBN" />
            <input name="genre" value={editBook.genre} onChange={handleBookEditChange} className="block mb-2 border w-full px-2 py-1" placeholder="Genre" />
            <input name="status" value={editBook.status} onChange={handleBookEditChange} className="block mb-2 border w-full px-2 py-1" placeholder="Status" />
            <input name="copies" value={editBook.copies} onChange={handleBookEditChange} className="block mb-2 border w-full px-2 py-1" placeholder="Copies" type="number" min="1" />
            <input name="publisher" value={editBook.publisher} onChange={handleBookEditChange} className="block mb-2 border w-full px-2 py-1" placeholder="Publisher" />
            <input name="publishedYear" value={editBook.publishedYear} onChange={handleBookEditChange} className="block mb-2 border w-full px-2 py-1" placeholder="Published Year" />
            <textarea name="description" value={editBook.description} onChange={handleBookEditChange} className="block mb-2 border w-full px-2 py-1" placeholder="Description" />
            <div className="mt-2 flex justify-end">
              <button onClick={handleBookEditSave} className="mr-2 bg-green-500 text-white px-4 py-1 rounded">Save</button>
              <button onClick={() => setEditBook(null)} className="bg-gray-300 px-4 py-1 rounded">Cancel</button>
            </div>
          </div>
        </div>
      )}
        </div>
  );
} 