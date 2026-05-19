import { Home, TrendingUp, Key, Search, MapPin, DollarSign, Award, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import realEstateImage from '@/assets/real-estate-luxury.jpg';

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
      title: 'Commercial Properties',
      description: 'Office buildings, retail spaces, and industrial properties for business investment.',
      image: realEstateImage,
      features: ['Office Buildings', 'Retail Centers', 'Warehouses', 'Mixed-Use']
    },
    {
      title: 'Residential Properties',
      description: 'Luxury homes, condominiums, and residential developments for personal and investment use.',
      image: realEstateImage,
      features: ['Luxury Homes', 'Condominiums', 'Townhouses', 'Rental Properties']
    },
    {
      title: 'Industrial Properties',
      description: 'Manufacturing facilities, distribution centers, and specialized industrial spaces.',
      image: realEstateImage,
      features: ['Manufacturing', 'Distribution', 'R&D Facilities', 'Flex Space']
    }
  ];

  const marketStats = [
    { icon: DollarSign, value: '$2.5B+', label: 'Properties Managed' },
    { icon: Home, value: '1,200+', label: 'Successful Transactions' },
    { icon: Award, value: '95%', label: 'Client Satisfaction' },
    { icon: Users, value: '500+', label: 'Happy Clients' }
  ];

  return (
    <div className="pt-8">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${realEstateImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
        
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">
              Real Estate Excellence
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Unlocking property potential through strategic real estate solutions, investment expertise, 
              and comprehensive property management services.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link to="/about">
                <Button className="bg-accent text-accent-foreground hover:bg-accent-glow font-semibold px-8 py-4 text-lg">
                  Explore Opportunities
                </Button>
              </Link>
              <Button className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold px-8 py-4 text-lg">
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">
              Real Estate Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive real estate solutions designed to maximize value and achieve your property goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="card-elegant hover:border-accent/20"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center group-hover:bg-accent transition-colors">
                      <service.icon className="text-white" size={28} />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-display font-semibold text-primary mb-3">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3" />
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
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">
              Property Specializations
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Expertise across diverse property types to meet every real estate need.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {propertyTypes.map((type, index) => (
              <div 
                key={index} 
                className="card-feature group overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-48 mb-6 -mx-8 -mt-8 overflow-hidden">
                  <img 
                    src={type.image} 
                    alt={type.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                <h3 className="text-xl font-display font-semibold text-primary mb-3 group-hover:text-accent transition-colors">
                  {type.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {type.description}
                </p>
                
                <ul className="space-y-2">
                  {type.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Stats */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">
              Market Leadership
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Proven track record of success in real estate investment and management.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {marketStats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-full mb-6 group-hover:bg-accent transition-colors duration-300">
                  <stat.icon className="text-white" size={32} />
                </div>
                
                <div className="text-3xl md:text-4xl font-display font-bold text-primary mb-2">
                  {stat.value}
                </div>
                
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-10" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Start Your Real Estate Journey
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-12 max-w-2xl mx-auto">
            Whether you're buying, selling, or investing, our team is ready to help you 
            achieve your real estate goals with expert guidance and personalized service.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/about">
              <Button className="bg-accent text-accent-foreground hover:bg-accent-glow font-semibold px-8 py-4 text-lg">
                Get Started Today
              </Button>
            </Link>
            <Button className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-semibold px-8 py-4 text-lg">
              Property Consultation
              </Button>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-accent text-accent-foreground">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-display font-bold mb-4">
            Ready to Explore Real Estate Opportunities?
          </h3>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Contact our real estate experts today for a personalized consultation and discover 
            how we can help you achieve your property investment goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+911352779000" className="btn-primary inline-flex items-center justify-center px-6 py-3 text-lg">
              Call +91 135 277 9000
            </a>
            <a href="mailto:contact@kinash.luxury" className="btn-outline border-accent-foreground text-accent-foreground hover:bg-accent-foreground hover:text-accent inline-flex items-center justify-center px-6 py-3 text-lg">
              Email Our Team
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RealEstatePage;