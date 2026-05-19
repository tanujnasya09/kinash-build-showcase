import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const Footer = () => {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-primary text-primary-foreground relative overflow-hidden border-t border-white/5">
      {/* Background radial highlight */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img
                src="/assets/logo.png"
                alt="Kinash Logo"
                className="h-10 w-10 object-contain rounded-xl border border-white/10 shadow-soft bg-white/5"
                onError={(e: any) => {
                  e.target.src = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=80&h=80&fit=crop";
                }}
              />
              <h3 className="text-2xl font-display font-extrabold text-white">
                Kinash <span className="text-accent font-light">Luxury</span>
              </h3>
            </div>
            <p className="text-primary-foreground/70 leading-relaxed text-sm">
              {language === 'en' 
                ? 'Building exceptional spaces and creating lasting value through innovative construction and premium real estate solutions in Uttarakhand.'
                : language === 'es'
                ? 'Construyendo espacios excepcionales y creando valor duradero mediante construcciones innovadoras y soluciones inmobiliarias de primera clase.'
                : 'Schaffung außergewöhnlicher Räume und nachhaltiger Werte durch innovative Bauprojekte und erstklassige Immobilienlösungen.'}
            </p>
            <div className="flex space-x-3.5 pt-2">
              <a href="#" className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-white/60 hover:text-accent hover:bg-white/10 transition-all border border-white/10">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-white/60 hover:text-accent hover:bg-white/10 transition-all border border-white/10">
                <Twitter size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-white/60 hover:text-accent hover:bg-white/10 transition-all border border-white/10">
                <Linkedin size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-white/60 hover:text-accent hover:bg-white/10 transition-all border border-white/10">
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold mb-5 uppercase tracking-wider text-accent">
              {language === 'en' ? 'Core Navigation' : 'Navegación'}
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
              {language === 'en' ? 'Core Offerings' : 'Ofertas'}
            </h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70 font-medium">
              <li>{t('services.residential')}</li>
              <li>{t('services.realEstate')}</li>
              <li>{t('services.consulting')}</li>
              <li>{language === 'en' ? 'Infrastructure Contracting' : 'Contratos de Infraestructura'}</li>
              <li>{language === 'en' ? 'ISO Quality Audits' : 'Auditorías de Calidad ISO'}</li>
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
                  Dehradun, Uttarakhand, India
                </span>
              </div>
              <div className="flex items-center space-x-3.5">
                <Phone size={16} className="text-accent flex-shrink-0" />
                <a href="tel:+911352779000" className="text-primary-foreground/70 hover:text-accent transition-colors font-bold">
                  +91 135 277 9000
                </a>
              </div>
              <div className="flex items-center space-x-3.5">
                <Mail size={16} className="text-accent flex-shrink-0" />
                <a href="mailto:contact@kinash.luxury" className="text-primary-foreground/70 hover:text-accent transition-colors font-medium">
                  contact@kinash.luxury
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
              <span>© {new Date().getFullYear()} Kinash Associates & Construction. All rights reserved.</span>
            </div>
            <div className="flex space-x-6 text-xs font-semibold">
              <a href="#" className="text-primary-foreground/50 hover:text-accent transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-primary-foreground/50 hover:text-accent transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;