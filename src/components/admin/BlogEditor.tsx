'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Save, Eye, X, Plus } from 'lucide-react';
import { createBlogPost, updateBlogPost } from '@/data/blogData';
import type { BlogPost } from '@/data/blogData';
import Link from 'next/link';

interface BlogEditorProps {
  postId?: string;
}

const BlogEditor = ({ postId }: BlogEditorProps) => {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    tags: [] as string[],
    featured_image: '',
    reading_time: 5,
    published: false
  });

  const [newTag, setNewTag] = useState('');
  const [activeTab, setActiveTab] = useState('editor');
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Load post data if editing
  const loadPost = React.useCallback(async () => {
    if (!postId) return;
    
    try {
      // For editing, we need to get the post by ID, but our current function gets by slug
      // We'll need to add a function to get by ID, for now using mock data approach
      const { getAllBlogPosts } = await import('@/data/blogData');
      const allPosts: BlogPost[] = await getAllBlogPosts();
      const post = allPosts.find((p: BlogPost) => p.id === postId);
      
      if (post) {
        setFormData({
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt || '',
          content: post.content,
          category: post.category,
          tags: post.tags,
          featured_image: post.featured_image || '',
          reading_time: post.reading_time,
          published: post.published
        });
        setIsEditing(true);
      } else {
        toast.error('Post no encontrado');
      }
    } catch (error) {
      console.error('Error loading post:', error);
      toast.error('Error al cargar el post');
    }
  }, [postId]);

  useEffect(() => {
    if (postId) {
      loadPost();
    }
  }, [postId, loadPost]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleInputChange = (
    field: keyof typeof formData,
    value: string | number | boolean | string[]
  ) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      
      // Auto-generate slug when title changes
      if (field === 'title' && typeof value === 'string') {
        updated.slug = generateSlug(value);
      }
      
      return updated;
    });
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSave = async (publish = false) => {
    try {
      if (!formData.title || !formData.content || !formData.category) {
        toast.error('Por favor completa todos los campos requeridos');
        return;
      }

      setSaving(true);

      const postData = {
        ...formData,
        published: publish,
        slug: formData.slug || generateSlug(formData.title),
      };

      if (isEditing && postId) {
        await updateBlogPost(postId, postData);
      } else {
        await createBlogPost(postData);
      }

      toast.success(isEditing 
        ? (publish ? 'Post actualizado y publicado' : 'Post actualizado como borrador')
        : (publish ? 'Post publicado exitosamente' : 'Post guardado como borrador')
      );
      
      // Reset form only if creating new post
      if (!isEditing) {
        setFormData({
          title: '',
          slug: '',
          excerpt: '',
          content: '',
          category: '',
          tags: [],
          featured_image: '',
          published: false,
          reading_time: 5
        });
      }
      
    } catch (error) {
      console.error('Error saving blog post:', error);
      
      // Show more specific error message
      if (error instanceof Error) {
        toast.error(`Error al guardar el post: ${error.message}`);
      } else {
        toast.error('Error al guardar el post. Verifica que todos los campos estén completos.');
      }
    } finally {
      setSaving(false);
    }
  };

  const PreviewContent = () => (
    <div className="max-w-4xl mx-auto">
      {/* Preview Header */}
      <div className="mb-8">
        <div className="relative h-64 bg-gray-200 rounded-lg overflow-hidden mb-6">
          {formData.featured_image ? (
            <Image
              src={formData.featured_image}
              alt={formData.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1024px"
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Imagen destacada
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          <Badge className="bg-[#1e5563]">{formData.category || 'Categoría'}</Badge>
          <h1 className="text-4xl font-bold text-gray-900">
            {formData.title || 'Título del artículo'}
          </h1>
          <p className="text-xl text-gray-600">
            {formData.excerpt || 'Extracto del artículo...'}
          </p>
          <div className="flex items-center gap-4 text-gray-500">
            <span>Osbord Instituto</span>
            <span>•</span>
            <span>{formData.reading_time} min de lectura</span>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="prose prose-lg max-w-none">
        {formData.content ? (
          <div dangerouslySetInnerHTML={{ __html: formData.content }} />
        ) : (
          <p className="text-gray-500 italic">El contenido aparecerá aquí...</p>
        )}
      </div>

      {/* Preview Tags */}
      {formData.tags.length > 0 && (
        <div className="mt-8 pt-6 border-t">
          <h3 className="font-semibold mb-3">Etiquetas:</h3>
          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag, index) => (
              <Badge key={index} variant="outline">{tag}</Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link 
                href="/admin"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5" />
                Volver al Admin
              </Link>
              <h1 className="text-xl font-semibold">Editor de Blog</h1>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                onClick={() => handleSave(false)}
                disabled={saving}
              >
                <Save className="w-4 h-4 mr-2" />
                Guardar Borrador
              </Button>
              <Button 
                onClick={() => handleSave(true)}
                disabled={saving}
                className="bg-[#1e5563] hover:bg-[#1e5563]/90"
              >
                Publicar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Editor Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="preview">
              <Eye className="w-4 h-4 mr-2" />
              Vista Previa
            </TabsTrigger>
          </TabsList>

          <TabsContent value="editor" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Contenido Principal</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="title">Título *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="Título del artículo"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="slug">URL (Slug)</Label>
                      <Input
                        id="slug"
                        value={formData.slug}
                        onChange={(e) => handleInputChange('slug', e.target.value)}
                        placeholder="url-del-articulo"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="excerpt">Extracto</Label>
                      <Textarea
                        id="excerpt"
                        value={formData.excerpt}
                        onChange={(e) => handleInputChange('excerpt', e.target.value)}
                        placeholder="Breve descripción del artículo..."
                        rows={3}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="content">Contenido HTML *</Label>
                      <Textarea
                        id="content"
                        value={formData.content}
                        onChange={(e) => handleInputChange('content', e.target.value)}
                        placeholder="<h2>Título de sección</h2><p>Contenido del artículo...</p>"
                        rows={15}
                        className="mt-1 font-mono text-sm"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Puedes usar HTML para formatear el contenido
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Configuración</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="category">Categoría *</Label>
                      <Input
                        id="category"
                        value={formData.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        placeholder="Desarrollo Web, Marketing, etc."
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="reading_time">Tiempo de lectura (min)</Label>
                      <Input
                        id="reading_time"
                        type="number"
                        value={formData.reading_time}
                        onChange={(e) => handleInputChange('reading_time', parseInt(e.target.value))}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="featured_image">Imagen destacada (URL)</Label>
                      <Input
                        id="featured_image"
                        value={formData.featured_image}
                        onChange={(e) => handleInputChange('featured_image', e.target.value)}
                        placeholder="https://ejemplo.com/imagen.jpg"
                        className="mt-1"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Etiquetas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2 mb-3">
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Nueva etiqueta"
                        onKeyPress={(e) => e.key === 'Enter' && addTag()}
                      />
                      <Button onClick={addTag} size="sm">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {tag}
                          <X 
                            className="w-3 h-3 cursor-pointer" 
                            onClick={() => removeTag(tag)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preview">
            <Card>
              <CardContent className="p-8">
                <PreviewContent />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BlogEditor;
