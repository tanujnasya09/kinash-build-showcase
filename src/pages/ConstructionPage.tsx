import { Building, Construction, HardHat, Wrench, CheckCircle, Calendar, DollarSign, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-construction.jpg';
import commercialImage from '@/assets/commercial-project.jpg';

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
      image: commercialImage
    },
    {
      title: 'Riverside Luxury Residences',
      category: 'Residential',
      size: '150 units',
      completion: '2023',
      description: 'Premium waterfront condominiums with panoramic views and luxury amenities.',
      image: heroImage
    },
    {
      title: 'Innovation Campus',
      category: 'Mixed-Use',
      size: '1.8M sq ft',
      completion: '2024',
      description: 'A cutting-edge research and development facility with integrated retail and dining.',
      image: commercialImage
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
    <div className="pt-8">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
        
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">
              Construction Excellence
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Building the future with innovative construction solutions, superior craftsmanship, 
              and unwavering commitment to quality.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link to="/about">
                <Button className="bg-accent text-accent-foreground hover:bg-accent-glow font-semibold px-8 py-4 text-lg">
                  Start Your Project
                </Button>
              </Link>
              <Button className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold px-8 py-4 text-lg">
                View Portfolio
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">
              Construction Capabilities
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From concept to completion, we deliver comprehensive construction services 
              across diverse project types and scales.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {capabilities.map((capability, index) => (
              <div 
                key={index} 
                className="card-elegant hover:border-accent/20"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center group-hover:bg-accent transition-colors">
                      <capability.icon className="text-white" size={28} />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-display font-semibold text-primary mb-3">
                      {capability.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {capability.description}
                    </p>
                    <ul className="space-y-2">
                      {capability.projects.map((project, idx) => (
                        <li key={idx} className="flex items-center text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3" />
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
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">
              Featured Projects
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Showcasing our recent accomplishments in construction excellence and innovation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <div 
                key={index} 
                className="card-feature group overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-48 mb-6 -mx-8 -mt-8 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">
                      {project.category}
                    </span>
                  </div>
                </div>
                
                <h3 className="text-xl font-display font-semibold text-primary mb-3 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                
                <div className="flex justify-between text-sm text-muted-foreground mb-4">
                  <span>{project.size}</span>
                  <span>{project.completion}</span>
                </div>
                
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">
              Why Choose Kinash Associates
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our commitment to excellence sets us apart in the construction industry.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <div 
                key={index} 
                className="text-center group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-full mb-6 group-hover:bg-accent transition-colors duration-300">
                  <advantage.icon className="text-white" size={32} />
                </div>
                
                <h3 className="text-xl font-display font-semibold text-primary mb-4 group-hover:text-accent transition-colors">
                  {advantage.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {advantage.description}
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
            Ready to Build Your Vision?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-12 max-w-2xl mx-auto">
            Let's discuss your construction project and how we can bring your vision to life 
            with our expertise and commitment to excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/about">
              <Button className="bg-accent text-accent-foreground hover:bg-accent-glow font-semibold px-8 py-4 text-lg">
                Start Your Project
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

export default ConstructionPage;