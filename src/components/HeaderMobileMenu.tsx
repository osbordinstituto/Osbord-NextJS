
import React from 'react';
import Link from 'next/link';
import { Menu, X, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { User as SupabaseUser } from '@supabase/supabase-js';
import HeaderEnrollmentDialog from './HeaderEnrollmentDialog';

interface HeaderMobileMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  user: SupabaseUser | null;
  onNavigation: (path: string) => void;
  onAnchorNavigation: (anchor: string) => void;
  onSignOut: () => void;
  onAdminClick: () => void;
}

const HeaderMobileMenu: React.FC<HeaderMobileMenuProps> = ({
  isMenuOpen,
  setIsMenuOpen,
  user,
  onNavigation: _onNavigation,
  onAnchorNavigation,
  onSignOut,
  onAdminClick
}) => {
  const isAdmin = user?.email === 'osbordinstituto@gmail.com';

  const handleAnchorNavigation = (anchor: string) => {
    onAnchorNavigation(anchor);
    setIsMenuOpen(false);
  };

  const handleAdminClick = () => {
    onAdminClick();
    setIsMenuOpen(false);
  };

  const handleSignOut = () => {
    onSignOut();
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="xl:hidden">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {isMenuOpen && (
        <div className="xl:hidden absolute top-full right-0 w-80 bg-white/95 backdrop-blur-sm border-l border-b border-gray-200 shadow-lg z-50">
          <div className="p-4">
            <nav className="flex flex-col space-y-4">
              <Link href="/" onClick={() => { _onNavigation('/'); setIsMenuOpen(false); }} className="text-gray-700 hover:text-[#16394a] font-medium text-right">
                Inicio
              </Link>
              <Link href="/cursos" onClick={() => { _onNavigation('/cursos'); setIsMenuOpen(false); }} className="text-gray-700 hover:text-[#16394a] font-medium text-right">
                Cursos
              </Link>
              <Link href="/blog" onClick={() => { _onNavigation('/blog'); setIsMenuOpen(false); }} className="text-gray-700 hover:text-[#16394a] font-medium text-right">
                Blog
              </Link>
              <Link href="/nosotros" onClick={() => { _onNavigation('/nosotros'); setIsMenuOpen(false); }} className="text-gray-700 hover:text-[#16394a] font-medium text-right">
                Nosotros
              </Link>
              <button onClick={() => handleAnchorNavigation('testimonios')} className="text-gray-700 hover:text-[#16394a] font-medium text-right">
                Testimonios
              </button>
              <Link href="/contacto" onClick={() => { _onNavigation('/contacto'); setIsMenuOpen(false); }} className="text-gray-700 hover:text-[#16394a] font-medium text-right">
                Contacto
              </Link>
              
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                {user ? (
                  <>
                    {isAdmin && (
                      <Button
                        variant="outline"
                        onClick={handleAdminClick}
                        className="w-full hover:bg-[#16394a]/10 border-[#16394a] text-[#16394a]"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Panel Admin
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      onClick={handleSignOut}
                      className="w-full hover:bg-red-50 hover:border-red-200 text-red-600 border-red-200"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Cerrar Sesión
                    </Button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full hover:bg-[#16394a]/10 border-[#16394a] text-[#16394a]"
                      onClick={handleAdminClick}
                    >
                      Directiva
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full hover:bg-[#16394a]/10 border-[#16394a] text-[#16394a]"
                      onClick={() => {
                        window.location.href = 'https://osbordcampus.vercel.app/auth';
                        setIsMenuOpen(false);
                      }}
                    >
                      Campus
                    </Button>
                    <div onClick={(e) => e.stopPropagation()}>
                      <HeaderEnrollmentDialog />
                    </div>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderMobileMenu;
