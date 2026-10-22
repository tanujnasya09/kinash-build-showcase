import { Home, TrendingUp, Key, Search, DollarSign, Award, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import MagneticButton from '@/components/ui/MagneticButton';
import SEOHead from '@/components/SEO/SEOHead';
import { useLanguage } from '@/context/LanguageContext';
import { statValue } from '@/lib/stat';
import { formatMoneyCompact } from '@/lib/currency';
import ArchitecturalGrid from '@/components/ui/ArchitecturalGrid';

// High-end real estate and commercial photography URLs
const luxuryRealEstateImage = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&h=900&fit=crop";
const luxuryOfficeImage = "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop";
const luxuryIndustrialImage = "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop";

const serviceIcons = [Search, TrendingUp, Key, Home];
const statIcons = [DollarSign, Home, Award, Users];

const RealEstatePage = () => {
  const { content, currency } = useLanguage();
  const copy = content.realEstate;

  const services = copy.services.map((service, idx) => ({
    ...service,
    icon: serviceIcons[idx],
  }));

  const propertyTypes = copy.types.map((type, idx) => ({
    ...type,
    image: [luxuryOfficeImage, luxuryRealEstateImage, luxuryIndustrialImage][idx],
  }));

  const marketStats = copy.stats.map((stat, idx) => ({
    ...stat,
    icon: statIcons[idx],
  }));

  return (
    <div className="min-h-screen bg-[#f8f7f4] dark:bg-[#0c0d10] text-foreground dark:text-white pt-20 sm:pt-24 lg:pt-28 pb-16 relative overflow-hidden">
      <SEOHead
        title={copy.meta.title}
        description={copy.meta.description}
        keywords={copy.meta.keywords}
        canonical="/real-estate"
      />

      {/* Architectural Drafting Blueprint Grid */}
      <ArchitecturalGrid columns={5} />

      {/* Hero Section with Cinematic Background Photography */}
      <section className="relative py-16 sm:py-24 lg:py-36 overflow-hidden border-b border-black/10 dark:border-white/5">
        <div 
          className="hero-bg-image absolute inset-0 bg-cover bg-center opacity-90 md:opacity-95"
          style={{ backgroundImage: `url(${luxuryRealEstateImage})` }}
        />
        {/* Architectural Left-Veil Gradient: crystal-clear image on right, 100% readable typography on left */}
        <div className="hero-gradient-overlay absolute inset-0 bg-gradient-to-r from-[#f8f7f4] via-[#f8f7f4]/95 sm:via-[#f8f7f4]/85 to-transparent dark:from-[#0c0d10] dark:via-[#0c0d10]/95 sm:dark:via-[#0c0d10]/85 dark:to-transparent" />
        
        <div className="relative z-10 container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="max-w-2xl text-left">
            {/* Architectural Eyebrow with Accent Line */}
            <div className="inline-flex items-center gap-3 mb-3.5 sm:mb-6">
              <span className="w-8 h-[2px] bg-accent inline-block" />
              <span className="text-[9px] uppercase tracking-[0.3em] text-accent font-mono font-bold">
                {copy.eyebrow || 'REAL ESTATE ADVISORY'}
              </span>
            </div>

            {/* Title with Italic Accent */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-medium text-foreground dark:text-white mb-4 sm:mb-6 leading-[1.1] sm:leading-none">
              {copy.title} <span className="text-accent italic font-light">{copy.titleAccent}</span>
            </h1>

            {/* Clear Communicative Intro */}
            <p className="text-xs sm:text-sm text-foreground/80 dark:text-white/70 mb-6 sm:mb-8 leading-relaxed max-w-xl font-light">
              {copy.intro}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-row gap-2.5 sm:gap-5 w-full max-w-md mb-8">
              <MagneticButton strength={15} className="flex-1 sm:flex-initial" as="div">
                <Button asChild className="w-full sm:w-auto h-11 sm:h-14 px-3 sm:px-8 py-3 sm:py-4 bg-accent text-white hover:bg-accent-glow font-display font-black text-[10px] sm:text-xs uppercase tracking-[0.1em] sm:tracking-[0.2em] rounded-none border border-accent hover:border-accent-glow shadow-[0_10px_30px_rgba(223,186,72,0.25)] flex items-center justify-center gap-1.5 sm:gap-2 group transition-all whitespace-nowrap">
                  <Link to="/properties">
                    <span>{copy.heroCtaPrimary}</span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
              </MagneticButton>
              <MagneticButton strength={15} className="flex-1 sm:flex-initial" as="div">
                <Button asChild variant="outline" className="w-full sm:w-auto h-11 sm:h-14 px-3 sm:px-8 py-3 sm:py-4 bg-white/80 dark:bg-transparent text-[#111215] dark:text-white hover:bg-black/5 dark:hover:bg-white/10 hover:border-accent dark:hover:border-accent hover:text-accent dark:hover:text-accent font-display font-black text-[10px] sm:text-xs uppercase tracking-[0.1em] sm:tracking-[0.2em] rounded-none border border-black/20 dark:border-white/20 transition-all flex items-center justify-center whitespace-nowrap shadow-sm">
                  <Link to="/contact">{copy.heroCtaSecondary}</Link>
                </Button>
              </MagneticButton>
            </div>

            {/* Clear Division Value Metrics Bar */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-6 border-t border-black/10 dark:border-white/10 text-xs text-foreground/75 dark:text-white/60 font-mono">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-accent" />
                <span><strong className="text-foreground dark:text-white font-bold">40+</strong> Verified Plots</span>
              </div>
              <div className="hidden sm:block w-[1px] h-3 bg-black/15 dark:bg-white/15" />
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-accent" />
                <span><strong className="text-foreground dark:text-white font-bold">100%</strong> Clear Titles</span>
              </div>
              <div className="hidden sm:block w-[1px] h-3 bg-black/15 dark:bg-white/15" />
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-accent" />
                <span><strong className="text-accent font-bold">{formatMoneyCompact(2000000000, currency.code)}+</strong> Managed Equity</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 relative z-10 bg-transparent">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-[9px] uppercase tracking-[0.3em] text-accent font-mono font-bold block mb-3">
              {copy.servicesEyebrow}
            </span>
            <h2 className="text-3xl font-display font-medium text-foreground dark:text-white">
              {copy.servicesTitle}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="border border-black/10 dark:border-white/5 bg-white dark:bg-[#0a0c10]/60 p-8 hover:border-accent/40 dark:hover:border-accent/25 transition-all duration-500 shadow-xl dark:shadow-2xl relative"
              >
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent/40" />
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 border border-black/10 dark:border-white/10 bg-[#f8f7f4] dark:bg-[#0d0f14] flex items-center justify-center text-accent flex-shrink-0 shadow-sm">
                    <service.icon size={18} />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-base font-display font-medium text-foreground dark:text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-xs text-foreground/75 dark:text-white/50 leading-relaxed mb-6 font-light">
                      {service.description}
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-[9px] font-mono uppercase tracking-wide text-foreground/60 dark:text-white/40">
                          <div className="w-1 h-1 bg-accent mr-2" />
                          {feature}
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

      {/* Property Types */}
      <section className="py-24 border-t border-black/10 dark:border-white/5 bg-[#ede7dc] dark:bg-[#090b10]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-[9px] uppercase tracking-[0.3em] text-accent font-mono font-bold block mb-3">
              {copy.typesEyebrow}
            </span>
            <h2 className="text-3xl font-display font-medium text-foreground dark:text-white">
              {copy.typesTitle}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {propertyTypes.map((type, index) => (
              <div 
                key={index} 
                className="border border-black/10 dark:border-white/5 bg-white dark:bg-[#0a0c10]/60 hover:border-accent/40 dark:hover:border-accent/25 transition-all duration-500 group shadow-xl dark:shadow-2xl relative"
              >
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent/30" />
                <div className="relative aspect-[4/3] overflow-hidden bg-[#0d0f14] border-b border-black/5 dark:border-white/5">
                  <img loading="lazy" decoding="async" src={type.image} 
                    alt={type.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-base font-display font-medium text-foreground dark:text-white mb-2 group-hover:text-accent transition-colors">
                    {type.title}
                  </h3>
                  
                  <p className="text-xs text-foreground/75 dark:text-white/55 leading-relaxed font-light mb-6">
                    {type.description}
                  </p>
                  
                  <ul className="grid grid-cols-2 gap-2">
                    {type.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-[9px] font-mono uppercase tracking-wide text-foreground/60 dark:text-white/40">
                        <div className="w-1 h-1 bg-accent mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Stats */}
      <section className="py-24 border-t border-black/10 dark:border-white/5 bg-transparent">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-[9px] uppercase tracking-[0.3em] text-accent font-mono font-bold block mb-3">
              {copy.statsEyebrow}
            </span>
            <h2 className="text-3xl font-display font-medium text-foreground dark:text-white">
              {copy.statsTitle}
            </h2>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {marketStats.map((stat, index) => (
              <div 
                key={index} 
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

      {/* CTA Section */}
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
              <Button asChild className="w-full sm:w-auto h-13 sm:h-14 px-8 py-4 bg-accent text-[#0c0d10] hover:bg-accent-glow font-display font-black text-xs uppercase tracking-[0.2em] rounded-none border border-accent hover:border-accent-glow shadow-[0_10px_30px_rgba(223,186,72,0.25)] flex items-center justify-center gap-2 group transition-all">
                <Link to="/properties">
                  <span>{copy.ctaPrimary}</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
            </MagneticButton>
            <MagneticButton strength={20} className="w-full sm:w-auto" as="div">
              <Button asChild variant="outline" className="w-full sm:w-auto h-13 sm:h-14 px-8 py-4 bg-transparent text-[#111215] dark:text-white hover:bg-black/5 dark:hover:bg-white/10 hover:border-accent dark:hover:border-accent hover:text-accent dark:hover:text-accent font-display font-black text-xs uppercase tracking-[0.2em] rounded-none border border-black/20 dark:border-white/20 transition-all flex items-center justify-center">
                <Link to="/contact">{copy.ctaSecondary}</Link>
              </Button>
            </MagneticButton>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RealEstatePage;