import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, Globe, Sparkles, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
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
  const { theme, toggleTheme } = useTheme();

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
    <header className="luxury-header fixed top-0 left-0 right-0 z-50 bg-[#f8f7f4]/90 dark:bg-[#0c0d10]/90 backdrop-blur-md border-b border-black/10 dark:border-white/5 shadow-xs dark:shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-colors">
      <div className="container mx-auto px-4 md:px-8">
        {/* Top bar with contact info */}
        <div className="hidden md:flex items-center justify-between py-2 text-[10px] text-foreground/60 dark:text-white/50 border-b border-black/10 dark:border-white/5 font-mono uppercase tracking-[0.2em]">
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

        {/* Main navigation row: Left Logo, Center Page Links, Right Action Toolbar */}
        <div className="flex items-center justify-between py-3.5 relative">
          {/* Left: Brand Logo & Tagline */}
          <div className="flex-1 flex items-center justify-start min-w-0">
            <Link
              to="/"
              className="flex items-center gap-3 text-2xl font-display font-black text-foreground dark:text-white hover:text-accent transition-colors group shrink-0"
            >
              <div className="relative overflow-hidden w-9 h-9 rounded-none border border-black/10 dark:border-accent/20 bg-white dark:bg-[#0c0d10] flex items-center justify-center shadow-xs">
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
                <span className="text-[14px] uppercase tracking-[0.3em] font-black font-display text-foreground dark:text-white leading-none mb-1 group-hover:text-accent transition-colors duration-500">
                  {siteConfig.wordmark}<span className="text-accent group-hover:text-foreground dark:group-hover:text-white transition-colors duration-500">.</span>
                </span>
                <span className="text-[7px] uppercase tracking-[0.4em] font-mono text-muted-foreground dark:text-white/50 leading-none">
                  {siteConfig.brandLine}
                </span>
              </div>
            </Link>
          </div>

          {/* Center: All Page Navigation Links - Mathematically Centered */}
          <nav className="hidden lg:flex items-center justify-center gap-4 xl:gap-7 absolute left-1/2 -translate-x-1/2 z-10 pointer-events-auto">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative text-xs font-sans font-bold tracking-[0.14em] uppercase transition-colors duration-300 py-2 ${
                  isActive(item.href)
                    ? 'text-accent font-extrabold'
                    : 'text-foreground/75 dark:text-white/60 hover:text-foreground dark:hover:text-white'
                } group`}
              >
                {item.name}
                <span
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[1.5px] bg-accent transition-all duration-300 ${
                    isActive(item.href) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Right: Actions (Language, Currency, Theme Toggle, Contact Button) */}
          <div className="hidden lg:flex flex-1 items-center justify-end gap-2.5 xl:gap-3 min-w-0">
            {/* Multilingual Picker */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  aria-label={t('nav.language')}
                  className="h-9.5 px-3 gap-1.5 bg-transparent border-black/15 dark:border-white/10 text-foreground dark:text-white hover:text-accent dark:hover:text-accent hover:border-accent/40 rounded-none font-mono font-bold text-[9px] uppercase tracking-widest transition-all cursor-pointer"
                >
                  <Globe size={12} className="text-accent" />
                  <span>{language.slice(0, 2).toUpperCase()}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white dark:bg-[#0b0c10] border border-black/10 dark:border-white/10 rounded-none shadow-2xl p-1 z-50">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`font-mono text-[9px] py-2 px-4 rounded-none cursor-pointer tracking-widest uppercase transition-colors ${
                      language === lang.code
                        ? 'bg-accent text-[#0c0d10] font-extrabold'
                        : 'text-foreground/80 dark:text-white/80 hover:bg-black/5 dark:hover:bg-white/10 hover:text-foreground dark:hover:text-white'
                    }`}
                  >
                    {lang.label} ({lang.short})
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Currency picker */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  aria-label={t('nav.currency')}
                  className="h-9.5 px-3 gap-1.5 bg-transparent border-black/15 dark:border-white/10 text-foreground dark:text-white hover:text-accent dark:hover:text-accent hover:border-accent/40 rounded-none font-mono font-bold text-[10px] uppercase tracking-widest transition-all cursor-pointer"
                >
                  <span>{currency.code}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white dark:bg-[#0b0c10] border border-black/10 dark:border-white/10 rounded-none shadow-2xl p-1 z-50">
                {currencies.map((c) => (
                  <DropdownMenuItem
                    key={c.code}
                    onClick={() => setCurrency(c.code)}
                    className={`font-mono text-[10px] py-2 px-4 rounded-none cursor-pointer tracking-widest uppercase ${
                      currency.code === c.code
                        ? 'bg-accent text-[#0c0d10] font-extrabold'
                        : 'text-foreground/80 dark:text-white/80 hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground dark:hover:text-white'
                    }`}
                  >
                    {c.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle (Light / Dark Mode) */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="h-9.5 px-3 gap-1.5 bg-transparent border-black/15 dark:border-white/10 text-foreground dark:text-white hover:text-accent dark:hover:text-accent hover:border-accent/40 rounded-none font-mono font-bold text-[10px] uppercase tracking-widest transition-all cursor-pointer group"
            >
              {theme === 'dark' ? (
                <>
                  <Sun size={13} className="text-accent group-hover:rotate-45 transition-transform duration-300" />
                  <span className="hidden xl:inline text-[9px]">LIGHT</span>
                </>
              ) : (
                <>
                  <Moon size={13} className="text-accent group-hover:-rotate-12 transition-transform duration-300" />
                  <span className="hidden xl:inline text-[9px]">DARK</span>
                </>
              )}
            </Button>

            {/* CTA Contact Button */}
            <Button
              asChild
              className="h-9.5 px-5 bg-accent text-[#0c0d10] hover:bg-accent-glow font-display font-black text-[9px] uppercase tracking-[0.22em] rounded-none border border-accent hover:border-accent-glow shadow-[0_4px_16px_rgba(223,186,72,0.22)] flex items-center justify-center transition-all shrink-0 cursor-pointer"
            >
              <Link to="/contact">
                {t('nav.contact')}
              </Link>
            </Button>
          </div>

          {/* Mobile action & menu buttons (visible on < lg) */}
          <div className="flex lg:hidden items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  aria-label={t('nav.language')}
                  className="p-2 min-w-[38px] min-h-[38px] flex items-center justify-center border border-black/15 dark:border-white/10 rounded-none bg-transparent hover:bg-black/5 dark:hover:bg-white/10 text-foreground dark:text-white hover:border-accent/40 transition-all cursor-pointer"
                >
                  <Globe size={15} className="text-accent" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white dark:bg-[#0b0c10] border border-black/10 dark:border-white/10 rounded-none p-1 z-50">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`font-mono text-[10px] tracking-widest uppercase py-2 cursor-pointer transition-colors ${
                      language === lang.code ? 'bg-accent text-[#0c0d10] font-extrabold' : 'text-foreground/80 dark:text-white/80 hover:bg-black/5 dark:hover:bg-white/10 hover:text-foreground dark:hover:text-white'
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
                  className="p-2 min-h-[38px] flex items-center justify-center gap-1 border border-black/15 dark:border-white/10 rounded-none bg-transparent hover:bg-black/5 dark:hover:bg-white/10 text-foreground dark:text-white hover:border-accent/40 font-mono text-[10px] font-bold tracking-widest transition-all cursor-pointer"
                >
                  {currency.code}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white dark:bg-[#0b0c10] border border-black/10 dark:border-white/10 rounded-none p-1 z-50">
                {currencies.map((c) => (
                  <DropdownMenuItem
                    key={c.code}
                    onClick={() => setCurrency(c.code)}
                    className={`font-mono text-[10px] tracking-widest uppercase py-2 cursor-pointer ${
                      currency.code === c.code ? 'text-accent font-bold' : 'text-foreground/80 dark:text-white/80'
                    }`}
                  >
                    {c.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-2 min-w-[38px] min-h-[38px] flex items-center justify-center border border-black/15 dark:border-white/10 rounded-none bg-transparent hover:bg-black/5 dark:hover:bg-white/10 text-foreground dark:text-white hover:text-accent hover:border-accent/40 transition-all cursor-pointer"
            >
              {theme === 'dark' ? (
                <Sun size={15} className="text-accent" />
              ) : (
                <Moon size={15} className="text-accent" />
              )}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
              aria-expanded={isMenuOpen}
              className="p-2 min-w-[38px] min-h-[38px] flex items-center justify-center text-foreground dark:text-white border border-black/15 dark:border-white/10 rounded-none hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
            >
              {isMenuOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-black/10 dark:border-white/5 animate-fade-in bg-[#f8f7f4] dark:bg-[#0c0d10]">
            <nav className="space-y-2 px-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-3 px-4 rounded-none text-sm font-sans font-bold uppercase tracking-[0.12em] ${
                    isActive(item.href)
                      ? 'bg-accent text-[#0c0d10] font-extrabold'
                      : 'text-foreground/80 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground dark:hover:text-white'
                  } transition-all`}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile theme switch row inside menu */}
              <div className="border-t border-black/10 dark:border-white/5 pt-3 mt-3 px-3 flex items-center justify-between">
                <span className="text-[10px] uppercase font-mono tracking-widest text-muted-foreground dark:text-white/50">
                  Theme Appearance
                </span>
                <button
                  onClick={toggleTheme}
                  className="inline-flex items-center gap-2 px-3 py-2 border border-black/15 dark:border-white/10 text-[10px] font-mono uppercase tracking-widest text-foreground dark:text-white hover:border-accent/40 bg-black/5 dark:bg-white/5 transition-all cursor-pointer"
                >
                  {theme === 'dark' ? (
                    <>
                      <Sun size={13} className="text-accent" />
                      <span>Switch to Light</span>
                    </>
                  ) : (
                    <>
                      <Moon size={13} className="text-accent" />
                      <span>Switch to Dark</span>
                    </>
                  )}
                </button>
              </div>

              <div className="border-t border-black/10 dark:border-white/5 pt-4 mt-4 px-2">
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