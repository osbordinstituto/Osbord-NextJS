import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className="flex items-center space-x-1 text-sm text-gray-600 mb-2" aria-label="Breadcrumb">
      <Link 
        href="/" 
        className="flex items-center hover:text-[#1e5563] transition-colors"
        aria-label="Inicio"
      >
        <Home className="h-4 w-4" />
        <span className="sr-only">Inicio</span>
      </Link>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          {item.href && index < items.length - 1 ? (
            <Link 
              href={item.href} 
              className="hover:text-[#1e5563] transition-colors"
              aria-current={index === items.length - 1 ? "page" : undefined}
            >
              {item.label}
            </Link>
          ) : (
            <span 
              className="text-gray-900 font-medium"
              aria-current="page"
            >
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
