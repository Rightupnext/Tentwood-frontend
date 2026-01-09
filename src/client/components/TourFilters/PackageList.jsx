import React from "react";
import { StarFilled, ClockCircleOutlined } from "@ant-design/icons";

export default function PackageList({ packages, viewMode, onNavigate }) {
  if (!packages.length) return null;

  return viewMode === "list" ? (
    <div className="space-y-5">
      {packages.map((pkg) => (
        <article
          key={pkg._id}
          className="bg-white rounded-2xl shadow-md border border-slate-200/60 overflow-hidden hover:shadow-xl hover:border-teal-200 transition-all duration-300 cursor-pointer group"
        >
          <div className="flex flex-col sm:flex-row">
            <div className="w-full sm:w-64 h-52 sm:h-auto relative flex-shrink-0 overflow-hidden">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}${
                  pkg.cardMedia?.fileUrl
                }`}
                alt={pkg.packageTitle}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-gradient-to-r from-yellow-500 to-yellow-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                {pkg.tripCategories}
              </span>
            </div>
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-teal-600 transition-colors">
                  {pkg.packageTitle}
                </h3>
                <div className="flex items-center gap-1.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarFilled
                      key={i}
                      className={`w-4 h-4 ${
                        i < 4
                          ? "!fill-amber-400 !text-amber-400"
                          : "!fill-slate-200 !text-slate-200"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-slate-600 ml-1 font-medium">
                    4.0 <span className="text-slate-400">(881)</span>
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {pkg.highlights?.slice(0, 3).map((h, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-teal-50 text-teal-600 text-xs rounded-full"
                    >
                      {h}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-5 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <ClockCircleOutlined className="text-teal-600" />
                    <span className="font-medium">{pkg.durationDays}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-end justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-teal-600">
                      ₹{pkg.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-slate-500">per person</span>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate(pkg)}
                  className="px-6 py-2.5 cursor-pointer bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-semibold text-sm hover:from-teal-600 hover:to-teal-700 active:scale-95 transition-all shadow-lg shadow-teal-500/30"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {packages.map((pkg) => (
        <article
          key={pkg._id}
          className="bg-white rounded-2xl shadow-md border border-slate-200/60 overflow-hidden hover:shadow-xl hover:border-teal-200 transition-all duration-300 cursor-pointer group"
        >
          <div className="relative h-56 overflow-hidden">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}${
                pkg.cardMedia?.fileUrl
              }`}
              alt={pkg.packageTitle}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <span className="absolute top-3 left-3 bg-gradient-to-r from-yellow-500 to-yellow-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              {pkg.tripCategories}
            </span>
          </div>
          <div className="p-5">
            <h3 className="text-base font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-teal-600 transition-colors">
              {pkg.packageTitle}
            </h3>
            <div className="flex items-center gap-1.5 mb-3">
              {[...Array(5)].map((_, i) => (
                <StarFilled
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < 4
                      ? "!fill-amber-400 !text-amber-400"
                      : "!fill-slate-200 !text-slate-200"
                  }`}
                />
              ))}
              <span className="text-xs text-slate-600 ml-1 font-medium">
                4.0
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {pkg.highlights?.slice(0, 2).map((h, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 bg-teal-50 text-teal-600 text-xs rounded-full"
                >
                  {h}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600 mb-4">
              <ClockCircleOutlined className="text-teal-600" />
              <span className="font-medium text-xs">{pkg.durationDays}</span>
            </div>
            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-baseline gap-1.5 mb-3">
                <span className="text-2xl font-bold text-teal-600">
                  ₹{pkg.price.toLocaleString()}
                </span>
                <span className="text-xs text-slate-500">per person</span>
              </div>
              <button
                onClick={() => onNavigate(pkg)}
                className="w-full py-2.5 cursor-pointer bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-semibold text-sm hover:from-teal-600 hover:to-teal-700 active:scale-95 transition-all shadow-lg shadow-teal-500/30"
              >
                View Details
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
