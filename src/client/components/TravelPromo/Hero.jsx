import React from "react";
import { RightOutlined, CompassOutlined } from "@ant-design/icons";

export default function Hero({
  img,
  title,
  side,
  mousePos,
  scrollY,
  isLoaded,
  isMobile,
}) {
  const px = isMobile ? 0 : (mousePos.x - window.innerWidth / 2) / 40;
  const py = isMobile ? 0 : (mousePos.y - window.innerHeight / 2) / 40;
  const parallax = scrollY * 0.3;

  return (
    <div className="relative h-[400px] sm:h-[350px] overflow-hidden group cursor-pointer">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 will-change-transform"
        style={{
          backgroundImage: `url(${img})`,
          transform: `translate(${px}px, ${py - parallax}px) scale(1.1)`,
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 via-purple-600/30 to-transparent opacity-60 group-hover:opacity-40 transition-all duration-700 animate-gradient" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent group-hover:from-black/70 transition-all duration-700" />

      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1500" />
      </div>

      <div className="absolute inset-0 opacity-30">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div
        className={`relative h-full flex flex-col justify-center z-10 text-white ${
          side === "left"
            ? "items-start pl-8 sm:pl-16"
            : "items-end pr-8 sm:pr-16"
        }`}
      >
        <div
          className={`transition-all duration-1000 transform ${
            isLoaded
              ? "translate-y-0 opacity-100 scale-100"
              : "translate-y-12 opacity-0 scale-95"
          }`}
          style={{ transitionDelay: side === "left" ? "300ms" : "500ms" }}
        >
          <span className="text-[11px] sm:text-xs font-bold tracking-[4px] uppercase bg-white/15 backdrop-blur-xl px-4 py-2 rounded-full border border-white/40 mb-4 inline-block shadow-lg">
            PROMOTION
          </span>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-3">
            Explore
          </h2>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-10">
            {title}
          </h2>

          <button className="group/btn relative cursor-pointer px-8 py-4 bg-white/10 backdrop-blur-xl border-2 border-white/60 rounded-full font-bold transition-all duration-500 hover:bg-white hover:text-gray-900">
            <span className="relative z-10 flex items-center gap-3">
              View Packages
              <RightOutlined />
            </span>
          </button>
        </div>
      </div>

      <CompassOutlined
        className="!absolute !top-6 !right-6 !text-white !opacity-20 !transition-all !duration-700"
        style={{
          animation: "spin 25s linear infinite, pulse 3s ease-in-out infinite",
        }}
      />
    </div>
  );
}
