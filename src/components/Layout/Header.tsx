import { useState, useEffect } from 'react';
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
import gsap from 'gsap';

import siteConfig from '@/config/site';
import { currencies } from '@/lib/currency';
import { languages, type Language } from '@/i18n';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, currency, setCurrency, t } = useLanguage();

  const navigation = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.properties'), href: '/properties' },
    { name: t('nav.services'), href: '/services' },
    { name: t('nav.construction'), href: '/construction' },
    { name: t('nav.realEstate'), href: '/real-estate' },
    { name: t('nav.about'), href: '/about' },
  ];

  const isActive = (href: string) => location.pathname === href;

  const handleLanguageChange = (lang: Language) => {
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
            <span>{siteConfig.shortName} Portfolios</span>
          </div>
          <div className="flex items-center space-x-6">
            <a href={`tel:${siteConfig.contact.phone}`} className="flex items-center space-x-1.5 hover:text-accent transition-colors">
              <Phone size={10} className="text-accent" />
              <span>{siteConfig.contact.phoneFormatted}</span>
            </a>
            <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center space-x-1.5 hover:text-accent transition-colors">
              <Mail size={10} className="text-accent" />
              <span>{siteConfig.contact.email}</span>
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
              <img
                src="/assets/logo.png"
                alt={`${siteConfig.shortName} logo`}
                className="w-full h-full object-contain p-1 group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=80&h=80&fit=crop";
                }}
              />
              <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[14px] uppercase tracking-[0.3em] font-black font-display text-white leading-none mb-1 group-hover:text-accent transition-colors duration-500">
                {siteConfig.wordmark}<span className="text-accent group-hover:text-white transition-colors duration-500">.</span>
              </span>
              <span className="text-[7px] uppercase tracking-[0.4em] font-mono text-white/50 leading-none">
                {siteConfig.brandLine}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative text-xs font-sans font-bold tracking-[0.15em] uppercase transition-colors duration-300 py-2 ${
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
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label={t('nav.language')}
                  className="gap-1.5 bg-transparent border border-white/10 text-white hover:text-white hover:bg-white/10 hover:border-accent/40 rounded-none px-3.5 py-4 font-mono font-bold text-[9px] uppercase tracking-widest transition-all"
                >
                  <Globe size={12} className="text-accent" />
                  {language.slice(0, 2).toUpperCase()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-[#0b0c10] border border-white/10 rounded-none shadow-2xl p-1">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`font-mono text-[9px] py-2 px-4 rounded-none cursor-pointer tracking-widest uppercase transition-colors ${
                      language === lang.code ? 'bg-accent text-[#0c0d10] font-extrabold' : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {lang.label} ({lang.short})
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Currency picker — one-line rebrand in site.ts changes the default */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label={t('nav.currency')}
                  className="gap-1.5 bg-transparent border border-white/10 text-white hover:text-white hover:bg-white/10 hover:border-accent/40 rounded-none px-3.5 py-4 font-mono font-bold text-[10px] uppercase tracking-widest transition-all"
                >
                  {currency.code}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-[#0b0c10] border border-white/10 rounded-none shadow-2xl p-1">
                {currencies.map((c) => (
                  <DropdownMenuItem
                    key={c.code}
                    onClick={() => setCurrency(c.code)}
                    className={`font-mono text-[10px] py-2 px-4 rounded-none cursor-pointer tracking-widest uppercase ${
                      currency.code === c.code ? 'bg-accent text-[#0c0d10] font-extrabold' : 'text-white/80 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {c.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* CTA Contact link */}
            <Link
              to="/contact"
              className="btn-luxury-gold px-6 py-3.5 text-[9px] tracking-[0.25em] bg-accent text-[#0c0d10] border-transparent font-black"
            >
              {t('nav.contact')}
            </Link>
          </div>

          {/* Mobile buttons */}
          <div className="flex xl:hidden items-center gap-2">
            {/* Quick lang swap — only below md, where the desktop picker is hidden */}
            <div className="md:hidden flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  aria-label={t('nav.language')}
                  className="p-3 min-w-[44px] min-h-[44px] flex items-center justify-center border border-white/10 rounded-none bg-transparent hover:bg-white/10 text-white hover:text-white hover:border-accent/40 transition-all"
                >
                  <Globe size={16} className="text-accent" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-[#0b0c10] border border-white/10 rounded-none p-1">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`font-mono text-[10px] tracking-widest uppercase py-2 cursor-pointer transition-colors ${
                      language === lang.code ? 'bg-accent text-[#0c0d10] font-extrabold' : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {lang.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  aria-label={t('nav.currency')}
                  className="p-3 min-h-[44px] flex items-center justify-center gap-1 border border-white/10 rounded-none bg-transparent hover:bg-white/10 text-white hover:text-white hover:border-accent/40 font-mono text-[10px] font-bold tracking-widest transition-all"
                >
                  {currency.code}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-[#0b0c10] border border-white/10 rounded-none p-1">
                {currencies.map((c) => (
                  <DropdownMenuItem
                    key={c.code}
                    onClick={() => setCurrency(c.code)}
                    className={`font-mono text-[10px] tracking-widest uppercase py-2 ${
                      currency.code === c.code ? 'text-accent' : 'text-white/80'
                    }`}
                  >
                    {c.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
              aria-expanded={isMenuOpen}
              className="p-3 min-w-[44px] min-h-[44px] flex items-center justify-center text-white border border-white/10 rounded-none hover:bg-white/5"
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        {isMenuOpen && (
          <div className="xl:hidden py-4 border-t border-white/5 animate-fade-in bg-[#0c0d10]">
            <nav className="space-y-2 px-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-3 px-4 rounded-none text-sm font-sans font-bold uppercase tracking-[0.12em] ${
                    isActive(item.href)
                      ? 'bg-accent text-[#0c0d10] font-extrabold'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  } transition-all`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-white/5 pt-4 mt-4 px-2">
                <Button asChild className="btn-luxury-gold w-full bg-accent text-[#0c0d10] border-transparent font-bold py-4 text-[9px] tracking-widest uppercase">
                  <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                    {t('nav.contact')}
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;