'use client';

import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import siteConfig from '@/config/site';
import { getCoreOfferings } from '@/config/services';

const Footer = () => {
  const { t, language } = useLanguage();
  const offerings = getCoreOfferings();

  return (
    <footer className="bg-[#f0ece3] dark:bg-primary text-foreground dark:text-primary-foreground relative overflow-hidden border-t border-black/10 dark:border-white/5 transition-colors">
      {/* Background radial highlight */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/10 dark:bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      
      {/* Container aligned with main sections (container mx-auto px-4 md:px-8) */}
      <div className="container mx-auto px-4 md:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Company Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-4 group cursor-pointer">
              <div className="relative overflow-hidden w-10 h-10 rounded-none border border-black/10 dark:border-accent/20 bg-white dark:bg-[#0c0d10] flex items-center justify-center shadow-xs">
                <img
                  src="/assets/logo.png"
                  alt={`${siteConfig.shortName} logo`}
                  width={40}
                  height={40}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain p-1 group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=80&h=80&fit=crop";
                  }}
                />
                <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-[16px] uppercase tracking-[0.3em] font-black font-display text-foreground dark:text-white leading-none mb-1.5 group-hover:text-accent transition-colors duration-500">
                  {siteConfig.wordmark}<span className="text-accent group-hover:text-foreground dark:group-hover:text-white transition-colors duration-500">.</span>
                </span>
                <span className="text-xs uppercase tracking-[0.3em] font-mono text-foreground/75 dark:text-white/60 leading-none">
                  {siteConfig.brandLine}
                </span>
              </div>
            </Link>
            <p className="text-foreground/80 dark:text-primary-foreground/75 leading-relaxed text-sm font-light">
              {t('footer.about')}
            </p>
            <div className="flex space-x-3 pt-2">
              {siteConfig.social.facebook && (
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${siteConfig.shortName} on Facebook`}
                  className="w-9 h-9 rounded-none bg-black/5 dark:bg-white/5 flex items-center justify-center text-foreground/70 dark:text-white/60 hover:text-accent dark:hover:text-accent hover:bg-black/10 dark:hover:bg-white/10 transition-all border border-black/10 dark:border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <Facebook size={16} />
                </a>
              )}
              {siteConfig.social.twitter && (
                <a
                  href={siteConfig.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${siteConfig.shortName} on Twitter`}
                  className="w-9 h-9 rounded-none bg-black/5 dark:bg-white/5 flex items-center justify-center text-foreground/70 dark:text-white/60 hover:text-accent dark:hover:text-accent hover:bg-black/10 dark:hover:bg-white/10 transition-all border border-black/10 dark:border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <Twitter size={16} />
                </a>
              )}
              {siteConfig.social.linkedin && (
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${siteConfig.shortName} on LinkedIn`}
                  className="w-9 h-9 rounded-none bg-black/5 dark:bg-white/5 flex items-center justify-center text-foreground/70 dark:text-white/60 hover:text-accent dark:hover:text-accent hover:bg-black/10 dark:hover:bg-white/10 transition-all border border-black/10 dark:border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <Linkedin size={16} />
                </a>
              )}
              {siteConfig.social.instagram && (
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${siteConfig.shortName} on Instagram`}
                  className="w-9 h-9 rounded-none bg-black/5 dark:bg-white/5 flex items-center justify-center text-foreground/70 dark:text-white/60 hover:text-accent dark:hover:text-accent hover:bg-black/10 dark:hover:bg-white/10 transition-all border border-black/10 dark:border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <Instagram size={16} />
                </a>
              )}
              {siteConfig.social.youtube && (
                <a
                  href={siteConfig.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${siteConfig.shortName} on YouTube`}
                  className="w-9 h-9 rounded-none bg-black/5 dark:bg-white/5 flex items-center justify-center text-foreground/70 dark:text-white/60 hover:text-accent dark:hover:text-accent hover:bg-black/10 dark:hover:bg-white/10 transition-all border border-black/10 dark:border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <Youtube size={16} />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold mb-5 uppercase tracking-wider text-accent font-display">
              {t('footer.navigation')}
            </h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="text-foreground/80 dark:text-primary-foreground/80 hover:text-accent dark:hover:text-accent transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">{t('nav.home')}</Link></li>
              <li><Link to="/properties" className="text-foreground/80 dark:text-primary-foreground/80 hover:text-accent dark:hover:text-accent transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">{t('nav.properties')}</Link></li>
              <li><Link to="/services" className="text-foreground/80 dark:text-primary-foreground/80 hover:text-accent dark:hover:text-accent transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">{t('nav.services')}</Link></li>
              <li><Link to="/construction" className="text-foreground/80 dark:text-primary-foreground/80 hover:text-accent dark:hover:text-accent transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">{t('nav.construction')}</Link></li>
              <li><Link to="/real-estate" className="text-foreground/80 dark:text-primary-foreground/80 hover:text-accent dark:hover:text-accent transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">{t('nav.realEstate')}</Link></li>
              <li><Link to="/about" className="text-foreground/80 dark:text-primary-foreground/80 hover:text-accent dark:hover:text-accent transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">{t('nav.about')}</Link></li>
            </ul>
          </div>

          {/* Core Offerings - Derived from servicesData */}
          <div>
            <h4 className="text-sm font-bold mb-5 uppercase tracking-wider text-accent font-display">
              {t('footer.offerings')}
            </h4>
            <ul className="space-y-3 text-sm text-foreground/80 dark:text-primary-foreground/75 font-medium">
              {offerings.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.link}
                    className="hover:text-accent dark:hover:text-accent transition-colors block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    {item.title[language] || item.title.en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-bold mb-5 uppercase tracking-wider text-accent font-display">
              {t('nav.contact')}
            </h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-start space-x-3.5">
                <MapPin size={16} className="text-accent mt-1 flex-shrink-0" />
                <span className="text-foreground/80 dark:text-primary-foreground/75 leading-relaxed font-medium">
                  {siteConfig.contact.address}, {siteConfig.contact.city}, {siteConfig.contact.country}
                </span>
              </div>
              <div className="flex items-center space-x-3.5">
                <Phone size={16} className="text-accent flex-shrink-0" />
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="text-foreground dark:text-primary-foreground/80 hover:text-accent dark:hover:text-accent transition-colors font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {siteConfig.contact.phoneFormatted}
                </a>
              </div>
              <div className="flex items-center space-x-3.5">
                <Mail size={16} className="text-accent flex-shrink-0" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-foreground/80 dark:text-primary-foreground/80 hover:text-accent dark:hover:text-accent transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="border-t border-black/10 dark:border-white/10 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground dark:text-primary-foreground/50">
              <Sparkles size={12} className="text-accent" />
              <span>{t('footer.rights', { year: new Date().getFullYear(), company: siteConfig.name })}</span>
            </div>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground dark:text-primary-foreground/50 hover:text-accent dark:hover:text-accent transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {t('footer.backToTop')}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;