import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  MapPin, CheckCircle, Phone, X, Share2, Heart, Eye, Calendar, Home, Bed,
  Bath, Car, ArrowLeft, Play, Camera, ChevronLeft, ChevronRight, Maximize2,
  FileText, Download, Compass, ShieldAlert, Award, Sparkles, RefreshCw
} from "lucide-react";
import { useProperties } from "@/context/PropertyContext";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEO/SEOHead";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import MagneticButton from "@/components/ui/MagneticButton";

// Helper: Get YouTube Embed URL
function getYouTubeEmbedUrl(link: string | undefined) {
  if (!link) return null;
  const match = link.match(/(?:v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=0&rel=0` : null;
}

export default function PropertyDetails() {
  const { id } = useParams();
  const { properties } = useProperties();
  const { t, language } = useLanguage();

  // Find property by slug
  const property = properties.find((p) => p.slug.toString() === id);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [isLiked, setIsLiked] = useState(false);

  // Brochure Modal State
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [downloadingBrochure, setDownloadingBrochure] = useState(false);

  // Immersive 3D virtual tour portal states
  const [isTourActive, setIsTourActive] = useState(false);
  const [isTourLoading, setIsTourLoading] = useState(false);
  const [isTourFullscreen, setIsTourFullscreen] = useState(false);
  const [tourHotspot, setTourHotspot] = useState('main');

  const handleLaunchTour = () => {
    setIsTourLoading(true);
    setIsTourActive(true);
    setTimeout(() => {
      setIsTourLoading(false);
    }, 1800);
  };

  if (!property) {
    return (
      <div className="container py-32 text-center text-white bg-[#0c0d10] min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-3xl font-display font-medium text-accent">Property Not Found</h1>
        <Link to="/properties" className="text-white/60 font-mono text-xs uppercase tracking-widest mt-6 block hover:text-accent transition-colors">
          Return to Properties Directory
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

  const youtubeUrl = getYouTubeEmbedUrl(property.videoLink);
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
      link.setAttribute('download', `Kinash_${property.slug}_Brochure.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsBrochureOpen(false);
    }, 1500);
  };

  return (
    <section className="min-h-screen bg-[#0c0d10] text-white pt-28 pb-20 relative overflow-hidden">
      <SEOHead
        title={`${displayTitle} | Kinash Associates`}
        description={displayDesc}
        keywords={`${displayTitle}, property dehradun, kinash listings`}
        canonical={`/property/${property.slug}`}
      />

      {/* Immersive Fullscreen VR Portal Overlay */}
      {isTourFullscreen && isTourActive && (
        <div className="fixed inset-0 z-[99999] w-screen h-screen bg-[#0c0d10] p-4 md:p-8 flex flex-col gap-4">
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
                SPATIAL LINK ACTIVE // {property.title.toUpperCase()} // PORTAL DOCK
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
                Terminate Link
              </Button>
              <Button
                onClick={() => setIsTourFullscreen(false)}
                className="bg-accent text-[#0c0d10] hover:bg-accent-glow rounded-none font-mono text-[9px] uppercase tracking-widest py-1.5 px-4 font-bold"
              >
                Collapse Viewport
              </Button>
            </div>
          </div>
          
          <div className="flex-1 w-full relative bg-black border border-white/5">
            {isTourLoading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0c0d10] z-30">
                <div className="w-64 max-w-xs space-y-4 text-center">
                  <Compass className="w-8 h-8 text-accent animate-spin mx-auto mb-2" />
                  <div className="text-[10px] font-mono tracking-widest text-accent uppercase animate-pulse">
                    ESTABLISHING VR LINK...
                  </div>
                  <div className="h-[2px] w-full bg-white/5 overflow-hidden">
                    <div className="h-full bg-accent animate-loading-bar" style={{ width: '100%' }} />
                  </div>
                </div>
              </div>
            ) : (
              <iframe
                src={`${property.virtualTourUrl || 'https://kuula.co/share/collection/7YyWz'}`}
                className="w-full h-full border-none"
                allow="xr-spatial-tracking; gyroscope; accelerometer; fullscreen"
                title="Fullscreen VR Tour"
              />
            )}
            <div className="absolute inset-0 pointer-events-none technical-scanline z-10 opacity-20" />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/5 pt-4 text-[9px] font-mono tracking-widest text-white/50 text-left">
            <div className="flex gap-4">
              <span>RESOLUTION: ULTRA_HD_360</span>
              <span className="hidden sm:inline">COORDINATES: {property.coordinates.join(', ')}</span>
            </div>
            <div className="flex gap-2 pointer-events-auto">
              <span>TELEPORT DOCK:</span>
              {[
                { id: 'main', label: 'Main Plot' },
                { id: 'approach', label: 'Approach Road' },
                { id: 'surroundings', label: 'Surrounding Forest' }
              ].map((hs) => (
                <button
                  key={hs.id}
                  onClick={() => {
                    setTourHotspot(hs.id);
                    setIsTourLoading(true);
                    setTimeout(() => setIsTourLoading(false), 900);
                  }}
                  className={`px-2 py-0.5 border uppercase text-[8px] ${
                    tourHotspot === hs.id
                      ? 'bg-accent text-[#0c0d10] border-accent font-bold'
                      : 'bg-transparent text-white border-white/10 hover:border-accent hover:text-accent'
                  }`}
                >
                  {hs.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Decorative technical line grid */}
      <div className="absolute inset-0 flex justify-between pointer-events-none opacity-5 px-12 z-0">
        <div className="w-[1px] h-full bg-white" />
        <div className="w-[1px] h-full bg-white hidden md:block" />
        <div className="w-[1px] h-full bg-white hidden md:block" />
        <div className="w-[1px] h-full bg-white" />
      </div>

      {/* Detail Navbar sticky header */}
      <div className="bg-[#0a0c10]/80 border-b border-white/5 sticky top-[72px] z-30 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
        <div className="max-w-7xl mx-auto px-4 py-4 md:px-8">
          <div className="flex items-center justify-between">
            <Link
              to="/properties"
              className="flex items-center text-white/70 hover:text-accent font-mono text-[9px] tracking-widest uppercase transition-colors"
            >
              <ArrowLeft size={12} className="mr-2 text-accent" />
              {t('detail.back')}
            </Link>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-3 border transition-all duration-300 ${isLiked
                  ? 'bg-accent/10 text-accent border-accent/40 scale-105'
                  : 'bg-transparent border-white/10 hover:bg-white/5 text-white/60 hover:text-white'
                  }`}
              >
                <Heart size={14} fill={isLiked ? 'currentColor' : 'none'} />
              </button>

              <button className="p-3 border border-white/10 bg-transparent hover:bg-white/5 text-white/60 hover:text-white transition-all">
                <Share2 size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12 md:px-8 relative z-10">

        {/* Title Block Header */}
        <div className="bg-[#0a0c10]/70 border border-white/5 p-6 md:p-10 backdrop-blur-md relative mb-10 shadow-2xl">
          <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-accent/40" />
          <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-accent/40" />

          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
            <div>
              <span className={`inline-block px-3.5 py-1.5 border text-[9px] font-mono font-bold uppercase tracking-widest mb-4 ${property.status.toLowerCase().includes("sold")
                ? "bg-red-950/20 text-red-400 border-red-500/30"
                : "bg-accent/5 text-accent border-accent/30"
                }`}>
                {property.status}
              </span>
              <h1 className="text-3xl md:text-5xl font-display font-medium text-white mb-4 leading-tight">
                {displayTitle}
              </h1>
              <div className="flex items-center text-white/60">
                <MapPin size={16} className="mr-2 text-accent flex-shrink-0" />
                <span className="text-sm md:text-base font-light tracking-wide">{displayLocation}</span>
              </div>
            </div>

            <div className="bg-[#0d0f14] border border-white/5 p-6 min-w-[240px] text-left lg:text-right relative">
              <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-accent/30" />
              <span className="text-[9px] uppercase tracking-[0.25em] text-accent font-mono block mb-1">
                {language === 'en' ? 'Premium Valuation' : 'Valuación Premium'}
              </span>
              <span className="text-3xl md:text-4xl font-display font-light text-white block bg-gradient-to-r from-accent to-accent-glow bg-clip-text text-transparent">{property.price}</span>
              <span className="text-[8px] text-white/40 font-mono tracking-wider uppercase mt-1.5 block">Immediate Demarcation Included</span>
            </div>
          </div>
        </div>

        {/* Media Split Layout: Image Slider and Walkthrough Video */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">

          {/* Main Visual Slider (Left column) */}
          <div className="lg:col-span-7 space-y-4">
            {hasImages && (
              <div className="relative border border-white/5 bg-[#0a0c10] overflow-hidden group shadow-2xl">
                {/* Tech corner marks */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent/40 z-20" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-accent/40 z-20" />

                <div className="aspect-video relative flex items-center justify-center">
                  <img
                    src={property.images[currentImageIndex]}
                    alt={`Property image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    onError={(e: any) => {
                      e.target.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop';
                    }}
                  />

                  {/* Navigation Arrows */}
                  {property.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#0c0d10]/80 hover:bg-accent text-white hover:text-black p-3.5 border border-white/10 transition-all duration-300 opacity-0 group-hover:opacity-100"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#0c0d10]/80 hover:bg-accent text-white hover:text-black p-3.5 border border-white/10 transition-all duration-300 opacity-0 group-hover:opacity-100"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </>
                  )}

                  {/* Top Bar Indicators */}
                  <div className="absolute top-4 left-4 bg-[#0c0d10]/80 backdrop-blur-md text-white px-3.5 py-1.5 border border-white/10 text-[9px] font-mono uppercase tracking-widest flex items-center shadow-lg gap-1.5 z-20">
                    <Camera size={11} className="text-accent" />
                    {t('detail.gallery')}
                  </div>

                  <button
                    onClick={() => setIsGalleryOpen(true)}
                    className="absolute top-4 right-4 bg-[#0c0d10]/80 hover:bg-accent text-white hover:text-[#0c0d10] p-2 border border-white/10 shadow-lg transition-all z-20"
                  >
                    <Maximize2 size={14} />
                  </button>

                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-[#0c0d10]/80 border border-white/10 text-white px-3 py-1 font-mono text-[9px]">
                    {currentImageIndex + 1} / {property.images.length}
                  </div>
                </div>
              </div>
            )}

            {/* Thumbnail Strip */}
            {hasImages && property.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`relative flex-shrink-0 w-24 h-16 overflow-hidden transition-all duration-300 rounded-none border ${currentImageIndex === idx
                      ? 'border-accent scale-[1.02] opacity-100'
                      : 'border-white/10 opacity-50 hover:opacity-100'
                      }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* YouTube HD Walkthrough Walk (Right column) */}
          <div className="lg:col-span-5 h-full">
            {youtubeUrl ? (
              <div className="bg-[#0a0c10] border border-white/5 overflow-hidden shadow-2xl h-full flex flex-col">
                <div className="p-4 bg-[#0d0f14] border-b border-white/5 flex items-center justify-between text-white text-[9px] font-mono tracking-widest">
                  <span className="flex items-center gap-1.5 uppercase text-red-500 font-bold">
                    <Play size={12} className="fill-red-500" />
                    {t('detail.tour')}
                  </span>
                  <span className="text-white/40">4K AERIAL WALKTHROUGH</span>
                </div>
                <div className="relative aspect-video lg:flex-1 h-full min-h-[250px] bg-black">
                  <iframe
                    width="100%"
                    height="100%"
                    src={youtubeUrl}
                    title={displayTitle}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  ></iframe>
                </div>
              </div>
            ) : (
              <div className="bg-[#0a0c10] text-white border border-white/5 p-8 shadow-2xl h-full flex flex-col justify-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent/40" />
                <Play className="text-accent mb-4 animate-pulse animate-duration-1000" size={36} />
                <h3 className="text-xl font-display font-medium text-white mb-3">
                  Signature Guided Tour
                </h3>
                <p className="text-xs text-white/50 leading-relaxed mb-8 font-light">
                  A high-definition cinematic and aerial walkthrough is currently being produced for this masterpiece. Inquire with our Dehradun registry to schedule a private, in-person site walk.
                </p>
                <Link to="/contact">
                  <MagneticButton strength={15} className="w-full" as="div">
                    <Button className="btn-luxury-gold bg-accent text-[#0c0d10] border-transparent font-bold py-4 w-full uppercase text-[9px] tracking-widest rounded-none hover:bg-accent-glow">
                      Schedule Site Visit
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
            <div className="bg-[#0a0c10] border border-white/5 shadow-2xl relative">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent/40" />

              <div className="flex border-b border-white/5 overflow-x-auto bg-[#0d0f14]/50 scrollbar-none">
                {[
                  { id: 'overview', label: t('detail.overview'), icon: Home },
                  { id: 'features', label: t('detail.features'), icon: CheckCircle },
                  { id: 'floor', label: t('detail.floorPlan'), icon: FileText },
                  { id: 'tour3d', label: t('detail.3dTour'), icon: Compass }
                ].map((tItem) => (
                  <button
                    key={tItem.id}
                    onClick={() => setActiveTab(tItem.id)}
                    className={`flex items-center gap-2 px-6 py-2 font-mono text-[12px] uppercase tracking-widest border-b-2 whitespace-nowrap transition-all duration-300 ${activeTab === tItem.id
                      ? 'border-accent text-accent bg-[#0a0c10] font-bold'
                      : 'border-transparent text-white/50 hover:text-white hover:bg-white/5'
                      }`}
                  >
                    <tItem.icon size={12} className="text-accent" />
                    {tItem.label}
                  </button>
                ))}
              </div>

              <div className="p-6 md:p-8">
                {/* Tab: Overview */}
                {activeTab === 'overview' && (
                  <div className="space-y-8 animate-fade-in">
                    <div>
                      <h3 className="text-lg font-display font-medium text-white mb-4 flex items-center gap-2">
                        <span className="w-1 h-5 bg-accent block" />
                        {t('detail.descTitle')}
                      </h3>
                      <p className="text-xs text-white/60 leading-relaxed bg-[#0d0f14]/40 p-5 border border-white/5 font-light">
                        {displayDesc}
                      </p>
                    </div>

                    {/* Specs Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-[#0d0f14]/60 border border-white/5 p-4 text-left relative">
                        <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-accent/40" />
                        <span className="text-[8px] text-accent uppercase font-mono tracking-wider block mb-1">
                          {t('detail.type')}
                        </span>
                        <span className="font-display font-medium text-white text-xs block">{displaySpecs.type}</span>
                      </div>
                      <div className="bg-[#0d0f14]/60 border border-white/5 p-4 text-left relative">
                        <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-accent/40" />
                        <span className="text-[8px] text-accent uppercase font-mono tracking-wider block mb-1">
                          {t('detail.possession')}
                        </span>
                        <span className="font-display font-medium text-white text-xs block">{displaySpecs.possession}</span>
                      </div>
                      <div className="bg-[#0d0f14]/60 border border-white/5 p-4 text-left relative">
                        <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-accent/40" />
                        <span className="text-[8px] text-accent uppercase font-mono tracking-wider block mb-1">
                          {t('detail.facing')}
                        </span>
                        <span className="font-display font-medium text-white text-xs block">{displaySpecs.facing}</span>
                      </div>
                      <div className="bg-[#0d0f14]/60 border border-white/5 p-4 text-left relative">
                        <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-accent/40" />
                        <span className="text-[8px] text-accent uppercase font-mono tracking-wider block mb-1">
                          {t('detail.sizeOptions')}
                        </span>
                        <span className="font-mono text-white text-[9px] mt-0.5 block line-clamp-1">
                          {property.specs.sizes.join(', ')}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab: Features */}
                {activeTab === 'features' && (
                  <div className="animate-fade-in">
                    <h3 className="text-lg font-display font-medium text-white mb-6 flex items-center gap-2">
                      <span className="w-1 h-5 bg-accent block" />
                      Amenities & Key Provisions
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {displayFeatures.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-3.5 p-4 bg-[#0d0f14]/40 border border-white/5">
                          <CheckCircle className="text-accent flex-shrink-0" size={14} />
                          <span className="text-xs font-light tracking-wide text-white/80">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab: Floor Plans */}
                {activeTab === 'floor' && (
                  <div className="space-y-6 animate-fade-in">
                    <h3 className="text-lg font-display font-medium text-white mb-4 flex items-center gap-2">
                      <span className="w-1 h-5 bg-accent block" />
                      Architectural Floor & Layout Plans
                    </h3>
                    <p className="text-xs text-white/55 leading-relaxed font-light mb-4">
                      Carefully engineered space configuration utilizing maximum thermal insulation, solar access, and functional airflow pathways.
                    </p>
                    <div className="bg-[#0d0f14] border border-white/5 overflow-hidden max-w-lg mx-auto relative group shadow-2xl">
                      <img
                        src="https://images.unsplash.com/photo-1545464693-f1798a373343?w=800&h=600&fit=crop"
                        alt="Premium Layout Floor Plan"
                        className="w-full h-auto opacity-70 group-hover:scale-102 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white text-[9px] font-mono uppercase tracking-widest bg-[#0c0d10] border border-white/10 py-3 px-5 shadow-lg flex items-center gap-2">
                          <Maximize2 size={10} className="text-accent" /> Click to Expand Blueprint
                        </span>
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
                        <h3 className="text-lg font-display font-medium text-white mb-2 flex items-center gap-2">
                          <span className="w-1 h-5 bg-accent block" />
                          Interactive 360° Virtual Walkthrough
                        </h3>
                        <p className="text-xs text-white/55 leading-relaxed font-light">
                          Teleport directly into the site with our virtual 3D panorama scanner. Rotate 360 degrees and visually explore architectural demarcations.
                        </p>
                      </div>
                      
                      {isTourActive && (
                        <div className="flex gap-2">
                          <Button
                            onClick={() => setIsTourFullscreen(true)}
                            className="bg-accent hover:bg-accent-glow text-[#0c0d10] font-bold py-2 px-4 rounded-none font-mono text-[9px] uppercase tracking-widest"
                          >
                            Launch Fullscreen Portal
                          </Button>
                          <Button
                            onClick={() => {
                              setIsTourActive(false);
                              setIsTourFullscreen(false);
                            }}
                            className="bg-[#0d0f14] border border-white/10 hover:border-red-500/20 hover:text-red-400 text-white/60 py-2 px-4 rounded-none font-mono text-[9px] uppercase tracking-widest"
                          >
                            Reset Link
                          </Button>
                        </div>
                      )}
                    </div>
                    
                    {/* The VR Tour Portal Viewport */}
                    <div className="relative border border-white/5 overflow-hidden shadow-2xl h-[400px] w-full bg-[#090a0d]">
                      {!isTourActive ? (
                        /* Pre-activation cover screen */
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                          <img
                            src={property.images?.[1] || property.images?.[0]}
                            alt="3D Space panorama preview"
                            className="absolute inset-0 w-full h-full object-cover opacity-25 blur-[1px]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#090a0d] via-transparent to-black/30" />
                          <div className="relative z-10 max-w-sm">
                            <div className="w-14 h-14 rounded-full bg-accent/10 border border-accent text-accent flex items-center justify-center mx-auto mb-4 shadow-[0_0_25px_rgba(223,186,72,0.15)]">
                              <Compass size={24} className="animate-pulse" />
                            </div>
                            <h4 className="font-display font-medium text-white text-base mb-2">
                              3D Reality Scanner Ready
                            </h4>
                            <p className="text-[11px] text-white/50 mb-6 leading-relaxed font-light">
                              Establish a remote 360° telemetry connection directly into the site grounds. Fully compatible with mobile, iPad, and VR headsets.
                            </p>
                            <Button
                              onClick={handleLaunchTour}
                              className="bg-accent hover:bg-accent-glow text-[#0c0d10] font-bold py-3.5 px-8 rounded-none font-mono text-[9px] uppercase tracking-widest shadow-glow"
                            >
                              Launch 360° Walkthrough
                            </Button>
                          </div>
                        </div>
                      ) : isTourLoading ? (
                        /* Glowing Cyberpunk Telemetry Loading State */
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0c0d10] z-30">
                          <div className="w-64 max-w-xs space-y-4 text-center">
                            <Compass className="w-8 h-8 text-accent animate-spin mx-auto mb-2" />
                            <div className="text-[10px] font-mono tracking-widest text-accent uppercase animate-pulse">
                              ESTABLISHING VR LINK...
                            </div>
                            <div className="h-[2px] w-full bg-white/5 overflow-hidden">
                              <div className="h-full bg-accent animate-loading-bar" style={{ width: '100%' }} />
                            </div>
                            <div className="text-[8px] font-mono text-white/40 uppercase space-y-1">
                              <div>SECTOR_ID: {property.id}</div>
                              <div>LAT_LNG: {property.coordinates.join(', ')}</div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* Interactive 3D Iframe Viewer */
                        <div className="relative w-full h-full flex flex-col">
                          {/* Live Scan indicator */}
                          <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-[#0c0d10]/80 backdrop-blur-md px-3 py-1.5 border border-emerald-500/30 text-[9px] font-mono text-emerald-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            LIVE SPATIAL GRID LINK ACTIVE
                          </div>
                          
                          <iframe
                            src={`${property.virtualTourUrl || 'https://kuula.co/share/collection/7YyWz'}`}
                            className="w-full h-full border-none bg-black flex-1"
                            allow="xr-spatial-tracking; gyroscope; accelerometer; fullscreen"
                            title="Interactive 3D Virtual Tour"
                          />

                          {/* Room Hotspots Selectors (Mock Teleportation Buttons) */}
                          <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap gap-2 pointer-events-auto justify-start">
                            <span className="text-[8px] font-mono text-white/50 flex items-center bg-[#0c0d10]/95 border border-white/5 px-2 py-1 select-none">
                              TELEPORT DOCK:
                            </span>
                            {[
                              { id: 'main', label: 'Main Area' },
                              { id: 'approach', label: 'Approach View' },
                              { id: 'surroundings', label: 'Forest Perimeter' }
                            ].map((hs) => (
                              <button
                                key={hs.id}
                                onClick={() => {
                                  setTourHotspot(hs.id);
                                  setIsTourLoading(true);
                                  setTimeout(() => setIsTourLoading(false), 900);
                                }}
                                className={`px-2 py-1 text-[8px] font-mono uppercase tracking-wider border transition-all ${
                                  tourHotspot === hs.id 
                                    ? 'bg-accent text-[#0c0d10] border-accent font-bold' 
                                    : 'bg-[#0c0d10]/90 text-white/70 border-white/10 hover:border-accent hover:text-white'
                                }`}
                              >
                                {hs.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Contact, Download Brochure & Info Panel (Right) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-[160px]">

            {/* Download brochure panel */}
            <div className="bg-[#0a0c10] border border-white/5 p-6 md:p-8 shadow-2xl relative">
              <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-accent/40" />
              <h3 className="font-display font-medium text-base text-white mb-4 flex items-center gap-2">
                <FileText className="text-accent" size={16} />
                {t('detail.brochure')}
              </h3>
              <p className="text-xs text-white/50 leading-relaxed mb-6 font-light">
                Receive the complete architectural prospectus, including fine-grained blueprints, soil testing results, layout plans, and full pricing matrices.
              </p>
              <Button
                onClick={() => setIsBrochureOpen(true)}
                className="w-full bg-[#0d0f14] border border-white/10 hover:bg-accent hover:text-[#0c0d10] text-white font-bold py-3.5 flex items-center justify-center gap-2 rounded-none font-mono text-[12px] tracking-widest uppercase hover:border-transparent transition-all"
              >
                <Download size={12} />
                Get PDF Brochure
              </Button>
            </div>

            {/* Direct Dial / Action list */}
            <div className="bg-[#0a0c10] border border-white/5 p-6 md:p-8 shadow-2xl relative">
              <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-accent/40" />
              <h3 className="font-display font-medium text-base text-white mb-6">
                {t('detail.highlights')}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-[#0d0f14]/50 border border-white/5">
                  <Phone className="text-accent mr-3.5 flex-shrink-0" size={14} />
                  <div>
                    <span className="text-[8px] text-white/40 font-mono tracking-wider uppercase block">DIRECT PHONE</span>
                    <span className="text-xs font-bold text-white tracking-wide">{property.contact}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <Link to="/contact">
                    <Button className="w-full text-[9px] font-mono uppercase tracking-widest py-3 border border-white/10 text-white rounded-none hover:bg-white/5" variant="outline">
                      {t('detail.sendMessage')}
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button className="w-full btn-luxury-gold bg-accent text-[#0c0d10] text-[9px] font-mono uppercase tracking-widest py-3.5 rounded-none font-bold hover:bg-accent-glow shadow-md">
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
        <div className="fixed inset-0 bg-[#0c0d10]/95 flex items-center justify-center z-50 animate-fade-in backdrop-blur-sm">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            {/* Close */}
            <button
              className="absolute top-6 right-6 text-white/60 hover:text-accent bg-black/40 hover:bg-[#0c0d10] border border-white/10 p-3 z-10 transition-all"
              onClick={() => setIsGalleryOpen(false)}
            >
              <X size={20} />
            </button>

            {/* Navigation */}
            {property.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white hover:text-black bg-[#0c0d10]/60 hover:bg-accent border border-white/10 p-4 transition-all z-10"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white hover:text-black bg-[#0c0d10]/60 hover:bg-accent border border-white/10 p-4 transition-all z-10"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}

            {/* Zoom Image */}
            <img
              src={property.images[currentImageIndex]}
              alt={`Expanded property image ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain border border-white/5 shadow-2xl"
              onError={(e: any) => {
                e.target.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop';
              }}
            />

            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-[#0c0d10] border border-white/10 text-white px-5 py-2 font-mono text-xs">
              {currentImageIndex + 1} / {property.images.length}
            </div>
          </div>
        </div>
      )}

      {/* Brochure Prospectus Download Modal Dialog */}
      <Dialog open={isBrochureOpen} onOpenChange={setIsBrochureOpen}>
        <DialogContent className="max-w-md bg-[#0a0c10] border border-white/10 rounded-none shadow-2xl p-6 outline-none text-white relative">
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent/40" />

          <DialogHeader className="border-b border-white/5 pb-4 mb-4">
            <DialogTitle className="text-lg font-display font-medium text-white flex items-center gap-2">
              <Award className="text-accent animate-pulse" size={18} />
              {t('detail.brochureDownload')}
            </DialogTitle>
            <DialogDescription className="text-[10px] text-white/40 mt-1 uppercase font-mono tracking-wider">
              Securely authenticate to retrieve the luxury prospectus.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <p className="text-xs text-white/60 leading-relaxed font-light">
              {t('detail.brochureText')} By downloading, your interest is logged in our corporate pipeline to coordinate priority site allocations.
            </p>

            <div className="bg-[#0d0f14] p-4 border border-white/5 text-[9px] font-mono tracking-wide uppercase space-y-1 text-white/60">
              <div><span className="text-accent/60 mr-1.5">File:</span> Kinash_Prospectus_{property.slug}.pdf</div>
              <div><span className="text-accent/60 mr-1.5">Size:</span> 14.8 MB</div>
              <div><span className="text-accent/60 mr-1.5">Format:</span> Print Ready vector layers</div>
            </div>

            <Button
              onClick={handleDownloadBrochure}
              disabled={downloadingBrochure}
              className="w-full btn-luxury-gold bg-accent text-[#0c0d10] border-transparent font-bold py-3.5 rounded-none flex items-center justify-center gap-2 uppercase tracking-widest font-mono text-[9px] hover:bg-accent-glow"
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
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}