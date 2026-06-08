import { Home, TrendingUp, Key, Search, DollarSign, Award, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import MagneticButton from '@/components/ui/MagneticButton';
import SEOHead from '@/components/SEO/SEOHead';

// High-end real estate and commercial photography URLs
const luxuryRealEstateImage = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&h=900&fit=crop";
const luxuryOfficeImage = "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop";
const luxuryIndustrialImage = "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop";

const RealEstatePage = () => {
  const services = [
    {
      icon: Search,
      title: 'Property Acquisition',
      description: 'Expert guidance in finding and acquiring the perfect property for your needs and investment goals.',
      features: ['Market Analysis', 'Property Evaluation', 'Negotiation Support', 'Due Diligence']
    },
    {
      icon: TrendingUp,
      title: 'Investment Advisory',
      description: 'Strategic real estate investment consulting to maximize returns and build wealth through property.',
      features: ['Investment Strategy', 'Market Research', 'Portfolio Analysis', 'Risk Assessment']
    },
    {
      icon: Key,
      title: 'Property Management',
      description: 'Comprehensive property management services to optimize performance and tenant satisfaction.',
      features: ['Tenant Management', 'Maintenance Coordination', 'Financial Reporting', 'Asset Optimization']
    },
    {
      icon: Home,
      title: 'Development Consulting',
      description: 'From concept to completion, we guide real estate development projects to successful outcomes.',
      features: ['Site Selection', 'Feasibility Studies', 'Project Planning', 'Market Positioning']
    }
  ];

  const propertyTypes = [
    {
      title: 'Commercial Estates',
      description: 'Office buildings, retail spaces, and industrial properties for business investment.',
      image: luxuryOfficeImage,
      features: ['Office Buildings', 'Retail Centers', 'Warehouses', 'Mixed-Use']
    },
    {
      title: 'Residential Mansions',
      description: 'Luxury homes, condominiums, and residential developments for personal and investment use.',
      image: luxuryRealEstateImage,
      features: ['Luxury Homes', 'Condominiums', 'Townhouses', 'Rental Properties']
    },
    {
      title: 'Industrial Facilities',
      description: 'Manufacturing facilities, distribution centers, and specialized industrial spaces.',
      image: luxuryIndustrialImage,
      features: ['Manufacturing', 'Distribution', 'R&D Facilities', 'Flex Space']
    }
  ];

  const marketStats = [
    { icon: DollarSign, value: '₹200Cr+', label: 'Valuation Managed' },
    { icon: Home, value: '1,200+', label: 'Successful Transactions' },
    { icon: Award, value: '98%', label: 'Client Satisfaction' },
    { icon: Users, value: '500+', label: 'Active Clients' }
  ];

  return (
    <div className="min-h-screen bg-[#0c0d10] text-white pt-28 pb-16 relative overflow-hidden">
      <SEOHead
        title="Luxury Real Estate Portfolio | Kinash Associates"
        description="Connect with real estate acquisition and advisory services by Kinash Associates. Commercial complexes, private residential mansions."
        keywords="luxury property dehradun, real estate broker uttarakhand, property acquisition registry"
        canonical="/real-estate"
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
          style={{ backgroundImage: `url(${luxuryRealEstateImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0d10] via-[#0c0d10]/90 to-transparent" />
        
        <div className="relative z-10 container mx-auto px-4 md:px-8 max-w-5xl">
          <span className="text-[9px] uppercase tracking-[0.3em] text-accent font-mono font-bold block mb-4">
            real estate advisory
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-medium text-white mb-6 leading-none">
            Strategic Acquisitions, <span className="bg-gradient-to-r from-accent to-accent-glow bg-clip-text text-transparent italic font-light">Asset</span> Optimization.
          </h1>
          <p className="text-xs sm:text-sm text-white/60 mb-8 leading-relaxed max-w-xl font-light">
            We source, manage, and scale prime real estate assets across North India, prioritizing secure titles, high occupancy yields, and premium capital gains.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <Link to="/properties">
              <MagneticButton strength={20}>
                <Button className="btn-luxury-gold bg-accent text-[#0c0d10] border-transparent font-bold py-4 px-10 rounded-none uppercase text-[9px] tracking-widest hover:bg-accent-glow">
                  Explore Opportunities
                </Button>
              </MagneticButton>
            </Link>
            <Link to="/contact">
              <Button className="btn-luxury-outline border-white/20 text-white hover:bg-white hover:text-black rounded-none py-4 px-10 uppercase text-[9px] tracking-widest font-bold">
                Schedule Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 relative z-10 bg-transparent">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-[9px] uppercase tracking-[0.3em] text-accent font-mono font-bold block mb-3">
              services
            </span>
            <h2 className="text-3xl font-display font-medium text-white">
              Advisory Solutions
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="border border-white/5 bg-[#0a0c10]/60 p-8 hover:border-accent/25 transition-all duration-500 shadow-2xl relative"
              >
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent/40" />
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 border border-white/10 bg-[#0d0f14] flex items-center justify-center text-accent flex-shrink-0">
                    <service.icon size={18} />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-base font-display font-medium text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-xs text-white/50 leading-relaxed mb-6 font-light">
                      {service.description}
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-[9px] font-mono uppercase tracking-wide text-white/40">
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
      <section className="py-24 border-t border-white/5 bg-[#090b10]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-[9px] uppercase tracking-[0.3em] text-accent font-mono font-bold block mb-3">
              classifications
            </span>
            <h2 className="text-3xl font-display font-medium text-white">
              Property Specializations
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {propertyTypes.map((type, index) => (
              <div 
                key={index} 
                className="border border-white/5 bg-[#0a0c10]/60 hover:border-accent/25 transition-all duration-500 group shadow-2xl relative"
              >
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent/30" />
                <div className="relative aspect-[4/3] overflow-hidden bg-[#0d0f14] border-b border-white/5">
                  <img 
                    src={type.image} 
                    alt={type.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-base font-display font-medium text-white mb-2 group-hover:text-accent transition-colors">
                    {type.title}
                  </h3>
                  
                  <p className="text-xs text-white/55 leading-relaxed font-light mb-6">
                    {type.description}
                  </p>
                  
                  <ul className="grid grid-cols-2 gap-2">
                    {type.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-[9px] font-mono uppercase tracking-wide text-white/40">
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
      <section className="py-24 border-t border-white/5 bg-[#0c0d10]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-[9px] uppercase tracking-[0.3em] text-accent font-mono font-bold block mb-3">
              proven track record
            </span>
            <h2 className="text-3xl font-display font-medium text-white">
              Market Leadership
            </h2>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {marketStats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center p-6 bg-[#0a0c10]/40 border border-white/5 relative"
              >
                <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-accent/30" />
                <div className="text-2xl sm:text-3xl font-display font-medium text-accent mb-2">
                  {stat.value}
                </div>
                <div className="text-[9px] font-mono uppercase tracking-widest text-white/40 font-bold">
                  {stat.label}
                </div>
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
            secure access
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-medium text-white mb-6 leading-none">
            Scale Your Property <span className="bg-gradient-to-r from-accent to-accent-glow bg-clip-text text-transparent italic font-light">Equity</span>.
          </h2>
          <p className="text-xs text-white/55 leading-relaxed font-light mb-10 max-w-md mx-auto">
            Book an orientation session with a senior real estate director to evaluate active catalog yields and secure immediate registry title allocations.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/properties" className="w-full sm:w-auto">
              <MagneticButton strength={20} className="w-full">
                <Button className="btn-luxury-gold bg-accent text-[#0c0d10] border-transparent font-bold py-4 px-10 rounded-none uppercase text-[9px] tracking-widest hover:bg-accent-glow w-full">
                  Explore Opportunities
                </Button>
              </MagneticButton>
            </Link>
            <Link to="/contact" className="w-full sm:w-auto">
              <Button className="btn-luxury-outline border-white/20 text-white hover:bg-white hover:text-black rounded-none py-4 px-10 w-full uppercase text-[9px] tracking-widest font-bold">
                Request Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RealEstatePage;