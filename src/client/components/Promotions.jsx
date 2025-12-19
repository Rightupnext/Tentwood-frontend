import React, { useState, useEffect } from "react";
import { ArrowRight, MousePointer, Percent, Users } from "lucide-react";
import Vintage from "../components/Vintagedouble";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import {
  fetchPackageById,
  fetchRelatedPackageById,
} from "../../store/slices/packageSlice";

export default function TravelPackagesSingle() {
  const [isVisible, setIsVisible] = useState(false);
  const { slug } = useParams();
  const location = useLocation();
  const packageId = location.state?.id;
  console.log("packageId", packageId);
  const dispatch = useDispatch();

  const { selected, loading } = useSelector((state) => state.packages);
  console.log("selected", selected?.matchedData);

  useEffect(() => {
    dispatch(fetchRelatedPackageById({ id: packageId }));
  }, [dispatch, packageId]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // FeatureCard merged inside component
  const FeatureCard = ({ icon, title, description, gradient, delay }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => setShow(true), 80);
      return () => clearTimeout(timer);
    }, []);

    return (
      <div
        className={`flex items-start gap-5 transition-all duration-700 ${
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ transitionDelay: delay }}
      >
        <div
          className={`w-16 h-16 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 hover:rotate-6 will-change-transform`}
        >
          {icon}
        </div>

        <div>
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
            {title}
          </h3>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
      </div>
    );
  };

  return (
    <>
      <Vintage selected={selected} />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Package Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Phuket Package */}
            <div
              className={`relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 hover:scale-105 hover:-translate-y-3 cursor-pointer ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                background: "linear-gradient(135deg,#667eea,#764ba2)",
                transitionDelay: "0ms",
              }}
            >
              <div className="absolute top-0 right-0 w-full h-full opacity-30">
                <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-radial animate-spin-slow" />
              </div>

              <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row justify-between items-start">
                <div>
                  <span className="text-white/90 text-xl md:text-2xl font-light italic animate-slide-in-left">
                    Eid Special Offer
                  </span>

                  <h2
                    className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-lg animate-slide-in-left"
                    style={{ animationDelay: "100ms" }}
                  >
                    PHUKET ISLAND
                  </h2>

                  <div
                    className="inline-block bg-white/25 backdrop-blur-md px-6 py-2 rounded-full mb-6 animate-slide-in-left"
                    style={{ animationDelay: "200ms" }}
                  >
                    <span className="text-white font-semibold text-sm">
                      04 Days, 03 Nights
                    </span>
                  </div>
                </div>

                {/* Price Box */}
                <div
                  className="ml-0 md:ml-8 mb-6 md:mb-0 inline-block bg-white/15 backdrop-blur-lg border-2 border-white/30 rounded-2xl p-6 animate-scale-in"
                  style={{ animationDelay: "300ms" }}
                >
                  <div className="text-white/90 text-sm mb-1">
                    → Total Price ←
                  </div>
                  <div className="text-white text-4xl md:text-5xl font-black leading-none mb-1 drop-shadow-lg">
                    $299
                  </div>
                  <div className="text-white/90 text-sm">
                    → Per Person Only ←
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="absolute right-4 md:right-8 bottom-4 md:bottom-8 w-60 md:w-80 h-40 md:h-60 rounded-2xl overflow-hidden shadow-2xl animate-float will-change-transform">
                <img
                  src="https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&q=70"
                  alt="Phuket Beach"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            {/* Egypt Package */}
            <div
              className={`relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 hover:scale-105 hover:-translate-y-3 cursor-pointer ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                background: "linear-gradient(135deg,#f093fb,#f5576c)",
                transitionDelay: "200ms",
              }}
            >
              <div className="absolute top-0 right-0 w-full h-full opacity-30">
                <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-radial animate-spin-slow" />
              </div>

              <div className="absolute top-6 md:top-8 right-6 md:right-8 z-20 bg-yellow-400 text-black px-5 py-3 rounded-2xl shadow-lg animate-pulse-scale">
                <div className="text-center font-black text-lg md:text-xl leading-tight">
                  04
                  <br />
                  Days
                </div>
              </div>

              <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row justify-between items-start">
                <div>
                  <span className="text-white/90 text-xl md:text-2xl font-light italic animate-slide-in-left">
                    Christmas Offer
                  </span>

                  <h2
                    className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-lg animate-slide-in-left"
                    style={{ animationDelay: "100ms" }}
                  >
                    EGYPT PACKAGE
                  </h2>
                </div>

                {/* Price Box */}
                <div
                  className="ml-0 md:ml-8 inline-block bg-white/15 backdrop-blur-lg border-2 border-white/30 rounded-2xl p-6 animate-scale-in"
                  style={{ animationDelay: "300ms" }}
                >
                  <div className="text-white/90 text-sm mb-1">
                    → Total Price ←
                  </div>
                  <div className="text-white text-4xl md:text-5xl font-black leading-none mb-1 drop-shadow-lg">
                    $399
                  </div>
                  <div className="text-white/90 text-sm">
                    → Per Person Only ←
                  </div>
                </div>
              </div>

              {/* Image */}
              <div
                className="absolute right-4 md:right-8 bottom-4 md:bottom-8 w-60 md:w-80 h-40 md:h-60 rounded-2xl overflow-hidden shadow-2xl animate-float will-change-transform"
                style={{ animationDelay: "1s" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&q=70"
                  alt="Egypt Pyramids"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>

          {/* Features */}
          <div
            className={`bg-white/90 backdrop-blur-xl rounded-3xl p-8 md:p-16 shadow-2xl transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4 md:mb-0">
                To Go Your Desire Place <br />
                Through our{" "}
                <span className="text-purple-600 relative inline-block">
                  Tentwood
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-purple-800 rounded"></span>
                </span>
              </h2>

              <a
                href="#"
                className="flex items-center gap-2 text-purple-600 font-semibold text-lg hover:gap-4 transition-all duration-300 group"
              >
                View All Package.
                <ArrowRight
                  className="group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <FeatureCard
                icon={<MousePointer size={28} className="text-white" />}
                title="One Click Booking"
                description="You can hassle-free and fast tour & travel package booking by GoFly."
                gradient="from-teal-500 to-green-400"
                delay="0ms"
              />

              <FeatureCard
                icon={<Percent size={28} className="text-white" />}
                title="Deals & Discounts"
                description="Agencies have special discounts on flights, hotels, & packages."
                gradient="from-pink-500 to-red-500"
                delay="200ms"
              />

              <FeatureCard
                icon={<Users size={28} className="text-white" />}
                title="Local Guidance"
                description="Travel agencies have experienced professionals guidance."
                gradient="from-blue-400 to-cyan-400"
                delay="400ms"
              />
            </div>
          </div>
        </div>

        {/* Keyframes */}
        <style jsx>{`
          @keyframes slide-in-left {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          @keyframes scale-in {
            from {
              opacity: 0;
              transform: scale(0.8);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          @keyframes float {
            0%,
            100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }
          @keyframes pulse-scale {
            0%,
            100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
          }
          @keyframes spin-slow {
            from {
              transform: rotate(0);
            }
            to {
              transform: rotate(360deg);
            }
          }

          .animate-slide-in-left {
            animation: slide-in-left 0.6s ease-out both;
          }
          .animate-scale-in {
            animation: scale-in 0.6s ease-out both;
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          .animate-pulse-scale {
            animation: pulse-scale 2s ease-in-out infinite;
          }
          .animate-spin-slow {
            animation: spin-slow 20s linear infinite;
          }
          .bg-gradient-radial {
            background: radial-gradient(
              circle,
              rgba(255, 255, 255, 0.2),
              transparent 70%
            );
          }
        `}</style>
      </div>
    </>
  );
}
