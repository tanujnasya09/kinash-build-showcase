export interface SiteConfig {
  name: string;
  shortName: string;
  wordmark: string;
  brandLine: string;
  tagline: string;
  description: string;
  url: string;
  ogImage: string;
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
}

export const siteConfig: SiteConfig = {
  name: "Apex Luxury Real Estate & Contracting",
  shortName: "Apex Luxury",
  wordmark: "Apex",
  brandLine: "Real Estate & Contracting",
  tagline: "Architectural Excellence, Exceptional Living",
  description: "Curated portfolio of prime architectural estates, luxury villas, and bespoke residential developments across Uttarakhand.",
  url: "https://apexluxuryestates.com",
  ogImage: "/assets/apex-opengraph.png",
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
    // Matterport's official public demo space (free to embed, no third-party property).
    // Replace with your own space: https://my.matterport.com/show/?m=<your-space-id>
    virtualTourUrl: "https://my.matterport.com/show/?m=SxQL3iGyoDo",
  },
};

export default siteConfig;
