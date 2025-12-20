import React, { useState, useEffect, useRef } from "react";
import { Smartphone, Star, MapPin, Heart, Wifi, Signal } from "lucide-react";

const hotelsData = [
  {
    name: "Hotel Seagull Int.",
    location: "Cox's Bazar",
    rating: 4.8,
    reviews: 68,
    price: "$36",
    image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=600",
    popular: true,
    badge: "NEARBY"
  },
  {
    name: "Ocean Paradise Hotel",
    location: "Cox's Bazar",
    rating: 4.7,
    reviews: 28,
    price: "$42",
    image: "https://images.pexels.com/photos/2869499/pexels-photo-2869499.jpeg?auto=compress&cs=tinysrgb&w=600",
    popular: false,
    badge: null
  },
  {
    name: "The Seagull Hotel Int.",
    location: "Cox's Bazar",
    rating: 4.9,
    reviews: 46,
    price: "$45",
    image: "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=600",
    popular: false,
    badge: null
  }
];

const SmartCityTourApp = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeHotel, setActiveHotel] = useState(0);
  const [imageLoaded, setImageLoaded] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHotel((prev) => (prev + 1) % hotelsData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const translateY = Math.round(scrollY * 0.15);

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-800 to-cyan-500 relative">
      {/* Animated Background Circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-purple-400/20 rounded-full blur-3xl top-10 -left-20 animate-pulse" style={{ animationDuration: "4s" }} />
        <div className="absolute w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl bottom-20 -right-20 animate-pulse" style={{ animationDuration: "5s" }} />
        <div className="absolute w-72 h-72 bg-pink-400/10 rounded-full blur-3xl top-1/2 left-1/2 animate-pulse" style={{ animationDuration: "6s" }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Side - Phone Mockup */}
          <div className="flex justify-center lg:justify-start order-2 lg:order-1 relative">
            <div
              className="relative transform transition-all duration-700 hover:scale-105 w-full max-w-sm"
              style={{ transform: `translateY(${translateY}px)` }}
            >
              {/* Phone Container */}
              <div className="relative w-full h-[620px] bg-gray-900 rounded-[3rem] shadow-2xl p-3 animate-float border-8 border-gray-800">
                {/* Phone Notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-30" />
                
                <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                  {/* Status Bar */}
                  <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-r from-purple-600 to-cyan-500 flex items-center justify-between px-6 text-white text-xs z-20">
                    <span className="font-semibold">9:41</span>
                    <div className="flex gap-1.5 items-center">
                      <Signal className="w-3.5 h-3.5" />
                      <Wifi className="w-3.5 h-3.5" />
                      <div className="w-6 h-3 border-2 border-white rounded-sm relative">
                        <div className="absolute inset-0.5 bg-white rounded-sm" />
                      </div>
                    </div>
                  </div>

                  {/* App Header */}
                  <div className="pt-10 px-4 pb-3 bg-gradient-to-r from-purple-600 to-cyan-500">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex flex-col">
                        <h2 className="text-white text-xl font-bold tracking-wide">HOTELS</h2>
                      </div>
                      <div className="w-10 h-10 bg-white/20 rounded-full backdrop-blur-sm flex items-center justify-center">
                        <div className="w-1 h-1 bg-white rounded-full" />
                        <div className="w-1 h-1 bg-white rounded-full mx-1" />
                        <div className="w-1 h-1 bg-white rounded-full" />
                      </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-2 mb-3">
                      <button className="px-4 py-1.5 bg-white/20 text-white text-xs rounded-full backdrop-blur-sm">
                        SEARCH
                      </button>
                      <button className="px-4 py-1.5 bg-white text-cyan-600 text-xs rounded-full font-semibold shadow-lg transform scale-105">
                        NEARBY
                      </button>
                      <button className="px-4 py-1.5 bg-white/20 text-white text-xs rounded-full backdrop-blur-sm">
                        FAVORITES
                      </button>
                    </div>

                    <p className="text-white/90 text-xs font-medium">30 HOTELS FOUND NEAR YOU</p>
                  </div>

                  {/* Hotels List */}
                  <div className="px-4 py-4 space-y-3 overflow-y-auto h-[490px] bg-gray-50">
                    {hotelsData.map((hotel, idx) => (
                      <div
                        key={idx}
                        className={`bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 ${
                          activeHotel === idx ? "ring-2 ring-cyan-400 scale-[1.02]" : ""
                        }`}
                        style={{ 
                          animation: `slideUp 0.6s ease-out ${idx * 0.15}s both`,
                          willChange: "transform"
                        }}
                      >
                        <div className="relative h-40 bg-gray-200 overflow-hidden">
                          {/* Image Loading State */}
                          {!imageLoaded[idx] && (
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
                          )}
                          
                          <img
                            src={hotel.image}
                            alt={hotel.name}
                            loading="lazy"
                            onLoad={() => setImageLoaded(prev => ({ ...prev, [idx]: true }))}
                            className={`w-full h-full object-cover transition-all duration-700 ${
                              imageLoaded[idx] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                            }`}
                          />

                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                          {hotel.badge && (
                            <div className="absolute top-2 left-2 bg-cyan-400 text-white text-[10px] px-2 py-1 rounded-full font-bold animate-pulse shadow-lg">
                              {hotel.badge}
                            </div>
                          )}

                          <button 
                            className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform active:scale-95"
                            aria-label="favorite"
                          >
                            <Heart className="w-4 h-4 text-red-400" />
                          </button>

                          <div className="absolute bottom-2 right-2 bg-cyan-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                            {hotel.price}
                          </div>
                        </div>

                        <div className="p-3">
                          <h3 className="font-bold text-gray-800 text-sm mb-1.5">{hotel.name}</h3>
                          <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
                            <MapPin className="w-3.5 h-3.5 text-cyan-500" />
                            <span>{hotel.location}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`w-3 h-3 transition-all duration-300 ${
                                      i < Math.floor(hotel.rating) 
                                        ? 'fill-yellow-400 text-yellow-400' 
                                        : 'text-gray-300'
                                    }`}
                                    style={{ transitionDelay: `${i * 50}ms` }}
                                  />
                                ))}
                              </div>
                              <span className="text-xs font-semibold text-gray-700">{hotel.rating}</span>
                              <span className="text-xs text-gray-400">({hotel.reviews})</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-8 -right-8 w-20 h-20 bg-yellow-400 rounded-2xl shadow-2xl animate-bounce flex items-center justify-center text-3xl transform rotate-12">
                ⭐
              </div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-cyan-400 rounded-full shadow-2xl animate-pulse flex items-center justify-center">
                <MapPin className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="text-white space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Smart City Tour
                <br />
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent animate-gradient">
                  Mobile App
                </span>
              </h1>
              <p className="text-cyan-100 text-lg font-medium">Available on iOS & Android</p>
            </div>

            <p className="text-white/90 text-base leading-relaxed max-w-xl">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-8 py-4 rounded-full font-bold text-sm flex items-center justify-center gap-3 shadow-2xl hover:shadow-yellow-400/50 transform hover:scale-105 active:scale-95 transition-all duration-300">
                <Smartphone className="w-6 h-6 group-hover:animate-bounce" />
                <div className="text-left">
                  <div className="text-xs opacity-80">Download For</div>
                  <div className="text-base font-bold">iOS</div>
                </div>
              </button>

              <button className="group bg-gradient-to-r from-green-400 to-cyan-400 text-gray-900 px-8 py-4 rounded-full font-bold text-sm flex items-center justify-center gap-3 shadow-2xl hover:shadow-cyan-400/50 transform hover:scale-105 active:scale-95 transition-all duration-300">
                <Smartphone className="w-6 h-6 group-hover:animate-bounce" />
                <div className="text-left">
                  <div className="text-xs opacity-80">Download For</div>
                  <div className="text-base font-bold">Android</div>
                </div>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center transform hover:scale-110 transition-transform duration-300">
                <div className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  50K+
                </div>
                <div className="text-white/80 text-xs mt-1">Downloads</div>
              </div>
              <div className="text-center transform hover:scale-110 transition-transform duration-300">
                <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                  4.8★
                </div>
                <div className="text-white/80 text-xs mt-1">Rating</div>
              </div>
              <div className="text-center transform hover:scale-110 transition-transform duration-300">
                <div className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  500+
                </div>
                <div className="text-white/80 text-xs mt-1">Hotels</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-shimmer {
          background: linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default SmartCityTourApp;

