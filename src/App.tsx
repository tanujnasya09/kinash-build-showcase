import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import ConstructionPage from "./pages/ConstructionPage";
import RealEstatePage from "./pages/RealEstatePage";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";
import PropertyDetails from "./pages/Property";
import AllPropertyDetails from "./pages/AllPropert";
import AdminPage from "./pages/AdminPage";
import ContactPage from "./pages/ContactPage";

// Import our custom context providers for global properties CMS and language support
import { LanguageProvider } from "./context/LanguageContext";
import { PropertyProvider } from "./context/PropertyContext";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <PropertyProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Layout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/construction" element={<ConstructionPage />} />
                  <Route path="/real-estate" element={<RealEstatePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/property/:id" element={<PropertyDetails />} />
                  <Route path="/properties" element={<AllPropertyDetails />} />
                  <Route path="/admin" element={<AdminPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  {/* Catch-all Not Found Route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Layout>
            </BrowserRouter>
          </TooltipProvider>
        </PropertyProvider>
      </LanguageProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
