import React, { useState, useEffect } from "react";
import {
  CheckCircleFilled,
  TrophyOutlined,
  CustomerServiceOutlined,
  StarFilled,
  ArrowRightOutlined,
} from "@ant-design/icons";

export default function TrustSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [ratingCount, setRatingCount] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    let count = 0;
    const target = 24000;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      count += increment;
      if (count >= target) {
        setRatingCount(target);
        clearInterval(timer);
      } else {
        setRatingCount(Math.floor(count));
      }
    }, 16);
    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: (
        <CheckCircleFilled
          style={{ fontSize: 48 }}
          className="!text-blue-500"
        />
      ),
      title: "100% Verified &",
      subtitle: "Safe Adventures",
      description:
        "We prioritize your safety and ensure that every adventure meets the highest standards.",
      color: "from-blue-500 to-cyan-500",
      iconBg: "bg-blue-100",
    },
    {
      icon: (
        <TrophyOutlined style={{ fontSize: 48 }} className="!text-purple-500" />
      ),
      title: "Certified &",
      subtitle: "Experienced Guides",
      description:
        "We prioritize your safety and ensure that every adventure meets the highest standards.",
      color: "from-purple-500 to-pink-500",
      iconBg: "bg-purple-100",
    },
    {
      icon: (
        <CustomerServiceOutlined
          style={{ fontSize: 48 }}
          className="!text-cyan-500"
        />
      ),
      title: "24/7 Customer",
      subtitle: "Supports",
      description:
        "We prioritize your safety and ensure that every adventure meets the highest standards.",
      color: "from-cyan-500 to-blue-500",
      iconBg: "bg-cyan-100",
    },
  ];

  return (
    <div className="relative bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 py-12 sm:py-16 md:py-20 px-4 overflow-hidden">
      <div className="absolute top-10 left-10 w-48 h-48 sm:w-64 sm:h-64 bg-blue-200/20 rounded-full blur-3xl animate-pulse-slow"></div>
      <div
        className="absolute bottom-10 right-10 w-56 h-56 sm:w-80 sm:h-80 bg-purple-200/20 rounded-full blur-3xl animate-pulse-slow"
        style={{ animationDelay: "1s" }}
      ></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div
          className={`text-center mb-10 sm:mb-12 md:mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-2">
            Ensure Trust & Reliability.
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 mb-10 sm:mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-3 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
            >
              <div
                className={`absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl`}
              ></div>
              <div className="relative">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 ${feature.iconBg} rounded-xl sm:rounded-2xl mb-5 sm:mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}
                >
                  <div className="transform group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                </div>
                <div className="mb-3 sm:mb-4">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 leading-tight mb-1">
                    {feature.title}
                  </h3>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 leading-tight">
                    {feature.subtitle}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  {feature.description}
                </p>
                <div className="absolute top-0 right-0 w-3 h-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-ping"></div>
              </div>
            </div>
          ))}
        </div>
        <div
          className={`bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 md:p-8 transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 text-center sm:text-left flex-1">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="animate-scale-in"
                    style={{ animationDelay: `${800 + i * 100}ms` }}
                  >
                    <StarFilled
                      style={{ fontSize: 20 }}
                      className="sm:w-6 sm:h-6 !fill-green-500 !text-green-500"
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <span className="text-sm sm:text-base md:text-lg font-bold text-gray-900">
                  5.0 Rating out of 5.0 based on {ratingCount.toLocaleString()}{" "}
                  reviews.
                </span>
                <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-green-50 to-teal-50 rounded-full border border-green-200">
                  <StarFilled
                    style={{ fontSize: 16 }}
                    className="sm:w-[18px] sm:h-[18px] !fill-green-500 !text-green-500"
                  />
                  <span className="font-bold text-green-700 text-xs sm:text-sm">
                    Trustpilot
                  </span>
                </div>
              </div>
            </div>
            <button className="group flex items-center gap-2 px-6 md:px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 whitespace-nowrap text-sm sm:text-base">
              Customize Package
              <ArrowRightOutlined
                style={{ fontSize: 18 }}
                className="sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>
        <div className="absolute -bottom-10 left-0 right-0 opacity-5 pointer-events-none">
          <svg viewBox="0 0 1200 200" className="w-full">
            <path
              d="M0,100 Q150,80 300,100 T600,100 T900,100 T1200,100"
              stroke="#3b82f6"
              strokeWidth="2"
              fill="none"
              strokeDasharray="10,5"
            />
            <path
              d="M0,120 Q200,140 400,120 T800,120 T1200,120"
              stroke="#8b5cf6"
              strokeWidth="2"
              fill="none"
              strokeDasharray="10,5"
            />
          </svg>
        </div>
      </div>
      <style>{`
        @keyframes pulse-slow{0%,100%{opacity:0.3;transform:scale(1)}50%{opacity:0.2;transform:scale(1.05)}}
        @keyframes scale-in{from{opacity:0;transform:scale(0)}to{opacity:1;transform:scale(1)}}
        .animate-pulse-slow{animation:pulse-slow 6s ease-in-out infinite}
        .animate-scale-in{animation:scale-in 0.5s ease-out forwards;opacity:0}
      `}</style>
    </div>
  );
}
