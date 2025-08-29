-- Create blog_categories table
CREATE TABLE blog_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  post_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog_posts table
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  category VARCHAR(255) NOT NULL,
  tags TEXT[] DEFAULT '{}',
  featured_image TEXT,
  published BOOLEAN DEFAULT false,
  reading_time INTEGER DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Foreign key constraint (optional, if you want to enforce category relationships)
  CONSTRAINT fk_blog_posts_category 
    FOREIGN KEY (category) 
    REFERENCES blog_categories(slug) 
    ON DELETE RESTRICT
);

-- Create indexes for better performance
CREATE INDEX idx_blog_posts_published ON blog_posts(published);
CREATE INDEX idx_blog_posts_category ON blog_posts(category);
CREATE INDEX idx_blog_posts_created_at ON blog_posts(created_at DESC);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_categories_slug ON blog_categories(slug);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_blog_posts_updated_at 
  BEFORE UPDATE ON blog_posts 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_categories_updated_at 
  BEFORE UPDATE ON blog_categories 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update post count in categories
CREATE OR REPLACE FUNCTION update_category_post_count()
RETURNS TRIGGER AS $$
BEGIN
  -- Update post count for the affected category
  IF TG_OP = 'INSERT' AND NEW.published = true THEN
    UPDATE blog_categories 
    SET post_count = post_count + 1 
    WHERE slug = NEW.category;
  ELSIF TG_OP = 'UPDATE' THEN
    -- If publication status changed
    IF OLD.published != NEW.published THEN
      IF NEW.published = true THEN
        UPDATE blog_categories 
        SET post_count = post_count + 1 
        WHERE slug = NEW.category;
      ELSE
        UPDATE blog_categories 
        SET post_count = post_count - 1 
        WHERE slug = NEW.category;
      END IF;
    END IF;
    -- If category changed
    IF OLD.category != NEW.category AND NEW.published = true THEN
      UPDATE blog_categories 
      SET post_count = post_count - 1 
      WHERE slug = OLD.category;
      UPDATE blog_categories 
      SET post_count = post_count + 1 
      WHERE slug = NEW.category;
    END IF;
  ELSIF TG_OP = 'DELETE' AND OLD.published = true THEN
    UPDATE blog_categories 
    SET post_count = post_count - 1 
    WHERE slug = OLD.category;
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ language 'plpgsql';

-- Create trigger for post count updates
CREATE TRIGGER update_category_post_count_trigger
  AFTER INSERT OR UPDATE OR DELETE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_category_post_count();

-- Insert default categories
INSERT INTO blog_categories (name, slug, description) VALUES
  ('Desarrollo Web', 'desarrollo-web', 'Artículos sobre tecnologías y técnicas de desarrollo web'),
  ('Tecnología Educativa', 'tecnologia-educativa', 'Innovaciones tecnológicas en el ámbito educativo'),
  ('Marketing Digital', 'marketing-digital', 'Estrategias y tendencias en marketing digital'),
  ('Diseño', 'diseno', 'Principios y técnicas de diseño UX/UI'),
  ('Programación', 'programacion', 'Tutoriales y conceptos de programación'),
  ('Inteligencia Artificial', 'inteligencia-artificial', 'IA y Machine Learning aplicados a la educación');

-- Enable Row Level Security (RLS)
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public can view published blog posts" ON blog_posts
  FOR SELECT USING (published = true);

CREATE POLICY "Public can view all categories" ON blog_categories
  FOR SELECT USING (true);

-- Create policies for authenticated users (admins)
CREATE POLICY "Authenticated users can manage blog posts" ON blog_posts
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage categories" ON blog_categories
  FOR ALL USING (auth.role() = 'authenticated');
