import React, { useEffect, useState } from "react";
import { Calendar, Clock, Users, ChevronDown, Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPackages } from "../../store/slices/packageSlice";
import { useNavigate } from "react-router-dom";

export default function LondonActivities() {
  const dispatch = useDispatch();
  const { list: packages, loading } = useSelector((state) => state.packages);
  const navigate = useNavigate();
  const [fromDate, setFromDate] = useState("10/12/2021");
  const [toDate, setToDate] = useState("10/12/2021");
  const [themeOpen, setThemeOpen] = useState(true);
  const [durationOpen, setDurationOpen] = useState(true);
  const [destOpen, setDestOpen] = useState(true);
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [selectedThemes, setSelectedThemes] = useState([]);
  const prices = packages.map((p) => p.price).filter(Boolean);
  const maxPrice = prices.length ? Math.max(...prices) : 100000;

  const [selectedPrice, setSelectedPrice] = useState(maxPrice);

  // Extract unique destinations from API data
  const destinations = [
    ...new Set(
      packages.map((p) => p?.Destination?.Destination).filter(Boolean)
    ),
  ];

  // Extract unique themes/trips from API data
  const themes = [
    ...new Set(packages.map((p) => p?.Destination?.trip).filter(Boolean)),
  ];

  const toggleFilter = (value, state, setState) => {
    setState((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  // Filter packages based on selected filters
  const filteredPackages = packages.filter((p) => {
    const destinationMatch =
      selectedDestinations.length === 0 ||
      selectedDestinations.includes(p?.Destination?.Destination);

    const themeMatch =
      selectedThemes.length === 0 ||
      selectedThemes.includes(p?.Destination?.trip);

    const priceMatch = p.price <= selectedPrice;

    return destinationMatch && themeMatch && priceMatch;
  });

  useEffect(() => {
    dispatch(fetchPackages());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
          Things To Do In London
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 mb-6">
          {filteredPackages.length} Activities Found
        </p>

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* SIDEBAR */}
          <div className="w-full lg:w-64 flex-shrink-0 bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Availability */}
            <div className="p-4 sm:p-5 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4 text-sm sm:text-base">
                Availability
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] sm:text-xs text-gray-600 mb-1 block">
                    From
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:border-teal-500"
                    />
                    <Calendar className="absolute right-2 top-2 w-4 h-4 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] sm:text-xs text-gray-600 mb-1 block">
                    To
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:border-teal-500"
                    />
                    <Calendar className="absolute right-2 top-2 w-4 h-4 text-gray-400" />
                  </div>
                </div>

                <button className="w-full bg-teal-500 text-white py-2 rounded text-sm hover:bg-teal-600">
                  Check Availability
                </button>
              </div>
            </div>
            {/* Price Range */}
            <div className="p-4 sm:p-5 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4 text-sm sm:text-base">
                Price
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between text-xs text-gray-600">
                  <span>₹0</span>
                  <span>₹{selectedPrice}</span>
                </div>

                <input
                  type="range"
                  min={0}
                  max={maxPrice}
                  value={selectedPrice}
                  onChange={(e) => setSelectedPrice(Number(e.target.value))}
                  className="w-full accent-teal-500"
                />
              </div>
            </div>

            {/* Theme */}
            <div className="p-4 sm:p-5 border-b border-gray-200">
              <div
                className="flex items-center justify-between cursor-pointer mb-3"
                onClick={() => setThemeOpen(!themeOpen)}
              >
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                  Theme
                </h3>
                <ChevronDown
                  className={`w-4 h-4 text-gray-600 transition-transform ${
                    themeOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
              {themeOpen && (
                <div className="space-y-2">
                  {themes.map((theme) => (
                    <label
                      key={theme}
                      className="flex items-center text-xs text-gray-700 cursor-pointer hover:text-gray-900"
                    >
                      <input
                        type="checkbox"
                        checked={selectedThemes.includes(theme)}
                        onChange={() =>
                          toggleFilter(theme, selectedThemes, setSelectedThemes)
                        }
                        className="w-3 h-3 mr-2 text-teal-500 border-gray-300 rounded"
                      />
                      {theme}
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Destination */}
            <div className="p-4 sm:p-5">
              <div
                className="flex items-center justify-between cursor-pointer mb-3"
                onClick={() => setDestOpen(!destOpen)}
              >
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                  Destination
                </h3>
                <ChevronDown
                  className={`w-4 h-4 text-gray-600 transition-transform ${
                    destOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
              {destOpen && (
                <div className="space-y-2">
                  {destinations.slice(0, 7).map((dest) => (
                    <label
                      key={dest}
                      className="flex items-center text-xs text-gray-700 cursor-pointer hover:text-gray-900"
                    >
                      <input
                        type="checkbox"
                        checked={selectedDestinations.includes(dest)}
                        onChange={() =>
                          toggleFilter(
                            dest,
                            selectedDestinations,
                            setSelectedDestinations
                          )
                        }
                        className="w-3 h-3 mr-2 text-teal-500 border-gray-300 rounded"
                      />
                      {dest}
                    </label>
                  ))}
                  {destinations.length > 7 && (
                    <button className="text-teal-500 text-xs flex items-center mt-2">
                      Show More Destinations
                      <ChevronDown className="w-3 h-3 ml-1" />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="flex-1">
            {/* Sort Bar */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4 flex flex-col sm:flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-700">Sort by</span>
                <select className="px-3 py-1.5 text-sm border border-gray-300 rounded focus:border-teal-500 bg-white">
                  <option>Popularity</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Rating</option>
                </select>
              </div>
            </div>

            {/* Activities */}
            <div className="space-y-4 cursor-pointer">
              {filteredPackages.map((a) => (
                <div
                  key={a.id}
                  onClick={() =>
                    navigate(`${a?.Destination?.route}/${a?.seo?.slug}`, {
                      state: { id: a?._id }, // pass custom data here
                    })
                  }
                  className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col sm:flex-row overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="w-full sm:w-52 h-40 relative flex-shrink-0">
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}${
                        a?.heroMedia?.fileUrl
                      }`}
                      alt={`activity-${a.id}`}
                      className="w-full h-full object-cover"
                    />
                    {a.badge && (
                      <span
                        className={`absolute top-2 left-2 ${
                          a.badgeColor || "bg-teal-500"
                        } text-white text-xs px-2 py-1 rounded`}
                      >
                        {a.badge}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 p-4 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-gray-900 mb-2">
                        {a.packageTitle}
                      </h3>

                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < 4
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-gray-300 text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="text-xs text-gray-600 ml-1">
                          (881 reviews)
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{a.durationDays}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                            />
                          </svg>
                          <span>Transport</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-teal-600">
                          ${a.price}
                        </span>
                        <span className="text-xs text-gray-600">
                          per person
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-6">
              <button className="px-8 py-2 border border-teal-500 text-teal-500 rounded text-sm hover:bg-teal-50">
                Load More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
