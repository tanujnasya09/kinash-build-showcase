'use client';

import { useEffect, useRef } from 'react';
import { ArrowRight, Award, Users, Building, Building2, TrendingUp, Sparkles, ShieldCheck, MapPin, Quote, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SEOHead from '@/components/SEO/SEOHead';
import { useProperties } from '@/context/PropertyContext';
import { useLanguage } from '@/context/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PropertyCard from '@/components/ui/PropertyCard';
import FeaturedPortfolioCarousel from '@/components/ui/FeaturedPortfolioCarousel';
import MagneticButton from '@/components/ui/MagneticButton';
import CountUpStat from '@/components/ui/CountUpStat';
import siteConfig from '@/config/site';
import siteStats from '@/config/siteStats';
import { getHomeDivisions } from '@/config/services';
import { formatMoneyCompact } from '@/lib/currency';
import ArchitecturalGrid from '@/components/ui/ArchitecturalGrid';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomePage() {
  const { properties } = useProperties();
  const { content, currency, language, t } = useLanguage();
  const copy = content.home;

  const heroRef = useRef<HTMLDivElement>(null);
  const bentoRef = useRef<HTMLDivElement>(null);
  const titleContainerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    let heroReveal: gsap.core.Tween | null = null;
    let bentoStagger: gsap.core.Tween | null = null;

    // 1. Hero Text Reveal Animation (Split-text effect using CSS lines)
    if (titleContainerRef.current) {
      const lines = titleContainerRef.current.querySelectorAll('.reveal-line');
      heroReveal = gsap.fromTo(lines,
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.4,
          stagger: 0.15,
          ease: 'power4.out',
          delay: 0.8,
        }
      );
    }

    // 2. Bento Grid stagger entrance with smooth lift
    if (bentoRef.current) {
      const cards = bentoRef.current.querySelectorAll('.bento-card');
      bentoStagger = gsap.fromTo(cards,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          stagger: 0.12,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: bentoRef.current,
            start: 'top 85%',
          }
        }
      );
    }

    return () => {
      if (heroReveal) heroReveal.kill();
      if (bentoStagger) {
        bentoStagger.scrollTrigger?.kill();
        bentoStagger.kill();
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [properties]);

  const stats = [
    {
      icon: Building,
      value: (
        <CountUpStat
          value={siteStats.projects.numericValue}
          suffix={siteStats.projects.suffix}
          formattedFallback={siteStats.projects.formattedRaw}
        />
      ),
      label: siteStats.projects.labels[language] || copy.statLabelPlots,
      desc: siteStats.projects.descriptions[language] || copy.statPlots,
    },
    {
      icon: Users,
      value: (
        <CountUpStat
          value={siteStats.years.numericValue}
          suffix={siteStats.years.suffix}
          formattedFallback={siteStats.years.formattedRaw}
        />
      ),
      label: siteStats.years.labels[language] || copy.statLabelHeritage,
      desc: siteStats.years.descriptions[language] || copy.statHeritage,
    },
    {
      icon: Award,
      value: (
        <CountUpStat
          value={siteStats.awards.numericValue}
          suffix={siteStats.awards.suffix}
          formattedFallback={siteStats.awards.formattedRaw}
        />
      ),
      label: siteStats.awards.labels[language] || copy.statLabelAwards,
      desc: siteStats.awards.descriptions[language] || copy.statAwards,
    },
    {
      icon: TrendingUp,
      value: `${formatMoneyCompact(siteStats.value.amountInINR!, currency.code)}+`,
      label: siteStats.value.labels[language] || copy.statLabelEquity,
      desc: siteStats.value.descriptions[language] || copy.statEquity,
    },
  ];

  return (
    <div className="bg-[#f8f7f4] dark:bg-[#0c0d10] text-foreground dark:text-white overflow-hidden">
      <SEOHead
        title={copy.meta.title}
        description={copy.meta.description}
        keywords={copy.meta.keywords}
        canonical="/"
      />

      {/* Full-screen Cinematic Hero */}
      <section
        ref={heroRef}
        className="section-hero relative flex flex-col justify-start lg:justify-center overflow-hidden bg-[#f8f7f4] dark:bg-[#0c0d10] pt-28 sm:pt-32 lg:pt-24 pb-8 sm:pb-10 lg:pb-12 min-h-0 lg:min-h-[78vh] border-b border-black/10 dark:border-white/5"
      >
        {/* Fine Architectural Grid lines */}
        <div className="absolute inset-0 flex justify-between pointer-events-none opacity-[0.03] dark:opacity-[0.03] px-12 z-0">
          <div className="w-[1px] h-full bg-black dark:bg-white" />
          <div className="w-[1px] h-full bg-black dark:bg-white hidden md:block" />
          <div className="w-[1px] h-full bg-black dark:bg-white hidden md:block" />
          <div className="w-[1px] h-full bg-black dark:bg-white" />
        </div>

        {/* Luxury Clean Background with Golden Radial Glow */}
        <div className="absolute inset-0 bg-[#f8f7f4] dark:bg-[#0c0d10] z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_40%,rgba(223,186,72,0.08),transparent_55%)] z-0 pointer-events-none" />

        {/* Mobile Ambient Architectural Vignette */}
        <div
          className="absolute inset-0 z-0 opacity-30 dark:opacity-25 bg-cover bg-right pointer-events-none lg:hidden"
          style={{
            backgroundImage: `url('${siteConfig.images.homepageHero.url}')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f8f7f4] via-[#f8f7f4]/90 to-[#f8f7f4]/50 dark:from-[#0c0d10] dark:via-[#0c0d10]/85 dark:to-[#0c0d10]/35 pointer-events-none lg:hidden z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#f8f7f4] dark:to-[#0c0d10] pointer-events-none lg:hidden z-0" />
        <ArchitecturalGrid columns={5} />

        <div className="relative z-10 container mx-auto px-4 md:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            {/* Left Column: Premium Editorial Typography & Actions */}
            <div className="lg:col-span-7 text-left flex flex-col justify-center items-start w-full">
              {/* Architectural Eyebrow Badge with Corner Accents */}
              <div
                className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 px-3.5 sm:px-4 py-1 sm:py-1.5 mb-2.5 sm:mb-4 text-accent text-[9px] font-mono font-bold tracking-[0.3em] uppercase relative shadow-xs"
              >
                <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-accent/60" />
                <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-accent/60" />
                <Sparkles size={11} className="animate-pulse text-accent" />
                <span>{copy.heroBadge}</span>
              </div>

              {/* Title with Rising text effect */}
              <h1 ref={titleContainerRef} className="text-[28px] sm:text-5xl md:text-6xl lg:text-7xl font-display font-medium leading-[1.08] mb-2.5 sm:mb-4 tracking-tight text-foreground dark:text-white [text-wrap:balance]">
                <span className="block overflow-hidden relative pb-[0.08em]">
                  <span className="reveal-line inline-block relative">
                    {copy.heroTitle1}
                  </span>
                </span>
                <span className="block overflow-hidden relative pb-[0.08em] mt-0.5 sm:mt-1">
                  <span className="reveal-line inline-block relative text-accent italic font-light">
                    {copy.heroTitle2}
                  </span>
                </span>
              </h1>

              {/* Subheading Description */}
              <p className="text-xs sm:text-sm text-foreground/75 dark:text-white/60 mb-4 sm:mb-6 max-w-xl text-left leading-relaxed font-light tracking-wide">
                {copy.heroTagline}
              </p>

              {/* Action Links - Ergonomic Mobile & Desktop Buttons */}
              <div className="flex flex-row gap-2.5 sm:gap-4 justify-start items-center w-full max-w-md">
                <MagneticButton strength={15} containerClassName="flex-1 sm:flex-initial" className="w-full sm:w-auto" as="div">
                  <Button
                    asChild
                    className="w-full sm:w-auto h-11 sm:h-12 px-4 sm:px-7 py-2.5 sm:py-3 bg-accent text-[#0c0d10] hover:bg-accent-glow font-display font-black text-[10px] sm:text-xs uppercase tracking-[0.1em] sm:tracking-[0.2em] rounded-none border border-accent hover:border-accent-glow shadow-sm hover:shadow-[0_10px_30px_rgba(223,186,72,0.35)] flex items-center justify-center gap-1.5 sm:gap-2 group transition-all whitespace-nowrap cursor-pointer"
                  >
                    <Link to="/properties">
                      <span>{copy.heroCtaProperties}</span>
                      <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </Button>
                </MagneticButton>
                <MagneticButton strength={15} containerClassName="flex-1 sm:flex-initial" className="w-full sm:w-auto" as="div">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full sm:w-auto h-11 sm:h-12 px-7 py-3 bg-white dark:bg-transparent text-foreground dark:text-white hover:hover:bg-zinc-100   dark:hover:bg-accent/25 dark:hover:border-accent dark:hover:text-white hover:border-accent font-display font-black text-xs uppercase tracking-[0.2em] rounded-none border border-black/20 dark:border-white/20 transition-all flex items-center justify-center shadow-xs hover:shadow-md cursor-pointer"
                  >
                    <Link to="/about">{copy.heroCtaAbout}</Link>
                  </Button>
                </MagneticButton>
              </div>

              {/* Editorial Architectural Metrics Bar (Direct from Reference Image 1) */}
              <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-black/10 dark:border-white/10 w-full max-w-xl">
                <div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-display font-medium text-foreground dark:text-white leading-none">
                    <CountUpStat
                      value={siteStats.projects.numericValue}
                      suffix={siteStats.projects.suffix}
                      formattedFallback={siteStats.projects.formattedRaw}
                    />
                  </div>
                  <div className="text-xs font-mono uppercase tracking-[0.16em] text-foreground/75 dark:text-white/60 mt-1.5 font-medium">
                    {siteStats.projects.labels[language] || 'Projects Completed'}
                  </div>
                </div>
                <div className="border-l border-black/10 dark:border-white/10 pl-3 sm:pl-6">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-display font-medium text-foreground dark:text-white leading-none">
                    <CountUpStat
                      value={siteStats.years.numericValue}
                      suffix={siteStats.years.suffix}
                      formattedFallback={siteStats.years.formattedRaw}
                    />
                  </div>
                  <div className="text-xs font-mono uppercase tracking-[0.16em] text-foreground/75 dark:text-white/60 mt-1.5 font-medium">
                    {siteStats.years.labels[language] || 'Years Experience'}
                  </div>
                </div>
                <div className="border-l border-black/10 dark:border-white/10 pl-3 sm:pl-6">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-display font-medium text-foreground dark:text-white leading-none">
                    <span className="text-accent">{formatMoneyCompact(siteStats.value.amountInINR!, currency.code)}+</span>
                  </div>
                  <div className="text-xs font-mono uppercase tracking-[0.16em] text-foreground/75 dark:text-white/60 mt-1.5 font-medium">
                    {siteStats.value.labels[language] || 'Equity Delivered'}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Architectural Visual Frame (Reference Image 1) */}
            <div className="hidden lg:flex lg:col-span-5 w-full items-center justify-center relative z-10">
              <div className="relative w-full max-w-[430px] xl:max-w-[470px]">
                {/* Architectural Drafting Corner Brackets (Image 1 & 2) */}
                <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-accent pointer-events-none z-20" />
                <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-accent pointer-events-none z-20" />

                <div className="hero-visual-frame relative w-full aspect-[4/5] border border-black/10 dark:border-white/10 p-3 bg-white dark:bg-[#0e1015] shadow-2xl group overflow-hidden">
                  <div className="w-full h-full overflow-hidden relative">
                    <img loading="lazy" decoding="async" src={siteConfig.images.homepageHero.url}
                      alt={siteConfig.images.homepageHero.alt}
                      width={siteConfig.images.homepageHero.width}
                      height={siteConfig.images.homepageHero.height}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />

                    {/* Architectural Floating Caption Plate (Image 1) */}
                    <div className="hero-floating-caption absolute bottom-3 left-3 right-3 p-3.5 bg-white/95 dark:bg-[#0c0d10]/90 backdrop-blur-md border border-black/10 dark:border-white/15 flex justify-between items-end shadow-xl">
                      <div className="text-left">
                        <span className="text-[8px] uppercase tracking-widest text-accent font-mono font-bold block mb-0.5">{copy.overlayRegistry}</span>
                        <span className="text-xs font-display font-medium text-foreground dark:text-white block">{copy.overlayLocation}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[8px] uppercase tracking-widest text-accent font-mono font-bold block mb-0.5">{copy.overlayDelivered}</span>
                        <span className="text-xs font-display font-medium text-accent block font-mono font-bold">
                          {formatMoneyCompact(copy.statAmountEquity, currency.code)}+
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Graphic Accents */}
        <div className="absolute bottom-0 left-12 w-[1px] h-20 bg-gradient-to-t from-accent/30 to-transparent" />
        <div className="absolute bottom-0 right-12 w-[1px] h-20 bg-gradient-to-t from-accent/30 to-transparent" />
      </section>

      {/* Bento Grid Editorial Stats & Brand Heritage Section */}
      <section className="py-6 sm:py-8 lg:py-10 bg-[#f4efe6] dark:bg-[#090b10] border-b border-black/10 dark:border-white/5 relative">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mb-3.5 sm:mb-5 text-left">
            <span className="text-xs uppercase tracking-[0.25em] text-accent font-mono font-bold block mb-1.5">
              {copy.legacyEyebrow}
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-medium text-foreground dark:text-white leading-tight mb-2 sm:mb-2.5">
              {copy.legacyTitle} <span className="text-accent italic font-light">{copy.legacyTitleAccent}</span>
            </h2>
            <div className="w-14 h-[2px] bg-accent mb-2 sm:mb-2.5" />
            <p className="text-xs sm:text-sm text-foreground/75 dark:text-white/60 font-light leading-relaxed max-w-xl">
              {copy.legacyBody}
            </p>
          </div>

          {/* Asymmetrical Bento Grid */}
          <div ref={bentoRef} className="grid grid-cols-1 md:grid-cols-12 gap-3.5 sm:gap-5">

            {/* Bento Card 1: Stat Grid Block */}
            <div className="bento-card group md:col-span-8 border border-black/10 dark:border-white/5 bg-white dark:bg-[#0a0c10]/70 p-4 sm:p-5 grid grid-cols-2 gap-3.5 sm:gap-5 hover:border-accent/40 dark:hover:border-accent/25 transition-colors duration-500 relative shadow-md dark:shadow-2xl overflow-hidden">
              {/* Corner Brackets */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-black/15 dark:border-white/10 group-hover:border-accent group-hover:w-3 group-hover:h-3 transition-all duration-500" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-black/15 dark:border-white/10 group-hover:border-accent group-hover:w-3 group-hover:h-3 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-black/15 dark:border-white/10 group-hover:border-accent group-hover:w-3 group-hover:h-3 transition-all duration-500" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-black/15 dark:border-white/10 group-hover:border-accent group-hover:w-3 group-hover:h-3 transition-all duration-500" />
              {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col justify-between text-left">
                  <div className="w-9 h-9 border border-black/10 dark:border-white/10 bg-[#f8f7f4] dark:bg-[#0c0d10] flex items-center justify-center text-accent mb-2 transition-transform duration-500 group-hover:scale-105 shadow-xs">
                    <stat.icon size={16} />
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl lg:text-3xl font-display font-medium text-foreground dark:text-white mb-0.5">
                      {stat.value}
                    </div>
                    <div className="text-[11px] sm:text-xs tracking-[0.16em] uppercase text-accent font-mono mb-0.5 font-bold">
                      {stat.label}
                    </div>
                    <p className="text-xs text-foreground/75 dark:text-white/55 font-light line-clamp-2 leading-relaxed">{stat.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bento Card 2: Visual Luxury Plaque with High Visibility Photography */}
            <div className="bento-card bento-visual-plaque md:col-span-4 border border-black/10 dark:border-white/10 bg-[#0c0d10] hover:border-accent/50 transition-all duration-500 overflow-hidden relative group min-h-[200px] sm:min-h-[220px] shadow-lg dark:shadow-2xl">
              <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-accent/40 group-hover:border-accent group-hover:w-3.5 group-hover:h-3.5 transition-all duration-500 z-20" />
              <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-accent/40 group-hover:border-accent group-hover:w-3.5 group-hover:h-3.5 transition-all duration-500 z-20" />
              <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-accent/40 group-hover:border-accent group-hover:w-3.5 group-hover:h-3.5 transition-all duration-500 z-20" />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-accent/40 group-hover:border-accent group-hover:w-3.5 group-hover:h-3.5 transition-all duration-500 z-20" />

              {/* High-visibility architectural estate photography */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-1000 group-hover:scale-105 opacity-85 group-hover:opacity-95"
                style={{
                  backgroundImage: `url('${siteConfig.images.artistryBento.url}')`,
                }}
              />

              {/* Bottom Scrim for crisp text readability while keeping the architectural image 100% visible */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d10]/95 via-[#0c0d10]/60 to-black/15 pointer-events-none" />

              <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-end z-10 text-left">
                <div className="inline-flex items-center gap-2 mb-1">
                  <span className="w-4 h-[2px] bg-accent inline-block" />
                  <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-mono font-bold">
                    {copy.bentoArtistry}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-display font-medium text-white mb-1 drop-shadow-sm">
                  {copy.bentoArtistryTitle}
                </h3>
                <p className="text-xs text-white/80 font-light leading-relaxed mb-2.5 line-clamp-2 drop-shadow-xs">
                  {copy.bentoArtistryBody}
                </p>
                <Link to="/properties" className="text-xs tracking-widest uppercase font-mono font-bold text-accent hover:text-white flex items-center gap-1.5 group-hover:translate-x-1 transition-all">
                  {copy.bentoBrowse} <ArrowRight size={12} />
                </Link>
              </div>
            </div>

            {/* Bento Card 3: Quote block from founder */}
            <div className="bento-card group md:col-span-4 border border-black/10 dark:border-white/5 bg-white dark:bg-[#0a0c10]/70 p-4 sm:p-5 hover:border-accent/40 dark:hover:border-accent/25 transition-colors duration-500 flex flex-col justify-between min-h-[165px] sm:min-h-[185px] relative shadow-md dark:shadow-2xl overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-black/15 dark:border-white/10 group-hover:border-accent group-hover:w-3 group-hover:h-3 transition-all duration-500" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-black/15 dark:border-white/10 group-hover:border-accent group-hover:w-3 group-hover:h-3 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-black/15 dark:border-white/10 group-hover:border-accent group-hover:w-3 group-hover:h-3 transition-all duration-500" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-black/15 dark:border-white/10 group-hover:border-accent group-hover:w-3 group-hover:h-3 transition-all duration-500" />
              <Quote className="text-accent opacity-40 transition-transform duration-500 group-hover:scale-105" size={20} />
              <div className="text-left mt-2.5">
                <p className="text-xs sm:text-sm text-foreground/85 dark:text-white/80 italic font-light leading-relaxed mb-2">
                  "{copy.founderQuote}"
                </p>
                <div>
                  <span className="text-xs uppercase tracking-wider font-bold block text-foreground dark:text-white">{copy.founderName}</span>
                  <span className="text-[11px] uppercase tracking-widest text-foreground/60 dark:text-white/50 font-mono">{copy.founderRole}</span>
                </div>
              </div>
            </div>

            {/* Bento Card 4: Compliance block */}
            <div className="bento-card group md:col-span-8 border border-black/10 dark:border-white/5 bg-white dark:bg-[#0a0c10]/70 p-4 sm:p-5 hover:border-accent/40 dark:hover:border-accent/25 transition-colors duration-500 flex flex-col justify-between min-h-[165px] sm:min-h-[185px] relative shadow-md dark:shadow-2xl overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-black/15 dark:border-white/10 group-hover:border-accent group-hover:w-3 group-hover:h-3 transition-all duration-500" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-black/15 dark:border-white/10 group-hover:border-accent group-hover:w-3 group-hover:h-3 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-black/15 dark:border-white/10 group-hover:border-accent group-hover:w-3 group-hover:h-3 transition-all duration-500" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-black/15 dark:border-white/10 group-hover:border-accent group-hover:w-3 group-hover:h-3 transition-all duration-500" />
              <div className="flex justify-between items-start">
                <span className="text-xs uppercase tracking-[0.2em] text-accent font-mono font-bold">{copy.complianceBadge}</span>
                <span className="text-xs font-mono text-foreground/65 dark:text-white/50">{copy.complianceReg}</span>
              </div>
              <div className="mt-3 sm:mt-4 text-left">
                <h3 className="text-base sm:text-lg font-display font-medium text-foreground dark:text-white mb-1.5 sm:mb-2">{copy.complianceHeading}</h3>
                <p className="text-xs sm:text-sm text-foreground/75 dark:text-white/60 font-light leading-relaxed max-w-xl mb-2.5 sm:mb-3">
                  {copy.complianceBody}
                </p>
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs tracking-wider uppercase font-bold text-accent">
                  <div className="flex items-center gap-2 bg-[#f8f7f4] dark:bg-[#0c0d10] py-1 px-2.5 border border-black/10 dark:border-white/10 text-foreground dark:text-accent shadow-xs">
                    <ShieldCheck size={13} className="text-accent" />
                    {copy.complianceBadgeOne}
                  </div>
                  <div className="flex items-center gap-2 bg-[#f8f7f4] dark:bg-[#0c0d10] py-1 px-2.5 border border-black/10 dark:border-white/10 text-foreground dark:text-accent shadow-xs">
                    <ShieldCheck size={13} className="text-accent" />
                    {copy.complianceBadgeTwo}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Portfolios Carousel */}
      <FeaturedPortfolioCarousel
        properties={properties}
        eyebrow={copy.collectionEyebrow}
        title={copy.collectionTitle}
        titleAccent={copy.collectionTitleAccent}
        body={copy.collectionBody}
        ctaText={copy.collectionCta}
      />

      {/* Contracting divisions - Derived from servicesData */}
      <section className="section-divisions py-6 sm:py-8 lg:py-10 bg-[#f4efe6] dark:bg-[#0c0d10] text-foreground dark:text-white relative border-b border-black/10 dark:border-white/5">
        <ArchitecturalGrid columns={5} />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-3.5 sm:mb-5 max-w-3xl mx-auto">
            <span className="text-xs uppercase tracking-[0.25em] text-accent font-mono font-bold block mb-1.5">
              {copy.divisionsEyebrow || 'CORE OPERATING DIVISIONS'}
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-medium text-foreground dark:text-white mb-2 leading-tight">
              {copy.divisionsTitle || 'Architectural Contracting & Land Engineering'}
            </h2>
            <div className="w-14 h-[2px] bg-accent mx-auto mb-2" />
            <p className="text-xs sm:text-sm text-foreground/75 dark:text-white/60 font-light leading-relaxed max-w-xl mx-auto">
              {copy.divisionsBody}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-6xl mx-auto">
            {getHomeDivisions().map((div) => {
              const divTitle = div.title[language] || div.title.en;
              const divTag = div.tag[language] || div.tag.en;
              const divDesc = div.description[language] || div.description.en;
              const divBullets = div.bullets[language] || div.bullets.en;

              return (
                <div
                  key={div.id}
                  className="border border-black/10 dark:border-white/10 bg-white dark:bg-[#121318] hover:border-accent/40 dark:hover:border-accent/30 transition-all duration-500 flex flex-col justify-between relative group overflow-hidden shadow-md dark:shadow-2xl"
                >
                  {/* Visual Header Image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0d0f14]">
                    <img
                      src={div.image}
                      alt={divTitle}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&auto=format&fit=crop&q=80";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent z-10" />
                    <div className="absolute top-3 left-3 z-20 w-8 h-8 bg-white/90 dark:bg-black/80 backdrop-blur-md border border-black/10 dark:border-white/20 flex items-center justify-center text-accent shadow-md">
                      {div.iconName === 'Building2' && <Building2 size={16} />}
                      {div.iconName === 'Home' && <Building size={16} />}
                      {div.iconName === 'MapPin' && <MapPin size={16} />}
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 z-20">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-mono font-bold block">
                        {divTag}
                      </span>
                    </div>
                  </div>

                  {/* Corner Accent Brackets */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-black/15 dark:border-white/10 group-hover:border-accent group-hover:w-3 group-hover:h-3 transition-all duration-500" />
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-black/15 dark:border-white/10 group-hover:border-accent group-hover:w-3 group-hover:h-3 transition-all duration-500" />

                  {/* Content */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between text-left">
                    <div>
                      <h3 className="text-base sm:text-lg font-display font-medium text-foreground dark:text-white mb-1.5 group-hover:text-accent transition-colors leading-snug">
                        {divTitle}
                      </h3>
                      <p className="text-xs text-foreground/75 dark:text-white/60 font-light leading-relaxed mb-3">
                        {divDesc}
                      </p>
                      <ul className="space-y-1.5 mb-4">
                        {divBullets.map((bullet, bIdx) => (
                          <li
                            key={bIdx}
                            className="flex items-center text-xs tracking-wider text-foreground/80 dark:text-white/70 font-medium group-hover:translate-x-1 transition-transform duration-300"
                          >
                            <div className="w-1.5 h-1.5 bg-accent rounded-none mr-2 shrink-0" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button
                      asChild
                      variant="outline"
                      className="w-full h-10 flex items-center justify-center text-xs tracking-widest rounded-none border border-black/20 dark:border-white/15 bg-white dark:bg-transparent text-foreground dark:text-white hover:bg-accent hover:text-white dark:hover:bg-accent/25 dark:hover:border-accent dark:hover:text-white hover:border-accent uppercase font-mono font-bold transition-colors cursor-pointer group/btn"
                    >
                      <Link to={div.link} className="flex items-center justify-center gap-2">
                        <span>Explore Division</span>
                        <ArrowRight size={13} className="text-accent group-hover/btn:text-white group-hover:translate-x-1 transition-all" />
                      </Link>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Centralized View All Divisions Link */}
          <div className="mt-4 sm:mt-6 text-center">
            <Button
              asChild
              variant="outline"
              className="h-10 px-7 border-black/20 dark:border-white/15 bg-white dark:bg-[#121318] text-foreground dark:text-white hover:bg-accent hover:text-white dark:hover:bg-accent/25 dark:hover:border-accent dark:hover:text-white hover:border-accent text-xs font-mono uppercase tracking-widest rounded-none transition-colors cursor-pointer group"
            >
              <Link to="/services" className="inline-flex items-center gap-2">
                <span>View All Capabilities & Services</span>
                <ArrowRight size={14} className="text-accent group-hover:text-white transition-colors" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CRM Contact CTA Section */}
      <section className="section-closing-cta py-8 sm:py-10 lg:py-12 bg-[#f8f7f4] dark:bg-[#0c0d10] text-foreground dark:text-white relative overflow-hidden border-t border-black/10 dark:border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(223,186,72,0.06),transparent_50%)] pointer-events-none" />
        <div className="container mx-auto px-4 text-center relative z-10 max-w-3xl">
          <span className="text-[9px] uppercase tracking-[0.3em] text-accent font-mono font-bold block mb-1.5">
            {copy.ctaEyebrow}
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-medium text-foreground dark:text-white mb-2 leading-tight">
            {copy.ctaTitle} <span className="text-accent italic font-light">{copy.ctaTitleAccent}</span>
          </h2>
          <p className="text-xs sm:text-sm text-foreground/75 dark:text-white/55 mb-4 sm:mb-5 max-w-xl mx-auto font-light leading-relaxed">
            {copy.ctaBody}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center">
            <MagneticButton strength={20} className="w-full sm:w-auto" as="div">
              <Button
                asChild
                className="w-full sm:w-auto h-11 sm:h-12 px-7 py-3 bg-accent text-[#0c0d10] hover:bg-accent-glow font-display font-black text-xs uppercase tracking-[0.2em] rounded-none border border-accent hover:border-accent-glow shadow-[0_10px_30px_rgba(223,186,72,0.25)] flex items-center justify-center gap-2 group transition-all cursor-pointer"
              >
                <Link to="/contact">
                  <span>{copy.ctaPrimary}</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
            </MagneticButton>
            <MagneticButton strength={20} className="w-full sm:w-auto" as="div">
              <Button
                asChild
                variant="outline"
                className="w-full sm:w-auto h-11 sm:h-12 px-7 py-3 bg-white dark:bg-transparent text-foreground dark:text-white hover:hover:bg-zinc-100   dark:hover:bg-accent/25 dark:hover:border-accent dark:hover:text-white hover:border-accent font-display font-black text-xs uppercase tracking-[0.2em] rounded-none border border-black/20 dark:border-white/20 transition-all flex items-center justify-center shadow-xs hover:shadow-md cursor-pointer"
              >
                <Link to="/properties">{copy.ctaSecondary}</Link>
              </Button>
            </MagneticButton>
          </div>

          <div className="mt-4 sm:mt-5 flex justify-center items-center gap-2 text-[8px] font-mono uppercase tracking-[0.2em] text-foreground/60 dark:text-white/35">
            <ShieldCheck size={12} className="text-accent" />
            {copy.ctaFooter}
          </div>
        </div>
      </section>
    </div>
  );
}