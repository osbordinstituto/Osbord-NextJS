'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Save, Upload, RotateCcw, Plus } from 'lucide-react';
import Link from 'next/link';
import { addCourse } from '@/data/coursesData';

export const CourseCreator = () => {
  const [activeTab, setActiveTab] = useState('form');
  const [saving, setSaving] = useState(false);
  const [courseJsonInput, setCourseJsonInput] = useState('');
  const [importStatus, setImportStatus] = useState<{type: 'success' | 'error', message: string} | null>(null);

  // Form data for manual course creation
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    duration: '',
    students: 0,
    rating: 4.5,
    level: '',
    modules: [] as any[],
    prerequisites: [] as string[],
    detailed_description: '',
    image: ''
  });

  const [newModule, setNewModule] = useState('');
  const [newPrerequisite, setNewPrerequisite] = useState('');

  const getExampleCourseJSON = () => {
    return JSON.stringify({
      "title": "Desarrollo Web Completo con React",
      "category": "Programación",
      "description": "Aprende a crear aplicaciones web modernas con React desde cero",
      "detailed_description": "Un curso completo que te llevará desde los fundamentos de React hasta la creación de aplicaciones web profesionales. Incluye hooks, estado global, routing y mejores prácticas de desarrollo.",
      "price": "$299.99",
      "duration": "40 horas",
      "students": 1250,
      "rating": 4.8,
      "image": "https://ejemplo.com/imagen-curso-react.jpg",
      "prerequisites": [
        "Conocimientos básicos de HTML y CSS",
        "Fundamentos de JavaScript ES6+",
        "Experiencia con herramientas de desarrollo web"
      ],
      "modules": [
        {
          "title": "Introducción a React",
          "description": "Fundamentos básicos de React y JSX",
          "duration": "8 horas",
          "lessons": [
            {
              "title": "¿Qué es React?",
              "description": "Introducción a la librería React y su ecosistema",
              "type": "leccion",
              "duration": "45 min"
            },
            {
              "title": "Instalación y configuración",
              "description": "Configurar el entorno de desarrollo con Create React App",
              "type": "leccion",
              "duration": "60 min"
            },
            {
              "title": "JSX y elementos React",
              "description": "Sintaxis JSX y creación de elementos",
              "type": "leccion",
              "duration": "75 min"
            },
            {
              "title": "Evaluación inicial",
              "description": "Prueba de conocimientos básicos de React",
              "type": "examen",
              "duration": "30 min"
            }
          ]
        },
        {
          "title": "Componentes y Props",
          "description": "Creación y uso de componentes React",
          "duration": "12 horas",
          "lessons": [
            {
              "title": "Componentes funcionales",
              "description": "Crear componentes con funciones y arrow functions",
              "type": "leccion",
              "duration": "90 min"
            },
            {
              "title": "Props y comunicación",
              "description": "Pasar datos entre componentes padre e hijo",
              "type": "leccion",
              "duration": "120 min"
            },
            {
              "title": "Composición de componentes",
              "description": "Técnicas avanzadas de composición",
              "type": "leccion",
              "duration": "105 min"
            },
            {
              "title": "Práctica de componentes",
              "description": "Ejercicios prácticos con componentes y props",
              "type": "examen",
              "duration": "90 min"
            }
          ]
        },
        {
          "title": "Estado y Hooks",
          "description": "Manejo del estado con useState y useEffect",
          "duration": "15 horas",
          "lessons": [
            {
              "title": "Hook useState",
              "description": "Manejo del estado local en componentes funcionales",
              "type": "leccion",
              "duration": "120 min"
            },
            {
              "title": "Hook useEffect",
              "description": "Efectos secundarios y ciclo de vida",
              "type": "leccion",
              "duration": "135 min"
            },
            {
              "title": "Hooks personalizados",
              "description": "Crear y usar hooks personalizados",
              "type": "leccion",
              "duration": "90 min"
            },
            {
              "title": "Proyecto práctico",
              "description": "Aplicación completa usando hooks",
              "type": "examen",
              "duration": "180 min"
            }
          ]
        },
        {
          "title": "Evaluación Final",
          "description": "Proyecto integrador del curso",
          "duration": "5 horas",
          "lessons": [
            {
              "title": "Proyecto final",
              "description": "Desarrollo de una aplicación web completa con React",
              "type": "examen",
              "duration": "300 min"
            }
          ]
        }
      ]
    }, null, 2);
  };

  const resetToExampleJSON = () => {
    setCourseJsonInput(getExampleCourseJSON());
    setImportStatus(null);
  };

  const handleImportCourse = async () => {
    try {
      setImportStatus(null);
      const courseData = JSON.parse(courseJsonInput);
      
      // Validate required fields
      if (!courseData.title || !courseData.description || !courseData.category) {
        setImportStatus({
          type: 'error',
          message: 'El JSON debe contener al menos: title, description y category'
        });
        return;
      }

      setSaving(true);
      const result = await addCourse(courseData);
      
      if (result) {
        setImportStatus({
          type: 'success',
          message: 'Curso importado exitosamente'
        });
        setCourseJsonInput(getExampleCourseJSON()); // Reset to example
      } else {
        setImportStatus({
          type: 'error',
          message: 'Error al importar el curso'
        });
      }
    } catch (error) {
      console.error('Error parsing JSON:', error);
      setImportStatus({
        type: 'error',
        message: 'JSON inválido. Verifica la sintaxis.'
      });
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addModule = () => {
    if (newModule.trim() && !formData.modules.includes(newModule.trim())) {
      setFormData(prev => ({
        ...prev,
        modules: [...prev.modules, newModule.trim()]
      }));
      setNewModule('');
    }
  };

  const removeModule = (moduleToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      modules: prev.modules.filter(module => module !== moduleToRemove)
    }));
  };

  const addPrerequisite = () => {
    if (newPrerequisite.trim() && !formData.prerequisites.includes(newPrerequisite.trim())) {
      setFormData(prev => ({
        ...prev,
        prerequisites: [...prev.prerequisites, newPrerequisite.trim()]
      }));
      setNewPrerequisite('');
    }
  };

  const removePrerequisite = (prerequisiteToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      prerequisites: prev.prerequisites.filter(prerequisite => prerequisite !== prerequisiteToRemove)
    }));
  };

  const handleSaveForm = async () => {
    try {
      if (!formData.title || !formData.description || !formData.category) {
        toast.error('Por favor completa todos los campos requeridos');
        return;
      }

      setSaving(true);
      const result = await addCourse(formData);
      
      if (result) {
        toast.success('Curso creado exitosamente');
        // Reset form
        setFormData({
          title: '',
          description: '',
          category: '',
          price: '',
          duration: '',
          students: 0,
          rating: 4.5,
          level: '',
          modules: [],
          prerequisites: [],
          detailed_description: '',
          image: ''
        });
      } else {
        toast.error('Error al crear el curso');
      }
    } catch (error) {
      console.error('Error saving course:', error);
      toast.error('Error al guardar el curso');
    } finally {
      setSaving(false);
    }
  };

  // Initialize JSON input with example on component mount
  React.useEffect(() => {
    setCourseJsonInput(getExampleCourseJSON());
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link 
                href="/admin"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5" />
                Volver al Admin
              </Link>
              <h1 className="text-xl font-semibold">Crear Curso</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="form">Formulario</TabsTrigger>
            <TabsTrigger value="json-import">
              <Upload className="w-4 h-4 mr-2" />
              Crear Curso con JSON
            </TabsTrigger>
          </TabsList>

          <TabsContent value="form" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Información del Curso</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="title">Título *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="Nombre del curso"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Descripción *</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="Descripción breve del curso"
                        rows={3}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="detailed_description">Descripción Detallada</Label>
                      <Textarea
                        id="detailed_description"
                        value={formData.detailed_description}
                        onChange={(e) => handleInputChange('detailed_description', e.target.value)}
                        placeholder="Descripción completa del curso"
                        rows={5}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="image">URL de Imagen</Label>
                      <Input
                        id="image"
                        value={formData.image}
                        onChange={(e) => handleInputChange('image', e.target.value)}
                        placeholder="https://ejemplo.com/imagen.jpg"
                        className="mt-1"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Módulos del Curso</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2 mb-3">
                      <Input
                        value={newModule}
                        onChange={(e) => setNewModule(e.target.value)}
                        placeholder="Nuevo módulo"
                        onKeyPress={(e) => e.key === 'Enter' && addModule()}
                      />
                      <Button onClick={addModule} size="sm">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      {formData.modules.map((module, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                          <span>{module}</span>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => removeModule(module)}
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Prerequisitos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2 mb-3">
                      <Input
                        value={newPrerequisite}
                        onChange={(e) => setNewPrerequisite(e.target.value)}
                        placeholder="Nuevo prerequisito"
                        onKeyPress={(e) => e.key === 'Enter' && addPrerequisite()}
                      />
                      <Button onClick={addPrerequisite} size="sm">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      {formData.prerequisites.map((prerequisite, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                          <span>{prerequisite}</span>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => removePrerequisite(prerequisite)}
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Configuración</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="category">Categoría *</Label>
                      <Input
                        id="category"
                        value={formData.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        placeholder="Tecnología, Marketing, etc."
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="price">Precio</Label>
                      <Input
                        id="price"
                        value={formData.price}
                        onChange={(e) => handleInputChange('price', e.target.value)}
                        placeholder="$199"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="duration">Duración</Label>
                      <Input
                        id="duration"
                        value={formData.duration}
                        onChange={(e) => handleInputChange('duration', e.target.value)}
                        placeholder="12 semanas"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="level">Nivel</Label>
                      <Input
                        id="level"
                        value={formData.level}
                        onChange={(e) => handleInputChange('level', e.target.value)}
                        placeholder="Principiante, Intermedio, Avanzado"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="students">Número de Estudiantes</Label>
                      <Input
                        id="students"
                        type="number"
                        value={formData.students}
                        onChange={(e) => handleInputChange('students', parseInt(e.target.value) || 0)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="rating">Calificación (1-5)</Label>
                      <Input
                        id="rating"
                        type="number"
                        step="0.1"
                        min="1"
                        max="5"
                        value={formData.rating}
                        onChange={(e) => handleInputChange('rating', parseFloat(e.target.value) || 4.5)}
                        className="mt-1"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Button 
                  onClick={handleSaveForm}
                  disabled={saving}
                  className="w-full bg-[#1e5563] hover:bg-[#1e5563]/90"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? 'Guardando...' : 'Crear Curso'}
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="json-import" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Importar Curso desde JSON</CardTitle>
                <p className="text-sm text-gray-600">
                  Pega aquí el JSON del curso que deseas importar. Asegúrate de incluir todos los campos requeridos.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="courseJson">JSON del Curso</Label>
                  <Textarea
                    id="courseJson"
                    value={courseJsonInput}
                    onChange={(e) => setCourseJsonInput(e.target.value)}
                    className="w-full h-96 p-3 border border-gray-300 rounded-md font-mono text-sm mt-1"
                    placeholder="Pega aquí el JSON del curso..."
                  />
                </div>
                
                <div className="text-xs text-gray-500 space-y-1">
                  <p><strong>Campos requeridos:</strong></p>
                  <ul className="list-disc list-inside ml-2 space-y-1">
                    <li><code>title</code> - Título del curso</li>
                    <li><code>description</code> - Descripción breve</li>
                    <li><code>category</code> - Categoría del curso</li>
                    <li><code>price</code> - Precio (ej: "$199")</li>
                    <li><code>duration</code> - Duración (ej: "12 semanas")</li>
                    <li><code>level</code> - Nivel (ej: "Principiante")</li>
                  </ul>
                  <p><strong>Campos opcionales:</strong> students, rating, modules, prerequisites, detailed_description, image</p>
                </div>

                <div className="flex gap-3">
                  <Button 
                    onClick={handleImportCourse}
                    disabled={!courseJsonInput.trim() || saving}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    {saving ? 'Importando...' : 'Importar Curso'}
                  </Button>
                  <Button 
                    onClick={resetToExampleJSON}
                    variant="outline"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Ejemplo JSON
                  </Button>
                </div>

                {importStatus && (
                  <div className={`p-3 rounded-md ${
                    importStatus.type === 'success' 
                      ? 'bg-green-50 text-green-800 border border-green-200' 
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}>
                    {importStatus.message}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
