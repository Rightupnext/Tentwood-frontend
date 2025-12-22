import React, { useState, useEffect } from "react";

import {
  LeftOutlined,
  RightOutlined,
  StarFilled,
  CommentOutlined,
  TeamOutlined,
  GlobalOutlined,
  StarOutlined,
  RiseOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import test1 from "../../assets/test/test1.jpg";
import test2 from "../../assets/test/test1.jpg";
import test3 from "../../assets/test/test3.jpg";
import test4 from "../../assets/test/test4.jpg";
import test5 from "../../assets/test/test5.jpg";
export default function Testimonials() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [direction, setDirection] = useState("right");

  useEffect(() => {
    setLoaded(true);
  }, []);

  const testimonials = [
    {
      name: "Robert Kcarery",
      role: "XTrip Traveler",
      image: test1,
      rating: 5,
      title: "Excellent Tourist Place!",
      text: "I had the most amazing trip of my life! Everything, including the guided excursions and the airport pickup, was meticulously organized. The itinerary was well-balanced, and the accommodations were excellent.",
    },
    {
      name: "Sarah Mitchell",
      role: "Adventure Seeker",
      image: test2,
      rating: 5,
      title: "Unforgettable Experience!",
      text: "From start to finish, this was a dream vacation! The attention to detail was incredible, and every moment was perfectly planned. The local guides were knowledgeable and friendly. Highly recommend!",
    },
    {
      name: "Michael Chen",
      role: "Family Traveler",
      image: test3,
      rating: 5,
      title: "Perfect Family Vacation!",
      text: "Traveling with kids can be challenging, but this trip was smooth and enjoyable for everyone. The activities were family-friendly, and the accommodations were spacious and comfortable. Will definitely book again!",
    },
  ];

  const floatingAvatars = [test1, test2, test3, test4, test5];

  const nextTestimonial = () => {
    setDirection("right");
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection("left");
    setActiveTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-12 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <style>{`
@keyframes float{0%,100%{transform:translateY(0px) rotate(0deg)}50%{transform:translateY(-25px) rotate(3deg)}}
@keyframes float-reverse{0%,100%{transform:translateY(0px) rotate(0deg)}50%{transform:translateY(25px) rotate(-3deg)}}
@keyframes pulse-glow{0%,100%{box-shadow:0 0 30px rgba(60,173,155,0.6),0 0 60px rgba(60,173,155,0.4)}50%{box-shadow:0 0 50px rgba(60,173,155,0.8),0 0 100px rgba(60,173,155,0.6)}}
@keyframes slideInUp{from{opacity:0;transform:translateY(60px)}to{opacity:1;transform:translateY(0)}}
@keyframes slideInDown{from{opacity:0;transform:translateY(-60px)}to{opacity:1;transform:translateY(0)}}
@keyframes slideInLeft{from{opacity:0;transform:translateX(-60px)}to{opacity:1;transform:translateX(0)}}
@keyframes slideInRight{from{opacity:0;transform:translateX(60px)}to{opacity:1;transform:translateX(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes scaleIn{from{opacity:0;transform:scale(0.8)}to{opacity:1;transform:scale(1)}}
@keyframes scaleInBounce{0%{opacity:0;transform:scale(0.3)}50%{transform:scale(1.1)}100%{opacity:1;transform:scale(1)}}
@keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}
@keyframes rotate{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes borderGlow{0%,100%{border-color:rgba(60,173,155,0.3)}50%{border-color:rgba(60,173,155,0.8)}}
@keyframes ripple{0%{transform:scale(0.8);opacity:1}100%{transform:scale(2.5);opacity:0}}
@keyframes slideContent{from{opacity:0;transform:translateX(${
        direction === "right" ? "50px" : "-50px"
      })}to{opacity:1;transform:translateX(0)}}

.animate-float{animation:float 6s ease-in-out infinite}
.animate-float-reverse{animation:float-reverse 5s ease-in-out infinite}
.animate-pulse-glow{animation:pulse-glow 3s ease-in-out infinite}
.animate-slideInUp{animation:slideInUp 0.8s cubic-bezier(0.25,0.46,0.45,0.94) both}
.animate-slideInDown{animation:slideInDown 0.8s cubic-bezier(0.25,0.46,0.45,0.94) both}
.animate-slideInLeft{animation:slideInLeft 0.8s cubic-bezier(0.25,0.46,0.45,0.94) both}
.animate-slideInRight{animation:slideInRight 0.8s cubic-bezier(0.25,0.46,0.45,0.94) both}
.animate-fadeIn{animation:fadeIn 1s ease-out both}
.animate-scaleIn{animation:scaleIn 0.8s cubic-bezier(0.25,0.46,0.45,0.94) both}
.animate-scaleInBounce{animation:scaleInBounce 0.8s cubic-bezier(0.68,-0.55,0.265,1.55) both}
.animate-rotate{animation:rotate 20s linear infinite}
.animate-borderGlow{animation:borderGlow 2s ease-in-out infinite}
.animate-slideContent{animation:slideContent 0.6s cubic-bezier(0.25,0.46,0.45,0.94) both}
`}</style>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#3CAD9B] rounded-full mix-blend-screen filter blur-3xl animate-float"></div>
        <div className="absolute top-40 right-10 w-80 h-80 bg-[#3CAD9B] rounded-full mix-blend-screen filter blur-3xl animate-float-reverse"></div>
        <div
          className="absolute bottom-20 left-1/3 w-64 h-64 bg-[#3CAD9B] rounded-full mix-blend-screen filter blur-3xl animate-float"
          style={{ animationDelay: "3s" }}
        ></div>
        <div
          className="absolute bottom-40 right-1/4 w-96 h-96 bg-[#3CAD9B] rounded-full mix-blend-screen filter blur-3xl animate-float-reverse"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(60,173,155,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(60,173,155,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      {/* Breadcrumb */}
      <div
        className={`max-w-7xl mx-auto mb-6 sm:mb-10 ${
          loaded ? "animate-slideInDown" : "opacity-0"
        }`}
      >
        <div className="flex items-center gap-2 text-sm sm:text-base text-gray-400">
          <span className="hover:text-[#3CAD9B] transition-colors duration-300 cursor-pointer transform hover:scale-105 inline-block">
            Home
          </span>
          <span className="text-[#3CAD9B]">/</span>
          <span className="text-white font-semibold">Testimonials</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Side - Floating Avatars */}
          <div
            className={`relative h-[400px] sm:h-[500px] lg:h-[600px] ${
              loaded ? "animate-scaleInBounce" : "opacity-0"
            }`}
          >
            {/* Rotating Ring */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] border-2 border-[#3CAD9B]/20 rounded-full animate-rotate"></div>

            {/* Main Center Avatar */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="relative group">
                {/* Ripple Effect */}
                <div
                  className="absolute inset-0 bg-[#3CAD9B] rounded-full opacity-30"
                  style={{ animation: "ripple 2s ease-out infinite" }}
                ></div>
                <div
                  className="absolute inset-0 bg-[#3CAD9B] rounded-full opacity-30"
                  style={{ animation: "ripple 2s ease-out 1s infinite" }}
                ></div>

                <div className="absolute inset-0 bg-gradient-to-r from-[#3CAD9B] to-[#2d9b8a] rounded-full blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-glow"></div>
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-[#3CAD9B] shadow-2xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 animate-borderGlow">
                  <img
                    src={testimonials[activeTestimonial].image}
                    alt="Main traveler"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                {/* Verified Badge */}
                <div className="absolute -bottom-2 -right-2 bg-[#3CAD9B] p-2 rounded-full shadow-lg transform group-hover:scale-125 transition-transform duration-300">
                  <TrophyOutlined className="!w-5 !h-5 !sm:w-6 !sm:h-6 !text-white" />
                </div>
              </div>
            </div>

            {/* Floating Avatars */}
            {floatingAvatars.map((avatar, idx) => {
              const positions = [
                "top-8 left-8",
                "top-4 right-12",
                "top-1/3 left-4",
                "bottom-20 right-8",
                "bottom-8 left-16",
              ];
              const delays = ["0s", "0.8s", "1.6s", "2.4s", "3.2s"];
              return (
                <div
                  key={idx}
                  className={`absolute ${positions[idx]} animate-float z-10`}
                  style={{ animationDelay: delays[idx] }}
                >
                  <div className="relative group">
                    <div className="absolute inset-0 bg-[#3CAD9B] rounded-full blur-lg opacity-40 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-[#3CAD9B]/50 shadow-xl transform group-hover:scale-125 group-hover:-rotate-6 transition-all duration-300 cursor-pointer">
                      <img
                        src={avatar}
                        alt={`Traveler ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Customer Count Badge */}
            <div
              className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-slideInUp"
              style={{ animationDelay: "0.8s" }}
            >
              <div className="bg-black/90 backdrop-blur-xl rounded-2xl px-4 sm:px-6 py-3 sm:py-4 shadow-2xl border-2 border-[#3CAD9B] hover:scale-110 hover:border-[#3CAD9B] transition-all duration-300 animate-pulse-glow">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {floatingAvatars.slice(0, 4).map((avatar, idx) => (
                      <div
                        key={idx}
                        className="w-7 h-7 sm:w-9 sm:h-9 rounded-full border-2 border-[#3CAD9B] overflow-hidden"
                      >
                        <img
                          src={avatar}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-base sm:text-lg font-black text-[#3CAD9B]">
                      4k+ Customer
                    </p>
                    <p className="text-xs sm:text-sm text-gray-400 font-semibold">
                      in Worldwide.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Icons */}
            <div
              className="absolute top-12 right-4 sm:right-8 animate-float z-10"
              style={{ animationDelay: "1.5s" }}
            >
              <div className="bg-gradient-to-br from-[#3CAD9B] to-[#2d9b8a] rounded-2xl p-3 sm:p-4 shadow-2xl transform hover:scale-125 hover:rotate-12 transition-all duration-300 border border-[#3CAD9B]">
                <GlobalOutlined className="!w-5 !h-5 !text-4xl !text-white" />
              </div>
            </div>

            <div
              className="absolute bottom-1/3 left-2 sm:left-4 animate-float-reverse z-10"
              style={{ animationDelay: "2.5s" }}
            >
              <div className="bg-gradient-to-br from-[#3CAD9B] to-[#2d9b8a] rounded-2xl p-3 sm:p-4 shadow-2xl transform hover:scale-125 hover:-rotate-12 transition-all duration-300 border border-[#3CAD9B]">
                <StarOutlined className="!w-5 !h-5 !sm:w-7  !sm:h-7 !text-white" />
              </div>
            </div>

            <div
              className="absolute top-1/3 right-8 sm:right-12 animate-float z-10"
              style={{ animationDelay: "3.5s" }}
            >
              <div className="bg-gradient-to-br from-[#3CAD9B] to-[#2d9b8a] rounded-2xl p-3 sm:p-4 shadow-2xl transform hover:scale-125 hover:rotate-12 transition-all duration-300 border border-[#3CAD9B]">
                <RiseOutlined className="!w-5 !h-5 !sm:w-7 !sm:h-7 !text-white" />
              </div>
            </div>
          </div>

          {/* Right Side - Testimonial Content */}
          <div className={`${loaded ? "animate-slideInRight" : "opacity-0"}`}>
            <div className="mb-6 sm:mb-8">
              <div className="inline-flex items-center gap-2 bg-[#3CAD9B]/20 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full border-2 border-[#3CAD9B]/50 mb-4 sm:mb-6 hover:scale-110 hover:border-[#3CAD9B] transition-all duration-300 animate-pulse-glow">
                <TeamOutlined className="!w-4 !h-4 !sm:w-5 !sm:h-5 !text-[#3CAD9B]" />
                <span className="text-xs sm:text-sm font-bold text-white tracking-wider">
                  TESTIMONIALS
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6 leading-tight">
                Hear It from{" "}
                <span className="text-[#3CAD9B] relative inline-block">
                  Travelers
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#3CAD9B] to-transparent rounded-full"></div>
                </span>
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed max-w-xl">
                We go beyond just booking trips—we create unforgettable travel
                experiences that match your dreams!
              </p>
            </div>

            {/* Testimonial Card */}
            <div
              key={activeTestimonial}
              className="bg-gradient-to-br from-black to-gray-900 backdrop-blur-xl rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl border-2 border-[#3CAD9B]/30 relative overflow-hidden group hover:shadow-[0_20px_80px_-15px_rgba(60,173,155,0.6)] hover:border-[#3CAD9B] transition-all duration-500 animate-slideContent"
            >
              {/* Shimmer Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-[#3CAD9B]/20 to-transparent"
                  style={{ animation: "shimmer 2s infinite" }}
                ></div>
              </div>
              {/* Quote Icon */}
              <div className="absolute top-4 sm:top-6 right-4 sm:right-6 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                <CommentOutlined className="!w-16 !h-16 !sm:w-20 !sm:h-20 !md:w-24 !md:h-24 !text-[#3CAD9B]" />
              </div>
              {/* 
              {/* Stars */}
              <div className="flex gap-1 mb-4 sm:mb-6 relative z-10">
                {[...Array(testimonials[activeTestimonial].rating)].map(
                  (_, i) => (
                    <div
                      key={i}
                      className="transform hover:scale-125 hover:rotate-12 transition-all duration-300"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      <StarFilled className="!w-5 !h-5 !sm:w-6 !sm:h-6 !fill-[#3CAD9B] !text-[#3CAD9B] !drop-shadow-lg" />
                    </div>
                  )
                )}
              </div>{" "}
              */}
              {/* Title */}
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 relative z-10 hover:text-[#3CAD9B] transition-colors duration-300">
                {testimonials[activeTestimonial].title}
              </h3>
              {/* Review Text */}
              <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed mb-6 sm:mb-8 relative z-10">
                {testimonials[activeTestimonial].text}
              </p>
              {/* Author Info */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="relative group/avatar">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#3CAD9B] to-[#2d9b8a] rounded-full blur-lg opacity-50 group-hover/avatar:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-[#3CAD9B] shadow-lg transform group-hover/avatar:scale-125 group-hover/avatar:rotate-6 transition-all duration-300">
                      <img
                        src={testimonials[activeTestimonial].image}
                        alt={testimonials[activeTestimonial].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-base sm:text-lg text-white hover:text-[#3CAD9B] transition-colors duration-300">
                      {testimonials[activeTestimonial].name}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-400 font-medium">
                      {testimonials[activeTestimonial].role}
                    </p>
                  </div>
                </div>

                {/* Navigation Arrows */}
                <div className="flex gap-2 sm:gap-3">
                  <button
                    onClick={prevTestimonial}
                    className="bg-gradient-to-r from-[#3CAD9B] to-[#2d9b8a] hover:from-[#2d9b8a] hover:to-[#3CAD9B] text-white p-2 sm:p-3 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-125 hover:-rotate-6 active:scale-95 transition-all duration-300 border border-[#3CAD9B]"
                  >
                    <LeftOutlined className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="bg-gradient-to-r from-[#3CAD9B] to-[#2d9b8a] hover:from-[#2d9b8a] hover:to-[#3CAD9B] text-white p-2 sm:p-3 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-125 hover:rotate-6 active:scale-95 transition-all duration-300 border border-[#3CAD9B]"
                  >
                    <RightOutlined className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
              {/* Progress Dots */}
              <div className="flex gap-2 justify-center mt-6 sm:mt-8 relative z-10">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setDirection(idx > activeTestimonial ? "right" : "left");
                      setActiveTestimonial(idx);
                    }}
                    className={`h-2 rounded-full transition-all duration-500 transform hover:scale-125 ${
                      idx === activeTestimonial
                        ? "w-8 sm:w-12 bg-gradient-to-r from-[#3CAD9B] to-[#2d9b8a] shadow-lg"
                        : "w-2 bg-gray-600 hover:bg-[#3CAD9B]"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
