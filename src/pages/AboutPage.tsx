import { useState } from 'react';
import { Users, Award, Target, Heart, Phone, Mail, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const AboutPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

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
    { value: '$2B+', label: 'Value Delivered' },
    { value: '98%', label: 'Client Satisfaction' }
  ];

  return (
    <div className="pt-8">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-r from-primary to-primary-glow text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
            About Kinash Associates
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
            Building dreams into reality through exceptional construction and real estate services. 
            Our commitment to excellence has made us a trusted partner for over 15 years.
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">
                Our Story
              </h2>
            </div>
            
            <div className="prose prose-lg mx-auto text-muted-foreground leading-relaxed">
              <p className="text-xl mb-8">
                Founded in 2009, Kinash Associates began with a simple vision: to transform the construction 
                and real estate industry through innovation, quality, and unwavering commitment to client success.
              </p>
              
              <p className="mb-8">
                What started as a small construction firm has grown into a comprehensive real estate and 
                construction company, delivering projects worth over $2 billion and earning the trust of 
                clients across commercial, residential, and industrial sectors.
              </p>
              
              <p className="mb-8">
                Today, we combine traditional craftsmanship with cutting-edge technology to deliver 
                exceptional results. Our team of experts brings decades of combined experience to every 
                project, ensuring that your vision becomes a reality that exceeds expectations.
              </p>
              
              <p>
                As we look to the future, we remain committed to our founding principles while embracing 
                new technologies and sustainable practices that benefit our clients, communities, and environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">
              Our Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide everything we do and define who we are as a company.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="text-center group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-full mb-6 group-hover:bg-accent transition-colors duration-300">
                  <value.icon className="text-white" size={32} />
                </div>
                
                <h3 className="text-xl font-display font-semibold text-primary mb-4 group-hover:text-accent transition-colors">
                  {value.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">
              Leadership Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Meet the experienced professionals leading Kinash Associates to new heights of excellence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <Card 
                key={index} 
                className="card-feature group text-center overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                
                <h3 className="text-xl font-display font-semibold text-primary mb-2 group-hover:text-accent transition-colors">
                  {member.name}
                </h3>
                
                <p className="text-accent font-medium mb-4">
                  {member.position}
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  {member.bio}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Our Track Record
            </h2>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              Numbers that speak to our commitment and success in delivering exceptional results.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl md:text-5xl font-display font-bold text-accent mb-2">
                  {stat.value}
                </div>
                <div className="text-primary-foreground/80 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">
                Get In Touch
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Ready to start your project? Contact us today for a consultation and let's discuss 
                how we can bring your vision to life.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-display font-semibold text-primary mb-6">
                    Contact Information
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                        <Phone className="text-white" size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary mb-1">Phone</h4>
                        <p className="text-muted-foreground">+91 135 277 9000</p>
                        <p className="text-sm text-muted-foreground">Mon-Fri 8:00 AM - 6:00 PM</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                        <Mail className="text-white" size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary mb-1">Email</h4>
                        <p className="text-muted-foreground">contact@kinash.luxury</p>
                        <p className="text-sm text-muted-foreground">We'll respond within 24 hours</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                        <MapPin className="text-white" size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary mb-1">Office</h4>
                        <p className="text-muted-foreground">
                          Dehradun, Uttarakhand, India
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card className="card-elegant">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-primary mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                          placeholder="Your full name"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-primary mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                          placeholder="your.email@company.com"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-primary mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                          placeholder="(123) 456-7890"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="company" className="block text-sm font-semibold text-primary mb-2">
                          Company
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                          placeholder="Your company name"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="service" className="block text-sm font-semibold text-primary mb-2">
                        Service Interest
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                      >
                        <option value="">Select a service</option>
                        <option value="commercial-construction">Commercial Construction</option>
                        <option value="residential-development">Residential Development</option>
                        <option value="real-estate-investment">Real Estate Investment</option>
                        <option value="property-management">Property Management</option>
                        <option value="consulting">Project Consulting</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-primary mb-2">
                        Project Details *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none"
                        placeholder="Tell us about your project, timeline, budget, and any specific requirements..."
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="btn-hero w-full py-4 text-lg font-semibold"
                    >
                      Send Message
                      <Send className="ml-2" size={20} />
                    </Button>
                  </form>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;