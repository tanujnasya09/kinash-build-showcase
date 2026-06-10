import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, CheckCircle, ArrowUpRight } from 'lucide-react';
import { Property } from '@/context/PropertyContext';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import MagneticButton from '@/components/ui/MagneticButton';
import gsap from 'gsap';

interface PropertyCardProps {
  property: Property;
  isActive?: boolean;
  onMouseEnter?: () => void;
}

export default function PropertyCard({ property, isActive = false, onMouseEnter }: PropertyCardProps) {
  const { language, t } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);

  // Corner bracket refs for smooth hover animations
  const topLeftRef = useRef<HTMLDivElement>(null);
  const topRightRef = useRef<HTMLDivElement>(null);
  const bottomLeftRef = useRef<HTMLDivElement>(null);
  const bottomRightRef = useRef<HTMLDivElement>(null);

  const displayTitle = language === 'en' ? property.title : property.translations?.[language]?.title || property.title;
  const displayLocation = language === 'en' ? property.location : property.translations?.[language]?.location || property.location;
  const displayDesc = language === 'en' ? property.description : property.translations?.[language]?.description || property.description;
  const displayFeatures = language === 'en' ? property.features : property.translations?.[language]?.features || property.features;
  const displaySpecs = {
    type: language === 'en' ? property.specs.type : property.translations?.[language]?.specsType || property.specs.type,
    possession: language === 'en' ? property.specs.possession : property.translations?.[language]?.specsPossession || property.specs.possession
  };

  const handleMouseEnter = () => {
    if (onMouseEnter) {
      onMouseEnter();
    }

    const card = cardRef.current;
    if (!card) return;

    // Smooth lift & shadow glow
    gsap.to(card, {
      y: -8,
      borderColor: 'rgba(223, 186, 72, 0.35)',
      boxShadow: '0 20px 45px rgba(223, 186, 72, 0.08), 0 0 40px rgba(0, 0, 0, 0.5)',
      duration: 0.5,
      ease: 'power3.out'
    });

    // Zoom image slightly on enter
    if (imgRef.current) {
      gsap.to(imgRef.current, {
        scale: 1.15,
        duration: 0.6,
        ease: 'power2.out'
      });
    }

    // Animate and highlight corner brackets outward
    const corners = [topLeftRef.current, topRightRef.current, bottomLeftRef.current, bottomRightRef.current];
    gsap.to(corners.filter(Boolean), {
      borderColor: 'rgba(223, 186, 72, 0.8)',
      scale: 1.25,
      duration: 0.4,
      ease: 'power2.out'
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // range: -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // range: -0.5 to 0.5

    // Image Parallax Shift with GSAP (buttery smooth, no micro-stutter)
    if (imgRef.current) {
      gsap.to(imgRef.current, {
        x: x * 20,
        y: y * 20,
        scale: 1.15,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    }

    // Shine / Border Follow Effect
    if (borderRef.current) {
      const borderX = e.clientX - rect.left;
      const borderY = e.clientY - rect.top;
      gsap.to(borderRef.current, {
        background: `radial-gradient(350px circle at ${borderX}px ${borderY}px, rgba(223, 186, 72, 0.18), transparent 45%)`,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    // Reset card lift and shadow
    gsap.to(card, {
      y: 0,
      borderColor: isActive ? 'rgba(223, 186, 72, 0.5)' : 'rgba(255, 255, 255, 0.05)',
      boxShadow: isActive ? '0 0 50px rgba(223, 186, 72, 0.15)' : '0 10px 30px rgba(0, 0, 0, 0.3)',
      duration: 0.6,
      ease: 'power3.out'
    });

    // Reset image transform and scale
    if (imgRef.current) {
      gsap.to(imgRef.current, {
        x: 0,
        y: 0,
        scale: 1.08,
        duration: 0.6,
        ease: 'power3.out'
      });
    }

    // Reset shine overlay
    if (borderRef.current) {
      gsap.to(borderRef.current, {
        background: 'transparent',
        duration: 0.6,
        ease: 'power3.out'
      });
    }

    // Reset corner brackets
    const corners = [topLeftRef.current, topRightRef.current, bottomLeftRef.current, bottomRightRef.current];
    gsap.to(corners.filter(Boolean), {
      borderColor: 'rgba(223, 186, 72, 0.3)',
      scale: 1.0,
      duration: 0.5,
      ease: 'power3.out'
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative flex flex-col w-full bg-[#0a0c10]/80 border border-white/5 shadow-2xl transition-all duration-500 overflow-hidden ${
        isActive ? 'border-accent/50 shadow-[0_0_50px_rgba(223,186,72,0.15)]' : ''
      }`}
    >
      {/* Animated Hover Border Overlay */}
      <div 
        ref={borderRef} 
        className="absolute inset-0 pointer-events-none z-20 border border-transparent" 
      />

      {/* Technical corner marks for architectural design aesthetic */}
      <div ref={topLeftRef} className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent/35 pointer-events-none z-20 origin-top-left transition-colors duration-300" />
      <div ref={topRightRef} className="absolute top-0 right-0 w-2 h-2 border-t border-r border-accent/35 pointer-events-none z-20 origin-top-right transition-colors duration-300" />
      <div ref={bottomLeftRef} className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-accent/35 pointer-events-none z-20 origin-bottom-left transition-colors duration-300" />
      <div ref={bottomRightRef} className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-accent/35 pointer-events-none z-20 origin-bottom-right transition-colors duration-300" />

      {/* Image container with hidden overflow */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0d0f14]">
        <img
          ref={imgRef}
          src={property.images?.[0]}
          alt={displayTitle}
          className="w-full h-full object-cover scale-[1.08]"
          onError={(e: any) => {
            e.target.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop";
          }}
        />
        {/* Dark gold color tint overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d10] via-[#0c0d10]/15 to-transparent z-10" />
        
        {/* Luxury Glassmorphic Status Badge */}
        <div
          className={`absolute top-4 left-4 z-20 px-3.5 py-1.5 bg-[#0c0d10]/60 backdrop-blur-md border text-[9px] font-sans font-bold uppercase tracking-widest ${
            property.status.toLowerCase().includes("completed")
              ? "text-accent border-accent/30"
              : property.status.toLowerCase().includes("construction")
              ? "text-amber-400 border-amber-400/30"
              : property.status.toLowerCase().includes("sold")
              ? "text-red-400 border-red-400/30"
              : "text-green-400 border-green-400/30"
          }`}
        >
          {property.status}
        </div>

        {/* Spec Badge Overlay */}
        <div className="absolute bottom-4 left-4 z-20 text-[9px] font-mono uppercase tracking-widest text-[#0c0d10] bg-accent px-3 py-1 font-bold">
          {displaySpecs.type}
        </div>
      </div>

      {/* Info Content Section */}
      <div className="p-6 flex flex-col justify-between flex-1 relative z-10">
        <div>
          <div className="flex items-center text-white/50 mb-2 font-mono text-[9px] uppercase tracking-wider">
            <MapPin size={10} className="mr-1.5 text-accent flex-shrink-0" />
            <span className="line-clamp-1">{displayLocation}</span>
          </div>
          <h3 className="text-lg font-display font-medium text-white mb-2 line-clamp-1 group-hover:text-accent transition-colors duration-500 leading-tight">
            {displayTitle}
          </h3>
          <p className="text-xl font-display font-extralight text-accent bg-gradient-to-r from-accent to-accent-glow bg-clip-text text-transparent mb-4">
            {property.price}
          </p>

          {/* Quick Technical specifications */}
          <div className="grid grid-cols-3 gap-2 p-3 bg-[#0d0f14]/50 border border-white/5 text-[9px] font-mono tracking-wider uppercase text-white/60 mb-4">
            <div className="text-center border-r border-white/5">
              <span className="text-accent/50 block font-normal text-[7px] mb-0.5">SIZE</span>
              {property.specs.area || property.specs.sizes[0]}
            </div>
            <div className="text-center border-r border-white/5">
              <span className="text-accent/50 block font-normal text-[7px] mb-0.5">TIMELINE</span>
              {displaySpecs.possession}
            </div>
            <div className="text-center">
              <span className="text-accent/50 block font-normal text-[7px] mb-0.5">FACING</span>
              {property.specs.facing}
            </div>
          </div>

          <p className="text-xs text-white/60 font-light line-clamp-2 leading-relaxed mb-6">
            {displayDesc}
          </p>

          {/* Features checkmarks */}
          <div className="space-y-1.5 border-t border-white/5 pt-4 mb-6">
            {displayFeatures.slice(0, 2).map((feat, i) => (
              <div key={i} className="flex items-center text-[10px] text-white/50 font-sans tracking-wide">
                <CheckCircle className="w-3.5 h-3.5 text-accent mr-2.5 flex-shrink-0" />
                <span className="line-clamp-1 font-light">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex gap-3 mt-auto items-center pt-2">
          <Link to={`/property/${property.slug}`} className="flex-1">
            <Button 
              className="w-full btn-luxury-gold bg-[#0d0f14] hover:bg-accent hover:text-[#0c0d10] text-white border border-white/10 rounded-none py-3.5 text-[9px] tracking-widest uppercase flex items-center justify-center gap-1.5"
            >
              Details
              <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Button>
          </Link>
          <Link to="/contact">
            <MagneticButton 
              className="p-3 bg-accent text-[#0c0d10] border-transparent rounded-none hover:bg-accent-glow flex items-center justify-center"
              strength={20}
            >
              <Phone size={12} />
            </MagneticButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
