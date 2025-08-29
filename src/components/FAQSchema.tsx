import React from 'react';

const FAQSchema: React.FC = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Qué cursos ofrece el Instituto Osbord?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ofrecemos una amplia variedad de cursos en tecnología, desarrollo web, marketing digital, diseño gráfico, administración y más. Todos nuestros cursos están diseñados para el mundo laboral actual."
        }
      },
      {
        "@type": "Question",
        "name": "¿Los cursos son completamente online?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí, todos nuestros cursos son 100% online. Puedes estudiar desde cualquier lugar y a tu propio ritmo, con acceso 24/7 a la plataforma educativa."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué certificación recibo al completar un curso?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Al completar exitosamente cualquier curso, recibes un certificado oficial del Instituto Osbord que valida tus nuevas competencias y conocimientos adquiridos."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuánto tiempo tengo para completar un curso?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "El tiempo de acceso varía según el curso, pero generalmente tienes entre 6 meses a 1 año para completar el programa. Puedes estudiar a tu propio ritmo."
        }
      },
      {
        "@type": "Question",
        "name": "¿Ofrecen soporte durante el curso?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí, ofrecemos soporte completo durante todo el curso. Tienes acceso a instructores expertos, foros de discusión y asistencia técnica cuando la necesites."
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
};

export default FAQSchema;
