'use client';

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Search, Filter, Home, Sparkles, Map, LayoutGrid, CheckCircle2 } from "lucide-react";
import { useProperties } from "@/context/PropertyContext";
import { useLanguage } from "@/context/LanguageContext";
import SEOHead from "@/components/SEO/SEOHead";

const InteractiveMap = dynamic(() => import("@/components/Map/InteractiveMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[500px] flex items-center justify-center bg-[#0c0d10] border border-border">
      <span className="w-8 h-8 border border-accent/30 border-t-accent rounded-full animate-spin" />
    </div>
  ),
});
import PropertyCard from "@/components/ui/PropertyCard";
import { formatCompact, parseAmount } from "@/lib/currency";
import gsap from "gsap";
import ArchitecturalGrid from "@/components/ui/ArchitecturalGrid";
import siteConfig from "@/config/site";

export default function AllProperties() {
  const { properties } = useProperties();
  const { t, language, currency, content } = useLanguage();
  const copy = content.properties;
  const [searchParams] = useSearchParams();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [projectType, setProjectType] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [maxPrice, setMaxPrice] = useState(100000000);
  const [showFilters, setShowFilters] = useState(false);
  const [activePropertyId, setActivePropertyId] = useState<number | null>(null);
  const [mobileView, setMobileView] = useState<'list' | 'map'>('list');

  const gridRef = useRef<HTMLDivElement>(null);

  // Read URL search params on mount
  useEffect(() => {
    const searchVal = searchParams.get("search");
    const locationVal = searchParams.get("location");
    if (searchVal) setSearch(searchVal);
    if (locationVal) setLocationFilter(locationVal.toLowerCase());
  }, [searchParams]);

  // Entrance animations for listings
  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.property-card-wrapper');
      gsap.fromTo(cards,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out' }
      );
    }
  }, [search, status, projectType, locationFilter, maxPrice]);

  // Extract unique locations dynamically from properties
  const availableLocations = Array.from(
    new Set(properties.map((p) => p.location.split(',')[0].trim()))
  );

  // Filter logic
  const filtered = properties.filter((p) => {
    const priceNum = parseAmount(p.price);

    const titleVal = (language === 'en' ? p.title : p.translations?.[language]?.title || p.title).toLowerCase();
    const locationVal = (language === 'en' ? p.location : p.translations?.[language]?.location || p.location).toLowerCase();
    const descriptionVal = (language === 'en' ? p.description : p.translations?.[language]?.description || p.description).toLowerCase();

    const matchesSearch =
      titleVal.includes(search.toLowerCase()) ||
      locationVal.includes(search.toLowerCase()) ||
      descriptionVal.includes(search.toLowerCase());

    const matchesStatus =
      !status ||
      status === "all" ||
      p.status.toLowerCase().includes(status.toLowerCase());

    const matchesType =
      !projectType ||
      projectType === "all" ||
      p.specs.type.toLowerCase().includes(projectType.toLowerCase());

    const matchesLocation =
      !locationFilter ||
      locationFilter === "all" ||
      p.location.toLowerCase().includes(locationFilter.toLowerCase());

    const matchesPrice = priceNum <= maxPrice;

    return matchesSearch && matchesStatus && matchesType && matchesLocation && matchesPrice;
  });

  const clearFilters = () => {
    setSearch("");
    setStatus("all");
    setProjectType("all");
    setLocationFilter("all");
    setMaxPrice(100000000);
  };

  const statusOptions = [
    { label: t('properties.filter.all'), value: "all" },
    { label: t('properties.filter.available'), value: "available" },
    { label: t('properties.filter.underConstruction'), value: "under construction" },
    { label: t('properties.filter.completed'), value: "completed" },
  ];

  return (
    <div className="min-h-screen bg-[#f8f7f4] dark:bg-[#0c0d10] text-foreground dark:text-white pb-16 relative overflow-x-clip">
      <SEOHead
        title={copy.meta.title}
        description={copy.meta.description}
        keywords={copy.meta.keywords}
        canonical="/properties"
      />

      {/* Architectural Drafting Blueprint Grid */}
      <ArchitecturalGrid columns={5} />

      {/* Hero Section with Cinematic Background Photography */}
      <section className="relative pt-24 sm:pt-28 pb-10 sm:pb-14 lg:pb-16 overflow-hidden border-b border-black/10 dark:border-white/5">
        <div 
          className="hero-bg-image absolute inset-0 bg-cover bg-center opacity-85 md:opacity-90"
          style={{ backgroundImage: `url('${siteConfig.images.propertiesHero.url}')` }}
        />
        {/* Left Veil: High contrast readable text */}
        <div className="hero-gradient-overlay absolute inset-0 bg-gradient-to-r from-[#f8f7f4] via-[#f8f7f4]/98 sm:via-[#f8f7f4]/90 to-[#f8f7f4]/40 lg:to-transparent dark:from-[#0c0d10] dark:via-[#0c0d10]/98 sm:dark:via-[#0c0d10]/90 dark:to-[#0c0d10]/40 lg:dark:to-transparent" />
        
        <div className="relative z-10 container mx-auto px-4 md:px-8">
          <div className="max-w-3xl text-left">
            {/* Architectural Eyebrow with Accent Line */}
            <div className="inline-flex items-center gap-3 mb-3 sm:mb-4">
              <span className="w-8 h-[2px] bg-accent inline-block" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-accent font-mono font-bold">
                {t('properties.title') || "VERIFIED PORTFOLIO"}
              </span>
            </div>

            {/* Title with Italic Accent */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-medium text-foreground dark:text-white mb-3 sm:mb-4 leading-[1.1] sm:leading-none">
              <span className="block">{copy.headline}</span>
              <span className="block text-accent italic font-light">{copy.headlineAccent}</span>
            </h1>

            {/* Clear Communicative Intro */}
            <p className="text-xs sm:text-sm text-foreground/80 dark:text-white/70 mb-5 sm:mb-6 leading-relaxed max-w-xl font-light">
              {copy.intro}
            </p>

            {/* Division Metric Indicators */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-6 pt-5 border-t border-black/10 dark:border-white/10 text-xs text-foreground/80 dark:text-white/70 font-mono">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-accent" />
                <span><strong className="text-foreground dark:text-white font-bold">{properties.length}</strong> Curated Assets</span>
              </div>
              <div className="hidden sm:block w-[1px] h-3 bg-black/15 dark:bg-white/15" />
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-accent" />
                <span><strong className="text-foreground dark:text-white font-bold">100%</strong> Registry Verified</span>
              </div>
              <div className="hidden sm:block w-[1px] h-3 bg-black/15 dark:bg-white/15" />
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-accent" />
                <span><strong className="text-accent font-bold">Zero-Risk</strong> Clear Titles</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Listings Section */}
      <section className="py-10 sm:py-14 relative z-10 bg-transparent">
        <div className="container mx-auto px-4 md:px-8">

        {/* Search & Filter Command Center */}
        <div className="bg-white/95 dark:bg-[#0a0c10]/90 border border-black/10 dark:border-white/10 shadow-xl dark:shadow-2xl mb-10 backdrop-blur-md relative">
          <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-accent" />
          <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-accent" />
          <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-accent" />
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-accent" />

          {/* Search Input Bar + Quick Status Pills */}
          <div className="p-4 sm:p-6 border-b border-black/10 dark:border-white/10 bg-[#f8f7f4] dark:bg-[#0d0f14]/80 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-accent/70" size={16} />
              <Input
                placeholder={t('properties.searchPlaceholder')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12 pr-4 py-5 text-xs border border-black/10 dark:border-white/10 rounded-none bg-white dark:bg-[#0c0d10] text-foreground dark:text-white placeholder:text-foreground/45 dark:placeholder:text-white/40 focus:border-accent focus:ring-0 focus:outline-none"
              />
            </div>

            {/* Quick Status Chips — Desktop */}
            <div className="hidden lg:flex items-center gap-2">
              {statusOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setStatus(opt.value)}
                  className={`px-3 py-2 text-[10px] font-mono uppercase tracking-wider transition-all duration-200 border ${
                    status === opt.value
                      ? "bg-accent text-[#0c0d10] border-accent font-bold shadow-[0_0_15px_rgba(223,186,72,0.3)]"
                      : "bg-white dark:bg-white/5 text-foreground/75 dark:text-white/70 border-black/10 dark:border-white/10 hover:border-accent/40 hover:text-foreground dark:hover:text-white"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Quick Status Chips — Mobile Swipe Bar */}
            <div className="relative lg:hidden -mx-1 px-1">
              <div className="flex overflow-x-auto gap-2 no-scrollbar scrollbar-none scroll-smooth pb-1 pr-6">
                {statusOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setStatus(opt.value)}
                    className={`px-3 py-2 text-[9px] font-mono uppercase tracking-wider whitespace-nowrap transition-all duration-200 border flex-shrink-0 ${
                      status === opt.value
                        ? "bg-accent text-[#0c0d10] border-accent font-bold shadow-[0_0_15px_rgba(223,186,72,0.3)]"
                        : "bg-white dark:bg-white/5 text-foreground/75 dark:text-white/70 border-black/10 dark:border-white/10 hover:border-accent/40 hover:text-foreground dark:hover:text-white"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <div className="absolute right-0 top-0 bottom-1 w-6 bg-gradient-to-l from-white dark:from-[#0d0f14] to-transparent pointer-events-none" />
            </div>

            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden justify-center gap-2 rounded-none border-black/15 dark:border-white/10 text-foreground dark:text-white bg-transparent hover:bg-black/5 dark:hover:bg-white/10 hover:border-accent/40 h-11 text-xs font-mono uppercase transition-all"
            >
              <Filter size={14} className="text-accent" />
              {showFilters ? t('properties.filter.hide') : t('properties.filter.show')}
            </Button>
          </div>

          {/* Advanced Filter Drawer */}
          <div className={`p-6 transition-all duration-300 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-end">
              {/* Division Type */}
              <div>
                <label className="font-mono text-[10px] text-accent uppercase tracking-widest mb-2 block font-bold">
                  {t('properties.filter.division')}
                </label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full border border-black/15 dark:border-white/15 rounded-none py-2.5 px-3.5 text-xs bg-white dark:bg-[#0d0f14] text-foreground dark:text-white focus:border-accent focus:outline-none"
                >
                  <option value="all">{t('properties.filter.allDivisions')}</option>
                  <option value="plot">{t('properties.filter.divisionPlot')}</option>
                  <option value="apartment">{t('properties.filter.divisionApartment')}</option>
                  <option value="villa">{t('properties.filter.divisionVilla')}</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="font-mono text-[10px] text-accent uppercase tracking-widest mb-2 block font-bold">
                  {t('properties.filter.location')}
                </label>
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full border border-black/15 dark:border-white/15 rounded-none py-2.5 px-3.5 text-xs bg-white dark:bg-[#0d0f14] text-foreground dark:text-white focus:border-accent focus:outline-none"
                >
                  <option value="all">{t('properties.filter.allLocations')}</option>
                  {availableLocations.map((loc) => (
                    <option key={loc} value={loc.toLowerCase()}>{loc}</option>
                  ))}
                </select>
              </div>

              {/* Max Budget Slider */}
              <div>
                <div className="flex justify-between items-center mb-2 font-mono text-[10px] text-accent uppercase tracking-widest">
                  <label className="font-bold">{t('properties.filter.budget')}</label>
                  <span className="font-bold text-foreground dark:text-white">
                    {maxPrice >= 100000000
                      ? t('properties.filter.noLimit')
                      : formatCompact(maxPrice, currency.code)}
                  </span>
                </div>
                <Slider
                  value={[maxPrice]}
                  max={100000000}
                  min={1000000}
                  step={1000000}
                  onValueChange={(val) => setMaxPrice(val[0])}
                  className="w-full py-1"
                />
              </div>

              {/* Action */}
              <div>
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="w-full font-mono text-[10px] py-2.5 uppercase tracking-widest rounded-none border border-black/20 dark:border-white/20 text-foreground dark:text-white/80 hover:bg-black/5 dark:hover:bg-white/10 hover:border-accent dark:hover:border-accent hover:text-accent dark:hover:text-white transition-all duration-200"
                >
                  {t('properties.filter.reset')}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Counter & Mobile Map/Grid Switcher */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-black/10 dark:border-white/10">
          <div className="flex items-center gap-2 text-xs font-mono text-foreground/75 dark:text-white/60">
            <CheckCircle2 size={13} className="text-accent" />
            <span>{t('properties.showing', { count: filtered.length })}</span>
          </div>

          <div className="flex lg:hidden bg-white dark:bg-[#0a0c10] border border-black/15 dark:border-white/10 p-1 shadow-sm">
            <button
              onClick={() => setMobileView('list')}
              className={`px-3 py-1.5 flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider ${
                mobileView === 'list' ? 'bg-accent text-[#0c0d10] font-bold' : 'text-foreground/75 dark:text-white/70'
              }`}
            >
              <LayoutGrid size={11} />
              {t('properties.grid')}
            </button>
            <button
              onClick={() => setMobileView('map')}
              className={`px-3 py-1.5 flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider ${
                mobileView === 'map' ? 'bg-accent text-[#0c0d10] font-bold' : 'text-foreground/75 dark:text-white/70'
              }`}
            >
              <Map size={11} />
              {t('properties.map')}
            </button>
          </div>
        </div>

        {/* Split Grid & Sticky Leaflet Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Properties Grid */}
          <div
            ref={gridRef}
            className={`lg:col-span-7 space-y-8 ${mobileView === 'list' ? 'block' : 'hidden lg:block'}`}
          >
            {filtered.length > 0 ? (
              <div className="grid gap-5 sm:gap-8 grid-cols-1 md:grid-cols-2">
                {filtered.map((property) => (
                  <div key={property.id} className="property-card-wrapper">
                    <PropertyCard
                      property={property}
                      isActive={activePropertyId === property.id}
                      onMouseEnter={() => setActivePropertyId(property.id)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-white dark:bg-[#0a0c10]/40 border border-black/10 dark:border-white/10 p-8 shadow-sm">
                <Home size={40} className="mx-auto text-accent/40 mb-4 animate-pulse" />
                <h3 className="text-xl font-display font-medium text-foreground dark:text-white mb-2">{t('properties.noResults')}</h3>
                <p className="text-foreground/60 dark:text-white/50 max-w-sm mx-auto text-xs leading-relaxed mb-6 font-light">
                  {t('properties.noResultsDesc')}
                </p>
                <Button
                  onClick={clearFilters}
                  className="bg-accent text-[#0c0d10] hover:bg-accent-glow font-mono font-bold text-xs tracking-widest uppercase py-3 px-6 rounded-none cursor-pointer"
                >
                  {t('properties.clearAll')}
                </Button>
              </div>
            )}
          </div>

          {/* Interactive Leaflet Map */}
          <div className={`lg:col-span-5 lg:sticky lg:top-28 ${mobileView === 'map' ? 'block' : 'hidden lg:block'}`}>
            <div className="h-[450px] sm:h-[550px] lg:h-[720px] w-full rounded-none overflow-hidden border border-black/10 dark:border-white/10 bg-white dark:bg-[#0a0c10] p-1 relative shadow-2xl">
              <div className="absolute top-4 right-4 z-30 bg-white/95 dark:bg-[#0c0d10]/90 backdrop-blur-md text-accent font-mono text-xs py-1.5 px-3.5 border border-accent/40 tracking-widest uppercase flex items-center gap-2 pointer-events-none shadow-md">
                <Sparkles size={12} className="text-accent animate-pulse" />
                {t('properties.coordinatesActive')}
              </div>
              <InteractiveMap
                properties={filtered}
                activePropertyId={activePropertyId}
                onSelectProperty={(id) => setActivePropertyId(id)}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  );
}
