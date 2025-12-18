import React, { useState } from 'react';
import { Calendar, Users, MapPin, Clock, CheckCircle, Plus, Minus, X } from 'lucide-react';

export default function TourBooking() {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [guests, setGuests] = useState(2);
  const [expandedDay, setExpandedDay] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [mainImage, setMainImage] = useState('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80');
  const [showImageModal, setShowImageModal] = useState(false);
  const [modalImage, setModalImage] = useState('');

  const images = [
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80',
    'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=600&q=80',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
    'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600&q=80',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80'
  ];

  const tabs = [
    { id: 'overview', title: 'Overview & Highlights' },
    { id: 'itinerary', title: 'Itinerary' },
    { id: 'inclusions', title: 'Inclusions' },
    { id: 'exclusions', title: 'Exclusions' },
    { id: 'otherinfo', title: 'Other Info' }
  ];

  const itinerary = [
    { day: 1, title: 'Arrival in Hawaii - Half-Day City Tour', desc: 'Welcome to Hawaii! Start your journey with a guided city tour exploring the main attractions.' },
    { day: 2, title: 'Arrival in Hawaii - Half-Day City Tour', desc: 'Experience the beautiful beaches and local culture of Hawaii.' },
    { day: 3, title: 'Arrival in Hawaii - Half-Day City Tour', desc: 'Visit famous landmarks and enjoy water activities.' },
    { day: 4, title: 'Arrival in Hawaii - Half-Day City Tour', desc: 'Final day exploring hidden gems before departure.' }
  ];

  const inclusions = [
    'Include donkey Tranquillo tour',
    'Return trip airport transfer from Theresa',
    'Changing of the Guard',
    'Captain fees'
  ];

  const exclusions = [
    'Include donkey Tranquillo tour',
    'Return trip airport from Theresa',
    'Changing of the Guard',
    'Captain fees'
  ];

  const otherInfo = [
    'Carousel Location on board by three incurrenties orange shoals via the bay',
    'Discover London at night',
    'See the Changing of the Guard',
    'Go by Doubledecker follow',
    'Listen to the History of Big Ben and see the Pictures of Telephoto'
  ];

  const handleImageClick = (img) => {
    setModalImage(img);
    setShowImageModal(true);
  };

  const goToNextTab = () => {
    const currentIndex = tabs.findIndex(t => t.id === activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].id);
    }
  };

  const goToPrevTab = () => {
    const currentIndex = tabs.findIndex(t => t.id === activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].id);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview & Highlights</h2>
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg p-4 mb-4">
              <p className="text-gray-700 text-sm leading-relaxed">
                <span className="font-semibold text-teal-600">Heaven - Sky-Along trip - All-road - Sky Bridge - Blue sea - Sea to the fiddle - Sky bridge - Plan Green</span>
              </p>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Of: Route No. 4, TN-2ip, Fahapur, Mall Floor With T-Mixer, Clove, Street Finance, Closing Lacquer Nights, 
              Fuel Munities, Nite 300 Clay Spaces, Wall Shift in Clown, Ceiling Sky Maker, Je Car Clust, Placebo, Ta Gi Fuyu Pha, 
              Plus the Galas, Galo Light, Gaga Grass, Shaggi Rave, Go Fiole Fit Classy, Classy, Go Fiale Fit Classy, Orange 
              Shook, Classy, Go Fiale Classy...
            </p>
            <button className="mt-4 text-teal-600 font-semibold text-sm hover:text-teal-700 transition-colors">
              Read More →
            </button>
          </div>
        );
      
      case 'itinerary':
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Itinerary</h2>
            <div className="space-y-3">
              {itinerary.map((item) => (
                <div key={item.day} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedDay(expandedDay === item.day ? null : item.day)}
                    className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-teal-50 to-cyan-50 hover:from-teal-100 hover:to-cyan-100 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-white text-teal-600 font-bold rounded-md shadow-sm">
                        Day {item.day}
                      </span>
                      <span className="font-semibold text-gray-800 text-sm">{item.title}</span>
                    </div>
                    <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                      {expandedDay === item.day ? '−' : '+'}
                    </div>
                  </button>
                  {expandedDay === item.day && (
                    <div className="p-4 bg-white border-t animate-fade-in">
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'inclusions':
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Inclusions</h2>
            <ul className="space-y-2">
              {inclusions.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-700 text-sm">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      
      case 'exclusions':
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Exclusions</h2>
            <ul className="space-y-2">
              {exclusions.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-700 text-sm">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      
      case 'otherinfo':
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Other Info</h2>
            <ul className="space-y-2">
              {otherInfo.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-700 text-sm">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Image Modal */}
      {showImageModal && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setShowImageModal(false)}
        >
          <button 
            onClick={() => setShowImageModal(false)}
            className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-all"
          >
            <X className="w-6 h-6" />
          </button>
          <img 
            src={modalImage}
            alt="Full view"
            className="max-w-full max-h-full object-contain rounded-lg animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Vintage Double Decker Bus Tour & Thames River Cruise
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-teal-500" />
                  <span>Pick & Drop</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-teal-500" />
                  <span>Duration</span>
                </div>
                <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-semibold">
                  6 Activities | 2 Days | 2 Nights | Self-guided
                </span>
              </div>
            </div>

            {/* Main Image */}
            <div 
              className="relative overflow-hidden rounded-2xl shadow-xl animate-fade-in-up cursor-pointer"
              onClick={() => handleImageClick(mainImage)}
            >
              <img 
                src={mainImage}
                alt="Mountain view"
                className="w-full h-64 md:h-96 object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 animate-fade-in-up">
              {images.map((img, i) => (
                <div 
                  key={i} 
                  className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer"
                  onClick={() => setMainImage(img)}
                >
                  <img 
                    src={img}
                    alt={`Gallery ${i + 1}`}
                    className="w-full h-20 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                </div>
              ))}
            </div>

            {/* Tab Navigation */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-fade-in-up">
              <div className="border-b border-gray-200">
                <div className="flex overflow-x-auto scrollbar-hide">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-shrink-0 px-4 sm:px-6 py-4 text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'text-teal-600 border-b-2 border-teal-600 bg-teal-50'
                          : 'text-gray-600 hover:text-teal-600 hover:bg-gray-50'
                      }`}
                    >
                      {tab.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {renderTabContent()}

                {/* Navigation Buttons */}
                <div className={`flex ${activeTab === 'overview' ? 'justify-end' : activeTab === 'otherinfo' ? 'justify-start' : 'justify-between'} mt-6 pt-4 border-t border-gray-200`}>
                  {activeTab !== 'overview' && (
                    <button
                      onClick={goToPrevTab}
                      className="px-6 py-2 bg-white border-2 border-teal-500 text-teal-600 rounded-lg font-semibold hover:bg-teal-50 transition-all duration-300 hover:scale-105 shadow-md flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Previous
                    </button>
                  )}
                  {activeTab !== 'otherinfo' && (
                    <button
                      onClick={goToNextTab}
                      className="px-6 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg font-semibold hover:from-teal-600 hover:to-teal-700 transition-all duration-300 hover:scale-105 shadow-md flex items-center gap-2"
                    >
                      Next
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Checkout Button Mobile */}
            <button 
              onClick={() => setShowCheckout(!showCheckout)}
              className="lg:hidden w-full py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-bold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Checkout - $72,889
            </button>
          </div>

          {/* Right Sidebar - Booking */}
          <div className={`lg:block ${showCheckout ? 'block' : 'hidden'}`}>
            <div className="sticky top-8 space-y-6">
              {/* Booking Card */}
              <div className="bg-white rounded-xl shadow-xl p-6 animate-fade-in-up">
                <div className="mb-6">
                  <div className="flex items-center gap-2 text-teal-600 mb-2">
                    <MapPin className="w-5 h-5" />
                    <span className="font-semibold text-sm">Pickup Available At Multiple Points</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-5 h-5" />
                    <span className="text-sm">Duration</span>
                  </div>
                </div>

                <button className="w-full py-3 bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-lg hover:from-teal-500 hover:to-teal-600 transition-all duration-300 hover:scale-105 shadow-lg mb-6">
                  Confirm Booking
                </button>

                {/* Booking Form */}
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-900">Booking</h3>
                  
                  {/* From Date */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">From</label>
                    <input 
                      type="date"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* To Date */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">To</label>
                    <input 
                      type="date"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Guests */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">No. Of Guests</label>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        className="w-10 h-10 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all hover:scale-110 flex items-center justify-center"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                      <input 
                        type="text"
                        value={`${guests} Guests`}
                        readOnly
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-center font-semibold"
                      />
                      <button 
                        onClick={() => setGuests(guests + 1)}
                        className="w-10 h-10 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all hover:scale-110 flex items-center justify-center"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Total Price */}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-600">Total</span>
                      <span className="text-3xl font-bold text-teal-600">$72,889</span>
                    </div>
                    <button className="w-full py-3 bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-lg hover:from-teal-500 hover:to-teal-600 transition-all duration-300 hover:scale-105 shadow-lg">
                      Confirm Booking
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
