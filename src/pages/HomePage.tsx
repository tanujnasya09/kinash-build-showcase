import { useEffect, useRef } from 'react';
import { ArrowRight, Award, Users, Building, TrendingUp, Sparkles, ShieldCheck, MapPin, Quote, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SEOHead from '@/components/SEO/SEOHead';
import { useProperties } from '@/context/PropertyContext';
import { useLanguage } from '@/context/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PropertyCard from '@/components/ui/PropertyCard';
import MagneticButton from '@/components/ui/MagneticButton';
import siteConfig from '@/config/site';
import { formatMoneyCompact } from '@/lib/currency';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const { properties } = useProperties();
  const { content, currency, t } = useLanguage();
  const copy = content.home;

  const heroRef = useRef<HTMLDivElement>(null);
  const scrollSectionRef = useRef<HTMLDivElement>(null);
  const bentoRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const titleContainerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    let pinAnimation: gsap.core.Tween | null = null;
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

    // 4. Horizontal Scroll Section for property showcases on desktop
    if (scrollSectionRef.current && pinRef.current) {
      const totalWidth = scrollSectionRef.current.scrollWidth - window.innerWidth;

      if (totalWidth > 0 && window.innerWidth >= 1024) {
        pinAnimation = gsap.to(scrollSectionRef.current, {
          x: -totalWidth - 120,
          ease: 'none',
          scrollTrigger: {
            trigger: pinRef.current,
            pin: true,
            scrub: 1.2,
            start: 'top top',
            end: () => `+=${scrollSectionRef.current?.scrollWidth}`,
            invalidateOnRefresh: true,
          }
        });
      }
    }

    return () => {
      if (heroReveal) heroReveal.kill();
      if (bentoStagger) {
        bentoStagger.scrollTrigger?.kill();
        bentoStagger.kill();
      }
      if (pinAnimation) {
        pinAnimation.scrollTrigger?.kill();
        pinAnimation.kill();
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [properties]);

  const stats = [
    { icon: Building, value: copy.statValuePlots, label: copy.statLabelPlots, desc: copy.statPlots },
    { icon: Users, value: copy.statValueHeritage, label: copy.statLabelHeritage, desc: copy.statHeritage },
    { icon: Award, value: copy.statValueAwards, label: copy.statLabelAwards, desc: copy.statAwards },
    { icon: TrendingUp, value: `${formatMoneyCompact(copy.statAmountEquity, currency.code)}+`, label: copy.statLabelEquity, desc: copy.statEquity },
  ];

  return (
    <div className="bg-[#0c0d10] text-white overflow-hidden">
      <SEOHead
        title={copy.meta.title}
        description={copy.meta.description}
        keywords={copy.meta.keywords}
        canonical="/"
      />

      {/* Full-screen Cinematic Hero */}
      <section
        ref={heroRef}
        className="relative flex flex-col justify-start lg:justify-center lg:items-center overflow-hidden bg-[#0c0d10] pt-20 sm:pt-24 lg:py-0 pb-10 sm:pb-14 lg:min-h-[90vh] lg:h-[90vh] border-b border-white/5"
      >
        {/* Fine Architectural Grid lines */}
        <div className="absolute inset-0 flex justify-between pointer-events-none opacity-[0.03] px-12 z-0">
          <div className="w-[1px] h-full bg-white" />
          <div className="w-[1px] h-full bg-white hidden md:block" />
          <div className="w-[1px] h-full bg-white hidden md:block" />
          <div className="w-[1px] h-full bg-white" />
        </div>

        {/* Luxury Clean Background with Golden Radial Glow */}
        <div className="absolute inset-0 bg-[#0c0d10] z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_40%,rgba(223,186,72,0.06),transparent_50%)] z-0 pointer-events-none" />

        {/* Mobile Ambient Architectural Vignette (Zero vertical scroll footprint) */}
        <div
          className="absolute inset-0 z-0 opacity-15 bg-cover bg-center pointer-events-none lg:hidden"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&auto=format&fit=crop&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d10] via-[#0c0d10]/90 to-[#0c0d10]/95 pointer-events-none lg:hidden z-0" />

        <div className="relative z-10 container mx-auto px-4 md:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Premium Editorial Typography & Actions */}
            <div className="lg:col-span-7 text-left flex flex-col justify-center items-start w-full">
              {/* Gold Sparkle Badge */}
              <div
                className="inline-flex items-center gap-2 bg-accent/5 border border-accent/25 px-3.5 sm:px-5 py-1.5 sm:py-2 mb-3.5 sm:mb-6 text-accent text-[9px] font-mono font-bold tracking-[0.3em] uppercase relative"
              >
                <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-accent/40" />
                <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-accent/40" />
                <Sparkles size={11} className="animate-pulse text-accent" />
                <span>{copy.heroBadge}</span>
              </div>

              {/* Title with Rising text effect */}
              <h1 ref={titleContainerRef} className="text-[28px] sm:text-5xl md:text-6xl lg:text-7xl font-display font-medium leading-[1.1] mb-3.5 sm:mb-6 tracking-tight text-white [text-wrap:balance]">
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
              <p className="text-xs sm:text-sm text-white/60 mb-5 sm:mb-8 max-w-xl text-left leading-relaxed font-light tracking-wide">
                {copy.heroTagline}
              </p>

              {/* Action Links - Ergonomic Mobile & Desktop Buttons (Row on mobile) */}
              <div className="flex flex-row gap-2.5 sm:gap-4 justify-start items-center w-full max-w-md">
                <MagneticButton strength={15} className="flex-1 sm:flex-initial" as="div">
                  <Button
                    asChild
                    className="w-full sm:w-auto h-11 sm:h-14 px-3 sm:px-8 py-3 sm:py-4 bg-accent text-[#0c0d10] hover:bg-accent-glow font-display font-black text-[10px] sm:text-xs uppercase tracking-[0.1em] sm:tracking-[0.2em] rounded-none border border-accent hover:border-accent-glow shadow-[0_10px_30px_rgba(223,186,72,0.25)] flex items-center justify-center gap-1.5 sm:gap-2 group transition-all whitespace-nowrap"
                  >
                    <Link to="/properties">
                      <span>{copy.heroCtaProperties}</span>
                      <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </Button>
                </MagneticButton>
                <MagneticButton strength={15} className="flex-1 sm:flex-initial" as="div">
                  <Button
                    asChild
                    className="w-full sm:w-auto h-11 sm:h-14 px-3 sm:px-8 py-3 sm:py-4 bg-transparent text-white hover:bg-white hover:text-[#0c0d10] font-display font-black text-[10px] sm:text-xs uppercase tracking-[0.1em] sm:tracking-[0.2em] rounded-none border border-white/20 hover:border-white transition-all flex items-center justify-center whitespace-nowrap"
                  >
                    <Link to="/about">{copy.heroCtaAbout}</Link>
                  </Button>
                </MagneticButton>
              </div>

              {/* Mobile Specimen Live Bar (Zero bulky scroll) */}
              <div className="lg:hidden w-full mt-5 sm:mt-8 pt-4 sm:pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
                <div className="text-left">
                  <span className="text-[8px] uppercase tracking-widest text-accent font-mono block mb-0.5">{copy.overlayRegistry}</span>
                  <span className="text-xs font-display font-medium text-white block">{copy.overlayLocation}</span>
                </div>
                <div className="text-right">
                  <span className="text-[8px] uppercase tracking-widest text-accent font-mono block mb-0.5">{copy.overlayDelivered}</span>
                  <span className="text-xs font-display font-medium text-accent block font-mono">
                    {formatMoneyCompact(copy.statAmountEquity, currency.code)}+
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Architectural Visual Frame (Desktop Only — Never pushes mobile content offscreen) */}
            <div className="hidden lg:flex lg:col-span-5 w-full items-center justify-center relative z-10">
              <div className="relative w-full aspect-[4/5] max-w-[380px] border border-white/10 p-2.5 bg-[#0a0c10]/40 backdrop-blur-sm shadow-2xl group overflow-hidden">
                {/* Gold Accent Corners */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-accent" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-accent" />

                <div className="w-full h-full overflow-hidden relative">
                  <img loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=1000&fit=crop"
                    alt={t('common.villaAlt')}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  {/* Subtle dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d10]/80 via-[#0c0d10]/20 to-transparent" />

                  {/* Editorial Overlay Info */}
                  <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                    <div className="text-left">
                      <span className="text-[8px] uppercase tracking-widest text-accent font-mono block mb-1">{copy.overlayRegistry}</span>
                      <span className="text-xs font-display font-medium text-white block">{copy.overlayLocation}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[8px] uppercase tracking-widest text-accent font-mono block mb-1">{copy.overlayDelivered}</span>
                      <span className="text-xs font-display font-medium text-white block">
                        {formatMoneyCompact(copy.statAmountEquity, currency.code)}+
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Graphic Accents */}
        <div className="absolute bottom-0 left-12 w-[1px] h-24 bg-gradient-to-t from-accent/30 to-transparent" />
        <div className="absolute bottom-0 right-12 w-[1px] h-24 bg-gradient-to-t from-accent/30 to-transparent" />
      </section>

      {/* Bento Grid Editorial Stats & Brand Heritage Section */}
      <section className="py-14 sm:py-20 lg:py-32 bg-[#090b10] border-b border-white/5 relative">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mb-10 sm:mb-16 lg:mb-24 text-left">
            <span className="text-[9px] uppercase tracking-[0.3em] text-accent font-mono font-bold block mb-3 sm:mb-4">
              {copy.legacyEyebrow}
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-medium text-white leading-tight mb-4 sm:mb-6">
              {copy.legacyTitle} <span className="text-accent italic font-light">{copy.legacyTitleAccent}</span>
            </h2>
            <div className="w-16 h-[1px] bg-accent mb-4 sm:mb-6" />
            <p className="text-xs text-white/50 font-light leading-relaxed max-w-xl">
              {copy.legacyBody}
            </p>
          </div>

          {/* Asymmetrical Bento Grid */}
          <div ref={bentoRef} className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-8">

            {/* Bento Card 1: Stat Grid Block */}
            <div className="bento-card group md:col-span-8 border border-white/5 bg-[#0a0c10]/60 p-5 sm:p-8 grid grid-cols-2 gap-4 sm:gap-8 hover:border-accent/20 transition-colors duration-500 relative shadow-2xl overflow-hidden">
              {/* Gold Accent Corner Brackets */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/10 group-hover:border-accent group-hover:w-3 group-hover:h-3 transition-all duration-500" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/10 group-hover:border-accent group-hover:w-3 group-hover:h-3 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/10 group-hover:border-accent group-hover:w-3 group-hover:h-3 transition-all duration-500" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/10 group-hover:border-accent group-hover:w-3 group-hover:h-3 transition-all duration-500" />
              {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col justify-between text-left">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 border border-white/10 bg-[#0c0d10] flex items-center justify-center text-accent mb-3 sm:mb-4 transition-transform duration-500 group-hover:scale-105">
                    <stat.icon size={15} />
                  </div>
                  <div>
                    <div className="text-xl sm:text-3xl font-display font-medium text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-[8px] tracking-[0.2em] uppercase text-accent font-mono mb-1">
                      {stat.label}
                    </div>
                    <p className="text-[9px] text-white/40 font-light line-clamp-2">{stat.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bento Card 2: Visual Luxury Plaque */}
            <div className="bento-card md:col-span-4 border border-white/5 bg-[#0a0c10]/60 hover:border-accent/20 transition-all duration-500 overflow-hidden relative group min-h-[260px] sm:min-h-[300px] shadow-2xl">
              {/* Gold Accent Corner Brackets */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/10 group-hover:border-accent group-hover:w-3 group-hover:h-3 transition-all duration-500" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/10 group-hover:border-accent group-hover:w-3 group-hover:h-3 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/10 group-hover:border-accent group-hover:w-3 group-hover:h-3 transition-all duration-500" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/10 group-hover:border-accent group-hover:w-3 group-hover:h-3 transition-all duration-500" />
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-105 opacity-25"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=600&fit=crop')`,
                  transitionDuration: '4000ms'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d10] via-[#0c0d10]/60 to-transparent" />
              <div className="absolute inset-0 p-5 sm:p-8 flex flex-col justify-end z-10 text-left">
                <span className="text-[8px] uppercase tracking-[0.25em] text-accent font-mono font-bold block mb-2">{copy.bentoArtistry}</span>
                <h3 className="text-base sm:text-lg font-display font-medium text-white mb-2 sm:mb-3">{copy.bentoArtistryTitle}</h3>
                <p className="text-[10px] text-white/50 font-light leading-relaxed mb-4 sm:mb-6 line-clamp-3">
                  {copy.bentoArtistryBody}
                </p>
                <Link to="/properties" className="text-[9px] tracking-widest uppercase font-mono font-bold text-accent hover:text-white flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                  {copy.bentoBrowse} <ArrowRight size={10} />
                </Link>
              </div>
            </div>

            {/* Bento Card 3: Quote block from founder */}
            <div className="bento-card group md:col-span-4 border border-white/5 bg-[#0a0c10]/60 p-5 sm:p-8 hover:border-accent/20 transition-colors duration-500 flex flex-col justify-between min-h-[240px] sm:min-h-[280px] relative shadow-2xl overflow-hidden">
              {/* Gold Accent Corner Brackets */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/10 group-hover:border-accent group-hover:w-3 group-hover:h-3 transition-all duration-500" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/10 group-hover:border-accent group-hover:w-3 group-hover:h-3 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/10 group-hover:border-accent group-hover:w-3 group-hover:h-3 transition-all duration-500" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/10 group-hover:border-accent group-hover:w-3 group-hover:h-3 transition-all duration-500" />
              <Quote className="text-accent opacity-20 transition-transform duration-500 group-hover:scale-105" size={24} />
              <div className="text-left">
                <p className="text-xs text-white/70 italic font-light leading-relaxed mb-4 sm:mb-6">
                  "{copy.founderQuote}"
                </p>
                <div>
                  <span className="text-[9px] uppercase tracking-wider font-bold block text-white">{copy.founderName}</span>
                  <span className="text-[7px] uppercase tracking-widest text-white/40 font-mono">{copy.founderRole}</span>
                </div>
              </div>
            </div>

            {/* Bento Card 4: Compliance block */}
            <div className="bento-card group md:col-span-8 border border-white/5 bg-[#0a0c10]/60 p-5 sm:p-8 hover:border-accent/20 transition-colors duration-500 flex flex-col justify-between min-h-[240px] sm:min-h-[280px] relative shadow-2xl overflow-hidden">
              {/* Gold Accent Corner Brackets */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/10 group-hover:border-accent group-hover:w-3 group-hover:h-3 transition-all duration-500" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/10 group-hover:border-accent group-hover:w-3 group-hover:h-3 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/10 group-hover:border-accent group-hover:w-3 group-hover:h-3 transition-all duration-500" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/10 group-hover:border-accent group-hover:w-3 group-hover:h-3 transition-all duration-500" />
              <div className="flex justify-between items-start">
                <span className="text-[8px] uppercase tracking-[0.25em] text-accent font-mono font-bold">{copy.complianceBadge}</span>
                <span className="text-[9px] font-mono text-white/30">{copy.complianceReg}</span>
              </div>
              <div className="mt-6 sm:mt-8 text-left">
                <h3 className="text-lg sm:text-xl font-display font-medium text-white mb-3 sm:mb-4">{copy.complianceHeading}</h3>
                <p className="text-xs text-white/50 font-light leading-relaxed max-w-xl mb-4 sm:mb-6">
                  {copy.complianceBody}
                </p>
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 text-[9px] tracking-wider uppercase font-bold text-accent">
                  <div className="flex items-center gap-1.5 bg-[#0c0d10] py-1.5 px-3 border border-white/5">
                    <ShieldCheck size={11} className="text-accent" />
                    {copy.complianceBadgeOne}
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#0c0d10] py-1.5 px-3 border border-white/5">
                    <ShieldCheck size={11} className="text-accent" />
                    {copy.complianceBadgeTwo}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awwwards Pin Scroll Property Showcase */}
      <section ref={pinRef} className="bg-[#0c0d10] relative overflow-hidden hidden lg:block border-b border-white/5">
        <div className="min-h-screen w-full flex items-center justify-start py-20 px-12">
          {/* Horizontal scroll grid */}
          <div className="flex gap-24 items-center">
            {/* Sticky Content Intro */}
            <div className="flex-shrink-0 w-[420px] text-left">
              <span className="text-[9px] uppercase tracking-[0.3em] text-accent font-mono font-bold block mb-4">
                {copy.collectionEyebrow}
              </span>
              <h2 className="text-4xl md:text-6xl font-display font-medium text-white leading-none mb-6">
                {copy.collectionTitle} <span className="text-accent italic font-light">{copy.collectionTitleAccent}</span>
              </h2>
              <p className="text-xs text-white/50 font-light leading-relaxed mb-8">
                {copy.collectionBody}
              </p>
              <MagneticButton strength={20} as="div">
                <Button asChild className="btn-luxury-gold bg-accent text-[#0c0d10] border-transparent font-bold py-4 px-8 text-[9px] tracking-widest uppercase rounded-none hover:bg-accent-glow shadow-md">
                  <Link to="/properties">{copy.collectionCta}</Link>
                </Button>
              </MagneticButton>
            </div>

            {/* Horizontal Grid elements scrollable on scroll */}
            <div ref={scrollSectionRef} className="flex gap-8 pr-32">
              {properties.slice(0, 5).map((property) => (
                <div
                  key={property.id}
                  className="horizontal-item w-[380px] flex-shrink-0"
                >
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile & Tablet Showcase with Touch Snap Carousel */}
      <section className="py-14 sm:py-20 bg-[#0c0d10] lg:hidden border-b border-white/5 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="mb-6 sm:mb-10 flex items-end justify-between">
            <div className="text-left">
              <span className="text-[9px] uppercase tracking-[0.3em] text-accent font-mono font-bold block mb-2 sm:mb-3">
                {copy.collectionEyebrow}
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-medium text-white">
                {copy.mobileCollectionTitle}
              </h2>
            </div>
            {/* Mobile Touch Swipe Indicator */}
            <div className="md:hidden flex items-center gap-1.5 text-[8px] font-mono uppercase tracking-widest text-accent/80 pb-1">
              <span>Swipe</span>
              <ArrowRight size={10} />
            </div>
          </div>

          {/* Mobile: Touch-Native Horizontal Swipe Snap Carousel (Replaces 2,000px of dead vertical scroll) */}
          <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 no-scrollbar scroll-smooth">
            {properties.slice(0, 5).map((property) => (
              <div
                key={property.id}
                className="w-[84vw] max-w-[320px] flex-shrink-0 snap-start"
              >
                <PropertyCard property={property} />
              </div>
            ))}
          </div>

          {/* Tablet (md to lg): 2-Column Responsive Grid */}
          <div className="hidden md:grid md:grid-cols-2 gap-6 lg:hidden">
            {properties.slice(0, 4).map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          {/* Mobile All Properties Quick Link */}
          <div className="mt-6 sm:mt-8 text-center md:hidden">
            <Button
              asChild
              className="w-full h-12 bg-transparent text-white border border-white/15 hover:bg-white hover:text-[#0c0d10] font-display font-bold text-xs uppercase tracking-widest rounded-none transition-colors"
            >
              <Link to="/properties" className="flex items-center justify-center gap-2">
                <span>{copy.collectionCta || "View Full Collection"}</span>
                <ArrowRight size={12} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contracting divisions */}
      <section className="py-14 sm:py-20 lg:py-32 bg-[#0c0d10] text-white relative">
        {/* Fine grid lines */}
        <div className="absolute inset-0 flex justify-between pointer-events-none opacity-[0.05] px-12 z-0">
          <div className="w-[1px] h-full bg-white" />
          <div className="w-[1px] h-full bg-white hidden md:block" />
          <div className="w-[1px] h-full bg-white hidden md:block" />
          <div className="w-[1px] h-full bg-white" />
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-10 sm:mb-16 lg:mb-24 max-w-3xl mx-auto">
            <span className="text-[9px] uppercase tracking-[0.3em] text-accent font-mono font-bold block mb-3 sm:mb-4">
              {copy.divisionsEyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-white mb-4 sm:mb-6 leading-tight">
              {copy.divisionsTitle}
            </h2>
            <div className="w-16 h-[1px] bg-accent mx-auto mb-4 sm:mb-6" />
            <p className="text-xs text-white/50 font-light leading-relaxed max-w-xl mx-auto">
              {copy.divisionsBody}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {/* Division 1: Construction Division */}
            <div className="border border-white/5 bg-[#121318] p-6 sm:p-8 lg:p-10 hover:border-accent/20 transition-all duration-500 flex flex-col justify-between min-h-[340px] sm:min-h-[380px] relative group overflow-hidden">
              {/* Gold Accent Corner Brackets */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/10 group-hover:border-accent group-hover:w-3 group-hover:h-3 transition-all duration-500" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/10 group-hover:border-accent group-hover:w-3 group-hover:h-3 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/10 group-hover:border-accent group-hover:w-3 group-hover:h-3 transition-all duration-500" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/10 group-hover:border-accent group-hover:w-3 group-hover:h-3 transition-all duration-500" />
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="text-left relative z-10">
                <span className="text-[8px] uppercase tracking-[0.2em] text-accent font-mono font-bold block mb-2">{copy.divOneTag}</span>
                <h3 className="text-xl sm:text-2xl font-display font-medium text-white mb-3 sm:mb-4">{copy.divOneTitle}</h3>
                <p className="text-xs text-white/50 font-light leading-relaxed mb-6">
                  {copy.divOneBody}
                </p>
                <ul className="space-y-2 mb-8">
                  <li className="flex items-center text-[9px] uppercase tracking-wider text-white/70 font-bold group-hover:translate-x-1 transition-transform duration-300">
                    <div className="w-1.5 h-1.5 bg-accent rounded-none mr-3" />
                    {copy.divOneItemOne}
                  </li>
                  <li className="flex items-center text-[9px] uppercase tracking-wider text-white/70 font-bold group-hover:translate-x-1 transition-transform duration-300">
                    <div className="w-1.5 h-1.5 bg-accent rounded-none mr-3" />
                    {copy.divOneItemTwo}
                  </li>
                </ul>
              </div>
              <Button asChild className="relative z-10 w-full h-12 flex items-center justify-center text-xs tracking-widest rounded-none border border-white/15 bg-transparent hover:bg-white hover:text-black uppercase font-display font-bold transition-colors">
                <Link to="/construction">{copy.divOneCta}</Link>
              </Button>
            </div>

            {/* Division 2: Real Estate Division */}
            <div className="border border-white/5 bg-[#121318] p-6 sm:p-8 lg:p-10 hover:border-accent/20 transition-all duration-500 flex flex-col justify-between min-h-[340px] sm:min-h-[380px] relative group overflow-hidden">
              {/* Gold Accent Corner Brackets */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/10 group-hover:border-accent group-hover:w-3 group-hover:h-3 transition-all duration-500" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/10 group-hover:border-accent group-hover:w-3 group-hover:h-3 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/10 group-hover:border-accent group-hover:w-3 group-hover:h-3 transition-all duration-500" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/10 group-hover:border-accent group-hover:w-3 group-hover:h-3 transition-all duration-500" />
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="text-left relative z-10">
                <span className="text-[8px] uppercase tracking-[0.2em] text-accent font-mono font-bold block mb-2">{copy.divTwoTag}</span>
                <h3 className="text-xl sm:text-2xl font-display font-medium text-white mb-3 sm:mb-4">{copy.divTwoTitle}</h3>
                <p className="text-xs text-white/50 font-light leading-relaxed mb-6">
                  {copy.divTwoBody}
                </p>
                <ul className="space-y-2 mb-8">
                  <li className="flex items-center text-[9px] uppercase tracking-wider text-white/70 font-bold group-hover:translate-x-1 transition-transform duration-300">
                    <div className="w-1.5 h-1.5 bg-accent rounded-none mr-3" />
                    {copy.divTwoItemOne}
                  </li>
                  <li className="flex items-center text-[9px] uppercase tracking-wider text-white/70 font-bold group-hover:translate-x-1 transition-transform duration-300">
                    <div className="w-1.5 h-1.5 bg-accent rounded-none mr-3" />
                    {copy.divTwoItemTwo}
                  </li>
                </ul>
              </div>
              <Button asChild className="relative z-10 w-full h-12 flex items-center justify-center text-xs tracking-widest rounded-none border border-white/15 bg-transparent hover:bg-white hover:text-black uppercase font-display font-bold transition-colors">
                <Link to="/real-estate">{copy.divTwoCta}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CRM Contact CTA Section */}
      <section className="py-16 sm:py-24 lg:py-32 bg-[#0c0d10] text-white relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(223,186,72,0.06),transparent_50%)] pointer-events-none" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="text-[9px] uppercase tracking-[0.3em] text-accent font-mono font-bold block mb-3 sm:mb-4">
            {copy.ctaEyebrow}
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-medium mb-4 sm:mb-6 leading-tight">
            {copy.ctaTitle} <span className="text-accent italic font-light">{copy.ctaTitleAccent}</span>
          </h2>
          <p className="text-xs sm:text-sm text-white/55 mb-8 sm:mb-12 max-w-xl mx-auto font-light leading-relaxed">
            {copy.ctaBody}
          </p>
          <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-5 justify-center items-stretch sm:items-center">
            <MagneticButton strength={20} className="w-full sm:w-auto" as="div">
              <Button
                asChild
                className="w-full sm:w-auto h-13 sm:h-14 px-8 py-4 bg-accent text-[#0c0d10] hover:bg-accent-glow font-display font-black text-xs uppercase tracking-[0.2em] rounded-none border border-accent hover:border-accent-glow shadow-[0_10px_30px_rgba(223,186,72,0.25)] flex items-center justify-center gap-2 group transition-all"
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
                className="w-full sm:w-auto h-13 sm:h-14 px-8 py-4 bg-transparent text-white hover:bg-white hover:text-[#0c0d10] font-display font-black text-xs uppercase tracking-[0.2em] rounded-none border border-white/20 hover:border-white transition-all flex items-center justify-center"
              >
                <Link to="/properties">{copy.ctaSecondary}</Link>
              </Button>
            </MagneticButton>
          </div>

          <div className="mt-10 sm:mt-16 flex justify-center items-center gap-2 text-[8px] font-mono uppercase tracking-[0.2em] text-white/35">
            <ShieldCheck size={12} className="text-accent" />
            {copy.ctaFooter}
          </div>
        </div>
      </section>
    </div>
  );
}