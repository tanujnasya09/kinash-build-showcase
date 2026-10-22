import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Property } from '@/context/PropertyContext';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { formatCompact, formatPrice, parseAmount } from '@/lib/currency';

// Compact luxury tags for map pins: 6500000 -> "₹65L", 17000 -> "₹17K"
const getPriceTagText = (price: string, currencyCode: string) => {
  const num = parseAmount(price);
  if (num <= 0) return formatPrice(price, currencyCode);
  return formatCompact(num, currencyCode);
};

// Generates a stunning custom luxury Price-Tag marker
const createLuxuryPriceIcon = (price: string, isSelected: boolean, currencyCode: string, isDark: boolean = true) => {
  const displayPrice = getPriceTagText(price, currencyCode);
  const activeClasses = isDark
    ? (isSelected 
        ? 'bg-accent text-[#0c0d10] border-accent scale-110 shadow-[0_0_20px_rgba(223,186,72,0.5)] z-50 font-bold' 
        : 'bg-[#0c0d10]/95 text-accent border-accent/40 hover:bg-accent hover:text-[#0c0d10] hover:scale-105 shadow-xl')
    : (isSelected
        ? 'bg-accent text-white border-accent scale-110 shadow-[0_8px_20px_rgba(156,109,18,0.4)] z-50 font-bold'
        : 'bg-white text-[#9c6d12] border-[#9c6d12]/40 hover:bg-accent hover:text-white hover:scale-105 shadow-md font-semibold');

  const tipBorderClass = isDark
    ? (isSelected ? 'bg-accent border-accent' : 'bg-[#0c0d10] border-accent/40')
    : (isSelected ? 'bg-accent border-accent' : 'bg-white border-[#9c6d12]/40');

  return L.divIcon({
    className: 'custom-luxury-marker',
    html: `
      <div class="relative flex flex-col items-center transition-all duration-300">
        ${isSelected ? '<span class="absolute -top-1.5 inline-flex h-8 w-16 animate-ping rounded-full bg-accent opacity-15"></span>' : ''}
        <div class="px-2 py-0.5 text-[9px] font-mono border rounded-none transition-all shadow-xl whitespace-nowrap ${activeClasses}">
          ${displayPrice}
        </div>
        <div class="w-1.5 h-1.5 rotate-45 -mt-1 border-r border-b ${tipBorderClass}"></div>
      </div>
    `,
    iconSize: [60, 30],
    iconAnchor: [30, 24],
    popupAnchor: [0, -24],
  });
};

// Component to dynamically pan and zoom when active listing changes
interface ChangeViewProps {
  center: [number, number];
  zoom: number;
}

const ChangeView: React.FC<ChangeViewProps> = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

interface InteractiveMapProps {
  properties: Property[];
  activePropertyId?: number | null;
  onSelectProperty?: (id: number) => void;
  center?: [number, number];
  zoom?: number;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  properties,
  activePropertyId,
  onSelectProperty,
  center = [30.3475, 78.0772], // Default Dehradun center
  zoom = 11,
}) => {
  const { language, t, currency } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Find active property coordinate to center map
  const activeProp = properties.find((p) => p.id === activePropertyId);
  const mapCenter = activeProp ? activeProp.coordinates : center;
  const mapZoom = activeProp ? 13 : zoom;

  return (
    <div className="w-full h-full rounded-none overflow-hidden shadow-elegant border border-white/5 bg-[#0a0c10] relative min-h-[350px] lg:min-h-[500px]">
      <style>{`
        .leaflet-container {
          width: 100%;
          height: 100%;
          font-family: inherit;
        }
      `}</style>

      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        scrollWheelZoom={true}
        className="w-full h-full z-10"
      >
        <ChangeView center={mapCenter} zoom={mapZoom} />
        
        {/* Dynamic theme-aware architectural tile skin (Esri World Gray Canvas - No API Key Required) */}
        <TileLayer
          key={theme}
          attribution='&copy; <a href="https://www.esri.com/">Esri</a>, DeLorme, NAVTEQ'
          url={
            isDark
              ? "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
              : "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
          }
          className="luxury-map-tiles"
        />

        {properties
          .filter((p) => p.coordinates && p.coordinates.length === 2)
          .map((p) => {
            const isSelected = p.id === activePropertyId;
            const displayTitle = language === 'en' ? p.title : p.translations?.[language]?.title || p.title;
            const displayLocation = language === 'en' ? p.location : p.translations?.[language]?.location || p.location;

            return (
              <Marker
                key={`${p.id}-${isSelected}-${theme}`} // Force Leaflet recreation on theme/active change
                position={p.coordinates}
                icon={createLuxuryPriceIcon(p.price, isSelected, currency.code, isDark)}
                eventHandlers={{
                  click: () => {
                    if (onSelectProperty) {
                      onSelectProperty(p.id);
                    }
                  },
                }}
              >
                <Popup className="luxury-popup">
                  <div className="p-3 w-60 bg-[#0c0d10] text-white">
                    <div className="relative overflow-hidden aspect-[16/10] mb-3 border border-white/5 bg-[#0d0f14]">
                      <img loading="lazy" decoding="async" src={p.images?.[0]}
                        alt={displayTitle}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <div className="flex items-center text-[9px] font-mono uppercase tracking-wider text-white/50 mb-1.5">
                      <MapPin size={9} className="mr-1.5 text-accent flex-shrink-0" />
                      <span className="line-clamp-1">{displayLocation}</span>
                    </div>
                    <h4 className="font-display font-medium text-white text-xs mb-2 leading-snug line-clamp-1">
                      {displayTitle}
                    </h4>
                    <div className="flex items-center justify-between border-t border-white/5 pt-2 mt-2">
                      <span className="text-xs font-mono font-bold text-accent">{formatPrice(p.price, currency.code)}</span>
                      <Link
                        to={`/property/${p.slug}`}
                        className="text-[10px] font-mono uppercase tracking-widest text-white hover:text-accent flex items-center gap-1 transition-colors duration-300"
                      >
                        {t('properties.viewDetails')}
                        <ArrowRight size={10} className="text-accent" />
                      </Link>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
      </MapContainer>
    </div>
  );
};

export default InteractiveMap;
