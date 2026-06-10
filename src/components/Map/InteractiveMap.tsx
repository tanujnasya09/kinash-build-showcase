import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Property } from '@/context/PropertyContext';
import { MapPin, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

// Helper function to format prices into compact luxury tags: e.g. "₹65,00,000.00" -> "₹65L" or "₹17,000" -> "₹17K/Gaj"
const getPriceTagText = (price: string) => {
  const numStr = price.replace(/[₹,]/g, "");
  const num = parseFloat(numStr) || 0;
  if (num >= 10000000) {
    return `₹${(num / 10000000).toFixed(1)}Cr`;
  } else if (num >= 100000) {
    return `₹${(num / 100000).toFixed(0)}L`;
  } else if (num > 0) {
    if (num < 100000) {
      return `₹${(num / 1000).toFixed(0)}K/Gaj`;
    }
  }
  return price;
};

// Generates a stunning custom luxury Price-Tag marker
const createLuxuryPriceIcon = (price: string, isSelected: boolean) => {
  const displayPrice = getPriceTagText(price);
  const activeClasses = isSelected 
    ? 'bg-accent text-[#0c0d10] border-accent scale-110 shadow-[0_0_20px_rgba(223,186,72,0.5)] z-50 font-bold' 
    : 'bg-[#0c0d10]/90 text-accent border-accent/30 hover:bg-accent hover:text-[#0c0d10] hover:scale-105';

  const tipBorderClass = isSelected ? 'bg-accent border-accent' : 'bg-[#0c0d10] border-accent/30';

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
    iconSize: [60, 24],
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
  const { language, t } = useLanguage();

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
        
        {/* Dark minimalist tile skin from CartoDB */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
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
                key={`${p.id}-${isSelected}`} // Force Leaflet recreation on active hover state change
                position={p.coordinates}
                icon={createLuxuryPriceIcon(p.price, isSelected)}
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
                      <img
                        src={p.images?.[0]}
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
                      <span className="text-xs font-mono font-bold text-accent">{p.price}</span>
                      <a
                        href={`/property/${p.slug}`}
                        className="text-[9px] font-mono uppercase tracking-widest text-white hover:text-accent flex items-center gap-1 transition-colors duration-300"
                      >
                        {t('properties.viewDetails')}
                        <ArrowRight size={10} className="text-accent" />
                      </a>
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
