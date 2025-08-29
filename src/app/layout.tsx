import type { Metadata } from "next";
import "./globals.css";
import ClientProviders from "./client-providers";
import StructuredData from '@/components/StructuredData';
import FAQSchema from '@/components/FAQSchema';

export const metadata: Metadata = {
  title: "Osbord Instituto - Educación de Calidad",
  description: "Instituto educativo líder en formación profesional y técnica. Ofrecemos cursos especializados con metodología innovadora y profesores expertos.",
  keywords: "educación, instituto, cursos, formación profesional, capacitación, osbord, educación online, certificación",
  authors: [{ name: "Osbord Instituto" }],
  metadataBase: new URL('https://osbordinstituto.com'),
  alternates: {
    canonical: 'https://osbordinstituto.com',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: "Osbord Instituto - Educación de Calidad",
    description: "Instituto educativo líder en formación profesional y técnica. Ofrecemos cursos especializados con metodología innovadora y profesores expertos.",
    type: "website",
    locale: "es_ES",
    url: 'https://osbordinstituto.com',
    siteName: 'Osbord Instituto',
    images: [
      {
        url: '/lovable-uploads/1199af8c-b8b2-48bb-8f98-2930a995849c.png',
        width: 1200,
        height: 630,
        alt: 'Osbord Instituto - Educación de Calidad',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Osbord Instituto - Educación de Calidad",
    description: "Instituto educativo líder en formación profesional y técnica",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <StructuredData />
      </head>
      <body className="min-h-screen bg-white">
        <ClientProviders>
          <FAQSchema />
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
