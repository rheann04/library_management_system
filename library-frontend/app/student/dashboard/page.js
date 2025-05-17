"use client";

import { useState } from 'react';
import StudentLayout from '../../components/StudentLayout';

export default function StudentDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');

  // Sample books data
  const books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '978-0743273565', status: 'Available', publishedYear: '1925', publisher: 'Scribner', copies: 2, description: 'A story of decadence and excess.' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '978-0446310789', status: 'Borrowed', publishedYear: '1960', publisher: 'J. B. Lippincott & Co.', copies: 3, description: 'A novel of justice and innocence.' },
    { id: 3, title: '1984', author: 'George Orwell', isbn: '978-0451524935', status: 'Available', publishedYear: '1949', publisher: 'Secker and Warburg', copies: 4, description: 'A dystopian social science fiction.' },
    { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen', isbn: '978-0141439518', status: 'Available', publishedYear: '1813', publisher: 'T. Egerton, Whitehall', copies: 2, description: 'A romantic novel of manners.' },
    { id: 5, title: 'The Hobbit', author: 'J.R.R. Tolkien', isbn: '978-0547928227', status: 'Borrowed', publishedYear: '1937', publisher: 'George Allen & Unwin', copies: 3, description: 'A fantasy novel.' },
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
    // Here you would handle viewing book details
    console.log('Viewing details for:', book);
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
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Library Books</h1>
        <p className="text-gray-600">Browse and borrow books from our collection</p>
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