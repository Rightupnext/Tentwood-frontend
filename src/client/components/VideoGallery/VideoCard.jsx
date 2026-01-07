import React from "react";

export default function VideoCard({ video, index, hoveredCard, setHoveredCard }) {
  const isHovered = hoveredCard === video.id;
  const isLarge = video.size === "large";

  const PlayIcon = () => (
    <svg className="w-6 h-6 md:w-7 md:h-7 ml-1" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" />
    </svg>
  );

  return (
    <div
      className={`relative ${isLarge ? "row-span-2" : ""} rounded-2xl overflow-hidden cursor-pointer group`}
      onMouseEnter={() => setHoveredCard(video.id)}
      onMouseLeave={() => setHoveredCard(null)}
      style={{ animation: `fadeIn 0.6s ease-out ${index * 120}ms both` }}
    >
      <video src={video.video} muted loop autoPlay playsInline className="absolute inset-0 w-full h-full object-cover" />

      {/* Dark Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent transition-all duration-500 ${isHovered ? "from-black/80 via-black/60" : ""}`} />

      {/* Play Button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <button className={`w-16 h-16 md:w-20 md:h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:bg-white hover:scale-110 ${isHovered ? "scale-110 shadow-cyan-500/50" : "scale-100"}`}>
          <PlayIcon />
        </button>
      </div>

      {/* Top Badge */}
      <div className={`absolute top-4 right-4 transition-all duration-500 ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}>
        <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/30 text-white text-xs font-semibold shadow-lg">
          ▶ WATCH NOW
        </div>
      </div>

      {/* Bottom Title */}
      <div className={`absolute bottom-0 left-0 right-0 p-5 transition-all duration-500 ${isHovered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}>
        <h3 className="text-white text-lg font-bold drop-shadow-lg">{video.title}</h3>
        <div className="h-0.5 w-12 bg-gradient-to-r from-cyan-400 to-purple-400 mt-2 rounded-full" />
      </div>

      {/* Hover Border Glow */}
      <div className={`absolute inset-0 rounded-2xl transition-all duration-500 pointer-events-none ${isHovered ? "ring-2 ring-cyan-400/50 shadow-lg shadow-cyan-500/30" : ""}`} />
    </div>
  );
}
