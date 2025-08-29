import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getBlogPosts } from '@/data/blogData';
import BlogPostContent from '../../../components/BlogPostContent';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Artículo no encontrado - Osbord Instituto',
    };
  }

  return {
    title: `${post.title} - Blog Osbord Instituto`,
    description: post.excerpt ?? undefined,
    keywords: `${post.tags.join(', ')}, ${post.category}, blog educativo, osbord instituto`,
    alternates: {
      canonical: `https://osbordinstituto.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      url: `https://osbordinstituto.com/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.created_at ?? undefined,
      modifiedTime: post.updated_at ?? undefined,
      authors: ['Osbord Instituto'],
      tags: post.tags,
      images: post.featured_image
        ? [
            {
              url: post.featured_image as string,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt ?? undefined,
      images: post.featured_image ? [post.featured_image as string] : undefined,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  
  if (!post) {
    notFound();
  }

  return <BlogPostContent post={post} />;
}
