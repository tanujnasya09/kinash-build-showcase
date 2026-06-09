import { Target, Heart, Users, Award, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SEOHead from '@/components/SEO/SEOHead';
import MagneticButton from '@/components/ui/MagneticButton';

const AboutPage = () => {
  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'We pursue excellence in every project, ensuring the highest standards of quality and craftsmanship.'
    },
    {
      icon: Heart,
      title: 'Integrity',
      description: 'Our commitment to transparency and ethical business practices builds lasting trust with our clients.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and collaborative partnerships to achieve outstanding results.'
    },
    {
      icon: Award,
      title: 'Innovation',
      description: 'We embrace cutting-edge technologies and innovative approaches to deliver superior solutions.'
    }
  ];

  const team = [
    {
      name: 'Michael Kinash',
      position: 'Founder & CEO',
      bio: 'With over 20 years in construction and real estate, Michael leads our vision of building excellence.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
    },
    {
      name: 'Sarah Chen',
      position: 'VP of Construction',
      bio: 'Licensed architect with expertise in sustainable design and large-scale commercial projects.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b9234ccd?w=400&h=400&fit=crop&crop=face'
    },
    {
      name: 'David Rodriguez',
      position: 'VP of Real Estate',
      bio: 'Real estate investment specialist with a proven track record in property development and management.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
    }
  ];

  const stats = [
    { value: '15+', label: 'Years of Excellence' },
    { value: '500+', label: 'Projects Completed' },
    { value: '₹200Cr+', label: 'Equity Value Delivered' },
    { value: '98%', label: 'Client Satisfaction' }
  ];

  return (
    <div className="min-h-screen bg-[#0c0d10] text-white pt-28 pb-16 relative overflow-hidden">
      <SEOHead
        title="Our Story & Vision | Kinash Associates"
        description="Learn about the heritage, leadership team, and corporate values of Kinash Associates, leading construction and real estate firm."
        keywords="kinash associates, construction directors dehradun, real estate history"
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
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0c10] to-transparent opacity-40 z-0" />
        <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-5xl">
          <span className="text-[9px] uppercase tracking-[0.3em] text-accent font-mono font-bold block mb-4">
            corporate profile
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-medium leading-none mb-6">
            Building Legacies, Shaping <span className="bg-gradient-to-r from-accent to-accent-glow bg-clip-text text-transparent italic font-light">Landscapes</span>.
          </h1>
          <p className="text-xs sm:text-sm text-white/50 leading-relaxed font-light max-w-2xl">
            Established in Dehradun, Kinash Associates specializes in demarcating high-value plots and constructing state-of-the-art civil infrastructure under verified ISO compliance workflows.
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 relative border-t border-white/5 bg-[#090b10]">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <span className="text-[9px] uppercase tracking-[0.3em] text-accent font-mono font-bold block mb-4">
            our heritage
          </span>
          <h2 className="text-3xl font-display font-medium text-white mb-8">
            The History of Kinash
          </h2>
          
          <div className="space-y-6 text-xs text-white/60 font-light leading-relaxed">
            <p className="text-sm text-white/80 leading-relaxed font-normal">
              Founded with a clear vision: to transform the land registry, construction mapping, and real estate development model in Uttarakhand through absolute compliance, legal transparency, and engineering quality.
            </p>
            <p>
              What began as a specialized engineering survey desk has expanded into a premier multi-division contracting firm, delivering high-precision layout demarcations and structural concrete works across private and public sectors.
            </p>
            <p>
              Today, we utilize electronic total station surveying and soil mechanics studies to ensure that every asset in the Kinash Luxury portfolio represents a secure equity path. Our legal partners review each registry title, ensuring zero-risk ownership.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 border-t border-white/5 bg-[#0c0d10]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-[9px] uppercase tracking-[0.3em] text-accent font-mono font-bold block mb-3">
              operating code
            </span>
            <h2 className="text-3xl font-display font-medium text-white">
              The Principles Behind Our Standards
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
              executive council
            </span>
            <h2 className="text-3xl font-display font-medium text-white">
              Governance & Leadership
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
                  <img 
                    src={member.image} 
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

      {/* Call to Action - Clean Luxury Plaque */}
      <section className="py-24 border-t border-white/5 bg-[#0d0f14]/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(223,186,72,0.05),transparent_40%)] pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8 text-center relative z-10 max-w-3xl">
          <span className="text-[9px] uppercase tracking-[0.3em] text-accent font-mono font-bold block mb-4">
            secure connection
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-medium text-white mb-6 leading-none">
            Ready to Build Your <span className="bg-gradient-to-r from-accent to-accent-glow bg-clip-text text-transparent italic font-light">Legacy</span>?
          </h2>
          <p className="text-xs text-white/55 leading-relaxed font-light mb-10 max-w-md mx-auto">
            Get in touch with a senior portfolio advisor or request technical survey records for active registries.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/contact" className="w-full sm:w-auto">
              <MagneticButton strength={20} className="w-full" as="div">
                <Button className="btn-luxury-gold bg-accent text-[#0c0d10] border-transparent font-bold py-4 px-10 rounded-none uppercase text-[9px] tracking-widest hover:bg-accent-glow w-full">
                  Connect with advisor
                </Button>
              </MagneticButton>
            </Link>
            <Link to="/properties" className="w-full sm:w-auto">
              <Button className="btn-luxury-outline border-white/20 text-white hover:bg-white hover:text-black rounded-none py-4 px-10 w-full uppercase text-[9px] tracking-widest font-bold">
                Browse properties catalog
              </Button>
            </Link>
          </div>

          <div className="mt-12 flex justify-center items-center gap-2 text-[8px] font-mono uppercase tracking-[0.2em] text-white/35">
            <ShieldCheck size={11} className="text-accent" />
            SECURED END-TO-END REGISTRY PIPELINE
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;