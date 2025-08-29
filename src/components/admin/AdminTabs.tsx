
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, FileText } from 'lucide-react';
import { Course } from '@/data/coursesData';
import CourseManagement from './CourseManagement';
import CourseForm from './CourseForm';
import BlogManagement from './BlogManagement';
import { useRouter } from 'next/navigation';

interface AdminTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  courses: Course[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
  isCreating: boolean;
  editingCourse: Course | null;
  formData: Partial<Course>;
  onRefresh: () => void;
  onStartCreating: () => void;
  onEdit: (course: Course) => void;
  onDelete: (id: number) => void;
  onInputChange: (field: keyof Course, value: unknown) => void;
  onArrayChange: (field: 'modules' | 'prerequisites', value: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

const AdminTabs = ({
  activeTab,
  onTabChange,
  courses,
  searchTerm,
  onSearchChange,
  isCreating,
  editingCourse,
  formData,
  onRefresh,
  onStartCreating,
  onEdit,
  onDelete,
  onInputChange,
  onArrayChange,
  onSave,
  onCancel
}: AdminTabsProps) => {
  const router = useRouter();

  const handleCreateWithJSON = () => {
    router.push('/admin/cursos');
  };

  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="courses">Gestión de Cursos</TabsTrigger>
        <TabsTrigger value="blog">Gestión de Blog</TabsTrigger>
        <TabsTrigger value="create">
          {isCreating ? (editingCourse ? 'Editar Curso' : 'Crear Curso') : 'Crear Nuevo'}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="courses">
        <CourseManagement
          courses={courses}
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          onRefresh={onRefresh}
          onStartCreating={onStartCreating}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </TabsContent>

      <TabsContent value="blog">
        <BlogManagement />
      </TabsContent>

      <TabsContent value="create" className="space-y-6">
        {!isCreating && !editingCourse ? (
          <Card>
            <CardHeader>
              <CardTitle>Crear Nuevo Curso</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => {
                    console.log('Button clicked - starting course creation');
                    onStartCreating();
                  }} 
                  className="bg-[#1e5563] hover:bg-[#1e5563]/90"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Empezar a Crear Curso
                </Button>
                <Button 
                  onClick={handleCreateWithJSON}
                  variant="outline"
                  className="border-[#1e5563] text-[#1e5563] hover:bg-[#1e5563] hover:text-white"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Crear Curso con JSON
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <CourseForm
            formData={formData}
            editingCourse={editingCourse}
            onInputChange={onInputChange}
            onArrayChange={onArrayChange}
            onSave={onSave}
            onCancel={onCancel}
          />
        )}
      </TabsContent>
    </Tabs>
  );
};

export default AdminTabs;
