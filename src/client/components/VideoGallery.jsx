import React, { useState, useEffect } from "react";
import gallery1 from "../../assets/travel/gallery1.mp4";
import gallery2 from "../../assets/travel/gallery2.mp4";
import gallery3 from "../../assets/travel/gallery3.mp4";
import gallery4 from "../../assets/travel/gallery4.mp4";
import gallery5 from "../../assets/travel/gallery5.mp4";
import gallery6 from "../../assets/travel/gallery6.mp4";
export default function VideoGallery() {
  const [loaded, setLoaded] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  // Sample video URLs - replace with your actual videos
  const videos = [
    {
      id: 1,
      video: gallery1,
      size: "large",
      title: "Golden Paradise",
    },
    {
      id: 2,
      video: gallery2,
      title: "Ocean Waves",
    },
    {
      id: 3,
      video: gallery3,
      title: "Green Meadows",
    },
    {
      id: 4,
      video: gallery4,
      size: "large",
      title: "Forest Sunset",
    },
    {
      id: 5,
      video: gallery5,
      size: "large",
      title: "Aurora Borealis",
    },
    {
      id: 6,
      video: gallery6,
      title: "Tropical Vibes",
    },
  ];

  // Close modal with ESC key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setActiveVideo(null);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = activeVideo ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeVideo]);

  const StarIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );

  const PlayIcon = () => (
    <svg
      className="w-6 h-6 md:w-7 md:h-7 ml-1"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M8 5v14l11-7z" />
    </svg>
  );

  const CloseIcon = () => (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );

  return (
    <div className="min-h-screen bg-black p-4 sm:p-6 md:p-8 flex items-center justify-center overflow-hidden">
     

      {/* Animated Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-20 left-20 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl"
          style={{ animation: "pulse-slow 8s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-600/30 rounded-full blur-3xl"
          style={{ animation: "pulse-slow 8s ease-in-out infinite 4s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-72 h-72 bg-pink-600/20 rounded-full blur-3xl"
          style={{ animation: "pulse-slow 10s ease-in-out infinite 2s" }}
        />
      </div>

      <div className="relative max-w-6xl w-full z-10">
        {/* Header Section */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 text-black px-5 py-2 rounded-full text-sm font-bold shadow-lg hover:shadow-yellow-500/50 transition-all duration-300">
            <StarIcon />
            <span>VIDEO GALLERY</span>
            <StarIcon />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mt-6 leading-tight">
            Journey to the Most
          </h1>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 leading-tight">
            Beautiful Places on Earth
          </h1>

          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="h-1 w-20 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full" />
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <div className="h-1 w-20 bg-gradient-to-r from-transparent via-purple-400 to-transparent rounded-full" />
          </div>

          <p className="text-gray-400 mt-4 text-sm sm:text-base max-w-2xl mx-auto">
            Explore breathtaking destinations from around the world
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 auto-rows-[200px] sm:auto-rows-[220px] md:auto-rows-[240px]">
          {videos.map((video, index) => {
            const isHovered = hoveredCard === video.id;
            const isLarge = video.size === "large";

            return (
              <div
                key={video.id}
                className={`relative ${
                  isLarge ? "row-span-2" : ""
                } rounded-2xl overflow-hidden cursor-pointer group`}
                onMouseEnter={() => setHoveredCard(video.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  animation: `fadeIn 0.6s ease-out ${index * 120}ms both`,
                }}
              >
                {/* Video Background */}
                <video
                  src={video.video}
                  muted
                  loop
                  autoPlay
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Dark Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent transition-all duration-500 ${
                    isHovered ? "from-black/80 via-black/60" : ""
                  }`}
                />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    // onClick={(e) => {
                    //   e.stopPropagation();
                    //   setActiveVideo(video.video);
                    // }}
                    className={`w-16 h-16 md:w-20 md:h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:bg-white hover:scale-110 ${
                      isHovered ? "scale-110 shadow-cyan-500/50" : "scale-100"
                    }`}
                  >
                    <PlayIcon />
                  </button>
                </div>

                {/* Top Badge */}
                <div
                  className={`absolute top-4 right-4 transition-all duration-500 ${
                    isHovered
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-2"
                  }`}
                >
                  <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/30 text-white text-xs font-semibold shadow-lg">
                    ▶ WATCH NOW
                  </div>
                </div>

                {/* Bottom Title */}
                <div
                  className={`absolute bottom-0 left-0 right-0 p-5 transition-all duration-500 ${
                    isHovered
                      ? "translate-y-0 opacity-100"
                      : "translate-y-2 opacity-0"
                  }`}
                >
                  <h3 className="text-white text-lg font-bold drop-shadow-lg">
                    {video.title}
                  </h3>
                  <div className="h-0.5 w-12 bg-gradient-to-r from-cyan-400 to-purple-400 mt-2 rounded-full" />
                </div>

                {/* Hover Border Glow */}
                <div
                  className={`absolute inset-0 rounded-2xl transition-all duration-500 pointer-events-none ${
                    isHovered
                      ? "ring-2 ring-cyan-400/50 shadow-lg shadow-cyan-500/30"
                      : ""
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Video Modal */}
      {/* {activeVideo && (
        <div 
          className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-4"
          onClick={() => setActiveVideo(null)}
          style={{ animation: 'fadeIn 0.3s ease-out' }}
        >
          <div 
            className="relative w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
           
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
              <video
                src={activeVideo}
                controls
                autoPlay
                className="w-full"
              />
            </div>

          
            <button
              onClick={() => setActiveVideo(null)}
              className="hidden sm:flex absolute -top-14 right-0 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:rotate-90 border border-white/20 shadow-lg"
              aria-label="Close video"
            >
              <CloseIcon />
            </button>

           
            <button
              onClick={() => setActiveVideo(null)}
              className="sm:hidden absolute top-4 right-4 w-10 h-10 bg-black/70 hover:bg-black/90 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all duration-300 border border-white/20"
              aria-label="Close video"
            >
              <CloseIcon />
            </button>

           
            <div className="hidden sm:flex absolute -bottom-12 left-0 items-center gap-2 text-gray-400 text-sm">
              <span>Press</span>
              <kbd className="px-3 py-1.5 bg-white/5 rounded-lg border border-white/10 font-mono text-white">ESC</kbd>
              <span>or click outside to close</span>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}
