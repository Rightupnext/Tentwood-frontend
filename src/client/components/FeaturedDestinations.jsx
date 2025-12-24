import React, { useState, useRef, useEffect } from "react";
import {
  StarOutlined,
  LeftOutlined,
  RightOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  TeamOutlined,
} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";

export default function FeaturedDestinations({ selected }) {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener("scroll", checkScroll);
      return () => ref.removeEventListener("scroll", checkScroll);
    }
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 sm:mb-12 gap-4 animate-fadeIn">
          <div className="max-w-xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-3 sm:mb-4 animate-slideUp">
              Related Destinations in{" "}
              <span className="text-teal-400">
                {selected?.mostCommonDestination}
              </span>
            </h2>
            <p
              className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed animate-slideUp"
              style={{ animationDelay: "100ms" }}
            >
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit
            </p>
          </div>

          {/* Navigation Buttons */}
          <div
            className="flex items-center gap-3 sm:gap-4 animate-slideUp"
            style={{ animationDelay: "200ms" }}
          >
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center bg-yellow-400 justify-center transition-all duration-300 ${
                canScrollLeft
                  ? "bg-white shadow-lg hover:shadow-xl hover:scale-110 border border-slate-200"
                  : "bg-slate-100 border border-slate-200 opacity-50 cursor-not-allowed"
              }`}
            >
              <LeftOutlined
                className={`!w-5 !h-5 !sm:w-6 !cursor-pointer !sm:h-6 ${
                  canScrollLeft ? "!text-slate-700" : "!text-slate-400"
                }`}
              />
            </button>

            {/* Indicator Dots */}
            {/* <div className="flex items-center gap-2">
                <div className={`rounded-full shadow-md transition-all duration-300 ${
                  canScrollLeft ? 'w-8 h-8 sm:w-10 sm:h-10 bg-white border-2 border-slate-300' : 'w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-400 to-yellow-500'
                }`}></div>
                <div className={`rounded-full shadow-md transition-all duration-300 ${
                  !canScrollLeft && !canScrollRight ? 'w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-400 to-yellow-500' : 'w-8 h-8 sm:w-10 sm:h-10 bg-white border-2 border-slate-300'
                }`}></div>
              </div> */}

            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center bg-yellow-400 justify-center transition-all duration-300 ${
                canScrollRight
                  ? "bg-white shadow-lg hover:shadow-xl hover:scale-110 border border-slate-200"
                  : "bg-slate-100 border border-slate-200 opacity-50 cursor-not-allowed"
              }`}
            >
              <RightOutlined
                className={`!w-5 !h-5 !sm:w-6 !sm:h-6 !cursor-pointer  ${
                  canScrollRight ? "!text-slate-700" : "!text-slate-400"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Scrollable Cards Container */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-5 sm:gap-6 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {selected?.byDestination?.map((dest, i) => (
              <div
                key={i}
                style={{ animationDelay: `${i * 100}ms` }}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[340px] bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 animate-scaleIn hover:-translate-y-3 cursor-pointer group"
              >
                {/* Image Container */}
                <div className="relative h-48 sm:h-56 md:h-60 overflow-hidden">
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}${
                      dest?.cardMedia?.fileUrl
                    }`}
                    alt={dest.title}
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      hoveredCard === i ? "scale-125 rotate-2" : "scale-100"
                    }`}
                    
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
                      hoveredCard === i ? "opacity-100" : "opacity-0"
                    }`}
                  ></div>

                  {/* Floating Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full text-xs font-bold text-slate-900 shadow-lg animate-pulse">
                    {dest?.Destination?.trip}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  <h3 className="font-bold text-slate-800 mb-3 sm:mb-4 text-base sm:text-lg line-clamp-2 min-h-[48px] sm:min-h-[56px] group-hover:text-teal-600 transition-colors duration-300">
                    {dest.packageTitle}
                  </h3>

                  {/* Info List */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
                      <ClockCircleOutlined className="!w-4 !h-4 !text-teal-500" />
                      <span>Duration: {dest.durationDays}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
                      <EnvironmentOutlined className="!w-4 !h-4 !text-purple-500" />
                      <span>
                        {dest.pickup} / {dest.drop}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
                      <TeamOutlined className="!w-4 !h-4 !text-blue-500" />
                      <span>{dest.plan}</span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-100">
                    <div className="flex">
                      {[...Array(5)].map((_, idx) => (
                        <StarOutlined
                          key={idx}
                          className={`!w-4 !h-4 !transition-all !duration-300 ${
                            idx < dest.rating
                              ? "!fill-yellow-400 !text-yellow-400"
                              : "!fill-slate-200 !text-slate-200"
                          } ${
                            hoveredCard === i && idx < dest.rating
                              ? "scale-125"
                              : ""
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-slate-500">
                      ({dest.reviews} reviews)
                    </span>
                  </div>

                  {/* Price & Book Button */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                        {dest.price}
                      </span>
                      <p className="text-xs text-slate-500 mt-0.5">
                        per person
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        navigate(
                          `/international-trips/${dest?.Destination?.route}/${dest?.seo?.slug}`,
                          { state: { id: dest?._id } }
                        );
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="px-5 py-2.5 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-full text-sm font-semibold shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Gradient Overlays for Scroll Hint */}
          {canScrollLeft && (
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none z-10"></div>
          )}
          {canScrollRight && (
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none z-10"></div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
        @keyframes scaleIn{from{opacity:0;transform:scale(0.9)}to{opacity:1;transform:scale(1)}}
        .animate-fadeIn{animation:fadeIn 0.6s ease-out forwards}
        .animate-slideUp{animation:slideUp 0.7s ease-out forwards}
        .animate-scaleIn{animation:scaleIn 0.6s ease-out forwards}
        .scrollbar-hide::-webkit-scrollbar{display:none}
      `}</style>
    </div>
  );
}
