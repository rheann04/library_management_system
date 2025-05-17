"use client";

import { useState } from 'react';
import Link from 'next/link';
import StudentDropdown from './StudentDropdown';

export default function StudentLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-[#1A237E] text-white w-64 min-h-screen ${isSidebarOpen ? '' : 'hidden'}`}>
        <div className="p-4">
          <h2 className="text-2xl font-semibold mb-6">Student Portal</h2>
          <nav className="space-y-2">
            <Link href="/student/dashboard" 
                  className="flex items-center p-3 hover:bg-blue-800 rounded-lg">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Dashboard
            </Link>

            {/* Library Accordion */}
            <div>
              <button
                onClick={() => setIsLibraryOpen(!isLibraryOpen)}
                className="w-full flex items-center justify-between p-3 hover:bg-blue-800 rounded-lg"
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Library
                </div>
                <svg
                  className={`w-4 h-4 transition-transform ${isLibraryOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isLibraryOpen && (
                <div className="pl-12 space-y-2">
                  <Link href="/student/borrowed-books" 
                        className="block py-2 hover:text-blue-300">
                    Borrowed Books
                  </Link>
                  <Link href="/student/book-history" 
                        className="block py-2 hover:text-blue-300">
                    Borrowing History
                  </Link>
                  <Link href="/student/fines" 
                        className="block py-2 hover:text-blue-300">
                    Fines & Payments
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        {/* Top Navigation */}
        <header className="bg-white shadow-md">
          <div className="flex items-center justify-between px-6 py-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Profile Button */}
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
            >
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                S
              </div>
              <span className="font-medium">Student</span>
              <svg
                className={`w-4 h-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </header>

        {/* Student Dropdown */}
        <StudentDropdown isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 