import React from "react";
import { CloseCircleOutlined } from "@ant-design/icons";

export default function ActiveFilters({
  selectedCategories,
  selectedDestinations,
  selectedHighlights,
  toggleFilter,
}) {
  const hasFilters =
    selectedCategories.length ||
    selectedDestinations.length ||
    selectedHighlights.length;

  if (!hasFilters) return null;

  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-200/60 p-4 mb-6">
      <div className="flex flex-wrap gap-2">
        {selectedCategories.map((cat) => (
          <span
            key={cat}
            className="inline-flex items-center gap-1 px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-medium"
          >
            {cat}
            <button
              onClick={() =>
                toggleFilter(cat, selectedCategories, toggleFilter)
              }
            >
              <CloseCircleOutlined className="text-xs" />
            </button>
          </span>
        ))}
        {selectedDestinations.map((dest) => (
          <span
            key={dest}
            className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
          >
            {dest}
            <button
              onClick={() =>
                toggleFilter(dest, selectedDestinations, toggleFilter)
              }
            >
              <CloseCircleOutlined className="text-xs" />
            </button>
          </span>
        ))}
        {selectedHighlights.map((h) => (
          <span
            key={h}
            className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium"
          >
            {h}
            <button
              onClick={() => toggleFilter(h, selectedHighlights, toggleFilter)}
            >
              <CloseCircleOutlined className="text-xs" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
