import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import siteConfig from '@/config/site';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-primary-foreground relative overflow-hidden border-t border-white/5">
      {/* Background radial highlight */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="relative overflow-hidden w-10 h-10 rounded-none border border-accent/20 bg-[#0c0d10] flex items-center justify-center">
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
                <span className="text-[16px] uppercase tracking-[0.3em] font-black font-display text-white leading-none mb-1.5 group-hover:text-accent transition-colors duration-500">
                  {siteConfig.wordmark}<span className="text-accent group-hover:text-white transition-colors duration-500">.</span>
                </span>
                <span className="text-[8px] uppercase tracking-[0.4em] font-mono text-white/50 leading-none">
                  {siteConfig.brandLine}
                </span>
              </div>
            </div>
            <p className="text-primary-foreground/70 leading-relaxed text-sm">
              {t('footer.about')}
            </p>
            <div className="flex space-x-3.5 pt-2">
              <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" aria-label={`${siteConfig.shortName} on Facebook`} className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-white/60 hover:text-accent hover:bg-white/10 transition-all border border-white/10">
                <Facebook size={16} />
              </a>
              <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer" aria-label={`${siteConfig.shortName} on Twitter`} className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-white/60 hover:text-accent hover:bg-white/10 transition-all border border-white/10">
                <Twitter size={16} />
              </a>
              <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${siteConfig.shortName} on LinkedIn`} className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-white/60 hover:text-accent hover:bg-white/10 transition-all border border-white/10">
                <Linkedin size={16} />
              </a>
              <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" aria-label={`${siteConfig.shortName} on Instagram`} className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-white/60 hover:text-accent hover:bg-white/10 transition-all border border-white/10">
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold mb-5 uppercase tracking-wider text-accent">
              {t('footer.navigation')}
            </h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="text-primary-foreground/75 hover:text-accent transition-colors font-medium">{t('nav.home')}</Link></li>
              <li><Link to="/properties" className="text-primary-foreground/75 hover:text-accent transition-colors font-medium">{t('nav.properties')}</Link></li>
              <li><Link to="/services" className="text-primary-foreground/75 hover:text-accent transition-colors font-medium">{t('nav.services')}</Link></li>
              <li><Link to="/construction" className="text-primary-foreground/75 hover:text-accent transition-colors font-medium">{t('nav.construction')}</Link></li>
              <li><Link to="/real-estate" className="text-primary-foreground/75 hover:text-accent transition-colors font-medium">{t('nav.realEstate')}</Link></li>
              <li><Link to="/about" className="text-primary-foreground/75 hover:text-accent transition-colors font-medium">{t('nav.about')}</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-bold mb-5 uppercase tracking-wider text-accent">
              {t('footer.offerings')}
            </h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70 font-medium">
              <li>{t('services.residential')}</li>
              <li>{t('services.realEstate')}</li>
              <li>{t('services.consulting')}</li>
              <li>{t('footer.infrastructure')}</li>
              <li>{t('footer.isoAudits')}</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-bold mb-5 uppercase tracking-wider text-accent">
              {t('nav.contact')}
            </h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-start space-x-3.5">
                <MapPin size={16} className="text-accent mt-1 flex-shrink-0" />
                <span className="text-primary-foreground/70 leading-relaxed font-medium">
                  {siteConfig.contact.address}, {siteConfig.contact.city}, {siteConfig.contact.country}
                </span>
              </div>
              <div className="flex items-center space-x-3.5">
                <Phone size={16} className="text-accent flex-shrink-0" />
                <a href={`tel:${siteConfig.contact.phone}`} className="text-primary-foreground/70 hover:text-accent transition-colors font-bold">
                  {siteConfig.contact.phoneFormatted}
                </a>
              </div>
              <div className="flex items-center space-x-3.5">
                <Mail size={16} className="text-accent flex-shrink-0" />
                <a href={`mailto:${siteConfig.contact.email}`} className="text-primary-foreground/70 hover:text-accent transition-colors font-medium">
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="border-t border-white/10 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-1.5 text-xs text-primary-foreground/50">
              <Sparkles size={12} className="text-accent" />
              <span>{t('footer.rights', { year: new Date().getFullYear(), company: siteConfig.name })}</span>
            </div>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-xs font-semibold uppercase tracking-[0.15em] text-primary-foreground/50 hover:text-accent transition-colors"
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