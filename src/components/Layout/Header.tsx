'use client';

import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, Globe, Sun, Moon } from 'lucide-react';
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
  const location = useLocation();
  const { language, setLanguage, currency, setCurrency, t } = useLanguage();
  const { theme, toggleTheme, mounted } = useTheme();

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
    <header className="luxury-header fixed top-0 left-0 right-0 z-50 bg-[#f8f7f4]/95 dark:bg-[#0c0d10]/95 backdrop-blur-md border-b border-black/10 dark:border-white/10 shadow-xs dark:shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-colors">
      <div className="container mx-auto px-4 md:px-8">
        {/* Top utility bar with contact info & controls (Matches Reference Image) */}
        <div className="hidden md:flex items-center justify-between py-1 text-[9px] sm:text-[10px] text-foreground/70 dark:text-white/60 border-b border-black/10 dark:border-white/10 font-mono uppercase tracking-[0.22em]">
          {/* Left: Star + Portfolio text */}
          <div className="flex items-center gap-2">
            <svg className="w-2.5 h-2.5 text-accent shrink-0 fill-current" viewBox="0 0 24 24">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
            <span className="font-bold tracking-[0.25em]">{siteConfig.shortName} Portfolios</span>
          </div>

          {/* Right: Phone, Email, Divider, Language, Currency, Theme */}
          <div className="flex items-center space-x-3.5 lg:space-x-4">
            <a href={`tel:${siteConfig.contact.phone}`} className="flex items-center space-x-1.5 hover:text-accent transition-colors">
              <Phone size={9} className="text-accent shrink-0" />
              <span>{siteConfig.contact.phoneFormatted}</span>
            </a>
            <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center space-x-1.5 hover:text-accent transition-colors">
              <Mail size={9} className="text-accent shrink-0" />
              <span className="lowercase font-mono">{siteConfig.contact.email}</span>
            </a>

            <span className="w-[1px] h-2.5 bg-black/15 dark:bg-white/15 mx-0.5" />

            {/* Language dropdown button */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  aria-label={t('nav.language')}
                  className="h-5.5 px-2 border border-black/15 dark:border-white/15 text-foreground dark:text-white hover:border-accent hover:text-accent font-mono font-bold text-[8.5px] uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer bg-white/40 dark:bg-white/5"
                >
                  <Globe size={9} className="text-foreground dark:text-white" />
                  <span>{language.slice(0, 2).toUpperCase()}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white dark:bg-[#0b0c10] border border-black/10 dark:border-white/10 rounded-none shadow-2xl p-1 z-50">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`font-mono text-[9px] py-1.5 px-3 rounded-none cursor-pointer tracking-widest uppercase transition-colors ${language === lang.code
                        ? 'bg-accent text-white font-extrabold'
                        : 'text-foreground/80 dark:text-white/80 hover:bg-black/5 dark:hover:bg-white/10'
                      }`}
                  >
                    {lang.label} ({lang.short})
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Currency dropdown button */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  aria-label={t('nav.currency')}
                  className="h-5.5 px-2 border border-black/15 dark:border-white/15 text-foreground dark:text-white hover:border-accent hover:text-accent font-mono font-bold text-[8.5px] uppercase tracking-wider flex items-center justify-center transition-colors cursor-pointer bg-white/40 dark:bg-white/5"
                >
                  <span>{currency.code}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white dark:bg-[#0b0c10] border border-black/10 dark:border-white/10 rounded-none shadow-2xl p-1 z-50">
                {currencies.map((c) => (
                  <DropdownMenuItem
                    key={c.code}
                    onClick={() => setCurrency(c.code)}
                    className={`font-mono text-[9px] py-1.5 px-3 rounded-none cursor-pointer tracking-widest uppercase ${currency.code === c.code
                        ? 'bg-accent text-white font-extrabold'
                        : 'text-foreground/80 dark:text-white/80 hover:bg-black/5 dark:hover:bg-white/10'
                      }`}
                  >
                    {c.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              suppressHydrationWarning
              aria-label={mounted && theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              title={mounted && theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              className="h-5.5 w-5.5 border border-black/15 dark:border-white/15 text-foreground dark:text-white hover:border-accent hover:text-accent flex items-center justify-center transition-colors cursor-pointer bg-white/40 dark:bg-white/5"
            >
              {mounted && theme === 'light' ? (
                <Moon size={9} className="text-foreground" />
              ) : (
                <Sun size={9} className="text-accent" />
              )}
            </button>
          </div>
        </div>

        {/* Main navigation row: Left Logo, Center Page Links, Right Contact Us Button (Exact Reference Layout) */}
        <div className="flex items-center justify-between py-2 sm:py-2.5">
          {/* Left: Brand Logo & Tagline (Tagline hidden on mobile < sm to prevent header collision) */}
          <div className="flex-1 flex items-center justify-start min-w-0 pr-2">
            <Link
              to="/"
              className="flex items-center gap-2 sm:gap-3 group shrink-0"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-black text-accent border border-black dark:border-white/10 flex items-center justify-center font-display font-black text-lg sm:text-2xl select-none shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-105">
                A
              </div>
              <div className="flex flex-col justify-center min-w-0">
                <span className="text-[14px] sm:text-[16px] font-display font-black uppercase tracking-[0.18em] sm:tracking-[0.25em] text-foreground dark:text-white leading-none whitespace-nowrap">
                  {siteConfig.wordmark.toUpperCase()}<span className="text-accent">.</span>
                </span>
                <span className="hidden sm:block text-[7.5px] sm:text-[8px] font-mono uppercase tracking-[0.22em] text-foreground/60 dark:text-white/50 leading-none mt-1 font-bold whitespace-nowrap">
                  {siteConfig.brandLine.toUpperCase()}
                </span>
              </div>
            </Link>
          </div>

          {/* Center: All Page Navigation Links (Mathematically Centered) */}
          <nav className="hidden lg:flex items-center justify-center gap-5 xl:gap-8 flex-shrink-0">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative text-[10.5px] xl:text-[11.5px] font-mono font-bold tracking-[0.18em] uppercase transition-colors duration-200 py-1 ${isActive(item.href)
                    ? 'text-accent'
                    : 'text-foreground/80 dark:text-white/70 hover:text-foreground dark:hover:text-white'
                  } group`}
              >
                {item.name}
                {isActive(item.href) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-accent" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right: Only CONTACT US Button */}
          <div className="hidden lg:flex flex-1 items-center justify-end">
            <Button
              asChild
              className="h-9 sm:h-9.5 px-5 sm:px-6 bg-accent text-[#0c0d10] hover:bg-accent-glow font-display font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] rounded-none border border-accent hover:border-accent-glow shadow-[0_4px_16px_rgba(186,137,29,0.25)] flex items-center justify-center transition-all cursor-pointer"
            >
              <Link to="/contact">
                {t('nav.contact')}
              </Link>
            </Button>
          </div>

          {/* Mobile action button (visible on < lg): Theme Toggle */}
          <div className="flex lg:hidden items-center shrink-0">
            <button
              onClick={toggleTheme}
              suppressHydrationWarning
              aria-label={mounted && theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              title={mounted && theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              className="touch-target active-tactile w-10 h-10 border border-black/15 dark:border-white/10 text-foreground dark:text-white hover:text-accent hover:border-accent bg-black/5 dark:bg-white/5 transition-colors cursor-pointer"
            >
              {mounted && theme === 'light' ? (
                <Moon size={15} className="text-foreground" />
              ) : (
                <Sun size={15} className="text-accent" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;