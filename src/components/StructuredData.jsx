// src/components/StructuredData.jsx
export const StructuredData = ({ content }) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: content.personal.name,
    jobTitle: content.personal.title,
    description: content.personal.subtitle,
    url: "https://vaibhava17.github.io",
    sameAs: [
      content.personal.social.github,
      content.personal.social.linkedin,
      content.personal.social.twitter,
    ],
    worksFor: {
      "@type": "Organization",
      name: "Solfin",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Indian Institute of Technology Mandi",
    },
    knowsAbout: [
      "JavaScript",
      "React",
      "Next.js",
      "Python",
      "Node.js",
      "Software Development",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};
