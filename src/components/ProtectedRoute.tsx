
'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.email !== 'osbordinstituto@gmail.com')) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#1e5563]"></div>
      </div>
    );
  }

  // Verificar que el usuario sea el admin autorizado
  if (!user || user.email !== 'osbordinstituto@gmail.com') {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
