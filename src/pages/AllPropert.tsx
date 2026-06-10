import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Search, Filter, Home, Sparkles, Map, LayoutGrid } from "lucide-react";
import { useProperties } from "@/context/PropertyContext";
import { useLanguage } from "@/context/LanguageContext";
import InteractiveMap from "@/components/Map/InteractiveMap";
import SEOHead from "@/components/SEO/SEOHead";
import PropertyCard from "@/components/ui/PropertyCard";
import gsap from "gsap";

export default function AllProperties() {
  const { properties } = useProperties();
  const { t, language } = useLanguage();
  const [searchParams] = useSearchParams();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [projectType, setProjectType] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000000); // 10 Crore limit
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
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out' }
      );
    }
  }, [search, status, projectType, locationFilter, maxPrice]);

  // Filter logic
  const filtered = properties.filter((p) => {
    const priceNum = parseInt(p.price.replace(/[₹,]/g, "")) || 0;

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
    setStatus("");
    setProjectType("");
    setLocationFilter("");
    setMaxPrice(100000000);
  };

  return (
    <div className="min-h-screen bg-[#0c0d10] text-white pt-28 pb-16 relative overflow-hidden">
      <SEOHead
        title="Luxury Listings Portfolio | Kinash Associates"
        description="Browse Kinash Associates' portfolio of premium lands, residential plots, and luxury housing schemes in Dehradun, Sahastradhara, and Dharmawala."
        keywords="land for sale dehradun, plots dharmawala, real estate catalog"
        canonical="/properties"
      />

      {/* Decorative clean line grid */}
      <div className="absolute inset-0 flex justify-between pointer-events-none opacity-5 px-12 z-0">
        <div className="w-[1px] h-full bg-white" />
        <div className="w-[1px] h-full bg-white hidden md:block" />
        <div className="w-[1px] h-full bg-white hidden md:block" />
        <div className="w-[1px] h-full bg-white" />
      </div>

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 relative z-10">

        {/* Header Block */}
        <div className="text-left mb-12 max-w-4xl">
          <span className="text-[9px] uppercase tracking-[0.3em] text-accent font-mono font-bold mb-4 block">
            {t('properties.title')}
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-medium text-white mb-6 leading-none">
            Architectural <span className="bg-gradient-to-r from-accent to-accent-glow bg-clip-text text-transparent italic font-light">Listings</span> Portfolio.
          </h1>
          <p className="text-xs text-white/50 max-w-2xl leading-relaxed font-light">
            Explore Kinash Associates' verified land reserves, residential layouts, and high-appreciation development projects. Every listing features secure legal titles and demarcated coordinates.
          </p>
        </div>

        {/* Search and Filters Section */}
        <div className="bg-[#0a0c10]/70 border border-white/5 shadow-2xl mb-12 backdrop-blur-md relative">
          <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-accent/40" />
          <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-accent/40" />

          {/* Search Bar */}
          <div className="p-4 sm:p-6 border-b border-white/5 bg-[#0d0f14]/50">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-accent/60" size={16} />
              <Input
                placeholder="Search properties, registry titles, or specifications..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12 pr-4 py-6 text-xs border border-white/10 rounded-none bg-[#0c0d10]/50 text-white placeholder:text-white/30 focus:border-accent focus:ring-0 focus:outline-none"
              />
            </div>
          </div>

          {/* Filters Toggle Button (Mobile) */}
          <div className="block sm:hidden px-4 py-3 border-b border-white/5">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="w-full justify-center gap-2 rounded-none border-white/10 text-white bg-transparent hover:bg-white/5"
            >
              <Filter size={14} className="text-accent" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>

          {/* Filters Grid */}
          <div className={`p-6 transition-all duration-300 ${showFilters ? 'block' : 'hidden sm:block'}`}>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 items-end">
              {/* Status Filter */}
              <div className="relative">
                <label className="font-mono text-[12px] text-accent/60 uppercase tracking-widest mb-2 block select-none">
                  Registry Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full border border-white/10 rounded-none py-3 px-4 text-xs bg-[#0d0f14]/70 text-white focus:border-accent focus:outline-none font-light"
                >
                  <option value="all">All Statuses</option>
                  <option value="completed">Completed</option>
                  <option value="under construction">Under Construction</option>
                  <option value="available">Available</option>
                  <option value="sold">Sold Out</option>
                </select>
              </div>

              {/* Project Type Filter */}
              <div className="relative">
                <label className="font-mono text-[12px] text-accent/60 uppercase tracking-widest mb-2 block select-none">
                  Project Division
                </label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full border border-white/10 rounded-none py-3 px-4 text-xs bg-[#0d0f14]/70 text-white focus:border-accent focus:outline-none font-light"
                >
                  <option value="all">All Divisions</option>
                  <option value="plot">Residential Plot</option>
                  <option value="apartment">Luxury Apartment</option>
                </select>
              </div>

              {/* Location Filter */}
              <div className="relative">
                <label className="font-mono text-[12px] text-accent/60 uppercase tracking-widest mb-2 block select-none">
                  Location Zone
                </label>
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full border border-white/10 rounded-none py-3 px-4 text-xs bg-[#0d0f14]/70 text-white focus:border-accent focus:outline-none font-light"
                >
                  <option value="all">All Locations</option>
                  <option value="dharmawala">Dharmawala</option>
                  <option value="bhopalpani">Bhopalpani</option>
                  <option value="sahastradhara">Sahastradhara Road</option>
                  <option value="jattowala">Jattowala</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="relative">
                <div className="flex justify-between items-center mb-3 font-mono text-[12px] text-accent/60 uppercase tracking-widest">
                  <label>Max Budget</label>
                  <span className="text-accent font-bold">
                    {maxPrice >= 100000000
                      ? 'No Limit'
                      : maxPrice >= 10000000
                        ? `₹${(maxPrice / 10000000).toFixed(1)} Cr`
                        : `₹${(maxPrice / 100000).toFixed(0)} Lakh`}
                  </span>
                </div>
                <div className="pt-2 pb-1">
                  <Slider
                    value={[maxPrice]}
                    max={100000000}
                    min={1000000}
                    step={1000000}
                    onValueChange={(val) => setMaxPrice(val[0])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-[12px] font-mono text-white/30 mt-2 tracking-wider">
                    <span>₹10L</span>
                    <span>₹10Cr</span>
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              <div>
                <Button
                  onClick={clearFilters}
                  className="w-full btn-luxury-outline border-white/10 text-white hover:bg-white hover:text-black font-bold text-[9px] py-4 uppercase tracking-widest rounded-none"
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile View Toggle Bar */}
        <div className="flex lg:hidden justify-center mb-6">
          <div className="bg-[#0a0c10] border border-white/5 rounded-none p-1 flex gap-2">
            <Button
              variant={mobileView === 'list' ? 'default' : 'ghost'}
              onClick={() => setMobileView('list')}
              className={`gap-2 rounded-none font-mono text-[9px] tracking-widest uppercase ${mobileView === 'list' ? 'bg-accent text-[#0c0d10]' : 'text-white'
                }`}
            >
              <LayoutGrid size={12} />
              {t('properties.grid')}
            </Button>
            <Button
              variant={mobileView === 'map' ? 'default' : 'ghost'}
              onClick={() => setMobileView('map')}
              className={`gap-2 rounded-none font-mono text-[9px] tracking-widest uppercase ${mobileView === 'map' ? 'bg-accent text-[#0c0d10]' : 'text-white'
                }`}
            >
              <Map size={12} />
              {t('properties.map')}
            </Button>
          </div>
        </div>

        {/* Interactive Split Pane Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Properties List Feed */}
          <div
            ref={gridRef}
            className={`lg:col-span-7 space-y-8 ${mobileView === 'list' ? 'block' : 'hidden lg:block'}`}
          >
            {filtered.length > 0 ? (
              <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
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
              /* No Results Found */
              <div className="text-center py-24 bg-[#0a0c10]/40 rounded-none border border-white/5">
                <Home size={48} className="mx-auto text-accent/30 mb-6 animate-pulse" />
                <h3 className="text-xl font-display font-medium text-white mb-3">No Properties Found</h3>
                <p className="text-white/45 max-w-sm mx-auto text-xs leading-relaxed font-light mb-8">
                  No listings matched your active filter configuration. Reset the parameters to browse the full catalog.
                </p>
                <Button
                  onClick={clearFilters}
                  className="btn-luxury-gold bg-accent text-[#0c0d10] border-transparent font-bold text-[9px] tracking-widest uppercase py-3.5 px-6 rounded-none"
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>

          {/* Right Column: Interactive Leaflet Grayscale Map */}
          <div className={`lg:col-span-5 lg:sticky lg:top-28 ${mobileView === 'map' ? 'block' : 'hidden lg:block'}`}>
            <div className="h-[400px] sm:h-[500px] lg:h-[700px] w-full rounded-none overflow-hidden border border-white/5 bg-[#0a0c10] p-1 relative shadow-2xl">
              <div className="absolute top-4 right-4 z-20 bg-[#0c0d10] text-accent font-mono text-[8px] py-1 px-3 border border-white/10 tracking-widest uppercase flex items-center gap-1.5 pointer-events-none">
                <Sparkles size={10} className="text-accent animate-pulse" />
                System Map Grid Active
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
    </div>
  );
}