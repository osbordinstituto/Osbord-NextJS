
import React from 'react';
import { BookOpen, Users, Award, Clock } from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: 'Cursos de Calidad',
    description: 'Contenido actualizado y creado por expertos en cada área de conocimiento.'
  },
  {
    icon: Users,
    title: 'Comunidad Activa',
    description: 'Únete a una comunidad de estudiantes y profesionales comprometidos con el aprendizaje.'
  },
  {
    icon: Award,
    title: 'Certificaciones',
    description: 'Obtén certificados reconocidos que validen tus conocimientos y habilidades.'
  },
  {
    icon: Clock,
    title: 'Flexibilidad',
    description: 'Aprende a tu ritmo, desde cualquier lugar y en cualquier momento.'
  }
];

const FeaturesSection = () => {
  return (
    <section className="pt-10 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            ¿Por qué elegir Instituto Osbord?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ofrecemos una experiencia educativa integral con las mejores herramientas 
            y recursos para tu desarrollo profesional y personal.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1e5563]/10 rounded-full mb-6 group-hover:bg-[#1e5563]/20 transition-colors">
                  <Icon className="h-8 w-8 text-[#1e5563]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
