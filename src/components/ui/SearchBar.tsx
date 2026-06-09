import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MagneticButton from '@/components/ui/MagneticButton';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.append('search', searchQuery);
    if (location) params.append('location', location);
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <form 
      onSubmit={handleSearch} 
      className="w-full bg-[#0a0c10]/60 border border-white/10 p-3 shadow-[0_30px_60px_rgba(0,0,0,0.4)] backdrop-blur-md relative"
    >
      {/* Editorial corner bracket accents for architectural feel */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent/40" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-accent/40" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-accent/40" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-accent/40" />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Search Query Input */}
        <div className="md:col-span-5 relative">
          <label className="absolute top-[-8px] left-3 bg-[#0c0d10] px-1.5 font-mono text-[7px] text-accent/60 uppercase tracking-widest select-none">
            Find Registry / Plot
          </label>
          <div className="flex items-center mt-1">
            <Search className="text-accent/60 ml-3 flex-shrink-0" size={14} />
            <input
              type="text"
              placeholder="E.g. Sahastradhara Road, Dharmawala..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-3.5 pr-2 py-3 bg-transparent border-0 text-xs text-white placeholder:text-white/30 focus:outline-none"
            />
          </div>
        </div>

        {/* Divider line */}
        <div className="md:col-span-1 hidden md:flex justify-center items-center">
          <div className="h-8 border-l border-white/10"></div>
        </div>

        {/* Location Input */}
        <div className="md:col-span-4 relative">
          <label className="absolute top-[-8px] left-3 bg-[#0c0d10] px-1.5 font-mono text-[7px] text-accent/60 uppercase tracking-widest select-none">
            Region Selection
          </label>
          <div className="flex items-center mt-1">
            <MapPin className="text-accent/60 ml-3 flex-shrink-0" size={14} />
            <input
              type="text"
              placeholder="Dehradun, Sahastradhara..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-3.5 pr-2 py-3 bg-transparent border-0 text-xs text-white placeholder:text-white/30 focus:outline-none"
            />
          </div>
        </div>

        {/* Submit Action */}
        <div className="md:col-span-2 flex justify-end">
          <MagneticButton
            type="submit"
            className="w-full btn-luxury-gold bg-accent text-[#0c0d10] border-transparent font-bold py-3.5 text-[9px] tracking-widest uppercase hover:bg-accent-glow"
            strength={15}
          >
            Search
          </MagneticButton>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;