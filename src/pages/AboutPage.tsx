import { Target, Heart, Users, Award, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SEOHead from '@/components/SEO/SEOHead';
import MagneticButton from '@/components/ui/MagneticButton';
import { useLanguage } from '@/context/LanguageContext';
import { statValue } from '@/lib/stat';
import ArchitecturalGrid from '@/components/ui/ArchitecturalGrid';

const valueIcons = [Target, Heart, Users, Award];

const teamImages = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80',
];

const AboutPage = () => {
  const { content, currency } = useLanguage();
  const copy = content.about;

  const values = copy.values.map((value, idx) => ({
    ...value,
    icon: valueIcons[idx],
  }));

  const team = copy.team.map((member, idx) => ({
    ...member,
    image: teamImages[idx],
  }));

  const stats = copy.stats;

  return (
    <div className="min-h-screen bg-[#f8f7f4] dark:bg-[#0c0d10] text-foreground dark:text-white pt-20 sm:pt-24 lg:pt-28 pb-16 relative overflow-hidden">
      <SEOHead
        title={copy.meta.title}
        description={copy.meta.description}
        keywords={copy.meta.keywords}
        canonical="/about"
      />

      {/* Architectural Drafting Blueprint Grid */}
      <ArchitecturalGrid columns={5} />

      {/* Editorial Architectural Hero (Direct Turner & Hill Reference) */}
      <section className="relative min-h-[75vh] flex items-center py-20 lg:py-32 overflow-hidden border-b border-black/10 dark:border-white/5">
        {/* Right-aligned architectural glass facade bleeding into background (Image 3) */}
        <div
          className="absolute right-0 top-0 bottom-0 w-full lg:w-1/2 bg-cover bg-center pointer-events-none opacity-85 dark:opacity-75"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&auto=format&fit=crop&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f8f7f4] via-[#f8f7f4]/95 sm:via-[#f8f7f4]/80 to-transparent dark:from-[#0c0d10] dark:via-[#0c0d10]/95 sm:dark:via-[#0c0d10]/80 dark:to-transparent pointer-events-none" />

        <div className="relative z-10 container mx-auto px-4 md:px-8 w-full">
          <div className="max-w-3xl text-left">
            {/* Top Accent Indicator Bar (Image 3) */}
            <div className="w-12 sm:w-16 h-[3px] bg-accent mb-4" />

            {/* Eyebrow (Image 3: ORIGINAL AND CREATIVE IN THINKING) */}
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-mono font-bold text-foreground/80 dark:text-white/80 block mb-4">
              {copy.eyebrow || 'ORIGINAL AND CREATIVE IN THINKING'}
            </span>

            {/* Huge Headline (Image 3: INGENIOUS DESIGN & ARCHITECTURE) */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black uppercase tracking-tight text-foreground dark:text-white leading-[1.04] mb-8 [text-wrap:balance]">
              INGENIOUS DESIGN & ARCHITECTURE
            </h1>

            {/* Editorial Floating Card (Image 3: Read More ->) */}
            <a
              href="#about-section"
              className="inline-flex items-center justify-between w-64 sm:w-72 p-5 bg-white dark:bg-[#12141a] border border-black/15 dark:border-white/10 shadow-2xl group hover:border-accent transition-all cursor-pointer"
            >
              <span className="text-xs font-mono uppercase tracking-widest text-foreground dark:text-white font-bold">
                Read More
              </span>
              <ArrowRight size={15} className="text-accent group-hover:translate-x-2 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT US - Editorial Architectural Principals Grid (Direct Turner & Hill Reference) */}
      <section id="about-section" className="py-24 sm:py-32 border-b border-black/10 dark:border-white/5 bg-transparent relative">
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-3xl mb-16 sm:mb-20">
            {/* Accent Bar (Image 3) */}
            <div className="w-12 sm:w-16 h-[3px] bg-accent mb-4" />

            {/* Eyebrow (Image 3: A FEW WORDS) */}
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-mono font-bold text-foreground/80 dark:text-white/80 block mb-3">
              A FEW WORDS
            </span>

            {/* Headline (Image 3: ABOUT US) */}
            <h2 className="text-4xl sm:text-6xl font-display font-black uppercase tracking-tight text-foreground dark:text-white">
              ABOUT US
            </h2>
          </div>

          {/* Asymmetrical 2-Column Editorial Grid (Exact layout from Image 3!) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 max-w-5xl">
            {/* Column 1: Billy Turner / Michael Apex (Photo on Top -> Name & Text Below) */}
            <div className="flex flex-col">
              <div className="relative aspect-[4/5] max-w-md overflow-hidden bg-[#0d0f14] border border-black/10 dark:border-white/10 shadow-2xl mb-8 group">
                <img loading="lazy" decoding="async"
                  src={team[0].image}
                  alt={team[0].name}
                  className="w-full h-full object-cover grayscale contrast-125 transition-all duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80';
                  }}
                />
              </div>

              <h3 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-wider text-foreground dark:text-white mb-2">
                {team[0].name}
              </h3>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent font-bold mb-4 block">
                {team[0].position}
              </span>
              <p className="text-xs sm:text-sm text-foreground/75 dark:text-white/60 leading-relaxed font-light max-w-md">
                {team[0].bio}
              </p>
            </div>

            {/* Column 2: Lawrence Hill / Sarah Chen (Name & Text on Top -> Photo Below, matching Image 3!) */}
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-wider text-foreground dark:text-white mb-2">
                  {team[1].name}
                </h3>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent font-bold mb-4 block">
                  {team[1].position}
                </span>
                <p className="text-xs sm:text-sm text-foreground/75 dark:text-white/60 leading-relaxed font-light max-w-md mb-8">
                  {team[1].bio}
                </p>
              </div>

              <div className="relative aspect-[4/5] max-w-md overflow-hidden bg-[#0d0f14] border border-black/10 dark:border-white/10 shadow-2xl group">
                <img loading="lazy" decoding="async"
                  src={team[1].image}
                  alt={team[1].name}
                  className="w-full h-full object-cover grayscale contrast-125 transition-all duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80';
                  }}
                />
              </div>
            </div>
          </div>

          {/* Third Principal / Development Director Card */}
          {team[2] && (
            <div className="mt-16 sm:mt-24 pt-12 border-t border-black/10 dark:border-white/10 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center max-w-5xl">
              <div className="relative aspect-[16/10] overflow-hidden bg-[#0d0f14] border border-black/10 dark:border-white/10 shadow-xl group">
                <img loading="lazy" decoding="async"
                  src={team[2].image}
                  alt={team[2].name}
                  className="w-full h-full object-cover grayscale contrast-125 transition-all duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80';
                  }}
                />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-wider text-foreground dark:text-white mb-2">
                  {team[2].name}
                </h3>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent font-bold mb-4 block">
                  {team[2].position}
                </span>
                <p className="text-xs sm:text-sm text-foreground/75 dark:text-white/60 leading-relaxed font-light max-w-md">
                  {team[2].bio}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Company Story */}
      <section id="company-story" className="py-20 relative border-t border-black/10 dark:border-white/5 bg-[#ede7dc] dark:bg-[#090b10]">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <span className="text-[9px] uppercase tracking-[0.3em] text-accent font-mono font-bold block mb-4">
            {copy.heritageEyebrow}
          </span>
          <h2 className="text-3xl font-display font-medium text-foreground dark:text-white mb-8">
            {copy.heritageTitle}
          </h2>

          <div className="space-y-6 text-xs text-foreground/75 dark:text-white/60 font-light leading-relaxed">
            <p className="text-sm text-foreground/90 dark:text-white/80 leading-relaxed font-normal">
              {copy.heritageP1}
            </p>
            <p>
              {copy.heritageP2}
            </p>
            <p>
              {copy.heritageP3}
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 border-t border-black/10 dark:border-white/5 bg-transparent">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-[9px] uppercase tracking-[0.3em] text-accent font-mono font-bold block mb-3">
              {copy.valuesEyebrow}
            </span>
            <h2 className="text-3xl font-display font-medium text-foreground dark:text-white">
              {copy.valuesTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, idx) => (
              <div
                key={idx}
                className="border border-black/10 dark:border-white/5 bg-white dark:bg-[#0a0c10]/60 p-8 relative hover:border-accent/30 dark:hover:border-accent/20 transition-colors duration-500 shadow-xl dark:shadow-2xl"
              >
                <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-accent/40" />
                <div className="w-10 h-10 border border-black/10 dark:border-white/10 bg-[#f8f7f4] dark:bg-[#0c0d10] flex items-center justify-center text-accent mb-6 shadow-sm">
                  <val.icon size={16} />
                </div>

                <h3 className="text-base font-display font-medium text-foreground dark:text-white mb-3">
                  {val.title}
                </h3>

                <p className="text-[11px] text-foreground/75 dark:text-white/50 leading-relaxed font-light">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Track Record Stats */}
      <section className="py-24 border-t border-black/10 dark:border-white/5 bg-transparent">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="text-center p-6 bg-white dark:bg-[#0a0c10]/40 border border-black/10 dark:border-white/5 relative shadow-md dark:shadow-none"
              >
                <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-accent/30" />
                <div className="text-2xl sm:text-3xl font-display font-medium text-accent mb-2">
                  {statValue(stat, currency.code)}
                </div>
                <div className="text-[9px] font-mono uppercase tracking-widest text-foreground/60 dark:text-white/40 font-bold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action - Clean Luxury Plaque */}
      <section className="py-24 border-t border-black/10 dark:border-white/5 bg-[#ede7dc] dark:bg-[#0d0f14]/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(223,186,72,0.05),transparent_40%)] pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8 text-center relative z-10 max-w-3xl">
          <span className="text-[9px] uppercase tracking-[0.3em] text-accent font-mono font-bold block mb-4">
            {copy.ctaEyebrow}
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-medium text-foreground dark:text-white mb-6 leading-none">
            {copy.ctaTitle} <span className="text-accent italic font-light">{copy.ctaAccent}</span>
          </h2>
          <p className="text-xs text-foreground/75 dark:text-white/55 leading-relaxed font-light mb-10 max-w-md mx-auto">
            {copy.ctaBody}
          </p>
          <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-5 justify-center items-stretch sm:items-center">
            <MagneticButton strength={20} className="w-full sm:w-auto" as="div">
              <Button asChild className="w-full sm:w-auto h-13 sm:h-14 px-8 py-4 bg-accent text-white hover:bg-accent-glow font-display font-black text-xs uppercase tracking-[0.2em] rounded-none border border-accent hover:border-accent-glow shadow-[0_10px_30px_rgba(223,186,72,0.25)] flex items-center justify-center gap-2 group transition-all">
                <Link to="/contact">
                  <span>{copy.ctaPrimary}</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
            </MagneticButton>
            <MagneticButton strength={20} className="w-full sm:w-auto" as="div">
              <Button asChild variant="outline" className="w-full sm:w-auto h-13 sm:h-14 px-8 py-4 bg-white/80 dark:bg-transparent text-[#111215] dark:text-white hover:bg-black/5 dark:hover:bg-white/10 hover:border-accent dark:hover:border-accent hover:text-accent dark:hover:text-accent font-display font-black text-xs uppercase tracking-[0.2em] rounded-none border border-black/20 dark:border-white/20 transition-all flex items-center justify-center shadow-sm">
                <Link to="/properties">{copy.ctaSecondary}</Link>
              </Button>
            </MagneticButton>
          </div>

          <div className="mt-12 flex justify-center items-center gap-2 text-[8px] font-mono uppercase tracking-[0.2em] text-foreground/60 dark:text-white/35">
            <ShieldCheck size={11} className="text-accent" />
            {copy.ctaFooter}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;