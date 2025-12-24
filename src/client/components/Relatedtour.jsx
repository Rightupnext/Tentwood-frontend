import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  StarFilled,
  StarOutlined,
  LeftOutlined,
  RightOutlined,
  ClockCircleOutlined,
  CarOutlined,
  TeamOutlined,
} from "@ant-design/icons";

export default function TourCarousel({
  Title1,
  Title2,
  internationalTrips,
  indiaTrips,
}) {
  const [sc1, setSc1] = useState(0);
  const [sc2, setSc2] = useState(0);
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  const r1 = useRef(null);
  const r2 = useRef(null);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isXs = width < 400;
  const isSm = width >= 640;
  const isMd = width >= 768;
  const isLg = width >= 1024;

  const handleScroll = (ref, d, setfn) => {
    const c = ref.current;
    if (!c) return;

    // Get viewport width and calculate scroll amount
    const viewportWidth = c.offsetWidth;
    const scrollAmount = viewportWidth * 0.8; // Scroll 80% of viewport width

    const targetScroll =
      d === "left" ? c.scrollLeft - scrollAmount : c.scrollLeft + scrollAmount;
    c.scrollTo({ left: targetScroll, behavior: "smooth" });

    setTimeout(() => setfn(c.scrollLeft), 400);
  };

  const TourCard = ({ t, i }) => {
    const navigate = useNavigate();
    const [hov, setHov] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(false);
    const TRIP_ROUTE_MAP = {
      "India Trips": "india-trips",
      "International Trips": "international-trips",
      "Honeymoon Packages": "honeymoon-packages",
      "Group Tour": "group-tour",
    };
    const handleNavigate = (a) => {
      const tripPrefix = TRIP_ROUTE_MAP[a?.Destination?.trip];
      if (!tripPrefix) return;
      navigate(`/${tripPrefix}/${a?.Destination?.route}/${a?.seo?.slug}`, {
        state: { id: a?._id },
      });
    };
    const rating = (Math.random() * (5 - 3.5) + 3.5).toFixed(1);

    return (
      <div
        className={`tour-card flex-shrink-0 bg-white overflow-hidden transform transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 group cursor-pointer ${
          isXs
            ? "w-[200px] rounded-xl shadow-md"
            : "w-[240px] sm:w-[280px] md:w-[300px] lg:w-[320px] rounded-2xl shadow-lg"
        }`}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{ animation: `fadeInUp 0.6s ease-out ${i * 100}ms both` }}
      >
        <div
          className={`relative w-full overflow-hidden bg-gray-200 ${
            isXs ? "h-36" : "h-48 sm:h-52 md:h-56"
          }`}
        >
          {/* Skeleton loader */}
          {!imgLoaded && (
            <div
              className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"
              style={{ backgroundSize: "200% 100%" }}
            />
          )}

          <img
            src={`${import.meta.env.VITE_BACKEND_URL}${t?.cardMedia?.fileUrl}`}
            alt={t.packageTitle}
            onLoad={() => setImgLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-700 ${
              imgLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
            } group-hover:scale-110`}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div
            className={`absolute right-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-bold flex items-center shadow-xl transform transition-all duration-300 group-hover:scale-110 ${
              isXs
                ? "top-2 px-2 py-1 text-[9px] gap-0.5"
                : "top-3 px-3 py-1.5 text-xs gap-1"
            }`}
          >
            <StarFilled
              className={`fill-white ${isXs ? "w-2.5 h-2.5" : "w-3 h-3"}`}
            />
            {t?.Destination?.trip}
          </div>

          {hov && !isXs && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => handleNavigate(t)}
                className="bg-white/95 cursor-pointer backdrop-blur-sm px-6 py-3 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 shadow-2xl"
              >
                <span className="text-sm font-bold text-gray-900">
                  View Details →
                </span>
              </button>
            </div>
          )}
        </div>

        <div className={isXs ? "p-3" : "p-4 sm:p-5"}>
          <h3
            className={`font-bold text-gray-900 line-clamp-2 group-hover:text-teal-600 transition-colors duration-300 ${
              isXs ? "text-xs mb-2" : "text-sm sm:text-base mb-3 sm:mb-4"
            }`}
          >
            {t.packageTitle}
          </h3>

          <div
            className={`text-gray-600 ${
              isXs
                ? "space-y-1.5 text-[10px]"
                : "space-y-2 sm:space-y-2.5 text-xs sm:text-sm"
            }`}
          >
            <div className="flex items-center gap-1.5 sm:gap-2 transform transition-transform duration-300 group-hover:translate-x-1">
              <ClockCircleOutlined
                className={`!text-teal-600 ${
                  isXs ? "!w-3 !h-3" : "!w-3.5 !h-3.5 sm:!w-4 sm:!h-4"
                }`}
              />
              <span>Duration {t.durationDays}</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 transform transition-transform duration-300 group-hover:translate-x-1">
              <CarOutlined
                className={`!text-teal-600 ${
                  isXs ? "!w-3 !h-3" : "!w-3.5 !h-3.5 sm:!w-4 sm:!h-4"
                }`}
              />
              <span>Transport Facility</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 transform transition-transform duration-300 group-hover:translate-x-1">
              <TeamOutlined
                className={`!text-teal-600 ${
                  isXs ? "!w-3 !h-3" : "!w-3.5 !h-3.5 sm:!w-4 sm:!h-4"
                }`}
              />
              <span>Family Plan</span>
            </div>
          </div>

          <div
            className={`flex items-center justify-between border-t border-gray-100 ${
              isXs ? "pt-2 mt-2" : "pt-3 sm:pt-4 mt-3 sm:mt-4"
            }`}
          >
            <div>
              <div
                className={`flex items-center gap-0.5 sm:gap-1 ${
                  isXs ? "mb-0.5" : "mb-1"
                }`}
              >
                {[...Array(5)].map((_, idx) => {
                  // Full star
                  if (idx + 1 <= rating) {
                    return (
                      <StarFilled
                        key={idx}
                        className={`!text-yellow-400 ${
                          isXs ? "w-2.5 h-2.5" : "w-3 h-3 sm:w-4 sm:h-4"
                        }`}
                      />
                    );
                  }
                  // Half star
                  else if (idx + 0.5 <= rating) {
                    return (
                      <StarFilled
                        key={idx}
                        className={`!text-yellow-200 ${
                          isXs ? "w-2.5 h-2.5" : "w-3 h-3 sm:w-4 sm:h-4"
                        }`}
                      />
                    );
                  }
                  // Empty star
                  else {
                    return (
                      <StarOutlined
                        key={idx}
                        className={`text-gray-300 ${
                          isXs ? "w-2.5 h-2.5" : "w-3 h-3 sm:w-4 sm:h-4"
                        }`}
                      />
                    );
                  }
                })}
                <span
                  className={`ml-1 sm:ml-2 ${
                    isXs ? "text-[10px]" : "text-xs sm:text-sm"
                  }`}
                >
                  {rating}
                </span>
              </div>
              <span
                className={`text-gray-500 ${
                  isXs ? "text-[8px]" : "text-[10px] sm:text-xs"
                }`}
              >
                {t.reviews} reviews
              </span>
            </div>

            <div className="text-right">
              <div
                className={`font-bold text-teal-600 group-hover:scale-110 transition-transform duration-300 leading-tight ${
                  width <= 320
                    ? "text-xs"
                    : isXs
                    ? "text-sm"
                    : "text-base sm:text-lg md:text-xl lg:text-2xl"
                }`}
              >
                ₹{t.price}
                {width > 400 && ".00"}
              </div>
              <div
                className={`text-gray-500 whitespace-nowrap ${
                  width <= 320
                    ? "text-[7px]"
                    : isXs
                    ? "text-[8px]"
                    : "text-[9px] sm:text-[10px] md:text-xs"
                }`}
              >
                per person
              </div>
            </div>
          </div>
        </div>

        <div
          className={`bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ${
            isXs ? "h-0.5" : "h-1"
          }`}
        />
      </div>
    );
  };

  const Section = ({ title, tours, refEl, sc, setSc, idx }) => (
    <div
      className={isXs ? "mb-8" : "mb-10 sm:mb-12 md:mb-16"}
      style={{ animation: `fadeInUp 0.8s ease-out ${idx * 200}ms both` }}
    >
      <div
        className={`flex items-center justify-between ${
          isXs ? "mb-4" : "mb-5 sm:mb-6 md:mb-8"
        }`}
      >
        <h2
          className={`font-bold text-[#19203c] relative inline-block group cursor-pointer ${
            isXs ? "text-lg" : "text-xl sm:text-2xl md:text-3xl lg:text-4xl"
          }`}
        >
          {title}
          <div
            className={`absolute left-0 w-0 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full group-hover:w-full transition-all duration-500 ${
              isXs ? "-bottom-1 h-0.5" : "-bottom-1 sm:-bottom-2 h-0.5 sm:h-1"
            }`}
          />
        </h2>

        <div className={`flex ${isXs ? "gap-1.5" : "gap-2 sm:gap-3"}`}>
          <button
            onClick={() => handleScroll(refEl, "left", setSc)}
            disabled={sc <= 0}
            className={`cursor-pointer bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 ${
              isXs ? "w-8 h-8" : "w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12"
            }`}
          >
            <LeftOutlined
              className={`!text-white ${
                isXs ? "!w-4 !h-4" : "!w-4 !h-4 sm:!w-5 sm:!h-5 md:!w-6 md:!h-6"
              }`}
            />
          </button>

          <button
            onClick={() => handleScroll(refEl, "right", setSc)}
            className={`cursor-pointer bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 ${
              isXs ? "w-8 h-8" : "w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12"
            }`}
          >
            <RightOutlined
              className={`!text-white ${
                isXs ? "!w-4 !h-4" : "!w-4 !h-4 sm:!w-5 sm:!h-5 md:!w-6 md:!h-6"
              }`}
            />
          </button>
        </div>
      </div>

      <div
        ref={refEl}
        className={`flex overflow-x-auto pb-3 sm:pb-4 scrollbar-hide scroll-smooth snap-x snap-mandatory ${
          isXs ? "gap-2" : "gap-3 sm:gap-4 md:gap-6"
        }`}
        style={{ scrollPaddingLeft: isXs ? "12px" : "24px" }}
      >
        {tours?.map((t, i) => (
          <div key={i} className="snap-start">
            <TourCard t={t} i={i} />
          </div>
        ))}
      </div>
    </div>
  );

  useEffect(() => {
    const onResize = () => {
      setSc1(r1.current?.scrollLeft || 0);
      setSc2(r2.current?.scrollLeft || 0);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 ${
        isXs ? "p-3" : "p-4 sm:p-6 md:p-8"
      }`}
    >
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        
        .animate-shimmer {
          animation: shimmer 1.5s infinite linear;
        }
        
        .line-clamp-2 {
          -webkit-line-clamp: 2;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scroll-smooth {
          scroll-behavior: smooth;
        }

        .snap-x {
          scroll-snap-type: x mandatory;
        }

        .snap-start {
          scroll-snap-align: start;
        }

        /* Prevent layout shift during scroll */
        .tour-card {
          will-change: transform;
        }

        /* Smooth transitions on mobile */
        @media (max-width: 640px) {
          .tour-card:hover {
            transform: scale(1.02) translateY(-4px);
          }
        }

        /* Extra small screen adjustments */
        @media (max-width: 400px) {
          .tour-card:hover {
            transform: scale(1.01) translateY(-2px);
          }
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <Section
          title={Title1}
          tours={internationalTrips || []}
          refEl={r1}
          sc={sc1}
          setSc={setSc1}
          idx={0}
        />
        <Section
          title={Title2}
          tours={indiaTrips || []}
          refEl={r2}
          sc={sc2}
          setSc={setSc2}
          idx={1}
        />
      </div>
    </div>
  );
}
