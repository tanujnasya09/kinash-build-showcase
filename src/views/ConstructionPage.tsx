'use client';

import { Building, Construction, HardHat, Wrench, CheckCircle, Calendar, DollarSign, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import MagneticButton from '@/components/ui/MagneticButton';
import SEOHead from '@/components/SEO/SEOHead';
import { useLanguage } from '@/context/LanguageContext';
import ArchitecturalGrid from '@/components/ui/ArchitecturalGrid';
import siteConfig from '@/config/site';
import siteStats from '@/config/siteStats';

const capabilityIcons = [Building, HardHat, Construction, Wrench];
const advantageIcons = [CheckCircle, Calendar, DollarSign, Users];

const ConstructionPage = () => {
  const { content } = useLanguage();
  const copy = content.construction;

  const projectImages = [
    siteConfig.images.constructionProjects.commercial.url,
    siteConfig.images.constructionProjects.residential.url,
    siteConfig.images.constructionProjects.mixedUse.url,
  ];

  const capabilities = copy.capabilities.map((capability, idx) => ({
    ...capability,
    icon: capabilityIcons[idx],
  }));

  const featuredProjects = copy.projects.map((project, idx) => ({
    ...project,
    image: projectImages[idx] || projectImages[0],
  }));

  const advantages = copy.advantages.map((advantage, idx) => ({
    ...advantage,
    icon: advantageIcons[idx],
  }));

  return (
    <div className="min-h-screen bg-[#f8f7f4] dark:bg-[#0c0d10] text-foreground dark:text-white pb-16 relative overflow-hidden">
      <SEOHead
        title={copy.meta.title}
        description={copy.meta.description}
        keywords={copy.meta.keywords}
        canonical="/construction"
      />

      {/* Architectural Drafting Blueprint Grid */}
      <ArchitecturalGrid columns={5} />

      {/* Hero Section with Cinematic Background Photography */}
      <section className="relative pt-20 sm:pt-24 lg:pt-28 pb-10 sm:pb-14 lg:pb-16 overflow-hidden border-b border-black/10 dark:border-white/5">
        <div
          className="hero-bg-image absolute inset-0 bg-cover bg-center opacity-85 md:opacity-90"
          style={{ backgroundImage: `url('${siteConfig.images.constructionHero.url}')` }}
        />
        {/* Left Veil: High contrast readable text */}
        <div className="hero-gradient-overlay absolute inset-0 bg-gradient-to-r from-[#f8f7f4] via-[#f8f7f4]/98 sm:via-[#f8f7f4]/90 to-[#f8f7f4]/40 lg:to-transparent dark:from-[#0c0d10] dark:via-[#0c0d10]/98 sm:dark:via-[#0c0d10]/90 dark:to-[#0c0d10]/40 lg:dark:to-transparent" />

        <div className="relative z-10 container mx-auto px-4 md:px-8">
          <div className="max-w-3xl text-left">
            {/* Architectural Eyebrow with Accent Line */}
            <div className="inline-flex items-center gap-3 mb-3 sm:mb-4">
              <span className="w-8 h-[2px] bg-accent inline-block" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-accent font-mono font-bold">
                {copy.eyebrow || 'CIVIL CONTRACTING & ENGINEERING'}
              </span>
            </div>

            {/* Title with Italic Accent */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-medium text-foreground dark:text-white mb-3 sm:mb-4 leading-[1.1] sm:leading-none">
              <span className="block">{copy.title}</span>
              <span className="block text-accent italic font-light">{copy.titleAccent}</span>
            </h1>

            {/* Clear Communicative Intro */}
            <p className="text-xs sm:text-sm text-foreground/80 dark:text-white/70 mb-5 sm:mb-6 leading-relaxed max-w-xl font-light">
              {copy.intro}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-row gap-2.5 sm:gap-4 justify-start items-center w-full max-w-md mb-6">
              <MagneticButton strength={15} className="flex-1 sm:flex-initial" as="div">
                <Button asChild className="w-full sm:w-auto h-11 sm:h-12 px-6 sm:px-8 bg-accent text-[#0c0d10] hover:bg-accent-glow font-display font-black text-xs uppercase tracking-[0.15em] rounded-none border border-accent hover:border-accent-glow shadow-[0_10px_30px_rgba(223,186,72,0.25)] flex items-center justify-center gap-2 group transition-all whitespace-nowrap cursor-pointer">
                  <Link to="/contact">
                    <span>{copy.heroCtaPrimary}</span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
              </MagneticButton>
              <MagneticButton strength={15} className="flex-1 sm:flex-initial" as="div">
                <Button asChild variant="outline" className="w-full sm:w-auto h-11 sm:h-12 px-6 sm:px-8 bg-white dark:bg-transparent text-[#0c0d10] dark:text-white hover:bg-zinc-100 hover:text-white hover:border-accent dark:hover:bg-accent/25 dark:hover:border-accent dark:hover:text-white font-display font-black text-xs uppercase tracking-[0.15em] rounded-none border border-black/20 dark:border-white/20 transition-all flex items-center justify-center whitespace-nowrap shadow-xs cursor-pointer">
                  <Link to="/properties">{copy.heroCtaSecondary}</Link>
                </Button>
              </MagneticButton>
            </div>

            {/* Engineering Standards Indicator Bar with Canonical SiteStats */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-6 pt-5 border-t border-black/10 dark:border-white/10 text-xs text-foreground/80 dark:text-white/70 font-mono">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-accent" />
                <span><strong className="text-foreground dark:text-white font-bold">{siteStats.projects.formattedRaw}</strong> Projects Delivered</span>
              </div>
              <div className="hidden sm:block w-[1px] h-3 bg-black/15 dark:bg-white/15" />
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-accent" />
                <span><strong className="text-foreground dark:text-white font-bold">{siteStats.years.formattedRaw}</strong> Civil Engineering</span>
              </div>
              <div className="hidden sm:block w-[1px] h-3 bg-black/15 dark:bg-white/15" />
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-accent" />
                <span><strong className="text-accent font-bold">100%</strong> Seismic Compliance</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-10 sm:py-14 relative z-10 bg-transparent">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <span className="text-xs uppercase tracking-[0.25em] text-accent font-mono font-bold block mb-2">
              {copy.capabilitiesEyebrow}
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-medium text-foreground dark:text-white">
              {copy.capabilitiesTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {capabilities.map((cap, index) => (
              <div
                key={index}
                className="border border-black/10 dark:border-white/5 bg-white dark:bg-[#0a0c10]/70 p-6 sm:p-8 hover:border-accent/40 dark:hover:border-accent/30 transition-all duration-500 shadow-md dark:shadow-2xl relative"
              >
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent/40" />
                <div className="flex items-start space-x-5 sm:space-x-6">
                  <div className="w-12 h-12 border border-black/10 dark:border-white/10 bg-[#f8f7f4] dark:bg-[#0d0f14] flex items-center justify-center text-accent flex-shrink-0 shadow-xs">
                    <cap.icon size={18} />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-display font-medium text-foreground dark:text-white mb-2">
                      {cap.title}
                    </h3>
                    <p className="text-xs text-foreground/75 dark:text-white/60 leading-relaxed mb-5 font-light">
                      {cap.description}
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {cap.projects.map((project, idx) => (
                        <li key={idx} className="flex items-center text-xs font-mono uppercase tracking-wide text-foreground/75 dark:text-white/60">
                          <div className="w-1.5 h-1.5 bg-accent mr-2 shrink-0" />
                          <span>{project}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-10 sm:py-14 border-t border-black/10 dark:border-white/5 bg-[#ede7dc] dark:bg-[#090b10]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <span className="text-xs uppercase tracking-[0.25em] text-accent font-mono font-bold block mb-2">
              {copy.projectsEyebrow}
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-medium text-foreground dark:text-white">
              {copy.projectsTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredProjects.map((project, index) => (
              <div
                key={index}
                className="border border-black/10 dark:border-white/5 bg-white dark:bg-[#0a0c10]/70 hover:border-accent/40 dark:hover:border-accent/30 transition-all duration-500 group shadow-md dark:shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent/40 z-20" />
                <div className="relative aspect-[4/3] overflow-hidden bg-[#0d0f14] border-b border-black/5 dark:border-white/5">
                  <img loading="lazy" decoding="async" src={project.image}
                    alt={project.title}
                    onError={(e) => {
                      e.currentTarget.src = siteConfig.images.constructionProjects.commercial.url;
                    }}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3.5 left-3.5 z-10">
                    <span className="bg-white/95 dark:bg-[#0c0d10]/90 border border-black/10 dark:border-white/10 text-foreground dark:text-white font-mono text-[9px] uppercase tracking-widest px-3 py-1.5 backdrop-blur-md shadow-xs font-bold">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:p-6 text-left">
                  <h3 className="text-base sm:text-lg font-display font-medium text-foreground dark:text-white mb-2 group-hover:text-accent transition-colors leading-snug">
                    {project.title}
                  </h3>

                  <div className="flex justify-between font-mono text-xs text-accent uppercase tracking-wider mb-3.5 border-b border-black/5 dark:border-white/5 pb-2 font-bold">
                    <span>{project.size}</span>
                    <span>{copy.projectsCompletedPrefix} {project.completion}</span>
                  </div>

                  <p className="text-xs text-foreground/75 dark:text-white/60 leading-relaxed font-light">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-10 sm:py-14 border-t border-black/10 dark:border-white/5 bg-transparent">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <span className="text-xs uppercase tracking-[0.25em] text-accent font-mono font-bold block mb-2">
              {copy.advantagesEyebrow}
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-medium text-foreground dark:text-white">
              {copy.advantagesTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {advantages.map((adv, index) => (
              <div
                key={index}
                className="border border-black/10 dark:border-white/5 bg-white dark:bg-[#0a0c10]/60 p-6 sm:p-8 relative hover:border-accent/40 dark:hover:border-accent/30 transition-all duration-500 shadow-md dark:shadow-2xl text-left"
              >
                <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-accent/40" />
                <div className="w-10 h-10 border border-black/10 dark:border-white/10 bg-[#f8f7f4] dark:bg-[#0d0f14] flex items-center justify-center text-accent mb-5 shadow-xs">
                  <adv.icon size={16} />
                </div>

                <h3 className="text-sm font-display font-medium text-foreground dark:text-white mb-2">
                  {adv.title}
                </h3>

                <p className="text-xs text-foreground/75 dark:text-white/60 leading-relaxed font-light">
                  {adv.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
                <Link to="/contact">{copy.ctaSecondary}</Link>
              </Button>
            </MagneticButton>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConstructionPage;