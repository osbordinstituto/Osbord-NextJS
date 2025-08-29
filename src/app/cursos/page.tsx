import React, { Suspense } from 'react';
import { Metadata } from 'next';
import CursosContent from '../../components/CursosContent';
import BreadcrumbsSchema from '../../components/BreadcrumbsSchema';

export const metadata: Metadata = {
  title: 'Cursos Online - Osbord Instituto | Formación Profesional y Técnica',
  description: 'Descubre nuestros cursos online de tecnología, desarrollo web, marketing digital, diseño gráfico y más. Certificación oficial y metodología innovadora.',
  keywords: 'cursos online, formación profesional, desarrollo web, marketing digital, diseño gráfico, programación, certificación, educación técnica',
  alternates: {
    canonical: 'https://osbordinstituto.com/cursos',
  },
  openGraph: {
    title: 'Cursos Online - Osbord Instituto',
    description: 'Descubre nuestros cursos online de tecnología, desarrollo web, marketing digital y más.',
    url: 'https://osbordinstituto.com/cursos',
    type: 'website',
    images: [
      {
        url: '/lovable-uploads/1199af8c-b8b2-48bb-8f98-2930a995849c.png',
        width: 1200,
        height: 630,
        alt: 'Cursos Online Osbord Instituto',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cursos Online - Osbord Instituto',
    description: 'Descubre nuestros cursos online de tecnología, desarrollo web, marketing digital y más.',
    images: ['/lovable-uploads/1199af8c-b8b2-48bb-8f98-2930a995849c.png'],
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


export default function CursosPage() {
  return (
    <>
      <BreadcrumbsSchema />
      <Suspense fallback={<div>Cargando...</div>}>
        <CursosContent />
      </Suspense>
    </>
  );
}

