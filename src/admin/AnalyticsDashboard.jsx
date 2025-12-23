import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PackagesAnalyticsReport } from "../store/slices/packageSlice";
function StatCard({ title, value, gradient, icon }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-6 text-white shadow-lg bg-gradient-to-br ${gradient} transform transition-all hover:scale-105 hover:shadow-xl`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium opacity-90">{title}</p>
          <h2 className="text-4xl font-bold mt-3">{value}</h2>
        </div>
        <div className="opacity-20">{icon}</div>
      </div>
      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white opacity-10 rounded-full blur-2xl"></div>
    </div>
  );
}

function TripCard({ trip, index }) {
  const colors = [
    "from-blue-500 to-cyan-500",
    "from-purple-500 to-pink-500",
    "from-orange-500 to-red-500",
  ];

  return (
    <div className="group relative overflow-hidden rounded-xl bg-white border-2 border-gray-100 hover:border-transparent hover:shadow-lg transition-all">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${
          colors[index % 3]
        } opacity-0 group-hover:opacity-5 transition-opacity`}
      ></div>
      <div className="relative p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-500">{trip._id}</span>
          <div
            className={`w-2 h-2 rounded-full bg-gradient-to-r ${
              colors[index % 3]
            }`}
          ></div>
        </div>
        <p className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          {trip.totalPackages}
        </p>
        <p className="text-xs text-gray-400 mt-1">packages</p>
      </div>
    </div>
  );
}

export default function AnalyticsDashboard() {
  const dispatch = useDispatch();
  const { report, loading } = useSelector((state) => state.packages);
  console.log("report", report);

  useEffect(() => {
    dispatch(PackagesAnalyticsReport());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-lg font-semibold text-gray-600 mt-4">
            Loading Analytics...
          </p>
        </div>
      </div>
    );
  }

  const {
    totalPackages,
    statusStats = [],
    tripStats = [],
    countryWise = [],
    priceStats = {},
  } = report || {};

  const active = statusStats.find((s) => s._id === true)?.count || 0;
  const inactive = statusStats.find((s) => s._id === false)?.count || 0;

  // Custom SVG Icons
  const PackageIcon = () => (
    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20 7h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM10 4h4v3h-4V4zm10 16H4V9h16v11z" />
    </svg>
  );

  const ActiveIcon = () => (
    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
    </svg>
  );

  const InactiveIcon = () => (
    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm1-13h-2v6h2V7zm0 8h-2v2h2v-2z" />
    </svg>
  );

  const MoneyIcon = () => (
    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
      <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="p-8 space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
            Analytics Dashboard
          </h1>
          <p className="text-gray-500 text-lg">
            Comprehensive packages performance overview
          </p>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Packages"
            value={totalPackages}
            gradient="from-indigo-600 via-purple-600 to-purple-700"
            icon={<PackageIcon />}
          />
          <StatCard
            title="Active Packages"
            value={active}
            gradient="from-emerald-500 via-green-500 to-green-600"
            icon={<ActiveIcon />}
          />
          <StatCard
            title="Inactive Packages"
            value={inactive}
            gradient="from-rose-500 via-red-500 to-red-600"
            icon={<InactiveIcon />}
          />
          <StatCard
            title="Average Price"
            value={`₹ ${Math.round(priceStats.avgPrice || 0).toLocaleString()}`}
            gradient="from-amber-500 via-orange-500 to-orange-600"
            icon={<MoneyIcon />}
          />
        </div>

        {/* Trip Categories */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Trip Categories
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {tripStats.map((trip, idx) => (
              <TripCard key={idx} trip={trip} index={idx} />
            ))}
          </div>
        </div>

        {/* Country Wise */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Country-wise Distribution
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-200">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">
                    Country
                  </th>
                  <th className="py-4 px-6 text-right text-sm font-semibold text-gray-700">
                    Packages
                  </th>
                  <th className="py-4 px-6 text-right text-sm font-semibold text-gray-700">
                    Percentage
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {countryWise.map((c, idx) => {
                  const percentage = (
                    (c.totalPackages / totalPackages) *
                    100
                  ).toFixed(1);
                  return (
                    <tr
                      key={idx}
                      className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent transition-colors"
                    >
                      <td className="py-4 px-6 font-medium text-gray-800">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                          <span>{c._id}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right font-semibold text-gray-700">
                        {c.totalPackages}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                          {percentage}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Price Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StatCard
            title="Minimum Price"
            value={`₹ ${(priceStats.minPrice || 0).toLocaleString()}`}
            gradient="from-cyan-500 via-blue-500 to-blue-600"
            icon={<MoneyIcon />}
          />
          <StatCard
            title="Maximum Price"
            value={`₹ ${(priceStats.maxPrice || 0).toLocaleString()}`}
            gradient="from-pink-500 via-fuchsia-500 to-fuchsia-600"
            icon={<MoneyIcon />}
          />
          <StatCard
            title="Average Price"
            value={`₹ ${Math.round(priceStats.avgPrice || 0).toLocaleString()}`}
            gradient="from-lime-500 via-green-500 to-green-600"
            icon={<MoneyIcon />}
          />
        </div>
      </div>
    </div>
  );
}
