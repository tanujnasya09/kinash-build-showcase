import { Building2, Home, Settings, TrendingUp, Shield, ClipboardList, ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SEOHead from '@/components/SEO/SEOHead';
import MagneticButton from '@/components/ui/MagneticButton';

const ServicesPage = () => {
  const services = [
    {
      icon: Building2,
      title: 'Commercial Construction',
      description: 'State-of-the-art office buildings, retail spaces, and industrial facilities designed for modern business needs.',
      features: ['Office Buildings', 'Retail Centers', 'Industrial Facilities', 'Mixed-Use Developments'],
      link: '/construction'
    },
    {
      icon: Home,
      title: 'Residential Development',
      description: 'Luxury homes and residential communities that combine comfort, style, and sustainability.',
      features: ['Custom Homes', 'Residential Communities', 'Luxury Condominiums', 'Affordable Housing'],
      link: '/construction'
    },
    {
      icon: TrendingUp,
      title: 'Real Estate Investment',
      description: 'Strategic investment opportunities and portfolio management for maximum returns.',
      features: ['Investment Analysis', 'Portfolio Management', 'Market Research', 'ROI Optimization'],
      link: '/real-estate'
    },
    {
      icon: Settings,
      title: 'Property Management',
      description: 'Comprehensive property management services to maximize asset value and tenant satisfaction.',
      features: ['Tenant Relations', 'Maintenance Services', 'Financial Management', 'Asset Optimization'],
      link: '/real-estate'
    },
    {
      icon: ClipboardList,
      title: 'Project Consulting',
      description: 'Expert guidance through every phase of your construction or real estate project.',
      features: ['Feasibility Studies', 'Project Planning', 'Cost Estimation', 'Risk Assessment'],
      link: '/about'
    },
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'Rigorous quality control and compliance ensuring the highest standards in every project.',
      features: ['Quality Control', 'Safety Compliance', 'Code Compliance', 'Performance Testing'],
      link: '/about'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Initial Consultation',
      description: 'We meet to understand your vision, requirements, and goals for the project.'
    },
    {
      step: '02',
      title: 'Planning & Design',
      description: 'Our experts develop comprehensive plans and designs tailored to your needs.'
    },
    {
      step: '03',
      title: 'Execution',
      description: 'Professional implementation with regular updates and quality checkpoints.'
    },
    {
      step: '04',
      title: 'Delivery & Support',
      description: 'Project completion with ongoing support and maintenance services.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0c0d10] text-white pt-28 pb-16 relative overflow-hidden">
      <SEOHead
        title="Services & Infrastructure | Kinash Associates"
        description="Explore the construction and real estate services offered by Kinash Associates. Commercial construction, luxury homes, and property management."
        keywords="commercial building construction dehradun, luxury villa builders, real estate consultants"
        canonical="/services"
      />

      {/* Decorative technical line grid */}
      <div className="absolute inset-0 flex justify-between pointer-events-none opacity-5 px-12 z-0">
        <div className="w-[1px] h-full bg-white" />
        <div className="w-[1px] h-full bg-white hidden md:block" />
        <div className="w-[1px] h-full bg-white hidden md:block" />
        <div className="w-[1px] h-full bg-white" />
      </div>

      {/* Hero Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0c10] to-transparent opacity-40 z-0" />
        <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-5xl">
          <span className="text-[9px] uppercase tracking-[0.3em] text-accent font-mono font-bold block mb-4">
            service portfolio
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-medium leading-none mb-6">
            Comprehensive Architectural <span className="bg-gradient-to-r from-accent to-accent-glow bg-clip-text text-transparent italic font-light">Capabilities</span>.
          </h1>
          <p className="text-xs sm:text-sm text-white/50 leading-relaxed font-light max-w-2xl">
            From civil structural construction to premium registry transfers, our specialized divisions deliver secure real estate development and asset management.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 bg-transparent relative z-10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="border border-white/5 bg-[#0a0c10]/60 p-8 hover:border-accent/25 transition-all duration-500 group shadow-2xl relative"
              >
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent/40" />
                <div className="inline-flex items-center justify-center w-12 h-12 border border-white/10 bg-[#0d0f14] text-accent mb-6 group-hover:bg-accent group-hover:text-black transition-colors duration-500">
                  <service.icon size={18} />
                </div>
                
                <h3 className="text-lg font-display font-medium text-white mb-4 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-xs text-white/50 leading-relaxed mb-6 font-light">
                  {service.description}
                </p>
                
                <ul className="space-y-2.5 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-[10px] font-mono uppercase tracking-wide text-white/40">
                      <Check className="text-accent mr-2.5 flex-shrink-0" size={10} />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link to={service.link}>
                  <Button className="w-full border border-white/10 text-white rounded-none py-5 text-[9px] uppercase tracking-widest font-mono hover:bg-accent hover:text-black hover:border-transparent transition-all">
                    Explore Division
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 border-t border-white/5 bg-[#090b10]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mb-20">
            <span className="text-[9px] uppercase tracking-[0.3em] text-accent font-mono font-bold block mb-3">
              methodology
            </span>
            <h2 className="text-3xl font-display font-medium text-white">
              The Execution Framework
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <div 
                key={index} 
                className="group relative p-6 bg-[#0a0c10]/40 border border-white/5"
              >
                <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-accent/40" />
                <div className="relative mb-6">
                  <div className="w-12 h-12 border border-white/10 bg-[#0d0f14] flex items-center justify-center group-hover:bg-accent transition-colors duration-500">
                    <span className="text-xs font-mono font-bold text-white group-hover:text-black">{item.step}</span>
                  </div>
                </div>
                
                <h3 className="text-sm font-display font-medium text-white mb-3 group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-[11px] text-white/50 leading-relaxed font-light">
                  {item.description}
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
            secure connection
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-medium text-white mb-6 leading-none">
            Ready to Connect <span className="bg-gradient-to-r from-accent to-accent-glow bg-clip-text text-transparent italic font-light">With Us</span>?
          </h2>
          <p className="text-xs text-white/55 leading-relaxed font-light mb-10 max-w-md mx-auto">
            Contact us today to discuss your project requirements and discover how we can help bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/contact" className="w-full sm:w-auto">
              <MagneticButton strength={20} className="w-full" as="div">
                <Button className="btn-luxury-gold bg-accent text-[#0c0d10] border-transparent font-bold py-4 px-10 rounded-none uppercase text-[9px] tracking-widest hover:bg-accent-glow w-full">
                  Contact Us
                </Button>
              </MagneticButton>
            </Link>
            <Link to="/about" className="w-full sm:w-auto">
              <Button className="btn-luxury-outline border-white/20 text-white hover:bg-white hover:text-black rounded-none py-4 px-10 w-full uppercase text-[9px] tracking-widest font-bold">
                Learn About Kinash
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;