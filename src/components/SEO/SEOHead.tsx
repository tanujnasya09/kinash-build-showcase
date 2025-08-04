import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
}

const SEOHead = ({ title, description, keywords, canonical }: SEOHeadProps) => {
  const fullTitle = `${title} | Kinash Associates - Construction & Real Estate Excellence`;
  const siteUrl = 'https://kinashassociates.com'; // Replace with actual domain

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {canonical && <link rel="canonical" href={`${siteUrl}${canonical}`} />}
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${siteUrl}${canonical || ''}`} />
      <meta property="og:site_name" content="Kinash Associates" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      
      {/* Additional SEO meta tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Kinash Associates" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Schema.org structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Kinash Associates",
          "description": "Premier construction and real estate company delivering exceptional building and property solutions.",
          "url": siteUrl,
          "telephone": "+1-123-456-7890",
          "email": "info@kinashassociates.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Business Avenue, Suite 100",
            "addressLocality": "City",
            "addressRegion": "State",
            "postalCode": "12345",
            "addressCountry": "US"
          },
          "sameAs": [
            "https://www.facebook.com/kinashassociates",
            "https://www.linkedin.com/company/kinashassociates",
            "https://twitter.com/kinashassociates"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;