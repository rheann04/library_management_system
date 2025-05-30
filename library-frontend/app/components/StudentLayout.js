"use client";

import { useState } from 'react';
import Link from 'next/link';
import StudentDropdown from './StudentDropdown';

export default function StudentLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

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

      {/* Sidebar */}
      <div className={`bg-[#1A237E] text-white w-64 min-h-screen relative z-10 ${isSidebarOpen ? '' : 'hidden'}`}>
        <div className="p-4">
          <h2 className="text-2xl font-semibold mb-6">BookWise</h2>
          <nav className="space-y-2">
            <Link href="/student/dashboard" 
                  className="flex items-center p-3 hover:bg-blue-800 rounded-lg">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Library Books
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto relative z-10">
        {/* Top Navigation */}
        <header className="bg-[#1A237E] shadow-md">
          <div className="flex items-center justify-between px-6 py-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-white hover:text-gray-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Profile Button */}
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 text-white hover:bg-blue-800 px-3 py-2 rounded-md"
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

        {/* Footer */}
        <div className="p-4 text-center text-black-600 text-sm opacity-100 relative z-20 bg-transparent">
          © 2025 BSIT 2-4
        </div>
      </div>
    </div>
  );
} 