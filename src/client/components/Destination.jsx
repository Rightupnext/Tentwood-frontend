import React, { useState, useEffect, useRef, useMemo } from "react";

export default function ExploreDestinations({ packages }) {
  const [hovered, setHovered] = useState(null);
  const [scrollProgress, setScrollProgress] = useState({});
  const rowRefs = useRef([]);

  const destinations = useMemo(() => {
    if (!packages || !packages.length) return [];

    const countryMap = {};

    packages.forEach((pkg) => {
      const countryName = pkg?.Destination?.countryName;
      if (!countryName) return;

      if (!countryMap[countryName]) {
        countryMap[countryName] = {
          name: countryName,
          count: 0,
          image: pkg?.cardMedia?.fileUrl
            ? `${import.meta.env.VITE_BACKEND_URL}${pkg.cardMedia.fileUrl}`
            : "",
        };
      }

      countryMap[countryName].count += 1;
    });

    return Object.values(countryMap).map((item, index) => ({
      id: index + 1,
      name: item.name,
      tours: `${item.count} Tours`,
      image: item.image,
    }));
  }, [packages]);

  const [row1, row2] = useMemo(
    () => [destinations, [...destinations].reverse()],
    [destinations]
  );

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          rowRefs.current.forEach((row, index) => {
            if (row) {
              const rect = row.getBoundingClientRect();
              const progress = Math.max(
                0,
                Math.min(
                  1,
                  (window.innerHeight - rect.top) / window.innerHeight
                )
              );
              setScrollProgress((prev) => ({ ...prev, [index]: progress }));
            }
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

  const Row = ({ list, reverse, rowIndex }) => {
    const progress = scrollProgress[rowIndex] || 0;
    const scale = 0.85 + progress * 0.15;
    const opacity = 0.3 + progress * 0.7;

    return (
      <div
        ref={(el) => (rowRefs.current[rowIndex] = el)}
        className="relative overflow-hidden mb-4 md:mb-6 lg:mb-8"
        style={{
          transform: `scale(${scale})`,
          opacity,
          transition: "transform 0.3s, opacity 0.3s",
          willChange: "transform, opacity",
        }}
      >
        <div
          className={`flex gap-3 md:gap-4 lg:gap-6 ${
            reverse
              ? "animate-[scrollLeft_35s_linear_infinite]"
              : "animate-[scrollRight_35s_linear_infinite]"
          } hover:paused`}
        >
          {[...list, ...list, ...list].map((item, i) => (
            <div
              key={i}
              className="w-52 h-36 md:w-64 md:h-48 lg:w-72 lg:h-56 shrink-0 relative group cursor-pointer touch-manipulation"
              onMouseEnter={() => setHovered(`${rowIndex}-${i}`)}
              onMouseLeave={() => setHovered(null)}
              onTouchStart={() => setHovered(`${rowIndex}-${i}`)}
              onTouchEnd={() => setHovered(null)}
            >
              <div
                className="relative w-full h-full rounded-xl md:rounded-2xl overflow-hidden shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-teal-500/40 group-hover:z-10"
                style={{ willChange: "transform" }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 duration-500 transition-transform brightness-90 group-hover:brightness-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent group-hover:from-black/85 transition-all duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/15 to-cyan-500/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay"></div>

                <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 animate-pulse">
                  <svg
                    className="w-4 h-4 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" />
                  </svg>
                </div>

                <div className="absolute bottom-0 p-3 md:p-4 lg:p-5 text-white transform transition-transform duration-200 group-hover:-translate-y-2">
                  <h3 className="text-lg md:text-2xl lg:text-3xl font-bold mb-1 group-hover:text-teal-300 transition-colors duration-200 drop-shadow-lg">
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-2 opacity-80 mb-2 md:mb-3 group-hover:opacity-100 transition-opacity">
                    <svg
                      className="w-3 h-3 md:w-4 md:h-4 group-hover:text-teal-400 transition-colors"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    <span className="text-xs md:text-sm font-medium">
                      {item.tours}
                    </span>
                  </div>
                  <button
                    className={`${
                      hovered === `${rowIndex}-${i}`
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-2"
                    } flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 bg-white text-teal-600 rounded-full font-semibold transition-all duration-200 text-xs md:text-sm hover:bg-teal-50 active:scale-95`}
                  >
                    <span>Explore</span>
                    <svg
                      className="w-3 h-3 md:w-4 md:h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                    </svg>
                  </button>
                </div>

                <div className="absolute top-2 right-2 md:top-3 md:right-3 w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-180 shadow-lg">
                  <svg
                    className="text-white w-3 h-3 md:w-4 md:h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                  </svg>
                </div>

                <div className="absolute inset-0 border-2 border-transparent group-hover:border-teal-400/40 rounded-xl md:rounded-2xl transition-all duration-300"></div>

                <div className="absolute top-0 left-0 w-0 h-0 border-t-2 border-l-2 border-teal-400 group-hover:w-6 group-hover:h-6 transition-all duration-300 rounded-tl-xl"></div>
                <div className="absolute bottom-0 right-0 w-0 h-0 border-b-2 border-r-2 border-cyan-400 group-hover:w-6 group-hover:h-6 transition-all duration-300 rounded-br-xl"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-teal-50 py-8 md:py-12 lg:py-16 px-3 md:px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center mb-8 md:mb-10 lg:mb-14">
        <div className="inline-block relative">
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-gray-900 via-teal-700 to-cyan-700 bg-clip-text text-transparent animate-[fadeIn_0.8s_ease-in]">
            Explore Top Destinations
          </h2>
          <div className="absolute left-1/2 -translate-x-1/2 w-20 md:w-24 lg:w-28 h-1 bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500 rounded-full -bottom-2 animate-[expand_0.8s_ease-out] shadow-lg shadow-teal-500/50" />
          <div className="absolute -top-4 -right-4 md:-top-5 md:-right-5 opacity-50 animate-[float_3s_ease-in-out_infinite]">
            <svg
              className="w-4 h-4 md:w-5 md:h-5 text-teal-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" />
            </svg>
          </div>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto mt-4 md:mt-6 text-xs md:text-sm lg:text-base px-4 animate-[fadeIn_1.2s_ease-in] leading-relaxed">
          Discover the world's most beautiful places. Hand-picked destinations
          curated for the perfect travel experience.
        </p>
      </div>

      <Row list={row1} reverse={false} rowIndex={0} />
      <Row list={row2} reverse={true} rowIndex={1} />

      <div className="text-center mt-8 md:mt-10 lg:mt-14 animate-[fadeIn_1.5s_ease-in]">
        <button className="group px-6 py-2.5 md:px-8 md:py-3 bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500 bg-[length:200%] text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:shadow-teal-500/40 hover:scale-105 active:scale-95 transition-all duration-300 text-sm md:text-base relative overflow-hidden touch-manipulation">
          <span className="relative z-10 flex items-center gap-2 justify-center">
            View All Destinations
            <svg
              className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
            </svg>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-teal-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-[shimmer_2s_linear_infinite]"></div>
        </button>
      </div>

      <style>{`
        @keyframes scrollRight {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes scrollLeft {
          0% { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes expand {
          0% { width: 0; }
          100% { width: 5rem; }
        }
        @keyframes shimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @media (min-width: 768px) {
          @keyframes expand {
            0% { width: 0; }
            100% { width: 6rem; }
          }
        }
        @media (min-width: 1024px) {
          @keyframes expand {
            0% { width: 0; }
            100% { width: 7rem; }
          }
        }
      `}</style>
    </div>
  );
}
