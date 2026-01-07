import React, { useState } from "react";
import {
  StarFilled,
  StarOutlined,
  ClockCircleOutlined,
  CarOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function TourCard({ t, i, title }) {
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

  const rating = (Math.random() * (5 - 3.5) + 3.5).toFixed(1);

  return (
    <div
      className="tour-card flex-shrink-0 w-[240px] sm:w-[280px] md:w-[300px] lg:w-[320px] bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 group cursor-pointer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ animation: `fadeInUp 0.6s ease-out ${i * 100}ms both` }}
    >
      <div className="relative h-48 sm:h-52 md:h-56 w-full overflow-hidden bg-gray-200">
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

        <div className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-xl transform transition-all duration-300 group-hover:scale-110">
          <StarFilled className="w-3 h-3 fill-white" />
          {t?.tripCategories ? title : t?.tripCategories}
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
                if (idx + 1 <= rating)
                  return (
                    <StarFilled
                      key={idx}
                      className="w-4 h-4 !text-yellow-400"
                    />
                  );
                if (idx + 0.5 <= rating)
                  return (
                    <StarFilled
                      key={idx}
                      className="w-4 h-4 !text-yellow-200"
                    />
                  );
                return (
                  <StarOutlined key={idx} className="w-4 h-4 text-gray-300" />
                );
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
}
