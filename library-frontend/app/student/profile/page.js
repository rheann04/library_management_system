"use client";

import { useState } from 'react';
import StudentLayout from '../../components/StudentLayout';

export default function StudentProfile() {
  // Sample student data - in a real app this would come from an API/database
  const student = {
    id: "ST2024001",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phoneNumber: "+1 234-567-8900",
    course: "BSIT",
    yearLevel: "2nd Year",
    section: "2-4",
    borrowedBooks: [
      { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '978-0446310789', borrowDate: '2024-05-01', dueDate: '2024-05-15' },
      { id: 5, title: 'The Hobbit', author: 'J.R.R. Tolkien', isbn: '978-0547928227', borrowDate: '2024-05-05', dueDate: '2024-05-19' }
    ]
  };

  return (
    <StudentLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Student Profile</h1>
        <p className="text-gray-600">View and manage your profile information</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        {/* Personal Information Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Student ID</label>
                <p className="mt-1 text-gray-900">{student.id}</p>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Full Name</label>
                <p className="mt-1 text-gray-900">{student.firstName} {student.lastName}</p>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Email</label>
                <p className="mt-1 text-gray-900">{student.email}</p>
              </div>
            </div>
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Phone Number</label>
                <p className="mt-1 text-gray-900">{student.phoneNumber}</p>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Course</label>
                <p className="mt-1 text-gray-900">{student.course}</p>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Year & Section</label>
                <p className="mt-1 text-gray-900">{student.yearLevel} - {student.section}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Currently Borrowed Books Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Currently Borrowed Books</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left py-3 px-4 font-semibold">Title</th>
                  <th className="text-left py-3 px-4 font-semibold">Author</th>
                  <th className="text-left py-3 px-4 font-semibold">ISBN</th>
                  <th className="text-left py-3 px-4 font-semibold">Borrow Date</th>
                  <th className="text-left py-3 px-4 font-semibold">Due Date</th>
                  <th className="text-left py-3 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {student.borrowedBooks.map((book) => (
                  <tr key={book.id} className="border-t hover:bg-gray-50">
                    <td className="py-3 px-4">{book.title}</td>
                    <td className="py-3 px-4">{book.author}</td>
                    <td className="py-3 px-4">{book.isbn}</td>
                    <td className="py-3 px-4">{book.borrowDate}</td>
                    <td className="py-3 px-4">{book.dueDate}</td>
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
        </div>
      </div>
    </StudentLayout>
  );
} 