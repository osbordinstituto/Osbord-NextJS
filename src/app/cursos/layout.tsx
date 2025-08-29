import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cursos - Osbord Instituto',
  description: 'Explora nuestra amplia gama de cursos especializados. Formación profesional de calidad con metodología innovadora y profesores expertos.',
  keywords: 'cursos online, formación profesional, educación técnica, certificación, capacitación laboral',
  openGraph: {
    title: 'Cursos - Osbord Instituto',
    description: 'Explora nuestra amplia gama de cursos especializados. Formación profesional de calidad.',
    url: 'https://osbordinstituto.com/cursos',
  },
};

export default function CursosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
