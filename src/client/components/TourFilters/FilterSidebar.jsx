import React from "react";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";

export default function FilterSidebar({
  categories,
  destinations,
  allHighlights,
  selectedCategories,
  setSelectedCategories,
  selectedDestinations,
  setSelectedDestinations,
  selectedHighlights,
  setSelectedHighlights,
  selectedPrice,
  setSelectedPrice,
  selectedDuration,
  setSelectedDuration,
  categoryOpen,
  setCategoryOpen,
  destOpen,
  setDestOpen,
  highlightsOpen,
  setHighlightsOpen,
  durationOpen,
  setDurationOpen,
  toggleFilter,
  maxPrice,
  searchQuery,
  setSearchQuery,
}) {
  return (
    <aside className="w-full lg:w-80 flex-shrink-0">
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 overflow-hidden lg:sticky lg:top-6">
        {/* Search */}
        <div className="p-6 border-b border-slate-100">
          <div className="relative">
            <SearchOutlined className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search packages, destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all text-sm"
            />
          </div>
        </div>

        {/* Price */}
        <div className="p-6 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 mb-5 text-base">
            Price Range
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-slate-600">Budget</span>
              <span className="text-lg font-bold text-teal-600">
                ₹{selectedPrice.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={maxPrice}
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #14b8a6 0%, #14b8a6 ${
                  (selectedPrice / maxPrice) * 100
                }%, #e2e8f0 ${
                  (selectedPrice / maxPrice) * 100
                }%, #e2e8f0 100%)`,
              }}
            />
            <div className="flex justify-between text-xs text-slate-500">
              <span>₹0</span>
              <span>₹{maxPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Duration */}
        <div className="p-6 border-b border-slate-100">
          <button
            className="w-full flex items-center justify-between mb-4 group"
            onClick={() => setDurationOpen(!durationOpen)}
          >
            <h3 className="font-bold text-slate-900 text-base">
              Duration (Nights)
            </h3>
            <DownOutlined
              className={`text-slate-500 transition-transform duration-300 ${
                durationOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {durationOpen && (
            <div className="space-y-4">
              <div className="flex gap-3">
                {["3-5", "6-9", "10+"].map((range) => (
                  <button
                    key={range}
                    onClick={() => {
                      if (range === "3-5") setSelectedDuration([3, 5]);
                      else if (range === "6-9") setSelectedDuration([6, 9]);
                      else setSelectedDuration([10, 20]);
                    }}
                    className="flex-1 px-3 py-2 text-xs font-medium border-2 border-slate-200 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition-all"
                  >
                    {range}D
                  </button>
                ))}
              </div>
              <div className="text-sm text-slate-600">
                {selectedDuration[0]} - {selectedDuration[1]} nights
              </div>
            </div>
          )}
        </div>

        {/* Categories */}
        <div className="p-6 border-b border-slate-100">
          <button
            className="w-full flex items-center justify-between mb-4 group"
            onClick={() => setCategoryOpen(!categoryOpen)}
          >
            <h3 className="font-bold text-slate-900 text-base">
              Trip Categories
            </h3>
            <DownOutlined
              className={`text-slate-500 transition-transform duration-300 ${
                categoryOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {categoryOpen && (
            <div className="space-y-2.5">
              {categories.map((cat) => (
                <label
                  key={cat}
                  className="flex items-center text-sm text-slate-700 cursor-pointer hover:text-slate-900 group py-1"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleFilter(cat, setSelectedCategories)}
                    className="w-4 h-4 mr-3 text-teal-600 border-2 border-slate-300 rounded focus:ring-2 focus:ring-teal-500/30 cursor-pointer"
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Destinations */}
        <div className="p-6 border-b border-slate-100">
          <button
            className="w-full flex items-center justify-between mb-4 group"
            onClick={() => setDestOpen(!destOpen)}
          >
            <h3 className="font-bold text-slate-900 text-base">Destinations</h3>
            <DownOutlined
              className={`text-slate-500 transition-transform duration-300 ${
                destOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {destOpen && (
            <div className="space-y-2.5">
              {destinations.map((dest) => (
                <label
                  key={dest._id}
                  className="flex items-center text-sm text-slate-700 cursor-pointer hover:text-slate-900 group py-1"
                >
                  <input
                    type="checkbox"
                    checked={selectedDestinations.includes(dest._id)}
                    onChange={() =>
                      toggleFilter(dest._id, setSelectedDestinations)
                    }
                    className="w-4 h-4 mr-3 text-teal-600 border-2 border-slate-300 rounded focus:ring-2 focus:ring-teal-500/30 cursor-pointer"
                  />
                  <span>{dest.name}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Highlights */}
        <div className="p-6">
          <button
            className="w-full flex items-center justify-between mb-4 group"
            onClick={() => setHighlightsOpen(!highlightsOpen)}
          >
            <h3 className="font-bold text-slate-900 text-base">Highlights</h3>
            <DownOutlined
              className={`text-slate-500 transition-transform duration-300 ${
                highlightsOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {highlightsOpen && (
            <div className="space-y-2.5 max-h-60 overflow-y-auto">
              {allHighlights.map((highlight) => (
                <label
                  key={highlight}
                  className="flex items-center text-sm text-slate-700 cursor-pointer hover:text-slate-900 group py-1"
                >
                  <input
                    type="checkbox"
                    checked={selectedHighlights.includes(highlight)}
                    onChange={() =>
                      toggleFilter(highlight, setSelectedHighlights)
                    }
                    className="w-4 h-4 mr-3 text-teal-600 border-2 border-slate-300 rounded focus:ring-2 focus:ring-teal-500/30 cursor-pointer"
                  />
                  <span>{highlight}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
