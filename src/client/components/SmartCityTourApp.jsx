import React, { useState, useEffect } from "react";
import smart1 from "../../assets/smartcity/city1.jpeg";
import smart2 from "../../assets/smartcity/city2.webp";
import smart3 from "../../assets/smartcity/city3.jpeg";
import { StarFilled, StarOutlined } from "@ant-design/icons";
const hotelsData = [
  {
    name: "Hotel Seagull Int.",
    location: "Cox's Bazar",
    rating: 4.8,
    reviews: 68,
    price: "$36",
    image: smart1,
    popular: true,
    badge: "NEARBY",
  },
  {
    name: "Ocean Paradise Hotel",
    location: "Cox's Bazar",
    rating: 4.7,
    reviews: 28,
    price: "$42",
    image: smart2,
    popular: false,
    badge: null,
  },
  {
    name: "The Seagull Hotel Int.",
    location: "Cox's Bazar",
    rating: 4.9,
    reviews: 46,
    price: "$45",
    image: smart3,
    popular: false,
    badge: null,
  },
];

const Icon = ({ type, size = "16", color = "currentColor" }) => {
  const paths = {
    smartphone:
      "M7 1C5.89543 1 5 1.89543 5 3V21C5 22.1046 5.89543 23 7 23H17C18.1046 23 19 22.1046 19 21V3C19 1.89543 18.1046 1 17 1H7ZM12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z",
    star: "M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z",
    mapPin:
      "M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 5.02944 7.02944 1 12 1C16.9706 1 21 5.02944 21 10Z M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z",
    heart:
      "M20.84 4.61C20.3292 4.099 19.7228 3.69365 19.0554 3.41708C18.3879 3.14052 17.6725 2.998 16.95 2.998C16.2275 2.998 15.5121 3.14052 14.8446 3.41708C14.1772 3.69365 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.57831 8.50903 2.99871 7.05 2.99871C5.59096 2.99871 4.19169 3.57831 3.16 4.61C2.1283 5.64169 1.54871 7.04097 1.54871 8.5C1.54871 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.452 9.22248 22.452 8.5C22.452 7.77752 22.3095 7.06211 22.0329 6.39468C21.7563 5.72725 21.351 5.12084 20.84 4.61Z",
    wifi: "M5 12.55C6.4 10.96 8.6 10 12 10C15.4 10 17.6 10.96 19 12.55M8 16C8.76 15.24 10.1 14.75 12 14.75C13.9 14.75 15.24 15.24 16 16M12 19.5C12.83 19.5 13.5 18.83 13.5 18C13.5 17.17 12.83 16.5 12 16.5C11.17 16.5 10.5 17.17 10.5 18C10.5 18.83 11.17 19.5 12 19.5Z M1 8.5C3.25 6.25 7.22 5 12 5C16.78 5 20.75 6.25 23 8.5",
    signal: "M5 11L5 21M9 9V21M13 6V21M17 3V21M21 1V21",
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={paths[type]} />
    </svg>
  );
};

