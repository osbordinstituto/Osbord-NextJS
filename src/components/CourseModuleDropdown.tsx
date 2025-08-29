import React, { useState } from 'react';
import { ChevronDown, ChevronRight, PlayCircle, BookOpen, FileCheck, PenTool, Clock } from 'lucide-react';
import { CourseModule, Lesson } from '@/data/coursesData';

interface CourseModuleDropdownProps {
  modules: CourseModule[];
}

const getLessonIcon = (type: Lesson['type']) => {
  switch (type) {
    case 'leccion':
      return <BookOpen className="h-4 w-4 text-blue-600" />;
    case 'examen':
      return <FileCheck className="h-4 w-4 text-red-600" />;
    default:
      return <BookOpen className="h-4 w-4 text-gray-600" />;
  }
};

const CourseModuleDropdown: React.FC<CourseModuleDropdownProps> = ({ modules }) => {
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());

  const toggleModule = (moduleId: string) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  if (!modules || modules.length === 0) {
    return (
      <div className="text-gray-500 text-sm">
        No hay módulos disponibles para este curso.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold mb-3 text-[#1e5563]">Módulos del curso</h3>
      {modules.map((module, index) => (
        <div key={module.id || `module-${index}`} className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleModule(module.id)}
            className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between text-left"
          >
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                {expandedModules.has(module.id) ? (
                  <ChevronDown className="h-5 w-5 text-gray-600" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-gray-600" />
                )}
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">{module.title}</h4>
                <p className="text-xs text-gray-600">{module.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              <span>{module.duration}</span>
            </div>
          </button>
          
          {expandedModules.has(module.id) && (
            <div className="bg-white border-t border-gray-200">
              <div className="px-4 py-3">
                <h5 className="text-sm font-medium text-gray-700 mb-3">
                  Lecciones ({module.lessons.length})
                </h5>
                <div className="space-y-2">
                  {module.lessons.map((lesson, lessonIndex) => (
                    <div
                      key={lesson.id || `lesson-${module.id || index}-${lessonIndex}`}
                      className="flex items-start space-x-3 p-2 rounded-md hover:bg-gray-50 transition-colors duration-150"
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        {getLessonIcon(lesson.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h6 className="text-xs font-medium text-gray-900 truncate">
                            {lessonIndex + 1}. {lesson.title}
                          </h6>
                          <div className="flex items-center space-x-1 text-xs text-gray-500 ml-2">
                            <Clock className="h-3 w-3" />
                            <span>{lesson.duration}</span>
                          </div>
                        </div>
                        {lesson.description && (
                          <p className="text-xs text-gray-500 mt-1">{lesson.description}</p>
                        )}
                        <div className="mt-1">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            lesson.type === 'leccion' ? 'bg-blue-100 text-blue-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {lesson.type === 'leccion' ? 'Lección' : 'Examen'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CourseModuleDropdown;
