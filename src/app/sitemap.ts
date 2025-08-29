import { MetadataRoute } from 'next'
import { getBlogPosts } from '@/data/blogData'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get blog posts for dynamic sitemap
  const blogPosts = await getBlogPosts()
  
  const staticPages = [
    {
      url: 'https://osbordinstituto.com',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: 'https://osbordinstituto.com/nosotros',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: 'https://osbordinstituto.com/cursos',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: 'https://osbordinstituto.com/blog',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: 'https://osbordinstituto.com/contacto',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: 'https://osbordinstituto.com/auth',
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: 'https://osbordinstituto.com/terminos',
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.2,
    },
    {
      url: 'https://osbordinstituto.com/privacidad',
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.2,
    },
    {
      url: 'https://osbordinstituto.com/cookies',
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.2,
    },
  ]

  // Add blog post URLs
  const blogPages = blogPosts.map(post => ({
    url: `https://osbordinstituto.com/blog/${post.slug}`,
    lastModified: new Date(post.updated_at),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...blogPages]
}
