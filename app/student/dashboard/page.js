"use client";

import { useState, useEffect } from 'react';
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
  const [borrowSuccess, setBorrowSuccess] = useState(false);
  const [borrowError, setBorrowError] = useState('');

  // Sample books data
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      isbn: "9780743273565",
      genre: "Classic",
      status: "Available",
      copies: 3,
      publisher: "Scribner",
      publishedYear: "1925",
      description: "A novel set in the Roaring Twenties."
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      isbn: "9780061120084",
      genre: "Classic",
      status: "Borrowed",
      copies: 2,
      publisher: "J.B. Lippincott & Co.",
      publishedYear: "1960",
      description: "A story of racial injustice in the Deep South."
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      isbn: "9780451524935",
      genre: "Dystopian",
      status: "Available",
      copies: 4,
      publisher: "Secker & Warburg",
      publishedYear: "1949",
      description: "A dystopian novel about totalitarianism."
    },
    {
      id: 4,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      isbn: "9780141439518",
      genre: "Romance",
      status: "Available",
      copies: 5,
      publisher: "T. Egerton",
      publishedYear: "1813",
      description: "A classic romance novel."
    },
    {
      id: 5,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      isbn: "9780547928227",
      genre: "Fantasy",
      status: "Borrowed",
      copies: 1,
      publisher: "George Allen & Unwin",
      publishedYear: "1937",
      description: "A fantasy adventure novel."
    },
    {
      id: 6,
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      isbn: "9780316769488",
      genre: "Fiction",
      status: "Available",
      copies: 2,
      publisher: "Little, Brown and Company",
      publishedYear: "1951",
      description: "A classic coming-of-age story."
    },
    {
      id: 7,
      title: "Lord of the Flies",
      author: "William Golding",
      isbn: "9780399501487",
      genre: "Fiction",
      status: "Available",
      copies: 3,
      publisher: "Faber and Faber",
      publishedYear: "1954",
      description: "A novel about the dark side of human nature."
    },
    {
      id: 8,
      title: "The Alchemist",
      author: "Paulo Coelho",
      isbn: "9780062315007",
      genre: "Fiction",
      status: "Borrowed",
      copies: 2,
      publisher: "HarperOne",
      publishedYear: "1988",
      description: "A philosophical novel about following your dreams."
    },
    {
      id: 9,
      title: "Brave New World",
      author: "Aldous Huxley",
      isbn: "9780060850524",
      genre: "Dystopian",
      status: "Available",
      copies: 3,
      publisher: "Harper Perennial",
      publishedYear: "1932",
      description: "A dystopian social science fiction novel."
    },
    {
      id: 10,
      title: "The Little Prince",
      author: "Antoine de Saint-Exupéry",
      isbn: "9780156013987",
      genre: "Fiction",
      status: "Available",
      copies: 4,
      publisher: "Mariner Books",
      publishedYear: "1943",
      description: "A poetic tale about a young prince's journey."
    }
  ]);

  // Filter books based on search query
  const filteredBooks = books.filter(book => {
    if (!searchQuery.trim()) return true; // Show all books if search is empty
    
    const searchLower = searchQuery.toLowerCase().trim();
    const searchTerms = searchLower.split(' '); // Split search into terms for better matching
    
    return searchTerms.every(term => 
      book.title.toLowerCase().includes(term) ||
      book.author.toLowerCase().includes(term) ||
      book.genre.toLowerCase().includes(term) ||
      book.isbn.toLowerCase().includes(term) ||
      book.publisher.toLowerCase().includes(term) ||
      book.publishedYear.toString().includes(term)
    );
  });

  // Sort filtered books
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    const aValue = a[sortBy].toString().toLowerCase();
    const bValue = b[sortBy].toString().toLowerCase();
    
    if (sortOrder === 'asc') {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });

  // Update pagination calculations to use filtered books
  const totalItems = sortedBooks.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedBooks.slice(indexOfFirstItem, indexOfLastItem);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page when searching
  };

  // Reset search when search query is cleared
  useEffect(() => {
    if (!searchQuery) {
      setCurrentPage(1);
    }
  }, [searchQuery]);

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
    if (book.status === 'Available' && book.copies > 0) {
      // Update the book status and copies
      setBooks(prevBooks => prevBooks.map(b => {
        if (b.id === book.id) {
          return {
            ...b,
            status: 'Borrowed',
            copies: b.copies - 1
          };
        }
        return b;
      }));

      // Show success message
      setBorrowSuccess(true);
      setTimeout(() => setBorrowSuccess(false), 3000);

      // Close the modal
      setIsModalOpen(false);
      setSelectedBook(null);
    } else {
      setBorrowError('Book is not available for borrowing');
      setTimeout(() => setBorrowError(''), 3000);
    }
  };

  const handleSortChange = (e) => {
    const [newSortBy, newSortOrder] = e.target.value.split('-');
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  return (
    <StudentLayout>
      {/* Success Message */}
      {borrowSuccess && (
        <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded z-50">
          <p>Book borrowed successfully!</p>
        </div>
      )}

      {/* Error Message */}
      {borrowError && (
        <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50">
          <p>{borrowError}</p>
        </div>
      )}

      {/* Welcome Modal */}
      {isWelcomeModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-gray-500 opacity-30"></div>
          <div className="p-8 border w-[600px] shadow-lg rounded-lg bg-white z-50">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-[#1A237E] mb-4">BookWise</h2>
              <p className="text-gray-600 text-lg">Browse and borrow books from our collection</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Welcome to the Library Portal</h3>
                <p className="text-gray-700">
                  Here you can explore our extensive collection of books, check their availability, 
                  and request to borrow them. Use the search and filter options to find exactly what you&apos;re looking for.
                </p>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800 mb-2">How to Borrow</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Browse through the available books</li>
                  <li>Click on a book to view its details</li>
                  <li>Click the &quot;Borrow&quot; button if the book is available</li>
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
                      <label className="text-sm text-gray-600">Available Copies:</label>
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
              {selectedBook.status === 'Available' && selectedBook.copies > 0 ? (
                <button
                  onClick={() => handleBorrowRequest(selectedBook)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Borrow Book
                </button>
              ) : (
                <button
                  disabled
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed"
                >
                  Not Available
                </button>
              )}
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedBook(null);
                }}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="p-8">
        <div className="mb-8 text-black flex flex-col items-center">
          <h1 className="text-3xl font-semibold">Library Catalog</h1>
          <p className="text-black">Browse and search available books</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-black">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <form onSubmit={handleSearch} className="flex items-center">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by title, author, genre, ISBN, publisher, or year..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border rounded-l-lg focus:outline-none focus:border-blue-500 text-black w-96"
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

              {/* Clear search button */}
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-gray-500 hover:text-gray-700 px-2 py-1 border rounded"
                >
                  Clear
                </button>
              )}

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
                  <option value="status-asc">Status (Available First)</option>
                  <option value="status-desc">Status (Borrowed First)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Search results count */}
          {searchQuery && (
            <div className="mb-4 text-sm text-gray-600">
              Found {totalItems} {totalItems === 1 ? 'book' : 'books'} matching "{searchQuery}"
            </div>
          )}

          {/* No results message */}
          {searchQuery && totalItems === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No books found matching "{searchQuery}"</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-2 text-blue-600 hover:text-blue-800"
              >
                Clear search
              </button>
            </div>
          )}

          {/* Books table */}
          {(!searchQuery || totalItems > 0) && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Author
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Genre
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Available Copies
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.map((book) => (
                    <tr key={book.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{book.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{book.author}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{book.genre}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          book.status === 'Available'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {book.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{book.copies}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleViewDetails(book)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalItems > 0 && (
            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-gray-700">
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, totalItems)} of {totalItems} entries
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border rounded-md disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border rounded-md disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </StudentLayout>
  );
} 