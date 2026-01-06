import React, { useEffect, useRef, useState, memo, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export default function ExploreDestinations({ packages = [] }) {
  const rowRefs = useRef([]);
  const [scrollProgress, setScrollProgress] = useState({});

  // Get unique countries
  const uniquePackages = useMemo(() => {
  return Array.from(
    new Map(
      packages
        .filter((pkg) => pkg?.Destination?.name)
        .map((pkg) => [pkg.Destination.name.toLowerCase(), pkg])
    ).values()
  );
}, [packages]);

  // Prepare rows
  const row1 = uniquePackages;
  const row2 = [...uniquePackages].reverse();

  /* ================= SCROLL SCALE EFFECT ================= */

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-teal-50 py-16 overflow-hidden">
      {/* ================= HEADER ================= */}
      <div className="max-w-7xl mx-auto text-center mb-14">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-teal-700 to-cyan-700 bg-clip-text text-transparent">
          Explore Top Destinations
        </h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Discover the world's most beautiful places. Hand-picked destinations
          curated for the perfect travel experience.
        </p>
      </div>

      {/* ================= ROWS ================= */}
      <Row
        list={row1}
        reverse={false}
        rowIndex={0}
        rowRefs={rowRefs}
        scrollProgress={scrollProgress}
      />

      <Row
        list={row2}
        reverse={true}
        rowIndex={1}
        rowRefs={rowRefs}
        scrollProgress={scrollProgress}
      />
    </div>
  );
}

/* ===================================================== */
/* ===================== ROW ============================ */
/* ===================================================== */

const Row = memo(function Row({
  list,
  reverse,
  rowIndex,
  rowRefs,
  scrollProgress,
}) {
  const progress = scrollProgress[rowIndex] || 0;
  const scale = 0.85 + progress * 0.15;
  const opacity = 0.3 + progress * 0.7;

  return (
    <div
      ref={(el) => (rowRefs.current[rowIndex] = el)}
      className="relative overflow-hidden mb-8"
      style={{
        transform: `scale(${scale})`,
        // opacity,
        transition: "transform 0.3s ease, opacity 0.3s ease",
      }}
    >
      <div
        className={`flex gap-6 ${
          reverse
            ? "animate-[scrollLeft_35s_linear_infinite]"
            : "animate-[scrollRight_35s_linear_infinite]"
        }`}
      >
        {[...list, ...list, ...list].map((item, i) => (
          <DestinationCard key={`${item._id}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
});

/* ===================================================== */
/* ================= CARD (LOCAL STATE) ================= */
/* ===================================================== */

const DestinationCard = memo(function DestinationCard({ item }) {
  const navigate = useNavigate();
  const TRIP_ROUTE_MAP = {
    "India Trips": "india-trips",
    "International Trips": "international-trips",
    "Honeymoon Packages": "honeymoon-packages",
    "Group Tours": "group-tours",
  };
  const handleNavigate = (pkg) => {
    const category = pkg?.tripCategories?.[0];
    const tripPrefix = TRIP_ROUTE_MAP[category];
    if (!tripPrefix) return;

    navigate(
      `/${tripPrefix}/${pkg?.countries || pkg?.Destination?.name}/${
        pkg?.packageTitle
      }`,
      { state: { id: pkg?._id } }
    );
  };

  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="w-72 h-56 shrink-0 relative cursor-pointer group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-105">
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}${
            item.cardMedia?.fileUrl || ""
          }`}
          alt={item.packageTitle}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 p-4 text-white">
          <h3 className="text-xl font-bold">{item?.Destination?.name}</h3>
          <p className="text-sm opacity-80 ">{item.packageTitle}</p>

          <button
            onClick={() => handleNavigate(item)}
            className={`mt-3 flex items-center gap-2 px-4 py-2 bg-white text-teal-600 rounded-full font-semibold transition-all duration-200 ${
              hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            Explore →
          </button>
        </div>
      </div>
    </div>
  );
});
