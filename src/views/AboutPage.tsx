'use client';

import { Target, Heart, Users, Award, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SEOHead from '@/components/SEO/SEOHead';
import MagneticButton from '@/components/ui/MagneticButton';
import { useLanguage } from '@/context/LanguageContext';
import ArchitecturalGrid from '@/components/ui/ArchitecturalGrid';
import siteConfig from '@/config/site';
import siteStats from '@/config/siteStats';
import CountUpStat from '@/components/ui/CountUpStat';
import { formatMoneyCompact } from '@/lib/currency';

const valueIcons = [Target, Heart, Users, Award];

const AboutPage = () => {
  const { content, currency, language } = useLanguage();
  const copy = content.about;

  const teamImages = [
    siteConfig.images.team.michael,
    siteConfig.images.team.sarah,
    siteConfig.images.team.david,
  ];

  const values = copy.values.map((value, idx) => ({
    ...value,
    icon: valueIcons[idx] || Target,
  }));

  const team = copy.team.map((member, idx) => ({
    ...member,
    image: teamImages[idx] || teamImages[0],
  }));

  const statsList = [
    {
      value: (
        <CountUpStat
          value={siteStats.projects.numericValue}
          suffix={siteStats.projects.suffix}
          formattedFallback={siteStats.projects.formattedRaw}
        />
      ),
      label: siteStats.projects.labels[language] || 'Projects Completed',
    },
    {
      value: (
        <CountUpStat
          value={siteStats.years.numericValue}
          suffix={siteStats.years.suffix}
          formattedFallback={siteStats.years.formattedRaw}
        />
      ),
      label: siteStats.years.labels[language] || 'Years Experience',
    },
    {
      value: `${formatMoneyCompact(siteStats.value.amountInINR!, currency.code)}+`,
      label: siteStats.value.labels[language] || 'Equity Delivered',
    },
    {
      value: (
        <CountUpStat
          value={siteStats.satisfaction.numericValue}
          suffix={siteStats.satisfaction.suffix}
          formattedFallback={siteStats.satisfaction.formattedRaw}
        />
      ),
      label: siteStats.satisfaction.labels[language] || 'Client Satisfaction',
    },
    {
      value: (
        <CountUpStat
          value={siteStats.awards.numericValue}
          suffix={siteStats.awards.suffix}
          formattedFallback={siteStats.awards.formattedRaw}
        />
      ),
      label: siteStats.awards.labels[language] || 'Industry Awards',
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f7f4] dark:bg-[#0c0d10] text-foreground dark:text-white pb-16 relative overflow-hidden">
      <SEOHead
        title={copy.meta.title}
        description={copy.meta.description}
        keywords={copy.meta.keywords}
        canonical="/about"
      />

      {/* Architectural Drafting Blueprint Grid */}
      <ArchitecturalGrid columns={5} />

      {/* Editorial Architectural Hero */}
      <section className="relative pt-20 sm:pt-24 lg:pt-28 pb-10 sm:pb-14 lg:pb-16 overflow-hidden border-b border-black/10 dark:border-white/5">
        <div
          className="hero-bg-image absolute inset-0 bg-cover bg-center opacity-85 md:opacity-90"
          style={{ backgroundImage: `url('${siteConfig.images.aboutHero.url}')` }}
        />
        {/* Left Veil: High contrast readable text */}
        <div className="hero-gradient-overlay absolute inset-0 bg-gradient-to-r from-[#f8f7f4] via-[#f8f7f4]/98 sm:via-[#f8f7f4]/90 to-[#f8f7f4]/40 lg:to-transparent dark:from-[#0c0d10] dark:via-[#0c0d10]/98 sm:dark:via-[#0c0d10]/90 dark:to-[#0c0d10]/40 lg:dark:to-transparent" />

        <div className="relative z-10 container mx-auto px-4 md:px-8">
          <div className="max-w-3xl text-left">
            {/* Architectural Eyebrow with Accent Line */}
            <div className="inline-flex items-center gap-3 mb-3 sm:mb-4">
              <span className="w-8 h-[2px] bg-accent inline-block" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-accent font-mono font-bold">
                {copy.eyebrow || 'CORPORATE PROFILE'}
              </span>
            </div>

            {/* Sentence-case Headline with Gold Italic Accent */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-medium text-foreground dark:text-white mb-3 sm:mb-4 leading-[1.1] sm:leading-none">
              <span className="block">{copy.title}</span>
              <span className="block text-accent italic font-light">{copy.titleAccent}</span>
            </h1>

            <p className="text-xs sm:text-sm text-foreground/80 dark:text-white/70 mb-5 sm:mb-6 leading-relaxed max-w-xl font-light">
              {copy.intro}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-row gap-2.5 sm:gap-4 justify-start items-center w-full max-w-md mb-6">
              <MagneticButton strength={15} className="flex-1 sm:flex-initial" as="div">
                <Button asChild className="w-full sm:w-auto h-11 sm:h-12 px-6 sm:px-8 bg-accent text-[#0c0d10] hover:bg-accent-glow font-display font-black text-xs uppercase tracking-[0.15em] rounded-none border border-accent hover:border-accent-glow shadow-[0_10px_30px_rgba(223,186,72,0.25)] flex items-center justify-center gap-2 group transition-all whitespace-nowrap cursor-pointer">
                  <a href="#about-section">
                    <span>EXECUTIVE COUNCIL</span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                </Button>
              </MagneticButton>
              <MagneticButton strength={15} className="flex-1 sm:flex-initial" as="div">
                <Button asChild variant="outline" className="w-full sm:w-auto h-11 sm:h-12 px-6 sm:px-8 bg-white dark:bg-transparent text-[#0c0d10] dark:text-white hover:bg-zinc-100 hover:text-white hover:border-accent dark:hover:bg-accent/25 dark:hover:border-accent dark:hover:text-white font-display font-black text-xs uppercase tracking-[0.15em] rounded-none border border-black/20 dark:border-white/20 transition-all flex items-center justify-center whitespace-nowrap shadow-xs cursor-pointer">
                  <a href="#company-story">OUR HERITAGE</a>
                </Button>
              </MagneticButton>
            </div>

            {/* Corporate Profile Metrics Indicator Bar */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-6 pt-5 border-t border-black/10 dark:border-white/10 text-xs text-foreground/80 dark:text-white/70 font-mono">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-accent" />
                <span><strong className="text-foreground dark:text-white font-bold">{siteStats.years.formattedRaw}</strong> Heritage & Leadership</span>
              </div>
              <div className="hidden sm:block w-[1px] h-3 bg-black/15 dark:bg-white/15" />
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-accent" />
                <span><strong className="text-foreground dark:text-white font-bold">{siteStats.projects.formattedRaw}</strong> Masterpieces Built</span>
              </div>
              <div className="hidden sm:block w-[1px] h-3 bg-black/15 dark:bg-white/15" />
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-accent" />
                <span><strong className="text-accent font-bold">100%</strong> Fiduciary Governance</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Governance & Leadership - Balanced 3-Column Grid */}
      <section id="about-section" className="py-10 sm:py-14 border-b border-black/10 dark:border-white/5 bg-transparent relative">
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-3xl mb-8 sm:mb-10 text-left">
            <div className="w-12 sm:w-16 h-[2px] bg-accent mb-3" />
            <span className="text-xs uppercase tracking-[0.25em] font-mono font-bold text-accent block mb-2">
              {copy.teamEyebrow || 'EXECUTIVE COUNCIL'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-medium text-foreground dark:text-white">
              {copy.teamTitle || 'Governance & Leadership'}
            </h2>
          </div>

          {/* Equal 3-Column 4:5 Grid for all leaders */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {team.map((member, idx) => (
              <div
                key={idx}
                className="flex flex-col border border-black/10 dark:border-white/10 bg-white dark:bg-[#12141a] p-4 sm:p-5 shadow-sm dark:shadow-xl group hover:border-accent/40 dark:hover:border-accent/30 transition-all duration-300 text-left"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#0d0f14] border border-black/10 dark:border-white/10 mb-4">
                  <img
                    loading="lazy"
                    decoding="async"
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <h3 className="text-base sm:text-lg font-display font-bold text-foreground dark:text-white mb-1">
                  {member.name}
                </h3>
                <span className="text-xs font-mono uppercase tracking-[0.16em] text-accent font-bold mb-3 block">
                  {member.position}
                </span>
                <p className="text-xs sm:text-sm text-foreground/75 dark:text-white/60 leading-relaxed font-light">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Story / Heritage (~65 characters per line, >=16px text) */}
      <section id="company-story" className="py-10 sm:py-14 relative border-t border-black/10 dark:border-white/5 bg-[#ede7dc] dark:bg-[#090b10]">
        <div className="container mx-auto px-4 md:px-8 max-w-2xl text-left">
          <span className="text-xs uppercase tracking-[0.25em] text-accent font-mono font-bold block mb-2">
            {copy.heritageEyebrow}
          </span>
          <h2 className="text-2xl sm:text-4xl font-display font-medium text-foreground dark:text-white mb-6">
            {copy.heritageTitle}
          </h2>

          <div className="space-y-4 text-base text-foreground/85 dark:text-white/80 font-light leading-relaxed">
            <p className="font-normal text-foreground dark:text-white">
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

      {/* Principles & Operating Standards */}
      <section className="py-10 sm:py-14 border-t border-black/10 dark:border-white/5 bg-transparent">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mb-8 sm:mb-10 text-left">
            <span className="text-xs uppercase tracking-[0.25em] text-accent font-mono font-bold block mb-2">
              {copy.valuesEyebrow}
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-medium text-foreground dark:text-white">
              {copy.valuesTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {values.map((val, idx) => (
              <div
                key={idx}
                className="border border-black/10 dark:border-white/5 bg-white dark:bg-[#0a0c10]/70 p-5 sm:p-6 relative hover:border-accent/40 dark:hover:border-accent/30 transition-colors duration-500 shadow-md dark:shadow-2xl text-left"
              >
                <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-accent/40" />
                <div className="w-10 h-10 border border-black/10 dark:border-white/10 bg-[#f8f7f4] dark:bg-[#0c0d10] flex items-center justify-center text-accent mb-4 shadow-xs">
                  <val.icon size={16} />
                </div>

                <h3 className="text-base font-display font-medium text-foreground dark:text-white mb-2">
                  {val.title}
                </h3>

                <p className="text-xs sm:text-sm text-foreground/75 dark:text-white/60 leading-relaxed font-light">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Track Record Stats - 5 Canonical Metrics */}
      <section className="py-10 sm:py-14 border-t border-black/10 dark:border-white/5 bg-transparent">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
            {statsList.map((stat, idx) => (
              <div
                key={idx}
                className="text-center p-5 bg-white dark:bg-[#0a0c10]/60 border border-black/10 dark:border-white/5 relative shadow-sm dark:shadow-none"
              >
                <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-accent/30" />
                <div className="text-2xl sm:text-3xl font-display font-medium text-accent mb-1">
                  {stat.value}
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-foreground/75 dark:text-white/60 font-bold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-16 border-t border-black/10 dark:border-white/5 bg-[#ede7dc] dark:bg-[#0d0f14]/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(223,186,72,0.05),transparent_40%)] pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8 text-center relative z-10 max-w-3xl">
          <span className="text-[9px] uppercase tracking-[0.3em] text-accent font-mono font-bold block mb-2 sm:mb-3">
            {copy.ctaEyebrow}
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-medium text-foreground dark:text-white mb-3 sm:mb-4 leading-none">
            {copy.ctaTitle} <span className="text-accent italic font-light">{copy.ctaAccent}</span>
          </h2>
          <p className="text-xs sm:text-sm text-foreground/75 dark:text-white/60 leading-relaxed font-light mb-6 sm:mb-8 max-w-md mx-auto">
            {copy.ctaBody}
          </p>
          <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 justify-center items-stretch sm:items-center">
            <MagneticButton strength={20} className="w-full sm:w-auto" as="div">
              <Button asChild className="w-full sm:w-auto h-12 sm:h-13 px-8 py-3.5 bg-accent text-[#0c0d10] hover:bg-accent-glow font-display font-black text-xs uppercase tracking-[0.2em] rounded-none border border-accent hover:border-accent-glow shadow-[0_10px_30px_rgba(223,186,72,0.25)] flex items-center justify-center gap-2 group transition-all cursor-pointer">
                <Link to="/contact">
                  <span>{copy.ctaPrimary}</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
            </MagneticButton>
            <MagneticButton strength={20} className="w-full sm:w-auto" as="div">
              <Button asChild variant="outline" className="w-full sm:w-auto h-12 sm:h-13 px-8 py-3.5 bg-white dark:bg-transparent text-[#0c0d10] dark:text-white hover:bg-accent hover:text-white hover:border-accent dark:hover:bg-accent/25 dark:hover:border-accent dark:hover:text-white font-display font-black text-xs uppercase tracking-[0.2em] rounded-none border border-black/20 dark:border-white/20 transition-all flex items-center justify-center shadow-xs hover:shadow-md cursor-pointer">
                <Link to="/properties">{copy.ctaSecondary}</Link>
              </Button>
            </MagneticButton>
          </div>

          <div className="mt-8 sm:mt-10 flex justify-center items-center gap-2 text-[8px] font-mono uppercase tracking-[0.2em] text-foreground/60 dark:text-white/35">
            <ShieldCheck size={12} className="text-accent" />
            {copy.ctaFooter}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;