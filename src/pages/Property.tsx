import React, { useState } from "react";
import { MapPin, CheckCircle, Phone, X, Share2, Heart, Eye, Calendar, Home, Bed, Bath, Car, ArrowLeft, Play, Camera, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import properties from "@/data/proprties";
import { useParams } from "react-router-dom";

// Helper: Get YouTube Embed URL
function getYouTubeEmbedUrl(link) {
  if (!link) return null;
  const match = link.match(/(?:v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}


// Helper: Check if it's a direct video file
function isDirectVideoFile(link) {
    if (!link) return false;
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi'];
    return videoExtensions.some(ext => link.toLowerCase().includes(ext));
}

// Button Component
const Button = ({ children, className = "", onClick, variant = "primary", disabled = false }) => {
    const baseClasses = "px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed";
    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl",
        secondary: "bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white shadow-md hover:shadow-lg",
        accent: "bg-orange-500 text-white hover:bg-orange-600 shadow-lg hover:shadow-xl"
    };

    return (
        <button
            className={`${baseClasses} ${variants[variant]} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default function PropertyDetails() {
    const { id } = useParams();
    const property = properties.find((p) => p.slug.toString() === id);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [isLiked, setIsLiked] = useState(false);

    console.log(property,"Props")
    if (!property) {
        return (
            <div className="container py-20 text-center">
                <h1 className="text-3xl font-bold text-red-500">Property Not Found</h1>
            </div>
        );
    }

   const youtubeUrl = getYouTubeEmbedUrl(property?.videoLink);
const isDirectVideo = isDirectVideoFile(property?.videoLink);
const hasVideo = !!youtubeUrl || isDirectVideo;

    const hasImages = property.images && property.images.length > 0;

    const nextImage = () => {
        if (hasImages) {
            setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
        }
    };

    const prevImage = () => {
        if (hasImages) {
            setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
        }
    };

    const goToImage = (index) => {
        setCurrentImageIndex(index);
    };

    return (
        <section className="min-h-screen bg-gray-50 py-6">
            {/* Navigation Header */}
            <div className="bg-white shadow-sm border-b sticky top-0 z-40 backdrop-blur-md bg-white/95">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => window.history.back()}
                            className="flex items-center hover:text-orange-500 transition-colors font-medium"
                        >
                            <ArrowLeft size={20} className="mr-2" />
                            Back to Properties
                        </button>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setIsLiked(!isLiked)}
                                className={`p-3 rounded-full transition-all duration-300 ${isLiked
                                    ? 'bg-red-100 text-red-500 scale-110'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105'
                                    }`}
                            >
                                <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
                            </button>
                            <button className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105 transition-all duration-300">
                                <Share2 size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2">

                        {/* Hero Media Section */}
                        <div className="mb-8">
                            {/* Video Section */}
                            {hasVideo && (
                                <div className="mb-6 rounded-2xl overflow-hidden shadow-2xl bg-black">
                                    <div className="relative aspect-video">
                                        {youtubeUrl ? (
                                            <iframe
                                                width="100%"
                                                height="100%"
                                                src={youtubeUrl}
                                                title={property.title}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                className="absolute inset-0 w-full h-full"
                                            ></iframe>
                                        ) : isDirectVideo ? (
                                            <video
                                                controls
                                                className="absolute inset-0 w-full h-full object-cover"
                                                poster="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=450&fit=crop"
                                            >
                                                <source src={property.videoLink} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        ) : null}
                                        <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center shadow-lg">
                                            <Play size={14} className="mr-2" />
                                            Property Tour
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Enhanced Image Gallery */}
                            {hasImages && (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl md:text-2xl font-bold text-blue-600 flex items-center">
                                            <Camera size={20} className="mr-2 md:mr-3" />
                                            Property Gallery ({property.images.length} Photos)
                                        </h3>
                                        <button
                                            onClick={() => setIsGalleryOpen(true)}
                                            className="flex items-center text-orange-500 hover:text-orange-600 font-medium transition-colors text-sm md:text-base"
                                        >
                                            <Maximize2 size={16}  className="mr-1 md:mr-2" />
                                            View All
                                        </button>
                                    </div>

                                    {/* Main Image Display */}
                                    <div className="relative rounded-2xl overflow-hidden shadow-xl bg-gray-200 group">
                                        <div className="aspect-video relative">
                                            <img
                                                src={property.images[currentImageIndex]}
                                                alt={`Property Image ${currentImageIndex + 1}`}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                onError={(e) => {
                                                    e.target.src = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop';
                                                }}
                                            />

                                            {/* Navigation Arrows */}
                                            {property.images.length > 1 && (
                                                <>
                                                    <button
                                                        onClick={prevImage}
                                                        className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 md:p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                                                    >
                                                        <ChevronLeft size={16}  />
                                                    </button>
                                                    <button
                                                        onClick={nextImage}
                                                        className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 md:p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                                                    >
                                                        <ChevronRight size={16}  />
                                                    </button>
                                                </>
                                            )}

                                            {/* Image Counter */}
                                            <div className="absolute bottom-2 md:bottom-4 right-2 md:right-4 bg-black/70 text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium">
                                                {currentImageIndex + 1} / {property.images.length}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Thumbnail Navigation */}
                                    {property.images.length > 1 && (
                                        <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2">
                                            {property.images.map((img, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => goToImage(idx)}
                                                    className={`relative flex-shrink-0 w-16 md:w-20 h-12 md:h-16 rounded-lg md:rounded-xl overflow-hidden transition-all duration-300 ${currentImageIndex === idx
                                                        ? 'ring-2 md:ring-3 ring-blue-600 ring-offset-1 md:ring-offset-2 scale-105'
                                                        : 'hover:scale-105 opacity-70 hover:opacity-100'
                                                        }`}
                                                >
                                                    <img
                                                        src={img}
                                                        alt={`Thumbnail ${idx + 1}`}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            e.target.src = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=200&h=150&fit=crop';
                                                        }}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Property Header */}
                        <div className="mb-8 p-6 md:p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
                            <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 gap-4">
                                <div className="flex-1">
                                    <span className={`inline-block px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-bold mb-3 md:mb-4 ${property.status.includes("SOLD")
                                        ? "bg-red-100 text-red-600 border border-red-200"
                                        : "bg-green-100 text-green-600 border border-green-200"
                                        }`}>
                                        {property.status}
                                    </span>
                                    <h1 className="text-2xl md:text-4xl lg:text-3xl font-bold text-gray-800 mb-3 leading-tight">{property.title}</h1>
                                    <div className="flex items-center text-gray-600 mb-4">
                                        <MapPin size={18} className="mr-2 md:mr-3 text-orange-500 flex-shrink-0" />
                                        <span className="text-lg md:text-xl">{property.location}</span>
                                    </div>
                                </div>
                                <div className="text-center md:text-right bg-gradient-to-br from-blue-50 to-orange-50 p-4 md:p-6 rounded-2xl border border-blue-100">
                                    <div className="text-xl md:text-2xl font-bold text-blue-600 mb-1">{property.price}</div>
                                    <div className="text-xs md:text-sm text-gray-500 font-medium">Per Gaj</div>
                                </div>
                            </div>
                        </div>

                        {/* Enhanced Tabs Navigation */}
                        <div className="mb-6">
                            <div className="flex border-b border-gray-200 bg-background rounded-t-2xl shadow-lg overflow-x-auto">
                                {[
                                    { id: 'overview', label: 'Overview', icon: Home },
                                    { id: 'features', label: 'Features', icon: CheckCircle },
                                    { id: 'specifications', label: 'Specifications', icon: Calendar }
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`px-4 md:px-8 py-4 md:py-5 font-semibold transition-all duration-300 flex items-center whitespace-nowrap ${activeTab === tab.id
                                            ? 'text-accent border-b-3 border-x-white border-x-2 bg-primary-glow'
                                            : 'text-gray-600 hover:text-accent-glow hover:bg-primary-glow'
                                            }`}
                                    >
                                        <tab.icon size={16} className="mr-1 md:mr-2" />
                                        <span className="text-sm md:text-base">{tab.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Enhanced Tab Content */}
                        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 border border-gray-100">
                            {activeTab === 'overview' && (
                                <div className="space-y-6 md:space-y-8">
                                    <div>
                                        <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-800 flex items-center">
                                            <div className="w-1 h-6 md:h-8 bg-blue-600 rounded-full mr-3 md:mr-4"></div>
                                            Property Description
                                        </h2>
                                        <p className="text-gray-700 leading-relaxed text-base md:text-lg bg-gray-50 p-4 md:p-6 rounded-xl border-l-4 border-blue-600">
                                            {property.description}
                                        </p>
                                    </div>

                                    {property?.specs && (
                                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 md:p-6 rounded-2xl text-center border border-blue-200 hover:shadow-lg transition-shadow duration-300">
                                                <Home className="mx-auto mb-2 md:mb-3 text-blue-600" size={24}  />
                                                <div className="font-bold text-gray-800 text-sm md:text-lg">{property?.specs?.type}</div>
                                                <div className="text-xs md:text-sm text-gray-600 font-medium">Property Type</div>
                                            </div>
                                            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 md:p-6 rounded-2xl text-center border border-green-200 hover:shadow-lg transition-shadow duration-300">
                                                <Calendar className="mx-auto mb-2 md:mb-3 text-green-600" size={24} />
                                                <div className="font-bold text-gray-800 text-sm md:text-lg">{property?.specs?.possession}</div>
                                                <div className="text-xs md:text-sm text-gray-600 font-medium">Possession</div>
                                            </div>
                                            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 md:p-6 rounded-2xl text-center border border-orange-200 hover:shadow-lg transition-shadow duration-300">
                                                <MapPin className="mx-auto mb-2 md:mb-3 text-orange-600" size={24} />
                                                <div className="font-bold text-gray-800 text-sm md:text-lg">{property?.specs?.facing}</div>
                                                <div className="text-xs md:text-sm text-gray-600 font-medium">Facing</div>
                                            </div>
                                            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 md:p-6 rounded-2xl text-center border border-purple-200 hover:shadow-lg transition-shadow duration-300">
                                                <div className="text-2xl md:text-3xl font-bold text-purple-600 mb-2">{property?.specs?.sizes.length}</div>
                                                <div className="text-xs md:text-sm text-gray-600 font-medium">Size Options</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'features' && (
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-gray-800 flex items-center">
                                        <div className="w-1 h-6 md:h-8 bg-blue-600 rounded-full mr-3 md:mr-4"></div>
                                        Property Features
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                        {property.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-start p-4 md:p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300 hover:scale-102">
                                                <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-500 mr-3 md:mr-4 mt-0.5 flex-shrink-0" />
                                                <span className="text-gray-800 leading-relaxed font-medium text-sm md:text-base">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'specifications' && (
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-gray-800 flex items-center">
                                        <div className="w-1 h-6 md:h-8 bg-blue-600 rounded-full mr-3 md:mr-4"></div>
                                        Technical Specifications
                                    </h2>
                                    <div className="space-y-4 md:space-y-6">
                                        <div className="border border-gray-200 rounded-2xl p-4 md:p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
                                            <h4 className="font-bold text-gray-800 mb-3 md:mb-4 text-base md:text-lg">Available Plot Sizes</h4>
                                            <div className="flex flex-wrap gap-2 md:gap-3">
                                                {property.specs.sizes.map((size, idx) => (
                                                    <span key={idx} className="bg-blue-600 text-white px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium shadow-md hover:shadow-lg transition-shadow duration-300">
                                                        {size}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="border border-gray-200 rounded-2xl p-4 md:p-6 bg-gradient-to-r from-green-50 to-emerald-50">
                                            <h4 className="font-bold text-gray-800 mb-3 text-base md:text-xl">Property Type</h4>
                                            <p className="text-gray-700 text-base md:text-lg">{property?.specs?.type}</p>
                                        </div>
                                        <div className="border border-gray-200 rounded-2xl p-4 md:p-6 bg-gradient-to-r from-orange-50 to-red-50">
                                            <h4 className="font-bold text-gray-800 mb-3 text-base md:text-xl">Possession Status</h4>
                                            <p className="text-gray-700 text-base md:text-lg">{property?.specs?.possession}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Contact & Info */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">

                            {/* Enhanced Contact Card */}
                            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
                                <div className="space-y-4 md:space-y-6">
                                    <div className="flex items-center p-3 md:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                                        <Phone className="text-blue-600 mr-3 md:mr-4 flex-shrink-0" size={20}  />
                                        <div>
                                            <div className="font-bold text-gray-800 text-base md:text-lg">{property.contact}</div>
                                            <div className="text-xs md:text-sm text-gray-600">Primary Contact</div>
                                        </div>
                                    </div>

                                    <Button className="w-full text-sm md:text-base py-2" variant="primary">
                                        <Phone size={18}  className="mr-2 md:mr-3" />
                                        Call Now
                                    </Button>

                                    <Button className="w-full text-sm md:text-base py-2" variant="secondary">
                                        Send Message
                                    </Button>

                                    <Button className="w-full text-sm md:text-base py-2" variant="accent">
                                        Schedule Visit
                                    </Button>
                                </div>
                            </div>

                            {/* Enhanced Property Highlights */}
                            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
                                <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-800">Key Highlights</h3>
                                <div className="space-y-3 md:space-y-4">
                                    {[
                                        "Prime Highway Location",
                                        "All Basic Amenities",
                                        "Clear Title & Registry",
                                        "Immediate Possession"
                                    ].map((highlight, idx) => (
                                        <div key={idx} className="flex items-center text-gray-700 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300">
                                            <div className="w-2 h-2 md:w-3 md:h-3 bg-orange-500 rounded-full mr-3 md:mr-4 flex-shrink-0"></div>
                                            <span className="font-medium text-sm md:text-base">{highlight}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced Full Screen Gallery Modal */}
            {isGalleryOpen && hasImages && (
                <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50">
                    <div className="relative w-full h-full flex items-center justify-center p-4">
                        {/* Close Button */}
                        <button
                            className="absolute top-4 md:top-6 right-4 md:right-6 text-white hover:text-gray-300 bg-black/50 rounded-full p-2 md:p-3 z-10 transition-all duration-300 hover:bg-black/70"
                            onClick={() => setIsGalleryOpen(false)}
                        >
                            <X size={24}  />
                        </button>

                        {/* Navigation Buttons */}
                        {property.images.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute left-4 md:left-6 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 bg-black/50 hover:bg-black/70 rounded-full p-3 md:p-4 transition-all duration-300 z-10"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-4 md:right-6 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 bg-black/50 hover:bg-black/70 rounded-full p-3 md:p-4 transition-all duration-300 z-10"
                                >
                                    <ChevronRight size={24}  />
                                </button>
                            </>
                        )}

                        {/* Main Image */}
                        <img
                            src={property.images[currentImageIndex]}
                            alt={`Property Image ${currentImageIndex + 1}`}
                            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                            onError={(e) => {
                                e.target.src = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=800&fit=crop';
                            }}
                        />

                        {/* Image Counter */}
                        <div className="absolute bottom-16 md:bottom-6 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 md:px-6 py-2 md:py-3 rounded-full font-medium text-sm md:text-base">
                            {currentImageIndex + 1} / {property.images.length}
                        </div>

                        {/* Thumbnail Strip */}
                        <div className="absolute bottom-4 md:bottom-20 left-1/2 transform -translate-x-1/2 flex gap-1 md:gap-2 max-w-xs md:max-w-md overflow-x-auto">
                            {property.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => goToImage(idx)}
                                    className={`flex-shrink-0 w-12 h-8 md:w-16 md:h-12 rounded-md md:rounded-lg overflow-hidden border-2 transition-all duration-300 ${currentImageIndex === idx
                                        ? 'border-white scale-110'
                                        : 'border-transparent opacity-60 hover:opacity-100'
                                        }`}
                                >
                                    <img
                                        src={img}
                                        alt={`Thumbnail ${idx + 1}`}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.src = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=200&h=150&fit=crop';
                                        }}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}