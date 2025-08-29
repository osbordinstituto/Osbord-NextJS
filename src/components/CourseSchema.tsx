import React from 'react';
import { Course } from '@/data/coursesData';

interface CourseSchemaProps {
  course: Course;
}

const CourseSchema: React.FC<CourseSchemaProps> = ({ course }) => {
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": course.title,
    "description": course.description,
    "provider": {
      "@type": "Organization",
      "name": "Instituto Osbord",
      "url": "https://institutoosbord.com"
    },
    "courseCode": `OSBORD-${course.id}`,
    "educationalLevel": "Professional",
    "teaches": course.title,
    "coursePrerequisites": "Conocimientos básicos en el área",
    "timeRequired": course.duration,
    "numberOfCredits": course.duration.includes("semanas") ? 
      parseInt(course.duration) * 2 : 
      parseInt(course.duration) || 40,
    "courseMode": "online",
    "availableLanguage": "es",
    "inLanguage": "es",
    "offers": {
      "@type": "Offer",
      "price": typeof course.price === 'string' ? 
        (course.price === "Gratis" ? "0" : course.price.replace(/[^0-9]/g, '') || "0") : "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "validFrom": new Date().toISOString().split('T')[0]
    },
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "online",
      "courseSchedule": {
        "@type": "Schedule",
        "repeatFrequency": "P1W",
        "byDay": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": course.rating || 5,
      "reviewCount": course.students || 0
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": 5,
          "bestRating": 5
        },
        "author": {
          "@type": "Person",
          "name": "Estudiante Instituto Osbord"
        },
        "reviewBody": `Excelente curso de ${course.title}. Muy completo y bien estructurado.`
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
    />
  );
};

export default CourseSchema;
