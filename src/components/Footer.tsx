'use client';

import React from 'react';
import Image from 'next/image';
import { Mail, MapPin, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

const Footer = () => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
    window.scrollTo(0, 0);
  };

  const handleCategoryNavigation = (category: string) => {
    router.push(`/cursos?category=${encodeURIComponent(category)}`);
    window.scrollTo(0, 0);
  };

  const handleAnchorNavigation = (anchor: string) => {
    router.push('/');
    setTimeout(() => {
      const element = document.getElementById(anchor);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <footer className="bg-gray-900 text-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <Image 
                src="/lovable-uploads/99405c30-c5bc-4e02-a9cb-c61088161c76.png" 
                alt="Logo Instituto Osbord - Educación superior en Cumaná, Venezuela" 
                width={48}
                height={48}
                className="h-12 w-auto mb-4"
                loading="lazy"
              />
              <span className="text-2xl font-bold">Instituto Osbord</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Institución educativa de vanguardia ubicada en Cumaná, Venezuela, 
              dedicada a formar profesionales con visión global y pensamiento crítico.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com/osbord_online" target="_blank" rel="noopener noreferrer">
                <Button size="sm" variant="ghost" className="text-gray-300 hover:text-white p-2 hover:bg-white/10">
                  <Instagram className="h-5 w-5" />
                </Button>
              </a>
            </div>

            {/* Store Badges */}
            <div className="mt-8">
              <h4 className="text-sm font-semibold text-gray-200 mb-3">Descarga la app</h4>
              <div className="flex items-center gap-3">
                {/* Google Play (opens APK modal) */}
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      className="block hover:scale-105 transition-transform duration-300 focus:outline-none"
                      aria-label="Descargar en Google Play"
                    >
                      <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                        alt="Descargar en Google Play"
                        width={160}
                        height={48}
                        className="h-10 w-auto"
                      />
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Descargar APK de Android</DialogTitle>
                      <DialogDescription>
                        Sigue estos pasos para instalar la app en tu dispositivo Android:
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-3 text-sm text-gray-600">
                      <ol className="list-decimal pl-5 space-y-2">
                        <li>Toca el botón "Descargar APK" para obtener el archivo.</li>
                        <li>Si tu dispositivo lo solicita, permite la instalación desde orígenes desconocidos.</li>
                        <li>Abre el archivo descargado y sigue las instrucciones de instalación.</li>
                      </ol>
                      <p className="text-xs text-gray-500">Nota: Puedes revertir el permiso de orígenes desconocidos después de la instalación.</p>
                    </div>
                    <DialogFooter>
                      <Button asChild className="bg-[#1e5563] hover:bg-[#184752]">
                        <a
                          href="https://github.com/osbordinstituto/APP-Android/releases/download/app/application-ef2230fb-b207-42c2-87db-037045f52eaa.1.apk"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Descargar APK
                        </a>
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {/* App Store (coming soon, static) */}
                <div className="relative opacity-70">
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                    alt="Descargar en App Store"
                    width={160}
                    height={48}
                    className="h-10 w-auto select-none pointer-events-none"
                  />
                  <Badge className="absolute -top-2 -right-2 bg-[#1e5563] text-white text-[10px] px-2 py-0.5 rounded-full pointer-events-none select-none">
                    Próximamente
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Áreas de Estudio</h3>
            <ul className="space-y-3">
              <li><button onClick={() => handleCategoryNavigation('Tecnología')} className="text-gray-300 hover:text-white transition-colors">Tecnología</button></li>
              <li><button onClick={() => handleCategoryNavigation('Medicina')} className="text-gray-300 hover:text-white transition-colors">Medicina</button></li>
              <li><button onClick={() => handleCategoryNavigation('Humanidades')} className="text-gray-300 hover:text-white transition-colors">Humanidades</button></li>
              <li><button onClick={() => handleCategoryNavigation('Idiomas')} className="text-gray-300 hover:text-white transition-colors">Idiomas</button></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Instituto</h3>
            <ul className="space-y-3">
              <li><button onClick={() => handleNavigation('/nosotros')} className="text-gray-300 hover:text-white transition-colors">Sobre Nosotros</button></li>
              <li><button onClick={() => handleNavigation('/contacto')} className="text-gray-300 hover:text-white transition-colors">Contacto</button></li>
              <li><button onClick={() => handleAnchorNavigation('testimonios')} className="text-gray-300 hover:text-white transition-colors">Testimonios</button></li>
              <li><button onClick={() => handleNavigation('/')} className="text-gray-300 hover:text-white transition-colors">Campus Virtual</button></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contacto</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-300" />
                <span className="text-gray-300">osbordinstituto@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-gray-300" />
                <span className="text-gray-300">Cumaná, Estado Sucre, Venezuela</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-4 md:mb-0">
              © 2025 Instituto Osbord. Todos los derechos reservados.
            </div>
            <div className="flex space-x-6">
              <button onClick={() => handleNavigation('/terminos')} className="text-gray-400 hover:text-white transition-colors">Términos</button>
              <button onClick={() => handleNavigation('/privacidad')} className="text-gray-400 hover:text-white transition-colors">Privacidad</button>
              <button onClick={() => handleNavigation('/cookies')} className="text-gray-400 hover:text-white transition-colors">Cookies</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
