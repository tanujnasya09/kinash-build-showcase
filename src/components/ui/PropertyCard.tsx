import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, CheckCircle, ArrowUpRight } from 'lucide-react';
import { Property } from '@/context/PropertyContext';
import { useLanguage } from '@/context/LanguageContext';
import { formatPrice } from '@/lib/currency';
import { Button } from '@/components/ui/button';
import MagneticButton from '@/components/ui/MagneticButton';
import gsap from 'gsap';

interface PropertyCardProps {
  property: Property;
  isActive?: boolean;
  onMouseEnter?: () => void;
}

export default function PropertyCard({ property, isActive = false, onMouseEnter }: PropertyCardProps) {
  const { language, t, currency } = useLanguage();
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

    const isDark = document.documentElement.classList.contains('dark');

    // Smooth lift & shadow glow
    gsap.to(card, {
      y: -8,
      borderColor: isDark ? 'rgba(223, 186, 72, 0.35)' : 'rgba(156, 109, 18, 0.45)',
      boxShadow: isDark
        ? '0 20px 45px rgba(223, 186, 72, 0.08), 0 0 40px rgba(0, 0, 0, 0.5)'
        : '0 20px 45px rgba(18, 19, 24, 0.08), 0 4px 15px rgba(156, 109, 18, 0.1)',
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
      borderColor: isDark ? 'rgba(223, 186, 72, 0.8)' : 'rgba(156, 109, 18, 0.8)',
      scale: 1.25,
      duration: 0.4,
      ease: 'power2.out'
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const isDark = document.documentElement.classList.contains('dark');
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
        background: `radial-gradient(350px circle at ${borderX}px ${borderY}px, ${isDark ? 'rgba(223, 186, 72, 0.18)' : 'rgba(186, 137, 29, 0.15)'}, transparent 45%)`,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    const isDark = document.documentElement.classList.contains('dark');

    // Reset card lift and shadow
    gsap.to(card, {
      y: 0,
      borderColor: isActive
        ? (isDark ? 'rgba(223, 186, 72, 0.5)' : 'rgba(156, 109, 18, 0.6)')
        : (isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(17, 18, 22, 0.09)'),
      boxShadow: isActive
        ? (isDark ? '0 0 50px rgba(223, 186, 72, 0.15)' : '0 10px 30px rgba(156, 109, 18, 0.12)')
        : (isDark ? '0 10px 30px rgba(0, 0, 0, 0.3)' : '0 4px 12px rgba(18, 19, 24, 0.04)'),
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
      borderColor: isDark ? 'rgba(223, 186, 72, 0.3)' : 'rgba(156, 109, 18, 0.35)',
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
      className={`group relative flex flex-col w-full bg-white dark:bg-[#0c0d10] border border-black/10 dark:border-white/10 shadow-md dark:shadow-2xl transition-colors duration-300 overflow-hidden ${isActive ? 'border-accent shadow-[0_0_35px_rgba(223,186,72,0.2)]' : ''
        }`}
    >
      {/* Animated Hover Border Overlay */}
      <div
        ref={borderRef}
        className="absolute inset-0 pointer-events-none z-20 border border-transparent"
      />

      {/* Technical corner marks for architectural design aesthetic */}
      <div ref={topLeftRef} className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent/40 pointer-events-none z-20 origin-top-left transition-colors duration-300" />
      <div ref={topRightRef} className="absolute top-0 right-0 w-2 h-2 border-t border-r border-accent/40 pointer-events-none z-20 origin-top-right transition-colors duration-300" />
      <div ref={bottomLeftRef} className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-accent/40 pointer-events-none z-20 origin-bottom-left transition-colors duration-300" />
      <div ref={bottomRightRef} className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-accent/40 pointer-events-none z-20 origin-bottom-right transition-colors duration-300" />

      {/* Image container with hidden overflow */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0d0f14]">
        <img
          ref={imgRef}
          src={property.images?.[0]}
          alt={displayTitle}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover scale-[1.08]"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop";
          }}
        />
        {/* Dark gold color tint overlay */}
        <div className="property-card-image-gradient absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent z-10" />

        {/* Luxury Glassmorphic Status Badge */}
        <div
          className={`absolute top-3.5 left-3.5 z-20 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest backdrop-blur-md border shadow-sm ${property.status.toLowerCase().includes("construction")
            ? "bg-amber-100/95 dark:bg-amber-950/85 text-amber-900 dark:text-amber-300 border-amber-600/40"
            : property.status.toLowerCase().includes("completed")
              ? "bg-white/95 dark:bg-[#0c0d10]/90 text-accent border-accent/50"
              : property.status.toLowerCase().includes("sold")
                ? "bg-rose-100/95 dark:bg-rose-950/85 text-rose-900 dark:text-rose-300 border-rose-600/40"
                : "bg-emerald-100/95 dark:bg-emerald-950/85 text-emerald-900 dark:text-emerald-300 border-emerald-600/40"
            }`}
        >
          {property.status}
        </div>

        {/* Spec Badge Overlay */}
        <div className="absolute bottom-3 left-3 z-20 text-[10px] font-mono uppercase tracking-widest text-[#0c0d10] bg-accent px-2.5 py-1 font-bold shadow-sm">
          {displaySpecs.type}
        </div>
      </div>

      {/* Info Content Section */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 relative z-10 bg-white dark:bg-[#0c0d10]">
        <div>
          <div className="flex items-center text-foreground/75 dark:text-white/60 mb-1.5 font-mono text-xs uppercase tracking-wider">
            <MapPin size={12} className="mr-1.5 text-accent flex-shrink-0" />
            <span className="line-clamp-1">{displayLocation}</span>
          </div>
          <h3 className="text-base sm:text-lg font-display font-medium text-foreground dark:text-white mb-1.5 line-clamp-1 group-hover:text-accent transition-colors duration-300 leading-tight">
            {displayTitle}
          </h3>
          <p className="text-lg sm:text-xl font-display font-light text-accent mb-3">
            {formatPrice(property.price, currency.code)}
          </p>

          {/* Quick Technical specifications */}
          <div className="grid grid-cols-3 gap-1 sm:gap-2 p-2.5 sm:p-3 bg-[#f4efe6] dark:bg-[#12141a] border border-black/10 dark:border-white/10 text-xs font-mono tracking-wider uppercase mb-3 sm:mb-4">
            <div className="text-center border-r border-black/10 dark:border-white/10 px-1">
              <span className="text-foreground/70 dark:text-white/60 block font-medium text-[10px] mb-0.5">{t('properties.card.size')}</span>
              <span className="truncate block font-bold text-foreground dark:text-white">{property.specs.area || property.specs.sizes[0]}</span>
            </div>
            <div className="text-center border-r border-black/10 dark:border-white/10 px-1">
              <span className="text-foreground/70 dark:text-white/60 block font-medium text-[10px] mb-0.5">{t('properties.card.timeline')}</span>
              <span className="truncate block font-bold text-foreground dark:text-white">{displaySpecs.possession}</span>
            </div>
            <div className="text-center px-1">
              <span className="text-foreground/70 dark:text-white/60 block font-medium text-[10px] mb-0.5">{t('properties.card.facing')}</span>
              <span className="truncate block font-bold text-foreground dark:text-white">{property.specs.facing}</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-foreground/75 dark:text-white/65 font-light line-clamp-2 leading-relaxed mb-4">
            {displayDesc}
          </p>

          {/* Features checkmarks */}
          <div className="space-y-1.5 border-t border-black/10 dark:border-white/10 pt-3 mb-4">
            {displayFeatures.slice(0, 2).map((feat, i) => (
              <div key={i} className="flex items-center text-xs text-foreground/80 dark:text-white/70 font-sans tracking-wide">
                <CheckCircle className="w-3.5 h-3.5 text-accent mr-2 flex-shrink-0" />
                <span className="line-clamp-1 font-light">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions - Equalized heights (44px) */}
        <div className="flex gap-2.5 sm:gap-3 mt-auto items-center pt-2">
          <Link to={`/property/${property.slug}`} className="flex-1">
            <Button
              variant="outline"
              className="w-full h-11 group-hover/btn:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"            >
              <span>{t('properties.card.details')}</span>
              <ArrowUpRight size={13} className="group-hover/btn:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Button>
          </Link>
          <Link to="/contact">
            <MagneticButton
              className="h-11 w-11 bg-accent text-[#0c0d10] border border-accent rounded-none hover:bg-zinc-600 hover:text-white dark:hover:bg-accent-glow dark:hover:text-[#0c0d10] flex items-center justify-center transition-colors shadow-sm cursor-pointer"
              strength={20}
              ariaLabel={t('properties.contact')}
            >
              <Phone size={14} />
            </MagneticButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
