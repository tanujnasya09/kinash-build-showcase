import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Property } from '@/context/PropertyContext';
import { MapPin, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

// Fix for default marker icons in Leaflet + Vite
// We define a stunning glowing gold luxury marker
const createLuxuryIcon = () => {
  return L.divIcon({
    className: 'custom-luxury-marker',
    html: `
      <div class="relative flex items-center justify-center">
        <span class="absolute inline-flex h-8 w-8 animate-ping rounded-full bg-amber-400 opacity-75"></span>
        <div class="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary border-2 border-accent shadow-glow text-accent">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-building"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M8 10h.01"/><path d="M16 10h.01"/><path d="M8 14h.01"/><path d="M16 14h.01"/></svg>
        </div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });
};

const customIcon = createLuxuryIcon();

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
    <div className="w-full h-full rounded-2xl overflow-hidden shadow-elegant border border-border bg-muted relative min-h-[350px] lg:min-h-[500px]">
      {/* Luxury Grayscale Map Overlay Filter */}
      <style>{`
        .leaflet-container {
          width: 100%;
          height: 100%;
          font-family: inherit;
        }
        /* Custom luxury styles for our Leaflet grayscale map */
        .luxury-map-tiles {
          filter: grayscale(1) invert(0.05) contrast(1.1) brightness(1.02);
        }
        .custom-luxury-marker {
          background: transparent;
          border: none;
        }
      `}</style>

      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        scrollWheelZoom={true}
        className="w-full h-full z-10"
      >
        <ChangeView center={mapCenter} zoom={mapZoom} />
        
        {/* Luxury minimalist tile skin from CartoDB */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          className="luxury-map-tiles"
        />

        {properties
          .filter((p) => p.coordinates && p.coordinates.length === 2)
          .map((p) => {
            const isSelected = p.id === activePropertyId;
            // Support dynamic translation of text
            const displayTitle = language === 'en' ? p.title : p.translations?.[language]?.title || p.title;
            const displayLocation = language === 'en' ? p.location : p.translations?.[language]?.location || p.location;

            return (
              <Marker
                key={p.id}
                position={p.coordinates}
                icon={customIcon}
                eventHandlers={{
                  click: () => {
                    if (onSelectProperty) {
                      onSelectProperty(p.id);
                    }
                  },
                }}
              >
                <Popup className="luxury-popup">
                  <div className="p-1 w-64">
                    <img
                      src={p.images?.[0]}
                      alt={displayTitle}
                      className="w-full h-28 object-cover rounded-lg mb-2 border border-gray-100"
                    />
                    <div className="flex items-center text-xs text-muted-foreground mb-1">
                      <MapPin size={10} className="mr-1 text-accent" />
                      <span className="line-clamp-1">{displayLocation}</span>
                    </div>
                    <h4 className="font-display font-semibold text-primary text-sm mb-1 leading-snug line-clamp-1">
                      {displayTitle}
                    </h4>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-bold text-primary">{p.price}</span>
                      <a
                        href={`/property/${p.slug}`}
                        className="text-xs text-accent font-semibold hover:text-accent-glow flex items-center gap-0.5"
                      >
                        {t('properties.viewDetails')}
                        <ArrowRight size={10} />
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
