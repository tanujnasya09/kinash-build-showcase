export interface SiteConfig {
  name: string;
  shortName: string;
  wordmark: string;
  brandLine: string;
  tagline: string;
  description: string;
  url: string;
  ogImage: string;
  twitterHandle?: string;
  contact: {
    phone: string;
    phoneFormatted: string;
    email: string;
    address: string;
    city: string;
    country: string;
    hours: string;
  };
  social: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
  defaultCurrency: string;
  demo: {
    virtualTourUrl: string;
  };
  images: {
    homepageHero: { url: string; alt: string; width: number; height: number };
    servicesHero: { url: string; alt: string; width: number; height: number };
    constructionHero: { url: string; alt: string; width: number; height: number };
    aboutHero: { url: string; alt: string; width: number; height: number };
    constructionProjects: {
      commercial: { url: string; alt: string };
      residential: { url: string; alt: string };
      mixedUse: { url: string; alt: string };
    };
    team: {
      michael: string;
      sarah: string;
      david: string;
    };
  };
}

const siteUrl = (import.meta.env?.VITE_SITE_URL as string) || "https://apexluxuryestates.com";
const twitterHandle = (import.meta.env?.VITE_TWITTER_HANDLE as string) || "@apex_luxury";

export const siteConfig: SiteConfig = {
  name: "Apex Luxury Real Estate & Contracting",
  shortName: "Apex Luxury",
  wordmark: "Apex",
  brandLine: "Real Estate & Contracting",
  tagline: "Architectural Excellence, Exceptional Living",
  description: "Curated portfolio of prime architectural estates, luxury villas, and bespoke residential developments across Uttarakhand.",
  url: siteUrl.replace(/\/$/, ''),
  ogImage: "/assets/apex-opengraph.png",
  twitterHandle: twitterHandle.trim() || undefined,
  contact: {
    phone: "+91 11 5555 0199",
    phoneFormatted: "+91 11 5555 0199",
    email: "inquiries@apexluxury.example.com",
    address: "Sahastradhara Boulevard, Suite 400",
    city: "Dehradun, Uttarakhand",
    country: "India",
    hours: "Mon - Sat: 9:00 AM - 7:00 PM IST"
  },
  social: {
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    youtube: "https://youtube.com"
  },
  defaultCurrency: "INR",
  demo: {
    virtualTourUrl: "https://my.matterport.com/show/?m=SxQL3iGyoDo",
  },
  images: {
    homepageHero: {
      url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=1400&fit=crop&q=80",
      alt: "Architectural luxury hillside estate with clean stone finishes",
      width: 1200,
      height: 1400,
    },
    servicesHero: {
      url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&auto=format&fit=crop&q=80",
      alt: "Comprehensive architectural design, drafting blueprints, and turnkey construction management",
      width: 1600,
      height: 900,
    },
    constructionHero: {
      url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&auto=format&fit=crop&q=80",
      alt: "Civil contracting, heavy architectural engineering and structural concrete development",
      width: 1600,
      height: 900,
    },
    aboutHero: {
      url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&auto=format&fit=crop&q=80",
      alt: "Modern geometric corporate architecture and glass facade",
      width: 1600,
      height: 900,
    },
    propertiesHero: {
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&auto=format&fit=crop&q=80",
      alt: "Ultra-luxury modern estate with manicured landscapes and architectural glass",
      width: 1600,
      height: 900,
    },
    artistryBento: {
      url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=80",
      alt: "High-precision architectural artistry and demarcated luxury estate",
      width: 1200,
      height: 800,
    },
    constructionProjects: {
      commercial: {
        url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop&q=80",
        alt: "Metropolitan Commercial Centre, 120000 sq ft commercial development",
      },
      residential: {
        url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop&q=80",
        alt: "Riverside Luxury Residences, 150 unit luxury multi-family complex",
      },
      mixedUse: {
        url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop&q=80",
        alt: "Innovation Campus, 85000 sq ft mixed-use commercial and research center",
      },
    },
    team: {
      michael: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80",
      sarah: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80",
      david: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80",
    },
  },
};

export default siteConfig;
