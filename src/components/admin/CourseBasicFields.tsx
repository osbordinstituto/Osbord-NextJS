
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Course } from '@/data/coursesData';

interface CourseBasicFieldsProps {
  formData: Partial<Course>;
  onInputChange: (field: keyof Course, value: unknown) => void;
}

const CourseBasicFields = ({ formData, onInputChange }: CourseBasicFieldsProps) => {
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  const handleCategoryChange = (value: string) => {
    if (value === '__new__') {
      setShowNewCategoryInput(true);
      // clear current category so validation can catch if user doesn't type
      onInputChange('category', '');
      return;
    }
    setShowNewCategoryInput(false);
    setNewCategory('');
    onInputChange('category', value);
  };

  const handleNewCategoryInput = (val: string) => {
    setNewCategory(val);
    onInputChange('category', val);
  };

  return (
    <>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Título del Curso *</Label>
          <Input
            id="title"
            value={formData.title || ''}
            onChange={(e) => onInputChange('title', e.target.value)}
            placeholder="Nombre del curso"
          />
        </div>
        <div>
          <Label htmlFor="category">Categoría *</Label>
          <Select 
            value={showNewCategoryInput ? '__new__' : (formData.category || '')} 
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecciona categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Tecnología">Tecnología</SelectItem>
              <SelectItem value="Medicina">Medicina</SelectItem>
              <SelectItem value="Humanidades">Humanidades</SelectItem>
              <SelectItem value="Negocios">Negocios</SelectItem>
              <SelectItem value="Arte">Arte</SelectItem>
              <SelectItem value="Idiomas">Idiomas</SelectItem>
              <SelectItem value="__new__">➕ Agregar nueva categoría…</SelectItem>
            </SelectContent>
          </Select>
          {showNewCategoryInput && (
            <div className="mt-2">
              <Label htmlFor="new-category">Nueva categoría</Label>
              <Input
                id="new-category"
                value={newCategory}
                onChange={(e) => handleNewCategoryInput(e.target.value)}
                placeholder="Escribe la nueva categoría"
              />
            </div>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="description">Descripción Corta *</Label>
        <Textarea
          id="description"
          value={formData.description || ''}
          onChange={(e) => onInputChange('description', e.target.value)}
          placeholder="Descripción breve del curso"
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="detailed_description">Descripción Detallada</Label>
        <Textarea
          id="detailed_description"
          value={formData.detailed_description || ''}
          onChange={(e) => onInputChange('detailed_description', e.target.value)}
          placeholder="Descripción completa del curso"
          rows={4}
        />
      </div>
    </>
  );
};

export default CourseBasicFields;
