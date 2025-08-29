import { supabase } from '@/integrations/supabase/client';

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'leccion' | 'examen';
  description?: string;
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  duration: string;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  price: string;
  duration: string;
  students: number;
  rating: number;
  level: string;
  modules: CourseModule[];
  prerequisites: string[];
  detailed_description: string;
}

// Event system for course updates
type CourseUpdateListener = () => void;
let listeners: CourseUpdateListener[] = [];

const notifyListeners = () => {
  listeners.forEach(listener => listener());
};

export const addCourseUpdateListener = (listener: CourseUpdateListener) => {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter(l => l !== listener);
  };
};

// Helper function to convert legacy string modules to CourseModule structure
const convertLegacyModules = (modules: unknown): CourseModule[] => {
  if (!Array.isArray(modules) || modules.length === 0) return [];
  
  // If it's a string array (legacy format - simple titles)
  if (typeof modules[0] === 'string' && !modules[0].startsWith('{')) {
    return (modules as string[]).map((moduleTitle, index) => {
      const cleanTitle = moduleTitle.replace('Módulo ', '').replace(/^\d+:\s*/, '');
      const moduleId = `module-${Date.now()}-${index + 1}`;
      return {
        id: moduleId,
        title: moduleTitle,
        description: `Contenido del ${cleanTitle.toLowerCase()}`,
        duration: '2 horas',
        lessons: [
          {
            id: `lesson-${moduleId}-1`,
            title: `Introducción a ${cleanTitle}`,
            duration: '30 min',
            type: 'leccion' as const,
            description: `Lección introductoria del módulo`
          },
          {
            id: `lesson-${moduleId}-2`,
            title: `Conceptos principales`,
            duration: '45 min',
            type: 'leccion' as const,
            description: `Material de lectura sobre conceptos clave`
          },
          {
            id: `lesson-${moduleId}-3`,
            title: `Ejercicios prácticos`,
            duration: '45 min',
            type: 'examen' as const,
            description: `Actividades prácticas para reforzar el aprendizaje`
          }
        ]
      };
    });
  }
  
  // If it's JSON strings (serialized format from JSON import)
  if (typeof modules[0] === 'string' && modules[0].startsWith('{')) {
    try {
      const asStrings = modules as string[];
      return asStrings.map((moduleStr) => {
        const parsedUnknown: unknown = JSON.parse(moduleStr);
        const parsed = parsedUnknown as Partial<CourseModule> & {
          lessons?: Array<string | Partial<Lesson>>;
          id?: string;
          title?: string;
          description?: string;
          duration?: string;
        };
        
        // Handle old JSON format with lessons as string array
        if (parsed.lessons && Array.isArray(parsed.lessons) && typeof parsed.lessons[0] === 'string') {
          const moduleId = parsed.id || `module-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
          return {
            id: moduleId,
            title: parsed.title,
            description: parsed.description || 'Descripción del módulo',
            duration: parsed.duration || '2 horas',
            lessons: parsed.lessons.map((lessonTitle: string, lessonIndex: number) => ({
              id: `lesson-${moduleId}-${lessonIndex}`,
              title: lessonTitle,
              duration: '30 min',
              type: (lessonIndex % 3 === 2) ? 'examen' as const : 'leccion' as const,
              description: `Contenido de la lección: ${lessonTitle}`
            }))
          };
        }
        
        // Ensure module has a unique ID if already in correct format
        const moduleId = parsed.id || `module-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        return {
          ...parsed,
          id: moduleId,
          lessons: (parsed.lessons || []).map((lesson, lessonIndex: number) => {
            const l = (typeof lesson === 'string'
              ? { title: lesson, duration: '30 min', type: (lessonIndex % 3 === 2) ? 'examen' as const : 'leccion' as const }
              : lesson) as Partial<Lesson>;
            return {
              id: l.id || `lesson-${moduleId}-${lessonIndex}`,
              title: l.title || `Lección ${lessonIndex + 1}`,
              duration: l.duration || '30 min',
              type: l.type || 'leccion',
              description: l.description,
            } satisfies Lesson;
          })
        };
      });
    } catch (error) {
      console.error('Error parsing serialized modules:', error);
      return [];
    }
  }
  
  // If already CourseModule format, return as is
  return modules as CourseModule[];
};

// Obtener cursos desde Supabase
export const getCourses = async (): Promise<Course[]> => {
  try {
    console.log('Fetching courses from Supabase...');
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('id', { ascending: true });
    
    if (error) {
      console.error('Supabase error fetching courses:', error);
      console.error('Error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      return [];
    }
    
    console.log('Raw data from Supabase:', data);
    
    if (!data || data.length === 0) {
      console.log('No courses found in database');
      return [];
    }
    
    // Convert legacy data to new format
    const convertedData = data?.map(course => ({
      ...course,
      modules: convertLegacyModules(course.modules)
    })) || [];
    
    console.log('Courses loaded from database:', convertedData?.length || 0, 'courses');
    console.log('First course sample:', convertedData[0]);
    return convertedData;
  } catch (error) {
    console.error('Unexpected error in getCourses:', error);
    return [];
  }
};

// Helper function to serialize modules for database storage
const serializeModules = (modules: CourseModule[]): string[] => {
  return modules.map(module => JSON.stringify(module));
};

// Agregar un nuevo curso a Supabase
export const addCourse = async (course: Omit<Course, 'id'>): Promise<Course | null> => {
  try {
    const { data, error } = await supabase
      .from('courses')
      .insert([{
        title: course.title,
        description: course.description,
        image: course.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        category: course.category,
        price: course.price || '$0',
        duration: course.duration || '0 semanas',
        students: course.students || 0,
        rating: course.rating || 5.0,
        modules: serializeModules(course.modules || []),
        prerequisites: course.prerequisites || [],
        detailed_description: course.detailed_description || course.description
      }])
      .select()
      .single();

    if (error) {
      console.error('Error adding course:', error);
      return null;
    }

    const convertedData = {
      ...data,
      modules: convertLegacyModules(data.modules)
    };

    console.log('Course added to database:', convertedData.title);
    notifyListeners();
    return convertedData;
  } catch (error) {
    console.error('Error in addCourse:', error);
    return null;
  }
};

// Actualizar un curso en Supabase
export const updateCourse = async (id: number, updatedCourse: Partial<Course>): Promise<Course | null> => {
  try {
    const { data, error } = await supabase
      .from('courses')
      .update({
        title: updatedCourse.title,
        description: updatedCourse.description,
        image: updatedCourse.image,
        category: updatedCourse.category,
        price: updatedCourse.price,
        duration: updatedCourse.duration,
        students: updatedCourse.students,
        rating: updatedCourse.rating,
        modules: updatedCourse.modules ? serializeModules(updatedCourse.modules) : undefined,
        prerequisites: updatedCourse.prerequisites,
        detailed_description: updatedCourse.detailed_description,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating course:', error);
      return null;
    }

    const convertedData = {
      ...data,
      modules: convertLegacyModules(data.modules)
    };

    console.log('Course updated in database:', convertedData.title);
    notifyListeners();
    return convertedData;
  } catch (error) {
    console.error('Error in updateCourse:', error);
    return null;
  }
};

// Eliminar un curso de Supabase
export const deleteCourse = async (id: number): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting course:', error);
      return false;
    }

    console.log('Course deleted from database, ID:', id);
    notifyListeners();
    return true;
  } catch (error) {
    console.error('Error in deleteCourse:', error);
    return false;
  }
};
