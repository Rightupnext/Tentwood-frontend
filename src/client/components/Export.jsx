import React, { useState } from "react";
import { Bus, Compass, Car, Briefcase, MapPin, Star } from "lucide-react";

const cities = [
  { name: "New York", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1200&q=80", desc: "A vibrant city full of life and culture." },
  { name: "California", image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1200&q=80", desc: "Beautiful beaches and endless sunshine." },
  { name: "Alaska", image: "https://images.unsplash.com/photo-1512355144108-e94a235b10af?w=1200&q=80", desc: "A land of wilderness and adventure." },
  { name: "Sidney", image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=1200&q=80", desc: "A stunning harbor city full of energy." },
  { name: "Dubai", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80", desc: "A luxurious city in the desert." },
  { name: "London", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&q=80", desc: "A timeless city with rich history." },
  { name: "Tokyo", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&q=80", desc: "A perfect mix of tradition and technology." },
  { name: "Delhi", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&q=80", desc: "A city full of heritage and flavors." }
];

const categories = [
  { icon: Bus, label: "Public Transportations", color: "text-pink-500", bg: "bg-white", iconBg: "bg-pink-50" },
  { icon: Compass, label: "Nature & Adventure", color: "text-teal-500", bg: "bg-white", iconBg: "bg-teal-50" },
  { icon: Car, label: "Private Transportations", color: "text-yellow-500", bg: "bg-white", iconBg: "bg-yellow-50" },
  { icon: Briefcase, label: "Business Tours", color: "text-red-500", bg: "bg-white", iconBg: "bg-red-50" },
  { icon: MapPin, label: "Local Visit", color: "text-blue-500", bg: "bg-white", iconBg: "bg-blue-50" }
];

const tours = [
  { title: "Alaska: River Experience from Westminster to Greenwich", duration: "2 hours", facility: "Transport Facility", plan: "Family Plan", rating: 4, reviews: 584, price: "$35.00", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80" },
  { title: "Alaska: Classic Double-Decker Bus Tour", duration: "2 hours", facility: "Transport Facility", plan: "Family Plan", rating: 4, reviews: 584, price: "$35.00", image: "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=400&q=80" },
  { title: "Alaska: London City Highlights with Afternoon Tea", duration: "2 hours", facility: "Transport Facility", plan: "Family Plan", rating: 4, reviews: 584, price: "$35.00", image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&q=80" },
  { title: "Alaska: Scenic River Cruise Experience", duration: "2 hours", facility: "Transport Facility", plan: "Family Plan", rating: 4, reviews: 584, price: "$35.00", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80" }
];

export default function CityExplorer() {
  const [selectedCity, setSelectedCity] = useState("Alaska");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const city = cities.find(c => c.name === selectedCity);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 sm:py-12 md:py-16 px-3 sm:px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* City Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 md:mb-12">
          {cities.map((c, i) => (
            <button
              key={c.name}
              onClick={() => setSelectedCity(c.name)}
              style={{ animationDelay: `${i * 50}ms` }}
              className={`px-5 sm:px-7 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-500 animate-fadeIn shadow-sm ${
                selectedCity === c.name
                  ? "bg-gradient-to-r from-teal-400 to-teal-500 text-white shadow-lg shadow-teal-300/50 scale-105 hover:shadow-xl"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-teal-300 hover:shadow-md hover:scale-105"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Main Hero Image Section */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-10 sm:mb-14 md:mb-16 group animate-scaleIn">
          <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
            <img
              src={city.image}
              alt={city.name}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>

     <div
  className="
    lg:absolute 
    lg:bottom-12 lg:left-10 lg:right-10 
    relative 
    mt-6 
    sm:mt-8 
    md:mt-10 
    px-4
  "
>
  <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow-2xl animate-slideUp">
    {/* Title */}
    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 sm:mb-4 animate-fadeIn">
      {city.name}
    </h2>

    {/* Description */}
    <p
      className="text-gray-600 text-sm sm:text-base md:text-lg mb-5 sm:mb-6 md:mb-8 max-w-2xl animate-fadeIn"
      style={{ animationDelay: "100ms" }}
    >
      {city.desc} Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
    </p>

    {/* Category Buttons */}
    <div className="flex flex-wrap gap-3 sm:gap-4">
      {categories.map((cat, i) => {
        const Icon = cat.icon;
        return (
          <button
            key={cat.label}
            style={{ animationDelay: `${i * 80}ms` }}
            onMouseEnter={() => setHoveredCategory(i)}
            onMouseLeave={() => setHoveredCategory(null)}
            className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2.5 sm:py-3 ${cat.bg} rounded-xl sm:rounded-2xl border border-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer animate-fadeIn group/cat`}
          >
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 ${cat.iconBg} rounded-lg sm:rounded-xl flex items-center justify-center transition-transform duration-300 ${
                hoveredCategory === i ? "scale-110 rotate-6" : ""
              }`}
            >
              <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${cat.color}`} />
            </div>
            <span className="text-gray-700 text-xs sm:text-sm font-medium whitespace-nowrap">
              {cat.label}
            </span>
          </button>
        );
      })}
    </div>
  </div>
</div>

        </div>

        {/* Tour Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {tours.map((tour, i) => (
            <div
              key={i}
              style={{ animationDelay: `${i * 100}ms` }}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 animate-slideUp hover:-translate-y-3 cursor-pointer group"
            >
              <div className="relative h-44 sm:h-48 md:h-52 overflow-hidden">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredCard === i ? "scale-125" : "scale-100"
                  }`}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="font-semibold text-gray-800 mb-3 text-sm sm:text-base line-clamp-2 min-h-[44px] sm:min-h-[48px] group-hover:text-teal-600 transition-colors duration-300">
                  {tour.title}
                </h3>
                <div className="space-y-1.5 text-xs sm:text-sm text-gray-600 mb-4">
                  <p className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-teal-500 rounded-full"></span>
                    Duration: {tour.duration}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-teal-500 rounded-full"></span>
                    {tour.facility}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-teal-500 rounded-full"></span>
                    {tour.plan}
                  </p>
                </div>
                <div className="flex items-center gap-2 mb-4 pt-3 border-t border-gray-100">
                  <div className="flex">
                    {[...Array(5)].map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-all duration-300 ${
                          idx < tour.rating
                            ? "fill-amber-400 text-amber-400 scale-100"
                            : "text-gray-300"
                        } ${hoveredCard === i && idx < tour.rating ? 'scale-110' : ''}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">({tour.reviews})</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div>
                    <span className="text-xl sm:text-2xl font-bold text-teal-600">
                      {tour.price}
                    </span>
                    <span className="text-xs text-gray-500 ml-1">/ person</span>
                  </div>
                  <button className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white text-xs sm:text-sm rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
        @keyframes scaleIn{from{opacity:0;transform:scale(0.95)}to{opacity:1;transform:scale(1)}}
        .animate-fadeIn{animation:fadeIn 0.6s ease-out forwards}
        .animate-slideUp{animation:slideUp 0.7s ease-out forwards}
        .animate-scaleIn{animation:scaleIn 0.8s ease-out forwards}
      `}</style>
    </div>
  );
}
