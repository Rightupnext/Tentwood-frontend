import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  CarOutlined,
  CompassOutlined,
  CarryOutOutlined,
  EnvironmentOutlined,
  StarOutlined,
  LeftOutlined,
  RightOutlined,
  ClockCircleOutlined,
  StarFilled,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

// Categories constant
const categories = [
  { icon: CarOutlined, label: "Public Transportations", color: "text-pink-500", iconBg: "bg-pink-50" },
  { icon: CompassOutlined, label: "Nature & Adventure", color: "text-teal-500", iconBg: "bg-teal-50" },
  { icon: CarryOutOutlined, label: "Private Transportations", color: "text-yellow-500", iconBg: "bg-yellow-50" },
  { icon: EnvironmentOutlined, label: "Business Tours", color: "text-red-500", iconBg: "bg-red-50" },
  { icon: StarOutlined, label: "Local Visit", color: "text-blue-500", iconBg: "bg-blue-50" },
];

// Precompute rating helper
const generateRatings = (packages) =>
  packages.map((pkg) => ({ ...pkg, rating: (Math.random() * (5 - 3.5) + 3.5).toFixed(1) }));

// ===================== TourCard =====================
const TourCard = React.memo(({ t, i }) => {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleNavigate = () => {
    const TRIP_ROUTE_MAP = {
      "India Trips": "india-trips",
      "International Trips": "international-trips",
      "Honeymoon Packages": "honeymoon-packages",
      "Group Tour": "group-tour",
    };
    const prefix = TRIP_ROUTE_MAP[t?.tripCategory];
    if (!prefix) return;

    navigate(`/${prefix}/${t?.Destination?.name?.toLowerCase().replace(/\s+/g, "-")}`, {
      state: { id: t?._id },
    });
  };

  return (
    <div
      key={t._id}
      className="tour-card flex-shrink-0 w-[240px] sm:w-[280px] md:w-[300px] lg:w-[320px] bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 group cursor-pointer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ animation: `fadeInUp 0.6s ease-out ${i * 50}ms both` }}
    >
      <div className="relative h-48 sm:h-52 md:h-56 w-full overflow-hidden bg-gray-200">
        {!imgLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" style={{ backgroundSize: "200% 100%" }} />
        )}

        <img
          loading="lazy"
          src={`${import.meta.env.VITE_BACKEND_URL}${t?.cardMedia?.fileUrl}`}
          alt={t.title}
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 ${imgLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"} group-hover:scale-110`}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-xl transform transition-all duration-300 group-hover:scale-110">
          <StarOutlined className="w-3 h-3 fill-white" />
          {t.tripCategory}
        </div>

        {hover && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button onClick={handleNavigate} className="bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 shadow-2xl">
              <span className="text-sm font-bold text-gray-900">View Details →</span>
            </button>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-teal-600 transition-colors duration-300 text-base">{t.packageTitle}</h3>

        <div className="space-y-2.5 text-sm text-gray-600">
          <div className="flex items-center gap-2 transform transition-transform duration-300 group-hover:translate-x-1">
            <ClockCircleOutlined className="w-4 h-4 text-teal-600" />
            <span>Duration {t.durationDays}</span>
          </div>
          <div className="flex items-center gap-2 transform transition-transform duration-300 group-hover:translate-x-1">
            <CarOutlined className="w-4 h-4 text-teal-600" />
            <span>Transport Facility </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-4">
          <div>
            <div className="flex items-center gap-1 mb-1">
              {[...Array(5)].map((_, idx) => {
                if (idx + 1 <= t.rating) return <StarFilled key={idx} className="w-4 h-4 !text-yellow-400" />;
                else if (idx + 0.5 <= t.rating) return <StarFilled key={idx} className="w-4 h-4 !text-yellow-200" />;
                else return <StarOutlined key={idx} className="w-4 h-4 text-gray-300" />;
              })}
            </div>
            <span className="text-xs text-gray-500">{t.rating} reviews</span>
          </div>

          <div className="text-right">
            <div className="text-2xl font-bold text-teal-600 group-hover:scale-110 transition-transform duration-300">₹ {t.price}.00</div>
            <div className="text-xs text-gray-500">per person</div>
          </div>
        </div>
      </div>

      <div className="h-1 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </div>
  );
});

// ===================== CityExplorer =====================
export default function CityExplorer({ packages }) {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [showFullOverview, setShowFullOverview] = useState(false);
  const scrollRef = useRef(null);

  const OVERVIEW_LIMIT = 180;
  const getOverviewText = (text) => (!text ? "" : showFullOverview || text.length <= OVERVIEW_LIMIT ? text : text.slice(0, OVERVIEW_LIMIT) + "...");

  // Memoized packages with ratings
  const packagesWithRatings = useMemo(() => generateRatings(packages), [packages]);

  // Destination names
  const destinationNames = useMemo(
    () => [...new Set(packagesWithRatings.map((p) => p?.Destination?.name).filter(Boolean))],
    [packagesWithRatings]
  );

  // Set default destination
  useEffect(() => {
    if (destinationNames.length && !selectedDestination) setSelectedDestination(destinationNames[0]);
  }, [destinationNames, selectedDestination]);

  // Filtered packages for selected destination
  const filteredPackages = useMemo(() => {
    if (!selectedDestination) return [];
    return packagesWithRatings.filter((p) => p?.Destination?.name === selectedDestination);
  }, [packagesWithRatings, selectedDestination]);

  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  const scrollRight = () => scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });

  const heroPackage = filteredPackages[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 sm:py-12 md:py-16 px-3 sm:px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Destination Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 md:mb-12">
          {destinationNames.map((c, i) => (
            <button
              key={c}
              onClick={() => setSelectedDestination(c)}
              style={{ animationDelay: `${i * 50}ms` }}
              className={`px-5 sm:px-7 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-500 animate-fadeIn shadow-sm ${
                selectedDestination === c
                  ? "bg-gradient-to-r from-teal-400 to-teal-500 text-white shadow-lg shadow-teal-300/50 scale-105 hover:shadow-xl"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-teal-300 hover:shadow-md hover:scale-105"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Hero Section */}
        {heroPackage && (
          <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-10 sm:mb-14 md:mb-16 group animate-scaleIn">
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
              <img
                loading="lazy"
                src={`${import.meta.env.VITE_BACKEND_URL}${heroPackage?.heroMedia?.fileUrl}`}
                alt={heroPackage?.packageTitle}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            <div className="absolute bottom-10 left-10 right-10 bg-white/95 backdrop-blur-md rounded-2xl p-8 shadow-xl">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{heroPackage?.packageTitle}</h2>
              <p className="text-gray-600 max-w-3xl">{getOverviewText(heroPackage.overview)}</p>

              <div className="flex flex-wrap gap-3 sm:gap-4">
                {categories.map((cat, i) => {
                  const Icon = cat.icon;
                  return (
                    <div key={i} className="flex items-center gap-3 px-4 py-2 bg-white rounded-xl border shadow-sm">
                      <div className={`w-10 h-10 ${cat.iconBg} rounded-lg sm:rounded-xl flex items-center justify-center`}>
                        <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${cat.color}`} />
                      </div>
                      <span className="text-gray-700 text-xs sm:text-sm font-medium whitespace-nowrap">{cat.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Scroll Buttons */}
        <div className="flex gap-2 sm:gap-3 justify-end mb-4">
          <button
            onClick={scrollLeft}
            className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300"
          >
            <LeftOutlined className="text-white text-lg sm:text-xl" />
          </button>
          <button
            onClick={scrollRight}
            className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300"
          >
            <RightOutlined className="text-white text-lg sm:text-xl" />
          </button>
        </div>

        {/* Cards */}
        <div ref={scrollRef} className="flex gap-5 overflow-x-auto scroll-smooth no-scrollbar">
          {filteredPackages.map((pkg, i) => (
            <div key={pkg._id} className="min-w-[280px] sm:min-w-[300px] lg:min-w-[320px]">
              <TourCard t={pkg} i={i} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
