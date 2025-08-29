'use client';

import React from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminContent from './admin-content';

export default function Admin() {
  return (
    <ProtectedRoute>
      <AdminContent />
    </ProtectedRoute>
  );
}
