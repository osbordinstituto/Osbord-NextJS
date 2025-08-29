import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2 } from 'lucide-react';
import { Course } from '@/data/coursesData';

interface CourseCardProps {
  course: Course;
  onEdit: (course: Course) => void;
  onDelete: (id: number) => void;
}

const CourseCard = ({ course, onEdit, onDelete }: CourseCardProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <Image
          src={course.image}
          alt={`Curso ${course.title} - Panel administrativo`}
          width={300}
          height={128}
          className="w-full h-32 object-cover"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
          }}
        />
        <Badge className="absolute top-2 left-2 bg-[#1e5563]">
          {course.category}
        </Badge>
      </div>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{course.title}</CardTitle>
        <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex justify-between items-center mb-3">
          <span className="font-bold text-[#1e5563]">{course.price}</span>
          <span className="text-sm text-gray-500">{course.duration}</span>
        </div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-gray-500">{course.students} estudiantes</span>
          <span className="text-sm text-gray-500">⭐ {course.rating}</span>
        </div>
        <div className="flex justify-between">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onEdit(course)}
            className="flex-1 mr-2"
          >
            <Edit className="h-4 w-4 mr-1" />
            Editar
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => onDelete(course.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
