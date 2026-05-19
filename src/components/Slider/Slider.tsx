import React from "react";
import Slider from "react-slick";
import { MapPin, CheckCircle, Phone, ArrowRight, ChevronLeft, ChevronRight, Camera } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { Property } from "@/context/PropertyContext";

// Custom Next Arrow
function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <Button
      variant="default"
      size="icon"
      onClick={onClick}
      className="absolute right-[-20px] md:right-[-40px] top-1/2 -translate-y-1/2 rounded-full shadow-lg z-10 bg-primary hover:bg-primary-glow text-white"
    >
      <ChevronRight className="h-5 w-5" />
    </Button>
  );
}

// Custom Prev Arrow
function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <Button
      variant="default"
      size="icon"
      onClick={onClick}
      className="absolute left-[-20px] md:left-[-40px] top-1/2 -translate-y-1/2 rounded-full shadow-lg z-10 bg-primary hover:bg-primary-glow text-white"
    >
      <ChevronLeft className="h-5 w-5" />
    </Button>
  );
}

interface PropertySliderProps {
  properties: Property[];
}

export default function PropertySlider({ properties }: PropertySliderProps) {
  const { t, language } = useLanguage();

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: properties.length >= 3 ? 3 : properties.length,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: Math.min(properties.length, 2), slidesToScroll: 1 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1, slidesToScroll: 1 }
      }
    ]
  };

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Title */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-accent font-semibold mb-3 block">
            {t('properties.title')}
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-extrabold text-primary mb-6">
            {language === 'en' ? 'Featured Properties' : language === 'es' ? 'Propiedades Destacadas' : 'Ausgewählte Immobilien'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Premium residential land assets and builder floors in Dehradun's most desirable growth corridors.
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative px-6">
          <Slider {...settings}>
            {properties.map((property) => {
              // Dynamic translation variables
              const displayTitle = language === 'en' ? property.title : property.translations?.[language]?.title || property.title;
              const displayLocation = language === 'en' ? property.location : property.translations?.[language]?.location || property.location;
              const displayDesc = language === 'en' ? property.description : property.translations?.[language]?.description || property.description;
              const displayFeatures = language === 'en' ? property.features : property.translations?.[language]?.features || property.features;

              return (
                <div key={property.id} className="h-full px-3 py-3">
                  <div className="bg-white rounded-3xl border shadow-soft hover:shadow-elegant cursor-pointer transition-all duration-500 group h-full flex flex-col overflow-hidden">
                    
                    {/* Image */}
                    <div className="relative h-52 overflow-hidden bg-muted">
                      <img
                        src={property.images?.[0]}
                        alt={displayTitle}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e: any) => {
                          e.target.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop';
                        }}
                      />

                      {/* Photo count overlay */}
                      <div className="absolute top-4 right-4 bg-primary/80 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1 border border-white/10 text-white">
                        <Camera size={12} className="text-accent" />
                        <span className="text-2xs font-bold">
                          {property.images?.length || 0}
                        </span>
                      </div>

                      {/* Status Badge */}
                      <div
                        className={`absolute top-4 left-4 px-3.5 py-1.5 rounded-full text-xs font-extrabold shadow-lg ${
                          property.status.toLowerCase().includes("sold")
                            ? "bg-red-500 text-white"
                            : "bg-green-500 text-white"
                        }`}
                      >
                        {property.status}
                      </div>
                    </div>

                    {/* Details content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center text-muted-foreground mb-2">
                        <MapPin size={14} className="mr-1.5 text-accent flex-shrink-0" />
                        <span className="text-xs font-semibold line-clamp-1">{displayLocation}</span>
                      </div>

                      <h3 className="text-lg font-display font-extrabold text-primary mb-2 line-clamp-1 group-hover:text-accent transition-colors leading-tight">
                        {displayTitle}
                      </h3>

                      <div className="text-2xl font-display font-black text-primary mb-3">
                        {property.price}
                      </div>

                      <p className="text-xs text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                        {displayDesc}
                      </p>

                      {/* Quick Features */}
                      <div className="space-y-1.5 mb-6 border-t pt-4">
                        {displayFeatures.slice(0, 2).map((feat, idx) => (
                          <div key={idx} className="flex items-center text-xs text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            <span className="line-clamp-1">{feat}</span>
                          </div>
                        ))}
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-2 mt-auto">
                        <button
                          className="flex-1 bg-primary text-white text-xs font-bold py-2.5 rounded-xl hover:bg-primary-glow transition-all shadow-soft"
                          onClick={() => (window.location.href = `/property/${property.slug}`)}
                        >
                          {t('properties.viewDetails')}
                        </button>
                        <button 
                          className="border border-border p-2.5 rounded-xl hover:bg-muted text-muted-foreground transition-all"
                          onClick={() => (window.location.href = `/contact`)}
                        >
                          <Phone size={14} className="text-accent" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <Link to="/properties">
            <Button className="bg-primary hover:bg-primary-glow text-white font-bold px-8 py-4 rounded-xl shadow-soft">
              {language === 'en' ? 'Explore Full Portfolio' : language === 'es' ? 'Explorar Portafolio Completo' : 'Gesamtes Portfolio Durchsuchen'}
              <ArrowRight className="ml-2" size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
