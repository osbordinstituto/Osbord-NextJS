import React from 'react';
import Image from 'next/image';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'María González',
    role: 'Desarrolladora Frontend',
    company: 'TechCorp',
    image: 'https://p2.piqsels.com/preview/375/506/393/female-girl-person-portrait.jpg',
    content: 'Instituto Osbord transformó completamente mi carrera. Los cursos son muy prácticos y los instructores son excelentes. Ahora trabajo en mi empresa soñada.',
    rating: 5
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    role: 'Especialista en Ciencias',
    company: 'Hospital Universitario',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    content: 'La flexibilidad de estudiar a mi ritmo fue clave para completar mi formación. El contenido está muy actualizado y es relevante para el mercado actual.',
    rating: 5
  },
  {
    id: 3,
    name: 'Ana Martínez',
    role: 'Coordinadora Académica',
    company: 'Universidad Central',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    content: 'Los proyectos prácticos me ayudaron a aplicar inmediatamente lo aprendido. Recomiendo Instituto Osbord a cualquiera que quiera crecer profesionalmente.',
    rating: 5
  }
];

const TestimonialsSection = () => {
  return (
    <section id="testimonios" className="py-20 bg-[#16394a]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Lo que dicen nuestros estudiantes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Miles de profesionales han transformado sus carreras con nosotros. 
            Descubre sus historias de éxito.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 relative"
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-[#16394a]/20" />
              
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>

              <p className="text-gray-600 mb-4">&quot;Excelente instituto, profesores muy preparados&quot;</p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                &quot;{testimonial.content}&quot;
              </p>

              <div className="flex items-center">
                <Image
                  src={testimonial.image}
                  alt={`Foto de ${testimonial.name} - Testimonio estudiante Instituto Osbord`}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full object-cover mx-auto mb-4"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">
                    {testimonial.role} en {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
