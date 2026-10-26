'use client';

import { ExternalLink, RefreshCw, Database, MapPin, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProperties } from '@/context/PropertyContext';
import { useLanguage } from '@/context/LanguageContext';
import { sanityStudioUrl } from '@/lib/sanity';
import { formatPrice } from '@/lib/currency';
import { toast } from 'sonner';

/**
 * Shown at /admin when VITE_SANITY_PROJECT_ID is configured.
 * Listings are read-only here — editing happens securely inside Sanity Studio,
 * so no write token is ever exposed to the browser.
 */
export default function SanityAdminPanel() {
  const { properties, loading, error, refresh } = useProperties();
  const { currency } = useLanguage();

  const studioLink = (sanityId?: string) =>
    sanityStudioUrl && sanityId
      ? `${sanityStudioUrl.replace(/\/$/, '')}/structure/property;${sanityId}`
      : sanityStudioUrl;

  const handleRefresh = async () => {
    await refresh();
    toast.success('Listings re-synced from Sanity');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <header className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-accent font-semibold mb-3 block">
            Content Management
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-extrabold text-white mb-6">
            Sanity CMS Connected
          </h1>
          <p className="text-lg text-white/60 leading-relaxed font-light">
            Your listings are served live from Sanity. Add, edit, publish and upload photos in
            Sanity Studio — changes appear on the site within about a minute.
          </p>
        </header>

        {/* Status strip */}
        <section
          aria-label="CMS status"
          className="border border-white/10 bg-[#0a0c10] p-6 md:p-8 mb-10 flex flex-col md:flex-row md:items-center gap-6 justify-between"
        >
          <div className="flex items-start gap-4">
            {error ? (
              <AlertTriangle className="text-amber-400 shrink-0 mt-1" size={22} aria-hidden />
            ) : (
              <CheckCircle2 className="text-accent shrink-0 mt-1" size={22} aria-hidden />
            )}
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-white/50 mb-1">
                {error ? 'Connection issue — showing demo listings' : 'Live dataset'}
              </p>
              <p className="text-white font-display text-xl">
                {loading ? 'Syncing…' : `${properties.length} published ${properties.length === 1 ? 'listing' : 'listings'}`}
              </p>
              {error && (
                <p className="text-sm text-white/60 mt-2 max-w-xl">
                  {error}. Check your project ID, dataset name, and that this site's URL is added under
                  CORS origins at sanity.io/manage.
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              id="sanity-refresh"
              onClick={handleRefresh}
              disabled={loading}
              className="bg-white/5 hover:bg-white/10 text-white border border-white/15 rounded-none px-5"
            >
              <RefreshCw size={15} className={`mr-2 ${loading ? 'animate-spin' : ''}`} aria-hidden />
              Re-sync
            </Button>
            {sanityStudioUrl ? (
              <Button asChild className="bg-accent text-black hover:bg-accent/90 rounded-none px-5 font-semibold">
                <a id="sanity-open-studio" href={sanityStudioUrl} target="_blank" rel="noopener noreferrer">
                  <Database size={15} className="mr-2" aria-hidden />
                  Open Sanity Studio
                  <ExternalLink size={13} className="ml-2 opacity-70" aria-hidden />
                </a>
              </Button>
            ) : (
              <p className="text-xs text-white/50 font-mono max-w-xs">
                Set <code className="text-accent">VITE_SANITY_STUDIO_URL</code> to show a direct Studio link.
              </p>
            )}
          </div>
        </section>

        {/* Listings */}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((p) => (
            <li
              key={p.sanityId ?? p.id}
              className="group border border-white/10 bg-[#0a0c10] overflow-hidden transition-colors hover:border-accent/50"
            >
              <div className="relative h-44 bg-white/5 overflow-hidden">
                <img
                  loading="lazy"
                  decoding="async"
                  src={p.images?.[0]}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 bg-black/70 text-accent text-[10px] font-mono uppercase tracking-widest px-2.5 py-1">
                  {p.status}
                </span>
              </div>
              <div className="p-5">
                <p className="flex items-center text-xs text-white/50 mb-2">
                  <MapPin size={12} className="mr-1 text-accent" aria-hidden />
                  {p.location}
                </p>
                <h2 className="font-display font-semibold text-lg text-white mb-1 line-clamp-1">{p.title}</h2>
                <p className="text-white/80 mb-4">{formatPrice(p.price, currency.code)}</p>
                {studioLink(p.sanityId) && (
                  <a
                    href={studioLink(p.sanityId)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs font-mono uppercase tracking-widest text-accent hover:text-white transition-colors"
                  >
                    Edit in Studio <ExternalLink size={12} className="ml-1.5" aria-hidden />
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
