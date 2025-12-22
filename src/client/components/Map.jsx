import React, { useState, useEffect } from "react";
import { MapPin, Star, Navigation, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
const optimizeUnsplash = (url) => {
  // If URL already has query params (w=...), append optimization params
  if (url.includes("?")) return url + "&auto=format&fit=crop&q=60";
  return url + "?auto=format&fit=crop&q=60";
};

export default function LocationMap() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // keep original reveal behavior
    const t = setTimeout(() => setIsVisible(true), 8);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Map Container with Google Maps Embed */}
        <div
          className={`relative bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-1000 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          {/* Business Info Card Overlay */}
          <div className="absolute top-4 left-4 z-20 w-full max-w-sm md:max-w-md">
            <div className="bg-white rounded-2xl shadow-2xl p-5 md:p-6 transform hover:scale-[1.02] transition-all duration-300 animate-slide-in">
              <div className="flex justify-between items-start gap-4 mb-3">
                <div className="flex-1">
                  <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                    Tentwood tours and travels
                  </h2>
                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                    2nd floor, City square complex,
                    <br />
                    Aathupalam, Karumbukkadai,
                    <br />
                    Coimbatore, Tamil Nadu 641023
                  </p>
                </div>
                <button className="flex-shrink-0 p-2 md:p-3 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl hover:scale-110 hover:shadow-lg transition-all duration-300">
                  <Navigation size={18} className="md:w-5 md:h-5" />
                  <span className="sr-only">Directions</span>
                </button>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  <span className="text-xl md:text-2xl font-bold text-gray-900">
                    4.8
                  </span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className="fill-yellow-400 text-yellow-400 md:w-4 md:h-4"
                      />
                    ))}
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm md:text-base text-blue-600 font-semibold hover:underline transition-colors"
                >
                  223 reviews
                </a>
              </div>

              <Link
                to="https://maps.app.goo.gl/BpL3qCgP1gR5wGqw8"
                target="blank"
              >
                <button className="w-full cursor-pointer text-blue-600 font-semibold hover:bg-blue-50 py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base group">
                  View larger map
                  <ExternalLink
                    size={14}
                    className="group-hover:translate-x-1 transition-transform md:w-4 md:h-4"
                  />
                </button>
              </Link>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div className="relative w-full h-[500px] md:h-[600px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d979.1995292707613!2d76.96114909688013!3d10.978605532129581!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba85bb9dbb4a0df%3A0x8c9ffbc2c74f096a!2sTentwood%20tours%20and%20travels!5e0!3m2!1sen!2sin!4v1766396168008!5m2!1sen!2sin"
              width="600"
              height="450"
              style="border:0;"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="animate-fade-in"
              title="Tentwood tours and travels location"
            />

            {/* Fallback if iframe doesn't load - Styled Map Background */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-100 via-cyan-50 to-blue-100">
              {/* Map-like pattern */}
              <svg
                className="absolute inset-0 w-full h-full opacity-10"
                aria-hidden="true"
                focusable="false"
              >
                <defs>
                  <pattern
                    id="map-grid"
                    width="50"
                    height="50"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 50 0 L 0 0 0 50"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#map-grid)" />
              </svg>

              {/* Simulated roads */}
              <svg
                className="absolute inset-0 w-full h-full opacity-20"
                aria-hidden="true"
                focusable="false"
              >
                <line
                  x1="0"
                  y1="35%"
                  x2="100%"
                  y2="35%"
                  stroke="#94a3b8"
                  strokeWidth="6"
                />
                <line
                  x1="0"
                  y1="70%"
                  x2="100%"
                  y2="70%"
                  stroke="#94a3b8"
                  strokeWidth="6"
                />
                <line
                  x1="45%"
                  y1="0"
                  x2="45%"
                  y2="100%"
                  stroke="#94a3b8"
                  strokeWidth="6"
                />
                <line
                  x1="75%"
                  y1="0"
                  x2="75%"
                  y2="100%"
                  stroke="#94a3b8"
                  strokeWidth="6"
                />
              </svg>

              {/* Water body simulation */}
              <div className="absolute left-0 top-0 w-2/5 h-full bg-gradient-to-r from-cyan-300/40 via-cyan-200/30 to-transparent animate-water-flow" />

              {/* Location markers */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <div
                  className="relative animate-bounce-smooth"
                  aria-hidden="true"
                >
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-3 bg-red-500/20 rounded-full blur-md" />
                  <MapPin
                    size={56}
                    className="text-red-500 fill-red-500 drop-shadow-2xl"
                  />
                </div>
              </div>

              {/* Nearby location dots */}
              <div className="absolute top-[45%] left-[35%] w-3 h-3 bg-blue-500 rounded-full animate-pulse-soft shadow-lg" />
              <div
                className="absolute top-[68%] left-[40%] w-3 h-3 bg-cyan-500 rounded-full animate-pulse-soft shadow-lg"
                style={{ animationDelay: "0.5s" }}
              />
              <div
                className="absolute top-[75%] left-[60%] w-3 h-3 bg-orange-500 rounded-full animate-pulse-soft shadow-lg"
                style={{ animationDelay: "1s" }}
              />
              <div
                className="absolute top-[70%] left-[73%] w-3 h-3 bg-red-600 rounded-full animate-pulse-soft shadow-lg"
                style={{ animationDelay: "1.5s" }}
              />
            </div>
          </div>

          {/* Map Controls */}
          <div className="absolute bottom-6 right-6 flex flex-col gap-2 md:gap-3 z-10">
            <button className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-300 flex items-center justify-center group border border-gray-200">
              <span className="text-xl md:text-2xl font-bold text-gray-700 group-hover:scale-125 transition-transform">
                +
              </span>
            </button>
            <button className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-300 flex items-center justify-center group border border-gray-200">
              <span className="text-xl md:text-2xl font-bold text-gray-700 group-hover:scale-125 transition-transform">
                −
              </span>
            </button>
            <button className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl shadow-lg hover:shadow-xl hover:bg-blue-50 transition-all duration-300 flex items-center justify-center group border border-gray-200">
              <Navigation
                size={18}
                className="text-blue-600 group-hover:rotate-45 transition-transform md:w-5 md:h-5"
              />
            </button>
          </div>

          {/* Bottom gradient overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/80 to-transparent pointer-events-none" />
        </div>

        {/* Footer Info */}
        <div className="mt-6 text-center">
          <p className="text-xs md:text-sm text-gray-500">
            <button className="text-blue-600 hover:underline transition-colors">
              Keyboard shortcuts
            </button>{" "}
            | Map data ©2025 |{" "}
            <button className="text-blue-600 hover:underline transition-colors">
              Terms
            </button>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes bounce-smooth {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes pulse-soft {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.7;
          }
        }

        @keyframes water-flow {
          0%,
          100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.2;
          }
        }

        .animate-slide-in {
          animation: slide-in 0.8s ease-out;
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        .animate-bounce-smooth {
          animation: bounce-smooth 3s ease-in-out infinite;
        }
        .animate-pulse-soft {
          animation: pulse-soft 2s ease-in-out infinite;
        }
        .animate-water-flow {
          animation: water-flow 6s ease-in-out infinite;
        }

        /* small non-invasive performance hints for mobile */
        @media (max-width: 640px) {
          .animate-bounce-smooth {
            animation-duration: 4s;
          } /* slight slowdown to reduce jank on low-end devices */
          .animate-pulse-soft {
            animation-duration: 2.4s;
          }
        }
      `}</style>
    </div>
  );
}
