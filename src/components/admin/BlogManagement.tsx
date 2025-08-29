'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  Calendar,
  Clock,
  Tag
} from 'lucide-react';
import { getAllBlogPosts, deleteBlogPost, updateBlogPost } from '@/data/blogData';
import type { BlogPost } from '@/data/blogData';
import { toast } from 'sonner';
import Link from 'next/link';

const BlogManagement = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');

  useEffect(() => {
    loadPosts();
  }, []);

  const filterPosts = React.useCallback(() => {
    let filtered = posts;

    // Filter by publication status
    if (filter === 'published') {
      filtered = filtered.filter(post => post.published);
    } else if (filter === 'draft') {
      filtered = filtered.filter(post => !post.published);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) ||
        post.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPosts(filtered);
  }, [posts, searchTerm, filter]);

  useEffect(() => {
    filterPosts();
  }, [filterPosts]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await getAllBlogPosts();
      setPosts(data);
    } catch (error) {
      console.error('Error loading posts:', error);
      toast.error('Error al cargar los posts');
    } finally {
      setLoading(false);
    }
  };

  

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`¿Estás seguro de que quieres eliminar "${title}"?`)) {
      return;
    }

    try {
      await deleteBlogPost(id);
      toast.success('Post eliminado exitosamente');
      loadPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Error al eliminar el post');
    }
  };

  const handleTogglePublished = async (post: BlogPost) => {
    try {
      await updateBlogPost(post.id, { published: !post.published });
      toast.success(post.published ? 'Post despublicado' : 'Post publicado');
      loadPosts();
    } catch (error) {
      console.error('Error updating post:', error);
      toast.error('Error al actualizar el post');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1e5563]"></div>
            <span className="ml-2">Cargando posts...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Gestión de Blog</CardTitle>
            <Link href="/admin/blog/create">
              <Button className="bg-[#1e5563] hover:bg-[#1e5563]/90">
                <Plus className="h-4 w-4 mr-2" />
                Crear Nuevo Post
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                onClick={() => setFilter('all')}
                size="sm"
              >
                Todos ({posts.length})
              </Button>
              <Button
                variant={filter === 'published' ? 'default' : 'outline'}
                onClick={() => setFilter('published')}
                size="sm"
              >
                Publicados ({posts.filter(p => p.published).length})
              </Button>
              <Button
                variant={filter === 'draft' ? 'default' : 'outline'}
                onClick={() => setFilter('draft')}
                size="sm"
              >
                Borradores ({posts.filter(p => !p.published).length})
              </Button>
            </div>
          </div>

          {/* Posts List */}
          {filteredPosts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {searchTerm ? 'No se encontraron posts que coincidan con tu búsqueda.' : 'No hay posts disponibles.'}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="border-l-4 border-l-[#1e5563]">
                  <CardContent className="p-4">
                    <div className="flex flex-col lg:flex-row justify-between gap-4">
                      {/* Post Info */}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                            {post.title}
                          </h3>
                          <Badge variant={post.published ? 'default' : 'secondary'}>
                            {post.published ? 'Publicado' : 'Borrador'}
                          </Badge>
                        </div>
                        
                        {post.excerpt && (
                          <p className="text-gray-600 text-sm line-clamp-2">
                            {post.excerpt}
                          </p>
                        )}
                        
                        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{formatDate(post.created_at)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{post.reading_time} min</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Tag className="h-3 w-3" />
                            <span>{post.category}</span>
                          </div>
                        </div>
                        
                        {post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {post.tags.slice(0, 3).map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {post.tags.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{post.tags.length - 3}
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-row lg:flex-col gap-2">
                        <Link href={`/blog/${post.slug}`} target="_blank">
                          <Button variant="outline" size="sm" className="w-full lg:w-auto">
                            <Eye className="h-4 w-4 mr-1" />
                            Ver
                          </Button>
                        </Link>
                        
                        <Link href={`/admin/blog/edit/${post.id}`}>
                          <Button variant="outline" size="sm" className="w-full lg:w-auto">
                            <Edit className="h-4 w-4 mr-1" />
                            Editar
                          </Button>
                        </Link>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleTogglePublished(post)}
                          className="w-full lg:w-auto"
                        >
                          {post.published ? (
                            <>
                              <EyeOff className="h-4 w-4 mr-1" />
                              Despublicar
                            </>
                          ) : (
                            <>
                              <Eye className="h-4 w-4 mr-1" />
                              Publicar
                            </>
                          )}
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(post.id, post.title)}
                          className="w-full lg:w-auto text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogManagement;
