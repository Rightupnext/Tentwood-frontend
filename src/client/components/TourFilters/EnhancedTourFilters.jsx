import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";
import { fetchPackages } from "../../../store/slices/packageSlice";

import FilterSidebar from "./FilterSidebar";
import ActiveFilters from "./ActiveFilters";
import SortBar from "./SortBar";
import PackageList from "./PackageList";
import EmptyState from "./EmptyState";
const TRIP_TYPE_TO_CATEGORY = {
  "india-trips": "India Trips",
  "international-trips": "International Trips",
  "group-tour": "Group Tour",
  "honeymoon-packages": "Honeymoon Packages",
};
export default function EnhancedTourFilters() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tripType } = useParams();
  const { list: packages = [] } = useSelector((state) => state.packages);

  useEffect(() => {
    if (!packages.length) {
      dispatch(fetchPackages());
    }
  }, [dispatch, packages]);

  // ================= FILTER STATES =================
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [selectedHighlights, setSelectedHighlights] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState([0, 20]);
  const [sortBy, setSortBy] = useState("popularity");
  const [viewMode, setViewMode] = useState("grid");
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Accordion states
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [destOpen, setDestOpen] = useState(true);
  const [highlightsOpen, setHighlightsOpen] = useState(true);
  const [durationOpen, setDurationOpen] = useState(true);
  useEffect(() => {
    if (!tripType) return;

    const category = TRIP_TYPE_TO_CATEGORY[tripType];
    if (category) {
      setSelectedCategories([category]);
    }
  }, [tripType]);

  // ================= DERIVED DATA =================
  const categories = useMemo(
    () => [...new Set(packages.flatMap((p) => p.tripCategories || []))],
    [packages],
  );

  const destinations = useMemo(() => {
    const map = new Map();
    packages.forEach((p) => {
      if (p.Destination?._id) {
        map.set(p.Destination._id, p.Destination.name);
      }
    });
    return Array.from(map, ([_id, name]) => ({ _id, name }));
  }, [packages]);

  const allHighlights = useMemo(
    () => [...new Set(packages.flatMap((p) => p.highlights || []))],
    [packages],
  );

  const prices = useMemo(
    () => packages.map((p) => p.price).filter(Boolean),
    [packages],
  );

  const maxPrice = prices.length ? Math.max(...prices) : 250000;

  useEffect(() => {
    setSelectedPrice(maxPrice);
  }, [maxPrice]);

  // ================= HELPERS =================
  const parseDuration = (duration) => {
    const match = duration?.match(/(\d+)N/);
    return match ? parseInt(match[1]) : 0;
  };

  const toggleFilter = (item, setter) => {
    setter((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item],
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

  // ================= FILTER LOGIC =================
  const filteredPackages = useMemo(() => {
    let filtered = [...packages];

    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.packageTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.Destination?.name
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()),
      );
    }

    if (selectedCategories.length) {
      filtered = filtered.filter((p) =>
        selectedCategories.some((cat) => p.tripCategories?.includes(cat)),
      );
    }

    if (selectedDestinations.length) {
      filtered = filtered.filter((p) =>
        selectedDestinations.includes(p.Destination?._id),
      );
    }

    if (selectedHighlights.length) {
      filtered = filtered.filter((p) =>
        selectedHighlights.some((h) => p.highlights?.includes(h)),
      );
    }

    filtered = filtered.filter((p) => p.price <= selectedPrice);

    filtered = filtered.filter((p) => {
      const nights = parseDuration(p.durationDays);
      return nights >= selectedDuration[0] && nights <= selectedDuration[1];
    });

    if (sortBy === "price-low") filtered.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") filtered.sort((a, b) => b.price - a.price);

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
  const TRIP_ROUTE_MAP = {
    "India Trips": "india-trips",
    "International Trips": "international-trips",
    "Honeymoon Packages": "honeymoon-packages",
    "Group Tours": "group-tours",
  };
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
const handleNavigate = (a) => {
  if (!a?._id) return; // safety check

  if (isAdminRoute) {
    // Admin route doesn't need tripPrefix
    navigate(`/admin/package/${a._id}`);
    return;
  }

  // Frontend route
  const category = a?.tripCategories?.[0];
  const tripPrefix = TRIP_ROUTE_MAP[category];
  if (!tripPrefix) return; // only needed for frontend

  navigate(
    `/${tripPrefix}/${a?.Destination?.name
      ?.toLowerCase()
      .replace(/\s+/g, "-")}/${a?.packageTitle
      ?.toLowerCase()
      .replace(/\s+/g, "-")}`,
    { state: { id: a._id } }
  );
};

  // ================= UI =================
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="px-4 py-6">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setFiltersOpen(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-teal-600 text-white rounded-xl font-semibold"
          >
            <MenuOutlined /> Filters
          </button>
        </div>

        <div className="flex gap-6">
          {/* SIDEBAR */}
          <div className="hidden lg:block">
            <FilterSidebar
              categories={categories}
              destinations={destinations}
              allHighlights={allHighlights}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              selectedDestinations={selectedDestinations}
              setSelectedDestinations={setSelectedDestinations}
              selectedHighlights={selectedHighlights}
              setSelectedHighlights={setSelectedHighlights}
              selectedPrice={selectedPrice}
              setSelectedPrice={setSelectedPrice}
              selectedDuration={selectedDuration}
              setSelectedDuration={setSelectedDuration}
              categoryOpen={categoryOpen}
              setCategoryOpen={setCategoryOpen}
              destOpen={destOpen}
              setDestOpen={setDestOpen}
              highlightsOpen={highlightsOpen}
              setHighlightsOpen={setHighlightsOpen}
              durationOpen={durationOpen}
              setDurationOpen={setDurationOpen}
              toggleFilter={toggleFilter}
              maxPrice={maxPrice}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>

          {/* PACKAGE LIST (SCROLLS) */}
          <main className="flex-1 min-w-0">
            <ActiveFilters
              selectedCategories={selectedCategories}
              selectedDestinations={selectedDestinations}
              selectedHighlights={selectedHighlights}
            />

            <SortBar
              sortBy={sortBy}
              setSortBy={setSortBy}
              viewMode={viewMode}
              setViewMode={setViewMode}
              filteredPackages={filteredPackages}
              resetFilters={resetFilters}
            />

            {filteredPackages.length === 0 ? (
              <EmptyState resetFilters={resetFilters} />
            ) : (
              <PackageList
                packages={filteredPackages}
                viewMode={viewMode}
                onNavigate={handleNavigate}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
