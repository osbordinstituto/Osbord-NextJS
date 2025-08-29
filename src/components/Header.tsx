
'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import HeaderLogo from './HeaderLogo';
import HeaderNavigation from './HeaderNavigation';
import HeaderAuthSection from './HeaderAuthSection';
import HeaderMobileMenu from './HeaderMobileMenu';
import AdminLogin from './AdminLogin';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const handleAdminClick = () => {
    if (user) {
      // Si ya está logueado, ir directamente al admin
      router.push('/admin');
    } else {
      // Si no está logueado, mostrar login
      setIsAdminLoginOpen(true);
    }
  };

  const handleNavigation = (path: string) => {
    setIsMenuOpen(false);
    // Use replace instead of push for faster navigation
    router.replace(path);
  };

  const handleAnchorNavigation = (anchor: string) => {
    setIsMenuOpen(false);
    if (window.location.pathname === '/') {
      // Already on home page, just scroll to element
      const element = document.getElementById(anchor);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to home page first, then scroll - use replace for faster navigation
      router.replace(`/#${anchor}`);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <HeaderLogo onNavigate={handleNavigation} />
            
            <HeaderNavigation 
              onNavigation={handleNavigation}
              onAnchorNavigation={handleAnchorNavigation}
            />

            <HeaderAuthSection 
              user={user}
              onSignOut={handleSignOut}
              onAdminClick={handleAdminClick}
            />

            <HeaderMobileMenu
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
              user={user}
              onNavigation={handleNavigation}
              onAnchorNavigation={handleAnchorNavigation}
              onSignOut={handleSignOut}
              onAdminClick={handleAdminClick}
            />
          </div>
        </div>
      </header>

      <AdminLogin 
        isOpen={isAdminLoginOpen} 
        onClose={() => setIsAdminLoginOpen(false)} 
      />
    </>
  );
};

export default Header;
