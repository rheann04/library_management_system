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

      <div className="py-2">
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg flex items-center space-x-2"
        >
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
} 