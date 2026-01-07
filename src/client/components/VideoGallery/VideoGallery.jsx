import React, { useState, useEffect, Suspense } from "react";

// Lazy import the VideoCard component
const VideoCard = React.lazy(() => import("./VideoCard"));

import gallery1 from "../../../assets/travel/gallery1.mp4";
import gallery2 from "../../../assets/travel/gallery2.mp4";
import gallery3 from "../../../assets/travel/gallery3.mp4";
import gallery4 from "../../../assets/travel/gallery4.mp4";
import gallery5 from "../../../assets/travel/gallery5.mp4";
import gallery6 from "../../../assets/travel/gallery6.mp4";

export default function VideoGallery() {
  const [loaded, setLoaded] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  // Videos array
  const videos = [
    { id: 1, video: gallery1, size: "large", title: "Golden Paradise" },
    { id: 2, video: gallery2, title: "Ocean Waves" },
    { id: 3, video: gallery3, title: "Green Meadows" },
    { id: 4, video: gallery4, size: "large", title: "Forest Sunset" },
    { id: 5, video: gallery5, size: "large", title: "Aurora Borealis" },
    { id: 6, video: gallery6, title: "Tropical Vibes" },
  ];

  // ESC key for closing modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setActiveVideo(null);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  // Prevent scroll when modal open
  useEffect(() => {
    document.body.style.overflow = activeVideo ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeVideo]);

  return (
    <div className="min-h-screen bg-black p-4 sm:p-6 md:p-8 flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
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
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 text-black px-5 py-2 rounded-full text-sm font-bold shadow-lg hover:shadow-yellow-500/50 transition-all duration-300">
            <span>★</span>
            <span>VIDEO GALLERY</span>
            <span>★</span>
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
        <Suspense
          fallback={
            <div className="text-white text-center py-20">
              Loading videos...
            </div>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 auto-rows-[200px] sm:auto-rows-[220px] md:auto-rows-[240px]">
            {videos.map((video, index) => (
              <VideoCard
                key={video.id}
                video={video}
                index={index}
                hoveredCard={hoveredCard}
                setHoveredCard={setHoveredCard}
              />
            ))}
          </div>
        </Suspense>
      </div>
    </div>
  );
}
