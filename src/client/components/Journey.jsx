import React, { useState, useEffect, useCallback } from "react";
import { Play, Sparkles } from "lucide-react";

export default function VideoGallery() {
  const [hover, setHover] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => setLoaded(true), []);

  const videos = [
    { id: 1, img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&auto=format&fit=crop&q=50", video: "https://res.cloudinary.com/dttvw0p7p/video/upload/v1765611354/169249-840702546-VEED_popkch.mp4", size: "large" },
    { id: 2, img: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&auto=format&fit=crop&q=50", video: "/video2.mp4", size: "small" },
    { id: 3, img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&auto=format&fit=crop&q=50", video: "/video3.mp4", size: "small" },
    { id: 4, img: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&auto=format&fit=crop&q=50", video: "/video4.mp4", size: "small" },
    { id: 5, img: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&auto=format&fit=crop&q=50", video: "/video5.mp4", size: "small" },
  ];

  const VideoCard = useCallback(({ video, index }) => {
    const isHover = hover === video.id;
    const isLarge = video.size === "large";

    return (
      <div
        className={`relative ${isLarge ? "row-span-2 md:row-span-2 sm:row-span-1" : ""} rounded-3xl overflow-hidden cursor-pointer group transform transition duration-500 hover:scale-[1.02]`}
        onMouseEnter={() => setHover(video.id)}
        onMouseLeave={() => setHover(null)}
        style={{ animation: `fadeIn 0.7s ease-out ${index * 120}ms both` }}
      >
        <img
          src={video.img}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          alt=""
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-70 group-hover:opacity-90 transition" />

        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveVideo(video.video);
            }}
            className={`w-12 h-12 md:w-16 md:h-16 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl transition ${
              isHover ? "scale-110 ring-4 ring-white/40" : ""
            }`}
          >
            <Play className="w-5 h-5 md:w-7 md:h-7 text-gray-900 ml-1" />
          </button>
        </div>

        <div className="absolute top-2 right-2 md:top-4 md:right-4 opacity-0 group-hover:opacity-100 transition">
          <div className="bg-white/10 backdrop-blur px-3 py-1 rounded-full border border-white/20 text-white text-xs font-semibold">
            WATCH NOW
          </div>
        </div>

        {isHover && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="absolute inset-0 border border-white/20 rounded-3xl animate-ping"
                style={{ animationDuration: "1.6s", animationDelay: `${i * 0.25}s` }}
              />
            ))}
          </div>
        )}
      </div>
    );
  }, [hover]);

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
        <div className={`text-center mb-10 transition duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-4 py-1.5 rounded-full text-sm shadow">
            <Sparkles className="w-4 h-4 animate-spin" />
            Video Gallery
            <Sparkles className="w-4 h-4 animate-spin" />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mt-4">Journey to the Most</h1>

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
          <video src={activeVideo} controls autoPlay className="w-full max-w-xl sm:max-w-2xl md:max-w-4xl rounded-xl" />

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
