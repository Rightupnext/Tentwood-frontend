// src/client/components/TourFilters/EmptyState.jsx
import React from "react";

export default function EmptyState({ resetFilters }) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-slate-200/60 p-12 text-center">
      <div className="text-6xl mb-4">🔍</div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">
        No packages found
      </h3>
      <p className="text-slate-600 mb-6">
        Try adjusting your filters to see more results
      </p>
      <button
        onClick={resetFilters}
        className="px-6 py-3 bg-teal-500 text-white rounded-xl font-semibold hover:bg-teal-600 transition-all"
      >
        Reset All Filters
      </button>
    </div>
  );
}
