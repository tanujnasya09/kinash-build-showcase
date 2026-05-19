import { ArrowRight, Award, Users, Building, TrendingUp, Sparkles, ShieldCheck, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SearchBar from '@/components/ui/SearchBar';
import SEOHead from '@/components/SEO/SEOHead';
import PropertySlider from '@/components/Slider/Slider';
import { useProperties } from '@/context/PropertyContext';
import { useLanguage } from '@/context/LanguageContext';

export default function HomePage() {
  const { properties } = useProperties();
  const { t, language } = useLanguage();

  const stats = [
    { icon: Building, value: '500+', label: t('stats.completed') },
    { icon: Users, value: '15+', label: t('stats.experience') },
    { icon: Award, value: '25+', label: t('stats.awards') },
    { icon: TrendingUp, value: '₹200Cr+', label: t('stats.delivered') },
  ];

  const services = [
    {
      title: t('services.residential'),
      description: t('services.residentialDesc'),
      link: '/construction'
    },
    {
      title: t('services.realEstate'),
      description: t('services.realEstateDesc'),
      link: '/real-estate'
    },
    {
      title: t('services.consulting'),
      description: t('services.consultingDesc'),
      link: '/services'
    }
  ];

  return (
    <div className="overflow-hidden">
      <SEOHead
        title="Kinash Luxury Real Estate & Contracting"
        description="Kinash Associates delivers premium architectural layouts, residential plot demarcations, and state-of-the-art construction solutions in Uttarakhand."
        keywords="construction company, real estate dehradun, luxury land plots"
        canonical="/"
      />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center overflow-hidden pt-20">
        {/* Background Image: Premium luxury custom home blueprint fallback */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 transform scale-102 transition-transform duration-10000"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&h=900&fit=crop')` }}
        />
        {/* Overlay Gradient for deep luxury dark-theme overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary via-primary/90 to-primary/65" />

        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Glowing Accent Indicator */}
            <div className="inline-flex items-center gap-1.5 bg-accent/20 border border-accent/40 rounded-full px-4 py-1.5 mb-6 text-accent text-xs font-bold tracking-widest uppercase animate-pulse">
              <Sparkles size={12} />
              {t('hero.companyName')}
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-black text-white leading-tight mb-6 tracking-tight drop-shadow-xl">
              <span className="block">{t('hero.title1')}</span>
              <span className="block text-accent font-light">{t('hero.title2')}</span>
            </h1>

            {/* Short Premium Tagline */}
            <p className="text-base sm:text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
              {t('hero.tagline')}
            </p>

            {/* Direct search listings shortcut */}
            <div className="mb-10 max-w-2xl mx-auto">
              <SearchBar />
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/properties">
                <Button className="bg-accent hover:bg-accent-glow btn-hover-scale text-primary font-bold text-sm sm:text-base px-8 py-6 rounded-xl shadow-lg flex items-center">
                  {language === 'en' ? 'Explore Properties' : language === 'es' ? 'Explorar Propiedades' : 'Portfolio Anzeigen'}
                  <ArrowRight className="ml-2" size={16} />
                </Button>
              </Link>
              <Link to="/about">
                <Button className="border-2 border-white text-white hover:bg-white hover:text-primary btn-hover-scale font-bold text-sm sm:text-base px-8 py-6 rounded-xl">
                  {t('hero.cta.about')}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Dynamic Abstract Design Orbs */}
        <div className="absolute top-16 left-6 w-32 h-32 bg-accent/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-16 right-6 w-44 h-44 bg-white/5 rounded-full blur-3xl animate-pulse delay-500" />
      </section>

      {/* Stats Block */}
      <section className="py-16 bg-white border-y">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group p-6 rounded-2xl hover:bg-muted/30 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/5 text-primary rounded-xl mb-4 group-hover:bg-accent group-hover:text-primary transition-all">
                  <stat.icon size={20} />
                </div>
                <div className="text-3xl md:text-4xl font-display font-black text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Horizontal Slick preview slider */}
      <section className="bg-muted/10 border-b">
        <PropertySlider properties={properties} />
      </section>

      {/* Luxury Services Preview section */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-accent font-semibold mb-3 block">
              {t('services.title')}
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-extrabold text-primary mb-6">
              {language === 'en' ? 'Crafting Timeless Infrastructure' : 'Infraestructura Atemporal'}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('services.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <Link
                key={index}
                to={service.link}
                className="group border border-border bg-white rounded-3xl p-8 hover:shadow-elegant transition-all duration-500 hover:-translate-y-1.5 flex flex-col relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-bl-full group-hover:bg-accent/15 transition-all" />
                <h3 className="text-xl font-display font-extrabold text-primary mb-4 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-8 flex-grow">
                  {service.description}
                </p>
                <div className="flex items-center text-xs text-primary font-bold uppercase tracking-wider group-hover:text-accent transition-all">
                  {t('services.learnMore')}
                  <ArrowRight className="ml-2 group-hover:translate-x-1.5 transition-transform" size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Secure CRM / Contact CTA Block */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(235,182,48,0.1),transparent_50%)]" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-display font-black mb-6 tracking-tight">
            {language === 'en' ? 'Design Your Architectural Vision' : 'Diseñe su Visión Arquitectónica'}
          </h2>
          <p className="text-base md:text-lg text-white/70 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Partner with Uttarakhand's leading ISO-accredited construction agency. Dispatch your requirements instantly to our lead support team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button className="bg-accent hover:bg-accent-glow text-primary font-bold px-8 py-6 rounded-xl text-sm tracking-wider uppercase shadow-lg">
                {language === 'en' ? 'Inquire Today' : 'Consultar Ahora'}
              </Button>
            </Link>
            <Link to="/properties">
              <Button className="border border-white/20 hover:bg-white/10 text-white font-bold px-8 py-6 rounded-xl text-sm tracking-wider uppercase">
                {language === 'en' ? 'Explore Properties Map' : 'Ver Mapa de Propiedades'}
              </Button>
            </Link>
          </div>
          
          <div className="mt-12 flex justify-center items-center gap-2 text-2xs text-white/45 font-mono uppercase tracking-widest">
            <ShieldCheck size={12} className="text-green-400" />
            ISO 9001:2015 REGISTERED & INBOUND PIPELINE SECURED
          </div>
        </div>
      </section>
    </div>
  );
}