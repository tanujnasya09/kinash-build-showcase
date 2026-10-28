'use client';

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Compass,
  Building2,
  Briefcase,
  Phone,
  Menu,
  Globe,
  Sun,
  Moon,
  ArrowUpRight,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { languages, type Language } from '@/i18n';
import { currencies } from '@/lib/currency';
import siteConfig from '@/config/site';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

export default function MobileBottomNav() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, currency, setCurrency, t } = useLanguage();
  const { theme, toggleTheme, mounted } = useTheme();

  // On individual property detail pages, Property.tsx provides its own dedicated conversion bar.
  // We yield to avoid overlapping bottom bars.
  const isPropertyDetailPage =
    location.pathname.startsWith('/property/') ||
    (location.pathname.startsWith('/properties/') && location.pathname.split('/').length > 2);

  if (isPropertyDetailPage) {
    return null;
  }

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const navItems = [
    {
      label: t('nav.home') || 'Home',
      href: '/',
      icon: Compass,
    },
    {
      label: t('nav.properties') || 'Portfolio',
      href: '/properties',
      icon: Building2,
    },
    {
      label: t('nav.services') || 'Services',
      href: '/services',
      icon: Briefcase,
    },
    {
      label: 'Contact',
      href: '/contact',
      icon: Phone,
    },
  ];

  const secondaryLinks = [
    { name: t('nav.construction') || 'Construction', href: '/construction' },
    { name: t('nav.realEstate') || 'Real Estate Advisory', href: '/real-estate' },
    { name: t('nav.about') || 'The Atelier & Heritage', href: '/about' },
  ];

  return (
    <>
      {/* Docked Mobile Bottom Navigation Bar (Apple HIG & Material 3 Ergonomic Zone) */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#f8f7f4]/95 dark:bg-[#0c0d10]/95 backdrop-blur-xl border-t border-black/10 dark:border-white/10 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_-12px_40px_rgba(0,0,0,0.6)]"
        style={{
          paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom, 0px))',
        }}
      >
        <div className="grid grid-cols-5 items-center justify-around px-1 pt-1.5 pb-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                to={item.href}
                className="group relative flex flex-col items-center justify-center min-h-[46px] py-1 px-1 touch-target active-tactile transition-colors"
                aria-current={active ? 'page' : undefined}
              >
                {/* Active Top Gold Hairline Indicator */}
                {active && (
                  <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-6 h-[2px] bg-accent shadow-[0_0_8px_rgba(223,186,72,0.6)]" />
                )}

                <Icon
                  size={19}
                  strokeWidth={active ? 2.2 : 1.7}
                  className={`transition-colors duration-200 ${
                    active
                      ? 'text-accent'
                      : 'text-foreground/60 dark:text-white/55 group-hover:text-accent'
                  }`}
                />
                <span
                  className={`font-mono text-[9px] uppercase tracking-wider mt-1 transition-colors leading-none whitespace-nowrap ${
                    active
                      ? 'text-accent font-bold'
                      : 'text-foreground/70 dark:text-white/60 group-hover:text-foreground dark:group-hover:text-white'
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}

          {/* 5th Tab: Concierge / Menu Sheet Trigger */}
          <button
            type="button"
            onClick={() => setIsSheetOpen(true)}
            aria-label="Open Concierge Menu"
            className="group relative flex flex-col items-center justify-center min-h-[46px] py-1 px-1 touch-target active-tactile transition-colors cursor-pointer"
          >
            {isSheetOpen && (
              <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-6 h-[2px] bg-accent" />
            )}
            <Menu
              size={19}
              strokeWidth={1.7}
              className="text-foreground/60 dark:text-white/55 group-hover:text-accent transition-colors"
            />
            <span className="font-mono text-[9px] uppercase tracking-wider mt-1 text-foreground/70 dark:text-white/60 group-hover:text-foreground dark:group-hover:text-white transition-colors leading-none whitespace-nowrap">
              Menu
            </span>
          </button>
        </div>
      </nav>

      {/* Ergonomic Swipeable Bottom Sheet (Drawer) */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent
          side="bottom"
          className="bg-[#f8f7f4] dark:bg-[#0c0d10] border-t border-black/15 dark:border-white/15 rounded-none p-0 max-h-[85vh] overflow-y-auto touch-scroll shadow-2xl"
          style={{
            paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom, 0px))',
          }}
        >
          {/* Tactile Drag Handle Bar */}
          <div className="w-12 h-1 bg-black/20 dark:bg-white/20 mx-auto mt-3 mb-1" />

          {/* Header */}
          <SheetHeader className="px-5 pt-3.5 pb-3 border-b border-black/10 dark:border-white/10 text-left pr-12">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-accent inline-block shrink-0" />
              <SheetTitle className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/80 dark:text-white/80 font-bold truncate">
                {siteConfig.shortName} Concierge Directory
              </SheetTitle>
            </div>
          </SheetHeader>

          <div className="px-5 py-4 space-y-5">
            {/* Extended Architectural Directory */}
            <div>
              <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-foreground/50 dark:text-white/40 block mb-2 font-bold">
                Portfolios & Advisory
              </span>
              <div className="space-y-1">
                {secondaryLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsSheetOpen(false)}
                    className="flex items-center justify-between py-2.5 px-3 border border-black/10 dark:border-white/10 hover:border-accent/40 bg-black/5 dark:bg-white/5 active-tactile transition-all"
                  >
                    <span className="font-display font-medium text-xs sm:text-sm uppercase tracking-wider text-foreground dark:text-white">
                      {link.name}
                    </span>
                    <ArrowUpRight size={14} className="text-accent" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Language Selector */}
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <Globe size={11} className="text-accent" />
                <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-foreground/50 dark:text-white/40 font-bold">
                  {t('nav.language')}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => setLanguage(lang.code)}
                    className={`py-2 px-1 text-[9.5px] font-mono uppercase tracking-wider text-center border transition-all cursor-pointer active-tactile ${
                      language === lang.code
                        ? 'bg-accent text-white border-accent font-bold shadow-xs'
                        : 'border-black/15 dark:border-white/10 text-foreground/80 dark:text-white/70 bg-black/5 dark:bg-white/5 hover:border-accent/40'
                    }`}
                  >
                    {lang.short}
                  </button>
                ))}
              </div>
            </div>

            {/* Currency Selector */}
            <div>
              <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-foreground/50 dark:text-white/40 block mb-2 font-bold">
                {t('nav.currency')} Valuation
              </span>
              <div className="grid grid-cols-4 gap-1.5">
                {currencies.map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => setCurrency(c.code)}
                    className={`py-2 px-1 text-[9.5px] font-mono uppercase tracking-wider text-center border transition-all cursor-pointer active-tactile ${
                      currency.code === c.code
                        ? 'bg-accent text-white border-accent font-bold shadow-xs'
                        : 'border-black/15 dark:border-white/10 text-foreground/80 dark:text-white/70 bg-black/5 dark:bg-white/5 hover:border-accent/40'
                    }`}
                  >
                    {c.code}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme & Display Mode */}
            <div className="flex items-center justify-between pt-1 border-t border-black/10 dark:border-white/10">
              <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-foreground/50 dark:text-white/40 font-bold">
                Appearance
              </span>
              <button
                type="button"
                onClick={toggleTheme}
                suppressHydrationWarning
                className="inline-flex items-center gap-2 px-3 py-2 border border-black/15 dark:border-white/10 text-[9.5px] font-mono uppercase tracking-widest text-foreground dark:text-white bg-black/5 dark:bg-white/5 hover:border-accent/40 active-tactile transition-all cursor-pointer"
              >
                {mounted && theme === 'light' ? (
                  <>
                    <Moon size={12} className="text-accent" />
                    <span>Dark Obsidian</span>
                  </>
                ) : (
                  <>
                    <Sun size={12} className="text-accent" />
                    <span>Light Alabaster</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
