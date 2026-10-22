import { Building, Construction, HardHat, Wrench, CheckCircle, Calendar, DollarSign, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import MagneticButton from '@/components/ui/MagneticButton';
import SEOHead from '@/components/SEO/SEOHead';
import { useLanguage } from '@/context/LanguageContext';

// High-end architectural photography URLs
const luxuryHeroImage = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&h=900&fit=crop";
const luxuryCommercialImage = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop";
const luxuryMixedImage = "https://images.unsplash.com/photo-1448630360428-654a95b96e4e?w=800&h=600&fit=crop";

const capabilityIcons = [Building, HardHat, Construction, Wrench];
const advantageIcons = [CheckCircle, Calendar, DollarSign, Users];
const projectImages = [luxuryCommercialImage, luxuryHeroImage, luxuryMixedImage];

const ConstructionPage = () => {
  const { content } = useLanguage();
  const copy = content.construction;

  const capabilities = copy.capabilities.map((capability, idx) => ({
    ...capability,
    icon: capabilityIcons[idx],
  }));

  const featuredProjects = copy.projects.map((project, idx) => ({
    ...project,
    image: projectImages[idx],
  }));

  const advantages = copy.advantages.map((advantage, idx) => ({
    ...advantage,
    icon: advantageIcons[idx],
  }));

  return (
    <div className="min-h-screen bg-[#0c0d10] text-white pt-20 sm:pt-24 lg:pt-28 pb-16 relative overflow-hidden">
      <SEOHead
        title={copy.meta.title}
        description={copy.meta.description}
        keywords={copy.meta.keywords}
        canonical="/construction"
      />

      {/* Decorative technical line grid */}
      <div className="absolute inset-0 flex justify-between pointer-events-none opacity-5 px-12 z-0">
        <div className="w-[1px] h-full bg-white" />
        <div className="w-[1px] h-full bg-white hidden md:block" />
        <div className="w-[1px] h-full bg-white hidden md:block" />
        <div className="w-[1px] h-full bg-white" />
      </div>

      {/* Hero Section */}
      <section className="relative py-10 sm:py-20 lg:py-32 overflow-hidden border-b border-white/5">
        <div 
          className="hero-bg-image absolute inset-0 bg-cover bg-center opacity-30 blur-[1px]"
          style={{ backgroundImage: `url(${luxuryHeroImage})` }}
        />
        <div className="hero-gradient-overlay absolute inset-0 bg-gradient-to-r from-[#0c0d10] via-[#0c0d10]/90 to-transparent" />
        
        <div className="relative z-10 container mx-auto px-4 md:px-8 max-w-5xl">
          <span className="text-[9px] uppercase tracking-[0.3em] text-accent font-mono font-bold block mb-2.5 sm:mb-4">
            {copy.eyebrow}
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-medium text-white mb-3.5 sm:mb-6 leading-[1.1] sm:leading-none">
            {copy.title} <span className="text-accent italic font-light">{copy.titleAccent}</span>
          </h1>
          <p className="text-xs sm:text-sm text-white/60 mb-6 sm:mb-8 leading-relaxed max-w-xl font-light">
            {copy.intro}
          </p>
          <div className="flex flex-row gap-2.5 sm:gap-5 w-full max-w-md">
            <MagneticButton strength={15} className="flex-1 sm:flex-initial" as="div">
              <Button asChild className="w-full sm:w-auto h-11 sm:h-14 px-3 sm:px-8 py-3 sm:py-4 bg-accent text-[#0c0d10] hover:bg-accent-glow font-display font-black text-[10px] sm:text-xs uppercase tracking-[0.1em] sm:tracking-[0.2em] rounded-none border border-accent hover:border-accent-glow shadow-[0_10px_30px_rgba(223,186,72,0.25)] flex items-center justify-center gap-1.5 sm:gap-2 group transition-all whitespace-nowrap">
                <Link to="/contact">
                  <span>{copy.heroCtaPrimary}</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
            </MagneticButton>
            <MagneticButton strength={15} className="flex-1 sm:flex-initial" as="div">
              <Button asChild className="w-full sm:w-auto h-11 sm:h-14 px-3 sm:px-8 py-3 sm:py-4 bg-transparent text-white hover:bg-white hover:text-[#0c0d10] font-display font-black text-[10px] sm:text-xs uppercase tracking-[0.1em] sm:tracking-[0.2em] rounded-none border border-white/20 hover:border-white transition-all flex items-center justify-center whitespace-nowrap">
                <Link to="/properties">{copy.heroCtaSecondary}</Link>
              </Button>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-24 relative z-10 bg-transparent">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-[9px] uppercase tracking-[0.3em] text-accent font-mono font-bold block mb-3">
              {copy.capabilitiesEyebrow}
            </span>
            <h2 className="text-3xl font-display font-medium text-white">
              {copy.capabilitiesTitle}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {capabilities.map((cap, index) => (
              <div 
                key={index} 
                className="border border-white/5 bg-[#0a0c10]/60 p-8 hover:border-accent/25 transition-all duration-500 shadow-2xl relative"
              >
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent/40" />
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 border border-white/10 bg-[#0d0f14] flex items-center justify-center text-accent flex-shrink-0">
                    <cap.icon size={18} />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-base font-display font-medium text-white mb-3">
                      {cap.title}
                    </h3>
                    <p className="text-xs text-white/50 leading-relaxed mb-6 font-light">
                      {cap.description}
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {cap.projects.map((project, idx) => (
                        <li key={idx} className="flex items-center text-[9px] font-mono uppercase tracking-wide text-white/40">
                          <div className="w-1 h-1 bg-accent mr-2" />
                          {project}
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
      <section className="py-24 border-t border-white/5 bg-[#090b10]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-[9px] uppercase tracking-[0.3em] text-accent font-mono font-bold block mb-3">
              {copy.projectsEyebrow}
            </span>
            <h2 className="text-3xl font-display font-medium text-white">
              {copy.projectsTitle}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <div 
                key={index} 
                className="border border-white/5 bg-[#0a0c10]/60 hover:border-accent/25 transition-all duration-500 group shadow-2xl relative"
              >
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent/30" />
                <div className="relative aspect-[4/3] overflow-hidden bg-[#0d0f14] border-b border-white/5">
                  <img loading="lazy" decoding="async" src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-[#0c0d10]/80 border border-white/10 text-white font-mono text-[8px] uppercase tracking-widest px-3 py-1.5 backdrop-blur-md">
                      {project.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-base font-display font-medium text-white mb-2 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  
                  <div className="flex justify-between font-mono text-[9px] text-accent uppercase tracking-wider mb-4 border-b border-white/5 pb-2">
                    <span>{project.size}</span>
                    <span>{copy.projectsCompletedPrefix} {project.completion}</span>
                  </div>
                  
                  <p className="text-xs text-white/55 leading-relaxed font-light">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-24 border-t border-white/5 bg-[#0c0d10]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-[9px] uppercase tracking-[0.3em] text-accent font-mono font-bold block mb-3">
              {copy.advantagesEyebrow}
            </span>
            <h2 className="text-3xl font-display font-medium text-white">
              {copy.advantagesTitle}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((adv, index) => (
              <div 
                key={index} 
                className="border border-white/5 bg-[#0a0c10]/40 p-8 relative hover:border-accent/20 transition-all duration-500 shadow-2xl"
              >
                <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-accent/40" />
                <div className="w-10 h-10 border border-white/10 bg-[#0d0f14] flex items-center justify-center text-accent mb-6">
                  <adv.icon size={16} />
                </div>
                
                <h3 className="text-sm font-display font-medium text-white mb-3">
                  {adv.title}
                </h3>
                
                <p className="text-[11px] text-white/50 leading-relaxed font-light">
                  {adv.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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