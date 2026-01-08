import React, { useState, useEffect, useRef } from "react";
import {
  EnvironmentOutlined,
  UserOutlined,
  CalendarOutlined,
  SearchOutlined,
  CloseCircleFilled,
} from "@ant-design/icons";

import bannervideo1 from "../../assets/home/bannervideo.1.mp4";
import bannerImg from "../../assets/home/banner.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const categoryRouteMap = {
  "International Trips": "international-trips",
  "India Trips": "india-trips",
  "Group Tours": "group-tours",
  "Honeymoon Packages": "honeymoon-packages",
};

export default function Banner() {
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const [location, setLocation] = useState("");
  const [playVideo, setPlayVideo] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isSearching, setIsSearching] = useState(false);

  const packages = useSelector((state) => state.packages.list);

  const handleSearch = () => {
    if (!location.trim()) return;

    setIsSearching(true);
    const searchValue = location.toLowerCase().trim();

    // Find package matching Destination.name
    const matchedPackage = packages.find(
      (pkg) =>
        pkg?.Destination?.name &&
        pkg.Destination.name.toLowerCase().includes(searchValue)
    );

    if (!matchedPackage) {
      setTimeout(() => {
        setIsSearching(false);
        alert("Destination not found");
      }, 300);
      return;
    }

    // Pick first category
    const category = matchedPackage.tripCategories?.[0];
    const categoryRoute = categoryRouteMap[category];

    if (!categoryRoute) {
      setTimeout(() => {
        setIsSearching(false);
        alert("Category route not found");
      }, 300);
      return;
    }

    // Format destination for URL
    const destinationSlug = matchedPackage.Destination.name
      .toLowerCase()
      .replace(/\s+/g, "-");

    navigate(`/${categoryRoute}/${destinationSlug}`);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocation(value);
    setSelectedIndex(-1);

    if (!value.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const filtered = packages
      .filter(
        (pkg) =>
          pkg?.Destination?.name &&
          pkg.Destination.name.toLowerCase().includes(value.toLowerCase())
      )
      // remove duplicates
      .reduce((acc, curr) => {
        if (!acc.find((i) => i.Destination.name === curr.Destination.name)) {
          acc.push(curr);
        }
        return acc;
      }, [])
      .slice(0, 6);

    setSuggestions(filtered);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (pkg) => {
    const category = pkg.tripCategories?.find((cat) => categoryRouteMap[cat]);
    const categoryRoute = categoryRouteMap[category];

    if (!categoryRoute) return;

    const destinationSlug = pkg.Destination.name
      .toLowerCase()
      .replace(/\s+/g, "-");

    navigate(`/${categoryRoute}/${destinationSlug}`);
    setShowSuggestions(false);
    setLocation(pkg.Destination.name);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
        handleSuggestionClick(suggestions[selectedIndex]);
      } else {
        handleSearch();
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const clearSearch = () => {
    setLocation("");
    setSuggestions([]);
    setShowSuggestions(false);
    setSelectedIndex(-1);
  };

  // Delay video to protect LCP
  useEffect(() => {
    const timer = setTimeout(() => {
      setPlayVideo(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* BACKGROUND: IMAGE FIRST, VIDEO LATER */}
      {!playVideo ? (
        <img
          src={bannerImg}
          alt="Travel Banner"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
      ) : (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={bannervideo1}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
        />
      )}

      {/* GRADIENT OVERLAYS */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent" />

      {/* MAIN CONTENT */}
      <div className="relative flex flex-col items-center justify-center px-4 py-16 md:py-24 z-10 min-h-screen">
        {/* HERO TEXT */}
        <div className="max-w-5xl text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-2xl">
            We Find The Best Tours For You
          </h1>
        </div>

        {/* FLOATING ICONS */}
        <div className="relative w-full max-w-2xl mx-auto mb-16">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-16 h-16 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl">
            <EnvironmentOutlined className="!text-teal-500 !text-xl" />
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 w-16 h-16 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl">
            <UserOutlined className="!text-teal-500 !text-xl" />
          </div>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-16 h-16 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl">
            <CalendarOutlined className="!text-teal-500 !text-xl" />
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="w-full max-w-6xl px-4" ref={searchRef}>
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-8 border border-white/40 transition-all hover:shadow-3xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* LOCATION */}
              <div className="md:col-span-2 relative space-y-2 pb-4 md:pb-0 md:border-r border-gray-300 md:pr-4">
                <label className="flex items-center gap-2 text-sm font-bold text-teal-600">
                  <EnvironmentOutlined className="text-lg" />
                  Location
                </label>
                <div className="relative flex items-center gap-2">
                  <SearchOutlined className="text-gray-400 text-lg" />
                  <input
                    type="text"
                    placeholder="Search For A Destination"
                    value={location}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => location && setShowSuggestions(true)}
                    className="flex-1 py-2 bg-transparent text-gray-700 placeholder:text-gray-400 focus:outline-none text-lg"
                  />
                  {location && (
                    <button
                      onClick={clearSearch}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <CloseCircleFilled className="text-xl" />
                    </button>
                  )}
                </div>

                {/* SUGGESTIONS DROPDOWN */}
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                    <div className="px-4 py-2  bg-gradient-to-r from-teal-50 to-blue-50 border-b border-gray-200">
                      <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                        Suggested Destinations
                      </p>
                    </div>
                    <ul className="max-h-80 overflow-y-auto divide-y divide-gray-100">
                      {suggestions.map((pkg, idx) => {
                        const name = pkg.Destination.name;
                        const searchTerm = location.toLowerCase();
                        const index = name.toLowerCase().indexOf(searchTerm);
                        const isSelected = idx === selectedIndex;

                        return (
                          <li
                            key={pkg._id}
                            onClick={() => handleSuggestionClick(pkg)}
                            className={`group cursor-pointer px-5 py-4 flex items-start gap-4 transition-all ${
                              isSelected
                                ? "bg-teal-50 border-l-4 border-teal-500"
                                : "hover:bg-gray-50 border-l-4 border-transparent"
                            }`}
                          >
                            {/* Icon */}
                            <div
                              className={`mt-1 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                                isSelected
                                  ? "bg-teal-500 text-white scale-110"
                                  : "bg-teal-50 text-teal-500 group-hover:bg-teal-100 group-hover:scale-110"
                              }`}
                            >
                              <EnvironmentOutlined className="text-lg" />
                            </div>

                            {/* Text */}
                            <div className="flex flex-col flex-1 min-w-0 ">
                              <span className="text-base font-semibold text-gray-800 truncate">
                                {index > -1 ? (
                                  <>
                                    {name.slice(0, index)}
                                    <span className="text-teal-600 bg-teal-50 px-1 rounded">
                                      {name.slice(
                                        index,
                                        index + location.length
                                      )}
                                    </span>
                                    {name.slice(index + location.length)}
                                  </>
                                ) : (
                                  name
                                )}
                              </span>

                              {/* Category Badge */}
                              {pkg.tripCategories?.[0] && (
                                <span className="inline-flex items-center gap-1 mt-1.5 text-xs font-medium text-teal-700 bg-teal-50 px-2 py-1 rounded-full w-fit">
                                  <CalendarOutlined className="text-xs" />
                                  {pkg.tripCategories[0]}
                                </span>
                              )}
                            </div>

                            {/* Arrow indicator */}
                            <div className="flex-shrink-0 text-gray-400 group-hover:text-teal-500 transition-all group-hover:translate-x-1">
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </div>
                          </li>
                        );
                      })}
                    </ul>

                    {/* Footer hint */}
                    <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
                      <p className="text-xs text-gray-500 text-center">
                        Use ↑↓ to navigate • Enter to select • Esc to close
                      </p>
                    </div>
                  </div>
                )}

                {/* NO RESULTS */}
                {showSuggestions && location && suggestions.length === 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                      <SearchOutlined className="text-3xl text-gray-400" />
                    </div>
                    <p className="text-gray-600 font-medium mb-1">
                      No destinations found
                    </p>
                    <p className="text-sm text-gray-500">
                      Try searching for a different location
                    </p>
                  </div>
                )}
              </div>

              {/* SEARCH BUTTON */}
              <div className="flex items-end">
                <button
                  onClick={handleSearch}
                  disabled={isSearching}
                  className={`w-full px-8 py-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 text-gray-900 rounded-full font-bold shadow-xl transition-all ${
                    isSearching
                      ? "opacity-75 cursor-not-allowed"
                      : "hover:shadow-2xl hover:scale-105 active:scale-95"
                  }`}
                >
                  {isSearching ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Searching...
                    </span>
                  ) : (
                    "Search"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM FADE */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/40 to-transparent pointer-events-none" />
    </div>
  );
}
