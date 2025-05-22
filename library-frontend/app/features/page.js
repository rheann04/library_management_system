"use client";

import { useRouter } from "next/navigation";
import Link from 'next/link';
import { useState } from 'react';

export default function Features() {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleAdminLogin = () => {
    router.push('/Login/Admin_Login');
  };

  const handleStudentLogin = () => {
    router.push('/Login/Student_Login');
  };

  return (
    <div className="flex h-screen bg-gray-100 relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/Library.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          opacity: '0.5'
        }}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto relative z-10">
        {/* Top Navigation */}
        <header className="bg-[#1A237E] shadow-md">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="text-white text-2xl font-semibold">
            BookWise
            </div>
          </div>
          {/* Navigation Bar */}
          <nav className="bg-[#2196F3] text-white">
            <div className="flex space-x-8 px-6 py-3">
              <Link href="/" className="hover:text-gray-200 transition-colors">
                Home
              </Link>
              <Link href="/features" className="hover:text-gray-200 transition-colors">
                Features
              </Link>
              {/* Login Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="hover:text-gray-200 transition-colors flex items-center"
                >
                  Login
                  <svg 
                    className={`ml-1 w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <button
                      onClick={handleAdminLogin}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Admin Login
                    </button>
                    <button
                      onClick={handleStudentLogin}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Student Login
                    </button>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <h1 className="text-3xl font-bold mb-6">Features</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Book Management</h2>
              <p className="text-gray-600">Efficiently manage your library's book collection with easy cataloging and organization tools.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Student Records</h2>
              <p className="text-gray-600">Keep track of student borrowing history and manage library memberships.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Borrowing System</h2>
              <p className="text-gray-600">Streamlined borrowing and returning process with automated notifications.</p>
            </div>
          </div>
        </main>

        {/* Footer */}
        <div className="p-4 text-center text-black-600 text-sm opacity-100 relative z-20">
          © 2025 BSIT 2-4
        </div>
      </div>
    </div>
  );
} 