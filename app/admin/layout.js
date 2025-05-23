"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '../components/AdminLayout';

export default function Layout({ children }) {
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated and is admin
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');
    
    if (!token || userRole !== 'admin') {
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      router.push('/Login/Admin_Login');
      return;
    }
  }, [router]);

  return <AdminLayout>{children}</AdminLayout>;
} 