"use client";

import { useState } from 'react';
import StudentLayout from '../../components/StudentLayout';

export default function StudentDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(true);

  // Sample books data
  const books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '978-0743273565', status: 'Available', publishedYear: '1925', publisher: 'Scribner', copies: 2, description: 'A story of decadence and excess.', genre: 'Literary Fiction' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '978-0446310789', status: 'Borrowed', publishedYear: '1960', publisher: 'J. B. Lippincott & Co.', copies: 3, description: 'A novel of justice and innocence.', genre: 'Classic Fiction' },
    { id: 3, title: '1984', author: 'George Orwell', isbn: '978-0451524935', status: 'Available', publishedYear: '1949', publisher: 'Secker and Warburg', copies: 4, description: 'A dystopian social science fiction.', genre: 'Science Fiction' },
    { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen', isbn: '978-0141439518', status: 'Available', publishedYear: '1813', publisher: 'T. Egerton, Whitehall', copies: 2, description: 'A romantic novel of manners.', genre: 'Romance' },
    { id: 5, title: 'The Hobbit', author: 'J.R.R. Tolkien', isbn: '978-0547928227', status: 'Borrowed', publishedYear: '1937', publisher: 'George Allen & Unwin', copies: 3, description: 'A fantasy novel.', genre: 'Fantasy' },
  ];

  // Sort books
  const sortedBooks = [...books].sort((a, b) => {
    const aValue = a[sortBy].toString().toLowerCase();
    const bValue = b[sortBy].toString().toLowerCase();
    
    if (sortOrder === 'asc') {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });

  // Pagination calculations
  const totalItems = sortedBooks.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedBooks.slice(indexOfFirstItem, indexOfLastItem);

  const handleSearch = (e) => {
    e.preventDefault();
    // Here you would typically handle the search functionality
    console.log('Searching for:', searchQuery);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const handleViewDetails = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleBorrowRequest = (book) => {
    // Here you would handle borrow request
    console.log('Requesting to borrow:', book);
  };

  const handleSortChange = (e) => {
    const [newSortBy, newSortOrder] = e.target.value.split('-');
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  return (
    <StudentLayout>
      {/* Welcome Modal */}
      {isWelcomeModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-gray-500 opacity-30"></div>
          <div className="p-8 border w-[600px] shadow-lg rounded-lg bg-white z-50">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-[#1A237E] mb-4">Library Books</h2>
              <p className="text-gray-600 text-lg">Browse and borrow books from our collection</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Welcome to the Library Portal</h3>
                <p className="text-gray-700">
                  Here you can explore our extensive collection of books, check their availability, 
                  and request to borrow them. Use the search and filter options to find exactly what you're looking for.
                </p>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800 mb-2">How to Borrow</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Browse through the available books</li>
                  <li>Click on a book to view its details</li>
                  <li>Click the "Borrow" button if the book is available</li>
                  <li>Pick up your book from the library within 24 hours</li>
                </ul>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => setIsWelcomeModalOpen(false)}
                className="px-6 py-2 bg-[#1A237E] text-white rounded-lg hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Book Details Modal */}
      {isModalOpen && selectedBook && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-gray-500 opacity-30"></div>
          <div className="p-6 border w-[750px] shadow-lg rounded-lg bg-white z-50">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Book Details</h2>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-medium mb-2">Basic Information</h3>
                  <div className="space-y-2">
                    <div>
                      <label className="text-sm text-gray-600">Title:</label>
                      <p className="text-gray-900 text-sm">{selectedBook.title}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Author:</label>
                      <p className="text-gray-900 text-sm">{selectedBook.author}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">ISBN:</label>
                      <p className="text-gray-900 text-sm">{selectedBook.isbn}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-medium mb-2">Publishing Details</h3>
                  <div className="space-y-2">
                    <div>
                      <label className="text-sm text-gray-600">Publisher:</label>
                      <p className="text-gray-900 text-sm">{selectedBook.publisher}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Published Year:</label>
                      <p className="text-gray-900 text-sm">{selectedBook.publishedYear}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-medium mb-2">Status Information</h3>
                  <div className="space-y-2">
                    <div>
                      <label className="text-sm text-gray-600">Status:</label>
                      <span
                        className={`ml-2 inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                          selectedBook.status === 'Available'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {selectedBook.status}
                      </span>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Number of Copies:</label>
                      <p className="text-gray-900 text-sm">{selectedBook.copies}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-medium mb-2">Description</h3>
                  <p className="text-gray-700 text-sm">{selectedBook.description}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-gray-200 flex justify-end space-x-3">
              {selectedBook.status === 'Available' && (
                <button
                  onClick={() => handleBorrowRequest(selectedBook)}
                  className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Borrow Book
                </button>
              )}
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-3 py-1.5 text-sm bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-semibold text-black-900 opacity-100">Library Books</h1>
        <p className="text-black-600 opacity-100">Browse and borrow books from our collection</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search books..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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
                <option value="publishedYear-asc">Year (Oldest)</option>
                <option value="publishedYear-desc">Year (Newest)</option>
                <option value="status-asc">Status (Available)</option>
                <option value="status-desc">Status (Borrowed)</option>
              </select>
            </div>
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
                <th className="text-left py-3 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((book) => (
                <tr key={book.id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4">{book.title}</td>
                  <td className="py-3 px-4">{book.author}</td>
                  <td className="py-3 px-4">{book.isbn}</td>
                  <td className="py-3 px-4">{book.genre}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        book.status === 'Available'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {book.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleViewDetails(book)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </button>
                      {book.status === 'Available' && (
                        <button 
                          onClick={() => handleBorrowRequest(book)}
                          className="text-green-600 hover:text-green-800"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="mt-4 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex items-center">
              <span className="text-sm text-gray-700">
                Showing{' '}
                <span className="font-medium">{indexOfFirstItem + 1}</span>
                {' '}-{' '}
                <span className="font-medium">
                  {Math.min(indexOfLastItem, totalItems)}
                </span>{' '}
                of{' '}
                <span className="font-medium">{totalItems}</span>{' '}
                results
              </span>
              <select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="ml-4 rounded-md border border-gray-300 py-1 px-2 text-sm focus:outline-none focus:border-blue-500"
              >
                <option value={5}>5 per page</option>
                <option value={10}>10 per page</option>
                <option value={20}>20 per page</option>
                <option value={50}>50 per page</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ${
                  currentPage === 1
                    ? 'text-gray-400 ring-gray-300 cursor-not-allowed'
                    : 'text-gray-900 ring-gray-300 hover:bg-gray-50'
                }`}
              >
                Previous
              </button>

              <div className="flex items-center space-x-2">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className={`relative inline-flex items-center px-3 py-2 text-sm font-semibold ${
                      currentPage === index + 1
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                    } rounded-md`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ${
                  currentPage === totalPages
                    ? 'text-gray-400 ring-gray-300 cursor-not-allowed'
                    : 'text-gray-900 ring-gray-300 hover:bg-gray-50'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
} 