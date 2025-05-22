"use client";

import { useRouter } from "next/navigation";
import Link from 'next/link';
import { useState } from 'react';

export default function StudentLogin() {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: ''
  });

  const handleAdminLogin = () => {
    router.push('/Login/Admin_Login');
  };

  const handleStudentLogin = () => {
    router.push('/Login/Student_Login');
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch('http://localhost:8000/api/student/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        // Adjust these keys to match your backend expectations
        email: formData.emailOrUsername, // or student_id if your backend expects that
        password: formData.password
      }),
    });
    const data = await res.json();
    if (res.ok) {
      // Login successful
      // You can store a token or user info here if your backend returns it
      router.push('/student/dashboard');
    } else {
      alert(data.message || 'Login failed');
    }
  } catch (err) {
    alert('Network error');
  }
};

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
        <main className="p-6 flex justify-center items-center min-h-[calc(100vh-200px)]">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Student Login</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="emailOrUsername" className="block text-sm font-medium text-gray-700">Email or Username</label>
                <input
                  type="text"
                  id="emailOrUsername"
                  name="emailOrUsername"
                  value={formData.emailOrUsername}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                  placeholder="Enter your email or username"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Sign In
              </button>
              <div className="text-center mt-4">
                <Link 
                  href="/signup/student" 
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Don&apos;t have an account? Create one
                </Link>
              </div>
            </form>
          </div>
        </main>

        {/* Footer */}
        <div className="p-4 text-center text-black-600 text-sm opacity-100 relative z-20 bg-transparent">
          © 2025 BSIT 2-4
        </div>
      </div>
    </div>
  );
} 