import React, { useState, useEffect, useRef } from "react";
import { Calendar, DollarSign, TrendingUp, Star, ChevronLeft, ChevronRight, Search, Home, Volume2, VolumeX } from "lucide-react";

function DestinationCard({ dest, index, visible }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const originalPrice = dest.discount > 0 ? dest.price / (1 - dest.discount / 100) : dest.price;

  return (
    <div 
      className={`group bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-700 hover:-translate-y-3 overflow-hidden cursor-pointer transform ${visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative overflow-hidden h-48">
        {!imageLoaded && <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />}
        <img 
          src={dest.image} 
          alt={dest.name} 
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transform group-hover:scale-110 transition-all duration-1000 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`} 
        />
        {dest.discount > 0 && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
            {dest.discount}% OFF
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-teal-600 transition-colors duration-300">{dest.name}</h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{dest.desc}</p>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex flex-col">
            {dest.discount > 0 && <span className="text-xs text-gray-400 line-through mb-0.5">USD ${Math.round(originalPrice)}</span>}
            <div className="text-2xl font-bold text-gray-900">USD $ <span className="text-teal-600">{dest.price}</span></div>
          </div>
          <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1.5 rounded-lg">
            <Star size={16} className="fill-yellow-500 text-yellow-500" />
            <span className="font-bold text-base text-gray-800">{dest.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SortButton({ icon, label, onClick, active }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center justify-center gap-1 md:gap-2 px-2 md:px-4 py-2 md:py-3 rounded-xl transition-all duration-300 group border transform hover:scale-105 active:scale-95 shadow-sm hover:shadow-md ${
        active ? 'bg-teal-600 text-white border-teal-600' : 'bg-white text-gray-700 border-gray-200 hover:bg-teal-50 hover:border-teal-600'
      }`}
    >
      <div className={`transition-colors ${active ? 'text-white' : 'text-gray-600 group-hover:text-teal-600'}`}>{icon}</div>
      <span className={`text-xs md:text-sm font-semibold whitespace-nowrap ${active ? 'text-white' : 'group-hover:text-gray-900'}`}>{label}</span>
    </button>
  );
}

export default function TravelSearch() {
  const [visible, setVisible] = useState(false);
  const [sortBy, setSortBy] = useState(null);
  const [priceRange, setPriceRange] = useState([50, 10000]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const videoRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => { 
    setTimeout(() => setVisible(true), 100); 
    
    const initAudio = () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.4;
        audioRef.current.play().then(() => {
          setAudioReady(true);
        }).catch(() => {
          document.addEventListener('click', () => {
            if (audioRef.current && !audioReady) {
              audioRef.current.play().then(() => setAudioReady(true)).catch(() => {});
            }
          }, { once: true });
        });
      }
    };

    if (videoRef.current) videoRef.current.play().catch(() => {});
    setTimeout(initAudio, 500);
  }, [audioReady]);

  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    
    if (videoRef.current) videoRef.current.muted = newMutedState;
    if (audioRef.current) {
      audioRef.current.muted = newMutedState;
      if (!newMutedState && audioRef.current.paused) {
        audioRef.current.play().then(() => setAudioReady(true)).catch(() => {});
      }
    }
  };

  const allDestinations = {
    1: [
      { name: "Switzerland", image: "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800", desc: "Experience breathtaking Alpine scenery with pristine lakes and snow-capped mountains.", price: 520, rating: 4.8, discount: 30 },
      { name: "Berlin", image: "https://images.pexels.com/photos/2609954/pexels-photo-2609954.jpeg?auto=compress&cs=tinysrgb&w=800", desc: "Discover rich history, vibrant culture, and iconic landmarks in Germany's capital.", price: 320, rating: 5.0, discount: 0 },
      { name: "Maldives", image: "https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg?auto=compress&cs=tinysrgb&w=800", desc: "Paradise beaches with crystal clear waters and luxurious overwater bungalows.", price: 660, rating: 4.5, discount: 25 },
      { name: "Toronto", image: "https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=800", desc: "Urban sophistication meets natural beauty in Canada's largest city.", price: 290, rating: 4.6, discount: 15 },
      { name: "Baku", image: "https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=800", desc: "Where ancient history meets modern architecture on the Caspian Sea coast.", price: 440, rating: 5.0, discount: 20 },
      { name: "China", image: "https://images.pexels.com/photos/2376997/pexels-photo-2376997.jpeg?auto=compress&cs=tinysrgb&w=800", desc: "Ancient wonders, modern marvels, and diverse landscapes await exploration.", price: 380, rating: 4.9, discount: 10 }
    ],
    2: [
      { name: "Paris", image: "https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg?auto=compress&cs=tinysrgb&w=800", desc: "The City of Light beckons with art, culture, and romantic charm.", price: 680, rating: 4.9, discount: 20 },
      { name: "Tokyo", image: "https://images.pexels.com/photos/2614818/pexels-photo-2614818.jpeg?auto=compress&cs=tinysrgb&w=800", desc: "Ultra-modern metropolis blending tradition with cutting-edge technology.", price: 780, rating: 4.8, discount: 15 },
      { name: "Dubai", image: "https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg?auto=compress&cs=tinysrgb&w=800", desc: "Luxury shopping, ultramodern architecture, and desert adventures.", price: 590, rating: 4.7, discount: 25 },
      { name: "New York", image: "https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=800", desc: "The city that never sleeps offers endless entertainment and culture.", price: 720, rating: 4.9, discount: 10 },
      { name: "Barcelona", image: "https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=800", desc: "Gaudí's masterpieces, Mediterranean beaches, and vibrant nightlife.", price: 450, rating: 4.8, discount: 30 },
      { name: "Iceland", image: "https://images.pexels.com/photos/2422497/pexels-photo-2422497.jpeg?auto=compress&cs=tinysrgb&w=800", desc: "Land of fire and ice with spectacular waterfalls and northern lights.", price: 850, rating: 5.0, discount: 0 }
    ],
    3: [
      { name: "Santorini", image: "https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=800", desc: "White-washed buildings and stunning sunsets over the Aegean Sea.", price: 620, rating: 4.9, discount: 20 },
      { name: "Bali", image: "https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=800", desc: "Tropical paradise with ancient temples, rice terraces, and beaches.", price: 480, rating: 4.7, discount: 25 },
      { name: "Amsterdam", image: "https://images.pexels.com/photos/2031706/pexels-photo-2031706.jpeg?auto=compress&cs=tinysrgb&w=800", desc: "Charming canals, world-class museums, and cycling culture.", price: 540, rating: 4.8, discount: 15 },
      { name: "Prague", image: "https://images.pexels.com/photos/2091166/pexels-photo-2091166.jpeg?auto=compress&cs=tinysrgb&w=800", desc: "Medieval architecture and fairy-tale charm in the heart of Europe.", price: 380, rating: 4.9, discount: 30 },
      { name: "Sydney", image: "https://images.pexels.com/photos/1878293/pexels-photo-1878293.jpeg?auto=compress&cs=tinysrgb&w=800", desc: "Iconic Opera House, stunning harbor, and beautiful beaches.", price: 890, rating: 4.8, discount: 10 },
      { name: "Singapore", image: "https://images.pexels.com/photos/2733918/pexels-photo-2733918.jpeg?auto=compress&cs=tinysrgb&w=800", desc: "Futuristic city-state with incredible food and attractions.", price: 670, rating: 4.9, discount: 20 }
    ],
    4: [
      { name: "Venice", image: "https://images.pexels.com/photos/1823680/pexels-photo-1823680.jpeg?auto=compress&cs=tinysrgb&w=800", desc: "Romantic canals, historic palaces, and timeless Italian charm.", price: 580, rating: 4.8, discount: 25 },
      { name: "Thailand", image: "https://images.pexels.com/photos/1007023/pexels-photo-1007023.jpeg?auto=compress&cs=tinysrgb&w=800", desc: "Tropical beaches, ornate temples, and delicious street food.", price: 420, rating: 4.7, discount: 30 },
      { name: "Norway", image: "https://images.pexels.com/photos/2422497/pexels-photo-2422497.jpeg?auto=compress&cs=tinysrgb&w=800", desc: "Majestic fjords, midnight sun, and Viking heritage.", price: 920, rating: 5.0, discount: 0 },
      { name: "Rome", image: "https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg?auto=compress&cs=tinysrgb&w=800", desc: "Ancient ruins, Renaissance art, and authentic Italian cuisine.", price: 560, rating: 4.9, discount: 15 },
      { name: "Seoul", image: "https://images.pexels.com/photos/237211/pexels-photo-237211.jpeg?auto=compress&cs=tinysrgb&w=800", desc: "K-pop culture, futuristic tech, and traditional palaces.", price: 650, rating: 4.8, discount: 20 },
      { name: "Morocco", image: "https://images.pexels.com/photos/2079665/pexels-photo-2079665.jpeg?auto=compress&cs=tinysrgb&w=800", desc: "Exotic markets, desert landscapes, and vibrant culture.", price: 490, rating: 4.7, discount: 25 }
    ],
    5: [
      { name: "London", image: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800", desc: "Historic landmarks, royal palaces, and world-class museums.", price: 740, rating: 4.9, discount: 15 },
      { name: "New Zealand", image: "https://images.pexels.com/photos/2882234/pexels-photo-2882234.jpeg?auto=compress&cs=tinysrgb&w=800", desc: "Stunning landscapes from mountains to beaches and everything between.", price: 980, rating: 5.0, discount: 10 },
      { name: "Peru", image: "https://images.pexels.com/photos/2049194/pexels-photo-2049194.jpeg?auto=compress&cs=tinysrgb&w=800", desc: "Ancient Incan ruins, Amazon rainforest, and colorful traditions.", price: 520, rating: 4.8, discount: 20 },
      { name: "Austria", image: "https://images.pexels.com/photos/2467598/pexels-photo-2467598.jpeg?auto=compress&cs=tinysrgb&w=800", desc: "Alpine beauty, classical music heritage, and imperial architecture.", price: 610, rating: 4.8, discount: 25 },
      { name: "Croatia", image: "https://images.pexels.com/photos/2265876/pexels-photo-2265876.jpeg?auto=compress&cs=tinysrgb&w=800", desc: "Adriatic coastline, medieval towns, and crystal-clear waters.", price: 440, rating: 4.7, discount: 30 },
      { name: "Scotland", image: "https://images.pexels.com/photos/1578750/pexels-photo-1578750.jpeg?auto=compress&cs=tinysrgb&w=800", desc: "Highland landscapes, historic castles, and whisky trails.", price: 580, rating: 4.9, discount: 20 }
    ]
  };

  const getFilteredAndSortedDestinations = () => {
    let filtered = (allDestinations[currentPage] || allDestinations[1]).filter(dest => {
      const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) || dest.desc.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = dest.price >= priceRange[0] && dest.price <= priceRange[1];
      return matchesSearch && matchesPrice;
    });

    if (sortBy === 'price-low') filtered.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-high') filtered.sort((a, b) => b.price - a.price);
    else if (sortBy === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name));

    return filtered;
  };

  const destinations = getFilteredAndSortedDestinations();

  const handlePageChange = (pageNum) => {
    setVisible(false);
    setTimeout(() => {
      setCurrentPage(pageNum);
      setVisible(true);
    }, 400);
  };

  const rangePercentage = ((priceRange[1] - 50) / 9950) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <audio ref={audioRef} loop preload="auto" crossOrigin="anonymous">
        <source src="https://res.cloudinary.com/dttvw0p7p/video/upload/v1765865228/Untitled_design_xpdwp2.mp4" type="audio/mpeg" />
      </audio>

      <div className="relative h-[400px] md:h-[600px] lg:h-[700px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60 z-10"></div>
        <video ref={videoRef} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'brightness(0.9) contrast(1.1) saturate(1.2)' }}>
          <source src="https://res.cloudinary.com/dttvw0p7p/video/upload/v1765865228/Untitled_design_xpdwp2.mp4" type="video/mp4" />
        </video>
        
        <button onClick={toggleMute} className="absolute top-4 right-4 md:top-6 md:right-6 z-30 bg-white/90 backdrop-blur-sm p-3 md:p-4 rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110 active:scale-95">
          {isMuted ? <VolumeX size={20} className="text-gray-700" /> : <Volume2 size={20} className="text-teal-600" />}
        </button>

        <div className={`absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <div className="text-xs md:text-sm text-white/90 mb-3 tracking-[0.3em] font-medium uppercase">Search Tour</div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-8 italic drop-shadow-2xl leading-tight" style={{ fontFamily: 'Georgia, serif' }}>Travel With Us</h1>
          <div className="w-full max-w-6xl bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-3 md:p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
              <SortButton icon={<Calendar size={18} />} label="Date" onClick={() => setSortBy(null)} active={sortBy === null} />
              <SortButton icon={<DollarSign size={18} />} label="Low to High" onClick={() => setSortBy('price-low')} active={sortBy === 'price-low'} />
              <SortButton icon={<TrendingUp size={18} />} label="High to Low" onClick={() => setSortBy('price-high')} active={sortBy === 'price-high'} />
              <SortButton icon={<Home size={18} />} label="Name (A-Z)" onClick={() => setSortBy('name')} active={sortBy === 'name'} />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <svg viewBox="0 0 1440 120" className="w-full" preserveAspectRatio="none">
            <path fill="#f8fafc" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 md:py-16 -mt-6 md:-mt-12">
        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            <div className="relative w-full shadow-lg rounded-2xl bg-white p-4">
              <Search size={20} className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search Your Destination" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-14 pr-4 py-3 bg-white text-base border-2 border-gray-100 rounded-xl focus:border-teal-600 focus:ring-4 focus:ring-teal-600/20 outline-none transition-all" />
            </div>

            <div className="text-center">
              <span className="inline-block px-4 md:px-6 py-2 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-full shadow-lg font-semibold text-sm md:text-base">
                Page {currentPage} of 5 • {destinations.length} Destinations
              </span>
            </div>

            {destinations.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                {destinations.map((dest, index) => (
                  <DestinationCard key={`${currentPage}-${index}`} dest={dest} index={index} visible={visible} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                <p className="text-gray-500 text-lg mb-2">No destinations found</p>
                <p className="text-gray-400 text-sm">Try adjusting your filters or search query</p>
              </div>
            )}

            <div className="flex items-center justify-center gap-2 md:gap-3 mt-8">
              <button onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)} disabled={currentPage === 1} className={`w-10 h-10 md:w-11 md:h-11 rounded-full bg-white shadow-md transition-all flex items-center justify-center border border-gray-200 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg hover:scale-110 hover:bg-teal-600 hover:text-white'}`}>
                <ChevronLeft size={20} />
              </button>
              {[1, 2, 3, 4, 5].map((num) => (
                <button key={num} onClick={() => handlePageChange(num)} className={`w-10 h-10 md:w-11 md:h-11 rounded-full font-bold text-sm md:text-base transition-all duration-300 transform ${num === currentPage ? "bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-lg scale-110" : "bg-white text-gray-700 shadow-md hover:bg-teal-50 hover:scale-105 hover:shadow-lg"}`}>
                  {num}
                </button>
              ))}
              <button onClick={() => currentPage < 5 && handlePageChange(currentPage + 1)} disabled={currentPage === 5} className={`w-10 h-10 md:w-11 md:h-11 rounded-full bg-white shadow-md transition-all flex items-center justify-center border border-gray-200 ${currentPage === 5 ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg hover:scale-110 hover:bg-teal-600 hover:text-white'}`}>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className={`bg-white rounded-3xl shadow-xl p-6 md:p-8 transition-all duration-1000 hover:shadow-2xl transform ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16"}`} style={{ transitionDelay: "300ms" }}>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Plan Your Trip</h3>
              <p className="text-gray-600 text-sm mb-6 pb-6 border-b border-gray-100">Discover amazing destinations around the world. Filter by price and find your perfect getaway today.</p>
              <div className="space-y-4 mb-6">
                <input type="text" placeholder="Where To?" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-teal-600 focus:ring-4 focus:ring-teal-600/20 outline-none transition-all placeholder:text-gray-500" />
                <input type="text" placeholder="Month" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-teal-600 focus:ring-4 focus:ring-teal-600/20 outline-none transition-all placeholder:text-gray-500" />
              </div>
              <div className="mb-6">
                <h4 className="font-bold mb-4 text-gray-800">Filter By Price</h4>
                <div className="relative mb-4">
                  <input type="range" min="50" max="10000" step="50" value={priceRange[1]} onChange={(e) => setPriceRange([50, parseInt(e.target.value)])} className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer" style={{ background: `linear-gradient(to right, #0d9488 0%, #0d9488 ${rangePercentage}%, #e5e7eb ${rangePercentage}%, #e5e7eb 100%)` }} />
                </div>
                <div className="flex justify-between text-sm font-semibold text-gray-700">
                  <span>Price: ${priceRange[0]} - ${priceRange[1]}</span>
                </div>
              </div>
              <button className="w-full py-3 md:py-4 bg-gradient-to-r from-teal-600 to-teal-700 text-white font-bold text-sm md:text-base rounded-xl hover:shadow-xl shadow-teal-600/40 transform hover:scale-105 active:scale-100 transition-all duration-300">Book Now</button>
            </div>

            <div className={`relative rounded-3xl shadow-xl overflow-hidden transition-all duration-1000 ${visible ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "600ms" }}>
              <img src="https://res.cloudinary.com/dttvw0p7p/video/upload/v1765865228/Untitled_design_xpdwp2.mp4" alt="Featured" className="w-full h-64 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-6">
                <div className="text-white">
                  <h4 className="text-xl md:text-2xl font-bold mb-2">Special Offer</h4>
                  <p className="text-sm md:text-base text-white/90">Up to 40% off on selected destinations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}