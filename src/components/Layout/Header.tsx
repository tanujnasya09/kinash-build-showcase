import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, Globe, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const navigation = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.properties'), href: '/properties' },
    { name: t('nav.services'), href: '/services' },
    { name: t('nav.construction'), href: '/construction' },
    { name: t('nav.realEstate'), href: '/real-estate' },
    { name: t('nav.about'), href: '/about' },
  ];

  const isActive = (href: string) => location.pathname === href;

  const handleLanguageChange = (lang: 'en' | 'es' | 'de') => {
    setLanguage(lang);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-border shadow-soft">
      <div className="container mx-auto px-4">
        {/* Top bar with contact info */}
        <div className="hidden md:flex items-center justify-between py-2 text-[11px] text-muted-foreground border-b border-border font-medium">
          <div className="flex items-center gap-1">
            <Sparkles size={12} className="text-accent animate-pulse" />
            <span>Kinash Luxury Portfolios</span>
          </div>
          <div className="flex items-center space-x-6">
            <a href="tel:+911352779000" className="flex items-center space-x-1.5 hover:text-primary transition-colors">
              <Phone size={12} className="text-accent" />
              <span>+91 135 277 9000</span>
            </a>
            <a href="mailto:contact@kinash.luxury" className="flex items-center space-x-1.5 hover:text-primary transition-colors">
              <Mail size={12} className="text-accent" />
              <span>contact@kinash.luxury</span>
            </a>
          </div>
        </div>

        {/* Main navigation */}
        <div className="flex items-center justify-between py-2">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 text-2xl font-display font-black text-primary hover:text-accent transition-colors"
          >
            <img
              src="/assets/logo.png"
              alt="Kinash Logo"
              className="h-10 w-10 object-contain rounded-xl border shadow-soft bg-muted"
              onError={(e: any) => {
                // Safe fallback logo link if local logo is missing
                e.target.src = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=80&h=80&fit=crop";
              }}
            />
            <span className="text-lg uppercase tracking-wider font-extrabold font-display">
              Kinash <span className="text-accent font-light">Luxury</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-7">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`nav-link text-xs font-bold tracking-wider uppercase ${isActive(item.href) ? 'active text-accent' : ''}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Action panel */}
          <div className="hidden md:flex items-center gap-4">
            
            {/* Elegant Multilingual Picker */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1.5 hover:bg-muted/80 rounded-xl px-3 border py-4 font-bold text-xs">
                  <Globe size={14} className="text-accent" />
                  {language === 'en' ? '🇬🇧 EN' : language === 'es' ? '🇪🇸 ES' : '🇩🇪 DE'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white border rounded-xl shadow-elegant p-1.5">
                <DropdownMenuItem
                  onClick={() => handleLanguageChange('en')}
                  className={`font-semibold text-xs py-2.5 rounded-lg px-4 ${language === 'en' ? 'bg-primary text-white' : 'hover:bg-muted'}`}
                >
                  🇬🇧 English (EN)
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleLanguageChange('es')}
                  className={`font-semibold text-xs py-2.5 rounded-lg px-4 ${language === 'es' ? 'bg-primary text-white' : 'hover:bg-muted'}`}
                >
                  🇪🇸 Español (ES)
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleLanguageChange('de')}
                  className={`font-semibold text-xs py-2.5 rounded-lg px-4 ${language === 'de' ? 'bg-primary text-white' : 'hover:bg-muted'}`}
                >
                  🇩🇪 Deutsch (DE)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* CTA Contact link */}
            <Link to="/contact">
              <Button className="btn-primary py-2.5 px-5 text-xs tracking-wider uppercase font-bold rounded-xl shadow-soft">
                {t('nav.contact')}
              </Button>
            </Link>
          </div>

          {/* Mobile buttons */}
          <div className="flex md:hidden items-center gap-2">
            {/* Quick lang swap for mobile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 border rounded-xl hover:bg-muted text-primary">
                  <Globe size={18} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white border rounded-xl p-1.5">
                <DropdownMenuItem onClick={() => handleLanguageChange('en')} className="font-semibold text-xs py-2">
                  🇬🇧 EN
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange('es')} className="font-semibold text-xs py-2">
                  🇪🇸 ES
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange('de')} className="font-semibold text-xs py-2">
                  🇩🇪 DE
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-primary border rounded-xl hover:bg-muted"
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in bg-white">
            <nav className="space-y-3 px-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-3 px-4 rounded-xl text-sm font-bold uppercase tracking-wider ${isActive(item.href)
                      ? 'bg-primary text-white font-extrabold'
                      : 'text-foreground hover:bg-muted'
                    } transition-all`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t pt-4 mt-4 px-2">
                <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                  <Button className="btn-primary w-full py-3.5 text-xs font-bold tracking-wider uppercase rounded-xl">
                    {t('nav.contact')}
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;