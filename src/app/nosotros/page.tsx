import Header from '@/components/Header';
import AboutSection from '@/components/AboutSection';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import BreadcrumbsSchema from '@/components/BreadcrumbsSchema';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nosotros - Osbord Instituto | Misión, Visión y Equipo Educativo',
  description: 'Conoce más sobre Osbord Instituto, nuestra misión, visión y el equipo que hace posible la educación de calidad. Líderes en formación profesional y técnica.',
  keywords: 'sobre nosotros, misión, visión, equipo educativo, historia institucional, osbord instituto, educación calidad',
  alternates: {
    canonical: 'https://osbordinstituto.com/nosotros',
  },
  openGraph: {
    title: 'Nosotros - Osbord Instituto',
    description: 'Conoce más sobre Osbord Instituto, nuestra misión, visión y el equipo que hace posible la educación de calidad.',
    url: 'https://osbordinstituto.com/nosotros',
    type: 'website',
    images: [
      {
        url: '/lovable-uploads/99405c30-c5bc-4e02-a9cb-c61088161c76.png',
        width: 1200,
        height: 630,
        alt: 'Equipo Osbord Instituto',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nosotros - Osbord Instituto',
    description: 'Conoce más sobre Osbord Instituto, nuestra misión, visión y equipo educativo.',
    images: ['/lovable-uploads/99405c30-c5bc-4e02-a9cb-c61088161c76.png'],
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

export default function NosotrosPage() {
  return (
    <div className="min-h-screen bg-white">
      <BreadcrumbsSchema />
      <Header />
      <main className="min-h-screen">
        <div className="pt-20">
          {/* Hero Section (match blog spacing/style) */}
          <div className="bg-gradient-to-r from-[#1e5563] to-[#2d7a8a] text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Nosotros</h1>
                <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                  Conoce nuestra misión, visión y el equipo que impulsa la excelencia
                </p>
              </div>
            </div>
          </div>

          {/* Breadcrumbs (exact same container spacing as blog) */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Breadcrumbs items={[{ label: 'Nosotros' }]} />
          </div>
        </div>
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}
