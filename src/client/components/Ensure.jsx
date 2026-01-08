import React from "react";
import {
  CheckCircleFilled,
  TrophyOutlined,
  CustomerServiceOutlined,
  StarFilled,
  ArrowRightOutlined,
} from "@ant-design/icons";

export default function TrustSection() {
  const ratingCount = 24000;

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
      {/* Background blobs */}
      <div className="absolute top-10 left-10 w-48 h-48 sm:w-64 sm:h-64 bg-blue-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-56 h-56 sm:w-80 sm:h-80 bg-purple-200/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900">
            Ensure Trust & Reliability.
          </h2>
        </div>

        {/* Feature cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 mb-10 sm:mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3"
            >
              <div
                className={`absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl`}
              />
              <div>
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 ${feature.iconBg} rounded-xl sm:rounded-2xl mb-5 sm:mb-6 shadow-lg`}
                >
                  {feature.icon}
                </div>

                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 leading-tight">
                  {feature.title}
                </h3>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 leading-tight mb-3">
                  {feature.subtitle}
                </h3>

                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Rating section */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 text-center sm:text-left flex-1">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <StarFilled
                    key={i}
                    style={{ fontSize: 20 }}
                    className="!fill-green-500 !text-green-500"
                  />
                ))}
              </div>

              <span className="text-sm sm:text-base md:text-lg font-bold text-gray-900">
                5.0 Rating out of 5.0 based on{" "}
                {ratingCount.toLocaleString()} reviews.
              </span>

              <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-green-50 to-teal-50 rounded-full border border-green-200">
                <StarFilled
                  style={{ fontSize: 16 }}
                  className="!fill-green-500 !text-green-500"
                />
                <span className="font-bold text-green-700 text-xs sm:text-sm">
                  Trustpilot
                </span>
              </div>
            </div>

            <button className="group flex items-center gap-2 px-6 md:px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 text-sm sm:text-base">
              Customize Package
              <ArrowRightOutlined className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
