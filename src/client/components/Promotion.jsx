import React, { useState, useEffect, useMemo } from 'react';
import { ChevronRight, Compass } from 'lucide-react';
import explore2 from '../../assets/promotion1/explore.2.jpg';
import explore1 from '../../assets/promotion1/explore.1.jpg';

export default function TravelPromo() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const isMobile = useMemo(() => window.innerWidth < 768, []);

  useEffect(() => {
    setIsLoaded(true);

    if (!isMobile) {
      const move = (e) => setMousePos({ x: e.clientX, y: e.clientY });
      window.addEventListener('mousemove', move);
      return () => window.removeEventListener('mousemove', move);
    }

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  const Hero = ({ img, title, side }) => {
    const px = isMobile ? 0 : (mousePos.x - window.innerWidth / 2) / 40;
    const py = isMobile ? 0 : (mousePos.y - window.innerHeight / 2) / 40;
    const parallax = scrollY * 0.3;

    return (
      <div className="relative h-[400px] sm:h-full overflow-hidden group cursor-pointer">
        {/* Animated background with parallax */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 will-change-transform"
          style={{
            backgroundImage: `url(${img}&auto=format&fit=crop&q=80)`,
            transform: `translate(${px}px, ${py - parallax}px) scale(1.1)`
          }}
        />

        {/* Animated gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 via-purple-600/30 to-transparent opacity-60 group-hover:opacity-40 transition-all duration-700 animate-gradient" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent group-hover:from-black/70 transition-all duration-700" />
        
        {/* Animated shimmer effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1500" />
        </div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <div className={`relative h-full flex flex-col justify-center z-10 text-white
          ${side === 'left' ? 'items-start pl-8 sm:pl-16' : 'items-end pr-8 sm:pr-16'}
        `}>
          <div
            className={`transition-all duration-1000 transform
              ${isLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'}
            `}
            style={{ transitionDelay: side === 'left' ? '300ms' : '500ms' }}
          >
            {/* Glass badge with shimmer */}
            <span className="text-[11px] sm:text-xs font-bold tracking-[4px] uppercase bg-white/15 backdrop-blur-xl px-4 py-2 rounded-full border border-white/40 mb-4 inline-block shadow-lg hover:bg-white/25 transition-all duration-300 hover:scale-105 hover:tracking-[5px]">
              <span className="relative inline-block animate-pulse">PROMOTION</span>
            </span>

            {/* Animated title */}
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-3 tracking-tight">
              <span className="inline-block transition-all duration-500 group-hover:translate-x-3 group-hover:scale-105 drop-shadow-2xl">
                Explore
              </span>
            </h2>

            <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-10 relative">
              <span className="inline-block transition-all duration-500 delay-100 group-hover:translate-x-3 group-hover:scale-105 drop-shadow-2xl bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text">
                {title}
              </span>
              {/* Animated underline */}
              <svg className="absolute -bottom-3 left-0 w-32 sm:w-48 h-4 transition-all duration-700 origin-left group-hover:scale-x-125 group-hover:translate-x-2" viewBox="0 0 200 12">
                <defs>
                  <linearGradient id={`grad-${side}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <animate attributeName="x1" values="0%;100%;0%" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="x2" values="100%;200%;100%" dur="3s" repeatCount="indefinite" />
                    <stop offset="0%" stopColor="white" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="white" stopOpacity="1" />
                    <stop offset="100%" stopColor="white" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                <path d="M0,6 Q50,2 100,6 T200,6" stroke={`url(#grad-${side})`} strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </h2>

            {/* Glass button with advanced effects */}
            <button className="group/btn relative px-8 sm:px-10 py-3.5 sm:py-4 bg-white/10 backdrop-blur-xl border-2 border-white/60 rounded-full font-bold transition-all duration-500 hover:bg-white hover:text-gray-900 hover:border-white hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:scale-110 overflow-hidden">
              {/* Button shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000" />
              
              <span className="relative z-10 flex items-center gap-3 text-sm sm:text-base tracking-wide">
                View Packages
                <ChevronRight className="w-5 h-5 transition-all duration-500 group-hover/btn:translate-x-2 group-hover/btn:scale-125" />
              </span>
            </button>
          </div>
        </div>

        {/* Animated compass icon */}
        <Compass 
          className="absolute top-6 sm:top-10 right-6 sm:right-10 w-16 sm:w-24 h-16 sm:h-24 opacity-20 group-hover:opacity-50 transition-all duration-700 group-hover:scale-110" 
          style={{ 
            animation: 'spin 25s linear infinite, pulse 3s ease-in-out infinite',
            filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.3))'
          }} 
        />
      </div>
    );
  };

  const PromoCard = ({ color, bg, title, subtitle, delay, images }) => (
    <div
      className={`${bg} ${color} rounded-3xl sm:rounded-[2rem] p-8 sm:p-10 overflow-hidden relative group cursor-pointer transition-all duration-700 hover:scale-[1.05] hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:-translate-y-2`}
      style={{ animation: `slideUp 1s ease-out ${delay}ms both` }}
    >
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1500" />
      </div>

      {/* Floating orbs */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000 delay-100" />

      <div className="relative z-10">
        <span className="text-[11px] sm:text-xs font-extrabold uppercase px-4 py-2 bg-black/30 backdrop-blur-md rounded-full mb-5 inline-block shadow-lg hover:bg-black/40 transition-all duration-300 tracking-wider hover:scale-105">
          Limited Offers
        </span>

        <h3 className="text-2xl sm:text-4xl font-extrabold mb-3 transition-all duration-500 group-hover:translate-x-3 group-hover:scale-105 drop-shadow-lg">
          {title}
        </h3>

        <p className="text-xl sm:text-3xl font-extrabold mb-8 transition-all duration-500 delay-75 group-hover:translate-x-3 group-hover:scale-105 drop-shadow-lg">
          {subtitle}
        </p>

        <button className="group/btn relative px-7 sm:px-8 py-3 bg-black/80 text-white rounded-full font-bold transition-all duration-500 hover:bg-white hover:text-black hover:scale-110 hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm overflow-hidden">
          {/* Button shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000" />
          
          <span className="relative z-10 flex items-center gap-3 text-sm sm:text-base tracking-wide">
            View More
            <ChevronRight className="w-5 h-5 transition-all duration-500 group-hover/btn:translate-x-2 group-hover/btn:scale-125" />
          </span>
        </button>
      </div>

      {/* Image thumbnails with enhanced effects */}
      <div className="absolute bottom-0 right-0 flex gap-3 p-4 sm:p-6">
        {images.map((img, i) => (
          <div
            key={i}
            className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl sm:rounded-3xl bg-cover bg-center shadow-2xl transition-all duration-700 hover:scale-125 hover:rotate-6 hover:z-20 border-2 border-white/30 group-hover:translate-y-[-10px]"
            style={{ 
              backgroundImage: `url(${img}&auto=format&fit=crop&q=80)`,
              transitionDelay: `${i * 100}ms`,
              filter: 'brightness(0.9) contrast(1.1)'
            }}
          >
            <div className="w-full h-full rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/20 to-transparent hover:from-transparent transition-all duration-500" />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 p-4 sm:p-8 relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.8; }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }
        
        .animate-blob {
          animation: blob 15s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>

      <div className="relative z-10">
        {/* Hero section with enhanced styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 h-auto md:h-[550px] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.25)] mb-10 border border-white/20 backdrop-blur-sm">
          <Hero img="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200" title="Nature" side="left" />
          <Hero img="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200" title="Cities" side="right" />
        </div>

        {/* Promo cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <PromoCard
            color="text-white"
            bg="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700"
            title="We Make Every"
            subtitle="Trips Special"
            delay={200}
            images={[
              explore1,
              explore2
            ]}
          
          />

          <PromoCard
            color="text-gray-900"
            bg="bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500"
            title="Buy 1, Get 1 Free"
            subtitle="Attractions"
            delay={400}
            images={[
              'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=300',
              'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=300'
            ]}
          />

          <PromoCard
            color="text-white"
            bg="bg-gradient-to-br from-green-500 via-teal-500 to-cyan-600"
            title="Buy 1, Get 1 Free"
            subtitle="Attractions"
            delay={600}
            images={[
              'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300',
              'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=300'
            ]}
          />
        </div>
      </div>
    </div>
  );
}
