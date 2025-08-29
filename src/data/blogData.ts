import { supabase } from '@/integrations/supabase/client';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: string;
  tags: string[];
  featured_image: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
  reading_time: number;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  post_count: number;
}

// Mock data for development
const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Desarrollo Web Moderno con Next.js 14',
    slug: 'desarrollo-web-moderno-nextjs-14',
    excerpt: 'Descubre las últimas características de Next.js 14 y cómo pueden revolucionar tu desarrollo web.',
    content: '<h2>Introducción a Next.js 14</h2><p>Next.js 14 trae consigo una serie de mejoras significativas...</p>',
    category: 'desarrollo-web',
    tags: ['React', 'Next.js', 'TypeScript', 'Frontend'],
    featured_image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800',
    published: true,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
    reading_time: 8
  },
  {
    id: '2',
    title: 'Inteligencia Artificial en la Educación',
    slug: 'inteligencia-artificial-educacion',
    excerpt: 'Cómo la IA está transformando la forma en que aprendemos y enseñamos en el siglo XXI.',
    content: '<h2>El Futuro del Aprendizaje</h2><p>La inteligencia artificial está revolucionando la educación...</p>',
    category: 'tecnologia-educativa',
    tags: ['IA', 'Educación', 'Machine Learning', 'EdTech'],
    featured_image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    published: true,
    created_at: '2024-01-10T14:30:00Z',
    updated_at: '2024-01-10T14:30:00Z',
    reading_time: 6
  },
  {
    id: '3',
    title: 'Marketing Digital: Tendencias 2024',
    slug: 'marketing-digital-tendencias-2024',
    excerpt: 'Las estrategias de marketing digital que dominarán el panorama empresarial este año.',
    content: '<h2>Nuevas Tendencias</h2><p>El marketing digital continúa evolucionando a un ritmo acelerado...</p>',
    category: 'marketing-digital',
    tags: ['Marketing', 'SEO', 'Content Marketing', 'Social Media'],
    featured_image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    published: true,
    created_at: '2024-01-05T09:15:00Z',
    updated_at: '2024-01-05T09:15:00Z',
    reading_time: 7
  },
  {
    id: '4',
    title: 'Diseño UX/UI: Principios Fundamentales',
    slug: 'diseno-ux-ui-principios-fundamentales',
    excerpt: 'Los principios esenciales del diseño UX/UI que todo profesional debe conocer.',
    content: '<h2>Fundamentos del Diseño</h2><p>El diseño de experiencia de usuario es crucial para el éxito...</p>',
    category: 'diseno',
    tags: ['UX', 'UI', 'Diseño', 'Usabilidad'],
    featured_image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
    published: true,
    created_at: '2024-01-01T16:45:00Z',
    updated_at: '2024-01-01T16:45:00Z',
    reading_time: 5
  }
];

const mockCategories: BlogCategory[] = [
  {
    id: '1',
    name: 'Desarrollo Web',
    slug: 'desarrollo-web',
    description: 'Artículos sobre tecnologías y técnicas de desarrollo web',
    post_count: 1
  },
  {
    id: '2',
    name: 'Tecnología Educativa',
    slug: 'tecnologia-educativa',
    description: 'Innovaciones tecnológicas en el ámbito educativo',
    post_count: 1
  },
  {
    id: '3',
    name: 'Marketing Digital',
    slug: 'marketing-digital',
    description: 'Estrategias y tendencias en marketing digital',
    post_count: 1
  },
  {
    id: '4',
    name: 'Diseño',
    slug: 'diseno',
    description: 'Principios y técnicas de diseño UX/UI',
    post_count: 1
  }
];

// Event listeners for real-time updates
const blogUpdateListeners: (() => void)[] = [];

export const addBlogUpdateListener = (callback: () => void) => {
  blogUpdateListeners.push(callback);
  return () => {
    const index = blogUpdateListeners.indexOf(callback);
    if (index > -1) {
      blogUpdateListeners.splice(index, 1);
    }
  };
};

const notifyBlogUpdate = () => {
  blogUpdateListeners.forEach(callback => callback());
};

// Blog posts functions with Supabase integration
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.log('Using mock blog data:', error.message);
      return mockBlogPosts;
    }

    return data || mockBlogPosts;
  } catch (error) {
    console.log('Using mock blog data due to error:', error);
    return mockBlogPosts;
  }
};

