import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { MapPin, Phone, CheckCircle, Search, Filter, Heart, Share2, Eye, Home, Users, Sparkles, Map, LayoutGrid } from "lucide-react";
import { useProperties } from "@/context/PropertyContext";
import { useLanguage } from "@/context/LanguageContext";
import InteractiveMap from "@/components/Map/InteractiveMap";
import SEOHead from "@/components/SEO/SEOHead";

export default function AllProperties() {
  const { properties } = useProperties();
  const { t, language } = useLanguage();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [projectType, setProjectType] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000000); // Higher budget ceiling for general flexibility
  const [showFilters, setShowFilters] = useState(false);
  const [activePropertyId, setActivePropertyId] = useState<number | null>(null);
  
  // Mobile navigation state
  const [mobileView, setMobileView] = useState<'list' | 'map'>('list');

  // Filter properties
  const filtered = properties.filter((p) => {
    const priceNum = parseInt(p.price.replace(/[₹,]/g, "")) || 0;
    
    // Support translation searching
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
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 pt-28 pb-10">
      <SEOHead
        title="Luxury Listings Portfolio"
        description="Browse Kinash Associates' portfolio of premium lands, residential plots, and luxury housing schemes in Dehradun, Sahastradhara, and Dharmawala."
        keywords="land for sale dehradun, plots dharmawala, real estate catalog"
        canonical="/properties"
      />

      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        
        {/* Header Block */}
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-accent font-semibold mb-3 block">
            {t('properties.title')}
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-extrabold text-primary mb-4">
            {language === 'en' ? 'Exclusive Properties Portfolio' : language === 'es' ? 'Portafolio Exclusivo' : 'Exklusives Immobilienportfolio'}
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t('properties.subtitle')}
          </p>
        </div>

        {/* Search and Filters Section */}
        <div className="bg-white shadow-soft rounded-3xl border border-border mb-8 overflow-hidden">
          {/* Search Bar */}
          <div className="p-4 sm:p-6 border-b border-border bg-muted/20">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                placeholder={t('hero.searchPlaceholder')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12 pr-4 py-6 text-base border-2 border-muted focus:border-accent rounded-2xl bg-white shadow-inner"
              />
            </div>
          </div>

          {/* Filters Toggle Button (Mobile) */}
          <div className="block sm:hidden px-4 py-3 border-b border-border">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="w-full justify-center gap-2 rounded-xl"
            >
              <Filter size={16} />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>          {/* Filters Grid */}
          <div className={`p-6 transition-all duration-300 ${showFilters ? 'block' : 'hidden sm:block'}`}>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 items-end">
              {/* Status Filter */}
              <div>
                <label className="text-xs font-bold text-muted-foreground tracking-wide uppercase mb-2 block">
                  {t('properties.filter.status')}
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full border-2 border-muted hover:border-primary/20 focus:border-accent rounded-xl py-3 px-4 text-sm bg-white text-primary font-medium"
                >
                  <option value="all">{language === 'en' ? 'All Statuses' : language === 'es' ? 'Todos los Estados' : 'Alle Status'}</option>
                  <option value="completed">{language === 'en' ? 'Completed' : language === 'es' ? 'Completado' : 'Abgeschlossen'}</option>
                  <option value="under construction">{language === 'en' ? 'Under Construction' : language === 'es' ? 'En Construcción' : 'In Bau'}</option>
                  <option value="available">{language === 'en' ? 'Available' : language === 'es' ? 'Disponible' : 'Verfügbar'}</option>
                  <option value="sold">{language === 'en' ? 'Sold Out' : language === 'es' ? 'Agotado' : 'Ausverkauft'}</option>
                </select>
              </div>

              {/* Project Type Filter */}
              <div>
                <label className="text-xs font-bold text-muted-foreground tracking-wide uppercase mb-2 block">
                  {language === 'en' ? 'Project Type' : language === 'es' ? 'Tipo de Proyecto' : 'Projekttyp'}
                </label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full border-2 border-muted hover:border-primary/20 focus:border-accent rounded-xl py-3 px-4 text-sm bg-white text-primary font-medium"
                >
                  <option value="all">{language === 'en' ? 'All Types' : language === 'es' ? 'Todos los Tipos' : 'Alle Typen'}</option>
                  <option value="plot">{language === 'en' ? 'Residential Plot' : language === 'es' ? 'Terreno Residencial' : 'Baugrundstück'}</option>
                  <option value="apartment">{language === 'en' ? 'Luxury Apartment' : language === 'es' ? 'Apartamento de Lujo' : 'Luxusapartment'}</option>
                </select>
              </div>

              {/* Location Filter */}
              <div>
                <label className="text-xs font-bold text-muted-foreground tracking-wide uppercase mb-2 block">
                  {language === 'en' ? 'Location' : language === 'es' ? 'Ubicación' : 'Standort'}
                </label>
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full border-2 border-muted hover:border-primary/20 focus:border-accent rounded-xl py-3 px-4 text-sm bg-white text-primary font-medium"
                >
                  <option value="all">{language === 'en' ? 'All Locations' : language === 'es' ? 'Todas las Ubicaciones' : 'Alle Standorte'}</option>
                  <option value="dharmawala">Dharmawala</option>
                  <option value="bhopalpani">Bhopalpani</option>
                  <option value="sahastradhara">Sahastradhara Road</option>
                  <option value="jattowala">Jattowala</option>
                </select>
              </div>

              {/* Price Range */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-muted-foreground tracking-wide uppercase">
                    {t('properties.filter.budget')}
                  </label>
                  <span className="text-sm font-bold text-accent">
                    {maxPrice >= 100000000 ? 'No Limit' : `₹${(maxPrice / 100000).toFixed(0)} Lakh`}
                  </span>
                </div>
                <div className="px-2">
                  <Slider
                    value={[maxPrice]}
                    max={100000000}
                    min={1000000}
                    step={1000000}
                    onValueChange={(val) => setMaxPrice(val[0])}
                    className="w-full text-accent"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground mt-2">
                    <span>₹10L</span>
                    <span>₹10Cr</span>
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              <div>
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="w-full border-2 border-muted hover:border-accent rounded-xl py-5 hover:bg-muted font-bold text-primary transition-all duration-300"
                >
                  {t('properties.filter.clear')}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile View Toggle Bar */}
        <div className="flex lg:hidden justify-center mb-6">
          <div className="bg-white border rounded-xl p-1 shadow-soft flex gap-2">
            <Button
              variant={mobileView === 'list' ? 'default' : 'ghost'}
              onClick={() => setMobileView('list')}
              className="gap-2 rounded-lg font-semibold"
            >
              <LayoutGrid size={16} />
              {t('properties.grid')}
            </Button>
            <Button
              variant={mobileView === 'map' ? 'default' : 'ghost'}
              onClick={() => setMobileView('map')}
              className="gap-2 rounded-lg font-semibold"
            >
              <Map size={16} />
              {t('properties.map')}
            </Button>
          </div>
        </div>

        {/* Interactive Split Pane Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Properties List Feed */}
          <div className={`lg:col-span-7 space-y-6 ${mobileView === 'list' ? 'block' : 'hidden lg:block'}`}>
            {filtered.length > 0 ? (
              <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
                {filtered.map((property) => {
                  // Dynamic translation variables
                  const displayTitle = language === 'en' ? property.title : property.translations?.[language]?.title || property.title;
                  const displayLocation = language === 'en' ? property.location : property.translations?.[language]?.location || property.location;
                  const displayDesc = language === 'en' ? property.description : property.translations?.[language]?.description || property.description;
                  const displayFeatures = language === 'en' ? property.features : property.translations?.[language]?.features || property.features;
                  const displaySpecs = {
                    type: language === 'en' ? property.specs.type : property.translations?.[language]?.specsType || property.specs.type,
                    possession: language === 'en' ? property.specs.possession : property.translations?.[language]?.specsPossession || property.specs.possession
                  };

                  return (
                    <Card
                      key={property.id}
                      onMouseEnter={() => setActivePropertyId(property.id)}
                      className={`group flex flex-col hover-card-premium border border-border/80 shadow-soft rounded-3xl overflow-hidden bg-white ${
                        activePropertyId === property.id ? 'ring-2 ring-accent border-transparent' : ''
                      }`}
                    >
                      {/* Image Section */}
                      <div className="relative h-56 overflow-hidden bg-muted">
                        <img
                          src={property.images?.[0]}
                          alt={displayTitle}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          onError={(e: any) => {
                            e.target.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                        
                        {/* Status Badge */}
                        <div
                          className={`absolute top-4 left-4 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-lg ${
                            property.status.toLowerCase().includes("completed")
                              ? "bg-primary text-accent border border-accent/30"
                              : property.status.toLowerCase().includes("construction")
                              ? "bg-amber-500 text-primary font-extrabold animate-pulse"
                              : property.status.toLowerCase().includes("sold")
                              ? "bg-red-500 text-white"
                              : "bg-green-500 text-white"
                          }`}
                        >
                          {property.status}
                        </div>

                        {/* Property Specs overlay */}
                        <div className="absolute bottom-4 left-4 text-white text-xs font-semibold bg-primary/80 backdrop-blur-sm py-1 px-3.5 rounded-full">
                          {displaySpecs.type}
                        </div>
                      </div>

                      {/* Content Section */}
                      <CardHeader className="pb-3 pt-5">
                        <div className="flex items-center text-muted-foreground mb-1">
                          <MapPin size={14} className="mr-1 text-accent flex-shrink-0" />
                          <span className="text-xs line-clamp-1">{displayLocation}</span>
                        </div>
                        <CardTitle className="text-xl font-display font-bold line-clamp-1 group-hover:text-accent transition-colors leading-tight text-primary">
                          {displayTitle}
                        </CardTitle>
                        <p className="text-2xl font-display font-black text-primary mt-2">
                          {property.price}
                        </p>
                      </CardHeader>

                      <CardContent className="flex-1 space-y-4 pb-4">
                        {/* Area details and stats */}
                        <div className="grid grid-cols-3 gap-2 p-3 bg-muted/40 rounded-xl text-center text-2xs font-semibold border text-primary">
                          <div>
                            <span className="text-muted-foreground block font-medium mb-0.5">Area Size</span>
                            {property.specs.area || property.specs.sizes[0]}
                          </div>
                          <div>
                            <span className="text-muted-foreground block font-medium mb-0.5">Possession</span>
                            {displaySpecs.possession}
                          </div>
                          <div>
                            <span className="text-muted-foreground block font-medium mb-0.5">Facing</span>
                            {property.specs.facing}
                          </div>
                        </div>

                        {/* Description snippet */}
                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                          {displayDesc}
                        </p>

                        {/* Features highlight */}
                        <div className="space-y-1.5 border-t pt-3">
                          {displayFeatures.slice(0, 2).map((feat, i) => (
                            <div key={i} className="flex items-center text-xs text-muted-foreground">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                              <span className="line-clamp-1">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>

                      {/* Footer CTA */}
                      <CardFooter className="border-t border-border/80 pt-4 pb-5 flex gap-2">
                        <Button 
                          onClick={() => (window.location.href = `/property/${property.slug}`)} 
                          className="flex-1 bg-primary hover:bg-primary-glow text-white rounded-xl py-2.5 font-bold text-xs transition-all shadow-soft"
                        >
                          {t('properties.viewDetails')}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => (window.location.href = `/contact`)}
                          className="rounded-xl border hover:bg-muted font-bold text-xs"
                        >
                          <Phone size={14} className="mr-1 text-accent" />
                          {t('properties.contact')}
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            ) : (
              /* No Results Found */
              <div className="text-center py-16 bg-white rounded-3xl border border-border shadow-soft">
                <Home size={64} className="mx-auto text-muted-foreground/30 mb-4" />
                <h3 className="text-2xl font-bold text-primary mb-2">{t('properties.noResults')}</h3>
                <p className="text-muted-foreground max-w-sm mx-auto text-sm leading-relaxed mb-6">
                  {t('properties.noResultsDesc')}
                </p>
                <Button 
                  onClick={clearFilters}
                  className="bg-primary hover:bg-primary-glow text-white px-6 py-2.5 rounded-xl font-bold"
                >
                  {t('properties.filter.clear')}
                </Button>
              </div>
            )}
          </div>

          {/* Right Column: Interactive Leaflet Grayscale Map */}
          <div className={`lg:col-span-5 lg:sticky lg:top-28 ${mobileView === 'map' ? 'block' : 'hidden lg:block'}`}>
            <div className="h-[400px] sm:h-[500px] lg:h-[700px] w-full rounded-3xl overflow-hidden shadow-elegant border bg-white p-2">
              <div className="absolute top-6 right-6 z-20 bg-primary text-primary-foreground font-mono text-[10px] py-1 px-3 rounded-full border shadow-lg flex items-center gap-1.5">
                <Sparkles size={10} className="text-accent animate-pulse" />
                Luxury Map Tiles Active
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