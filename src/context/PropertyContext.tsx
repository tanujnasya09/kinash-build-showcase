import React, { createContext, useContext, useState, useEffect } from 'react';
import initialProperties from '../data/proprties';

export interface Property {
  id: number;
  slug: string;
  title: string;
  price: string;
  status: string;
  location: string;
  description: string;
  features: string[];
  contact: string;
  videoLink?: string;
  additionalInfo?: string;
  images: string[];
  specs: {
    type: string;
    sizes: string[];
    possession: string;
    facing: string;
    bedrooms?: string | number;
    bathrooms?: string | number;
    parking?: string | number;
    area?: string;
  };
  coordinates: [number, number]; // [lat, lng] for Leaflet
  floorPlanUrl?: string;
  virtualTourUrl?: string;
  brochureUrl?: string;
  translations?: {
    es: {
      title: string;
      description: string;
      location: string;
      features: string[];
      specsType: string;
      specsPossession: string;
      specsFacing: string;
    };
    de: {
      title: string;
      description: string;
      location: string;
      features: string[];
      specsType: string;
      specsPossession: string;
      specsFacing: string;
    };
  };
}

interface PropertyContextType {
  properties: Property[];
  addProperty: (property: Omit<Property, 'id'>) => void;
  updateProperty: (property: Property) => void;
  deleteProperty: (id: number) => void;
  resetProperties: () => void;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

// Rich luxury mockup assets generated using standard URLs and structured schemas
const enrichedInitialProperties: Property[] = [
  {
    id: 1,
    slug: 'aduwala-greens-dharmawala',
    title: 'Aduwala Greens, Dharmawala',
    price: '₹10,000.00',
    status: 'Under Construction',
    location: 'Dharmawala, Dehradun',
    description: 'Dehradun near 4-lane Highway. Super affordable premium residential plots available! Purchase 150, 200, 250 Gaj plots in a completely pollution-free, tranquil environment with modern infrastructure.',
    features: [
      'Just 30 meters from 4-lane Highway',
      'Distance from Dehradun ISBT is 38 Km',
      'Distance from Paonta Sahib is 10 Km',
      'Fitted with Electricity, Water, Roads, and nearby Schools',
      'Immediate Registry Transfer guaranteed',
      '100% Traffic Free and Pollution Free green belt',
      'Available in custom sizes (100 Gaj, 150 Gaj, 200 Gaj, 250 Gaj)'
    ],
    contact: '+91 135 277 9000',
    videoLink: 'https://www.youtube.com/watch?v=CneWfXK363M',
    additionalInfo: 'We have brought you the most beautiful plots in the Dehradun region, where you can build your dream villa for less than 10 Lakhs.',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=600&fit=crop'
    ],
    specs: {
      type: 'Residential Plot',
      sizes: ['100 Gaj', '150 Gaj', '200 Gaj', '250 Gaj'],
      possession: 'Immediate',
      facing: 'East',
      bedrooms: 'N/A',
      bathrooms: 'N/A',
      parking: '2 Spaces',
      area: '2250 Sq Ft'
    },
    coordinates: [30.4284, 77.7471],
    floorPlanUrl: 'https://images.unsplash.com/photo-1545464693-f1798a373343?w=800&h=600&fit=crop', // Floor plan mock
    virtualTourUrl: 'https://my.matterport.com/show/?m=sxQGDh8m21N',
    brochureUrl: '#',
    translations: {
      es: {
        title: 'Aduwala Greens, Dharmawala',
        location: 'Dharmawala, Dehradun',
        description: 'Terrenos residenciales de primera calidad y super asequibles cerca de la autopista de 4 carriles de Dehradun. Adquiera terrenos de 150, 200 y 250 Gaj en un entorno completamente libre de contaminación y tranquilo con infraestructura moderna.',
        features: [
          'A solo 30 metros de la autopista de 4 carriles',
          'La distancia desde Dehradun ISBT es de 38 Km',
          'La distancia desde Paonta Sahib es de 10 Km',
          'Equipado con electricidad, agua, carreteras y escuelas cercanas',
          'Transferencia de registro inmediata garantizada',
          'Cinturón verde 100% libre de tráfico y contaminación',
          'Disponible en tamaños personalizados (100 Gaj, 150 Gaj, 200 Gaj, 250 Gaj)'
        ],
        specsType: 'Terreno Residencial',
        specsPossession: 'Inmediata',
        specsFacing: 'Este'
      },
      de: {
        title: 'Aduwala Greens, Dharmawala',
        location: 'Dharmawala, Dehradun',
        description: 'Super erschwingliche Premium-Wohnbaugrundstücke in der Nähe der 4-spurigen Autobahn Dehradun! Erwerben Sie 150, 200 und 250 Gaj Grundstücke in einer völlig schadstofffreien, ruhigen Umgebung mit moderner Infrastruktur.',
        features: [
          'Nur 30 Meter von der 4-spurigen Autobahn entfernt',
          'Entfernung vom Dehradun ISBT beträgt 38 Km',
          'Entfernung von Paonta Sahib beträgt 10 Km',
          'Ausgestattet mit Strom, Wasser, Straßen und nahe gelegenen Schulen',
          'Sofortige Grundbucheintragung garantiert',
          '100% verkehrs- und schadstofffreier Grüngürtel',
          'Verfügbar in benutzerdefinierten Größen (100 Gaj, 150 Gaj, 200 Gaj, 250 Gaj)'
        ],
        specsType: 'Wohnbaugrundstück',
        specsPossession: 'Sofort',
        specsFacing: 'Osten'
      }
    }
  },
  {
    id: 2,
    slug: 'plots-at-bhopalpani',
    title: 'Plots at Bhopalpani',
    price: '₹30,000.00',
    status: 'Completed',
    location: 'Bhopalpani, Dehradun',
    description: 'Premium residential plots with an exceptionally designed layout, wide roads, and seamless access to the main city center. Perfect for immediate construction of your custom holiday home or luxury residency.',
    features: [
      '18 feet wide internal paved roads',
      'Proper plot layout with numbered visual demarcations',
      'Clear government demarcation & single ownership title',
      'Excellent highway connectivity and access to local transport',
      'Fast-developing high-end residential neighborhood'
    ],
    contact: '+91 135 277 9000',
    images: [
      'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop'
    ],
    specs: {
      type: 'Residential Plot',
      sizes: ['150 Gaj', '200 Gaj', '250 Gaj'],
      possession: 'Immediate',
      facing: 'East',
      bedrooms: 'N/A',
      bathrooms: 'N/A',
      parking: '1 Space',
      area: '1800 Sq Ft'
    },
    coordinates: [30.2974, 78.1368],
    floorPlanUrl: 'https://images.unsplash.com/photo-1545464693-f1798a373343?w=800&h=600&fit=crop',
    virtualTourUrl: 'https://my.matterport.com/show/?m=sxQGDh8m21N',
    brochureUrl: '#',
    translations: {
      es: {
        title: 'Parcelas en Bhopalpani',
        location: 'Bhopalpani, Dehradun',
        description: 'Terrenos residenciales premium con un diseño excepcional, caminos amplios y acceso perfecto al centro principal de la ciudad. Perfecto para construir de inmediato su casa de campo o residencia de lujo.',
        features: [
          'Carreteras pavimentadas internas de 18 pies de ancho',
          'Diseño de parcela adecuado con demarcaciones visuales numeradas',
          'Demarcación gubernamental clara y título de propiedad único',
          'Excelente conectividad por autopista y acceso al transporte local',
          'Barrio residencial de lujo en rápido desarrollo'
        ],
        specsType: 'Terreno Residencial',
        specsPossession: 'Inmediata',
        specsFacing: 'Este'
      },
      de: {
        title: 'Grundstücke in Bhopalpani',
        location: 'Bhopalpani, Dehradun',
        description: 'Erstklassige Baugrundstücke mit einem außergewöhnlich gestalteten Layout, breiten Straßen und nahtlosem Zugang zum Hauptzentrum. Perfekt für den sofortigen Bau Ihres individuellen Feriendomizils oder Luxuswohnsitzes.',
        features: [
          '18 Fuß breite, gepflasterte Innenstraßen',
          'Ordentliches Grundstückslayout mit nummerierten visuellen Markierungen',
          'Klare staatliche Demarkation & Alleineigentumstitel',
          'Hervorragende Anbindung an die Autobahn und den Nahverkehr',
          'Schnell wachsendes, gehobenes Wohnviertel'
        ],
        specsType: 'Wohnbaugrundstück',
        specsPossession: 'Sofort',
        specsFacing: 'Osten'
      }
    }
  },
  {
    id: 3,
    slug: 'mg-residency',
    title: 'MG Residency Apartments',
    price: '₹65,00,000.00',
    status: 'Completed',
    location: 'Near Touch Wood School, Sahastradhara Road',
    description: 'Luxury 2 BHK & 3 BHK builder flats available for sale. Architecturally sound building near Touch Wood School featuring dedicated lifts, stilt parking, strict guard services, and modern elegant fitting styles.',
    features: [
      'State-of-the-art automatic passenger lift facility',
      'Spacious secure stilt parking with CCTV surveillance',
      'Dedicated guard room with 24/7 smart security',
      'Walking distance from public transport corridors',
      'Surrounded by premium schools, colleges, banks, and hospital facilities'
    ],
    contact: 'Contact Agent',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&h=600&fit=crop'
    ],
    specs: {
      type: 'Luxury Apartment',
      sizes: ['2 BHK (1250 Sq Ft)', '3 BHK (1800 Sq Ft)'],
      possession: 'Immediate',
      facing: 'North-East',
      bedrooms: 3,
      bathrooms: 3,
      parking: '1 Stilt Space',
      area: '1800 Sq Ft'
    },
    coordinates: [30.3475, 78.0772],
    floorPlanUrl: 'https://images.unsplash.com/photo-1545464693-f1798a373343?w=800&h=600&fit=crop',
    virtualTourUrl: 'https://my.matterport.com/show/?m=sxQGDh8m21N',
    brochureUrl: '#',
    translations: {
      es: {
        title: 'Apartamentos MG Residency',
        location: 'Sahastradhara Road, Dehradun',
        description: 'Pisos de lujo de 2 y 3 dormitorios disponibles para la venta. Edificio arquitectónicamente moderno cerca de Touch Wood School con ascensor dedicado, estacionamiento cubierto, seguridad y accesorios elegantes.',
        features: [
          'Ascensor automático de pasajeros de última generación',
          'Estacionamiento cubierto espacioso y seguro con vigilancia CCTV',
          'Cuarto de guardia dedicado con seguridad inteligente las 24 horas',
          'A poca distancia de los corredores de transporte público',
          'Rodeado de escuelas premium, colegios, bancos y hospitales'
        ],
        specsType: 'Apartamento de Lujo',
        specsPossession: 'Inmediata',
        specsFacing: 'Nordeste'
      },
      de: {
        title: 'MG Residency Apartments',
        location: 'Sahastradhara Road, Dehradun',
        description: 'Luxuriöse 2- und 3-Zimmer-Wohnungen zum Verkauf. Architektonisch anspruchsvolles Gebäude in der Nähe der Touch Wood School mit separatem Aufzug, Tiefgarage, Sicherheitsdienst und eleganten Oberflächen.',
        features: [
          'Modernste automatische Personenaufzugsanlage',
          'Geräumige, sichere Tiefgarage mit Videoüberwachung',
          'Eigener Wachraum mit intelligentem 24/7 Sicherheitsdienst',
          'Fußläufige Entfernung zu öffentlichen Verkehrsmitteln',
          'Umgeben von erstklassigen Schulen, Banken und medizinischen Einrichtungen'
        ],
        specsType: 'Luxusapartment',
        specsPossession: 'Sofort',
        specsFacing: 'Nordosten'
      }
    }
  },
  {
    id: 4,
    slug: 'jattowala',
    title: 'Jattowala Residency Plots',
    price: '₹17,000.00',
    status: 'Under Construction',
    location: 'Jattowala, Dehradun-Chandigarh Highway',
    description: 'High-yield residency plots available at Jattowala strategically located directly on the Dehradun-Chandigarh Expressway, plotted with wide 30ft, 40ft, and 50ft paved internal roads for master planning.',
    features: [
      'Located directly on the Dehradun-Chandigarh Highway',
      'Wide 30, 40, and 50 feet paved internal access roads',
      'Highly strategic geographic location with heavy appreciation forecast',
      'Superb regional and interstate highway connectivity'
    ],
    contact: 'Message User Name',
    videoLink: 'https://www.youtube.com/watch?v=IljspPrgaK4',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop'
    ],
    specs: {
      type: 'Residential Plot',
      sizes: ['100 Gaj', '150 Gaj', '200 Gaj', '250 Gaj'],
      possession: 'Immediate',
      facing: 'East',
      bedrooms: 'N/A',
      bathrooms: 'N/A',
      parking: 'Communal',
      area: '2000 Sq Ft'
    },
    coordinates: [30.4000, 77.8500],
    floorPlanUrl: 'https://images.unsplash.com/photo-1545464693-f1798a373343?w=800&h=600&fit=crop',
    virtualTourUrl: 'https://my.matterport.com/show/?m=sxQGDh8m21N',
    brochureUrl: '#',
    translations: {
      es: {
        title: 'Terrenos Residenciales Jattowala',
        location: 'Jattowala, Dehradun-Chandigarh Highway',
        description: 'Terrenos residenciales de alto rendimiento en Jattowala, ubicados estratégicamente directamente en la autopista Dehradun-Chandigarh, con calles pavimentadas de 30, 40 y 50 pies.',
        features: [
          'Ubicado directamente en la autopista Dehradun-Chandigarh',
          'Vías de acceso pavimentadas de 30, 40 y 50 pies de ancho',
          'Ubicación geográfica altamente estratégica con alta plusvalía',
          'Excelente conectividad vial regional e interestatal'
        ],
        specsType: 'Terreno Residencial',
        specsPossession: 'Inmediata',
        specsFacing: 'Este'
      },
      de: {
        title: 'Jattowala Baugrundstücke',
        location: 'Jattowala, Dehradun-Chandigarh Highway',
        description: 'Renditestarke Wohngrundstücke in Jattowala in strategischer Lage direkt an der Dehradun-Chandigarh-Schnellstraße, erschlossen mit breiten 30, 40 und 50 Fuß breiten gepflasterten Innenstraßen.',
        features: [
          'Liegt direkt an der Dehradun-Chandigarh-Autobahn',
          'Breite 30, 40 und 50 Fuß breite, gepflasterte Zufahrtsstraßen',
          'Äußerst strategische Lage mit hervorragender Wertzuwachsprognose',
          'Hervorragende Anbindung an das überregionale Autobahnnetz'
        ],
        specsType: 'Wohnbaugrundstück',
        specsPossession: 'Sofort',
        specsFacing: 'Osten'
      }
    }
  },
  {
    id: 5,
    slug: 'sahastradhara-heights',
    title: 'Sahastradhara Heights',
    price: '₹45,00,000.00',
    status: 'Under Construction',
    location: 'Sahastradhara Road, Dehradun',
    description: 'Breathtaking mountain view duplex plots nestled near the serene Sahastradhara waterfall valley. Plotted with private access, sweet mountain water supplies, and 24/7 security guard controls.',
    features: [
      'Stunning 360-degree Himalayan foothill views',
      'Sweet natural mineral water connection available',
      'Dedicated transformers for 24/7 electricity security',
      'Secure gated premium community entrance'
    ],
    contact: '+91 135 277 9000',
    images: [
      'https://images.unsplash.com/photo-1506974210756-8e1b8985d348?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop'
    ],
    specs: {
      type: 'Residential Plot',
      sizes: ['150 Gaj', '200 Gaj', '300 Gaj'],
      possession: 'Immediate',
      facing: 'North-East',
      bedrooms: 'N/A',
      bathrooms: 'N/A',
      parking: '2 Spaces',
      area: '2700 Sq Ft'
    },
    coordinates: [30.3547, 78.0862],
    floorPlanUrl: 'https://images.unsplash.com/photo-1545464693-f1798a373343?w=800&h=600&fit=crop',
    virtualTourUrl: 'https://my.matterport.com/show/?m=sxQGDh8m21N',
    brochureUrl: '#',
    translations: {
      es: {
        title: 'Alturas de Sahastradhara',
        location: 'Sahastradhara Road, Dehradun',
        description: 'Impresionantes parcelas dúplex con vista a la montaña cerca del sereno valle de la cascada Sahastradhara. Trazado con acceso privado, agua dulce de montaña y seguridad las 24 horas.',
        features: [
          'Impresionantes vistas de 360 grados de las colinas del Himalaya',
          'Conexión de agua mineral dulce de montaña disponible',
          'Transformadores dedicados para seguridad eléctrica las 24 horas',
          'Entrada comunitaria cerrada y segura'
        ],
        specsType: 'Terreno Residencial',
        specsPossession: 'Inmediata',
        specsFacing: 'Nordeste'
      },
      de: {
        title: 'Sahastradhara Heights',
        location: 'Sahastradhara Road, Dehradun',
        description: 'Atemberaubende Duplex-Grundstücke mit Bergblick in der Nähe des ruhigen Sahastradhara-Wasserfalltals. Geplant mit privatem Zugang, frischer Bergwasserversorgung und 24/7 Sicherheitsdiensten.',
        features: [
          'Atemberaubender 360-Grad-Blick auf die Ausläufer des Himalaya',
          'Süßwasser- und Mineralwasseranschluss vorhanden',
          'Eigene Transformatoren für 24/7 Stromversorgungssicherheit',
          'Sichere, bewachte Premium-Gemeinschaftseinfahrt'
        ],
        specsType: 'Wohnbaugrundstück',
        specsPossession: 'Sofort',
        specsFacing: 'Nordosten'
      }
    }
  },
  {
    id: 6,
    slug: 'doon-valley-retreat',
    title: 'Doon Valley Retreat',
    price: '₹25,00,000.00',
    status: 'Available',
    location: 'Dharmawala, Dehradun',
    description: 'Exclusive gated community plots surrounded by heritage mango orchards and lush green forests. Plotted with ultra-wide 30ft paved blacktop roads, municipal water connections, and clear individual registry title transfers.',
    features: [
      'Surrounded by heritage mango orchards',
      'Ultra-wide 30ft paved blacktop internal roads',
      '24/7 CCTV smart network surveillance and security guards',
      'Immediate property transfer and mutation transfer'
    ],
    contact: '+91 135 277 9000',
    images: [
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop'
    ],
    specs: {
      type: 'Residential Plot',
      sizes: ['150 Gaj', '200 Gaj', '250 Gaj'],
      possession: 'Immediate',
      facing: 'East',
      bedrooms: 'N/A',
      bathrooms: 'N/A',
      parking: '2 Spaces',
      area: '1800 Sq Ft'
    },
    coordinates: [30.4350, 77.7550],
    floorPlanUrl: 'https://images.unsplash.com/photo-1545464693-f1798a373343?w=800&h=600&fit=crop',
    virtualTourUrl: 'https://my.matterport.com/show/?m=sxQGDh8m21N',
    brochureUrl: '#',
    translations: {
      es: {
        title: 'Retiro del Valle del Doon',
        location: 'Dharmawala, Dehradun',
        description: 'Exclusivos terrenos comunitarios cerrados rodeados de huertos patrimoniales de mango y bosques verdes. Diseñado con calles pavimentadas anchas de 30 pies y conexión de agua municipal.',
        features: [
          'Rodeado de huertos tradicionales de mango',
          'Vías internas pavimentadas súper anchas de 30 pies',
          'Vigilancia inteligente las 24 horas y guardias de seguridad',
          'Transferencia de propiedad inmediata garantizada'
        ],
        specsType: 'Terreno Residencial',
        specsPossession: 'Inmediata',
        specsFacing: 'Este'
      },
      de: {
        title: 'Doon Valley Retreat',
        location: 'Dharmawala, Dehradun',
        description: 'Exklusive Grundstücke in geschlossener Wohnanlage, umgeben von alten Mango-Hainen und üppigen grünen Wäldern. Erschlossen mit 30 Fuß breiten asphaltierten Straßen und städtischem Wasseranschluss.',
        features: [
          'Umgeben von alten Mango-Hainen',
          'Extra breite, 30 Fuß gepflasterte Asphaltstraßen',
          '24/7 CCTV-Überwachung und Sicherheitsdienste',
          'Sofortige Grundbucheintragung garantiert'
        ],
        specsType: 'Wohnbaugrundstück',
        specsPossession: 'Sofort',
        specsFacing: 'Osten'
      }
    }
  }
];

