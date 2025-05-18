import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function StudentDropdown({ isOpen, onClose }) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleLogout = () => {
    // Here you would typically handle logout logic like clearing session/tokens
    // For now, we'll just redirect to the login page
    onClose();
    router.push('/Login/Student_Login');
  };

  const handleProfileClick = () => {
    onClose();
    router.push('/student/profile');
  };

  const handleBorrowedBooksClick = () => {
    onClose();
    router.push('/student/borrowed-books');
  };

  return (
    <div className="absolute right-4 top-16 w-80 bg-white rounded-lg shadow-lg z-50 overflow-hidden">
      <div className="p-4 border-b">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
            S
          </div>
          <div>
            <div className="font-semibold">Student User</div>
            <div className="text-sm text-gray-500">student@library.com</div>
          </div>
        </div>
      </div>

      <div className="p-2">
        <button
          onClick={handleProfileClick}
          className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg flex items-center space-x-2"
        >
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span>My Profile</span>
        </button>

        <button
          onClick={handleBorrowedBooksClick}
          className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg flex items-center space-x-2"
        >
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <span>My Borrowed Books</span>
        </button>

        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg flex items-center space-x-2 text-black-600"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
} 