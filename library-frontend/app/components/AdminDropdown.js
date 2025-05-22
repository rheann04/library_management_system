import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDropdown({ isOpen, onClose }) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleLogout = () => {
    // Here you would typically handle logout logic like clearing session/tokens
    // For now, we'll just redirect to the login page
    router.push('/Login/Admin_Login');
  };

  return (
    <div className="absolute right-4 top-16 w-80 bg-white rounded-lg shadow-lg z-50 overflow-hidden">
      <div className="p-4 border-b">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
            A
          </div>
          <div>
            <div className="font-semibold">Admin User</div>
            <div className="text-sm text-gray-500">admin@library.com</div>
          </div>
        </div>
      </div>

      <div className="py-2">
  
        <button 
          onClick={handleLogout}
          className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-gray-100 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </div>
          <span className="text-gray-700">Log Out</span>
        </button>
      </div>

      <div className="p-4 text-xs text-gray-500 border-t">
        <div className="flex flex-wrap gap-x-2">
        </div>
        <div className="mt-2">BookWise © 2024</div>
      </div>
    </div>
  );
} 