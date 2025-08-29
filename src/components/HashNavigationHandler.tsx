'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const HashNavigationHandler = () => {
  const router = useRouter();

  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        // Small delay to ensure the page has rendered
        requestAnimationFrame(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        });
      }
    };

    // Handle initial load with hash
    handleHashNavigation();

    // Handle hash changes
    window.addEventListener('hashchange', handleHashNavigation);

    return () => {
      window.removeEventListener('hashchange', handleHashNavigation);
    };
  }, [router]);

  return null;
};

export default HashNavigationHandler;
