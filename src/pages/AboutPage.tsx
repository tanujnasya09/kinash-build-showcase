import { Target, Heart, Users, Award, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SEOHead from '@/components/SEO/SEOHead';
import MagneticButton from '@/components/ui/MagneticButton';
import { useLanguage } from '@/context/LanguageContext';
import { statValue } from '@/lib/stat';

const valueIcons = [Target, Heart, Users, Award];

const teamImages = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1494790108755-2616b9234ccd?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
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
    <div className="min-h-screen bg-[#0c0d10] text-white pt-20 sm:pt-24 lg:pt-28 pb-16 relative overflow-hidden">
      <SEOHead
        title={copy.meta.title}
        description={copy.meta.description}
        keywords={copy.meta.keywords}
        canonical="/about"
      />

      {/* Decorative technical line grid */}
      <div className="absolute inset-0 flex justify-between pointer-events-none opacity-5 px-12 z-0">
        <div className="w-[1px] h-full bg-white" />
        <div className="w-[1px] h-full bg-white hidden md:block" />
        <div className="w-[1px] h-full bg-white hidden md:block" />
        <div className="w-[1px] h-full bg-white" />
      </div>

      {/* Hero Section */}
      <section className="py-8 sm:py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0c10] to-transparent opacity-40 z-0" />
        <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-5xl">
          <span className="text-[9px] uppercase tracking-[0.3em] text-accent font-mono font-bold block mb-2.5 sm:mb-4">
            {copy.eyebrow}
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-medium leading-[1.1] sm:leading-none mb-3.5 sm:mb-6">
            {copy.title} <span className="text-accent italic font-light">{copy.titleAccent}</span>
          </h1>
          <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light max-w-2xl">
            {copy.intro}
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 relative border-t border-white/5 bg-[#090b10]">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <span className="text-[9px] uppercase tracking-[0.3em] text-accent font-mono font-bold block mb-4">
            {copy.heritageEyebrow}
          </span>
          <h2 className="text-3xl font-display font-medium text-white mb-8">
            {copy.heritageTitle}
          </h2>

          <div className="space-y-6 text-xs text-white/60 font-light leading-relaxed">
            <p className="text-sm text-white/80 leading-relaxed font-normal">
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
      <section className="py-24 border-t border-white/5 bg-[#0c0d10]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-[9px] uppercase tracking-[0.3em] text-accent font-mono font-bold block mb-3">
              {copy.valuesEyebrow}
            </span>
            <h2 className="text-3xl font-display font-medium text-white">
              {copy.valuesTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, idx) => (
              <div
                key={idx}
                className="border border-white/5 bg-[#0a0c10]/60 p-8 relative hover:border-accent/20 transition-colors duration-500 shadow-2xl"
              >
                <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-accent/40" />
                <div className="w-10 h-10 border border-white/10 bg-[#0c0d10] flex items-center justify-center text-accent mb-6">
                  <val.icon size={16} />
                </div>

                <h3 className="text-base font-display font-medium text-white mb-3">
                  {val.title}
                </h3>

                <p className="text-[11px] text-white/50 leading-relaxed font-light">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-24 border-t border-white/5 bg-[#090b10]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-[9px] uppercase tracking-[0.3em] text-accent font-mono font-bold block mb-3">
              {copy.teamEyebrow}
            </span>
            <h2 className="text-3xl font-display font-medium text-white">
              {copy.teamTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, idx) => (
              <div
                key={idx}
                className="border border-white/5 bg-[#0a0c10]/60 hover:border-accent/25 transition-all duration-500 group shadow-2xl relative"
              >
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent/30" />
                <div className="relative aspect-square overflow-hidden bg-[#0d0f14] border-b border-white/5">
                  <img loading="lazy" decoding="async" src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-base font-display font-medium text-white mb-1">
                    {member.name}
                  </h3>

                  <span className="text-[9px] font-mono uppercase tracking-widest text-accent block mb-4">
                    {member.position}
                  </span>

                  <p className="text-[11px] text-white/50 leading-relaxed font-light">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Track Record Stats */}
      <section className="py-24 border-t border-white/5 bg-[#0c0d10]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="text-center p-6 bg-[#0a0c10]/40 border border-white/5 relative"
              >
                <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-accent/30" />
                <div className="text-2xl sm:text-3xl font-display font-medium text-accent mb-2">
                  {statValue(stat, currency.code)}
                </div>
                <div className="text-[9px] font-mono uppercase tracking-widest text-white/40 font-bold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action - Clean Luxury Plaque */}
      <section className="py-24 border-t border-white/5 bg-[#0d0f14]/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(223,186,72,0.05),transparent_40%)] pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8 text-center relative z-10 max-w-3xl">
          <span className="text-[9px] uppercase tracking-[0.3em] text-accent font-mono font-bold block mb-4">
            {copy.ctaEyebrow}
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-medium text-white mb-6 leading-none">
            {copy.ctaTitle} <span className="text-accent italic font-light">{copy.ctaAccent}</span>
          </h2>
          <p className="text-xs text-white/55 leading-relaxed font-light mb-10 max-w-md mx-auto">
            {copy.ctaBody}
          </p>
          <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-5 justify-center items-stretch sm:items-center">
            <MagneticButton strength={20} className="w-full sm:w-auto" as="div">
              <Button asChild className="w-full sm:w-auto h-13 sm:h-14 px-8 py-4 bg-accent text-[#0c0d10] hover:bg-accent-glow font-display font-black text-xs uppercase tracking-[0.2em] rounded-none border border-accent hover:border-accent-glow shadow-[0_10px_30px_rgba(223,186,72,0.25)] flex items-center justify-center gap-2 group transition-all">
                <Link to="/contact">
                  <span>{copy.ctaPrimary}</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
            </MagneticButton>
            <MagneticButton strength={20} className="w-full sm:w-auto" as="div">
              <Button asChild className="w-full sm:w-auto h-13 sm:h-14 px-8 py-4 bg-transparent text-white hover:bg-white hover:text-[#0c0d10] font-display font-black text-xs uppercase tracking-[0.2em] rounded-none border border-white/20 hover:border-white transition-all flex items-center justify-center">
                <Link to="/properties">{copy.ctaSecondary}</Link>
              </Button>
            </MagneticButton>
          </div>

          <div className="mt-12 flex justify-center items-center gap-2 text-[8px] font-mono uppercase tracking-[0.2em] text-white/35">
            <ShieldCheck size={11} className="text-accent" />
            {copy.ctaFooter}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;