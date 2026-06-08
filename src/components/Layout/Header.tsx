import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, Globe, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import MagneticButton from '@/components/ui/MagneticButton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import gsap from 'gsap';

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

  // Animate header entry
  useEffect(() => {
    gsap.fromTo(
      '.luxury-header',
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 0.5 }
    );
  }, []);

  return (
    <header className="luxury-header fixed top-0 left-0 right-0 z-50 bg-[#0c0d10]/85 backdrop-blur-md border-b border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
      <div className="container mx-auto px-4 md:px-8">
        {/* Top bar with contact info */}
        <div className="hidden md:flex items-center justify-between py-2 text-[10px] text-white/50 border-b border-white/5 font-mono uppercase tracking-[0.2em]">
          <div className="flex items-center gap-1.5">
            <Sparkles size={11} className="text-accent animate-pulse" />
            <span>Kinash Luxury Portfolios</span>
          </div>
          <div className="flex items-center space-x-6">
            <a href="tel:+911352779000" className="flex items-center space-x-1.5 hover:text-accent transition-colors">
              <Phone size={10} className="text-accent" />
              <span>+91 135 277 9000</span>
            </a>
            <a href="mailto:contact@kinash.luxury" className="flex items-center space-x-1.5 hover:text-accent transition-colors">
              <Mail size={10} className="text-accent" />
              <span>contact@kinash.luxury</span>
            </a>
          </div>
        </div>

        {/* Main navigation */}
        <div className="flex items-center justify-between py-4">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 text-2xl font-display font-black text-white hover:text-accent transition-colors group"
          >
            <div className="relative overflow-hidden w-9 h-9 rounded-none border border-accent/20 bg-[#0c0d10] flex items-center justify-center">
              <span className="text-accent font-display font-extrabold text-sm tracking-tighter group-hover:scale-110 transition-transform duration-500">KA</span>
              <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <span className="text-sm uppercase tracking-[0.25em] font-extrabold font-display text-white">
              Kinash <span className="bg-gradient-to-r from-accent to-accent-glow bg-clip-text text-transparent italic font-light">Luxury</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative text-[10px] font-sans font-bold tracking-[0.2em] uppercase transition-colors duration-300 py-2 ${
                  isActive(item.href) ? 'text-accent' : 'text-white/60 hover:text-white'
                } group`}
              >
                {item.name}
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] bg-accent transition-all duration-500 ${
                  isActive(item.href) ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            ))}
          </nav>

          {/* Right Action panel */}
          <div className="hidden md:flex items-center gap-6">
            {/* Elegant Multilingual Picker */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1.5 hover:bg-white/5 border border-white/10 text-white rounded-none px-3.5 py-4 font-mono font-bold text-[9px] uppercase tracking-widest bg-transparent">
                  <Globe size={12} className="text-accent" />
                  {language === 'en' ? 'EN' : language === 'es' ? 'ES' : 'DE'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-[#0b0c10] border border-white/10 rounded-none shadow-2xl p-1">
                <DropdownMenuItem
                  onClick={() => handleLanguageChange('en')}
                  className={`font-mono text-[9px] py-2 px-4 rounded-none cursor-pointer tracking-widest uppercase ${
                    language === 'en' ? 'bg-accent text-[#0c0d10] font-extrabold' : 'text-white/80 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  🇬🇧 English (EN)
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleLanguageChange('es')}
                  className={`font-mono text-[9px] py-2 px-4 rounded-none cursor-pointer tracking-widest uppercase ${
                    language === 'es' ? 'bg-accent text-[#0c0d10] font-extrabold' : 'text-white/80 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  🇪🇸 Español (ES)
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleLanguageChange('de')}
                  className={`font-mono text-[9px] py-2 px-4 rounded-none cursor-pointer tracking-widest uppercase ${
                    language === 'de' ? 'bg-accent text-[#0c0d10] font-extrabold' : 'text-white/80 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  🇩🇪 Deutsch (DE)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* CTA Contact link wrapped in MagneticButton */}
            <Link to="/contact">
              <MagneticButton
                className="btn-luxury-gold px-6 py-3.5 text-[9px] tracking-[0.25em] bg-accent text-[#0c0d10] border-transparent font-black"
                strength={25}
              >
                {t('nav.contact')}
              </MagneticButton>
            </Link>
          </div>

          {/* Mobile buttons */}
          <div className="flex md:hidden items-center gap-2">
            {/* Quick lang swap for mobile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 border border-white/10 rounded-none hover:bg-white/5 text-white">
                  <Globe size={16} className="text-accent" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-[#0b0c10] border border-white/10 rounded-none p-1">
                <DropdownMenuItem onClick={() => handleLanguageChange('en')} className="font-mono text-[9px] tracking-widest uppercase py-2 text-white/80">
                  🇬🇧 EN
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange('es')} className="font-mono text-[9px] tracking-widest uppercase py-2 text-white/80">
                  🇪🇸 ES
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange('de')} className="font-mono text-[9px] tracking-widest uppercase py-2 text-white/80">
                  🇩🇪 DE
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-white border border-white/10 rounded-none hover:bg-white/5"
            >
              {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/5 animate-fade-in bg-[#0c0d10]">
            <nav className="space-y-2 px-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-3 px-4 rounded-none text-[10px] font-sans font-bold uppercase tracking-[0.2em] ${
                    isActive(item.href)
                      ? 'bg-accent text-[#0c0d10] font-extrabold'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  } transition-all`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-white/5 pt-4 mt-4 px-2">
                <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                  <Button className="btn-luxury-gold w-full bg-accent text-[#0c0d10] border-transparent font-bold py-4 text-[9px] tracking-widest uppercase">
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