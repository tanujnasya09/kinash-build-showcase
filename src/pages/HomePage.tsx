import { useEffect, useRef } from 'react';
import { ArrowRight, Award, Users, Building, TrendingUp, Sparkles, ShieldCheck, MapPin, Quote, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SearchBar from '@/components/ui/SearchBar';
import SEOHead from '@/components/SEO/SEOHead';
import { useProperties } from '@/context/PropertyContext';
import { useLanguage } from '@/context/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LuxuryCanvas from '@/components/Three/LuxuryCanvas';
import PropertyCard from '@/components/ui/PropertyCard';
import MagneticButton from '@/components/ui/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const { properties } = useProperties();
  const { t, language } = useLanguage();

  const heroRef = useRef<HTMLDivElement>(null);
  const scrollSectionRef = useRef<HTMLDivElement>(null);
  const bentoRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const titleContainerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // 1. Hero Text Reveal Animation (Split-text effect using CSS lines)
    if (titleContainerRef.current) {
      const lines = titleContainerRef.current.querySelectorAll('.reveal-line');
      gsap.fromTo(lines,
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

    // 2. Hero background parallax scrolling
    if (heroRef.current) {
      const bg = heroRef.current.querySelector('.hero-bg');
      if (bg) {
        gsap.to(bg, {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          }
        });
      }
    }

    // 3. Bento Grid stagger entrance with smooth lift
    if (bentoRef.current) {
      const cards = bentoRef.current.querySelectorAll('.bento-card');
      gsap.fromTo(cards,
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
        const pinAnimation = gsap.to(scrollSectionRef.current, {
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

        return () => {
          pinAnimation.scrollTrigger?.kill();
        };
      }
    }
  }, [properties]);

  const stats = [
    { icon: Building, value: '500+', label: t('stats.completed'), desc: 'Premium plots demarcated.' },
    { icon: Users, value: '15+', label: t('stats.experience'), desc: 'Years of structural heritage.' },
    { icon: Award, value: '25+', label: t('stats.awards'), desc: 'National architectural awards.' },
    { icon: TrendingUp, value: '₹200Cr+', label: t('stats.delivered'), desc: 'Equity values delivered.' },
  ];

  return (
    <div className="bg-[#0c0d10] text-white overflow-hidden">
      <SEOHead
        title="Kinash Luxury Real Estate & Contracting"
        description="Kinash Associates delivers premium architectural layouts, residential plot demarcations, and state-of-the-art construction solutions in Uttarakhand."
        keywords="construction company, real estate dehradun, luxury land plots"
        canonical="/"
      />

      {/* Full-screen Cinematic Hero */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-28 pb-16 border-b border-white/5"
      >
        {/* Layered Technical Background Grids */}
        <div className="absolute inset-0 linear-grid opacity-10 z-0 pointer-events-none" />

        {/* Fine Architectural Grid lines */}
        <div className="absolute inset-0 flex justify-between pointer-events-none opacity-1 px-12 z-0">
          <div className="w-[1px] h-full bg-white" />
          <div className="w-[1px] h-full bg-white hidden md:block" />
          <div className="w-[1px] h-full bg-white hidden md:block" />
          <div className="w-[1px] h-full bg-white" />
        </div>

        {/* Cinematic Parallax Background Image */}
        <div
          className="hero-bg absolute -inset-y-32 inset-x-0 bg-cover bg-center bg-no-repeat opacity-[1.5]"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&h=900&fit=crop')` }}
        />

        {/* Deep Dark-Slate Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0d10] via-[#0c0d10]/95 to-[#0c0d10] z-0" />

        <div className="relative z-10 container mx-auto px-4 md:px-8 w-full mt-auto mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Column: Luxury Typography & Search */}
            <div className="lg:col-span-7 text-left flex flex-col justify-center items-start">
              {/* Gold Sparkle Badge */}
              <div
                className="inline-flex items-center gap-2 bg-accent/5 border border-accent/25 px-5 py-2 mb-8 text-accent text-[9px] font-mono font-bold tracking-[0.3em] uppercase relative"
              >
                <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-accent/40" />
                <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-accent/40" />
                <Sparkles size={11} className="animate-pulse text-accent" />
                <span>{t('hero.companyName')}</span>
              </div>

              {/* Title with Rising text effect */}
              <h1 ref={titleContainerRef} className="text-4xl sm:text-6xl md:text-7xl font-display font-medium leading-[1.08] mb-8 tracking-tight text-white">
                <span className="block overflow-hidden relative h-[1.2em]">
                  <span className="reveal-line inline-block absolute left-0 top-0">
                    {t('hero.title1')}
                  </span>
                </span>
                <span className="block overflow-hidden relative h-[1.2em] mt-1">
                  <span className="reveal-line inline-block absolute left-0 top-0 text-accent bg-gradient-to-r from-accent to-accent-glow bg-clip-text text-transparent italic font-light">
                    {t('hero.title2')}
                  </span>
                </span>
              </h1>

              {/* Subheading Description */}
              <p className="text-xs sm:text-sm text-white/50 mb-10 max-w-xl text-left leading-relaxed font-light tracking-wide">
                {t('hero.tagline')}
              </p>

              {/* Search Panel */}
              <div className="mb-10 w-full max-w-xl">
                <SearchBar />
              </div>

              {/* Action Links */}
              <div className="flex flex-col sm:flex-row gap-6 justify-start items-center w-full">
                <Link to="/properties" className="w-full sm:w-auto">
                  <MagneticButton strength={20} className="w-full">
                    <Button className="btn-luxury-gold bg-accent text-[#0c0d10] border-transparent font-black px-9 py-5 hover:bg-accent-glow w-full shadow-lg">
                      Explore Properties
                      <ArrowRight className="ml-2.5" size={14} />
                    </Button>
                  </MagneticButton>
                </Link>
                <Link to="/about" className="w-full sm:w-auto">
                  <Button className="btn-luxury-outline border-white/10 text-white hover:bg-white hover:text-black rounded-none px-9 py-5 w-full sm:w-auto">
                    {t('hero.cta.about')}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column: R3F Canvas & Orbiting Stat Cards */}
            <div className="lg:col-span-5 w-full h-[450px] lg:h-[600px] flex items-center justify-center relative z-10">
              <LuxuryCanvas />

              {/* Floating Stat Card 1 - Glassmorphic */}
              <div className="absolute top-10 left-4 bg-[#0a0c10]/70 backdrop-blur-md border border-white/10 p-4 max-w-[150px] text-left hidden md:block relative shadow-2xl">
                <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-accent/40" />
                <span className="text-[9px] text-accent uppercase font-mono tracking-wider block mb-1">Delivered</span>
                <span className="text-xl font-display font-medium text-white block">₹200Cr+</span>
                <span className="text-[8px] text-white/40 font-mono leading-snug">Appreciation equity coordinates.</span>
              </div>

              {/* Floating Stat Card 2 - Glassmorphic */}
              <div className="absolute bottom-10 right-4 bg-[#0a0c10]/70 backdrop-blur-md border border-white/10 p-4 max-w-[150px] text-left hidden md:block relative shadow-2xl">
                <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-accent/40" />
                <span className="text-[9px] text-accent uppercase font-mono tracking-wider block mb-1">Scale</span>
                <span className="text-xl font-display font-medium text-white block">500+ Plots</span>
                <span className="text-[8px] text-white/40 font-mono leading-snug">Demarcated in growth sectors.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Graphic Accents */}
        <div className="absolute bottom-0 left-12 w-[1px] h-24 bg-gradient-to-t from-accent/30 to-transparent" />
        <div className="absolute bottom-0 right-12 w-[1px] h-24 bg-gradient-to-t from-accent/30 to-transparent" />
      </section>

      {/* Bento Grid Editorial Stats & Brand Heritage Section */}
      <section className="py-32 bg-[#090b10] border-b border-white/5 relative">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mb-24 text-left">
            <span className="text-[9px] uppercase tracking-[0.3em] text-accent font-mono font-bold block mb-4">
              brand legacy
            </span>
            <h2 className="text-4xl md:text-6xl font-display font-medium text-white leading-none mb-6">
              Built on Trust, Crafted for <span className="bg-gradient-to-r from-accent to-accent-glow bg-clip-text text-transparent italic font-light">Appreciation</span>.
            </h2>
            <div className="w-16 h-[1px] bg-accent mb-6" />
            <p className="text-xs text-white/50 font-light leading-relaxed max-w-xl">
              We manage structural developments, registry transfers, and layout demarcations with zero-compromise ISO-accredited workflows.
            </p>
          </div>

          {/* Asymmetrical Bento Grid */}
          <div ref={bentoRef} className="grid grid-cols-1 md:grid-cols-12 gap-8">

            {/* Bento Card 1: Stat Grid Block */}
            <div className="bento-card md:col-span-8 border border-white/5 bg-[#0a0c10]/60 p-8 grid grid-cols-2 gap-8 hover:border-accent/20 transition-colors duration-500 relative shadow-2xl">
              <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-accent/30" />
              {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col justify-between">
                  <div className="w-10 h-10 border border-white/10 bg-[#0c0d10] flex items-center justify-center text-accent mb-4">
                    <stat.icon size={16} />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-display font-medium text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-[8px] tracking-[0.2em] uppercase text-accent font-mono mb-1">
                      {stat.label}
                    </div>
                    <p className="text-[9px] text-white/40 font-light">{stat.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bento Card 2: Visual Luxury Plaque */}
            <div className="bento-card md:col-span-4 border border-white/5 bg-[#0a0c10]/60 hover:border-accent/20 transition-all duration-500 overflow-hidden relative group min-h-[300px] shadow-2xl">
              <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-accent/30" />
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[4000ms] group-hover:scale-105 opacity-25"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=600&fit=crop')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d10] via-[#0c0d10]/60 to-transparent" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                <span className="text-[8px] uppercase tracking-[0.25em] text-accent font-mono font-bold block mb-2">Architectural Artistry</span>
                <h3 className="text-lg font-display font-medium text-white mb-3">Premium Demarcation</h3>
                <p className="text-[10px] text-white/50 font-light leading-relaxed mb-6">
                  Every plot is verified with high-precision total station machinery and structural alignments.
                </p>
                <Link to="/properties" className="text-[9px] tracking-widest uppercase font-mono font-bold text-accent hover:text-white flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                  Browse Plottings <ArrowRight size={10} />
                </Link>
              </div>
            </div>

            {/* Bento Card 3: Quote block from founder */}
            <div className="bento-card md:col-span-4 border border-white/5 bg-[#0a0c10]/60 p-8 hover:border-accent/20 transition-colors duration-500 flex flex-col justify-between min-h-[280px] relative shadow-2xl">
              <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-accent/30" />
              <Quote className="text-accent opacity-20" size={28} />
              <div>
                <p className="text-xs text-white/70 italic font-light leading-relaxed mb-6">
                  "Our target is to establish transparent equity routes for clients, ensuring clean title deeds, secured registration, and layouts designed to double in valuation."
                </p>
                <div>
                  <span className="text-[9px] uppercase tracking-wider font-bold block text-white">S. Kinash</span>
                  <span className="text-[7px] uppercase tracking-widest text-white/40 font-mono">Managing Director, Kinash Associates</span>
                </div>
              </div>
            </div>

            {/* Bento Card 4: Compliance block */}
            <div className="bento-card md:col-span-8 border border-white/5 bg-[#0a0c10]/60 p-8 hover:border-accent/20 transition-colors duration-500 flex flex-col justify-between min-h-[280px] relative shadow-2xl">
              <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-accent/30" />
              <div className="flex justify-between items-start">
                <span className="text-[8px] uppercase tracking-[0.25em] text-accent font-mono font-bold">Standard of Quality</span>
                <span className="text-[9px] font-mono text-white/30">REG #4810/UA</span>
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-display font-medium text-white mb-4">Certified Management Frameworks</h3>
                <p className="text-xs text-white/50 font-light leading-relaxed max-w-xl mb-6">
                  Kinash Associates operates under strict ISO 9001:2015 standards. We manage structural soil studies, concrete testing cubes, and property title reviews with senior legal councils before registry demarcation.
                </p>
                <div className="flex flex-wrap items-center gap-4 text-[9px] tracking-wider uppercase font-bold text-accent">
                  <div className="flex items-center gap-1.5 bg-[#0c0d10] py-1.5 px-3 border border-white/5">
                    <ShieldCheck size={11} className="text-accent" />
                    ISO 9001:2015 REGISTERED
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#0c0d10] py-1.5 px-3 border border-white/5">
                    <ShieldCheck size={11} className="text-accent" />
                    Clean Registry Guaranteed
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
                curated collection
              </span>
              <h2 className="text-4xl md:text-6xl font-display font-medium text-white leading-none mb-6">
                Featured <span className="bg-gradient-to-r from-accent to-accent-glow bg-clip-text text-transparent italic font-light">Portfolios</span>.
              </h2>
              <p className="text-xs text-white/50 font-light leading-relaxed mb-8">
                Explore handpicked luxury lands, demarcated villas, and residential developments in key high-appreciation zones of Uttarakhand.
              </p>
              <Link to="/properties">
                <MagneticButton strength={20}>
                  <Button className="btn-luxury-gold bg-accent text-[#0c0d10] border-transparent font-bold py-4 px-8 text-[9px] tracking-widest uppercase rounded-none hover:bg-accent-glow shadow-md">
                    View Full Directory
                  </Button>
                </MagneticButton>
              </Link>
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

      {/* Fallback Grid Showcase for Mobile Devices */}
      <section className="py-24 bg-[#0c0d10] lg:hidden border-b border-white/5">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-left">
            <span className="text-[9px] uppercase tracking-[0.3em] text-accent font-mono font-bold block mb-3">
              curated collection
            </span>
            <h2 className="text-3xl font-display font-medium text-white">
              Featured Portfolios
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {properties.slice(0, 4).map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* Contracting divisions */}
      <section className="py-32 bg-[#0c0d10] text-white relative">
        <div className="absolute inset-0 linear-grid opacity-[0.03] z-0 pointer-events-none" />

        {/* Fine grid lines */}
        <div className="absolute inset-0 flex justify-between pointer-events-none opacity-[0.05] px-12 z-0">
          <div className="w-[1px] h-full bg-white" />
          <div className="w-[1px] h-full bg-white hidden md:block" />
          <div className="w-[1px] h-full bg-white hidden md:block" />
          <div className="w-[1px] h-full bg-white" />
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-24 max-w-3xl mx-auto">
            <span className="text-[9px] uppercase tracking-[0.3em] text-accent font-mono font-bold block mb-4">
              professional operations
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-medium text-white mb-6">
              Our Core Contracting Divisions
            </h2>
            <div className="w-16 h-[1px] bg-accent mx-auto mb-6" />
            <p className="text-xs text-white/50 font-light leading-relaxed max-w-xl mx-auto">
              Delivering specialized civil contracting services and strategic real estate brokerage under certified legal compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Division 1: Construction Division */}
            <div className="border border-white/5 bg-[#121318] p-10 hover:border-accent/20 transition-all duration-500 flex flex-col justify-between min-h-[380px] relative">
              <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-accent/60" />
              <div>
                <span className="text-[8px] uppercase tracking-[0.2em] text-accent font-mono font-bold block mb-2">Division 01</span>
                <h3 className="text-2xl font-display font-medium text-white mb-4">Civil Engineering & Contracting</h3>
                <p className="text-xs text-white/50 font-light leading-relaxed mb-6">
                  Providing full-scale civil engineering, structural designs, and total station land mapping. Registered A-class contractor in Uttarakhand departments.
                </p>
                <ul className="space-y-2 mb-8">
                  <li className="flex items-center text-[9px] uppercase tracking-wider text-white/70 font-bold">
                    <div className="w-1.5 h-1.5 bg-accent rounded-none mr-3" />
                    Residential Layout Demarcation
                  </li>
                  <li className="flex items-center text-[9px] uppercase tracking-wider text-white/70 font-bold">
                    <div className="w-1.5 h-1.5 bg-accent rounded-none mr-3" />
                    A-Class Civil Construction Projects
                  </li>
                </ul>
              </div>
              <Link to="/construction">
                <Button className="btn-luxury-outline w-full py-4 text-[9px] tracking-widest rounded-none border border-white/10 hover:bg-white hover:text-black uppercase font-bold">
                  Engineering division
                </Button>
              </Link>
            </div>

            {/* Division 2: Real Estate Division */}
            <div className="border border-white/5 bg-[#121318] p-10 hover:border-accent/20 transition-all duration-500 flex flex-col justify-between min-h-[380px] relative">
              <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-accent/60" />
              <div>
                <span className="text-[8px] uppercase tracking-[0.2em] text-accent font-mono font-bold block mb-2">Division 02</span>
                <h3 className="text-2xl font-display font-medium text-white mb-4">Strategic Advisory & Brokerage</h3>
                <p className="text-xs text-white/50 font-light leading-relaxed mb-6">
                  Curating properties with high appreciation yields, clean title deeds, and complete registry compliance. We manage all transfer documentation.
                </p>
                <ul className="space-y-2 mb-8">
                  <li className="flex items-center text-[9px] uppercase tracking-wider text-white/70 font-bold">
                    <div className="w-1.5 h-1.5 bg-accent rounded-none mr-3" />
                    Clean Registry Verification
                  </li>
                  <li className="flex items-center text-[9px] uppercase tracking-wider text-white/70 font-bold">
                    <div className="w-1.5 h-1.5 bg-accent rounded-none mr-3" />
                    Registry Title Searches
                  </li>
                </ul>
              </div>
              <Link to="/real-estate">
                <Button className="btn-luxury-outline w-full py-4 text-[9px] tracking-widest rounded-none border border-white/10 hover:bg-white hover:text-black uppercase font-bold">
                  Advisory Division
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CRM Contact CTA Section */}
      <section className="py-32 bg-[#0c0d10] text-white relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(223,186,72,0.06),transparent_50%)] pointer-events-none" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="text-[9px] uppercase tracking-[0.3em] text-accent font-mono font-bold block mb-4">
            secure connection
          </span>
          <h2 className="text-4xl sm:text-6xl font-display font-medium mb-6 leading-none">
            Design Your Architectural <span className="bg-gradient-to-r from-accent to-accent-glow bg-clip-text text-transparent italic font-light">Vision</span>
          </h2>
          <p className="text-xs sm:text-sm text-white/55 mb-12 max-w-xl mx-auto font-light leading-relaxed">
            Partner with Uttarakhand's leading ISO-accredited construction agency. Dispatch your requirements instantly to our lead support team.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center font-mono text-[9px]">
            <Link to="/contact" className="w-full sm:w-auto">
              <MagneticButton strength={20} className="w-full">
                <Button className="btn-luxury-gold bg-accent text-[#0c0d10] border-transparent hover:bg-accent-glow px-9 py-4 rounded-none uppercase font-bold w-full">
                  {language === 'en' ? 'Inquire Today' : 'Consultar Ahora'}
                </Button>
              </MagneticButton>
            </Link>
            <Link to="/properties" className="w-full sm:w-auto">
              <Button className="btn-luxury-outline border-white/20 text-white hover:bg-white hover:text-black px-9 py-4 rounded-none uppercase font-bold w-full sm:w-auto">
                Explore Properties Map
              </Button>
            </Link>
          </div>

          <div className="mt-16 flex justify-center items-center gap-2 text-[8px] font-mono uppercase tracking-[0.2em] text-white/35">
            <ShieldCheck size={12} className="text-accent" />
            ISO 9001:2015 REGISTERED & INBOUND PIPELINE SECURED
          </div>
        </div>
      </section>
    </div>
  );
}