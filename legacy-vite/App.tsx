import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { Suspense, lazy } from "react";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";

import { LanguageProvider } from "./context/LanguageContext";
import { PropertyProvider } from "./context/PropertyContext";
import { ThemeProvider } from "./context/ThemeContext";
import { useState } from "react";
import LuxuryLoader from "./components/Loader/LuxuryLoader";

const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const ConstructionPage = lazy(() => import("./pages/ConstructionPage"));
const RealEstatePage = lazy(() => import("./pages/RealEstatePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const PropertyDetails = lazy(() => import("./pages/Property"));
const AllPropertyDetails = lazy(() => import("./pages/AllProperties"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));

const queryClient = new QueryClient();

const RouteFallback = () => (
  <div className="min-h-[70vh] flex items-center justify-center" role="status" aria-live="polite">
    <span className="w-10 h-10 border border-accent/30 border-t-accent rounded-full animate-spin" />
  </div>
);

const App = () => {
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
                <BrowserRouter>
                  <Layout>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/services" element={<Suspense fallback={<RouteFallback />}><ServicesPage /></Suspense>} />
                    <Route path="/construction" element={<Suspense fallback={<RouteFallback />}><ConstructionPage /></Suspense>} />
                    <Route path="/real-estate" element={<Suspense fallback={<RouteFallback />}><RealEstatePage /></Suspense>} />
                    <Route path="/about" element={<Suspense fallback={<RouteFallback />}><AboutPage /></Suspense>} />
                    <Route path="/property/:id" element={<Suspense fallback={<RouteFallback />}><PropertyDetails /></Suspense>} />
                    <Route path="/properties" element={<Suspense fallback={<RouteFallback />}><AllPropertyDetails /></Suspense>} />
                    <Route path="/admin" element={<Suspense fallback={<RouteFallback />}><AdminPage /></Suspense>} />
                    <Route path="/contact" element={<Suspense fallback={<RouteFallback />}><ContactPage /></Suspense>} />
                    {/* Catch-all Not Found Route */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Layout>
              </BrowserRouter>
            </TooltipProvider>
          </PropertyProvider>
        </LanguageProvider>
      </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
