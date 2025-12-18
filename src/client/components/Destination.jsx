import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";

export default function ExploreDestinations() {
  const [hovered, setHovered] = useState(null);
  const [scrollProgress, setScrollProgress] = useState({});
  const rowRefs = useRef([]);

  const destinations = [
    { id: 1, name: "America", tours: "12 Tours", image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=800&q=80" },
    { id: 2, name: "France", tours: "15 Tours", image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800&q=80" },
    { id: 3, name: "Japan", tours: "18 Tours", image: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=800&q=80" },
    { id: 4, name: "Africa", tours: "10 Tours", image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80" },
    { id: 5, name: "USA", tours: "20 Tours", image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80" },
    { id: 6, name: "Italy", tours: "22 Tours", image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80" },
    { id: 7, name: "Australia", tours: "16 Tours", image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&q=80" },
    { id: 8, name: "Thailand", tours: "14 Tours", image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80" },
    { id: 9, name: "Greece", tours: "13 Tours", image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80" },
    { id: 10, name: "Brazil", tours: "11 Tours", image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&q=80" },
  ];

  const row1 = destinations;
  const row2 = [...destinations].reverse();

  useEffect(() => {
    const handleScroll = () => {
      rowRefs.current.forEach((row, index) => {
        if (row) {
          const rect = row.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / windowHeight));
          setScrollProgress(prev => ({ ...prev, [index]: progress }));
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const Row = ({ list, reverse, rowIndex }) => {
    const progress = scrollProgress[rowIndex] || 0;
    const scale = 0.85 + (progress * 0.15);
    const opacity = 0.3 + (progress * 0.7);

    return (
      <div 
        ref={el => rowRefs.current[rowIndex] = el}
        className="relative overflow-hidden mb-6 sm:mb-8 md:mb-10"
        style={{
          transform: `scale(${scale})`,
          opacity: opacity,
          transition: 'transform 0.3s ease-out, opacity 0.3s ease-out'
        }}
      >
        <div className={`flex space-x-3 sm:space-x-4 md:space-x-6 ${reverse ? "animate-[scrollLeft_40s_linear_infinite]" : "animate-[scrollRight_40s_linear_infinite]"} hover:[animation-play-state:paused]`}>
          {[...list, ...list, ...list].map((item, i) => (
            <div 
              key={i} 
              className="w-56 h-40 sm:w-72 sm:h-56 md:w-80 md:h-64 flex-shrink-0 relative group cursor-pointer" 
              onMouseEnter={() => setHovered(`${rowIndex}-${i}`)} 
              onMouseLeave={() => setHovered(null)}
            >
              <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-teal-500/50 group-hover:z-10">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-125 duration-700 transition-transform brightness-90 group-hover:brightness-110" 
                  loading="lazy" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/90 transition-all duration-500"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-teal-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay"></div>
                
                {/* Sparkle effect on hover */}
                <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:animate-pulse">
                  <Sparkles className="w-5 h-5 text-yellow-300" />
                </div>
                
                <div className="absolute bottom-0 p-3 sm:p-5 md:p-6 text-white transform transition-transform duration-300 group-hover:translate-y-[-8px]">
                  <h3 className="text-xl sm:text-3xl font-bold mb-1 sm:mb-2 group-hover:text-teal-300 transition-colors duration-300 drop-shadow-lg">
                    {item.name}
                  </h3>
                  <div className="flex items-center space-x-2 opacity-80 mb-2 sm:mb-4 group-hover:opacity-100 transition-opacity">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 group-hover:text-teal-400 transition-colors group-hover:animate-bounce" />
                    <span className="text-xs sm:text-base font-medium">{item.tours}</span>
                  </div>
                  <button className={`${hovered === `${rowIndex}-${i}` ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"} flex items-center space-x-2 px-3 py-1.5 sm:px-6 sm:py-3 bg-white text-teal-600 rounded-full font-semibold transition-all duration-300 text-xs sm:text-base hover:bg-teal-50 hover:shadow-lg active:scale-95 hover:shadow-teal-300/50`}>
                    <span>Explore Now</span>
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
                
                {/* Rotating arrow badge */}
                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:rotate-[360deg] shadow-lg">
                  <ArrowRight className="text-white w-3 h-3 sm:w-5 sm:h-5" />
                </div>
                
                {/* Border glow effect */}
                <div className="absolute inset-0 border-2 border-white/0 group-hover:border-teal-400/50 rounded-xl sm:rounded-2xl transition-all duration-500"></div>
                
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-0 h-0 border-t-2 border-l-2 border-teal-400 group-hover:w-8 group-hover:h-8 transition-all duration-500 rounded-tl-xl"></div>
                <div className="absolute bottom-0 right-0 w-0 h-0 border-b-2 border-r-2 border-cyan-400 group-hover:w-8 group-hover:h-8 transition-all duration-500 rounded-br-xl"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-teal-50 py-12 sm:py-16 md:py-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center mb-10 sm:mb-12 md:mb-16">
        <div className="inline-block relative">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-teal-700 to-cyan-700 bg-clip-text text-transparent relative inline-block animate-[fadeIn_1s_ease-in]">
            Explore Top Destinations
          </h2>
          <div className="absolute left-1/2 -translate-x-1/2 w-24 sm:w-28 md:w-32 h-1 bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500 rounded-full -bottom-2 animate-[expand_1s_ease-out] shadow-lg shadow-teal-500/50" />
          <div className="absolute -top-6 -right-6 opacity-50 animate-pulse">
            <Sparkles className="w-6 h-6 text-teal-500" />
          </div>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto mt-6 sm:mt-8 text-sm sm:text-base md:text-lg px-4 animate-[fadeIn_1.5s_ease-in] leading-relaxed">
          Discover the world's most beautiful places. Hand-picked destinations curated for the perfect travel experience.
        </p>
      </div>
      
      <Row list={row1} reverse={false} rowIndex={0} />
      <Row list={row2} reverse={true} rowIndex={1} />
      
      <div className="text-center mt-10 sm:mt-12 md:mt-16 animate-[fadeIn_2s_ease-in]">
        <button className="group px-8 py-3 sm:px-10 sm:py-4 bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500 bg-[length:200%_100%] text-white font-semibold rounded-full shadow-lg hover:shadow-2xl hover:shadow-teal-500/50 hover:scale-105 active:scale-95 transition-all duration-300 text-sm sm:text-base relative overflow-hidden">
          <span className="relative z-10 flex items-center gap-2">
            View All Destinations
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-teal-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-[shimmer_2s_linear_infinite]"></div>
        </button>
      </div>
      
      <style>{`
        @keyframes scrollRight {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes scrollLeft {
          0% { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes expand {
          0% { width: 0; }
          100% { width: 6rem; }
        }
        @keyframes shimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @media (min-width: 640px) {
          @keyframes expand {
            0% { width: 0; }
            100% { width: 7rem; }
          }
        }
        @media (min-width: 768px) {
          @keyframes expand {
            0% { width: 0; }
            100% { width: 8rem; }
          }
        }
      `}</style>
    </div>
  );
}