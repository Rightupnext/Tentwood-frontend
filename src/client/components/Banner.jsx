import React, { useState } from "react";
import {
  EnvironmentOutlined,
  UserOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import bannervideo1 from "../../assets/home/bannervideo.1.mp4";

export default function Banner() {
  const [location, setLocation] = useState("");

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* VIDEO BACKGROUND */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={bannervideo1}
        autoPlay
        muted
        loop
        playsInline
      />

      {/* GRADIENT OVERLAYS */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent" />

      {/* MAIN CONTENT */}
      <div className="relative flex flex-col items-center justify-center px-4 py-16 md:py-24 z-10 min-h-screen">
        {/* HERO TEXT */}
        <div className="max-w-5xl text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-2xl">
            We Find The Best Tours For You
          </h1>
        </div>

        {/* FLOATING ICONS */}
        <div className="relative w-full max-w-2xl mx-auto mb-16 animate-fade-in-up-delay">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-16 h-16 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl animate-bounce-slow z-10">
            <EnvironmentOutlined className="!text-teal-500 !text-xl" />
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 w-16 h-16 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl animate-bounce-slow-delay z-10">
            <UserOutlined className="!text-teal-500 !text-xl" />
          </div>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-16 h-16 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl animate-bounce-slow-delay-2 z-10">
            <CalendarOutlined className="!text-teal-500 !text-xl" />
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="w-full max-w-6xl px-4 animate-fade-in-up-delay-2">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-8 border border-white/40">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* LOCATION */}
              <div className="md:col-span-2 space-y-2 pb-4 md:pb-0 md:border-r border-gray-300 md:pr-4">
                <label className="flex items-center gap-2 text-sm font-bold text-teal-600">
                  <EnvironmentOutlined />
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Search For A Destination"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full py-2 bg-transparent text-gray-700 focus:outline-none"
                />
              </div>

              {/* SEARCH BUTTON */}
              <div className="flex items-end">
                <button className="w-full px-8 py-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 text-gray-900 rounded-full font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM FADE */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/40 to-transparent pointer-events-none" />
    </div>
  );
}
