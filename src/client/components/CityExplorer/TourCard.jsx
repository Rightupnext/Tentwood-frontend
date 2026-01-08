import React, { memo, useState } from "react";
import {
  CarOutlined,
  ClockCircleOutlined,
  StarOutlined,
  StarFilled,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const TourCard = memo(({ t, i }) => {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const TRIP_ROUTE_MAP = {
    "India Trips": "india-trips",
    "International Trips": "international-trips",
    "Honeymoon Packages": "honeymoon-packages",
    "Group Tour": "group-tour",
  };

  const handleNavigate = (a) => {
    const category = a?.tripCategories?.[0];
    const tripPrefix = TRIP_ROUTE_MAP[category];
    if (!tripPrefix) return;

    navigate(
      `/${tripPrefix}/${a?.Destination?.name
        ?.toLowerCase()
        .replace(/\s+/g, "-")}/${a?.packageTitle
        ?.toLowerCase()
        .replace(/\s+/g, "-")}`,
      { state: { id: a?._id } }
    );
  };

  return (
    <div
      className="tour-card flex-shrink-0 w-[240px] sm:w-[280px] md:w-[300px] lg:w-[320px] bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 group cursor-pointer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ animation: `fadeInUp 0.6s ease-out ${i * 50}ms both` }}
    >
      <div className="relative h-48 sm:h-52 md:h-56 w-full overflow-hidden bg-gray-200">
        {!imgLoaded && (
          <div
            className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"
            style={{ backgroundSize: "200% 100%" }}
          />
        )}

        <img
          loading="lazy"
          src={`${import.meta.env.VITE_BACKEND_URL}${t?.cardMedia?.fileUrl}`}
          alt={t.title}
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 ${
            imgLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          } group-hover:scale-110`}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute top-3 right-3 flex flex-wrap gap-2">
          {t.tripCategories.map((category, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-xl transform transition-all duration-300 group-hover:scale-110"
            >
              <StarOutlined className="w-3 h-3 fill-white" />
              {category}
            </div>
          ))}
        </div>

        {hover && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={() => handleNavigate(t)}
              className="bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 shadow-2xl"
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
          <div className="flex items-center gap-2 group-hover:translate-x-1 transition-transform">
            <ClockCircleOutlined className="text-teal-600" />
            <span>Duration {t.durationDays}</span>
          </div>
          <div className="flex items-center gap-2 group-hover:translate-x-1 transition-transform">
            <CarOutlined className="text-teal-600" />
            <span>Transport Facility</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t mt-4">
          <div>
            <div className="flex gap-1 mb-1">
              {[...Array(5)].map((_, idx) =>
                idx + 1 <= t.rating ? (
                  <StarFilled key={idx} className="!text-yellow-400" />
                ) : (
                  <StarOutlined key={idx} className="text-gray-300" />
                )
              )}
            </div>
            <span className="text-xs text-gray-500">{t.rating} reviews</span>
          </div>

          <div className="text-right">
            <div className="text-2xl font-bold text-teal-600">
              ₹ {t.price}.00
            </div>
            <div className="text-xs text-gray-500">per person</div>
          </div>
        </div>
      </div>

      <div className="h-1 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
    </div>
  );
});

export default TourCard;
