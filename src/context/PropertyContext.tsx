'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Property } from '@/types/property';
import { demoProperties as enrichedInitialProperties } from '@/data/properties';
import { isSanityEnabled, fetchSanityProperties } from '@/lib/sanity';

export type { Property };

/**
 * - `demo`   → listings from src/data/properties.ts, editable in /admin (browser localStorage)
 * - `sanity` → listings fetched live from Sanity CMS, editable in Sanity Studio
 */
export type CmsMode = 'demo' | 'sanity';

interface PropertyContextType {
  properties: Property[];
  cmsMode: CmsMode;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  addProperty: (property: Omit<Property, 'id'>) => void;
  updateProperty: (property: Property) => void;
  deleteProperty: (id: number) => void;
  resetProperties: () => void;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

const STORAGE_KEY = 'apex_properties';

const loadLocalProperties = (): Property[] => {
  if (typeof window === 'undefined') {
    return enrichedInitialProperties;
  }
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(enrichedInitialProperties));
    return enrichedInitialProperties;
  }
  try {
    const parsed = JSON.parse(saved) as Property[];
    const hasLegacyStatus = parsed.some((p) => p.id === 1 && p.status === 'Available');
    const isMissingVideo = parsed.some((p) => !p.videoLink);
    if (parsed.length < enrichedInitialProperties.length || hasLegacyStatus || isMissingVideo) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(enrichedInitialProperties));
      return enrichedInitialProperties;
    }
    return parsed;
  } catch (e) {
    return enrichedInitialProperties;
  }
};

export const PropertyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const cmsMode: CmsMode = isSanityEnabled ? 'sanity' : 'demo';
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(cmsMode === 'sanity');
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (cmsMode === 'demo') {
      setProperties(loadLocalProperties());
      return;
    }
    setLoading(true);
    try {
      const remote = await fetchSanityProperties();
      setProperties(remote);
      setError(null);
    } catch (err) {
      // Network / CORS / wrong project ID → keep the site alive with demo listings.
      console.error('[Apex] Sanity fetch failed — falling back to demo listings.', err);
      setError(err instanceof Error ? err.message : 'Unable to reach Sanity');
      setProperties(enrichedInitialProperties);
    } finally {
      setLoading(false);
    }
  }, [cmsMode]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  // ---- Local (demo) CRUD. In Sanity mode, editing happens in Sanity Studio. ----
  const guardSanity = () => {
    if (cmsMode === 'sanity') {
      console.warn('[Apex] Listings are managed in Sanity Studio while Sanity mode is active.');
      return true;
    }
    return false;
  };

  const saveToStorage = (updated: Property[]) => {
    setProperties(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const addProperty = (newProp: Omit<Property, 'id'>) => {
    if (guardSanity()) return;
    const nextId = properties.length > 0 ? Math.max(...properties.map(p => p.id)) + 1 : 1;
    const added: Property = {
      ...newProp,
      id: nextId,
      floorPlanUrl: 'https://images.unsplash.com/photo-1545464693-f1798a373343?w=800&h=600&fit=crop',
      brochureUrl: '#'
    };
    saveToStorage([...properties, added]);
  };

  const updateProperty = (updatedProp: Property) => {
    if (guardSanity()) return;
    saveToStorage(properties.map(p => (p.id === updatedProp.id ? updatedProp : p)));
  };

  const deleteProperty = (id: number) => {
    if (guardSanity()) return;
    saveToStorage(properties.filter(p => p.id !== id));
  };

  const resetProperties = () => {
    if (guardSanity()) return;
    saveToStorage(enrichedInitialProperties);
  };

  return (
    <PropertyContext.Provider
      value={{ properties, cmsMode, loading, error, refresh, addProperty, updateProperty, deleteProperty, resetProperties }}
    >
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
