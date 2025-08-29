'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { getCourses, addCourse, updateCourse, deleteCourse, Course, addCourseUpdateListener } from '@/data/coursesData';
import AdminTabs from '@/components/admin/AdminTabs';
import AdminHeader from '@/components/admin/AdminHeader';

export default function AdminContent() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [activeTab, setActiveTab] = useState('courses');
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState<Partial<Course>>({
    modules: [],
    prerequisites: []
  });

  // Default modules and prerequisites for new courses
  const defaultModules = [
    'Módulo 1: Introducción al tema',
    'Módulo 2: Conceptos fundamentales',
    'Módulo 3: Herramientas básicas',
    'Módulo 4: Práctica inicial',
    'Módulo 5: Desarrollo intermedio',
    'Módulo 6: Técnicas avanzadas',
    'Módulo 7: Casos de estudio',
    'Módulo 8: Proyectos prácticos',
    'Módulo 9: Resolución de problemas',
    'Módulo 10: Optimización',
    'Módulo 11: Mejores prácticas',
    'Módulo 12: Evaluación y testing',
    'Módulo 13: Implementación',
    'Módulo 14: Mantenimiento',
    'Módulo 15: Tendencias actuales',
    'Módulo 16: Casos reales',
    'Módulo 17: Certificación',
    'Módulo 18: Recursos adicionales',
    'Módulo 19: Comunidad y networking',
    'Módulo 20: Proyecto final'
  ];

  const defaultPrerequisites = [
    'Conocimientos básicos de computación',
    'Acceso a una computadora con internet',
    'Motivación para aprender',
    'Dedicación de al menos 2 horas semanales',
    'Capacidad de lectura comprensiva',
    'Habilidades básicas de navegación web',
    'Disposición para realizar ejercicios prácticos',
    'Interés en el área de estudio'
  ];

  useEffect(() => {
    loadCourses();
    
    // Add real-time listener for course updates
    const unsubscribe = addCourseUpdateListener(() => {
      loadCourses();
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const loadCourses = async () => {
    try {
      const coursesData = await getCourses();
      setCourses(coursesData);
    } catch (error) {
      console.error('Error loading courses:', error);
      toast.error('Error al cargar los cursos');
    } finally {
    }
  };

  const handleCreateCourse = () => {
    console.log('handleCreateCourse called');
    setIsCreating(true);
    setEditingCourse(null);
    setActiveTab('create'); // Force switch to create tab
    setFormData({
      title: '',
      description: '',
      price: '',
      duration: '',
      category: '',
      image: '',
      modules: [], // Start with empty modules array, user will create them
      prerequisites: [...defaultPrerequisites],
      rating: 0,
      students: 0,
      detailed_description: ''
    });
    console.log('State updated - isCreating:', true, 'activeTab:', 'create');
  };

  const handleEditCourse = (course: Course) => {
    console.log('handleEditCourse called with course:', course);
    console.log('Course modules before edit:', course.modules);
    
    // Ensure modules are properly converted from JSON strings if needed
    let processedModules = course.modules || [];
    if (Array.isArray(processedModules) && processedModules.length > 0) {
      // Check if modules are JSON strings and parse them
      if (typeof processedModules[0] === 'string' && processedModules[0].startsWith('{')) {
        try {
          const asStrings = processedModules as unknown as string[];
          processedModules = asStrings.map((moduleStr) => JSON.parse(moduleStr));
          console.log('Parsed JSON modules for editing:', processedModules);
        } catch (error) {
          console.error('Error parsing modules for editing:', error);
          processedModules = [];
        }
      }
    }
    
    setEditingCourse(course);
    setIsCreating(true); // Set to true to show the form
    setActiveTab('create'); // Switch to create tab
    setFormData({
      ...course,
      modules: processedModules,
      prerequisites: course.prerequisites || [...defaultPrerequisites]
    });
    console.log('Edit state updated - editingCourse:', course.id, 'activeTab:', 'create', 'isCreating:', true);
    console.log('FormData modules set to:', processedModules);
  };

  const handleSaveCourse = async () => {
    try {
      if (!formData.title || !formData.description || !formData.category) {
        toast.error('Por favor completa todos los campos requeridos');
        return;
      }

      const courseData = {
        ...formData,
        price: formData.price || '',
        rating: Number(formData.rating) || 0,
        students: Number(formData.students) || 0,
        modules: formData.modules || [...defaultModules],
        prerequisites: formData.prerequisites || [...defaultPrerequisites]
      } as Course;

      if (editingCourse) {
        await updateCourse(editingCourse.id, courseData);
        toast.success('Curso actualizado exitosamente');
      } else {
        await addCourse(courseData);
        toast.success('Curso creado exitosamente');
      }

      setEditingCourse(null);
      setIsCreating(false);
      setFormData({ modules: [], prerequisites: [] });
      await loadCourses();
    } catch (error) {
      console.error('Error saving course:', error);
      toast.error('Error al guardar el curso');
    }
  };

  const handleDeleteCourse = async (courseId: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este curso?')) {
      try {
        await deleteCourse(courseId);
        toast.success('Curso eliminado exitosamente');
        await loadCourses();
      } catch (error) {
        console.error('Error deleting course:', error);
        toast.error('Error al eliminar el curso');
      }
    }
  };

  const handleCancel = () => {
    setEditingCourse(null);
    setIsCreating(false);
    setFormData({ modules: [], prerequisites: [] });
  };

  const handleInputChange = (field: keyof Course, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: 'modules' | 'prerequisites', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value.split('\n').filter(item => item.trim() !== '')
    }));
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdminTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          courses={filteredCourses}
          editingCourse={editingCourse}
          isCreating={isCreating}
          formData={formData}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onRefresh={loadCourses}
          onStartCreating={handleCreateCourse}
          onEdit={handleEditCourse}
          onDelete={handleDeleteCourse}
          onInputChange={handleInputChange}
          onArrayChange={handleArrayChange}
          onSave={handleSaveCourse}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}
