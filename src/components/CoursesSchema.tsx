'use client';

import { useEffect, useState } from 'react';
import { getCourses } from '@/data/coursesData';
import type { Course } from '@/data/coursesData';

const CoursesSchema = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const loadCourses = async () => {
      const coursesData = await getCourses();
      setCourses(coursesData.slice(0, 8)); // Limit to first 8 courses for performance
    };
    loadCourses();
  }, []);

  if (courses.length === 0) return null;

  const coursesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Cursos Online - Osbord Instituto",
    "description": "Cursos de formación profesional y técnica online",
    "numberOfItems": courses.length,
    "itemListElement": courses.map((course, index) => ({
      "@type": "Course",
      "position": index + 1,
      "name": course.title,
      "description": course.description,
      "provider": {
        "@type": "EducationalOrganization",
        "name": "Osbord Instituto",
        "url": "https://osbordinstituto.com"
      },
      "courseMode": "online",
      "educationalLevel": "professional",
      "teaches": course.category,
      "timeRequired": `P${course.duration}`,
      "offers": {
        "@type": "Offer",
        "price": course.price,
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "validFrom": new Date().toISOString()
      },
      "hasCourseInstance": {
        "@type": "CourseInstance",
        "courseMode": "online",
        "instructor": {
          "@type": "Person",
          "name": "Instructor Especializado"
        }
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(coursesSchema) }}
    />
  );
};

export default CoursesSchema;
