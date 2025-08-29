'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Smartphone, Download } from 'lucide-react';
import Image from 'next/image';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const AppDownloadSection = () => {
  // INSTRUCCIONES PARA CAMBIAR LAS IMÁGENES:
  // 1. Sube tus imágenes a la carpeta /public/ del proyecto
  // 2. Cambia las rutas en las variables de abajo:
  const ANDROID_IMAGE_URL = "https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg";
  const IOS_IMAGE_URL = "https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg";
  
  // O usa imágenes locales así:
  // const ANDROID_IMAGE_URL = "/images/google-play-badge.png";
  // const IOS_IMAGE_URL = "/images/app-store-badge.png";

  return (
    <section className="py-12 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Descarga nuestra app
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Lleva tu educación contigo. Accede a tus cursos, recursos y contenido desde cualquier lugar con nuestra aplicación móvil.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 max-w-lg mx-auto">
          {/* Android App Store Image */}
          <div className="relative">
            <Dialog>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="block hover:scale-105 transition-transform duration-300 focus:outline-none"
                  aria-label="Descargar en Google Play"
                >
                  <Image
                    src={ANDROID_IMAGE_URL}
                    alt="Descargar en Google Play"
                    width={200}
                    height={60}
                    className="h-14 w-auto"
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
          </div>

          {/* iOS App Store Image with Coming Soon Badge - static, no hover */}
          <div className="relative">
            <div className="opacity-60 cursor-not-allowed transition-none">
              <Image
                src={IOS_IMAGE_URL}
                alt="Descargar en App Store"
                width={200}
                height={60}
                className="h-14 w-auto select-none pointer-events-none"
              />
            </div>
            
            {/* Coming Soon Badge */}
            <Badge 
              variant="secondary" 
              className="absolute -top-2 -right-2 bg-[#1e5563] text-white text-xs px-2 py-1 rounded-full shadow-lg pointer-events-none select-none"
            >
              Próximamente
            </Badge>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-8">
          <div className="flex items-center justify-center space-x-2 text-gray-500 mb-3">
            <Smartphone className="w-5 h-5" />
            <span className="text-sm">Compatible con dispositivos Android e iOS</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-gray-500">
            <Download className="w-5 h-5" />
            <span className="text-sm">Descarga gratuita • Sin anuncios</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownloadSection;