const SmartCityTourApp = ({ packages }) => {
  const [activeHotel, setActiveHotel] = useState(0);
  const [imageLoaded, setImageLoaded] = useState({});
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHotel((prev) => (prev + 1) % hotelsData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const isLg = width >= 1024;
  const isSm = width >= 640;
  const [rating] = useState(() =>
    Number((Math.random() * (5 - 3.5) + 3.5).toFixed(1))
  );

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-800 to-cyan-500 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-purple-400/20 rounded-full blur-3xl top-10 -left-20 animate-pulse"
          style={{ animationDuration: "4s" }}
        />
        <div
          className="absolute w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl bottom-20 -right-20 animate-pulse"
          style={{ animationDuration: "5s" }}
        />
        <div
          className="absolute w-72 h-72 bg-pink-400/10 rounded-full blur-3xl top-1/2 left-1/2 animate-pulse"
          style={{ animationDuration: "6s" }}
        />
      </div>

      <div
        className="container mx-auto px-4 py-8 relative z-10"
        style={{ maxWidth: "1280px", paddingTop: isLg ? "4rem" : "2rem" }}
      >
        <div
          className="grid gap-8 items-center"
          style={{
            gridTemplateColumns: isLg ? "1fr 1fr" : "1fr",
            gap: isLg ? "4rem" : "2rem",
          }}
        >
          <div
            className="flex justify-center relative"
            style={{
              order: isLg ? 1 : 2,
              justifyContent: isLg ? "flex-start" : "center",
            }}
          >
            <div className="relative transform transition-all duration-700 hover:scale-105 w-full max-w-sm">
              <div className="relative w-full h-[620px] bg-gray-900 rounded-[3rem] shadow-2xl p-3 animate-float border-8 border-gray-800">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-30" />
                <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                  <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-r from-purple-600 to-cyan-500 flex items-center justify-between px-6 text-white text-xs z-20">
                    <span className="font-semibold">9:41</span>
                    <div className="flex gap-1.5 items-center">
                      <Icon type="signal" size="14" color="white" />
                      <Icon type="wifi" size="14" color="white" />
                      <div className="w-6 h-3 border-2 border-white rounded-sm relative">
                        <div className="absolute inset-0.5 bg-white rounded-sm" />
                      </div>
                    </div>
                  </div>
                  <div className="pt-10 px-4 pb-3 bg-gradient-to-r from-purple-600 to-cyan-500">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-white text-xl font-bold tracking-wide">
                        HOTELS
                      </h2>
                      <div className="w-10 h-10 bg-white/20 rounded-full backdrop-blur-sm flex items-center justify-center gap-1">
                        {[...Array(5)].map((_, idx) => {
                          // Full star
                          if (idx + 1 <= rating) {
                            return (
                              <StarFilled
                                key={idx}
                                className="w-4 h-4 !text-yellow-400"
                              />
                            );
                          }
                          // Half star (optional: use outlined slightly colored)
                          else if (idx + 0.5 <= rating) {
                            return (
                              <StarFilled
                                key={idx}
                                className="w-4 h-4 !text-yellow-200"
                              />
                            );
                          }
                          // Empty star
                          else {
                            return (
                              <StarOutlined
                                key={idx}
                                className="w-4 h-4 text-gray-300"
                              />
                            );
                          }
                        })}
                        <span className="ml-2 text-sm">{rating}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mb-3">
                      <button className="px-4 py-1.5 bg-white/20 text-white text-xs rounded-full backdrop-blur-sm">
                        SEARCH
                      </button>
                      <button className="px-4 py-1.5 bg-white text-cyan-600 text-xs rounded-full font-semibold shadow-lg transform scale-105">
                        NEARBY
                      </button>
                      <button className="px-4 py-1.5 bg-white/20 text-white text-xs rounded-full backdrop-blur-sm">
                        FAVORITES
                      </button>
                    </div>
                    <p className="text-white/90 text-xs font-medium">
                      30 HOTELS FOUND NEAR YOU
                    </p>
                  </div>
                  <div className="px-4 py-4 space-y-3 overflow-y-auto h-[490px] bg-gray-50">
                    {packages.map((hotel, idx) => (
                      <div
                        key={idx}
                        className={`bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 ${
                          activeHotel === idx
                            ? "ring-2 ring-cyan-400 scale-[1.02]"
                            : ""
                        }`}
                        style={{
                          animation: `slideUp 0.6s ease-out ${
                            idx * 0.15
                          }s both`,
                        }}
                      >
                        <div className="relative h-40 bg-gray-200 overflow-hidden">
                          {!imageLoaded[idx] && (
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
                          )}
                          <img
                            src={`${import.meta.env.VITE_BACKEND_URL}${
                              hotel?.cardMedia?.fileUrl
                            }`}
                            alt={hotel.packageTitle}
                           
                            onLoad={() =>
                              setImageLoaded((prev) => ({
                                ...prev,
                                [idx]: true,
                              }))
                            }
                            className={`w-full h-full object-cover transition-all duration-700 ${
                              imageLoaded[idx]
                                ? "opacity-100 scale-100"
                                : "opacity-0 scale-95"
                            }`}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                          {hotel.Destination?.trip && (
                            <div className="absolute top-2 left-2 bg-amber-400 text-white text-[10px] px-2 py-1 rounded-full font-bold animate-pulse shadow-lg">
                              {hotel?.Destination?.trip}
                            </div>
                          )}
                          <button className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform active:scale-95">
                            <Icon type="heart" size="16" color="#f87171" />
                          </button>
                          <div className="absolute bottom-2 right-2 bg-cyan-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                            {hotel.price}
                          </div>
                        </div>
                        <div className="p-3">
                          <h3 className="font-bold text-gray-800 text-sm mb-1.5">
                            {hotel.packageTitle}
                          </h3>
                          <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
                            <Icon type="mapPin" size="14" color="#06b6d4" />
                            <span>{hotel.locations}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-0.5">
                                {[...Array(5)].map((_, idx) => {
                                  // Full star
                                  if (idx + 1 <= rating) {
                                    return (
                                      <StarFilled
                                        key={idx}
                                        className="w-4 h-4 !text-yellow-400"
                                      />
                                    );
                                  }
                                  // Half star (optional: use outlined slightly colored)
                                  else if (idx + 0.5 <= rating) {
                                    return (
                                      <StarFilled
                                        key={idx}
                                        className="w-4 h-4 !text-yellow-200"
                                      />
                                    );
                                  }
                                  // Empty star
                                  else {
                                    return (
                                      <StarOutlined
                                        key={idx}
                                        className="w-4 h-4 text-gray-300"
                                      />
                                    );
                                  }
                                })}
                                <span className="ml-2 text-sm">{rating}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute -top-8 -right-8 w-20 h-20 bg-yellow-400 rounded-2xl shadow-2xl animate-bounce flex items-center justify-center text-3xl transform rotate-12">
                ⭐
              </div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-cyan-400 rounded-full shadow-2xl animate-pulse flex items-center justify-center">
                <Icon type="mapPin" size="32" color="white" />
              </div>
            </div>
          </div>
          <div className="text-white space-y-8" style={{ order: isLg ? 2 : 1 }}>
            <div className="space-y-4">
              <h1
                className="font-bold leading-tight"
                style={{
                  fontSize: isLg ? "3.75rem" : isSm ? "3rem" : "2.25rem",
                }}
              >
                Smart City Tour
                <br />
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent animate-gradient">
                  TentWood Mobile App
                </span>
              </h1>
              <p className="text-cyan-100 text-lg font-medium">
                Available on iOS & Android
              </p>
            </div>
            <p className="text-white/90 text-base leading-relaxed max-w-xl">
              TentWood Mobile App transforms the way you explore cities. From
              iconic landmarks to local secrets, enjoy curated tours, real-time
              navigation, and smart travel planning—all crafted to deliver a
              smooth, immersive travel experience wherever you go.
            </p>

            <div
              className="flex gap-4"
              style={{ flexDirection: isSm ? "row" : "column" }}
            >
              <button className="group bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-8 py-4 rounded-full font-bold text-sm flex items-center justify-center gap-3 shadow-2xl hover:shadow-yellow-400/50 transform hover:scale-105 active:scale-95 transition-all duration-300">
                <Icon type="smartphone" size="24" color="currentColor" />
                <div className="text-left">
                  <div className="text-xs opacity-80">Download For</div>
                  <div className="text-base font-bold">iOS</div>
                </div>
              </button>
              <button className="group bg-gradient-to-r from-green-400 to-cyan-400 text-gray-900 px-8 py-4 rounded-full font-bold text-sm flex items-center justify-center gap-3 shadow-2xl hover:shadow-cyan-400/50 transform hover:scale-105 active:scale-95 transition-all duration-300">
                <Icon type="smartphone" size="24" color="currentColor" />
                <div className="text-left">
                  <div className="text-xs opacity-80">Download For</div>
                  <div className="text-base font-bold">Android</div>
                </div>
              </button>
            </div>
            <div className="grid grid-cols-3 gap-6 pt-8">
              {[
                {
                  val: "50K+",
                  label: "Downloads",
                  grad: "from-yellow-400 to-orange-400",
                },
                {
                  val: "4.8★",
                  label: "Rating",
                  grad: "from-green-400 to-cyan-400",
                },
                {
                  val: "500+",
                  label: "Hotels",
                  grad: "from-pink-400 to-purple-400",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="text-center transform hover:scale-110 transition-transform duration-300"
                >
                  <div
                    className={`text-4xl font-bold bg-gradient-to-r ${stat.grad} bg-clip-text text-transparent`}
                  >
                    {stat.val}
                  </div>
                  <div className="text-white/80 text-xs mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SmartCityTourApp;
