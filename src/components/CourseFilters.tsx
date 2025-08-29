
import React from 'react';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

const categories = ['Todos', 'Tecnología', 'Medicina', 'Humanidades', 'Negocios', 'Arte', 'Idiomas'];

interface CourseFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CourseFilters: React.FC<CourseFiltersProps> = ({ selectedCategory, onCategoryChange }) => {
  return (
    <section className="py-8 bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <span className="text-gray-700 font-medium">Filtrar por categoría:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={selectedCategory === category 
                  ? "bg-[#1e5563] hover:bg-[#1e5563]/90 text-white" 
                  : "border-[#1e5563] text-[#1e5563] hover:bg-[#1e5563] hover:text-white"
                }
                onClick={() => onCategoryChange(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseFilters;
