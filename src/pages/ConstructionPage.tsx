import { Building, Construction, HardHat, Wrench, CheckCircle, Calendar, DollarSign, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import MagneticButton from '@/components/ui/MagneticButton';
import SEOHead from '@/components/SEO/SEOHead';

// High-end architectural photography URLs
const luxuryHeroImage = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&h=900&fit=crop";
const luxuryCommercialImage = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop";
const luxuryMixedImage = "https://images.unsplash.com/photo-1448630360428-654a95b96e4e?w=800&h=600&fit=crop";

const ConstructionPage = () => {
  const capabilities = [
    {
      icon: Building,
      title: 'Commercial Construction',
      description: 'Office buildings, retail centers, and industrial facilities built to the highest standards.',
      projects: ['Corporate Headquarters', 'Shopping Centers', 'Manufacturing Facilities', 'Healthcare Centers']
    },
    {
      icon: HardHat,
      title: 'Residential Development',
      description: 'Custom homes and residential communities that set new standards for quality living.',
      projects: ['Luxury Single-Family Homes', 'Condominiums', 'Townhouse Communities', 'Senior Living']
    },
    {
      icon: Construction,
      title: 'Infrastructure Projects',
      description: 'Large-scale infrastructure development including roads, utilities, and public facilities.',
      projects: ['Transportation Systems', 'Utility Networks', 'Public Buildings', 'Sports Facilities']
    },
    {
      icon: Wrench,
      title: 'Renovation & Restoration',
      description: 'Breathing new life into existing structures with modern upgrades and historic preservation.',
      projects: ['Historic Renovations', 'Commercial Upgrades', 'Adaptive Reuse', 'Sustainability Retrofits']
    }
  ];

  const featuredProjects = [
    {
      title: 'Metropolitan Business Center',
      category: 'Commercial',
      size: '2.5M sq ft',
      completion: '2024',
      description: 'A state-of-the-art office complex featuring sustainable design and smart building technology.',
      image: luxuryCommercialImage
    },
    {
      title: 'Riverside Luxury Residences',
      category: 'Residential',
      size: '150 units',
      completion: '2023',
      description: 'Premium waterfront condominiums with panoramic views and luxury amenities.',
      image: luxuryHeroImage
    },
    {
      title: 'Innovation Campus',
      category: 'Mixed-Use',
      size: '1.8M sq ft',
      completion: '2024',
      description: 'A cutting-edge research and development facility with integrated retail and dining.',
      image: luxuryMixedImage
    }
  ];

  const advantages = [
    {
      icon: CheckCircle,
      title: 'Quality Assurance',
      description: 'Rigorous quality control at every stage ensures exceptional results.'
    },
    {
      icon: Calendar,
      title: 'On-Time Delivery',
      description: 'Proven track record of completing projects on schedule and within budget.'
    },
    {
      icon: DollarSign,
      title: 'Cost Efficiency',
      description: 'Competitive pricing without compromising on quality or safety standards.'
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Experienced professionals with deep expertise in construction management.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0c0d10] text-white pt-28 pb-16 relative overflow-hidden">
      <SEOHead
        title="Luxury Construction & Engineering | Kinash Associates"
        description="Premium construction services by Kinash Associates. Commercial complexes, high-end residential estates, and civil infrastructure planning."
        keywords="luxury builders dehradun, general contractors, site engineers uttarakhand"
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
      <section className="relative py-32 overflow-hidden border-b border-white/5">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 blur-[1px]"
          style={{ backgroundImage: `url(${luxuryHeroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0d10] via-[#0c0d10]/90 to-transparent" />
        
        <div className="relative z-10 container mx-auto px-4 md:px-8 max-w-5xl">
          <span className="text-[9px] uppercase tracking-[0.3em] text-accent font-mono font-bold block mb-4">
            civil contracting
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-medium text-white mb-6 leading-none">
            Structural Integrity, <span className="bg-gradient-to-r from-accent to-accent-glow bg-clip-text text-transparent italic font-light">Architectural</span> Elegance.
          </h1>
          <p className="text-xs sm:text-sm text-white/60 mb-8 leading-relaxed max-w-xl font-light">
            We map, engineer, and build high-performance structural systems matching state-of-the-art seismic design guidelines and luxury standards.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <Link to="/contact">
              <MagneticButton strength={20}>
                <Button className="btn-luxury-gold bg-accent text-[#0c0d10] border-transparent font-bold py-4 px-10 rounded-none uppercase text-[9px] tracking-widest hover:bg-accent-glow">
                  Start Your Project
                </Button>
              </MagneticButton>
            </Link>
            <Link to="/properties">
              <Button className="btn-luxury-outline border-white/20 text-white hover:bg-white hover:text-black rounded-none py-4 px-10 uppercase text-[9px] tracking-widest font-bold">
                View Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-24 relative z-10 bg-transparent">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-[9px] uppercase tracking-[0.3em] text-accent font-mono font-bold block mb-3">
              capabilities
            </span>
            <h2 className="text-3xl font-display font-medium text-white">
              Engineering Divisions
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
              portfolio
            </span>
            <h2 className="text-3xl font-display font-medium text-white">
              Landmark Commissions
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
                  <img 
                    src={project.image} 
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
                    <span>Completed {project.completion}</span>
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
              why kinash
            </span>
            <h2 className="text-3xl font-display font-medium text-white">
              The Engineering Edge
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
            secure registry
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-medium text-white mb-6 leading-none">
            Launch Your Civil <span className="bg-gradient-to-r from-accent to-accent-glow bg-clip-text text-transparent italic font-light">Endeavor</span>.
          </h2>
          <p className="text-xs text-white/55 leading-relaxed font-light mb-10 max-w-md mx-auto">
            Schedule a session with our site planning engineers to draft structural blueprints and schedule soil-mechanics studies.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/contact" className="w-full sm:w-auto">
              <MagneticButton strength={20} className="w-full">
                <Button className="btn-luxury-gold bg-accent text-[#0c0d10] border-transparent font-bold py-4 px-10 rounded-none uppercase text-[9px] tracking-widest hover:bg-accent-glow w-full">
                  Start Your Project
                </Button>
              </MagneticButton>
            </Link>
            <Link to="/contact" className="w-full sm:w-auto">
              <Button className="btn-luxury-outline border-white/20 text-white hover:bg-white hover:text-black rounded-none py-4 px-10 w-full uppercase text-[9px] tracking-widest font-bold">
                Schedule Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConstructionPage;