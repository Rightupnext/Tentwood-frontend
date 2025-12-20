import React, { useEffect, useState, useMemo } from "react";
import {
  AppstoreOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  DownOutlined,
  MenuOutlined,
  StarFilled,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchPackages } from "../../store/slices/packageSlice";
import { useNavigate, useParams } from "react-router-dom";

const TRIP_ROUTE_MAP = {
  "India Trips": "india-trips",
  "International Trips": "international-trips",
  "Honeymoon Packages": "honeymoon-packages",
  "Group Tour": "group-tour",
};

const tripTypeMap = {
  "india-trips": "India Trips",
  "international-trips": "International Trips",
  "honeymoon-packages": "Honeymoon Packages",
  "group-tour": "Group Tour",
};

const normalize = (v) => v?.toString().trim().toLowerCase();

const toggleFilter = (item, selected, setter) => {
  setter((prev) =>
    prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]
  );
};

export default function LondonActivities() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tripType, country, city } = useParams();
  const { list: packages } = useSelector((state) => state.packages);
  const [fromDate, setFromDate] = useState("10/12/2021");
  const [toDate, setToDate] = useState("10/12/2021");
  const [themeOpen, setThemeOpen] = useState(true);
  const [durationOpen, setDurationOpen] = useState(true);
  const [destOpen, setDestOpen] = useState(true);
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'grid'
  const mappedTripType = tripTypeMap[tripType];

  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(0);

  /* ===================== FETCH ===================== */
  useEffect(() => {
    dispatch(fetchPackages());
  }, [dispatch]);

  /* ===================== PRICE ===================== */
  const prices = useMemo(
    () => packages.map((p) => p.price).filter(Boolean),
    [packages]
  );
  const maxPrice = prices.length ? Math.max(...prices) : 100000;

  /* ===================== URL BASE PACKAGES ===================== */
  const urlBasePackages = useMemo(() => {
    return packages.filter(
      (p) => normalize(p?.Destination?.trip) === normalize(mappedTripType)
    );
  }, [packages, mappedTripType]);

  /* ===================== AUTO APPLY URL FILTERS ===================== */
  const applyUrlBasedFilters = () => {
    if (!packages.length) return;

    // destination (city)
    if (city) {
      const matched = packages.find(
        (p) => normalize(p?.Destination?.Destination) === normalize(city)
      )?.Destination?.Destination;

      setSelectedDestinations(matched ? [matched] : []);
    } else {
      setSelectedDestinations([]);
    }

    // theme (tripType)
    setSelectedThemes(mappedTripType ? [mappedTripType] : []);
    setSelectedPrice(maxPrice);
  };

  useEffect(() => {
    if (!packages.length) return;
    applyUrlBasedFilters();
  }, [packages, city, mappedTripType, maxPrice]);

  /* ===================== FILTER OPTIONS ===================== */
  const destinations = [
    ...new Set(
      urlBasePackages.map((p) => p?.Destination?.Destination).filter(Boolean)
    ),
  ];

  const themes = [
    ...new Set(
      urlBasePackages.map((p) => p?.Destination?.trip).filter(Boolean)
    ),
  ];

  /* ===================== FILTERED RESULT ===================== */
  const filteredPackages = urlBasePackages.filter((p) => {
    const destinationMatch =
      selectedDestinations.length === 0 ||
      selectedDestinations.includes(p?.Destination?.Destination);

    const themeMatch =
      selectedThemes.length === 0 ||
      selectedThemes.includes(p?.Destination?.trip);

    const priceMatch = p.price <= selectedPrice;

    return destinationMatch && themeMatch && priceMatch;
  });

  /* ===================== RESET ===================== */
  const handleResetFilters = () => {
    setSelectedDestinations([]);
    setSelectedThemes([]);
    setSelectedPrice(maxPrice);
  };

  const handleNavigate = (a) => {
    const tripPrefix = TRIP_ROUTE_MAP[a?.Destination?.trip];
    if (!tripPrefix) return;
    navigate(`/${tripPrefix}/${a?.Destination?.route}/${a?.seo?.slug}`, {
      state: { id: a?._id },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* SIDEBAR */}
          <aside className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 overflow-hidden sticky top-6">
              {/* Availability */}
              <div className="p-6 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 mb-5 text-base flex items-center gap-2">
                  <CalendarOutlined className="text-teal-600" />
                  Availability
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-slate-700 mb-2 block uppercase tracking-wide">
                      From
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="w-full px-4 py-3 text-sm border-2 border-slate-200 rounded-xl focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all outline-none"
                        placeholder="Select date"
                      />
                      <CalendarOutlined className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-700 mb-2 block uppercase tracking-wide">
                      To
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="w-full px-4 py-3 text-sm border-2 border-slate-200 rounded-xl focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all outline-none"
                        placeholder="Select date"
                      />
                      <CalendarOutlined className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3.5 rounded-xl text-sm font-semibold hover:from-teal-600 hover:to-teal-700 active:scale-[0.98] transition-all shadow-lg shadow-teal-500/30">
                    Check Availability
                  </button>
                </div>
              </div>

              {/* Price Range */}
              <div className="p-6 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 mb-5 text-base">
                  Price Range
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-slate-600">
                      Budget
                    </span>
                    <span className="text-lg font-bold text-teal-600">
                      ₹{selectedPrice.toLocaleString()}
                    </span>
                  </div>

                  <div className="relative pt-2 pb-1">
                    <input
                      type="range"
                      min={0}
                      max={maxPrice}
                      value={selectedPrice}
                      onChange={(e) => setSelectedPrice(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-teal-500 [&::-webkit-slider-thumb]:to-teal-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-teal-500/40 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-gradient-to-r [&::-moz-range-thumb]:from-teal-500 [&::-moz-range-thumb]:to-teal-600 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0"
                      style={{
                        background: `linear-gradient(to right, #14b8a6 0%, #14b8a6 ${
                          (selectedPrice / maxPrice) * 100
                        }%, #e2e8f0 ${
                          (selectedPrice / maxPrice) * 100
                        }%, #e2e8f0 100%)`,
                      }}
                    />
                  </div>

                  <div className="flex justify-between text-xs text-slate-500">
                    <span>₹0</span>
                    <span>₹{maxPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Theme */}
              <div className="p-6 border-b border-slate-100">
                <button
                  className="w-full flex items-center justify-between mb-4 group"
                  onClick={() => setThemeOpen(!themeOpen)}
                >
                  <h3 className="font-bold text-slate-900 text-base">Theme</h3>
                  <DownOutlined
                    className={`text-slate-500 transition-transform duration-300 group-hover:text-teal-600 ${
                      themeOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {themeOpen && (
                  <div className="space-y-2.5">
                    {themes.map((theme) => (
                      <label
                        key={theme}
                        className="flex items-center text-sm text-slate-700 cursor-pointer hover:text-slate-900 group py-1"
                      >
                        <input
                          type="checkbox"
                          checked={selectedThemes.includes(theme)}
                          onChange={() =>
                            toggleFilter(
                              theme,
                              selectedThemes,
                              setSelectedThemes
                            )
                          }
                          className="w-4 h-4 mr-3 text-teal-600 border-2 border-slate-300 rounded focus:ring-2 focus:ring-teal-500/30 cursor-pointer"
                        />
                        <span className="group-hover:translate-x-0.5 transition-transform">
                          {theme}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Destination */}
              <div className="p-6">
                <button
                  className="w-full flex items-center justify-between mb-4 group"
                  onClick={() => setDestOpen(!destOpen)}
                >
                  <h3 className="font-bold text-slate-900 text-base">
                    Destination
                  </h3>
                  <DownOutlined
                    className={`text-slate-500 transition-transform duration-300 group-hover:text-teal-600 ${
                      destOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {destOpen && (
                  <div className="space-y-2.5">
                    {destinations.slice(0, 7).map((dest) => (
                      <label
                        key={dest}
                        className="flex items-center text-sm text-slate-700 cursor-pointer hover:text-slate-900 group py-1"
                      >
                        <input
                          type="checkbox"
                          checked={selectedDestinations.includes(dest)}
                          onChange={() =>
                            setSelectedDestinations((prev) =>
                              prev.includes(dest)
                                ? prev.filter((x) => x !== dest)
                                : [...prev, dest]
                            )
                          }
                          className="w-4 h-4 mr-3 text-teal-600 border-2 border-slate-300 rounded focus:ring-2 focus:ring-teal-500/30 cursor-pointer"
                        />
                        <span className="group-hover:translate-x-0.5 transition-transform">
                          {dest}
                        </span>
                      </label>
                    ))}
                    {destinations.length > 7 && (
                      <button className="text-teal-600 text-sm flex items-center mt-3 font-medium hover:text-teal-700 group">
                        Show More Destinations
                        <DownOutlined className="w-3 h-3 ml-1.5 group-hover:translate-y-0.5 transition-transform" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <main className="flex-1 min-w-0">
            {/* Sort Bar */}
            <div className="bg-white rounded-2xl shadow-md border border-slate-200/60 p-5 mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-slate-700">
                    Sort by
                  </span>
                  <select className="px-4 py-2.5 text-sm border-2 border-slate-200 rounded-xl focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 bg-white cursor-pointer font-medium text-slate-700 outline-none transition-all">
                    <option>Popularity</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Rating</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <button
                    onClick={handleResetFilters}
                    className="px-6 py-2.5 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-semibold text-sm hover:from-teal-600 hover:to-teal-700 active:scale-95 transition-all shadow-lg shadow-teal-500/30"
                  >
                    Reset Filter
                  </button>
                  <span className="text-slate-600">View:</span>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg transition-all ${
                      viewMode === "list"
                        ? "bg-teal-500 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    <MenuOutlined />
                  </button>
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg transition-all ${
                      viewMode === "grid"
                        ? "bg-teal-500 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    <AppstoreOutlined />
                  </button>
                </div>
              </div>
            </div>

            {/* Activities - List View */}
            {viewMode === "list" && (
              <div className="space-y-5">
                {filteredPackages.map((a) => (
                  <article
                    key={a.id}
                    onClick={() => handleNavigate(a)}
                    className="bg-white rounded-2xl shadow-md border border-slate-200/60 overflow-hidden hover:shadow-xl hover:border-teal-200 transition-all duration-300 cursor-pointer group"
                  >
                    <div className="flex flex-col sm:flex-row">
                      <div className="w-full sm:w-64 h-52 sm:h-auto relative flex-shrink-0 overflow-hidden">
                        <img
                          src={`${import.meta.env.VITE_BACKEND_URL}${
                            a?.heroMedia?.fileUrl
                          }`}
                          alt={a.packageTitle}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {a?.Destination?.trip && (
                          <span className="absolute top-3 left-3 bg-gradient-to-r from-yellow-500 to-yellow-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                            {a?.Destination?.trip}
                          </span>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>

                      <div className="flex-1 p-6 flex flex-col justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-teal-600 transition-colors">
                            {a.packageTitle}
                          </h3>

                          <div className="flex items-center gap-1.5 mb-4">
                            {[...Array(5)].map((_, i) => (
                              <StarFilled
                                key={i}
                                className={`w-4 h-4 ${
                                  i < 4
                                    ? "!fill-amber-400 !text-amber-400"
                                    : "!fill-slate-200 !text-slate-200"
                                }`}
                              />
                            ))}
                            <span className="text-sm text-slate-600 ml-1 font-medium">
                              4.0 <span className="text-slate-400">(881)</span>
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-5 text-sm text-slate-600">
                            <div className="flex items-center gap-2">
                              <ClockCircleOutlined className="text-teal-600" />
                              <span className="font-medium">
                                {a.durationDays}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <svg
                                className="w-5 h-5 text-teal-600"
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
                              <span className="font-medium">
                                Transport Included
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-slate-100 flex items-end justify-between">
                          <div>
                            <div className="flex items-baseline gap-2">
                              <span className="text-3xl font-bold text-teal-600">
                                ₹{a.price}
                              </span>
                              <span className="text-sm text-slate-500">
                                per person
                              </span>
                            </div>
                          </div>
                          <button className="px-6 py-2.5 cursor-pointer bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-semibold text-sm hover:from-teal-600 hover:to-teal-700 active:scale-95 transition-all shadow-lg shadow-teal-500/30">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Activities - Grid View */}
            {viewMode === "grid" && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredPackages.map((a) => (
                  <article
                    key={a.id}
                    onClick={() => handleNavigate(a)}
                    className="bg-white rounded-2xl shadow-md border border-slate-200/60 overflow-hidden hover:shadow-xl hover:border-teal-200 transition-all duration-300 cursor-pointer group"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={`${import.meta.env.VITE_BACKEND_URL}${
                          a?.heroMedia?.fileUrl
                        }`}
                        alt={a.packageTitle}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {a?.Destination?.trip && (
                        <span className="absolute top-3 left-3 bg-gradient-to-r from-yellow-500 to-yellow-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                          {a?.Destination?.trip}
                        </span>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    <div className="p-5">
                      <h3 className="text-base font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-teal-600 transition-colors">
                        {a.packageTitle}
                      </h3>

                      <div className="flex items-center gap-1.5 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <StarFilled
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < 4
                                ? "!fill-amber-400 !text-amber-400"
                                : "!fill-slate-200 !text-slate-200"
                            }`}
                          />
                        ))}
                        <span className="text-xs text-slate-600 ml-1 font-medium">
                          4.0 <span className="text-slate-400">(881)</span>
                        </span>
                      </div>

                      <div className="flex flex-col gap-2 text-sm text-slate-600 mb-4">
                        <div className="flex items-center gap-2">
                          <ClockCircleOutlined className="text-teal-600" />
                          <span className="font-medium text-xs">
                            {a.durationDays}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-4 h-4 text-teal-600"
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
                          <span className="font-medium text-xs">
                            Transport Included
                          </span>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-100">
                        <div className="flex items-baseline gap-1.5 mb-3">
                          <span className="text-2xl font-bold text-teal-600">
                            ₹{a.price}
                          </span>
                          <span className="text-xs text-slate-500">
                            per person
                          </span>
                        </div>
                        <button className="w-full py-2.5 cursor-pointer bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-semibold text-sm hover:from-teal-600 hover:to-teal-700 active:scale-95 transition-all shadow-lg shadow-teal-500/30">
                          View Details
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Load More */}
            <div className="text-center mt-8">
              <button className="px-10 py-3.5 border-2 border-teal-500 text-teal-600 rounded-xl text-sm font-semibold hover:bg-teal-50 active:scale-95 transition-all shadow-sm hover:shadow-md">
                Load More Activities
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
