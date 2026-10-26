'use client';

import React, { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from "@/context/LanguageContext";
import { PropertyProvider } from "@/context/PropertyContext";
import { ThemeProvider } from "@/context/ThemeContext";
import LuxuryLoader from "@/components/Loader/LuxuryLoader";
import Layout from "@/components/Layout/Layout";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [loading, setLoading] = useState(true);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <LanguageProvider>
            <PropertyProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                {loading && <LuxuryLoader onComplete={() => setLoading(false)} />}
                <Layout>
                  {children}
                </Layout>
              </TooltipProvider>
            </PropertyProvider>
          </LanguageProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}
