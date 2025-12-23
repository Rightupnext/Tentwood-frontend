import React, { useState, useRef, useEffect } from "react";
import {
  LeftOutlined,
  RightOutlined,
  ClockCircleOutlined,
  CarOutlined,
  TeamOutlined,
  StarOutlined,
  EnvironmentOutlined,
  StarFilled,
} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";

const opt = (u) =>
  u.includes("?")
    ? u + "&auto=format&fit=crop&q=80"
    : u + "?auto=format&fit=crop&q=80";

export default function Relatedtours({
  Title3,
  Title4,
  packages,
  honeymoonTrips,
  GroupTrips,
}) {
  const [sc1, setSc1] = useState(0);
  const [sc2, setSc2] = useState(0);
  const r1 = useRef(null);
  const r2 = useRef(null);

  const handleScroll = (ref, d, setfn) => {
    const navigate = useNavigate();
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
        className="tour-card flex-shrink-0 w-[240px] sm:w-[280px] md:w-[300px] lg:w-[320px] bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 group cursor-pointer"
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{ animation: `fadeInUp 0.6s ease-out ${i * 100}ms both` }}
      >
        <div className="relative h-48 sm:h-52 md:h-56 w-full overflow-hidden bg-gray-200">
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
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-700 ${
              imgLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
            } group-hover:scale-110`}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-xl transform transition-all duration-300 group-hover:scale-110">
            <StarOutlined className="!w-3 !h-3 !fill-white" />
            {t?.Destination?.trip}
          </div>

          {hov && (
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

        <div className="p-5">
          <h3 className="font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-teal-600 transition-colors duration-300 text-base">
            {t.packageTitle}
          </h3>

          <div className="space-y-2.5 text-sm text-gray-600">
            <div className="flex items-center gap-2 transform transition-transform duration-300 group-hover:translate-x-1">
              <ClockCircleOutlined className="!w-4 !h-4 !text-teal-600" />
              <span>Duration {t.durationDays}</span>
            </div>
            <div className="flex items-center gap-2 transform transition-transform duration-300 group-hover:translate-x-1">
              <CarOutlined className="!w-4 !h-4 !text-teal-600" />
              <span>Transport Facility</span>
            </div>
            <div className="flex items-center gap-2 transform transition-transform duration-300 group-hover:translate-x-1">
              <TeamOutlined className="!w-4 !h-4 !text-teal-600" />
              <span>Family Plan</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-4">
            <div>
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, idx) => {
                  // Full star
                  if (idx + 1 <= rating) {
                    return (
                      <StarFilled
                        key={idx}
                        className="w-4 h-4 !text-yellow-400"
                      />
                    );
                  }
                  // Half star (optional: use outlined slightly colored)
                  else if (idx + 0.5 <= rating) {
                    return (
                      <StarFilled
                        key={idx}
                        className="w-4 h-4 !text-yellow-200"
                      />
                    );
                  }
                  // Empty star
                  else {
                    return (
                      <StarOutlined
                        key={idx}
                        className="w-4 h-4 text-gray-300"
                      />
                    );
                  }
                })}
                <span className="ml-2 text-sm">{rating}</span>
              </div>
              <span className="text-xs text-gray-500">{t.reviews} reviews</span>
            </div>

            <div className="text-right">
              <div className="text-2xl font-bold text-teal-600 group-hover:scale-110 transition-transform duration-300">
                ₹{t.price}.00
              </div>
              <div className="text-xs text-gray-500">per person</div>
            </div>
          </div>
        </div>

        <div className="h-1 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>
    );
  };

  const Section = ({ title, tours, refEl, sc, setSc, idx }) => (
    <div
      className="mb-12 sm:mb-16"
      style={{ animation: `fadeInUp 0.8s ease-out ${idx * 200}ms both` }}
    >
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#19203c] relative inline-block group cursor-pointer">
          {title}
          <div className="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full group-hover:w-full transition-all duration-500" />
        </h2>

        <div className="flex gap-2 sm:gap-3">
          <button
            onClick={() => handleScroll(refEl, "left", setSc)}
            disabled={sc <= 0}
            className="w-10 h-10 sm:w-12 sm:h-12 cursor-pointer bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <LeftOutlined className="!w-5 !h-5 !sm:w-6! sm:h-6 !text-white" />
          </button>

          <button
            onClick={() => handleScroll(refEl, "right", setSc)}
            className="w-10 h-10 sm:w-12 sm:h-12 cursor-pointer bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300"
          >
            <RightOutlined className="!w-5 !h-5 !sm:w-6 !sm:h-6 !text-white" />
          </button>
        </div>
      </div>

      <div
        ref={refEl}
        className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 scrollbar-hide scroll-smooth snap-x snap-mandatory"
        style={{ scrollPaddingLeft: "24px" }}
      >
        {tours.map((t, i) => (
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 p-4 sm:p-6 md:p-8">
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
      `}</style>

      <div className="max-w-7xl mx-auto">
        <Section
          title={Title3}
          tours={GroupTrips || []}
          refEl={r1}
          sc={sc1}
          setSc={setSc1}
          idx={0}
        />
        <Section
          title={Title4}
          tours={honeymoonTrips || []}
          refEl={r2}
          sc={sc2}
          setSc={setSc2}
          idx={1}
        />
      </div>
    </div>
  );
}
