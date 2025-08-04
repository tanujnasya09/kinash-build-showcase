import { Building2, Home, Settings, TrendingUp, Users, Shield, Wrench, ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

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
    <div className="pt-8">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-r from-primary to-primary-glow text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
            Our Services
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
            Comprehensive construction and real estate solutions designed to exceed your expectations 
            and deliver exceptional value.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="card-feature group hover:border-accent/20"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-6 group-hover:bg-accent transition-colors duration-300">
                  <service.icon className="text-white" size={28} />
                </div>
                
                <h3 className="text-2xl font-display font-semibold text-primary mb-4 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {service.description}
                </p>
                
                <ul className="space-y-2 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link to={service.link}>
                  <Button className="btn-outline w-full group-hover:border-accent group-hover:text-accent">
                    Learn More
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">
              Our Process
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A proven methodology that ensures successful project delivery from concept to completion.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <div 
                key={index} 
                className="text-center group"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto group-hover:bg-accent transition-colors duration-300">
                    <span className="text-2xl font-bold text-white">{item.step}</span>
                  </div>
                  {index < process.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-border -translate-x-10" />
                  )}
                </div>
                
                <h3 className="text-xl font-display font-semibold text-primary mb-4 group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-12 max-w-2xl mx-auto">
            Contact us today to discuss your project and discover how we can help bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/about">
              <Button className="bg-accent text-accent-foreground hover:bg-accent-glow font-semibold px-8 py-4 text-lg">
                Contact Us
              </Button>
            </Link>
            <Button className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-semibold px-8 py-4 text-lg">
              Request Quote
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;