import React, { useState, useRef, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import {
  MapPin, CheckCircle, Phone, X, Share2, Heart, Eye, Calendar, Home, Bed,
  Bath, Car, ArrowLeft, Play, Camera, ChevronLeft, ChevronRight, Maximize2,
  FileText, Download, Compass, ShieldAlert, Award, Sparkles, RefreshCw,
  Calculator, Printer, TrendingUp
} from "lucide-react";
import { useProperties } from "@/context/PropertyContext";
import { useLanguage } from "@/context/LanguageContext";
import { formatPrice, parseAmount } from "@/lib/currency";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import SEOHead from "@/components/SEO/SEOHead";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import MagneticButton from "@/components/ui/MagneticButton";
import { siteConfig } from "@/config/site";

// Helper: Get Video Embed or File Info
function getVideoInfo(link: string | undefined) {
  if (!link) return null;
  // YouTube
  const ytMatch = link.match(/(?:v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch) {
    return {
      type: 'youtube' as const,
      url: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=0&rel=0`
    };
  }
  // Vimeo
  const vimeoMatch = link.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)/);
  if (vimeoMatch) {
    return {
      type: 'vimeo' as const,
      url: `https://player.vimeo.com/video/${vimeoMatch[1]}`
    };
  }
  // Direct video file (mp4, webm, ogg)
  if (link.match(/\.(mp4|webm|ogg)($|\?)/i)) {
    return {
      type: 'file' as const,
      url: link
    };
  }
  return null;
}

export default function PropertyDetails() {
  const { id } = useParams();
  const { properties, loading } = useProperties();
  const { t, language, currency } = useLanguage();

  // Find property by slug
  const property = properties.find((p) => p.slug.toString() === id);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [isLiked, setIsLiked] = useState(false);

  // Tabs horizontal scroll states and refs
  const tabsScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkTabsScroll = useCallback(() => {
    if (tabsScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsScrollRef.current;
      setCanScrollLeft(scrollLeft > 6);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 6);
    }
  }, []);

  useEffect(() => {
    checkTabsScroll();
    const el = tabsScrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkTabsScroll, { passive: true });
      window.addEventListener('resize', checkTabsScroll);
      return () => {
        el.removeEventListener('scroll', checkTabsScroll);
        window.removeEventListener('resize', checkTabsScroll);
      };
    }
  }, [checkTabsScroll]);

  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsScrollRef.current) {
      tabsScrollRef.current.scrollBy({
        left: direction === 'left' ? -220 : 220,
        behavior: 'smooth'
      });
    }
  };

  const handleTabSelect = (e: React.MouseEvent<HTMLButtonElement>, tabId: string) => {
    setActiveTab(tabId);
    e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };

  // Brochure Modal State
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [downloadingBrochure, setDownloadingBrochure] = useState(false);

  // Immersive 3D virtual tour portal states
  const [isTourActive, setIsTourActive] = useState(false);
  const [isTourLoading, setIsTourLoading] = useState(false);
  const [isTourFullscreen, setIsTourFullscreen] = useState(false);
  const [tourHotspot, setTourHotspot] = useState('main');

  // Wealth & Mortgage Workbench State
  const [downPaymentPercent, setDownPaymentPercent] = useState(25);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenureYears, setLoanTenureYears] = useState(20);
  const [expectedAppreciation, setExpectedAppreciation] = useState(9);

  // Mortgage calculations using parsed numeric amount
  const rawNumPrice = parseAmount(property?.price || 0);
  const effectivePrice = rawNumPrice < 100000 && rawNumPrice > 0 ? rawNumPrice * 200 : (rawNumPrice || 5000000);
  const downPaymentAmount = Math.round(effectivePrice * (downPaymentPercent / 100));
  const loanPrincipal = Math.max(0, effectivePrice - downPaymentAmount);
  const monthlyRate = (interestRate / 100) / 12;
  const totalMonths = loanTenureYears * 12;
  const monthlyEMI = monthlyRate > 0 && totalMonths > 0
    ? Math.round((loanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1))
    : Math.round(loanPrincipal / (totalMonths || 1));
  const totalRepayment = monthlyEMI * totalMonths;
  const totalInterest = Math.max(0, totalRepayment - loanPrincipal);
  const estimatedValue5Yr = Math.round(effectivePrice * Math.pow(1 + expectedAppreciation / 100, 5));
  const projectedGain5Yr = Math.max(0, estimatedValue5Yr - effectivePrice);

  const handleLaunchTour = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsTourActive(true);
      setIsTourLoading(false);
      return;
    }
    setIsTourLoading(true);
    setIsTourActive(true);
    setTimeout(() => {
      setIsTourLoading(false);
    }, 1800);
  };

  if (!property && loading) {
    return (
      <div
        className="container py-32 min-h-screen flex flex-col justify-center items-center"
        role="status"
        aria-live="polite"
      >
        <div className="h-px w-24 bg-accent/60 animate-pulse" />
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mt-6">Loading residence…</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container py-24 text-center text-foreground dark:text-white bg-[#f8f7f4] dark:bg-[#0c0d10] min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-2xl sm:text-3xl font-display font-medium text-accent mb-3">{t('detail.notFound')}</h1>
        <Link to="/properties" className="text-foreground/70 dark:text-white/60 font-mono text-xs uppercase tracking-widest mt-4 block hover:text-accent transition-colors">
          {t('detail.backToDirectory')}
        </Link>
      </div>
    );
  }

  // Dynamic Translation mappings
  const displayTitle = language === 'en' ? property.title : property.translations?.[language]?.title || property.title;
  const displayLocation = language === 'en' ? property.location : property.translations?.[language]?.location || property.location;
  const displayDesc = language === 'en' ? property.description : property.translations?.[language]?.description || property.description;
  const displayFeatures = language === 'en' ? property.features : property.translations?.[language]?.features || property.features;
  const displaySpecs = {
    type: language === 'en' ? property.specs.type : property.translations?.[language]?.specsType || property.specs.type,
    possession: language === 'en' ? property.specs.possession : property.translations?.[language]?.specsPossession || property.specs.possession,
    facing: language === 'en' ? property.specs.facing : property.translations?.[language]?.specsFacing || property.specs.facing
  };

  const videoInfo = getVideoInfo(property.videoLink);
  const hasImages = property.images && property.images.length > 0;

  const nextImage = () => {
    if (hasImages) {
      setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
    }
  };

  const prevImage = () => {
    if (hasImages) {
      setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
    }
  };

  const handleDownloadBrochure = () => {
    setDownloadingBrochure(true);
    setTimeout(() => {
      setDownloadingBrochure(false);
      // Simulate PDF prospectus downloading
      const link = document.createElement('a');
      link.href = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
      link.setAttribute('download', `Apex_${property.slug}_Brochure.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsBrochureOpen(false);
    }, 1500);
  };

  return (
    <section className="min-h-screen bg-[#f8f7f4] dark:bg-[#0c0d10] text-foreground dark:text-white pt-20 sm:pt-24 pb-28 lg:pb-16 relative overflow-x-clip">
      <SEOHead
        title={`${displayTitle} | Apex Luxury`}
        description={displayDesc}
        keywords={`${displayTitle}, property dehradun, apex listings`}
        canonical={`/property/${property.slug}`}
      />

      {/* Immersive Fullscreen VR Portal Overlay */}
      {isTourFullscreen && isTourActive && (
        <div className="fixed inset-0 z-[99999] w-screen h-screen bg-[#0c0d10] text-white p-4 md:p-8 flex flex-col gap-4">
          <style>{`
            @keyframes scanLine {
              0% { transform: translateY(-100%); }
              100% { transform: translateY(100%); }
            }
            .technical-scanline {
              background: linear-gradient(to bottom, rgba(223, 186, 72, 0) 0%, rgba(223, 186, 72, 0.05) 10%, rgba(223, 186, 72, 0.15) 50%, rgba(223, 186, 72, 0.05) 90%, rgba(223, 186, 72, 0) 100%);
              animation: scanLine 6s infinite linear;
            }
          `}</style>
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono tracking-widest text-white uppercase font-bold">
                MATTERPORT 3D ENGINE // {property.title.toUpperCase()} // IMMERSIVE
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  setIsTourActive(false);
                  setIsTourFullscreen(false);
                }}
                className="bg-red-950/20 border border-red-500/20 hover:bg-red-500 hover:text-white text-red-400 rounded-none font-mono text-[9px] uppercase tracking-widest py-1.5 px-4 font-bold"
              >
                Exit Tour
              </Button>
              <Button
                onClick={() => setIsTourFullscreen(false)}
                className="bg-accent text-[#0c0d10] hover:bg-accent-glow rounded-none font-mono text-[9px] uppercase tracking-widest py-1.5 px-4 font-bold"
              >
                Collapse View
              </Button>
            </div>
          </div>

          <div className="flex-1 w-full relative bg-black border border-white/5">
            {isTourLoading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0c0d10] z-30">
                <div className="w-64 max-w-xs space-y-4 text-center">
                  <Compass className="w-8 h-8 text-accent animate-spin mx-auto mb-2" />
                  <div className="text-[10px] font-mono tracking-widest text-accent uppercase animate-pulse">
                    LOADING 3D SHOWCASE ENGINE...
                  </div>
                  <div className="h-[2px] w-full bg-white/5 overflow-hidden">
                    <div className="h-full bg-accent animate-loading-bar" style={{ width: '100%' }} />
                  </div>
                </div>
              </div>
            ) : (
              <iframe
                src={`${property.virtualTourUrl || siteConfig.demo.virtualTourUrl}`}
                className="w-full h-full border-none"
                allow="xr-spatial-tracking; gyroscope; accelerometer; fullscreen"
                title={t('detail.vrFullscreen')}
              />
            )}
            <div className="absolute inset-0 pointer-events-none technical-scanline z-10 opacity-20" />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/5 pt-4 text-[9px] font-mono tracking-widest text-white/50 text-left">
            <div className="flex gap-4">
              <span>RESOLUTION: ULTRA_HD_360</span>
              <span className="hidden sm:inline">COORDINATES: {property.coordinates.join(', ')}</span>
            </div>

          </div>
        </div>
      )}

      {/* Decorative technical line grid */}
      <div className="absolute inset-0 flex justify-between pointer-events-none opacity-[0.03] dark:opacity-5 px-12 z-0">
        <div className="w-[1px] h-full bg-black dark:bg-white" />
        <div className="w-[1px] h-full bg-black dark:bg-white hidden md:block" />
        <div className="w-[1px] h-full bg-black dark:bg-white hidden md:block" />
        <div className="w-[1px] h-full bg-black dark:bg-white" />
      </div>

      {/* Detail Navbar sticky header */}
      <div className="bg-white/90 dark:bg-[#0a0c10]/80 border-b border-black/10 dark:border-white/5 relative lg:sticky lg:top-[72px] z-30 backdrop-blur-md shadow-xs dark:shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
        <div className="container mx-auto px-4 py-2.5 sm:py-3 md:px-8">
          <div className="flex items-center justify-between">
            <Link
              to="/properties"
              className="flex items-center text-foreground/75 dark:text-white/70 hover:text-accent font-mono text-[9px] tracking-widest uppercase transition-colors"
            >
              <ArrowLeft size={12} className="mr-2 text-accent" />
              {t('detail.back')}
            </Link>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setIsLiked(!isLiked)}
                aria-label="Save Property"
                className={`p-2 sm:p-2.5 border transition-all duration-300 cursor-pointer ${isLiked
                  ? 'bg-accent text-[#0c0d10] border-accent scale-105 shadow-sm'
                  : 'bg-white dark:bg-transparent border-black/15 dark:border-white/10 hover:bg-accent hover:text-white dark:hover:bg-accent/25 dark:hover:border-accent dark:hover:text-white text-accent'
                  }`}
              >
                <Heart size={14} fill={isLiked ? 'currentColor' : 'none'} />
              </button>

              <button
                aria-label="Share Property"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: displayTitle, url: window.location.href });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                  }
                }}
                className="p-2 sm:p-2.5 border border-black/15 dark:border-white/10 bg-white dark:bg-transparent hover:bg-accent hover:text-white dark:hover:bg-accent/25 dark:hover:border-accent dark:hover:text-white text-foreground/80 dark:text-white/80 transition-all cursor-pointer"
              >
                <Share2 size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-4 sm:mt-6 md:mt-8 md:px-8 relative z-10">

        {/* Title Block Header */}
        <div className="bg-white dark:bg-[#0a0c10]/70 border border-black/10 dark:border-white/5 p-4 sm:p-6 md:p-8 backdrop-blur-md relative mb-6 sm:mb-8 shadow-sm dark:shadow-2xl">
          <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-accent/40" />
          <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-accent/40" />

          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5 sm:gap-6">
            <div>
              <span className={`inline-block px-3 py-1 border text-[9px] font-mono font-bold uppercase tracking-widest mb-2.5 ${property.status.toLowerCase().includes("sold")
                ? "bg-rose-100 dark:bg-rose-950/20 text-rose-900 dark:text-rose-400 border-rose-500/30"
                : "bg-accent/10 text-accent border-accent/30"
                }`}>
                {property.status}
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-display font-medium text-foreground dark:text-white mb-2.5 leading-tight">
                {displayTitle}
              </h1>
              <div className="flex items-center text-foreground/75 dark:text-white/60">
                <MapPin size={15} className="mr-2 text-accent flex-shrink-0" />
                <span className="text-xs sm:text-sm md:text-base font-light tracking-wide">{displayLocation}</span>
              </div>
            </div>

            <div className="bg-[#f4efe6] dark:bg-[#0d0f14] border border-black/10 dark:border-white/5 p-4 sm:p-5 min-w-[220px] text-left lg:text-right relative">
              <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-accent/30" />
              <span className="text-[9px] uppercase tracking-[0.25em] text-accent font-mono font-bold block mb-1">
                {t('detail.valuation')}
              </span>
              <span className="text-2xl sm:text-3xl md:text-4xl font-display font-light text-accent block">{formatPrice(property.price, currency.code)}</span>
              <span className="text-[8px] text-foreground/50 dark:text-white/40 font-mono tracking-wider uppercase mt-1.5 block">{t('detail.demarcationIncluded')}</span>
            </div>
          </div>
        </div>

        {/* Media Split Layout: Image Slider and Walkthrough Video */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-8 sm:mb-10">

          {/* Main Visual Slider (Left column) */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-4">
            {hasImages && (
              <div className="relative border border-black/10 dark:border-white/5 bg-white dark:bg-[#0a0c10] overflow-hidden group shadow-md dark:shadow-2xl">
                {/* Tech corner marks */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent/40 z-20" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-accent/40 z-20" />

                <div className="aspect-video relative flex items-center justify-center">
                  <img loading="lazy" decoding="async" src={property.images[currentImageIndex]}
                    alt={`${property.title} - photo ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop';
                    }}
                  />

                  {/* Navigation Arrows */}
                  {property.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        aria-label="Previous Image"
                        className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/90 dark:bg-[#0c0d10]/80 hover:bg-accent text-foreground dark:text-white hover:text-white dark:hover:text-white p-2.5 sm:p-3.5 border border-black/10 dark:border-white/10 transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        onClick={nextImage}
                        aria-label="Next Image"
                        className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/90 dark:bg-[#0c0d10]/80 hover:bg-accent text-foreground dark:text-white hover:text-white dark:hover:text-white p-2.5 sm:p-3.5 border border-black/10 dark:border-white/10 transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </>
                  )}

                  {/* Top Bar Indicators */}
                  <div className="absolute top-3.5 left-3.5 bg-white/90 dark:bg-[#0c0d10]/80 backdrop-blur-md text-foreground dark:text-white px-3 py-1 sm:px-3.5 sm:py-1.5 border border-black/10 dark:border-white/10 text-[9px] font-mono uppercase tracking-widest flex items-center shadow-xs dark:shadow-lg gap-1.5 z-20">
                    <Camera size={11} className="text-accent" />
                    {t('detail.gallery')}
                  </div>

                  <button
                    onClick={() => setIsGalleryOpen(true)}
                    aria-label="Open Fullscreen Gallery"
                    className="absolute top-3.5 right-3.5 bg-white/90 dark:bg-[#0c0d10]/80 hover:bg-accent text-foreground dark:text-white hover:text-white dark:hover:text-white p-1.5 sm:p-2 border border-black/10 dark:border-white/10 shadow-xs dark:shadow-lg transition-all z-20 cursor-pointer"
                  >
                    <Maximize2 size={14} />
                  </button>

                  {/* Image Counter */}
                  <div className="absolute bottom-3.5 right-3.5 bg-white/90 dark:bg-[#0c0d10]/80 border border-black/10 dark:border-white/10 text-foreground dark:text-white px-2.5 sm:px-3 py-1 font-mono text-[9px]">
                    {currentImageIndex + 1} / {property.images.length}
                  </div>
                </div>
              </div>
            )}

            {/* Thumbnail Strip */}
            {hasImages && property.images.length > 1 && (
              <div className="flex gap-2.5 sm:gap-3 overflow-x-auto pb-1.5 scrollbar-none">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    aria-label={`Select photo ${idx + 1}`}
                    className={`relative flex-shrink-0 w-20 sm:w-24 h-14 sm:h-16 overflow-hidden transition-all duration-300 rounded-none border cursor-pointer ${currentImageIndex === idx
                      ? 'border-accent scale-[1.02] opacity-100 ring-1 ring-accent'
                      : 'border-black/15 dark:border-white/10 opacity-60 hover:opacity-100'
                      }`}
                  >
                    <img loading="lazy" decoding="async" src={img} alt={`${property.title} - thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* YouTube / Vimeo / HD Video Walkthrough (Right column) */}
          <div className="lg:col-span-5 h-full">
            {videoInfo ? (
              <div className="bg-white dark:bg-[#0a0c10] border border-black/10 dark:border-white/5 overflow-hidden shadow-md dark:shadow-2xl h-full flex flex-col">
                <div className="p-3.5 sm:p-4 bg-[#f4efe6] dark:bg-[#0d0f14] border-b border-black/10 dark:border-white/5 flex items-center justify-between text-foreground dark:text-white text-[9px] font-mono tracking-widest">
                  <span className="flex items-center gap-1.5 uppercase text-accent font-bold">
                    <Play size={12} className="fill-accent text-accent" />
                    {t('detail.tour')}
                  </span>
                  <span className="text-foreground/50 dark:text-white/40">{t('detail.aerialWalkthrough')}</span>
                </div>
                <div className="relative aspect-video lg:flex-1 h-full min-h-[220px] sm:min-h-[250px] bg-black">
                  {videoInfo.type === 'file' ? (
                    <video
                      controls
                      playsInline
                      preload="metadata"
                      poster={property.images[0]}
                      className="absolute inset-0 w-full h-full object-cover"
                    >
                      <source src={videoInfo.url} />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <iframe
                      width="100%"
                      height="100%"
                      src={videoInfo.url}
                      title={displayTitle}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    ></iframe>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-[#0a0c10] text-foreground dark:text-white border border-black/10 dark:border-white/5 p-6 sm:p-8 shadow-md dark:shadow-2xl h-full flex flex-col justify-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent/40" />
                <Play className="text-accent mb-3 sm:mb-4 animate-pulse animate-duration-1000" size={32} />
                <h3 className="text-lg sm:text-xl font-display font-medium text-foreground dark:text-white mb-2 sm:mb-3">
                  {t('detail.guidedTour')}
                </h3>
                <p className="text-xs text-foreground/65 dark:text-white/50 leading-relaxed mb-6 font-light">
                  {t('detail.guidedTourText')}
                </p>
                <Link to="/contact">
                  <MagneticButton strength={15} className="w-full" as="div">
                    <Button className="btn-luxury-gold bg-accent text-[#0c0d10] border-transparent font-bold py-3.5 sm:py-4 w-full uppercase text-[9px] tracking-widest rounded-none hover:bg-accent-glow cursor-pointer">
                      {t('detail.scheduleSiteVisit')}
                    </Button>
                  </MagneticButton>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Tab-driven Specs, Floor plan, Virtual Tour and Description */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Main Informative Column (Left) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Custom Interactive Luxury Tabs Navigator */}
            <div className="bg-white dark:bg-[#0a0c10] border border-black/10 dark:border-white/5 shadow-md dark:shadow-2xl relative">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent/40" />

              <div className="relative border-b border-black/10 dark:border-white/5 bg-[#f4efe6]/50 dark:bg-[#0d0f14]/50 group/tabs">
                {/* Desktop/Tablet Left Scroll Arrow */}
                {canScrollLeft && (
                  <button
                    type="button"
                    onClick={() => scrollTabs('left')}
                    aria-label="Scroll tabs left"
                    className="absolute left-0 top-0 bottom-0 z-20 px-1.5 sm:px-2 flex items-center justify-center bg-gradient-to-r from-[#f4efe6] via-[#f4efe6]/95 to-transparent dark:from-[#0d0f14] dark:via-[#0d0f14]/95 dark:to-transparent text-foreground/70 dark:text-white/70 hover:text-foreground dark:hover:text-white transition-all duration-300"
                  >
                    <div className="w-6 h-6 rounded-full bg-white dark:bg-[#12141a] border border-black/15 dark:border-white/25 hover:border-black/40 dark:hover:border-white/60 hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-center shadow-md dark:shadow-xl transition-all">
                      <ChevronLeft size={13} className="text-foreground/80 dark:text-white/80" />
                    </div>
                  </button>
                )}

                {/* Desktop/Tablet Right Scroll Arrow */}
                {canScrollRight && (
                  <button
                    type="button"
                    onClick={() => scrollTabs('right')}
                    aria-label="Scroll tabs right"
                    className="absolute right-0 top-0 bottom-0 z-20 px-1.5 sm:px-2 flex items-center justify-center bg-gradient-to-l from-[#f4efe6] via-[#f4efe6]/95 to-transparent dark:from-[#0d0f14] dark:via-[#0d0f14]/95 dark:to-transparent text-foreground/70 dark:text-white/70 hover:text-foreground dark:hover:text-white transition-all duration-300"
                  >
                    <div className="w-6 h-6 rounded-full bg-white dark:bg-[#12141a] border border-black/15 dark:border-white/25 hover:border-black/40 dark:hover:border-white/60 hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-center shadow-md dark:shadow-xl transition-all">
                      <ChevronRight size={13} className="text-foreground/80 dark:text-white/80" />
                    </div>
                  </button>
                )}

                <div
                  ref={tabsScrollRef}
                  onWheel={(e) => {
                    if (e.deltaY !== 0 && tabsScrollRef.current) {
                      tabsScrollRef.current.scrollLeft += e.deltaY;
                    }
                  }}
                  className="flex overflow-x-auto luxury-scrollbar-x scroll-smooth relative px-2 sm:px-3"
                >
                  {[
                    { id: 'overview', label: t('detail.overview'), icon: Home },
                    { id: 'features', label: t('detail.features'), icon: CheckCircle },
                    { id: 'floor', label: t('detail.floorPlan'), icon: FileText },
                    { id: 'mortgage', label: 'Wealth & EMI', icon: Calculator },
                    { id: 'tour3d', label: t('detail.3dTour'), icon: Compass },
                    { id: 'map', label: 'Map View', icon: MapPin }
                  ].map((tItem) => (
                    <button
                      key={tItem.id}
                      onClick={(e) => handleTabSelect(e, tItem.id)}
                      className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-3 font-mono text-[10px] sm:text-[11px] uppercase tracking-wider sm:tracking-widest border-b-2 whitespace-nowrap transition-all duration-300 flex-shrink-0 cursor-pointer ${activeTab === tItem.id
                        ? 'border-accent text-accent bg-white dark:bg-[#0a0c10] font-bold'
                        : 'border-transparent text-foreground/65 dark:text-white/50 hover:text-foreground dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                        }`}
                    >
                      <tItem.icon size={12} className="text-accent flex-shrink-0" />
                      {tItem.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-5 sm:p-6 md:p-8">
                {/* Tab: Overview */}
                {activeTab === 'overview' && (
                  <div className="space-y-6 sm:space-y-8 animate-fade-in">
                    <div>
                      <h3 className="text-base sm:text-lg font-display font-medium text-foreground dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
                        <span className="w-1 h-4 sm:h-5 bg-accent block" />
                        {t('detail.descTitle')}
                      </h3>
                      <p className="text-xs sm:text-sm text-foreground/75 dark:text-white/60 leading-relaxed bg-[#f4efe6]/60 dark:bg-[#0d0f14]/40 p-4 sm:p-5 border border-black/10 dark:border-white/5 font-light">
                        {displayDesc}
                      </p>
                    </div>

                    {/* Specs Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                      <div className="bg-[#f4efe6]/60 dark:bg-[#0d0f14]/60 border border-black/10 dark:border-white/5 p-3.5 sm:p-4 text-left relative">
                        <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-accent/40" />
                        <span className="text-[8px] text-accent uppercase font-mono tracking-wider block mb-1">
                          {t('detail.type')}
                        </span>
                        <span className="font-display font-medium text-foreground dark:text-white text-xs sm:text-sm block">{displaySpecs.type}</span>
                      </div>
                      <div className="bg-[#f4efe6]/60 dark:bg-[#0d0f14]/60 border border-black/10 dark:border-white/5 p-3.5 sm:p-4 text-left relative">
                        <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-accent/40" />
                        <span className="text-[8px] text-accent uppercase font-mono tracking-wider block mb-1">
                          {t('detail.possession')}
                        </span>
                        <span className="font-display font-medium text-foreground dark:text-white text-xs sm:text-sm block">{displaySpecs.possession}</span>
                      </div>
                      <div className="bg-[#f4efe6]/60 dark:bg-[#0d0f14]/60 border border-black/10 dark:border-white/5 p-3.5 sm:p-4 text-left relative">
                        <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-accent/40" />
                        <span className="text-[8px] text-accent uppercase font-mono tracking-wider block mb-1">
                          {t('detail.facing')}
                        </span>
                        <span className="font-display font-medium text-foreground dark:text-white text-xs sm:text-sm block">{displaySpecs.facing}</span>
                      </div>
                      <div className="bg-[#f4efe6]/60 dark:bg-[#0d0f14]/60 border border-black/10 dark:border-white/5 p-3.5 sm:p-4 text-left relative">
                        <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-accent/40" />
                        <span className="text-[8px] text-accent uppercase font-mono tracking-wider block mb-1">
                          {t('detail.sizeOptions')}
                        </span>
                        <span className="font-mono text-foreground dark:text-white text-[9px] mt-0.5 block line-clamp-1">
                          {property.specs.sizes.join(', ')}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab: Features */}
                {activeTab === 'features' && (
                  <div className="animate-fade-in">
                    <h3 className="text-base sm:text-lg font-display font-medium text-foreground dark:text-white mb-4 sm:mb-6 flex items-center gap-2">
                      <span className="w-1 h-4 sm:h-5 bg-accent block" />
                      Amenities & Key Provisions
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
                      {displayFeatures.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-3.5 p-3.5 sm:p-4 bg-[#f4efe6]/50 dark:bg-[#0d0f14]/40 border border-black/10 dark:border-white/5">
                          <CheckCircle className="text-accent flex-shrink-0" size={14} />
                          <span className="text-xs font-light tracking-wide text-foreground/85 dark:text-white/80">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab: Floor Plans */}
                {activeTab === 'floor' && (
                  <div className="space-y-4 sm:space-y-6 animate-fade-in">
                    <h3 className="text-base sm:text-lg font-display font-medium text-foreground dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
                      <span className="w-1 h-4 sm:h-5 bg-accent block" />
                      Architectural Floor & Layout Plans
                    </h3>
                    <p className="text-xs text-foreground/70 dark:text-white/55 leading-relaxed font-light mb-4">
                      Carefully engineered space configuration utilizing maximum thermal insulation, solar access, and functional airflow pathways.
                    </p>
                    <div className="bg-[#f4efe6] dark:bg-[#0d0f14] border border-black/10 dark:border-white/5 overflow-hidden max-w-lg mx-auto relative group shadow-md dark:shadow-2xl">
                      <img loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1545464693-f1798a373343?w=800&h=600&fit=crop"
                        alt={t('detail.floorPlanAlt')}
                        className="w-full h-auto opacity-75 group-hover:scale-102 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-foreground dark:text-white text-[9px] font-mono uppercase tracking-widest bg-white dark:bg-[#0c0d10] border border-black/10 dark:border-white/10 py-2.5 sm:py-3 px-4 sm:px-5 shadow-lg flex items-center gap-2">
                          <Maximize2 size={10} className="text-accent" /> Click to Expand Blueprint
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab: Wealth & Mortgage Advisory Workbench */}
                {activeTab === 'mortgage' && (
                  <div className="space-y-6 sm:space-y-8 animate-fade-in">
                    <div>
                      <h3 className="text-base sm:text-lg font-display font-medium text-foreground dark:text-white mb-2 flex items-center gap-2">
                        <span className="w-1 h-4 sm:h-5 bg-accent block" />
                        Private Wealth & EMI Advisory Workbench
                      </h3>
                      <p className="text-xs text-foreground/70 dark:text-white/55 leading-relaxed font-light">
                        Simulate tailored debt structuring, monthly capital servicing, and 5-year asset appreciation based on institutional financing parameters.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
                      {/* Left: Parameter Sliders */}
                      <div className="lg:col-span-7 space-y-5 sm:space-y-6 bg-[#f4efe6]/60 dark:bg-[#0d0f14]/60 border border-black/10 dark:border-white/5 p-4 sm:p-6 relative">
                        <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-accent/40" />

                        {/* Down Payment Slider */}
                        <div className="space-y-2.5 sm:space-y-3">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-mono uppercase tracking-widest text-foreground/70 dark:text-white/70 text-[10px]">
                              Initial Capital (Down Payment)
                            </span>
                            <span className="font-mono text-accent font-bold">
                              {downPaymentPercent}% &middot; {formatPrice(downPaymentAmount, currency.code)}
                            </span>
                          </div>
                          <Slider
                            value={[downPaymentPercent]}
                            min={10}
                            max={70}
                            step={5}
                            onValueChange={(val) => setDownPaymentPercent(val[0])}
                            aria-label="Down Payment Percentage"
                          />
                          <div className="flex justify-between text-[9px] font-mono text-foreground/45 dark:text-white/30">
                            <span>10% (Min)</span>
                            <span>40% (Institutional)</span>
                            <span>70% (Ultra-Equity)</span>
                          </div>
                        </div>

                        {/* Interest Rate Slider */}
                        <div className="space-y-2.5 sm:space-y-3">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-mono uppercase tracking-widest text-foreground/70 dark:text-white/70 text-[10px]">
                              Annual Financing Rate (APR)
                            </span>
                            <span className="font-mono text-accent font-bold">
                              {interestRate.toFixed(2)}% p.a.
                            </span>
                          </div>
                          <Slider
                            value={[interestRate]}
                            min={4}
                            max={14}
                            step={0.25}
                            onValueChange={(val) => setInterestRate(val[0])}
                            aria-label="Interest Rate"
                          />
                          <div className="flex justify-between text-[9px] font-mono text-foreground/45 dark:text-white/30">
                            <span>4.00% (Prime Tier)</span>
                            <span>8.50% (Standard)</span>
                            <span>14.00% (High-Yield)</span>
                          </div>
                        </div>

                        {/* Loan Term Slider */}
                        <div className="space-y-2.5 sm:space-y-3">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-mono uppercase tracking-widest text-foreground/70 dark:text-white/70 text-[10px]">
                              Amortization Term
                            </span>
                            <span className="font-mono text-accent font-bold">
                              {loanTenureYears} Years ({totalMonths} Installments)
                            </span>
                          </div>
                          <Slider
                            value={[loanTenureYears]}
                            min={5}
                            max={30}
                            step={1}
                            onValueChange={(val) => setLoanTenureYears(val[0])}
                            aria-label="Loan Term in Years"
                          />
                          <div className="flex justify-between text-[9px] font-mono text-foreground/45 dark:text-white/30">
                            <span>5 Yrs (Accelerated)</span>
                            <span>15 Yrs</span>
                            <span>30 Yrs (Max Horizon)</span>
                          </div>
                        </div>

                        {/* Projected Appreciation Slider */}
                        <div className="space-y-2.5 sm:space-y-3 pt-2 border-t border-black/10 dark:border-white/5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-mono uppercase tracking-widest text-foreground/70 dark:text-white/70 text-[10px] flex items-center gap-1.5">
                              <TrendingUp size={11} className="text-accent" />
                              Target Annual Capital Appreciation
                            </span>
                            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                              +{expectedAppreciation.toFixed(1)}% p.a.
                            </span>
                          </div>
                          <Slider
                            value={[expectedAppreciation]}
                            min={3}
                            max={16}
                            step={0.5}
                            onValueChange={(val) => setExpectedAppreciation(val[0])}
                            aria-label="Annual Capital Growth Assumption"
                          />
                          <div className="flex justify-between text-[9px] font-mono text-foreground/45 dark:text-white/30">
                            <span>3.0% (Conservative)</span>
                            <span>9.0% (Historic Avg)</span>
                            <span>16.0% (Prime Expansion)</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Real-time Wealth & Cash-Flow Breakdown Card */}
                      <div className="lg:col-span-5 bg-white dark:bg-[#0a0c10] border border-black/15 dark:border-white/10 p-5 sm:p-6 space-y-5 sm:space-y-6 shadow-md dark:shadow-2xl relative">
                        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-accent/40" />

                        <div>
                          <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-accent block mb-1">
                            Estimated Monthly Outlay
                          </span>
                          <div className="text-2xl sm:text-3xl md:text-4xl font-display font-light text-foreground dark:text-white tracking-tight">
                            {formatPrice(monthlyEMI, currency.code)}
                            <span className="text-xs font-mono text-foreground/50 dark:text-white/40 font-normal ml-2">/ month</span>
                          </div>
                          <p className="text-[10px] text-foreground/50 dark:text-white/40 font-mono mt-1">
                            Principal: {formatPrice(loanPrincipal, currency.code)} &middot; Term: {loanTenureYears}y
                          </p>
                        </div>

                        <div className="space-y-2.5 sm:space-y-3 pt-3.5 border-t border-black/10 dark:border-white/5 text-xs">
                          <div className="flex items-center justify-between py-1.5 border-b border-black/10 dark:border-white/5">
                            <span className="text-foreground/60 dark:text-white/50 font-light">Upfront Equity</span>
                            <span className="font-mono text-foreground dark:text-white font-medium">
                              {formatPrice(downPaymentAmount, currency.code)}
                            </span>
                          </div>

                          <div className="flex items-center justify-between py-1.5 border-b border-black/10 dark:border-white/5">
                            <span className="text-foreground/60 dark:text-white/50 font-light">Financed Principal</span>
                            <span className="font-mono text-foreground dark:text-white font-medium">
                              {formatPrice(loanPrincipal, currency.code)}
                            </span>
                          </div>

                          <div className="flex items-center justify-between py-1.5 border-b border-black/10 dark:border-white/5">
                            <span className="text-foreground/60 dark:text-white/50 font-light">Estimated Total Interest</span>
                            <span className="font-mono text-foreground/80 dark:text-white/70">
                              {formatPrice(totalInterest, currency.code)}
                            </span>
                          </div>

                          <div className="flex items-center justify-between py-2 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-600/30 dark:border-emerald-500/20 px-3">
                            <div className="flex items-center gap-1.5">
                              <TrendingUp size={12} className="text-emerald-600 dark:text-emerald-400" />
                              <span className="text-emerald-800 dark:text-emerald-400 text-[10px] font-mono uppercase tracking-wider font-semibold">
                                5-Yr Asset Valuation
                              </span>
                            </div>
                            <span className="font-mono text-emerald-800 dark:text-emerald-400 font-bold text-xs">
                              {formatPrice(estimatedValue5Yr, currency.code)}
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-[10px] px-1 text-foreground/50 dark:text-white/40 font-mono">
                            <span>Projected 5-Yr Equity Gain:</span>
                            <span className="text-accent font-semibold">
                              +{formatPrice(projectedGain5Yr, currency.code)}
                            </span>
                          </div>
                        </div>

                        <Link to="/contact">
                          <Button className="w-full btn-luxury-gold bg-accent text-white dark:text-[#0c0d10] font-bold text-[9px] font-mono uppercase tracking-widest py-3 sm:py-3.5 rounded-none hover:bg-accent-glow shadow-md mt-2 cursor-pointer">
                            Request Private Banking Terms
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab: 3D Tour */}
                {activeTab === 'tour3d' && (
                  <div className="space-y-6 animate-fade-in">
                    <style>{`
                      @keyframes loadingBar {
                        0% { transform: translateX(-100%); }
                        100% { transform: translateX(100%); }
                      }
                      .animate-loading-bar {
                        animation: loadingBar 1.8s infinite linear;
                      }
                    `}</style>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="text-left">
                        <h3 className="text-base sm:text-lg font-display font-medium text-foreground dark:text-white mb-1.5 flex items-center gap-2">
                          <span className="w-1 h-4 sm:h-5 bg-accent block" />
                          Interactive 360° Virtual Walkthrough
                        </h3>
                        <p className="text-xs text-foreground/70 dark:text-white/55 leading-relaxed font-light">
                          Teleport directly into the site with our virtual 3D panorama scanner. Rotate 360 degrees and visually explore architectural demarcations.
                        </p>
                      </div>

                      {isTourActive && (
                        <div className="flex gap-2">
                          <Button
                            onClick={() => setIsTourFullscreen(true)}
                            className="bg-accent hover:bg-accent-glow text-white dark:text-[#0c0d10] font-bold py-2 px-4 rounded-none font-mono text-[9px] uppercase tracking-widest cursor-pointer"
                          >
                            Launch Fullscreen Portal
                          </Button>
                          <Button
                            onClick={() => {
                              setIsTourActive(false);
                              setIsTourFullscreen(false);
                            }}
                            className="bg-white dark:bg-[#0d0f14] border border-black/15 dark:border-white/10 hover:border-red-500/20 hover:text-red-500 text-foreground/70 dark:text-white/60 py-2 px-4 rounded-none font-mono text-[9px] uppercase tracking-widest cursor-pointer"
                          >
                            Reset Link
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* The VR Tour Portal Viewport */}
                    <div className="relative border border-black/10 dark:border-white/5 overflow-hidden shadow-md dark:shadow-2xl h-[360px] sm:h-[400px] w-full bg-[#f4efe6] dark:bg-[#090a0d]">
                      {!isTourActive ? (
                        /* Pre-activation cover screen */
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                          <img loading="lazy" decoding="async" src={property.images?.[1] || property.images?.[0]}
                            alt="360 degree space preview"
                            className="absolute inset-0 w-full h-full object-cover opacity-25 blur-[1px]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-black/20 dark:from-[#090a0d] dark:via-transparent dark:to-black/30" />
                          <div className="relative z-10 max-w-sm">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-accent/10 border border-accent text-accent flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-[0_0_25px_rgba(223,186,72,0.15)]">
                              <Compass size={22} className="animate-pulse" />
                            </div>
                            <h4 className="font-display font-medium text-foreground dark:text-white text-base mb-1.5">
                              Interactive 3D Showcase
                            </h4>
                            <p className="text-[11px] text-foreground/65 dark:text-white/50 mb-5 leading-relaxed font-light">
                              Step inside the property with our high-fidelity immersive 3D scanner. Fully compatible with mobile devices, tablets, and VR headsets.
                            </p>
                            <Button
                              onClick={handleLaunchTour}
                              className="bg-accent hover:bg-accent-glow text-white dark:text-[#0c0d10] font-bold py-3 px-6 sm:px-8 rounded-none font-mono text-[9px] uppercase tracking-widest shadow-glow cursor-pointer"
                            >
                              Launch 360° Walkthrough
                            </Button>
                          </div>
                        </div>
                      ) : isTourLoading ? (
                        /* Glowing Telemetry Loading State */
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white dark:bg-[#0c0d10] z-30">
                          <div className="w-64 max-w-xs space-y-4 text-center">
                            <Compass className="w-8 h-8 text-accent animate-spin mx-auto mb-2" />
                            <div className="text-[10px] font-mono tracking-widest text-accent uppercase animate-pulse">
                              LOADING IMMERSIVE SHOWCASE...
                            </div>
                            <div className="h-[2px] w-full bg-black/10 dark:bg-white/5 overflow-hidden">
                              <div className="h-full bg-accent animate-loading-bar" style={{ width: '100%' }} />
                            </div>
                            <div className="text-[8px] font-mono text-foreground/50 dark:text-white/40 uppercase space-y-1">
                              <div>PROPERTY_ID: {property.id}</div>
                              <div>LAT_LNG: {property.coordinates.join(', ')}</div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* Interactive 3D Iframe Viewer */
                        <div className="relative w-full h-full flex flex-col">
                          {/* Live Scan indicator */}
                          <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-white/90 dark:bg-[#0c0d10]/80 backdrop-blur-md px-3 py-1.5 border border-emerald-600/30 dark:border-emerald-500/30 text-[9px] font-mono text-emerald-800 dark:text-emerald-400 font-semibold shadow-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            LIVE 3D SHOWCASE ACTIVE
                          </div>

                          <iframe
                            src={`${property.virtualTourUrl || siteConfig.demo.virtualTourUrl}`}
                            className="w-full h-full border-none bg-black flex-1"
                            allow="xr-spatial-tracking; gyroscope; accelerometer; fullscreen"
                            title="Interactive 3D Virtual Tour"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Tab: Map View (Google Maps Production Grade) */}
                {activeTab === 'map' && (
                  <div className="space-y-4 sm:space-y-6 animate-fade-in">
                    <div className="text-left">
                      <h3 className="text-base sm:text-lg font-display font-medium text-foreground dark:text-white mb-1.5 flex items-center gap-2">
                        <span className="w-1 h-4 sm:h-5 bg-accent block" />
                        Property Location Map
                      </h3>
                      <p className="text-xs text-foreground/70 dark:text-white/55 leading-relaxed font-light mb-3">
                        Explore the neighborhood, local amenities, and precise geographic demarcations via satellite imagery.
                      </p>
                    </div>
                    <div className="w-full h-[360px] sm:h-[420px] border border-black/10 dark:border-white/5 bg-[#f4efe6] dark:bg-[#090a0d] shadow-md dark:shadow-2xl relative group">
                      {/* Loading Placeholder behind iframe */}
                      <div className="absolute inset-0 flex items-center justify-center -z-10">
                        <RefreshCw className="text-accent animate-spin w-8 h-8 opacity-50" />
                      </div>

                      <iframe
                        title={t('detail.mapTitle')}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        style={{ border: 0 }}
                        src={`https://maps.google.com/maps?q=${property.coordinates[0]},${property.coordinates[1]}&z=15&output=embed`}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                      ></iframe>

                      {/* Map overlay controls */}
                      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-white/90 dark:bg-[#0c0d10]/90 backdrop-blur-md px-3 py-1.5 border border-black/10 dark:border-white/10 text-[9px] font-mono text-foreground/80 dark:text-white/80 uppercase tracking-widest shadow-sm">
                        <MapPin size={10} className="text-accent" />
                        Google Maps Integration
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Contact, Download Brochure & Info Panel (Right) */}
          <div className="lg:col-span-4 space-y-5 sm:space-y-6 lg:sticky lg:top-[160px]">

            {/* Download brochure panel */}
            <div className="bg-white dark:bg-[#0a0c10] border border-black/10 dark:border-white/5 p-5 sm:p-6 md:p-8 shadow-md dark:shadow-2xl relative">
              <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-accent/40" />
              <h3 className="font-display font-medium text-base text-foreground dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
                <FileText className="text-accent" size={16} />
                {t('detail.brochure')}
              </h3>
              <p className="text-xs text-foreground/65 dark:text-white/50 leading-relaxed mb-5 sm:mb-6 font-light">
                Receive the complete architectural prospectus, including fine-grained blueprints, soil testing results, layout plans, and full pricing matrices.
              </p>
              <Button
                onClick={() => setIsBrochureOpen(true)}
                className="w-full bg-[#f4efe6] dark:bg-[#0d0f14] border border-black/15 dark:border-white/10 hover:bg-accent hover:text-white dark:hover:bg-accent/25 dark:hover:border-accent dark:hover:text-white text-foreground dark:text-white font-bold py-3 sm:py-3.5 flex items-center justify-center gap-2 rounded-none font-mono text-[11px] sm:text-[12px] tracking-widest uppercase hover:border-transparent transition-all cursor-pointer"
              >
                <Download size={12} />
                Get PDF Brochure
              </Button>
              <button
                type="button"
                onClick={() => window.print()}
                className="w-full mt-2.5 bg-transparent border border-black/15 dark:border-white/10 hover:border-accent hover:bg-accent hover:text-white dark:hover:bg-accent/25 dark:hover:border-accent dark:hover:text-white text-foreground/80 dark:text-white/70 font-mono text-[10px] tracking-widest uppercase py-2.5 sm:py-3 flex items-center justify-center gap-2 transition-all cursor-pointer group"
              >
                <Printer size={12} className="text-accent group-hover:text-white transition-colors" />
                Print Architectural Dossier
              </button>
            </div>

            {/* Direct Dial / Action list */}
            <div className="bg-white dark:bg-[#0a0c10] border border-black/10 dark:border-white/5 p-5 sm:p-6 md:p-8 shadow-md dark:shadow-2xl relative">
              <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-accent/40" />
              <h3 className="font-display font-medium text-base text-foreground dark:text-white mb-4 sm:mb-6">
                {t('detail.highlights')}
              </h3>
              <div className="space-y-3.5 sm:space-y-4">
                <div className="flex items-center p-3 bg-[#f4efe6]/60 dark:bg-[#0d0f14]/50 border border-black/10 dark:border-white/5">
                  <Phone className="text-accent mr-3.5 flex-shrink-0" size={14} />
                  <div>
                    <span className="text-[8px] text-foreground/50 dark:text-white/40 font-mono tracking-wider uppercase block">{t('detail.directPhone')}</span>
                    <span className="text-xs font-bold text-foreground dark:text-white tracking-wide">{property.contact}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-1.5">
                  <Link to="/contact">
                    <Button
                      variant="outline"
                      className="w-full text-[9px] font-mono uppercase tracking-widest py-3 border border-black/15 dark:border-white/10 text-foreground dark:text-white rounded-none bg-transparent hover:bg-accent hover:text-white dark:hover:bg-accent/25 dark:hover:border-accent dark:hover:text-white hover:border-accent transition-all cursor-pointer"
                    >
                      {t('detail.sendMessage')}
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button className="w-full btn-luxury-gold bg-accent text-[#0c0d10] text-[9px] font-mono uppercase tracking-widest py-3.5 rounded-none font-bold hover:bg-accent-glow shadow-sm cursor-pointer">
                      {t('detail.schedule')}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Screen Zoom Image Modal */}
      {isGalleryOpen && hasImages && (
        <div className="fixed inset-0 bg-black/90 dark:bg-[#0c0d10]/95 flex items-center justify-center z-50 animate-fade-in backdrop-blur-sm">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            {/* Close */}
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-accent bg-black/40 hover:bg-[#0c0d10] border border-white/20 p-3 z-10 transition-all cursor-pointer"
              onClick={() => setIsGalleryOpen(false)}
              aria-label="Close Gallery"
            >
              <X size={20} />
            </button>

            {/* Navigation */}
            {property.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  aria-label="Previous Image"
                  className="absolute left-4 sm:left-6 top-1/2 transform -translate-y-1/2 text-white hover:text-black bg-black/60 hover:bg-accent border border-white/20 p-3 sm:p-4 transition-all z-10 cursor-pointer"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextImage}
                  aria-label="Next Image"
                  className="absolute right-4 sm:right-6 top-1/2 transform -translate-y-1/2 text-white hover:text-black bg-black/60 hover:bg-accent border border-white/20 p-3 sm:p-4 transition-all z-10 cursor-pointer"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}

            {/* Zoom Image */}
            <img loading="lazy" decoding="async" src={property.images[currentImageIndex]}
              alt={`${property.title} - enlarged photo ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain border border-white/10 shadow-2xl"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop';
              }}
            />

            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-[#0c0d10] border border-white/20 text-white px-5 py-2 font-mono text-xs">
              {currentImageIndex + 1} / {property.images.length}
            </div>
          </div>
        </div>
      )}

      {/* Brochure Prospectus Download Modal Dialog */}
      <Dialog open={isBrochureOpen} onOpenChange={setIsBrochureOpen}>
        <DialogContent className="max-w-md bg-white dark:bg-[#0a0c10] border border-black/15 dark:border-white/10 rounded-none shadow-2xl p-6 outline-none text-foreground dark:text-white relative">
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent/40" />

          <DialogHeader className="border-b border-black/10 dark:border-white/5 pb-4 mb-4">
            <DialogTitle className="text-lg font-display font-medium text-foreground dark:text-white flex items-center gap-2">
              <Award className="text-accent animate-pulse" size={18} />
              {t('detail.brochureDownload')}
            </DialogTitle>
            <DialogDescription className="text-[10px] text-foreground/50 dark:text-white/40 mt-1 uppercase font-mono tracking-wider">
              {t('detail.brochureAuth')}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <p className="text-xs text-foreground/75 dark:text-white/60 leading-relaxed font-light">
              {t('detail.brochureText')} {t('detail.brochureNote')}
            </p>

            <div className="bg-[#f4efe6] dark:bg-[#0d0f14] p-4 border border-black/10 dark:border-white/5 text-[9px] font-mono tracking-wide uppercase space-y-1 text-foreground/75 dark:text-white/60">
              <div><span className="text-accent mr-1.5 font-bold">{t('detail.file')}</span> Apex_Prospectus_{property.slug}.pdf</div>
              <div><span className="text-accent mr-1.5 font-bold">{t('detail.size')}</span> 14.8 MB</div>
              <div><span className="text-accent mr-1.5 font-bold">{t('detail.format')}</span> {t('detail.formatValue')}</div>
            </div>

            <Button
              onClick={handleDownloadBrochure}
              disabled={downloadingBrochure}
              className="w-full btn-luxury-gold bg-accent text-[#0c0d10] border-transparent font-bold py-3.5 rounded-none flex items-center justify-center gap-2 uppercase tracking-widest font-mono text-[9px] hover:bg-accent-glow cursor-pointer"
            >
              {downloadingBrochure ? (
                <>
                  <RefreshCw className="animate-spin" size={12} />
                  Preparing portfolio dossier...
                </>
              ) : (
                <>
                  <Download size={12} />
                  Download Prospectus
                </>
              )}
            </Button>

            <Button
              type="button"
              onClick={() => {
                setIsBrochureOpen(false);
                setTimeout(() => window.print(), 350);
              }}
              variant="outline"
              className="w-full border-black/15 dark:border-white/10 text-foreground dark:text-white hover:text-white hover:bg-accent dark:hover:bg-accent/25 dark:hover:border-accent dark:hover:text-white hover:border-accent font-mono text-[9px] uppercase tracking-widest py-3 flex items-center justify-center gap-2 rounded-none transition-all cursor-pointer group"
            >
              <Printer size={12} className="text-accent group-hover:text-white transition-colors" />
              Print Architectural Dossier Directly (A4)
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Mobile Sticky Conversion Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0c0d10]/95 backdrop-blur-md border-t border-black/10 dark:border-white/10 px-4 py-3 flex items-center justify-between shadow-[0_-5px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_-10px_25px_rgba(0,0,0,0.5)]">
        <div>
          <span className="text-[8px] font-mono tracking-widest uppercase text-foreground/50 dark:text-white/40 block">
            {t('detail.valuation')}
          </span>
          <span className="text-base font-display font-medium text-accent">
            {formatPrice(property.price, currency.code)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {property.contact && (
            <a
              href={`tel:${property.contact}`}
              aria-label="Direct Call Specialist"
              className="p-2.5 border border-black/15 dark:border-white/10 bg-[#f4efe6] dark:bg-[#0a0c10] text-accent hover:bg-black/5 dark:hover:bg-white/5 active:scale-95 transition-all"
            >
              <Phone size={14} />
            </a>
          )}
          <Link to="/contact">
            <Button className="btn-luxury-gold bg-accent text-[#0c0d10] font-bold text-[9px] font-mono uppercase tracking-widest px-4 py-2.5 rounded-none hover:bg-accent-glow shadow-sm cursor-pointer">
              {t('detail.schedule')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}