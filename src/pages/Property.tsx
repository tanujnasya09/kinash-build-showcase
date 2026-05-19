import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  MapPin, CheckCircle, Phone, X, Share2, Heart, Eye, Calendar, Home, Bed, 
  Bath, Car, ArrowLeft, Play, Camera, ChevronLeft, ChevronRight, Maximize2, 
  FileText, Download, Compass, ShieldAlert, Award, Sparkles 
} from "lucide-react";
import { useProperties } from "@/context/PropertyContext";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEO/SEOHead";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

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

  if (!property) {
    return (
      <div className="container py-32 text-center">
        <h1 className="text-3xl font-bold text-red-500">Property Not Found</h1>
        <Link to="/properties" className="text-accent font-semibold mt-4 block hover:underline">
          Return to Properties
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
      // Simulate real PDF prospectus downloading
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
    <section className="min-h-screen bg-gradient-to-b from-background to-muted/20 pt-28 pb-16">
      <SEOHead
        title={displayTitle}
        description={displayDesc}
        keywords={`${displayTitle}, property dehradun, kinash listings`}
        canonical={`/property/${property.slug}`}
      />

      {/* Detail Navbar sticky header */}
      <div className="bg-white border-b sticky top-[72px] z-30 shadow-soft backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/properties"
              className="flex items-center text-primary hover:text-accent font-bold transition-colors text-sm"
            >
              <ArrowLeft size={16} className="mr-2" />
              {t('detail.back')}
            </Link>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-3 rounded-xl border transition-all duration-300 ${isLiked
                  ? 'bg-red-50 text-red-500 scale-105 border-red-200'
                  : 'bg-white hover:bg-muted text-muted-foreground'
                }`}
              >
                <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
              </button>
              <button className="p-3 rounded-xl border bg-white hover:bg-muted text-muted-foreground transition-all">
                <Share2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8">
        
        {/* Title Block Header */}
        <div className="bg-white border border-border rounded-3xl p-6 md:p-8 shadow-soft mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div>
              <span className={`inline-block px-3.5 py-1.5 rounded-full text-xs font-bold mb-3 ${
                property.status.toLowerCase().includes("sold")
                  ? "bg-red-100 text-red-600 border border-red-200"
                  : "bg-green-100 text-green-600 border border-green-200"
              }`}>
                {property.status}
              </span>
              <h1 className="text-3xl md:text-4xl font-display font-extrabold text-primary mb-3">
                {displayTitle}
              </h1>
              <div className="flex items-center text-muted-foreground">
                <MapPin size={18} className="mr-2 text-accent flex-shrink-0" />
                <span className="text-base md:text-lg">{displayLocation}</span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary to-primary-glow text-white p-6 rounded-2xl border flex flex-col items-center lg:items-end justify-center min-w-[200px]">
              <span className="text-xs uppercase tracking-widest text-accent font-semibold mb-1">
                {language === 'en' ? 'Premium Valuation' : 'Valuación Premium'}
              </span>
              <span className="text-2xl md:text-3xl font-display font-black text-white">{property.price}</span>
              <span className="text-2xs text-white/60 font-medium mt-1">Immediate Demarcation Included</span>
            </div>
          </div>
        </div>

        {/* Media Split Layout: Image Slider and Walkthrough Video */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          
          {/* Main Visual Slider (Left column) */}
          <div className="lg:col-span-7 space-y-4">
            {hasImages && (
              <div className="relative rounded-3xl overflow-hidden shadow-elegant bg-slate-900 group">
                <div className="aspect-video relative flex items-center justify-center">
                  <img
                    src={property.images[currentImageIndex]}
                    alt={`Property image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    onError={(e: any) => {
                      e.target.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop';
                    }}
                  />

                  {/* Navigation Arrows */}
                  {property.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-accent text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-accent text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </>
                  )}

                  {/* Top Bar Indicators */}
                  <div className="absolute top-4 left-4 bg-primary/80 backdrop-blur-sm text-white px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center shadow-lg gap-1.5">
                    <Camera size={12} className="text-accent" />
                    {t('detail.gallery')}
                  </div>

                  <button
                    onClick={() => setIsGalleryOpen(true)}
                    className="absolute top-4 right-4 bg-black/65 hover:bg-black text-white p-2 rounded-full shadow-lg transition-all"
                  >
                    <Maximize2 size={16} />
                  </button>

                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-bold">
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
                    className={`relative flex-shrink-0 w-24 h-16 rounded-xl overflow-hidden transition-all duration-300 ${
                      currentImageIndex === idx
                        ? 'ring-2 ring-accent scale-102 opacity-100'
                        : 'opacity-60 hover:opacity-100'
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
              <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-elegant h-full flex flex-col border border-slate-800">
                <div className="p-4 bg-slate-950 border-b border-white/5 flex items-center justify-between text-white text-xs font-bold">
                  <span className="flex items-center gap-1.5 uppercase font-display tracking-widest text-red-500">
                    <Play size={14} className="fill-red-500" />
                    {t('detail.tour')}
                  </span>
                  <span className="text-slate-400 font-mono">4K ULTRA HD</span>
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
              <div className="bg-primary text-white rounded-3xl p-8 shadow-elegant h-full flex flex-col justify-center relative overflow-hidden border border-border">
                <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-accent/15 rounded-full blur-3xl" />
                <Play className="text-accent mb-4 animate-pulse" size={44} />
                <h3 className="text-2xl font-display font-extrabold text-white mb-2">
                  Signature Guided Tour
                </h3>
                <p className="text-sm text-white/70 leading-relaxed mb-6 font-light">
                  A high-definition cinematic and aerial walkthrough is currently being produced for this masterpiece. Inquire with our Dehradun registry to schedule a private, in-person site walk.
                </p>
                <Link to="/contact">
                  <Button className="bg-accent hover:bg-accent-glow text-primary font-bold rounded-xl py-3 w-full">
                    Schedule Site Visit
                  </Button>
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
            <div className="bg-white border rounded-3xl shadow-soft overflow-hidden">
              <div className="flex border-b overflow-x-auto bg-muted/20">
                {[
                  { id: 'overview', label: t('detail.overview'), icon: Home },
                  { id: 'features', label: t('detail.features'), icon: CheckCircle },
                  { id: 'floor', label: t('detail.floorPlan'), icon: FileText },
                  { id: 'tour3d', label: t('detail.3dTour'), icon: Compass }
                ].map((tItem) => (
                  <button
                    key={tItem.id}
                    onClick={() => setActiveTab(tItem.id)}
                    className={`flex items-center gap-2 px-6 py-4 font-bold border-b-2 whitespace-nowrap text-sm transition-all duration-300 ${
                      activeTab === tItem.id
                        ? 'border-accent text-accent bg-white'
                        : 'border-transparent text-muted-foreground hover:text-primary hover:bg-muted/10'
                    }`}
                  >
                    <tItem.icon size={16} />
                    {tItem.label}
                  </button>
                ))}
              </div>

              <div className="p-6 md:p-8">
                {/* Tab: Overview */}
                {activeTab === 'overview' && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-display font-bold text-primary mb-4 flex items-center gap-2">
                        <span className="w-1.5 h-6 bg-accent rounded-full block" />
                        {t('detail.descTitle')}
                      </h3>
                      <p className="text-base text-muted-foreground leading-relaxed bg-muted/10 p-5 rounded-2xl border border-dashed border-border/70">
                        {displayDesc}
                      </p>
                    </div>

                    {/* Specs Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-muted/30 border p-4 rounded-2xl text-center shadow-soft">
                        <Home className="mx-auto mb-2 text-accent" size={20} />
                        <span className="text-[10px] text-muted-foreground font-semibold block uppercase">
                          {t('detail.type')}
                        </span>
                        <span className="font-bold text-primary text-sm mt-0.5 block">{displaySpecs.type}</span>
                      </div>
                      <div className="bg-muted/30 border p-4 rounded-2xl text-center shadow-soft">
                        <Calendar className="mx-auto mb-2 text-accent" size={20} />
                        <span className="text-[10px] text-muted-foreground font-semibold block uppercase">
                          {t('detail.possession')}
                        </span>
                        <span className="font-bold text-primary text-sm mt-0.5 block">{displaySpecs.possession}</span>
                      </div>
                      <div className="bg-muted/30 border p-4 rounded-2xl text-center shadow-soft">
                        <Compass className="mx-auto mb-2 text-accent" size={20} />
                        <span className="text-[10px] text-muted-foreground font-semibold block uppercase">
                          {t('detail.facing')}
                        </span>
                        <span className="font-bold text-primary text-sm mt-0.5 block">{displaySpecs.facing}</span>
                      </div>
                      <div className="bg-muted/30 border p-4 rounded-2xl text-center shadow-soft">
                        <Sparkles className="mx-auto mb-2 text-accent" size={20} />
                        <span className="text-[10px] text-muted-foreground font-semibold block uppercase">
                          {t('detail.sizeOptions')}
                        </span>
                        <span className="font-bold text-primary text-xs mt-1 block">
                          {property.specs.sizes.join(', ')}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab: Features */}
                {activeTab === 'features' && (
                  <div>
                    <h3 className="text-xl font-display font-bold text-primary mb-6 flex items-center gap-2">
                      <span className="w-1.5 h-6 bg-accent rounded-full block" />
                      Amenities & Key Provisions
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {displayFeatures.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-4 bg-muted/20 border rounded-2xl hover:shadow-soft transition-all">
                          <CheckCircle className="text-green-500 flex-shrink-0" size={18} />
                          <span className="text-sm font-semibold text-primary">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab: Floor Plans */}
                {activeTab === 'floor' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-display font-bold text-primary mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-6 bg-accent rounded-full block" />
                      Architectural Floor & Layout Plans
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      Carefully engineered space configuration utilizing maximum thermal insulation, solar access, and functional airflow pathways.
                    </p>
                    <div className="bg-slate-900 rounded-2xl overflow-hidden border max-w-lg mx-auto relative group shadow-elegant">
                      <img
                        src="https://images.unsplash.com/photo-1545464693-f1798a373343?w=800&h=600&fit=crop"
                        alt="Premium Layout Floor Plan"
                        className="w-full h-auto opacity-80"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white text-xs font-bold uppercase tracking-wider bg-primary/80 py-2 px-4 rounded-full border shadow-lg flex items-center gap-2">
                          <Maximize2 size={12} /> Click to Expand Blueprint
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab: 3D Tour */}
                {activeTab === 'tour3d' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-display font-bold text-primary mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-6 bg-accent rounded-full block" />
                      Interactive 360° Virtual Walkthrough
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed font-light">
                      Teleport directly into the site with our virtual 3D panorama scanner. Rotate 360 degrees and visually explore architectural demarcations.
                    </p>
                    
                    {/* Visual 3D Tour Portal */}
                    <div className="relative rounded-3xl overflow-hidden border shadow-elegant h-[350px] bg-slate-950 flex items-center justify-center">
                      <img
                        src="https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=1200&h=600&fit=crop"
                        alt="3D Space panorama preview"
                        className="absolute inset-0 w-full h-full object-cover opacity-50 blur-[1px]"
                      />
                      <div className="relative z-10 text-center max-w-sm px-6">
                        <div className="w-16 h-16 rounded-full bg-accent/20 border-2 border-accent text-accent flex items-center justify-center mx-auto mb-4 animate-bounce">
                          <Compass size={32} />
                        </div>
                        <h4 className="font-display font-bold text-white text-lg mb-2">
                          Interactive 360° Portal Ready
                        </h4>
                        <p className="text-xs text-white/70 mb-6">
                          Explore high-resolution spatial virtual walkthrough coordinates. Fully optimized for iPad, VR headsets, and desktop viewers.
                        </p>
                        <Button
                          onClick={() => window.open(property.virtualTourUrl || '#', '_blank')}
                          className="bg-accent hover:bg-accent-glow text-primary font-bold rounded-xl px-6"
                        >
                          Launch 360° VR Tour
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Contact, Download Brochure & Info Panel (Right) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-[160px]">
            
            {/* Download brochure panel */}
            <div className="bg-white border border-border rounded-3xl p-6 md:p-8 shadow-soft">
              <h3 className="font-display font-bold text-lg text-primary mb-4 flex items-center gap-2">
                <FileText className="text-accent" size={20} />
                {t('detail.brochure')}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                Receive the complete architectural prospectus, including fine-grained blueprints, soil testing results, layout plans, and full pricing matrices.
              </p>
              <Button
                onClick={() => setIsBrochureOpen(true)}
                className="w-full bg-primary hover:bg-primary-glow text-white font-bold rounded-xl py-3 flex items-center justify-center gap-2 shadow-soft"
              >
                <Download size={16} />
                Get PDF Brochure
              </Button>
            </div>

            {/* Direct Dial / Action list */}
            <div className="bg-white border border-border rounded-3xl p-6 md:p-8 shadow-soft">
              <h3 className="font-display font-bold text-lg text-primary mb-6">
                {t('detail.highlights')}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-muted/40 rounded-xl border border-dashed border-border/80">
                  <Phone className="text-accent mr-3" size={16} />
                  <div>
                    <span className="text-[10px] text-muted-foreground font-semibold block">DIRECT PHONE</span>
                    <span className="text-xs font-bold text-primary">{property.contact}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Link to="/contact">
                    <Button className="w-full text-xs py-2.5 rounded-xl font-bold" variant="outline">
                      {t('detail.sendMessage')}
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button className="w-full bg-primary hover:bg-primary-glow text-white text-xs py-2.5 rounded-xl font-bold shadow-soft">
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
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 animate-fade-in">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            {/* Close */}
            <button
              className="absolute top-6 right-6 text-white hover:text-accent bg-black/50 rounded-full p-3 z-10 transition-all"
              onClick={() => setIsGalleryOpen(false)}
            >
              <X size={24} />
            </button>

            {/* Navigation */}
            {property.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white hover:text-accent bg-black/50 rounded-full p-4 transition-all z-10"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white hover:text-accent bg-black/50 rounded-full p-4 transition-all z-10"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {/* Zoom Image */}
            <img
              src={property.images[currentImageIndex]}
              alt={`Expanded property image ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onError={(e: any) => {
                e.target.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop';
              }}
            />

            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-5 py-2 rounded-full font-bold text-sm">
              {currentImageIndex + 1} / {property.images.length}
            </div>
          </div>
        </div>
      )}

      {/* Brochure Prospectus Download Modal Dialog */}
      <Dialog open={isBrochureOpen} onOpenChange={setIsBrochureOpen}>
        <DialogContent className="max-w-md bg-white rounded-3xl border shadow-elegant p-6 outline-none">
          <DialogHeader className="border-b pb-4 mb-4">
            <DialogTitle className="text-xl font-display font-extrabold text-primary flex items-center gap-2">
              <Award className="text-accent animate-pulse" />
              {t('detail.brochureDownload')}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground mt-1">
              Securely authenticate to retrieve the luxury prospectus.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t('detail.brochureText')} By downloading, your interest is logged in our corporate pipeline to coordinate priority site allocations.
            </p>
            
            <div className="bg-muted/40 p-4 rounded-xl border border-dashed text-2xs space-y-1 text-primary">
              <div><span className="font-bold text-muted-foreground uppercase">File:</span> Kinash_Prospectus_{property.slug}.pdf</div>
              <div><span className="font-bold text-muted-foreground uppercase">Size:</span> 14.8 MB</div>
              <div><span className="font-bold text-muted-foreground uppercase">Format:</span> Print Ready vector layers</div>
            </div>

            <Button
              onClick={handleDownloadBrochure}
              disabled={downloadingBrochure}
              className="w-full bg-primary hover:bg-primary-glow text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-soft"
            >
              {downloadingBrochure ? (
                <>
                  <RefreshCw className="animate-spin" size={16} />
                  Preparing portfolio dossier...
                </>
              ) : (
                <>
                  <Download size={16} />
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