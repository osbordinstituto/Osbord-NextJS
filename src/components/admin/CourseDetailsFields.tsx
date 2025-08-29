
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Course } from '@/data/coursesData';

interface CourseDetailsFieldsProps {
  formData: Partial<Course>;
  onInputChange: (field: keyof Course, value: unknown) => void;
}

const CourseDetailsFields = ({ formData, onInputChange }: CourseDetailsFieldsProps) => {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="price">Precio</Label>
          <Input
            id="price"
            value={formData.price || ''}
            onChange={(e) => onInputChange('price', e.target.value)}
            placeholder="$199"
          />
        </div>
        <div>
          <Label htmlFor="duration">Duración</Label>
          <div className="flex gap-2">
            <Input
              id="duration"
              type="number"
              min="1"
              value={formData.duration ? formData.duration.replace(/[^0-9]/g, '') : ''}
              onChange={(e) => {
                const number = e.target.value;
                const unit = formData.duration?.includes('mes') ? 'meses' : 'semanas';
                onInputChange('duration', number ? `${number} ${unit}` : '');
              }}
              placeholder="12"
              className="flex-1"
            />
            <select
              value={formData.duration?.includes('mes') ? 'meses' : 'semanas'}
              onChange={(e) => {
                const number = formData.duration ? formData.duration.replace(/[^0-9]/g, '') : '1';
                onInputChange('duration', `${number} ${e.target.value}`);
              }}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="semanas">Semanas</option>
              <option value="meses">Meses</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="students">Número de Estudiantes</Label>
          <Input
            id="students"
            type="number"
            value={formData.students || ''}
            onChange={(e) => onInputChange('students', parseInt(e.target.value) || 0)}
            placeholder="50"
          />
        </div>
        <div>
          <Label htmlFor="rating">Calificación</Label>
          <Input
            id="rating"
            type="number"
            step="0.1"
            min="1"
            max="5"
            value={formData.rating || ''}
            onChange={(e) => onInputChange('rating', parseFloat(e.target.value) || 5.0)}
            placeholder="4.8"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="image">URL de la Imagen</Label>
        <Input
          id="image"
          value={formData.image || ''}
          onChange={(e) => onInputChange('image', e.target.value)}
          placeholder="https://ejemplo.com/imagen.jpg"
        />
      </div>
    </>
  );
};

export default CourseDetailsFields;
