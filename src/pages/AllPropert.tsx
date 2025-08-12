"use client";
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { MapPin, Phone, CheckCircle, Search, Filter, Heart, Share2, Eye, Home, Users, Car, Bath, Bed } from "lucide-react";
import properties from "@/data/proprties";
// Mock data for demonstration


export default function AllProperties() {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [maxPrice, setMaxPrice] = useState(20000000);
    const [showFilters, setShowFilters] = useState(false);

    const filtered = properties.filter((p) => {
        const priceNum = parseInt(p?.price.replace(/[₹,]/g, "")) || 0;
        const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                             p.location.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = !status || status === "all" || p?.status?.toLowerCase().includes(status.toLowerCase());
        const matchesPrice = priceNum <= maxPrice;
        
        return matchesSearch && matchesStatus && matchesPrice;
    });

    const clearFilters = () => {
        setSearch("");
        setStatus("");
        setMaxPrice(20000000);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-6 sm:py-12">
                {/* Header Section */}
                <div className="text-center mb-8 sm:mb-12">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary mb-4">
                        Premium Properties
                    </h1>
                    <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                        Discover your dream home with our curated collection of premium properties. 
                        Advanced search and filtering to find exactly what you're looking for.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                            <Home size={16} className="text-primary" />
                            {properties.length} Properties Listed
                        </span>
                        <span className="flex items-center gap-1">
                            <CheckCircle size={16} className="text-green-500" />
                            Verified Listings
                        </span>
                        <span className="flex items-center gap-1">
                            <Users size={16} className="text-blue-500" />
                            Trusted Agents
                        </span>
                    </div>
                </div>

                {/* Search and Filters Section */}
                <div className="bg-white shadow-lg rounded-2xl border border-gray-100 mb-8 overflow-hidden">
                    {/* Search Bar */}
                    <div className="p-4 sm:p-6 border-b border-gray-100">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <Input
                                placeholder="Search by property name, location, or area..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-12 pr-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:border-primary transition-colors"
                            />
                        </div>
                    </div>

                    {/* Filters Toggle Button (Mobile) */}
                    <div className="block sm:hidden px-4 py-3 border-b border-gray-100">
                        <Button
                            variant="outline"
                            onClick={() => setShowFilters(!showFilters)}
                            className="w-full justify-center gap-2"
                        >
                            <Filter size={16} />
                            {showFilters ? "Hide Filters" : "Show Filters"}
                        </Button>
                    </div>

                    {/* Filters */}
                    <div className={`p-4 sm:p-6 transition-all duration-300 ${showFilters ? 'block' : 'hidden sm:block'}`}>
                        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                            {/* Status Filter */}
                            <div>
                                <label className="text-sm font-semibold text-gray-700 mb-2 block">Property Status</label>
                                <Select value={status} onValueChange={(value) => setStatus(value)}>
                                    <SelectTrigger className="w-full border-2 border-gray-200 rounded-lg">
                                        <SelectValue placeholder="All Properties" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Properties</SelectItem>
                                        <SelectItem value="available">Available</SelectItem>
                                        <SelectItem value="sold">Sold</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Price Range */}
                            <div className="sm:col-span-2">
                                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                                    Max Budget: <span className="text-primary font-bold">₹{(maxPrice/100000).toFixed(0)} Lakh</span>
                                </label>
                                <div className="px-2">
                                    <Slider
                                        value={[maxPrice]}
                                        max={20000000}
                                        min={1000000}
                                        step={500000}
                                        onValueChange={(val) => setMaxPrice(val[0])}
                                        className="w-full"
                                    />
                                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                                        <span>₹10L</span>
                                        <span>₹2Cr</span>
                                    </div>
                                </div>
                            </div>

                            {/* Clear Filters */}
                            <div className="flex items-end">
                                <Button
                                    variant="outline"
                                    onClick={clearFilters}
                                    className="w-full border-2 border-gray-200 hover:border-primary"
                                >
                                    Clear All
                                </Button>
                            </div>
                        </div>

                        {/* Results Summary */}
                        <div className="mt-4 pt-4 border-t border-gray-100">
                            <p className="text-sm text-gray-600">
                                Showing <span className="font-semibold text-primary">{filtered.length}</span> of{" "}
                                <span className="font-semibold">{properties.length}</span> properties
                                {(search || status || maxPrice < 20000000) && (
                                    <span className="text-gray-500"> (filtered)</span>
                                )}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Properties Grid */}
                {filtered.length > 0 ? (
                    <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                        {filtered.map((property) => (
                            <Card
                                key={property.id}
                                className="group h-full flex flex-col hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 border-0 shadow-lg rounded-2xl overflow-hidden bg-white"
                            >
                                {/* Image Section */}
                                <div className="relative h-48 sm:h-56 overflow-hidden">
                                    <img
                                        src={property.images?.[0] || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop"}
                                        alt={property.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                    
                                    {/* Status Badge */}
                                    <div
                                        className={`absolute top-3 left-3 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg ${
                                            property.status.toLowerCase().includes("sold")
                                                ? "bg-red-500 text-white"
                                                : "bg-green-500 text-white"
                                        }`}
                                    >
                                        {property.status}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <Button size="sm" variant="secondary" className="p-2 h-8 w-8 bg-white/90 hover:bg-white">
                                            <Heart size={12} />
                                        </Button>
                                        <Button size="sm" variant="secondary" className="p-2 h-8 w-8 bg-white/90 hover:bg-white">
                                            <Share2 size={12} />
                                        </Button>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <CardHeader className="pb-3">
                                    <div className="flex items-center text-gray-500 mb-2">
                                        <MapPin size={14} className="mr-1 text-primary" />
                                        <span className="text-sm">{property.location}</span>
                                    </div>
                                    <CardTitle className="text-lg sm:text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors leading-tight">
                                        {property.title}
                                    </CardTitle>
                                    <div className="flex items-center justify-between">
                                        <p className="text-2xl sm:text-3xl font-bold text-primary">{property.price}</p>
                                        <div className="flex items-center gap-1 text-xs text-gray-500">
                                            <Eye size={12} />
                                            <span>127 views</span>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="flex-1 space-y-4">
                                    {/* Property Specs */}
                                    <div className="grid grid-cols-4 gap-2 p-3 bg-gray-50 rounded-lg">
                                        <div className="text-center">
                                            <Bed size={16} className="mx-auto mb-1 text-primary" />
                                            <div className="text-xs font-semibold">{property.specs?.bedrooms}</div>
                                            <div className="text-xs text-gray-500">Beds</div>
                                        </div>
                                        <div className="text-center">
                                            <Bath size={16} className="mx-auto mb-1 text-primary" />
                                            <div className="text-xs font-semibold">{property.specs?.bathrooms}</div>
                                            <div className="text-xs text-gray-500">Baths</div>
                                        </div>
                                        <div className="text-center">
                                            <Car size={16} className="mx-auto mb-1 text-primary" />
                                            <div className="text-xs font-semibold">{property.specs?.parking}</div>
                                            <div className="text-xs text-gray-500">Parking</div>
                                        </div>
                                        <div className="text-center">
                                            <Home size={16} className="mx-auto mb-1 text-primary" />
                                            <div className="text-xs font-semibold">{property.specs?.area?.split(' ')[0]}</div>
                                            <div className="text-xs text-gray-500">Sq Ft</div>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-base font-semibold  line-clamp-2 leading-relaxed">
                                        {property.description}
                                    </p>

                                    {/* Features */}
                                    <div className="space-y-1">
                                        {property.features?.slice(0, 2).map((feature, i) => (
                                            <div key={i} className="flex items-center">
                                                <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                                                <span className="text-base text-gray-600 line-clamp-1">{feature}</span>
                                            </div>
                                        ))}
                                        {property.features?.length > 2 && (
                                            <div className="text-base text-primary font-medium">
                                                +{property.features.length - 2} more amenities
                                            </div>
                                        )}
                                    </div>
                                </CardContent>

                                {/* Footer */}
                                <CardFooter className="flex flex-col gap-3 border-t border-gray-100 pt-4">
                                    <div className="flex gap-2 w-full">
                                        <Button  onClick={() => (window.location.href = `/property/${property.slug}`)} className="flex-1 bg-primary text-white hover:bg-primary/90 rounded-lg py-2.5 font-semibold">
                                            View Details
                                        </Button>
                                        <Button variant="outline" size="icon" className="rounded-lg border-2">
                                            <Phone size={16} />
                                        </Button>
                                    </div>
                                       <div className="text-sm font-bold mt-auto">
                                        Contact: <span className="text-sm text-card-foreground font-normal">{property.contact}</span>
                                    </div>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                ) : (
                    /* No Results Found */
                    <div className="text-center py-16 px-4">
                        <div className="max-w-md mx-auto">
                            <div className="mb-6">
                                <Home size={64} className="mx-auto text-gray-300 mb-4" />
                                <h3 className="text-2xl font-bold text-gray-700 mb-2">No Properties Found</h3>
                                <p className="text-gray-500 text-base leading-relaxed">
                                    We couldn't find any properties matching your search criteria. 
                                    Try adjusting your filters or search terms.
                                </p>
                            </div>
                            
                            <div className="space-y-3">
                                <h4 className="text-sm font-semibold text-gray-600">Try these suggestions:</h4>
                                <ul className="text-sm text-gray-500 space-y-1">
                                    <li>• Check your spelling and try again</li>
                                    <li>• Use broader search terms</li>
                                    <li>• Increase your budget range</li>
                                    <li>• Clear all filters and start fresh</li>
                                </ul>
                            </div>

                            <div className="mt-8 space-y-3">
                                <Button 
                                    onClick={clearFilters}
                                    className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg font-semibold"
                                >
                                    Clear All Filters
                                </Button>
                                <div className="text-xs text-gray-400">
                                    or browse all {properties.length} available properties
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Load More Button (for pagination simulation) */}
                {filtered.length > 0 && filtered.length >= 6 && (
                    <div className="text-center mt-12">
                        <Button 
                            variant="outline" 
                            className="px-8 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-lg font-semibold transition-colors"
                        >
                            Load More Properties
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}