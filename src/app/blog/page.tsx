import React, { Suspense } from 'react';
import { Metadata } from 'next';
import BlogContent from '../../components/BlogContent';
import BreadcrumbsSchema from '../../components/BreadcrumbsSchema';

export const metadata: Metadata = {
  title: 'Blog - Osbord Instituto | Artículos y Recursos Educativos',
  description: 'Descubre artículos sobre desarrollo web, tecnología educativa, marketing digital y más. Recursos actualizados para tu crecimiento profesional.',
  keywords: 'blog educativo, artículos tecnología, desarrollo web, marketing digital, recursos aprendizaje, tutoriales, guías',
  alternates: {
    canonical: 'https://osbordinstituto.com/blog',
  },
  openGraph: {
    title: 'Blog - Osbord Instituto',
    description: 'Artículos y recursos educativos sobre tecnología, desarrollo web y marketing digital.',
    url: 'https://osbordinstituto.com/blog',
    type: 'website',
    images: [
      {
        url: '/lovable-uploads/7339c3b8-048b-4b3f-b572-26c174eeeefb.png',
        width: 1200,
        height: 630,
        alt: 'Blog Osbord Instituto',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Osbord Instituto',
    description: 'Artículos y recursos educativos sobre tecnología y desarrollo profesional.',
    images: ['/lovable-uploads/7339c3b8-048b-4b3f-b572-26c174eeeefb.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function BlogPage() {
  return (
    <>
      <BreadcrumbsSchema />
      <Suspense fallback={<div>Cargando...</div>}>
        <BlogContent />
      </Suspense>
    </>
  );
}
