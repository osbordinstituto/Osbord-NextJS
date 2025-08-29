import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Award, BookOpen, Target, Globe, Monitor, GraduationCap } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="nosotros" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Nuestra Misión
          </h2>
          <div className="w-24 h-1 bg-[#16394a] mx-auto mb-8"></div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <Image 
              src="/lovable-uploads/99405c30-c5bc-4e02-a9cb-c61088161c76.png" 
              alt="Logo del Instituto Osbord - Educación de calidad" 
              width={128}
              height={128}
              className="w-32 h-32 mx-auto lg:mx-0 mb-6"
              priority
            />
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              El <strong>Instituto Osbord</strong> es una institución educativa de vanguardia ubicada en la ciudad de 
              <strong> Cumaná, Venezuela</strong>, dedicada a formar profesionales con visión global, 
              pensamiento crítico y una sólida preparación académica.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Desde nuestros inicios, hemos mantenido el compromiso de brindar educación de calidad, 
              accesible y moderna, adaptada a los desafíos del mundo actual.
            </p>
          </div>
          <div className="bg-[#16394a]/5 rounded-2xl p-8 transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-2xl font-bold text-[#16394a] mb-4">Nuestra Oferta Académica</h3>
            <p className="text-gray-700 leading-relaxed">
              Con una oferta académica que abarca las áreas de <strong>Ciencias, Humanidades, Medicina, 
              Tecnología</strong> y otras disciplinas clave, buscamos impulsar el talento venezolano a través 
              de herramientas actualizadas, metodologías innovadoras y el acompañamiento constante de un 
              equipo docente altamente calificado.
            </p>
          </div>
        </div>

        {/* Campus Virtual Section */}
        <div className="bg-gradient-to-r from-[#16394a] to-[#16394a]/80 rounded-3xl p-8 lg:p-12 mb-16 text-white transform hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center mb-4">
                <Globe className="h-8 w-8 mr-3" />
                <h3 className="text-2xl font-bold">Campus Virtual de Última Generación</h3>
              </div>
              <p className="text-lg mb-6 opacity-90">
                En Osbord, entendemos que el futuro de la educación es digital. Por eso, hemos desarrollado 
                uno de los campus virtuales más modernos del país, con una plataforma intuitiva, segura y 
                dinámica que permite a nuestros estudiantes:
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm transform hover:scale-105 hover:bg-white/20 transition-all duration-300 hover:-translate-y-1">
                <Monitor className="h-6 w-6 mb-2" />
                <p className="text-sm">Acceder a clases 100% online o semipresenciales</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm transform hover:scale-105 hover:bg-white/20 transition-all duration-300 hover:-translate-y-1">
                <Users className="h-6 w-6 mb-2" />
                <p className="text-sm">Interactuar con docentes y compañeros en tiempo real</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm transform hover:scale-105 hover:bg-white/20 transition-all duration-300 hover:-translate-y-1">
                <BookOpen className="h-6 w-6 mb-2" />
                <p className="text-sm">Descargar materiales y realizar evaluaciones desde cualquier dispositivo</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm transform hover:scale-105 hover:bg-white/20 transition-all duration-300 hover:-translate-y-1">
                <Award className="h-6 w-6 mb-2" />
                <p className="text-sm">Obtener certificados digitales validados</p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <Users className="h-8 w-8 text-[#16394a] mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">Nuestro Equipo</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Contamos con un equipo multidisciplinario conformado por:
            </p>
          </div>
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-xl p-6 transform hover:scale-105 hover:bg-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
              <GraduationCap className="h-8 w-8 text-[#16394a] mb-3 transform hover:rotate-12 transition-transform duration-300" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Innovación
              </h3>
              <p className="text-gray-600 text-sm">En cada área del conocimiento con amplia experiencia profesional</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 transform hover:scale-105 hover:bg-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
              <Monitor className="h-8 w-8 text-[#16394a] mb-3 transform hover:rotate-12 transition-transform duration-300" />
              <h4 className="font-semibold text-gray-900 mb-2">Soporte Técnico</h4>
              <p className="text-gray-600 text-sm">Disponible las 24 horas para resolver cualquier inconveniente</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 sm:col-span-2 transform hover:scale-105 hover:bg-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
              <Users className="h-8 w-8 text-[#16394a] mb-3 transform hover:rotate-12 transition-transform duration-300" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Compromiso Social
              </h3>
              <p className="text-gray-600 text-sm">Que acompañan al estudiante durante toda su trayectoria educativa</p>
            </div>
          </div>
        </div>

        {/* Mission and Vision */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-[#16394a]/5 rounded-2xl p-8 transform hover:scale-105 hover:bg-[#16394a]/10 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="flex items-center mb-4">
              <GraduationCap className="h-8 w-8 text-[#16394a] mr-3 transform hover:rotate-12 transition-transform duration-300" />
              <h3 className="text-2xl font-bold text-[#16394a]">Nuestra Misión</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Formar estudiantes integrales capaces de contribuir con soluciones reales a las necesidades 
              de su entorno, a través de un modelo educativo flexible, innovador y centrado en el 
              desarrollo de competencias.
            </p>
          </div>
          <div className="bg-[#16394a]/5 rounded-2xl p-8 transform hover:scale-105 hover:bg-[#16394a]/10 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="flex items-center mb-4">
              <Globe className="h-8 w-8 text-[#16394a] mr-3 transform hover:rotate-12 transition-transform duration-300" />
              <h3 className="text-2xl font-bold text-[#16394a]">Nuestra Visión</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Convertirnos en un referente educativo a nivel nacional e internacional, integrando 
              tecnología, excelencia académica y compromiso social.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">¿Por qué elegir Osbord?</h3>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-white rounded-xl shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:bg-gradient-to-b hover:from-white hover:to-[#16394a]/5">
            <BookOpen className="h-12 w-12 text-[#16394a] mx-auto mb-4 transform hover:rotate-12 hover:scale-110 transition-all duration-300" />
            <h4 className="font-semibold text-gray-900 mb-2">Amplia Variedad de Cursos</h4>
            <p className="text-gray-600 text-sm">En áreas clave para el desarrollo profesional</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:bg-gradient-to-b hover:from-white hover:to-[#16394a]/5">
            <Globe className="h-12 w-12 text-[#16394a] mx-auto mb-4 transform hover:rotate-12 hover:scale-110 transition-all duration-300" />
            <h4 className="font-semibold text-gray-900 mb-2">Educación Accesible</h4>
            <p className="text-gray-600 text-sm">Desde cualquier parte de Venezuela</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:bg-gradient-to-b hover:from-white hover:to-[#16394a]/5">
            <Monitor className="h-12 w-12 text-[#16394a] mx-auto mb-4 transform hover:rotate-12 hover:scale-110 transition-all duration-300" />
            <h4 className="font-semibold text-gray-900 mb-2">Plataforma Moderna</h4>
            <p className="text-gray-600 text-sm">En constante actualización tecnológica</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:bg-gradient-to-b hover:from-white hover:to-[#16394a]/5">
            <Award className="h-12 w-12 text-[#16394a] mx-auto mb-4 transform hover:rotate-12 hover:scale-110 transition-all duration-300" />
            <h4 className="font-semibold text-gray-900 mb-2">Certificaciones</h4>
            <p className="text-gray-600 text-sm">Con respaldo institucional reconocido</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:bg-gradient-to-b hover:from-white hover:to-[#16394a]/5">
            <Users className="h-12 w-12 text-[#16394a] mx-auto mb-4 transform hover:rotate-12 hover:scale-110 transition-all duration-300" />
            <h4 className="font-semibold text-gray-900 mb-2">Soporte Permanente</h4>
            <p className="text-gray-600 text-sm">Acompañamiento real durante todo el proceso</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:bg-gradient-to-b hover:from-white hover:to-[#16394a]/5">
            <GraduationCap className="h-12 w-12 text-[#16394a] mx-auto mb-4 transform hover:rotate-12 hover:scale-110 transition-all duration-300" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Excelencia Académica
            </h3>
            <p className="text-gray-600 text-sm">Compromiso con la calidad educativa</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
