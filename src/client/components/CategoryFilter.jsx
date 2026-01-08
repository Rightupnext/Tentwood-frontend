import React, { useState, useMemo, useEffect } from "react";
import {
  AppstoreOutlined,
  ClockCircleOutlined,
  DownOutlined,
  MenuOutlined,
  StarFilled,
  SearchOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPackages } from "../../store/slices/packageSlice";
const TRIP_ROUTE_MAP = {
  "India Trips": "india-trips",
  "International Trips": "international-trips",
  "Honeymoon Packages": "honeymoon-packages",
  "Group Tours": "group-tours",
};

const tripTypeMap = {
  "india-trips": "India Trips",
  "international-trips": "International Trips",
  "honeymoon-packages": "Honeymoon Packages",
  "group-tours": "Group Tours",
};
export default function EnhancedTourFilters() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tripType, country, city } = useParams();

  const { list: packages } = useSelector((state) => state.packages);
  useEffect(() => {
    dispatch(fetchPackages());
  }, [dispatch]);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [selectedHighlights, setSelectedHighlights] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState([0, 20]);
  const [sortBy, setSortBy] = useState("popularity");
  const [viewMode, setViewMode] = useState("list");

  // Accordion states
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [destOpen, setDestOpen] = useState(true);
  const [highlightsOpen, setHighlightsOpen] = useState(true);
  const [durationOpen, setDurationOpen] = useState(true);

  // Mobile filter drawer
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Extract unique values
  const categories = useMemo(
    () => [...new Set(packages.flatMap((p) => p.tripCategories))],
    [packages]
  );

  const destinations = useMemo(
    () => [
      ...new Set(
        packages.map((p) => p.Destination?.Destination).filter(Boolean)
      ),
    ],
    [packages]
  );

  const allHighlights = useMemo(
    () => [...new Set(packages.flatMap((p) => p.highlights || []))],
    [packages]
  );

  const prices = useMemo(
    () => packages.map((p) => p.price).filter(Boolean),
    [packages]
  );
  const maxPrice = prices.length ? Math.max(...prices) : 250000;

  // Initialize price filter
  React.useEffect(() => {
    setSelectedPrice(maxPrice);
  }, [maxPrice]);

  // Parse duration
  const parseDuration = (duration) => {
    const match = duration?.match(/(\d+)N/);
    return match ? parseInt(match[1]) : 0;
  };

  // Filter logic
  const filteredPackages = useMemo(() => {
    let filtered = packages;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.packageTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.Destination?.name
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          p.Destination?.Destination?.toLowerCase().includes(
            searchQuery.toLowerCase()
          )
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) =>
        selectedCategories.some((cat) => p.tripCategories?.includes(cat))
      );
    }

    // Destination filter
    if (selectedDestinations.length > 0) {
      filtered = filtered.filter((p) =>
        selectedDestinations.includes(p.Destination?.name)
      );
    }

    // Highlights filter
    if (selectedHighlights.length > 0) {
      filtered = filtered.filter((p) =>
        selectedHighlights.some((h) => p.highlights?.includes(h))
      );
    }

    // Price filter
    filtered = filtered.filter((p) => p.price <= selectedPrice);

    // Duration filter
    filtered = filtered.filter((p) => {
      const nights = parseDuration(p.durationDays);
      return nights >= selectedDuration[0] && nights <= selectedDuration[1];
    });

    // Sorting
    if (sortBy === "price-low") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortBy === "duration-short") {
      filtered = [...filtered].sort(
        (a, b) => parseDuration(a.durationDays) - parseDuration(b.durationDays)
      );
    } else if (sortBy === "duration-long") {
      filtered = [...filtered].sort(
        (a, b) => parseDuration(b.durationDays) - parseDuration(a.durationDays)
      );
    }

    console.log("filter", filtered);
    return filtered;
  }, [
    packages,
    searchQuery,
    selectedCategories,
    selectedDestinations,
    selectedHighlights,
    selectedPrice,
    selectedDuration,
    sortBy,
  ]);

  const toggleFilter = (item, selected, setter) => {
    setter((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]
    );
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedDestinations([]);
    setSelectedHighlights([]);
    setSelectedPrice(maxPrice);
    setSelectedDuration([0, 20]);
    setSortBy("popularity");
  };

  const activeFiltersCount =
    selectedCategories.length +
    selectedDestinations.length +
    selectedHighlights.length +
    (selectedPrice < maxPrice ? 1 : 0) +
    (selectedDuration[0] > 0 || selectedDuration[1] < 20 ? 1 : 0);

  const FilterSidebar = () => (
    <aside className="w-full lg:w-80 flex-shrink-0">
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 overflow-hidden lg:sticky lg:top-6">
        {/* Search Bar */}
        <div className="p-6 border-b border-slate-100">
          <div className="relative">
            <SearchOutlined className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search packages, destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all text-sm"
            />
          </div>
        </div>

        {/* Price Range */}
        <div className="p-6 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 mb-5 text-base">
            Price Range
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-slate-600">Budget</span>
              <span className="text-lg font-bold text-teal-600">
                ₹{selectedPrice.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={maxPrice}
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-teal-500 [&::-webkit-slider-thumb]:to-teal-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg"
              style={{
                background: `linear-gradient(to right, #14b8a6 0%, #14b8a6 ${
                  (selectedPrice / maxPrice) * 100
                }%, #e2e8f0 ${
                  (selectedPrice / maxPrice) * 100
                }%, #e2e8f0 100%)`,
              }}
            />
            <div className="flex justify-between text-xs text-slate-500">
              <span>₹0</span>
              <span>₹{maxPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Duration Filter */}
        <div className="p-6 border-b border-slate-100">
          <button
            className="w-full flex items-center justify-between mb-4 group"
            onClick={() => setDurationOpen(!durationOpen)}
          >
            <h3 className="font-bold text-slate-900 text-base">
              Duration (Nights)
            </h3>
            <DownOutlined
              className={`text-slate-500 transition-transform duration-300 group-hover:text-teal-600 ${
                durationOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {durationOpen && (
            <div className="space-y-4">
              <div className="flex gap-3">
                {["3-5", "6-9", "10+"].map((range) => (
                  <button
                    key={range}
                    onClick={() => {
                      if (range === "3-5") setSelectedDuration([3, 5]);
                      else if (range === "6-9") setSelectedDuration([6, 9]);
                      else setSelectedDuration([10, 20]);
                    }}
                    className="flex-1 px-3 py-2 text-xs font-medium border-2 border-slate-200 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition-all"
                  >
                    {range}D
                  </button>
                ))}
              </div>
              <div className="text-sm text-slate-600">
                {selectedDuration[0]} - {selectedDuration[1]} nights
              </div>
            </div>
          )}
        </div>

        {/* Categories */}
        <div className="p-6 border-b border-slate-100">
          <button
            className="w-full flex items-center justify-between mb-4 group"
            onClick={() => setCategoryOpen(!categoryOpen)}
          >
            <h3 className="font-bold text-slate-900 text-base">
              Trip Categories
            </h3>
            <DownOutlined
              className={`text-slate-500 transition-transform duration-300 group-hover:text-teal-600 ${
                categoryOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {categoryOpen && (
            <div className="space-y-2.5">
              {categories.map((cat) => (
                <label
                  key={cat}
                  className="flex items-center text-sm text-slate-700 cursor-pointer hover:text-slate-900 group py-1"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() =>
                      toggleFilter(
                        cat,
                        selectedCategories,
                        setSelectedCategories
                      )
                    }
                    className="w-4 h-4 mr-3 text-teal-600 border-2 border-slate-300 rounded focus:ring-2 focus:ring-teal-500/30 cursor-pointer"
                  />
                  <span className="group-hover:translate-x-0.5 transition-transform">
                    {cat}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Destinations */}
        <div className="p-6 border-b border-slate-100">
          <button
            className="w-full flex items-center justify-between mb-4 group"
            onClick={() => setDestOpen(!destOpen)}
          >
            <h3 className="font-bold text-slate-900 text-base">Destinations</h3>
            <DownOutlined
              className={`text-slate-500 transition-transform duration-300 group-hover:text-teal-600 ${
                destOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {destOpen && (
            <div className="space-y-2.5">
              {destinations.map((dest) => (
                <label
                  key={dest}
                  className="flex items-center text-sm text-slate-700 cursor-pointer hover:text-slate-900 group py-1"
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
                    className="w-4 h-4 mr-3 text-teal-600 border-2 border-slate-300 rounded focus:ring-2 focus:ring-teal-500/30 cursor-pointer"
                  />
                  <span className="group-hover:translate-x-0.5 transition-transform">
                    {dest.name}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Highlights */}
        <div className="p-6">
          <button
            className="w-full flex items-center justify-between mb-4 group"
            onClick={() => setHighlightsOpen(!highlightsOpen)}
          >
            <h3 className="font-bold text-slate-900 text-base">Highlights</h3>
            <DownOutlined
              className={`text-slate-500 transition-transform duration-300 group-hover:text-teal-600 ${
                highlightsOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {highlightsOpen && (
            <div className="space-y-2.5 max-h-60 overflow-y-auto">
              {allHighlights.map((highlight) => (
                <label
                  key={highlight}
                  className="flex items-center text-sm text-slate-700 cursor-pointer hover:text-slate-900 group py-1"
                >
                  <input
                    type="checkbox"
                    checked={selectedHighlights.includes(highlight)}
                    onChange={() =>
                      toggleFilter(
                        highlight,
                        selectedHighlights,
                        setSelectedHighlights
                      )
                    }
                    className="w-4 h-4 mr-3 text-teal-600 border-2 border-slate-300 rounded focus:ring-2 focus:ring-teal-500/30 cursor-pointer"
                  />
                  <span className="group-hover:translate-x-0.5 transition-transform">
                    {highlight}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setFiltersOpen(true)}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-teal-500 text-white rounded-xl font-semibold shadow-lg"
          >
            <MenuOutlined />
            Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <FilterSidebar />
          </div>

          {/* Mobile Filter Drawer */}
          {filtersOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="absolute inset-0 bg-black/50"
                onClick={() => setFiltersOpen(false)}
              />
              <div className="absolute inset-y-0 left-0 w-full max-w-sm bg-white overflow-y-auto">
                <div className="p-4 border-b flex items-center justify-between sticky top-0 bg-white z-10">
                  <h2 className="text-lg font-bold">Filters</h2>
                  <button onClick={() => setFiltersOpen(false)}>
                    <CloseCircleOutlined className="text-2xl" />
                  </button>
                </div>
                <FilterSidebar />
                <div className="p-4 border-t sticky bottom-0 bg-white">
                  <button
                    onClick={() => setFiltersOpen(false)}
                    className="w-full py-3 bg-teal-500 text-white rounded-xl font-semibold"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Active Filters Tags */}
            {activeFiltersCount > 0 && (
              <div className="bg-white rounded-xl shadow-md border border-slate-200/60 p-4 mb-6">
                <div className="flex flex-wrap gap-2">
                  {selectedCategories.map((cat) => (
                    <span
                      key={cat}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-medium"
                    >
                      {cat}
                      <button
                        onClick={() =>
                          toggleFilter(
                            cat,
                            selectedCategories,
                            setSelectedCategories
                          )
                        }
                      >
                        <CloseCircleOutlined className="text-xs" />
                      </button>
                    </span>
                  ))}
                  {selectedDestinations.map((dest) => (
                    <span
                      key={dest}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
                    >
                      {dest}
                      <button
                        onClick={() =>
                          toggleFilter(
                            dest,
                            selectedDestinations,
                            setSelectedDestinations
                          )
                        }
                      >
                        <CloseCircleOutlined className="text-xs" />
                      </button>
                    </span>
                  ))}
                  {selectedHighlights.map((h) => (
                    <span
                      key={h}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium"
                    >
                      {h}
                      <button
                        onClick={() =>
                          toggleFilter(
                            h,
                            selectedHighlights,
                            setSelectedHighlights
                          )
                        }
                      >
                        <CloseCircleOutlined className="text-xs" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Sort Bar */}
            <div className="bg-white rounded-2xl shadow-md border border-slate-200/60 p-5 mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-slate-700">
                    Sort by
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2.5 text-sm border-2 border-slate-200 rounded-xl focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 bg-white cursor-pointer font-medium text-slate-700 outline-none transition-all"
                  >
                    <option value="popularity">Popularity</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="duration-short">
                      Duration: Short to Long
                    </option>
                    <option value="duration-long">
                      Duration: Long to Short
                    </option>
                  </select>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-600">
                    {filteredPackages.length} packages found
                  </span>
                  <button
                    onClick={resetFilters}
                    className="px-6 py-2.5 bg-gradient-to-r from-yellow-500 to-yellow-500 cursor-pointer text-white rounded-xl font-semibold text-sm hover:from-yellow-600 hover:to-yellow-600 active:scale-95 transition-all shadow-lg"
                  >
                    Reset All
                  </button>
                  <div className="flex items-center gap-2">
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
            </div>

            {/* Package List */}
            {viewMode === "list" ? (
              <div className="space-y-5">
                {filteredPackages.map((pkg) => (
                  <article
                    key={pkg._id}
                    className="bg-white rounded-2xl shadow-md border border-slate-200/60 overflow-hidden hover:shadow-xl hover:border-teal-200 transition-all duration-300 cursor-pointer group"
                  >
                    <div className="flex flex-col sm:flex-row">
                      <div className="w-full sm:w-64 h-52 sm:h-auto relative flex-shrink-0 overflow-hidden">
                        <img
                          src={`${import.meta.env.VITE_BACKEND_URL}${
                            pkg.cardMedia?.fileUrl
                          }`}
                          alt={pkg.packageTitle}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <span className="absolute top-3 left-3 bg-gradient-to-r from-yellow-500 to-yellow-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                          {pkg.tripCategories}
                        </span>
                      </div>

                      <div className="flex-1 p-6 flex flex-col justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-teal-600 transition-colors">
                            {pkg.packageTitle}
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

                          <div className="flex flex-wrap gap-2 mb-3">
                            {pkg.highlights?.slice(0, 3).map((h, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 bg-teal-50 text-teal-600 text-xs rounded-full"
                              >
                                {h}
                              </span>
                            ))}
                          </div>

                          <div className="flex flex-wrap items-center gap-5 text-sm text-slate-600">
                            <div className="flex items-center gap-2">
                              <ClockCircleOutlined className="text-teal-600" />
                              <span className="font-medium">
                                {pkg.durationDays}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-slate-100 flex items-end justify-between">
                          <div>
                            <div className="flex items-baseline gap-2">
                              <span className="text-3xl font-bold text-teal-600">
                                ₹{pkg.price.toLocaleString()}
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
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredPackages.map((pkg) => (
                  <article
                    key={pkg._id}
                    className="bg-white rounded-2xl shadow-md border border-slate-200/60 overflow-hidden hover:shadow-xl hover:border-teal-200 transition-all duration-300 cursor-pointer group"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={`${import.meta.env.VITE_BACKEND_URL}${
                          pkg.cardMedia?.fileUrl
                        }`}
                        alt={pkg.packageTitle}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-gradient-to-r from-yellow-500 to-yellow-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                        {pkg.tripCategories}
                      </span>
                    </div>

                    <div className="p-5">
                      <h3 className="text-base font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-teal-600 transition-colors">
                        {pkg.packageTitle}
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
                          4.0
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {pkg.highlights?.slice(0, 2).map((h, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 bg-teal-50 text-teal-600 text-xs rounded-full"
                          >
                            {h}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 text-sm text-slate-600 mb-4">
                        <ClockCircleOutlined className="text-teal-600" />
                        <span className="font-medium text-xs">
                          {pkg.durationDays}
                        </span>
                      </div>

                      <div className="pt-4 border-t border-slate-100">
                        <div className="flex items-baseline gap-1.5 mb-3">
                          <span className="text-2xl font-bold text-teal-600">
                            ₹{pkg.price.toLocaleString()}
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

            {/* Empty State */}
            {filteredPackages.length === 0 && (
              <div className="bg-white rounded-2xl shadow-md border border-slate-200/60 p-12 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  No packages found
                </h3>
                <p className="text-slate-600 mb-6">
                  Try adjusting your filters to see more results
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-3 bg-teal-500 text-white rounded-xl font-semibold hover:bg-teal-600 transition-all"
                >
                  Reset All Filters
                </button>
              </div>
            )}

            {/* Load More */}
            {filteredPackages.length > 0 && (
              <div className="text-center mt-8">
                <button className="px-10 py-3.5 border-2 border-teal-500 text-teal-600 rounded-xl text-sm font-semibold hover:bg-teal-50 active:scale-95 transition-all shadow-sm hover:shadow-md">
                  Load More Packages ({filteredPackages.length} of{" "}
                  {packages.length})
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
