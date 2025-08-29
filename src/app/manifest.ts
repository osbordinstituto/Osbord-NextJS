import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Osbord Instituto - Educación de Calidad',
    short_name: 'Osbord Instituto',
    description: 'Instituto educativo líder en formación profesional y técnica. Ofrecemos cursos especializados con metodología innovadora.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1e5563',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '16x16',
        type: 'image/x-icon',
      },
      {
        src: '/lovable-uploads/1199af8c-b8b2-48bb-8f98-2930a995849c.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/lovable-uploads/99405c30-c5bc-4e02-a9cb-c61088161c76.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
