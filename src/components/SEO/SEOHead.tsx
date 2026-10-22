import { Helmet } from 'react-helmet-async';
import siteConfig from '@/config/site';
import { useLanguage } from '@/context/LanguageContext';
import { languages } from '@/i18n';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article';
}

const OG_LOCALES: Record<string, string> = {
  en: 'en_US',
  es: 'es_ES',
  de: 'de_DE',
};

const SEOHead = ({ title, description, keywords, canonical, image, type = 'website' }: SEOHeadProps) => {
  const { language } = useLanguage();

  const siteUrl = siteConfig.url.replace(/\/$/, '');
  const path = canonical ?? '/';
  const canonicalUrl = `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
  const ogImage = `${siteUrl}${image ?? siteConfig.ogImage}`;
  const brandSuffix = siteConfig.name;
  const fullTitle = title.includes(siteConfig.shortName) ? title : `${title} | ${brandSuffix}`;

  const sameAs = Object.values(siteConfig.social).filter(
    (url): url is string => typeof url === 'string' && url.length > 0
  );

  return (
    <Helmet>
      <html lang={language} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />

      {/* Language alternates for the multilingual build */}
      {languages.map((lang) => (
        <link
          key={lang.code}
          rel="alternate"
          hrefLang={lang.code}
          href={`${siteUrl}${path}`}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${siteUrl}${path}`} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteConfig.shortName} />
      <meta property="og:locale" content={OG_LOCALES[language] ?? 'en_US'} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${siteConfig.shortName} — ${siteConfig.tagline}`} />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={`${siteConfig.shortName} — ${siteConfig.tagline}`} />

      {/* Additional SEO meta tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content={siteConfig.shortName} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#0c0d10" />

      {/* Schema.org structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": `${siteUrl}/#organization`,
              "name": siteConfig.shortName,
              "legalName": siteConfig.name,
              "description": siteConfig.description,
              "url": siteUrl,
              "logo": `${siteUrl}/assets/logo.png`,
              "image": `${siteUrl}${siteConfig.ogImage}`,
              "telephone": siteConfig.contact.phoneFormatted,
              "email": siteConfig.contact.email,
              "address": {
                "@type": "PostalAddress",
                "streetAddress": siteConfig.contact.address,
                "addressLocality": siteConfig.contact.city,
                "addressCountry": siteConfig.contact.country
              },
              "sameAs": sameAs
            },
            {
              "@type": "WebSite",
              "@id": `${siteUrl}/#website`,
              "url": siteUrl,
              "name": siteConfig.name,
              "description": siteConfig.description,
              "inLanguage": languages.map((lang) => lang.code),
              "publisher": { "@id": `${siteUrl}/#organization` }
            }
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;
