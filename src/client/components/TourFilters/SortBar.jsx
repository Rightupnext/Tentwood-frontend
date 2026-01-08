import React from "react";
import { MenuOutlined, AppstoreOutlined } from "@ant-design/icons";

export default function SortBar({
  filteredCount,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  resetFilters,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-slate-200/60 p-5 mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-slate-700">Sort by</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2.5 text-sm border-2 border-slate-200 rounded-xl focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 bg-white cursor-pointer font-medium text-slate-700 outline-none transition-all"
          >
            <option value="popularity">Popularity</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="duration-short">Duration: Short to Long</option>
            <option value="duration-long">Duration: Long to Short</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-600">
            {filteredCount} packages found
          </span>
          <button
            onClick={resetFilters}
            className="px-6 py-2.5 bg-gradient-to-r from-yellow-500 to-yellow-500 cursor-pointer text-white rounded-xl font-semibold text-sm hover:from-yellow-600 hover:to-yellow-600 active:scale-95 transition-all shadow-lg"
          >
            Reset All
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-all ${
                viewMode === "list"
                  ? "bg-teal-500 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <MenuOutlined />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-all ${
                viewMode === "grid"
                  ? "bg-teal-500 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <AppstoreOutlined />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
