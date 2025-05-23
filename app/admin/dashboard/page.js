"use client";

import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalStudents: 0,
    availableBooks: 0,
    overdueBooks: 0
  });

  // Sample data for recent activity
  const recentActivity = [
    {
      id: 1,
      student: {
        name: 'John Smith',
        studentId: 'STU2024001'
      },
      book: {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald'
      },
      action: 'Borrowed',
      date: '2024-03-15 14:30',
      status: 'active'
    },
    {
      id: 2,
      student: {
        name: 'Emma Johnson',
        studentId: 'STU2024002'
      },
      book: {
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee'
      },
      action: 'Returned',
      date: '2024-03-15 13:15',
      status: 'completed'
    },
    {
      id: 3,
      student: {
        name: 'Michael Brown',
        studentId: 'STU2024003'
      },
      book: {
        title: '1984',
        author: 'George Orwell'
      },
      action: 'Borrowed',
      date: '2024-03-14 16:45',
      status: 'active'
    },
    {
      id: 4,
      student: {
        name: 'Sarah Davis',
        studentId: 'STU2024004'
      },
      book: {
        title: 'Pride and Prejudice',
        author: 'Jane Austen'
      },
      action: 'Returned',
      date: '2024-03-14 11:20',
      status: 'completed'
    },
    {
      id: 5,
      student: {
        name: 'John Smith',
        studentId: 'STU2024001'
      },
      book: {
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien'
      },
      action: 'Borrowed',
      date: '2024-03-13 09:30',
      status: 'active'
    }
  ];

  // Sample data - in a real application, this would come from an API
  const books = [
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
    }
  ];

  const students = [
    {
      _id: '1',
      firstName: 'John',
      lastName: 'Smith',
      username: 'johnsmith',
      email: 'john.smith@university.edu',
      studentId: 'STU2024001',
      phoneNumber: '555-0101',
      booksBorrowed: 2
    },
    {
      _id: '2',
      firstName: 'Emma',
      lastName: 'Johnson',
      username: 'emmaj',
      email: 'emma.j@university.edu',
      studentId: 'STU2024002',
      phoneNumber: '555-0102',
      booksBorrowed: 0
    },
    {
      _id: '3',
      firstName: 'Michael',
      lastName: 'Brown',
      username: 'mbrown',
      email: 'michael.b@university.edu',
      studentId: 'STU2024003',
      phoneNumber: '555-0103',
      booksBorrowed: 3
    },
    {
      _id: '4',
      firstName: 'Sarah',
      lastName: 'Davis',
      username: 'sarahd',
      email: 'sarah.d@university.edu',
      studentId: 'STU2024004',
      phoneNumber: '555-0104',
      booksBorrowed: 1
    }
  ];

  useEffect(() => {
    // Calculate statistics
    const totalBooks = books.length;
    const totalStudents = students.length;
    const availableBooks = books.filter(book => book.status === 'Available').length;
    const overdueBooks = books.filter(book => book.status === 'Borrowed').length;

    setStats({
      totalBooks,
      totalStudents,
      availableBooks,
      overdueBooks
    });
  }, []);

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <div className="mb-8 flex flex-col items-center">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="text-black">Welcome back!, Admin</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Books Card */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Total Books</p>
              <h3 className="text-2xl font-bold">{stats.totalBooks}</h3>
            </div>
            <div className="bg-purple-400 rounded-full p-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
        </div>

        {/* Total Students Card */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Total Students</p>
              <h3 className="text-2xl font-bold">{stats.totalStudents}</h3>
            </div>
            <div className="bg-green-400 rounded-full p-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Available Books Card */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Available Books</p>
              <h3 className="text-2xl font-bold">{stats.availableBooks}</h3>
            </div>
            <div className="bg-blue-400 rounded-full p-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Overdue Books Card */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Borrowed Books</p>
              <h3 className="text-2xl font-bold">{stats.overdueBooks}</h3>
            </div>
            <div className="bg-red-400 rounded-full p-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 text-black">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Recent Activity</h2>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Student</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Book</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Action</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentActivity.map((activity) => (
                <tr key={activity.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="text-sm font-medium text-gray-900">{activity.student.name}</div>
                    <div className="text-sm text-gray-500">{activity.student.studentId}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm font-medium text-gray-900">{activity.book.title}</div>
                    <div className="text-sm text-gray-500">{activity.book.author}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      activity.action === 'Borrowed' 
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {activity.action}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500">
                    {formatDate(activity.date)}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      activity.status === 'active'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {activity.status === 'active' ? 'Active' : 'Completed'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
} 