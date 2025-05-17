"use client";

import StudentLayout from '../../components/StudentLayout';

export default function BorrowedBooks() {
  // Sample borrowed books data - in a real app, this would come from an API or database
  const borrowedBooks = [
    { 
      id: 1, 
      title: 'To Kill a Mockingbird', 
      author: 'Harper Lee', 
      isbn: '978-0446310789', 
      borrowDate: '2024-05-01', 
      dueDate: '2024-05-15',
      status: 'On Time'
    },
    { 
      id: 2, 
      title: 'The Hobbit', 
      author: 'J.R.R. Tolkien', 
      isbn: '978-0547928227', 
      borrowDate: '2024-05-05', 
      dueDate: '2024-05-19',
      status: 'Due Soon'
    }
  ];

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
      </div>
    </StudentLayout>
  );
} 