"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function StudentLogin() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email or username is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        // Add your login logic here
        console.log('Student login attempt:', formData);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        // If successful, redirect to student dashboard
        router.push('/dashboard/student');
      } catch (error) {
        console.error('Login failed:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSignUp = () => {
    router.push('/signup/student');
  };

  const handleForgotPassword = () => {
    router.push('/forgot-password/student');
  };

  return (
    <main 
      className="min-h-screen w-full flex flex-col items-center justify-center relative"
      style={{
        backgroundImage: 'url("/Library.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Login Form */}
      <div className="relative z-10 bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-2xl max-w-md w-full mx-4">
        <h1 className="text-3xl font-bold mb-8 text-center text-[#00A9FF]">
          Student Login
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
              Email or Username
            </label>
            <input
              id="email"
              type="text"
              placeholder="Enter your email or username"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className={`w-full px-4 py-3 rounded-lg bg-white border text-gray-900 focus:ring-2 outline-none transition-all ${
                errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-[#00A9FF] focus:ring-blue-200'
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className={`w-full px-4 py-3 rounded-lg bg-white border text-gray-900 focus:ring-2 outline-none transition-all ${
                errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-[#00A9FF] focus:ring-blue-200'
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div className="text-center">
            <button 
              type="button" 
              onClick={handleForgotPassword}
              className="text-[#00A9FF] hover:underline"
            >
              Forgot Password? Click Here!
            </button>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleSignUp}
              disabled={isLoading}
              className="flex-1 bg-[#00A9FF] text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-all text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sign Up
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-[#00A9FF] text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-all text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-8 text-white text-sm">
        © 2025 BSIT 2-4
      </div>
    </main>
  );
} 