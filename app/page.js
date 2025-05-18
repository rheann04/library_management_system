"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 relative">
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

      {/* Header */}
      <header className="bg-[#1A237E] shadow-md relative z-10">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="text-white text-2xl font-semibold">
            Library Management System
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
                  <Link
                    href="/Login/Admin_Login"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Admin Login
                  </Link>
                  <Link
                    href="/Login/Student_Login"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Student Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Welcome to Your Digital Library
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Discover, borrow, and manage your library resources with ease. Your gateway to knowledge and learning.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/Login/Student_Login"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="/features"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors border border-blue-600"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white/80">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-semibold text-center mb-12">Key Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Digital Catalog</h3>
                <p className="text-gray-600">Browse our extensive collection of books, journals, and digital resources.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Easy Borrowing</h3>
                <p className="text-gray-600">Simple and efficient borrowing process with automatic due date tracking.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Personal Dashboard</h3>
                <p className="text-gray-600">Manage your borrowed books and profile information in one place.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="bg-white/90 rounded-lg shadow-lg p-8">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>
                  <div className="text-gray-600">Books Available</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-blue-600 mb-2">5,000+</div>
                  <div className="text-gray-600">Active Members</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-blue-600 mb-2">1,000+</div>
                  <div className="text-gray-600">Digital Resources</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
                  <div className="text-gray-600">Online Access</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-[#1A237E] text-white">
          <div className="max-w-4xl mx-auto text-center px-6">
            <h2 className="text-3xl font-semibold mb-4">Ready to Get Started?</h2>
            <p className="text-lg mb-8">Join our library community today and unlock a world of knowledge.</p>
            <Link
              href="/signup/student"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors inline-block"
            >
              Create Account
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white py-8 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center text-gray-600">
            <p>© 2025 BSIT 2-4. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 