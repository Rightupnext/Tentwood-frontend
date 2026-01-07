import React, { useState } from "react";
import Icon from "./UI/Icon";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import StarRating from "./UI/StarRating";
const HotelCard = ({ hotel = [], activeHotel = [] }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const rating = 4.5;
  return (
    <div className="flex justify-center relative">
      <div className="relative transform transition-all duration-700 hover:scale-105 w-full max-w-sm">
        <div className="relative w-full h-[620px] bg-gray-900 rounded-[3rem] shadow-2xl p-3 animate-float border-8 border-gray-800">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-30" />
          <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
            <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-r from-purple-600 to-cyan-500 flex items-center justify-between px-6 text-white text-xs z-20">
              <span className="font-semibold">9:41</span>
              <div className="flex gap-1.5 items-center">
                <Icon type="signal" size="14" color="white" />
                <Icon type="wifi" size="14" color="white" />
                <div className="w-6 h-3 border-2 border-white rounded-sm relative">
                  <div className="absolute inset-0.5 bg-white rounded-sm" />
                </div>
              </div>
            </div>
            <div className="pt-10 px-4 pb-3 bg-gradient-to-r from-purple-600 to-cyan-500">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white text-xl font-bold tracking-wide">
                  Top Places
                </h2>
                <div className="w-10 h-10 bg-white/20 rounded-full backdrop-blur-sm flex items-center justify-center gap-1">
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
              </div>
              <div className="flex gap-2 mb-3">
                <button className="px-4 py-1.5 bg-white/20 text-white text-xs rounded-full backdrop-blur-sm">
                  SEARCH
                </button>
                <button className="px-4 py-1.5 bg-white text-cyan-600 text-xs rounded-full font-semibold shadow-lg transform scale-105">
                  NEARBY
                </button>
                <button className="px-4 py-1.5 bg-white/20 text-white text-xs rounded-full backdrop-blur-sm">
                  FAVORITES
                </button>
              </div>
              <p className="text-white/90 text-xs font-medium">
                30 HOTELS FOUND NEAR YOU
              </p>
            </div>
            <div className="px-4 py-4 space-y-3 overflow-y-auto h-[490px] bg-gray-50">
              {hotel.map((hotel, idx) => (
                <div
                  key={idx}
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 ${
                    activeHotel === idx
                      ? "ring-2 ring-cyan-400 scale-[1.02]"
                      : ""
                  }`}
                  style={{
                    animation: `slideUp 0.6s ease-out ${idx * 0.15}s both`,
                  }}
                >
                  <div className="relative h-40 bg-gray-200 overflow-hidden">
                    {!imageLoaded[idx] && (
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
                    )}
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}${
                        hotel?.cardMedia?.fileUrl
                      }`}
                      alt={hotel.packageTitle}
                      onLoad={() =>
                        setImageLoaded((prev) => ({
                          ...prev,
                          [idx]: true,
                        }))
                      }
                      className={`w-full h-full object-cover transition-all duration-700 ${
                        imageLoaded[idx]
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-95"
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    {hotel.Destination?.trip && (
                      <div className="absolute top-2 left-2 bg-amber-400 text-white text-[10px] px-2 py-1 rounded-full font-bold animate-pulse shadow-lg">
                        {hotel?.Destination?.trip}
                      </div>
                    )}
                    <button className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform active:scale-95">
                      <Icon type="heart" size="16" color="#f87171" />
                    </button>
                    <div className="absolute bottom-2 right-2 bg-cyan-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                      {hotel.price}
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-bold text-gray-800 text-sm mb-1.5">
                      {hotel.packageTitle}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
                      <Icon type="mapPin" size="14" color="#06b6d4" />
                      <span>{hotel.locations}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-0.5">
                          <StarRating rating={rating} />
                          <span className="ml-2 text-sm">{rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute -top-8 -right-8 w-20 h-20 bg-yellow-400 rounded-2xl shadow-2xl animate-bounce flex items-center justify-center text-3xl transform rotate-12">
          ⭐
        </div>
        <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-cyan-400 rounded-full shadow-2xl animate-pulse flex items-center justify-center">
          <Icon type="mapPin" size="32" color="white" />
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
