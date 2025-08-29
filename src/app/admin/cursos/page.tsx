import ProtectedRoute from '@/components/ProtectedRoute';
import { CourseCreator } from '@/components/admin/CourseCreator';

export default function AdminCoursesPage() {
  return (
    <ProtectedRoute>
      <CourseCreator />
    </ProtectedRoute>
  );
}
