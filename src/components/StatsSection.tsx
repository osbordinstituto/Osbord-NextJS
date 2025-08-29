
import React from 'react';
import { Users, BookOpen, Award, Globe } from 'lucide-react';

const stats = [
  {
    icon: Users,
    number: '144',
    label: 'Estudiantes Graduados',
    description: 'Profesionales que han transformado sus carreras'
  },
  {
    icon: BookOpen,
    number: '3',
    label: 'Cursos Especializados',
    description: 'En múltiples áreas de conocimiento'
  },
  {
    icon: Award,
    number: '95%',
    label: 'Tasa de Empleabilidad',
    description: 'De nuestros graduados encuentran trabajo'
  },
  {
    icon: Globe,
    number: '235',
    label: 'Estudiantes Activos',
    description: 'En nuestra plataforma educativa'
  }
];

const StatsSection = () => {
  return (
    <section className="py-20 bg-[#16394a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Nuestro Impacto en Números
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Formando profesionales exitosos con excelencia académica
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 bg-[#16394a]/80 rounded-full flex items-center justify-center border-2 border-white/20">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="text-4xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-xl font-semibold text-blue-100 mb-2">
                {stat.label}
              </div>
              <div className="text-blue-200 text-sm">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
