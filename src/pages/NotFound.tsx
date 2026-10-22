import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Home } from "lucide-react";
import SEOHead from "@/components/SEO/SEOHead";
import { useLanguage } from "@/context/LanguageContext";

const NotFound = () => {
  const location = useLocation();
  const { content } = useLanguage();
  const copy = content.notFound;

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#0c0d10] text-white pt-28 pb-20 flex items-center">
      <SEOHead
        title={copy.meta.title}
        description={copy.meta.description}
        keywords={copy.meta.keywords}
        canonical={location.pathname}
      />
      <div className="container mx-auto px-4 md:px-8 text-center max-w-2xl">
        <span className="text-[9px] uppercase tracking-[0.3em] text-accent font-mono font-bold block mb-6">
          {copy.eyebrow}
        </span>
        <p className="text-[88px] sm:text-[140px] leading-none font-display font-light text-white/10 select-none mb-2">
          404
        </p>
        <h1 className="text-3xl sm:text-4xl font-display font-medium text-white mb-4 [text-wrap:balance]">
          {copy.title}
        </h1>
        <p className="text-sm text-white/55 font-light leading-relaxed mb-10 max-w-md mx-auto">
          {copy.body}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/"
            className="btn-luxury-gold inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4"
          >
            <Home size={14} />
            {copy.primary}
          </Link>
          <Link
            to="/properties"
            className="btn-luxury-outline inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4"
          >
            <ArrowLeft size={14} />
            {copy.secondary}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
