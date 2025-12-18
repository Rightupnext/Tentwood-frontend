import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Clock, Users, MapPin } from 'lucide-react';

const TravelShowcase = () => {
  const outsideCityRef = useRef(null);
  const specialFoodsRef = useRef(null);
  const riverActivityRef = useRef(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const outsideCityTours = [
    {
      id: 1,
      category: 'WINTER ADVENTURE',
      title: 'Alaska Wonderland Winter Thames',
      duration: '2 hours',
      facility: 'Transport Facility',
      plan: 'Family Plan',
      rating: 4.5,
      reviews: 354,
      price: 35,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80'
    },
    {
      id: 2,
      category: 'NORTHERN LIGHTS',
      title: 'Aurora Borealis Experience',
      duration: '3 hours',
      facility: 'Transport Facility',
      plan: 'Family Plan',
      rating: 4.8,
      reviews: 421,
      price: 45,
      image: 'https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=600&q=80'
    },
    {
      id: 3,
      category: 'MOUNTAIN ESCAPE',
      title: 'Alpine Magic Mountain Tour',
      duration: '4 hours',
      facility: 'Transport Facility',
      plan: 'Family Plan',
      rating: 4.7,
      reviews: 289,
      price: 55,
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80'
    },
    {
      id: 4,
      category: 'FOREST RETREAT',
      title: 'Enchanted Forest Discovery',
      duration: '2 hours',
      facility: 'Transport Facility',
      plan: 'Family Plan',
      rating: 4.6,
      reviews: 312,
      price: 40,
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80'
    },
    {
      id: 5,
      category: 'WATERFALL WONDER',
      title: 'Cascade Falls Adventure',
      duration: '3 hours',
      facility: 'Transport Facility',
      plan: 'Family Plan',
      rating: 4.9,
      reviews: 567,
      price: 50,
      image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=600&q=80'
    },
    {
      id: 6,
      category: 'LAKE SERENITY',
      title: 'Crystal Lake Retreat',
      duration: '2 hours',
      facility: 'Transport Facility',
      plan: 'Family Plan',
      rating: 4.7,
      reviews: 398,
      price: 38,
      image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=600&q=80'
    },
    {
      id: 7,
      category: 'SUNSET SAFARI',
      title: 'Golden Hour Safari Experience',
      duration: '4 hours',
      facility: 'Transport Facility',
      plan: 'Family Plan',
      rating: 4.8,
      reviews: 445,
      price: 60,
      image: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600&q=80'
    },
    {
      id: 8,
      category: 'VALLEY EXPLORER',
      title: 'Hidden Valley Discovery',
      duration: '5 hours',
      facility: 'Transport Facility',
      plan: 'Family Plan',
      rating: 4.6,
      reviews: 334,
      price: 48,
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80'
    }
  ];

  const specialFoods = [
    {
      id: 9,
      title: 'Alaska: Westminster to Greenwich River Thames',
      duration: '2 hours',
      facility: 'Transport Facility',
      plan: 'Family Plan',
      rating: 4,
      reviews: 584,
      price: 35,
      image: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=600&q=80'
    },
    {
      id: 10,
      title: 'Alaska: Vintage Double Decker Bus Tour & Thames',
      duration: '2 hours',
      facility: 'Transport Facility',
      plan: 'Family Plan',
      rating: 4,
      reviews: 584,
      price: 35,
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&q=80'
    },
    {
      id: 11,
      title: 'Alaska: Magic of London Tour with Afternoon Tea',
      duration: '2 hours',
      facility: 'Transport Facility',
      plan: 'Family Plan',
      rating: 4,
      reviews: 584,
      price: 35,
      image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=80'
    },
    {
      id: 12,
      title: 'Mountain Sunrise Adventure',
      duration: '2 hours',
      facility: 'Transport Facility',
      plan: 'Family Plan',
      rating: 4,
      reviews: 584,
      price: 35,
      image: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=600&q=80'
    },
    {
      id: 13,
      title: 'Mountain Peak Adventure',
      duration: '3 hours',
      facility: 'Transport Facility',
      plan: 'Family Plan',
      rating: 5,
      reviews: 723,
      price: 45,
      image: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=600&q=80'
    },
    {
      id: 14,
      title: 'Sunset Valley Explorer',
      duration: '2 hours',
      facility: 'Transport Facility',
      plan: 'Family Plan',
      rating: 4,
      reviews: 492,
      price: 40,
      image: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=600&q=80'
    },
    {
      id: 15,
      title: 'Coastal Heritage Trail',
      duration: '4 hours',
      facility: 'Transport Facility',
      plan: 'Family Plan',
      rating: 5,
      reviews: 651,
      price: 50,
      image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=600&q=80'
    },
    {
      id: 16,
      title: 'Northern Lights Experience',
      duration: '5 hours',
      facility: 'Transport Facility',
      plan: 'Family Plan',
      rating: 5,
      reviews: 892,
      price: 65,
      image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=600&q=80'
    }
  ];

  const riverActivities = [
    {
      id: 17,
      title: 'Alaska: Westminster to Greenwich River Thames',
      duration: '2 hours',
      facility: 'Transport Facility',
      plan: 'Family Plan',
      rating: 4,
      reviews: 584,
      price: 35,
      image: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=600&q=80'
    },
    {
      id: 18,
      title: 'Alaska: Vintage Double Decker Bus Tour & Thames',
      duration: '2 hours',
      facility: 'Transport Facility',
      plan: 'Family Plan',
      rating: 4,
      reviews: 584,
      price: 35,
      image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80'
    },
    {
      id: 19,
      title: 'Alaska: Magic of London Tour with Afternoon Tea',
      duration: '2 hours',
      facility: 'Transport Facility',
      plan: 'Family Plan',
      rating: 4,
      reviews: 584,
      price: 35,
      image: 'https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=600&q=80'
    },
    {
      id: 20,
      title: 'Desert Canyon Experience',
      duration: '2 hours',
      facility: 'Transport Facility',
      plan: 'Family Plan',
      rating: 4,
      reviews: 584,
      price: 35,
      image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80'
    },
    {
      id: 21,
      title: 'Waterfall Discovery Tour',
      duration: '3 hours',
      facility: 'Transport Facility',
      plan: 'Family Plan',
      rating: 5,
      reviews: 678,
      price: 42,
      image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=600&q=80'
    },
    {
      id: 22,
      title: 'Alpine Lake Retreat',
      duration: '4 hours',
      facility: 'Transport Facility',
      plan: 'Family Plan',
      rating: 5,
      reviews: 534,
      price: 48,
      image: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=600&q=80'
    },
    {
      id: 23,
      title: 'Canyon River Expedition',
      duration: '5 hours',
      facility: 'Transport Facility',
      plan: 'Family Plan',
      rating: 5,
      reviews: 812,
      price: 55,
      image: 'https://images.unsplash.com/photo-1542401886-65d6c61db217?w=600&q=80'
    },
    {
      id: 24,
      title: 'Misty Forest Journey',
      duration: '3 hours',
      facility: 'Transport Facility',
      plan: 'Family Plan',
      rating: 4,
      reviews: 445,
      price: 38,
      image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80'
    }
  ];

  const scroll = (ref, dir) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: dir === 'left' ? -300 : 300,
        behavior: 'smooth'
      });
    }
  };

  const PremiumCard = ({ tour }) => (
    <div
      className="flex-shrink-0 w-72 sm:w-80"
      onMouseEnter={() => setHoveredCard(tour.id)}
      onMouseLeave={() => setHoveredCard(null)}
    >
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
        <div className="relative h-52 overflow-hidden">
          <img
            src={tour.image}
            alt={tour.title}
            className={`w-full h-full object-cover transition-all duration-700 ${
              hoveredCard === tour.id ? 'scale-110 brightness-75' : 'scale-100'
            }`}
            loading="lazy"
          />
          {tour.category && (
            <div className="absolute top-3 left-3">
              <span className="px-3 py-1.5 bg-gradient-to-r from-emerald-400 to-teal-500 text-white text-xs font-bold rounded-full shadow-lg">
                {tour.category}
              </span>
            </div>
          )}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-500 ${
            hoveredCard === tour.id ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="absolute bottom-3 left-3 right-3">
              <button className="w-full py-2.5 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 hover:text-white transition-all duration-300 transform hover:scale-105 text-sm">
                Book Now
              </button>
            </div>
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-bold text-gray-900 mb-3 text-base line-clamp-2 h-12">{tour.title}</h3>
          <div className="space-y-1.5 mb-3 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-blue-500" />
              <span>Duration {tour.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-blue-500" />
              <span>{tour.facility}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-blue-500" />
              <span>{tour.plan}</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-3 border-t">
            <div className="flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(tour.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="text-xs text-gray-500 ml-1">{tour.reviews}</span>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                ${tour.price}.00
              </div>
              <div className="text-xs text-gray-500">per person</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const CompactCard = ({ tour }) => (
    <div
      className="flex-shrink-0 w-64 sm:w-72"
      onMouseEnter={() => setHoveredCard(tour.id)}
      onMouseLeave={() => setHoveredCard(null)}
    >
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
        <div className="relative h-44 overflow-hidden">
          <img
            src={tour.image}
            alt={tour.title}
            className={`w-full h-full object-cover transition-transform duration-500 ${
              hoveredCard === tour.id ? 'scale-110' : 'scale-100'
            }`}
            loading="lazy"
          />
          <div className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300 ${
            hoveredCard === tour.id ? 'opacity-100' : 'opacity-0'
          }`} />
        </div>
        <div className="p-4">
          <h3 className="font-bold text-gray-900 mb-2 text-sm line-clamp-2 h-10">{tour.title}</h3>
          <div className="space-y-1 mb-3 text-xs text-gray-600">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              <span>Duration {tour.duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3" />
              <span>{tour.facility}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-3 h-3" />
              <span>{tour.plan}</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-3 border-t">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < tour.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="text-xs text-gray-500 ml-1">{tour.reviews}</span>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-blue-600">${tour.price}.00</div>
              <div className="text-xs text-gray-500">per person</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Outside The City Specials */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                Outside The City Specials
              </h1>
              <p className="text-sm text-gray-600">Discover breathtaking adventures beyond the urban landscape</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => scroll(outsideCityRef, 'left')}
                className="p-2.5 rounded-full bg-white shadow-lg bg-yellow-400 hover:shadow-xl cursor-pointer transition-all duration-300   hover:text-white group"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700 group-hover:text-white" />
              </button>
              <button
                onClick={() => scroll(outsideCityRef, 'right')}
                className="p-2.5 rounded-full bg-white shadow-lg hover:shadow-xl bg-yellow-400 transition-all cursor-pointer duration-300    hover:text-white group"
              >
                <ChevronRight className="w-5 h-5 text-gray-700 group-hover:text-white" />
              </button>
            </div>
          </div>
          <div
            ref={outsideCityRef}
            className="flex gap-5 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {outsideCityTours.map((tour) => (
              <PremiumCard key={tour.id} tour={tour} />
            ))}
          </div>
        </section>

        {/* Special Foods Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <span className="px-6 py-2 bg-blue-500 text-white text-sm font-bold rounded-full">
              SPECIAL FOODS
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => scroll(specialFoodsRef, 'left')}
                className="p-2 rounded-full bg-yellow shadow-md hover:shadow-lg bg-yellow-400 hover:text-white transition-all  cursor-pointer duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll(specialFoodsRef, 'right')}
                className="p-2 rounded-full bg-white shadow-md hover:shadow-lg bg-yellow-400 hover:text-white transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div
            ref={specialFoodsRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {specialFoods.map((tour) => (
              <CompactCard key={tour.id} tour={tour} />
            ))}
          </div>
        </section>

        {/* River Activity Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <span className="px-6 py-2 bg-gradient-to-r from-red-400 to-pink-500 text-white text-sm font-bold rounded-full">
              RIVER ACTIVITY
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => scroll(riverActivityRef, 'left')}
                className="p-2 rounded-full bg-white shadow-md hover:shadow-lg bg-yellow-400 hover:text-white transition-all cursor-pointer duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll(riverActivityRef, 'right')}
                className="p-2 rounded-full bg-white shadow-md hover:shadow-lg bg-yellow-400 hover:text-white transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div
            ref={riverActivityRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {riverActivities.map((tour) => (
              <CompactCard key={tour.id} tour={tour} />
            ))}
          </div>
        </section>

        {/* Decorative Elements */}
        <div className="fixed top-10 right-8 w-20 h-20 bg-yellow-300 rounded-full blur-2xl opacity-30 pointer-events-none" />
        <div className="fixed top-10 right-2 w-16 h-16 bg-yellow-400 rounded-full opacity-80 pointer-events-none" />
        <div className="fixed bottom-80 right-8 w-20 h-20 bg-yellow-300 rounded-full blur-2xl opacity-30 pointer-events-none" />
        <div className="fixed bottom-80 right-2 w-16 h-16 bg-yellow-400 rounded-full opacity-80 pointer-events-none" />
      </div>
    </div>
  );
};

export default TravelShowcase;