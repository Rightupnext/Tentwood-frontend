import React, { useState, useEffect, useRef, useMemo } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import TourCard from "./TourCard";
import { categories } from "./categories";
import { generateRatings } from "./utils";

export default function CityExplorer({ packages }) {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [showFullOverview, setShowFullOverview] = useState(false);
  const scrollRef = useRef(null);

  const OVERVIEW_LIMIT = 180;
  const getOverviewText = (text) =>
    !text
      ? ""
      : showFullOverview || text.length <= OVERVIEW_LIMIT
      ? text
      : text.slice(0, OVERVIEW_LIMIT) + "...";

  const packagesWithRatings = useMemo(
    () => generateRatings(packages),
    [packages]
  );

  const destinationNames = useMemo(
    () => [
      ...new Set(
        packagesWithRatings.map((p) => p?.Destination?.name).filter(Boolean)
      ),
    ],
    [packagesWithRatings]
  );

  useEffect(() => {
    if (destinationNames.length && !selectedDestination)
      setSelectedDestination(destinationNames[0]);
  }, [destinationNames, selectedDestination]);

  const filteredPackages = useMemo(() => {
    if (!selectedDestination) return [];
    return packagesWithRatings.filter(
      (p) => p?.Destination?.name === selectedDestination
    );
  }, [packagesWithRatings, selectedDestination]);

  const scrollLeft = () =>
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  const scrollRight = () =>
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });

  const heroPackage = filteredPackages[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Destination Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {destinationNames.map((c, i) => (
            <button
              key={c}
              onClick={() => setSelectedDestination(c)}
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

        {/* Hero */}
        {/* Hero Section */}
        {heroPackage && (
          <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-10 sm:mb-14 md:mb-16 group animate-scaleIn">
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
              <img
                loading="lazy"
                src={`${import.meta.env.VITE_BACKEND_URL}${
                  heroPackage?.heroMedia?.fileUrl
                }`}
                alt={heroPackage?.packageTitle}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            <div className="absolute bottom-10 left-10 right-10 bg-white/95 backdrop-blur-md rounded-2xl p-8 shadow-xl">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {heroPackage?.packageTitle}
              </h2>
              <p className="text-gray-600 max-w-3xl">
                {getOverviewText(heroPackage.overview)}
              </p>

              <div className="flex flex-wrap gap-3 sm:gap-4">
                {categories.map((cat, i) => {
                  const Icon = cat.icon;
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-3 px-4 py-2 bg-white rounded-xl border shadow-sm"
                    >
                      <div
                        className={`w-10 h-10 ${cat.iconBg} rounded-lg sm:rounded-xl flex items-center justify-center`}
                      >
                        <Icon
                          className={`w-4 h-4 sm:w-5 sm:h-5 ${cat.color}`}
                        />
                      </div>
                      <span className="text-gray-700 text-xs sm:text-sm font-medium whitespace-nowrap">
                        {cat.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Scroll Buttons */}
        <div className="flex justify-end gap-2 mb-4">
          <button onClick={scrollLeft} className="btn-circle">
            <LeftOutlined />
          </button>
          <button onClick={scrollRight} className="btn-circle">
            <RightOutlined />
          </button>
        </div>

        {/* Cards */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto no-scrollbar"
        >
          {filteredPackages.map((pkg, i) => (
            <TourCard key={pkg._id} t={pkg} i={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