export const PropertyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('kinash_properties');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const hasLegacyStatus = parsed.some((p: any) => p.id === 1 && p.status === 'Available');
        if (parsed.length < enrichedInitialProperties.length || hasLegacyStatus) {
          setProperties(enrichedInitialProperties);
          localStorage.setItem('kinash_properties', JSON.stringify(enrichedInitialProperties));
        } else {
          setProperties(parsed);
        }
      } catch (e) {
        setProperties(enrichedInitialProperties);
      }
    } else {
      setProperties(enrichedInitialProperties);
      localStorage.setItem('kinash_properties', JSON.stringify(enrichedInitialProperties));
    }
  }, []);

  const saveToStorage = (updated: Property[]) => {
    setProperties(updated);
    localStorage.setItem('kinash_properties', JSON.stringify(updated));
  };

  const addProperty = (newProp: Omit<Property, 'id'>) => {
    const nextId = properties.length > 0 ? Math.max(...properties.map(p => p.id)) + 1 : 1;
    const added: Property = {
      ...newProp,
      id: nextId,
      floorPlanUrl: 'https://images.unsplash.com/photo-1545464693-f1798a373343?w=800&h=600&fit=crop',
      virtualTourUrl: 'https://my.matterport.com/show/?m=sxQGDh8m21N',
      brochureUrl: '#'
    };
    const updated = [...properties, added];
    saveToStorage(updated);
  };

  const updateProperty = (updatedProp: Property) => {
    const updated = properties.map(p => (p.id === updatedProp.id ? updatedProp : p));
    saveToStorage(updated);
  };

  const deleteProperty = (id: number) => {
    const updated = properties.filter(p => p.id !== id);
    saveToStorage(updated);
  };

  const resetProperties = () => {
    saveToStorage(enrichedInitialProperties);
  };

  return (
    <PropertyContext.Provider value={{ properties, addProperty, updateProperty, deleteProperty, resetProperties }}>
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperties = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperties must be used within a PropertyProvider');
  }
  return context;
};
