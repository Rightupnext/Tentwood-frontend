import React, { useState, useRef, useEffect } from "react";
import { MapPin, Users, Calendar, Volume2, VolumeX } from 'lucide-react';
import bannervideo1 from '../../assets/home/bannervideo.1.mp4';
import bannervideo2 from '../../assets/home/bannervideo.mp3';

export default function Banner() {
  const [guests, setGuests] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
    }
  }, []);

  const toggleMute = async () => {
    if (!audioRef.current) return;

    try {
      if (!isPlaying) {
        // First time playing - user interaction required
        await audioRef.current.play();
        setIsPlaying(true);
        setIsMuted(false);
      } else {
        // Toggle mute/unmute
        const newMutedState = !isMuted;
        setIsMuted(newMutedState);
        audioRef.current.muted = newMutedState;
      }
    } catch (error) {
      console.log("Audio play error:", error);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">

      {/* ================= BACKGROUND VIDEO ================= */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={bannervideo1}
        autoPlay
        muted
        loop
        playsInline
      ></video>

      {/* Background Music - Epic Adventure Music */}
      <audio
        ref={audioRef}
        src={bannervideo2}
        loop
        preload="auto"
      />

      {/* Premium Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent"></div>

      {/* Floating Soft Glow Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-white/40 rounded-full blur-[2px] animate-floating"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${5 + Math.random() * 6}s`,
              animationDelay: `${Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>

      {/* Audio Control Button */}
      <div className="absolute top-6 right-6 z-50">
        <button
          onClick={toggleMute}
          className="w-14 h-14 md:w-16 md:h-16 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-white/30 transition-all border border-white/30 hover:scale-110 group shadow-xl"
        >
          {!isPlaying || isMuted ? (
            <VolumeX className="w-6 h-6 md:w-7 md:h-7 text-white group-hover:scale-110 transition-transform" />
          ) : (
            <>
              <Volume2 className="w-6 h-6 md:w-7 md:h-7 text-white animate-pulse group-hover:scale-110 transition-transform" />
              <div className="absolute inset-0 bg-teal-400/20 rounded-full animate-ping" />
            </>
          )}
        </button>
        
        {/* Click to play hint */}
        {!isPlaying && (
          <div className="absolute -bottom-12 right-0 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-lg text-xs font-semibold text-gray-700 whitespace-nowrap animate-bounce">
            Click to play music 🎵
          </div>
        )}
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="relative flex flex-col items-center justify-center px-4 py-16 md:py-24 z-10 min-h-screen">

        {/* Hero Text */}
        <div className="max-w-5xl text-center mb-8 md:mb-12 animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-2xl mb-6">
            We Find The Best Tours For You
          </h1>
        </div>

        {/* Floating Icons + Center Image */}
        <div className="relative w-full max-w-2xl mx-auto mb-16 animate-fade-in-up-delay">

          {/* LEFT ICON */}
          <div className="absolute left-0 sm:-left-8 md:-left-12 top-1/2 -translate-y-1/2 w-14 h-14 sm:w-16 sm:h-16 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl animate-bounce-slow z-10">
            <MapPin className="w-7 h-7 text-teal-500" strokeWidth={2} />
          </div>

          {/* TOP ICON */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 w-14 h-14 sm:w-16 sm:h-16 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl animate-bounce-slow-delay z-10">
            <Users className="w-7 h-7 text-teal-500" strokeWidth={2} />
          </div>

          {/* RIGHT ICON */}
          <div className="absolute right-0 sm:-right-8 md:-right-12 top-1/2 -translate-y-1/2 w-14 h-14 sm:w-16 sm:h-16 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl animate-bounce-slow-delay-2 z-10">
            <Calendar className="w-7 h-7 text-teal-500" strokeWidth={2} />
          </div>
        </div>

        {/* ================= SEARCH BAR ================= */}
        <div className="w-full max-w-6xl px-4 animate-fade-in-up-delay-2">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-8 border border-white/40">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

              {/* Location */}
              <div className="space-y-2 pb-4 border-b sm:border-b-0 sm:border-r border-gray-300 sm:pr-4">
                <label className="flex items-center gap-2 text-sm font-bold text-teal-600">
                  <MapPin className="w-4 h-4" />
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

              {/* Guests */}
              <div className="space-y-2 pb-4 border-b sm:border-b-0 sm:border-r border-gray-300 sm:pr-4">
                <label className="flex items-center gap-2 text-sm font-bold text-teal-600">
                  <Users className="w-4 h-4" />
                  Guests
                </label>
                <input
                  type="text"
                  placeholder="How many Guests?"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full py-2 bg-transparent text-gray-700 focus:outline-none"
                />
              </div>

              {/* Date */}
              <div className="space-y-2 pb-4 border-b sm:border-b-0 lg:border-r border-gray-300 lg:pr-4">
                <label className="flex items-center gap-2 text-sm font-bold text-teal-600">
                  <Calendar className="w-4 h-4" />
                  Date
                </label>
                <input
                  type="text"
                  placeholder="Pick a date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => !e.target.value && (e.target.type = "text")}
                  className="w-full py-2 bg-transparent text-gray-700 focus:outline-none"
                />
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <button className="w-full px-8 py-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 text-gray-900 rounded-full font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                  Search
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Bottom White Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/40 to-transparent pointer-events-none"></div>

      {/* ================= CUSTOM ANIMATIONS ================= */}
      <style jsx>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes floating {
          0%, 100% { transform: translateY(0px); opacity: 0.6; }
          50% { transform: translateY(-40px); opacity: 1; }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, calc(-50% - 18px)) scale(1.1); }
        }

        .animate-floating {
          animation: floating linear infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out both;
        }
        .animate-fade-in-up-delay {
          animation: fade-in-up 1s ease-out 0.2s both;
        }
        .animate-fade-in-up-delay-2 {
          animation: fade-in-up 1s ease-out 0.4s both;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .animate-bounce-slow-delay {
          animation: bounce-slow 3s ease-in-out infinite 0.3s;
        }
        .animate-bounce-slow-delay-2 {
          animation: bounce-slow 3s ease-in-out infinite 0.6s;
        }
      `}</style>
    </div>
  );
}
