'use client';

export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Osbord Instituto",
    "description": "Instituto educativo líder en formación profesional y técnica. Ofrecemos cursos especializados con metodología innovadora y profesores expertos.",
    "url": "https://osbordinstituto.com",
    "logo": "https://osbordinstituto.com/lovable-uploads/99405c30-c5bc-4e02-a9cb-c61088161c76.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-234-567-8900",
      "contactType": "customer service",
      "availableLanguage": "Spanish"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "ES"
    },
    "sameAs": [
      "https://facebook.com/osbordinstituto",
      "https://twitter.com/osbordinstituto",
      "https://linkedin.com/company/osbordinstituto"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Osbord Instituto",
    "url": "https://osbordinstituto.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://osbordinstituto.com/cursos?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
    </>
  );
}
