"use client";

import { useState } from 'react';
import StudentLayout from '../../components/StudentLayout';

export default function BorrowedBooks() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Sample borrowed books data - in a real app, this would come from an API or database
  const borrowedBooks = [
    { 
      id: 1, 
      title: 'To Kill a Mockingbird', 
      author: 'Harper Lee', 
      isbn: '978-0446310789', 
      borrowDate: '2024-05-01', 
      dueDate: '2024-05-15',
      status: 'On Time',
      description: 'A gripping, heart-wrenching, and wholly remarkable tale of coming-of-age in a South poisoned by virulent prejudice.',
      publisher: 'Grand Central Publishing',
      publishedYear: '1960',
      genre: 'Fiction, Classic',
      pages: 384,
      language: 'English',
      coverImage: '/mockingbird.jpg'
    },
    { 
      id: 2, 
      title: 'The Hobbit', 
      author: 'J.R.R. Tolkien', 
      isbn: '978-0547928227', 
      borrowDate: '2024-05-05', 
      dueDate: '2024-05-19',
      status: 'Due Soon',
      description: 'A glorious account of a magnificent adventure, filled with suspense and seasoned with a quiet humor that is irresistible.',
      publisher: 'Houghton Mifflin Harcourt',
      publishedYear: '1937',
      genre: 'Fantasy, Fiction',
      pages: 320,
      language: 'English',
      coverImage: '/hobbit.jpg'
    }
  ];

  const handleViewBook = (book) => {
    setSelectedBook(book);
    setIsViewModalOpen(true);
  };

  return (
    <StudentLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-black-900 opacity-100">My Borrowed Books</h1>
          <p className="text-black-600 opacity-100">Track and manage your borrowed books</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left py-3 px-4 font-semibold">Title</th>
                  <th className="text-left py-3 px-4 font-semibold">Author</th>
                  <th className="text-left py-3 px-4 font-semibold">ISBN</th>
                  <th className="text-left py-3 px-4 font-semibold">Borrow Date</th>
                  <th className="text-left py-3 px-4 font-semibold">Due Date</th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                  <th className="text-left py-3 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {borrowedBooks.map((book) => (
                  <tr key={book.id} className="border-t hover:bg-gray-50">
                    <td className="py-3 px-4">{book.title}</td>
                    <td className="py-3 px-4">{book.author}</td>
                    <td className="py-3 px-4">{book.isbn}</td>
                    <td className="py-3 px-4">{book.borrowDate}</td>
                    <td className="py-3 px-4">{book.dueDate}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          book.status === 'On Time'
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
                          className="text-blue-600 hover:text-blue-800"
                          title="View Details"
                          onClick={() => handleViewBook(book)}
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
                        <button 
                          className="text-green-600 hover:text-green-800"
                          title="Return Book"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {borrowedBooks.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-600">You haven't borrowed any books yet.</p>
            </div>
          )}
        </div>

        {/* View Book Modal */}
        {isViewModalOpen && selectedBook && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div 
              className="absolute inset-0 bg-gray-900/50"
              onClick={() => setIsViewModalOpen(false)}
            ></div>
            <div className="bg-white rounded-lg p-6 max-w-3xl w-full relative z-10 mx-4 shadow-xl">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">{selectedBook.title}</h2>
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Book Details in Landscape Format */}
              <div className="space-y-6">
                {/* Main Information */}
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-gray-500">Author</p>
                    <p className="font-medium">{selectedBook.author}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">ISBN</p>
                    <p className="font-medium">{selectedBook.isbn}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Publisher</p>
                    <p className="font-medium">{selectedBook.publisher}</p>
                  </div>
                </div>

                {/* Additional Details */}
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-gray-500">Published Year</p>
                    <p className="font-medium">{selectedBook.publishedYear}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Genre</p>
                    <p className="font-medium">{selectedBook.genre}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Language</p>
                    <p className="font-medium">{selectedBook.language}</p>
                  </div>
                </div>

                {/* Borrowing Information */}
                <div className="grid grid-cols-3 gap-6 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-500">Borrow Date</p>
                    <p className="font-medium">{selectedBook.borrowDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Due Date</p>
                    <p className="font-medium">{selectedBook.dueDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className={`font-medium ${
                      selectedBook.status === 'On Time'
                        ? 'text-green-600'
                        : 'text-yellow-600'
                    }`}>{selectedBook.status}</p>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <p className="text-sm text-gray-500 mb-2">Description</p>
                  <p className="text-gray-700">{selectedBook.description}</p>
                </div>

                {/* Return Button */}
                <div className="flex justify-end">
                  <button 
                    className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Return Book
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </StudentLayout>
  );
} 