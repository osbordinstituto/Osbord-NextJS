import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, GripVertical, PlayCircle, BookOpen, FileCheck, PenTool } from 'lucide-react';
import { CourseModule, Lesson } from '@/data/coursesData';

interface ModuleLessonEditorProps {
  modules: CourseModule[];
  onChange: (modules: CourseModule[]) => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

const getLessonTypeIcon = (type: Lesson['type']) => {
  switch (type) {
    case 'leccion':
      return <BookOpen className="h-4 w-4 text-blue-600" />;
    case 'examen':
      return <FileCheck className="h-4 w-4 text-red-600" />;
    default:
      return <BookOpen className="h-4 w-4 text-gray-600" />;
  }
};

const ModuleLessonEditor: React.FC<ModuleLessonEditorProps> = ({ modules, onChange }) => {
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

  const addModule = () => {
    const newModule: CourseModule = {
      id: generateId(),
      title: `Módulo ${modules.length + 1}`,
      description: 'Descripción del módulo',
      duration: '2 horas',
      lessons: []
    };
    onChange([...modules, newModule]);
    setExpandedModules(prev => new Set([...prev, newModule.id]));
  };

  const updateModule = (moduleId: string, field: keyof CourseModule, value: string) => {
    const updatedModules = modules.map(module =>
      module.id === moduleId ? { ...module, [field]: value } : module
    );
    onChange(updatedModules);
  };

  const deleteModule = (moduleId: string) => {
    const updatedModules = modules.filter(module => module.id !== moduleId);
    onChange(updatedModules);
    setExpandedModules(prev => {
      const newSet = new Set(prev);
      newSet.delete(moduleId);
      return newSet;
    });
  };

  const addLesson = (moduleId: string) => {
    const lessonTypes = [
      { value: 'leccion', label: 'Lección', icon: BookOpen },
      { value: 'examen', label: 'Examen', icon: FileCheck }
    ];

    const newLesson: Lesson = {
      id: generateId(),
      title: 'Nueva lección',
      duration: '30 min',
      type: 'leccion' as const,
      description: 'Descripción de la lección'
    };

    const updatedModules = modules.map(module =>
      module.id === moduleId
        ? { ...module, lessons: [...(module.lessons || []), newLesson] }
        : module
    );
    onChange(updatedModules);
  };

  const updateLesson = (moduleId: string, lessonId: string, field: keyof Lesson, value: string) => {
    const updatedModules = modules.map(module =>
      module.id === moduleId
        ? {
            ...module,
            lessons: (module.lessons || []).map(lesson =>
              lesson.id === lessonId ? { ...lesson, [field]: value } : lesson
            )
          }
        : module
    );
    onChange(updatedModules);
  };

  const deleteLesson = (moduleId: string, lessonId: string) => {
    const updatedModules = modules.map(module =>
      module.id === moduleId
        ? { ...module, lessons: (module.lessons || []).filter(lesson => lesson.id !== lessonId) }
        : module
    );
    onChange(updatedModules);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Módulos y Lecciones</h3>
        <Button onClick={addModule} size="sm" className="bg-[#1e5563] hover:bg-[#1e5563]/90">
          <Plus className="h-4 w-4 mr-2" />
          Agregar Módulo
        </Button>
      </div>

      {modules.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <p className="text-gray-500 mb-4">No hay módulos creados</p>
            <Button onClick={addModule} className="bg-[#1e5563] hover:bg-[#1e5563]/90">
              <Plus className="h-4 w-4 mr-2" />
              Crear Primer Módulo
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {modules.map((module, moduleIndex) => (
            <Card key={module.id || `module-${moduleIndex}`} className="border-l-4 border-l-[#1e5563]">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <GripVertical className="h-4 w-4 text-gray-400" />
                    <CardTitle className="text-base">Módulo {moduleIndex + 1}</CardTitle>
                    <Badge variant="secondary">{module.lessons?.length || 0} lecciones</Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleModule(module.id)}
                    >
                      {expandedModules.has(module.id) ? 'Contraer' : 'Expandir'}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteModule(module.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Título del módulo</label>
                    <Input
                      value={module.title}
                      onChange={(e) => updateModule(module.id, 'title', e.target.value)}
                      placeholder="Título del módulo"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Duración estimada</label>
                    <Input
                      value={module.duration}
                      onChange={(e) => updateModule(module.id, 'duration', e.target.value)}
                      placeholder="ej: 2 horas"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Descripción del módulo</label>
                  <Textarea
                    value={module.description}
                    onChange={(e) => updateModule(module.id, 'description', e.target.value)}
                    placeholder="Describe qué aprenderán los estudiantes en este módulo"
                    rows={2}
                  />
                </div>

                {expandedModules.has(module.id) && (
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium">Lecciones</h4>
                      <Button
                        onClick={() => addLesson(module.id)}
                        size="sm"
                        variant="outline"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Agregar Lección
                      </Button>
                    </div>

                    {(module.lessons?.length || 0) === 0 ? (
                      <div className="text-center py-4 text-gray-500">
                        <p className="mb-2">No hay lecciones en este módulo</p>
                        <Button
                          onClick={() => addLesson(module.id)}
                          size="sm"
                          variant="outline"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Crear Primera Lección
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {(module.lessons || []).map((lesson, lessonIndex) => (
                          <div
                            key={lesson.id || `lesson-${module.id || moduleIndex}-${lessonIndex}`}
                            className="border rounded-lg p-4 bg-gray-50"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-2">
                                {getLessonTypeIcon(lesson.type)}
                                <span className="font-medium text-sm">
                                  Lección {lessonIndex + 1}
                                </span>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteLesson(module.id, lesson.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                              <div>
                                <label className="text-xs font-medium mb-1 block">Título</label>
                                <Input
                                  value={lesson.title}
                                  onChange={(e) => updateLesson(module.id, lesson.id, 'title', e.target.value)}
                                  placeholder="Título de la lección"
                                />
                              </div>
                              <div>
                                <label className="text-xs font-medium mb-1 block">Duración</label>
                                <Input
                                  value={lesson.duration}
                                  onChange={(e) => updateLesson(module.id, lesson.id, 'duration', e.target.value)}
                                  placeholder="ej: 30 min"
                                />
                              </div>
                              <div>
                                <label className="text-xs font-medium mb-1 block">Tipo</label>
                                <Select
                                  value={lesson.type}
                                  onValueChange={(value) => updateLesson(module.id, lesson.id, 'type', value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="leccion">Lección</SelectItem>
                                    <SelectItem value="examen">Examen</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <div>
                              <label className="text-xs font-medium mb-1 block">Descripción</label>
                              <Textarea
                                value={lesson.description || ''}
                                onChange={(e) => updateLesson(module.id, lesson.id, 'description', e.target.value)}
                                placeholder="Describe el contenido de esta lección"
                                rows={2}
                                className="text-sm"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModuleLessonEditor;
