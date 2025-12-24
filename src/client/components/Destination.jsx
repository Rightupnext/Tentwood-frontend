import React, { useEffect, useRef, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopDestinations } from "../../store/slices/packageSlice";

export default function ExploreDestinations() {
  const dispatch = useDispatch();
  const { topDestinations = [] } = useSelector((state) => state.packages);

  const rowRefs = useRef([]);
  const [scrollProgress, setScrollProgress] = useState({});

  /* ================= FETCH DATA ================= */
useEffect(() => {
  // Fetch only if topDestinations is empty
  if (!topDestinations.length) {
    dispatch(fetchTopDestinations());
  }
}, [dispatch, topDestinations.length]);

  const row1 = topDestinations;
  const row2 = [...topDestinations].reverse();

  /* ================= SCROLL SCALE EFFECT ================= */
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          rowRefs.current.forEach((row, index) => {
            if (!row) return;

            const rect = row.getBoundingClientRect();
            const progress = Math.max(
              0,
              Math.min(1, (window.innerHeight - rect.top) / window.innerHeight)
            );

            setScrollProgress((prev) => ({
              ...prev,
              [index]: progress,
            }));
          });

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        opacity,
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
          <DestinationCard key={`${item.name}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
});

/* ===================================================== */
/* ================= CARD (LOCAL STATE) ================= */
/* ===================================================== */

const DestinationCard = memo(function DestinationCard({ item }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="w-72 h-56 shrink-0 relative cursor-pointer group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setHovered(false)}
    >
      <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-105">
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}${item.image}`}
          alt={item.name}
          
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 p-4 text-white">
          <h3 className="text-2xl font-bold">{item.name}</h3>
          <p className="text-sm opacity-80">{item.tours}</p>

          <button
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
