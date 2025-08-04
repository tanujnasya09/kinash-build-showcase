import { ArrowRight, Award, Users, Building, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SearchBar from '@/components/ui/SearchBar';
import SEOHead from '@/components/SEO/SEOHead';
import heroImage from '@/assets/hero-construction.jpg';

const HomePage = () => {
  const stats = [
    { icon: Building, value: '500+', label: 'Projects Completed' },
    { icon: Users, value: '15+', label: 'Years Experience' },
    { icon: Award, value: '25+', label: 'Industry Awards' },
    { icon: TrendingUp, value: '$2B+', label: 'Value Delivered' },
  ];

  const services = [
    {
      title: 'Commercial Construction',
      description: 'Building state-of-the-art commercial spaces that drive business success.',
      link: '/construction'
    },
    {
      title: 'Residential Development',
      description: 'Creating exceptional living spaces with innovative design and quality.',
      link: '/construction'
    },
    {
      title: 'Real Estate Services',
      description: 'Comprehensive property solutions from acquisition to management.',
      link: '/real-estate'
    },
    {
      title: 'Project Consulting',
      description: 'Expert guidance to ensure your project exceeds expectations.',
      link: '/services'
    }
  ];

  return (
    <div className="overflow-hidden">
      <SEOHead 
        title="Home"
        description="Kinash Associates delivers premium construction and real estate solutions. Building excellence, creating value through innovative construction and strategic property development."
        keywords="construction company, real estate development, commercial construction, residential development, property management, construction services"
        canonical="/"
      />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center hero-gradient hero-pattern">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 text-reveal">
              Building Excellence,
              <span className="text-accent block">Creating Value</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 text-reveal-delay max-w-3xl mx-auto leading-relaxed">
              Kinash Associates delivers premium construction and real estate solutions 
              that transform visions into reality and create lasting value for our clients.
            </p>
            
            {/* Search Bar */}
            <div className="mb-12">
              <SearchBar />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/services">
                <Button className="btn-hero text-lg px-8 py-4">
                  Explore Services
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Link to="/about">
                <Button className="btn-outline text-white border-white hover:bg-white hover:text-primary text-lg px-8 py-4">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-accent/20 rounded-full blur-xl float" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl float-delay" />
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-muted to-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4 group-hover:bg-accent transition-colors duration-300">
                  <stat.icon className="text-white" size={28} />
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

      {/* Services Preview */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">
              Our Core Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              From groundbreaking construction projects to strategic real estate solutions, 
              we deliver excellence across every aspect of property development.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <Link 
                key={index} 
                to={service.link}
                className="card-feature group hover:border-accent/20 transition-all duration-500"
              >
                <h3 className="text-2xl font-display font-semibold text-primary mb-4 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {service.description}
                </p>
                <div className="flex items-center text-accent font-semibold group-hover:translate-x-2 transition-transform">
                  Learn More
                  <ArrowRight className="ml-2" size={18} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-10" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-12 max-w-2xl mx-auto">
            Let's discuss how we can bring your vision to life with our expertise 
            in construction and real estate development.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/about">
              <Button className="bg-accent text-accent-foreground hover:bg-accent-glow font-semibold px-8 py-4 text-lg">
                Get Started Today
              </Button>
            </Link>
            <Button className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-semibold px-8 py-4 text-lg">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;