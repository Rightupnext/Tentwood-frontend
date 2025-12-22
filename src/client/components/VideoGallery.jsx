import React, { useState, useEffect, useCallback } from "react";
import { PlayCircleOutlined, StarOutlined } from "@ant-design/icons";
import gallery1 from "../../assets/travel/gallery1.mp4";
import gallery2 from "../../assets/travel/gallery2.mp4";
import gallery3 from "../../assets/travel/gallery3.mp4";
import gallery4 from "../../assets/travel/gallery4.mp4";
import gallery5 from "../../assets/travel/gallery5.mp4";
import galler6 from "../../assets/travel/gallery6.mp4";
export default function VideoGallery() {
  const [hover, setHover] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => setLoaded(true), []);

  const videos = [
    { id: 1, video: gallery1, size: "large" },
    { id: 2, video: gallery2 },
    { id: 3, video: gallery3 },
    { id: 4, video: gallery4, size: "large" },
    { id: 5, video: gallery5, size: "large" },
    { id: 6, video: galler6 },
  ];

  const VideoCard = useCallback(
    ({ video, index }) => {
      const isHover = hover === video.id;
      const isLarge = video.size === "large";

      return (
        <div
          className={`relative ${
            isLarge ? "row-span-2" : ""
          } rounded-3xl overflow-hidden cursor-pointer group transition duration-500`}
          onMouseEnter={() => setHover(video.id)}
          onMouseLeave={() => setHover(null)}
          // style={{ animation: `fadeIn 0.7s ease-out ${index * 120}ms both` }}
        >
          {/* VIDEO THUMB */}
          <video
            src={video.video}
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* PLAY BUTTON */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveVideo(video.video);
              }}
              className={`w-14 h-14 md:w-16 md:h-16 bg-white/90 rounded-full flex items-center justify-center shadow-xl transition
               `}
            >
              <PlayCircleOutlined className="text-3xl text-black" />
            </button>
          </div>

          {/* WATCH NOW BADGE */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition">
            <div className="bg-white/10 backdrop-blur px-3 py-1 rounded-full border border-white/20 text-white text-xs font-semibold">
              WATCH NOW
            </div>
          </div>
        </div>
      );
    },
    [hover]
  );

  return (
    <div className="min-h-screen bg-black p-4 sm:p-6 md:p-8 flex items-center justify-center overflow-hidden">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="absolute inset-0 pointer-events-none hidden sm:block opacity-40">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-cyan-600/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative max-w-5xl w-full">
        <div
          className={`text-center mb-10 transition duration-700 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-4 py-1.5 rounded-full text-sm shadow">
            <StarOutlined className="w-4 h-4 animate-spin" />
            Video Gallery
            <StarOutlined className="w-4 h-4 animate-spin" />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mt-4">
            Journey to the Most
          </h1>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-cyan-200">
            Beautiful Places on Earth
          </h1>

          <div className="h-1 w-28 mx-auto bg-gradient-to-r from-transparent via-white to-transparent mt-2 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[180px] sm:auto-rows-[200px] md:auto-rows-[220px]">
          {videos.map((video, i) => (
            <VideoCard key={video.id} video={video} index={i} />
          ))}
        </div>
      </div>

      {activeVideo && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <video
            src={activeVideo}
            controls
            autoPlay
            className="w-full max-w-xl sm:max-w-2xl md:max-w-4xl rounded-xl"
          />

          <button
            onClick={() => setActiveVideo(null)}
            className="absolute top-6 right-6 text-white text-4xl font-bold"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