export const getAllBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.log('Using mock blog data:', error.message);
      return mockBlogPosts;
    }

    return data || mockBlogPosts;
  } catch (error) {
    console.log('Using mock blog data due to error:', error);
    return mockBlogPosts;
  }
};

export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (error) {
      console.log('Using mock blog data:', error.message);
      return mockBlogPosts.find(post => post.slug === slug) || null;
    }

    return data;
  } catch (error) {
    console.log('Using mock blog data due to error:', error);
    return mockBlogPosts.find(post => post.slug === slug) || null;
  }
};

export const getBlogCategories = async (): Promise<BlogCategory[]> => {
  try {
    const { data, error } = await supabase
      .from('blog_categories')
      .select('*')
      .order('name');

    if (error) {
      console.log('Using mock categories data:', error.message);
      return mockCategories;
    }

    return data || mockCategories;
  } catch (error) {
    console.log('Using mock categories data due to error:', error);
    return mockCategories;
  }
};

export const createBlogPost = async (post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>): Promise<BlogPost> => {
  try {
    // Check if Supabase is properly configured
    if (!supabase) {
      throw new Error('Supabase client not initialized');
    }

    // First, ensure the category exists in blog_categories table
    const { data: categoryData, error: categoryError } = await supabase
      .from('blog_categories')
      .select('slug')
      .eq('slug', post.category)
      .single();

    // If category doesn't exist, create it
    if (categoryError || !categoryData) {
      const categoryName = post.category.charAt(0).toUpperCase() + post.category.slice(1).replace(/-/g, ' ');
      
      const { error: insertCategoryError } = await supabase
        .from('blog_categories')
        .insert([{
          name: categoryName,
          slug: post.category,
          description: `Categoría de ${categoryName}`
        }]);

      if (insertCategoryError) {
        console.error('Error creating category:', insertCategoryError);
      }
    }

    // Add created_at and updated_at timestamps
    const postData = {
      ...post,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    console.log('Creating blog post with data:', postData);

    const { data, error } = await supabase
      .from('blog_posts')
      .insert([postData])
      .select()
      .single();

    if (error) {
      console.error('Supabase error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      throw new Error(`Failed to create blog post: ${error.message}`);
    }

    if (!data) {
      throw new Error('No data returned from Supabase after creating blog post');
    }

    notifyBlogUpdate();
    return data;
  } catch (error) {
    console.error('Error creating blog post:', error);
    
    // Fallback to mock data if Supabase fails
    console.log('Falling back to mock data creation');
    const mockPost: BlogPost = {
      id: Date.now().toString(),
      ...post,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    // Add to mock data array
    mockBlogPosts.unshift(mockPost);
    notifyBlogUpdate();
    
    return mockPost;
  }
};

export const updateBlogPost = async (id: string, updates: Partial<BlogPost>): Promise<BlogPost> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    notifyBlogUpdate();
    return data;
  } catch (error) {
    console.error('Error updating blog post:', error);
    throw error;
  }
};

export const deleteBlogPost = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) throw error;

    notifyBlogUpdate();
  } catch (error) {
    console.error('Error deleting blog post:', error);
    throw error;
  }
};

export const getBlogPostsByCategory = async (category: string): Promise<BlogPost[]> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('category', category)
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.log('Using mock blog data:', error.message);
      return mockBlogPosts.filter(post => post.category === category);
    }

    return data || [];
  } catch (error) {
    console.log('Using mock blog data due to error:', error);
    return mockBlogPosts.filter(post => post.category === category);
  }
};

export const searchBlogPosts = async (query: string): Promise<BlogPost[]> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%,content.ilike.%${query}%`)
      .order('created_at', { ascending: false });

    if (error) {
      console.log('Using mock blog data for search:', error.message);
      return mockBlogPosts.filter(post => 
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(query.toLowerCase())) ||
        post.content.toLowerCase().includes(query.toLowerCase())
      );
    }

    return data || [];
  } catch (error) {
    console.log('Using mock blog data for search due to error:', error);
    return mockBlogPosts.filter(post => 
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(query.toLowerCase())) ||
      post.content.toLowerCase().includes(query.toLowerCase())
    );
  }
};
