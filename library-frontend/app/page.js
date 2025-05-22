"use client";

import { useRouter } from "next/navigation";
import Link from 'next/link';
import { useState } from 'react';
import React from 'react';

export default function Home() {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleAdminLogin = () => {
    router.push('/Login/Admin_Login');
  };

  const handleStudentLogin = () => {
    router.push('/Login/Student_Login');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 relative">
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
      <div className="flex-1 flex flex-col relative z-10">
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
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-green-100"
                    >
                      Admin Login
                    </button>
                    <button
                      onClick={handleStudentLogin}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-green-100"
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
        <main className="flex flex-1 items-center justify-center p-6">
          <HomePage />
        </main>
      </div>

      {/* Footer */}
      <footer className="p-4 text-center text-black-600 text-sm opacity-100 relative z-20 bg-transparent">
        © 2025 BSIT 2-4
      </footer>
    </div>
  );
}

// Extracted component kept here
function HomePage() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-5xl mx-auto">
      {/* Illustration */}
      <img src="/illustration.png" alt="Library Illustration" className="w-96 h-96 object-contain rounded-xl" />
      <div className="flex flex-col gap-6 items-center md:items-start">
        <div className="rounded-2xl px-8 py-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif"><span className="block font-serif">BookWise</span></h1>
        </div>
        <div className="rounded-2xl px-8 py-6 text-center md:text-left">
          <p className="text-xl md:text-2xl font-bold font-sans">is a smart and intuitive Library Management System designed to make organizing, tracking, and accessing books effortless. Whether you're managing a small personal collection or a large institutional library, BookWise helps you stay efficient, informed, and always one step ahead—because a wise library runs on BookWise.</p>
        </div>
      </div>
    </div>
  );
}
