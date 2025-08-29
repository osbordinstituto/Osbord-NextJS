'use client';

import React from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import BlogEditor from '../../../../../components/admin/BlogEditor';

interface EditBlogPostPageProps {
  params: {
    id: string;
  };
}

export default function EditBlogPostPage({ params }: EditBlogPostPageProps) {
  return (
    <ProtectedRoute>
      <BlogEditor postId={params.id} />
    </ProtectedRoute>
  );
}
