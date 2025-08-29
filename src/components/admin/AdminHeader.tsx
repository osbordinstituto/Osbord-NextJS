'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home, BookOpen, Users, Settings, Menu, X, FileText, Edit } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const AdminHeader = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (path: string) => {
    router.push(path);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-2 sm:px-4 py-2 sm:py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
          <Image 
            src="/lovable-uploads/99405c30-c5bc-4e02-a9cb-c61088161c76.png" 
            alt="Instituto Osbord - Panel de administración" 
            width={32}
            height={32}
            className="h-8 w-auto"
            loading="lazy"
          />
          <div className="min-w-0 flex-1">
            <h1 className="text-sm sm:text-lg md:text-xl font-bold text-gray-900 truncate">Panel Admin</h1>
            <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Instituto Osbord</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleNavigation('/')}
            className="flex items-center space-x-2"
          >
            <Home className="h-4 w-4" />
            <span>Inicio</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleNavigation('/cursos')}
            className="flex items-center space-x-2"
          >
            <BookOpen className="h-4 w-4" />
            <span>Cursos</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleNavigation('/blog')}
            className="flex items-center space-x-2"
          >
            <FileText className="h-4 w-4" />
            <span>Blog</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleNavigation('/nosotros')}
            className="flex items-center space-x-2"
          >
            <Users className="h-4 w-4" />
            <span>Nosotros</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleNavigation('/contacto')}
            className="flex items-center space-x-2"
          >
            <Settings className="h-4 w-4" />
            <span>Contacto</span>
          </Button>
        </nav>

        <div className="flex items-center space-x-1 sm:space-x-2">
          {/* Mobile/Tablet Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1 sm:p-2"
            >
              {isMenuOpen ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
            </Button>
          </div>

          {/* Back to Site Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleNavigation('/')}
            className="flex items-center space-x-1 text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-2 h-8 sm:h-9"
          >
            <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>Volver</span>
          </Button>
        </div>
      </div>

      {/* Mobile/Tablet Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50">
          <nav className="p-4 space-y-2">
            <Button
              variant="ghost"
              onClick={() => handleNavigation('/')}
              className="w-full justify-start"
            >
              <Home className="h-4 w-4 mr-2" />
              Inicio
            </Button>
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              asChild
            >
              <Link href="/admin/blog/create">
                <Edit className="w-4 h-4" />
                Blog
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              asChild
            >
              <Link href="/admin/cursos">
                <BookOpen className="w-4 h-4" />
                Cursos
              </Link>
            </Button>
            <Button
              variant="ghost"
              onClick={() => handleNavigation('/nosotros')}
              className="w-full justify-start"
            >
              <Users className="h-4 w-4 mr-2" />
              Nosotros
            </Button>
            <Button
              variant="ghost"
              onClick={() => handleNavigation('/contacto')}
              className="w-full justify-start"
            >
              <Settings className="h-4 w-4 mr-2" />
              Contacto
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default AdminHeader;
