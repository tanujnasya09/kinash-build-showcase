import { Building2, Home, Settings, TrendingUp, Shield, ClipboardList, ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SEOHead from '@/components/SEO/SEOHead';
import MagneticButton from '@/components/ui/MagneticButton';
import { useLanguage } from '@/context/LanguageContext';
import ArchitecturalGrid from '@/components/ui/ArchitecturalGrid';

const serviceIcons = [Building2, Home, TrendingUp, Settings, ClipboardList, Shield];
const serviceLinks = ['/construction', '/construction', '/real-estate', '/real-estate', '/about', '/about'];

const ServicesPage = () => {
  const { content } = useLanguage();
  const copy = content.services;

  const services = copy.services.map((service, idx) => ({
    ...service,
    icon: serviceIcons[idx],
    link: serviceLinks[idx],
  }));

  const process = copy.process;

  return (
    <div className="min-h-screen bg-[#f8f7f4] dark:bg-[#0c0d10] text-foreground dark:text-white pb-16 relative overflow-hidden">
      <SEOHead
        title={copy.meta.title}
        description={copy.meta.description}
        keywords={copy.meta.keywords}
        canonical="/services"
      />

      {/* Architectural Drafting Blueprint Grid */}
      <ArchitecturalGrid columns={5} />

      {/* Hero Section with Cinematic Background Photography */}
      <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-14 sm:pb-20 lg:pb-24 overflow-hidden border-b border-black/10 dark:border-white/5">
        <div 
          className="hero-bg-image absolute inset-0 bg-cover bg-center opacity-85 md:opacity-90"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&auto=format&fit=crop&q=80')" }}
        />
        {/* Left Veil: Crystal-clear photo on right, 100% readable text on left */}
        <div className="hero-gradient-overlay absolute inset-0 bg-gradient-to-r from-[#f8f7f4] via-[#f8f7f4]/95 sm:via-[#f8f7f4]/85 to-transparent dark:from-[#0c0d10] dark:via-[#0c0d10]/95 sm:dark:via-[#0c0d10]/85 dark:to-transparent" />
        
        <div className="relative z-10 container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="max-w-2xl text-left">
            {/* Architectural Eyebrow with Accent Line */}
            <div className="inline-flex items-center gap-3 mb-3.5 sm:mb-6">
              <span className="w-8 h-[2px] bg-accent inline-block" />
              <span className="text-[9px] uppercase tracking-[0.3em] text-accent font-mono font-bold">
                {copy.eyebrow || 'SERVICE PORTFOLIO'}
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

            {/* Action Button */}
            <div className="flex flex-row gap-2.5 sm:gap-4 justify-start items-center w-full max-w-md mb-8">
              <MagneticButton strength={15} className="flex-1 sm:flex-initial" as="div">
                <Button asChild className="w-full sm:w-auto h-11 sm:h-14 px-4 sm:px-8 py-3 sm:py-4 bg-accent text-white hover:bg-accent-glow font-display font-black text-[10px] sm:text-xs uppercase tracking-[0.1em] sm:tracking-[0.2em] rounded-none border border-accent hover:border-accent-glow shadow-[0_10px_30px_rgba(223,186,72,0.25)] flex items-center justify-center gap-2 group transition-all whitespace-nowrap">
                  <a href="#services-grid">
                    <span>EXPLORE ALL DIVISIONS</span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                </Button>
              </MagneticButton>
            </div>

            {/* Capabilities Metric Indicators */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-6 border-t border-black/10 dark:border-white/10 text-xs text-foreground/75 dark:text-white/60 font-mono">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-accent" />
                <span><strong className="text-foreground dark:text-white font-bold">6</strong> Core Capabilities</span>
              </div>
              <div className="hidden sm:block w-[1px] h-3 bg-black/15 dark:bg-white/15" />
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-accent" />
                <span><strong className="text-foreground dark:text-white font-bold">Commercial & Residential</strong></span>
              </div>
              <div className="hidden sm:block w-[1px] h-3 bg-black/15 dark:bg-white/15" />
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-accent" />
                <span><strong className="text-accent font-bold">Turnkey</strong> Execution</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services-grid" className="py-16 bg-transparent relative z-10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="border border-black/10 dark:border-white/5 bg-white dark:bg-[#0a0c10]/60 p-8 hover:border-accent/40 dark:hover:border-accent/25 transition-all duration-500 group shadow-xl dark:shadow-2xl relative"
              >
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent/40" />
                <div className="inline-flex items-center justify-center w-12 h-12 border border-black/10 dark:border-white/10 bg-[#f8f7f4] dark:bg-[#0d0f14] text-accent mb-6 group-hover:bg-accent group-hover:text-black transition-colors duration-500 shadow-sm">
                  <service.icon size={18} />
                </div>

                <h3 className="text-lg font-display font-medium text-foreground dark:text-white mb-4 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs text-foreground/70 dark:text-white/50 leading-relaxed mb-6 font-light">
                  {service.description}
                </p>

                <ul className="space-y-2.5 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-[10px] font-mono uppercase tracking-wide text-foreground/60 dark:text-white/40">
                      <Check className="text-accent mr-2.5 flex-shrink-0" size={10} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link to={service.link}>
                  <Button variant="outline" className="w-full border border-black/15 dark:border-white/10 text-[#111215] dark:text-white bg-transparent hover:bg-black/5 dark:hover:bg-white/10 hover:border-accent dark:hover:border-accent hover:text-accent dark:hover:text-accent rounded-none py-5 text-[9px] uppercase tracking-widest font-mono transition-all">
                    {copy.exploreDivision}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 border-t border-black/10 dark:border-white/5 bg-[#f3efe6] dark:bg-[#090b10]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mb-20">
            <span className="text-[9px] uppercase tracking-[0.3em] text-accent font-mono font-bold block mb-3">
              {copy.processEyebrow}
            </span>
            <h2 className="text-3xl font-display font-medium text-foreground dark:text-white">
              {copy.processTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <div
                key={index}
                className="group relative p-6 bg-white dark:bg-[#0a0c10]/40 border border-black/10 dark:border-white/5 shadow-md dark:shadow-none"
              >
                <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-accent/40" />
                <div className="relative mb-6">
                  <div className="w-12 h-12 border border-black/10 dark:border-white/10 bg-[#f8f7f4] dark:bg-[#0d0f14] flex items-center justify-center group-hover:bg-accent transition-colors duration-500 shadow-sm">
                    <span className="text-xs font-mono font-bold text-foreground dark:text-white group-hover:text-black">{item.step}</span>
                  </div>
                </div>

                <h3 className="text-sm font-display font-medium text-foreground dark:text-white mb-3 group-hover:text-accent transition-colors">
                  {item.title}
                </h3>

                <p className="text-[11px] text-foreground/70 dark:text-white/50 leading-relaxed font-light">
                  {item.description}
                </p>
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
          <p className="text-xs text-foreground/70 dark:text-white/55 leading-relaxed font-light mb-10 max-w-md mx-auto">
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
              <Button asChild variant="outline" className="w-full sm:w-auto h-13 sm:h-14 px-8 py-4 bg-transparent text-[#111215] dark:text-white hover:bg-black/5 dark:hover:bg-white/10 hover:border-accent dark:hover:border-accent hover:text-accent dark:hover:text-accent font-display font-black text-xs uppercase tracking-[0.2em] rounded-none border border-black/20 dark:border-white/20 transition-all flex items-center justify-center">
                <Link to="/about">{copy.ctaSecondary}</Link>
              </Button>
            </MagneticButton>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;