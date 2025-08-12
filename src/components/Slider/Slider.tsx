import React from "react";
import Slider from "react-slick";
import { Building, MapPin, CheckCircle, Phone, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"; // shadcn button

// Custom Next Arrow
function NextArrow(props) {
    const { onClick } = props;
    return (
        <Button
            variant="default"
            size="icon"
            onClick={onClick}
            className="absolute right-[-40px] top-1/2 -translate-y-1/2 rounded-full shadow-lg z-10"
        >
            <ChevronRight className="h-5 w-5" />
        </Button>
    );
}

// Custom Prev Arrow
function PrevArrow(props) {
    const { onClick } = props;
    return (
        <Button
            variant="default"
            size="icon"
            onClick={onClick}
            className="absolute left-[-40px] top-1/2 -translate-y-1/2 rounded-full shadow-lg z-10"
        >
            <ChevronLeft className="h-5 w-5" />
        </Button>
    );
}

export default function PropertySlider({ properties }) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 2, slidesToScroll: 1 }
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 1, slidesToScroll: 1 }
            }
        ]
    };


    return (
        <section className="py-10 bg-background relative">
            <div className="container mx-auto px-4">
                {/* Title */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">
                        Featured Properties
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Premium plots and flats in Dehradun's most desirable locations with excellent connectivity and modern amenities.
                    </p>
                </div>

                {/* Slider */}
                <Slider {...settings}>
                    {properties.map((property) => (
                        <div key={property.id} className="h-full px-3 py-3">
                            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl cursor-pointer transition-all duration-300 group h-full flex flex-col">

                                {/* Image */}
                                <div className="relative h-48 rounded-t-xl overflow-hidden">
                                    <img
                                        src={property.images?.[0] || "/assets/fallback.jpg"}
                                        alt={property.title}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />

                                    {/* Photo count */}
                                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                                        <span className="text-xs font-medium text-gray-600">📷</span>
                                        <span className="text-xs font-bold text-gray-800">
                                            {property.images?.length || 0}
                                        </span>
                                    </div>

                                    {/* Status Badge */}
                                    <div
                                        className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold ${property.status.includes("SOLD")
                                            ? "bg-red-500 text-white"
                                            : "bg-green-500 text-white"
                                            }`}
                                    >
                                        {property.status.includes("SOLD") ? "SOLD" : "Available"}
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="p-5 flex flex-col flex-grow">
                                    <div className="flex items-center text-gray-500 mb-2">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span className="text-xs">{property.location}</span>
                                    </div>

                                    <h3 className="text-lg font-bold text-primary mb-2 line-clamp-2 min-h-[1.5rem] transition-colors">
                                        {property.title}
                                    </h3>

                                    <div className="text-2xl font-bold text-accent mb-3">
                                        {property.price}
                                    </div>

                                    <p className="text-sm text-gray-600 mb-4 line-clamp-3 min-h-[3.5rem] flex-grow">
                                        {property.description}
                                    </p>

                                    {/* Quick Features */}
                                    <div className="space-y-1 mb-4">
                                        {property.features?.slice(0, 2).map((feature, idx) => (
                                            <div key={idx} className="flex items-start">
                                                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span className="text-base text-gray-600 line-clamp-1">
                                                    {feature}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Action */}
                                    <div className="flex gap-2 mb-3">
                                        <button
                                            className="flex-1 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                                            onClick={() => (window.location.href = `/property/${property.slug}`)}
                                        >
                                            View Details
                                        </button>
                                        <button className="border border-gray-300 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Contact */}
                                    <div className="text-sm font-bold mt-auto">
                                        Contact: <span className="text-sm text-card-foreground font-normal">{property.contact}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>

                {/* View All Button */}
                <div className="text-center mt-8">
                    <Link to="/properties">
                        <Button className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-3">
                            View All Properties
                            <ArrowRight className="ml-2" size={18} />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
