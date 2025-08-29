'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Users, Award } from 'lucide-react';
import { useRouter } from 'next/navigation';

const HeroSection = () => {
  const router = useRouter();

  const handleExploreCourses = () => {
    router.push('/cursos');
  };

  return (
    <section id="inicio" className="pt-16 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Award key={i} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
              <span className="text-gray-600 ml-2">4.9/5 - Más de 235 estudiantes</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Transforma tu futuro con{' '}
              <span className="text-[#1e5563]">educación online</span> de calidad
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              Accede a cursos especializados, certificaciones reconocidas y una comunidad de 
              profesionales que te ayudarán a alcanzar tus metas profesionales.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Button size="lg" className="bg-[#1e5563] hover:bg-[#1e5563]/90 text-white px-8 py-4" onClick={handleExploreCourses}>
                <BookOpen className="mr-2 h-5 w-5" />
                Explorar Cursos
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 text-center lg:text-left">
              <div>
                <div className="text-3xl font-bold text-[#1e5563]">3</div>
                <div className="text-gray-600">Cursos Disponibles</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#1e5563]">235</div>
                <div className="text-gray-600">Estudiantes Activos</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#1e5563]">95%</div>
                <div className="text-gray-600">Tasa de Satisfacción</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Estudiantes del Instituto Osbord estudiando - Educación online de calidad"
                width={800}
                height={500}
                className="w-full h-96 lg:h-[500px] object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4 animate-bounce">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-[#1e5563] rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <div>
                  <div className="text-sm font-semibold">+100 estudiantes</div>
                  <div className="text-xs text-gray-600">conectados hoy</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <div>
                  <div className="text-sm font-semibold">Certificado</div>
                  <div className="text-xs text-gray-600">Reconocido</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
