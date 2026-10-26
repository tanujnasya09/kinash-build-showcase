import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Property } from '@/context/PropertyContext';
import PropertyCard from '@/components/ui/PropertyCard';
import { Button } from '@/components/ui/button';

interface FeaturedPortfolioCarouselProps {
  properties: Property[];
  eyebrow?: string;
  title?: string;
  titleAccent?: string;
  body?: string;
  ctaText?: string;
}

export const FeaturedPortfolioCarousel: React.FC<FeaturedPortfolioCarouselProps> = ({
  properties,
  eyebrow = 'CURATED COLLECTION',
  title = 'Featured',
  titleAccent = 'Portfolios',
  body = 'Handpicked residential plots, designer villas, and architectural developments engineered for generational appreciation.',
  ctaText = 'Explore All Properties',
}) => {
  const showcaseProperties = properties.slice(0, 6);
  const total = showcaseProperties.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Responsive items-per-view calculation
  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setItemsPerView(1); // Mobile
      } else if (width < 1024) {
        setItemsPerView(2); // Tablet
      } else {
        setItemsPerView(3); // Desktop
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const maxIndex = Math.max(0, total - itemsPerView);

  // Keep index in valid bounds when itemsPerView changes
  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  }, [maxIndex]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      }
    },
    [handlePrev, handleNext]
  );

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45;

    if (diff > minSwipeDistance) {
      handleNext();
    } else if (diff < -minSwipeDistance) {
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const isPrevDisabled = currentIndex <= 0;
  const isNextDisabled = currentIndex >= maxIndex;

  // Number of dot pages
  const totalDots = maxIndex + 1;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured Portfolios Carousel"
      className="py-6 sm:py-8 lg:py-10 bg-[#f8f7f4] dark:bg-[#0c0d10] text-foreground dark:text-white border-b border-black/10 dark:border-white/5 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header with Title and Prev/Next Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-3.5 sm:mb-5">
          <div className="max-w-2xl text-left">
            <span className="text-xs uppercase tracking-[0.25em] text-accent font-mono font-bold block mb-1.5">
              {eyebrow}
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-medium text-foreground dark:text-white leading-tight">
              {title} <span className="text-accent italic font-light">{titleAccent}</span>
            </h2>
            {body && (
              <p className="mt-1.5 text-xs sm:text-sm text-foreground/75 dark:text-white/60 font-light leading-relaxed max-w-xl">
                {body}
              </p>
            )}
          </div>

          {/* Desktop & Tablet Carousel Controls */}
          <div className="flex items-center gap-2.5 self-start md:self-end">
            <Button
              asChild
              variant="outline"
              className="hidden sm:inline-flex border-black/20 dark:border-white/15 bg-white dark:bg-transparent text-foreground dark:text-white hover:bg-accent hover:text-white dark:hover:bg-accent/25 dark:hover:border-accent dark:hover:text-white hover:border-accent text-xs font-mono uppercase tracking-wider rounded-none h-10 px-4 transition-colors cursor-pointer group"
            >
              <Link to="/properties" className="flex items-center gap-2">
                <span>{ctaText}</span>
                <ArrowRight size={13} className="text-accent group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </Link>
            </Button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                disabled={isPrevDisabled}
                aria-label="Previous portfolio property"
                className="w-10 h-10 border border-black/20 dark:border-white/15 bg-white dark:bg-[#121318] text-foreground dark:text-white hover:bg-accent hover:text-white dark:hover:bg-accent/25 dark:hover:border-accent dark:hover:text-white hover:border-accent disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white dark:disabled:hover:bg-[#121318] disabled:hover:text-inherit flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={isNextDisabled}
                aria-label="Next portfolio property"
                className="w-10 h-10 border border-black/20 dark:border-white/15 bg-white dark:bg-[#121318] text-foreground dark:text-white hover:bg-accent hover:text-white dark:hover:bg-accent/25 dark:hover:border-accent dark:hover:text-white hover:border-accent disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white dark:disabled:hover:bg-[#121318] disabled:hover:text-inherit flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Viewport */}
        <div
          ref={containerRef}
          tabIndex={0}
          role="region"
          aria-live="polite"
          onKeyDown={handleKeyDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/40 rounded-none overflow-hidden select-none"
        >
          <div
            className="flex transition-transform duration-500 ease-out -mx-3"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            }}
          >
            {showcaseProperties.map((property) => (
              <div
                key={property.id}
                className="px-3 flex-shrink-0"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots and Mobile Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-4 border-t border-black/10 dark:border-white/5">
          {/* Dots Indicator */}
          {totalDots > 1 && (
            <div className="flex items-center gap-2" role="tablist" aria-label="Slide indicators">
              {Array.from({ length: totalDots }).map((_, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={idx}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Go to slide ${idx + 1}`}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 transition-all duration-300 rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${isActive
                        ? 'w-8 bg-accent'
                        : 'w-2 bg-black/20 dark:bg-white/20 hover:bg-black/40 dark:hover:bg-white/40'
                      }`}
                  />
                );
              })}
            </div>
          )}

          {/* Active Counter */}
          <div className="text-[11px] font-mono uppercase tracking-widest text-foreground/60 dark:text-white/50">
            Showing <span className="text-accent font-bold">{currentIndex + 1}</span> to{' '}
            <span className="text-accent font-bold">{Math.min(currentIndex + itemsPerView, total)}</span> of{' '}
            <span className="font-bold">{total}</span>
          </div>

          {/* Mobile All Properties Link */}
          <div className="w-full sm:hidden">
            <Button
              asChild
              variant="outline"
              className="w-full border-black/15 dark:border-white/10 hover:border-accent hover:bg-accent hover:text-white dark:hover:bg-accent/25 dark:hover:border-accent dark:hover:text-white text-xs font-mono uppercase tracking-wider rounded-none h-11 group"
            >
              <Link to="/properties" className="flex items-center justify-center gap-2">
                <span>{ctaText}</span>
                <ArrowRight size={12} className="text-accent group-hover:text-white transition-colors" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPortfolioCarousel;
