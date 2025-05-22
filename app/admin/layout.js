"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '../components/AdminLayout';

export default function Layout({ children }) {
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated and is admin
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/Login/Admin_Login');
      return;
    }

    // Verify admin status
    const verifyAdmin = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        
        if (!response.ok || data.role !== 'admin') {
          localStorage.removeItem('token');
          router.push('/Login/Admin_Login');
        }
      } catch (error) {
        console.error('Error verifying admin status:', error);
        localStorage.removeItem('token');
        router.push('/Login/Admin_Login');
      }
    };

    verifyAdmin();
  }, [router]);

  return <AdminLayout>{children}</AdminLayout>;
} 