import React, { useState, useEffect } from "react";
import { ArrowRightOutlined } from "@ant-design/icons";
import aboutimg from '../assets/about1.jpg'
import TrustSection from "../client/components/Ensure";
import FAQ from "../client/components/FAQ";

export default function AboutUs() {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    tours: 0,
    experience: 0,
    travelers: 0,
    retention: 0,
  });

  useEffect(() => {
    setIsVisible(true);

    // Animated counters
    const duration = 2000;
    const intervals = [];

    const animateCount = (key, target, suffix = "") => {
      const steps = 60;
      const increment = target / steps;
      let current = 0;

      const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCounts((prev) => ({ ...prev, [key]: target + suffix }));
          clearInterval(interval);
        } else {
          setCounts((prev) => ({
            ...prev,
            [key]: Math.floor(current) + suffix,
          }));
        }
      }, duration / steps);

      intervals.push(interval);
    };

    setTimeout(() => {
      animateCount("tours", 26, "K+");
      animateCount("experience", 12, "+");
      animateCount("travelers", 20, "K+");
      animateCount("retention", 98, "%");
    }, 800);

    return () => intervals.forEach(clearInterval);
  }, []);

  const stats = [
    {
      icon: "🎯",
      label: "Tour Completed",
      value: counts.tours,
      bg: "from-purple-100 to-blue-100",
      color: "text-purple-600",
    },
    {
      icon: "🏔️",
      label: "Travel Experience",
      value: counts.experience,
      bg: "from-pink-100 to-orange-100",
      color: "text-orange-600",
    },
    {
      icon: "✈️",
      label: "Happy Traveler",
      value: counts.travelers,
      bg: "from-green-100 to-teal-100",
      color: "text-teal-600",
    },
    {
      icon: "🎖️",
      label: "Retention Rate",
      value: counts.retention,
      bg: "from-blue-100 to-cyan-100",
      color: "text-cyan-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-16 px-4 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 opacity-20">
        <svg viewBox="0 0 100 100" className="animate-float">
          <path
            d="M50,10 L60,40 L90,40 L65,60 L75,90 L50,70 L25,90 L35,60 L10,40 L40,40 Z"
            fill="none"
            stroke="#667eea"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
        </svg>
      </div>

      <div className="absolute top-10 right-20 w-40 h-40 opacity-20">
        <svg viewBox="0 0 200 200" className="animate-spin-slow">
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="#f093fb"
            strokeWidth="2"
            strokeDasharray="10,10"
          />
        </svg>
      </div>

      <div className="absolute bottom-40 left-1/4 w-24 h-24 opacity-20">
        <svg viewBox="0 0 100 100" className="animate-bounce-slow">
          <rect
            x="20"
            y="20"
            width="60"
            height="60"
            rx="10"
            fill="none"
            stroke="#06b6d4"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Breadcrumb */}
        <div
          className={`text-sm text-gray-600 mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <span className="font-medium">About US</span> /{" "}
          <span className="text-gray-400">Home/About</span>
        </div>

        {/* Animated plane path */}
        <div className="absolute top-0 left-0 w-full h-32 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 1000 100">
            <path
              d="M0,50 Q250,20 500,50 T1000,50"
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="2"
              strokeDasharray="5,5"
              opacity="0.3"
            />
          </svg>
          <div className="absolute top-8 left-0 animate-fly-across">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="#667eea">
              <path d="M21,16v-2l-8-5V3.5C13,2.67,12.33,2,11.5,2S10,2.67,10,3.5V9l-8,5v2l8-2.5V19l-2,1.5V22l3.5-1l3.5,1v-1.5L13,19v-5.5L21,16z" />
            </svg>
          </div>
        </div>

        {/* Main heading */}
        <div
          className={`text-center mb-20 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <h1 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 bg-clip-text text-transparent animate-gradient">
            Tentwood Trips
          </h1>
        </div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Left content */}
          <div
            className={`space-y-6 transition-all duration-1000 delay-400 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-black leading-tight">
              Your Trustpoint,{" "}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Tentwood Trips
              </span>
              <br />
              Best for Travel Agency.
            </h2>

            <p className="text-gray-600 leading-relaxed text-lg">
              ⛰️Trip Travel Agency is a trusted name in the travel industry,
              offering seamless travel planning, personalized itineraries, and
              unforgettable adventures. With years of experience and a network
              of global partners, we ensure a hassle-free and memorable journey
              for every traveler.
            </p>

            <p className="text-gray-600 leading-relaxed">
              It's your ultimate gateway to thrilling travel experiences,
              specializing in adventure tourism, paragliding tours, and mountain
              expeditions. Whether you seek breathtaking sky-high journeys,
              serene nature escapes, or cultural explorations, we craft
              tailor-made itineraries to fuel your wanderlust.
            </p>

            <div className="flex items-center gap-6 pt-4">
              <button className="group relative px-8 py-4 bg-black text-white rounded-full font-bold overflow-hidden hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl">
                <span className="relative z-10 flex items-center gap-2">
                  About More Gofly
                  <ArrowRightOutlined
                    style={{ fontSize: 25 }}
                    className="!group-hover:translate-x-1 !transition-transform"
                  />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>

              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  <div className="w-12 h-12 rounded-full border-2 border-white bg-gradient-to-br from-purple-400 to-pink-400"></div>
                  <div className="w-12 h-12 rounded-full border-2 border-white bg-gradient-to-br from-blue-400 to-cyan-400"></div>
                  <div className="w-12 h-12 rounded-full border-2 border-white bg-gradient-to-br from-orange-400 to-red-400"></div>
                </div>
                <div className="text-sm font-semibold">
                  <div className="text-gray-900">170+ Customer</div>
                  <div className="text-gray-500">in Worldwide.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right image with badge */}
          <div
            className={`relative transition-all duration-1000 delay-600 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            }`}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
              <img
                src={aboutimg}
                alt="World Map Travel"
                className="w-full h-[500px] object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            {/* Experience badge */}
            <div className="absolute -bottom-6 -right-6 animate-float">
              <div className="relative">
                <svg width="200" height="200" viewBox="0 0 200 200">
                  <defs>
                    <linearGradient
                      id="hexGrad"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#0f766e" />
                      <stop offset="100%" stopColor="#0d9488" />
                    </linearGradient>
                  </defs>
                  <polygon
                    points="100,10 173,50 173,150 100,190 27,150 27,50"
                    fill="url(#hexGrad)"
                    stroke="#fff"
                    strokeWidth="4"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <div className="text-6xl font-black">8+</div>
                  <div className="text-sm font-semibold text-center">
                    Years of
                    <br />
                    Experience
                  </div>
                </div>
              </div>
            </div>

            {/* Luggage decoration */}
            <div className="absolute -bottom-8 right-32 animate-bounce-slow">
              <div className="text-6xl">🧳</div>
            </div>
          </div>
        </div>

        {/* Stats circles */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`relative transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${800 + i * 200}ms` }}
            >
              <div
                className={`group relative aspect-square rounded-full bg-gradient-to-br ${stat.bg} p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer`}
              >
                <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity blur-xl"></div>
                <div className="relative h-full flex flex-col items-center justify-center text-center">
                  <div className="text-5xl mb-3 animate-bounce-slow">
                    {stat.icon}
                  </div>
                  <div className="text-sm font-semibold text-gray-700 mb-2">
                    {stat.label}
                  </div>
                  <div className={`text-4xl font-black ${stat.color}`}>
                    {stat.value}
                  </div>
                </div>

                {/* Rotating border */}
                <svg
                  className="absolute inset-0 w-full h-full animate-spin-slow"
                  style={{ animationDuration: "10s" }}
                >
                  <circle
                    cx="50%"
                    cy="50%"
                    r="48%"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray="10,10"
                    className="text-gray-300 opacity-50"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes fly-across {
          0% {
            transform: translateX(0) translateY(0);
          }
          100% {
            transform: translateX(1000px) translateY(-20px);
          }
        }
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-fly-across {
          animation: fly-across 15s linear infinite;
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 4s ease infinite;
        }
      `}</style>
      <TrustSection />
      <FAQ />
    </div>
  );
}
