import Header from '@/components/Header';
import ContactSection from '@/components/ContactSection';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import BreadcrumbsSchema from '@/components/BreadcrumbsSchema';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacto - Osbord Instituto | Soporte y Atención al Cliente',
  description: 'Ponte en contacto con nosotros. Estamos aquí para resolver tus dudas y ayudarte en tu proceso de aprendizaje. Soporte especializado 24/7.',
  keywords: 'contacto, soporte, ayuda, consultas, información, atención al cliente, osbord instituto, asistencia técnica',
  alternates: {
    canonical: 'https://osbordinstituto.com/contacto',
  },
  openGraph: {
    title: 'Contacto - Osbord Instituto',
    description: 'Ponte en contacto con nosotros. Estamos aquí para resolver tus dudas y ayudarte en tu proceso de aprendizaje.',
    url: 'https://osbordinstituto.com/contacto',
    type: 'website',
    images: [
      {
        url: '/lovable-uploads/1199af8c-b8b2-48bb-8f98-2930a995849c.png',
        width: 1200,
        height: 630,
        alt: 'Contacto Osbord Instituto',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contacto - Osbord Instituto',
    description: 'Ponte en contacto con nosotros. Soporte especializado para estudiantes.',
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

export default function ContactoPage() {
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
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Contacto</h1>
                <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                  Estamos aquí para ayudarte y responder tus inquietudes
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Breadcrumbs items={[{ label: 'Contacto' }]} />
          </div>
        </div>
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
