import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Search:', searchQuery, 'Location:', location);
  };

  return (
    <form onSubmit={handleSearch} className="search-enhanced max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        <div className="md:col-span-5">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <input
              type="text"
              placeholder="Search properties, projects, or services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-transparent border-0 text-lg placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
        </div>
        
        <div className="md:col-span-1 hidden md:block">
          <div className="h-8 border-l border-border mx-4"></div>
        </div>
        
        <div className="md:col-span-4">
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-transparent border-0 text-lg placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
        </div>
        
        <div className="md:col-span-2">
          <Button 
            type="submit" 
            className="btn-hero w-full py-4 text-lg font-semibold"
          >
            Search
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;