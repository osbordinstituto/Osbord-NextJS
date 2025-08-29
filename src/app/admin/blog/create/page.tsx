'use client';

import React from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import BlogEditor from '../../../../components/admin/BlogEditor';

export default function CreateBlogPost() {
  return (
    <ProtectedRoute>
      <BlogEditor />
    </ProtectedRoute>
  );
}
