
import React from 'react';
import Link from 'next/link';

interface HeaderNavigationProps {
  onNavigation: (path: string) => void;
  onAnchorNavigation: (anchor: string) => void;
}

const HeaderNavigation: React.FC<HeaderNavigationProps> = ({
  onNavigation,
  onAnchorNavigation
}) => {
  return (
    <nav className="hidden xl:flex items-center space-x-8">
      <Link href="/" className="text-gray-700 hover:text-[#16394a] font-medium transition-colors">
        Inicio
      </Link>
      <Link href="/cursos" className="text-gray-700 hover:text-[#16394a] font-medium transition-colors">
        Cursos
      </Link>
      <Link href="/blog" className="text-gray-700 hover:text-[#16394a] font-medium transition-colors">
        Blog
      </Link>
      <Link href="/nosotros" className="text-gray-700 hover:text-[#16394a] font-medium transition-colors">
        Nosotros
      </Link>
      <button onClick={() => onAnchorNavigation('testimonios')} className="text-gray-700 hover:text-[#16394a] font-medium transition-colors">
        Testimonios
      </button>
      <Link href="/contacto" className="text-gray-700 hover:text-[#16394a] font-medium transition-colors">
        Contacto
      </Link>
    </nav>
  );
};

export default HeaderNavigation;
