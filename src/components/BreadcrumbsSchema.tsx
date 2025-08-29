'use client';

import { usePathname } from 'next/navigation';

interface BreadcrumbItem {
  name: string;
  url: string;
}

const BreadcrumbsSchema = () => {
  const pathname = usePathname();
  
  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const breadcrumbs: BreadcrumbItem[] = [
      { name: 'Inicio', url: 'https://osbordinstituto.com' }
    ];
    
    switch (pathname) {
      case '/cursos':
        breadcrumbs.push({ name: 'Cursos', url: 'https://osbordinstituto.com/cursos' });
        break;
      case '/nosotros':
        breadcrumbs.push({ name: 'Nosotros', url: 'https://osbordinstituto.com/nosotros' });
        break;
      case '/contacto':
        breadcrumbs.push({ name: 'Contacto', url: 'https://osbordinstituto.com/contacto' });
        break;
      case '/blog':
        breadcrumbs.push({ name: 'Blog', url: 'https://osbordinstituto.com/blog' });
        break;
      default:
        // Handle blog post pages
        if (pathname.startsWith('/blog/')) {
          breadcrumbs.push({ name: 'Blog', url: 'https://osbordinstituto.com/blog' });
          // Extract post title from pathname if needed
          const slug = pathname.replace('/blog/', '');
          if (slug) {
            breadcrumbs.push({ name: 'Post', url: `https://osbordinstituto.com${pathname}` });
          }
        }
        break;
    }
    
    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();
  
  if (breadcrumbs.length <= 1) return null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  );
};

export default BreadcrumbsSchema;
