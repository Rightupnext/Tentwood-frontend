import React, { useState } from "react";

export default function TourPackageDetail() {
  const [activeTab, setActiveTab] = useState("overview");
  const [fromDate, setFromDate] = useState("10/12/2021");
  const [toDate, setToDate] = useState("10/12/2021");
  const [adults, setAdults] = useState(2);

  const tabs = [
    { id: "overview", label: "Overview & Highlights" },
    { id: "itinerary", label: "Itinerary" },
    { id: "inclusions", label: "Inclusions" },
    { id: "exclusions", label: "Exclusions" },
    { id: "other", label: "Other Info" },
  ];

  const itinerary = [
    {
      day: 1,
      title: "Arrival in Venice - Half Day City Tour",
      description:
        "Upon arrival at Venice airport, meet our representative who will escort you to your hotel. Check in and freshen up. Later, proceed for a half-day city tour of Venice.",
    },
    {
      day: 2,
      title: "Arrival in Venice - Half Day City Tour",
      description:
        "Upon arrival at Venice airport, meet our representative who will escort you to your hotel. Check in and freshen up. Later, proceed for a half-day city tour of Venice.",
    },
    {
      day: 3,
      title: "Arrival in Venice - Half Day City Tour",
      description:
        "Upon arrival at Venice airport, meet our representative who will escort you to your hotel. Check in and freshen up. Later, proceed for a half-day city tour of Venice.",
    },
    {
      day: 4,
      title: "Arrival in Venice - Half Day City Tour",
      description:
        "Upon arrival at Venice airport, meet our representative who will escort you to your hotel. Check in and freshen up. Later, proceed for a half-day city tour of Venice.",
    },
  ];

  const inclusions = [
    "All transport according to itinerary",
    "All entry fees to monuments & museums",
    "Boat ride alongside River Thames",
    "Trip along to the Shard",
    "6 nights stay",
    "6 Breakfast",
  ];

  const exclusions = [
    "Airfare / Train fare",
    "Personal expenses",
    "Any meals not mentioned in the inclusions",
    "Anything not mentioned in the inclusions",
  ];

  const healthPrecautions = [
    "All transport according to itinerary",
    "All entry fees to monuments & museums",
    "You must have would allow you to visit or use facilities",
    "The number of visitors for Staying as value is already",
  ];

  const otherInfo = [
    "Museum Sunday excluded on every Tuesdays/sunday (except double decker bus)",
    "Boat trip alongside River Thames",
    "Trip along to the Shard",
    "6 nights stay",
    "Visit the Birthplace of Shakespeare",
    "Visit to Windermere - Wales",
    "Return to the Pickup point (Big Bus and sip the Milkson of champagne)",
  ];

  const images = [
    "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400",
    "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?w=400",
    "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=400",
    "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400",
    "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400",
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title Section */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Vintage Double Decker Bus Tour & Thames River Cruise
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <span>📍</span>
                  <span>Westminster</span>
                </div>
              </div>
            </div>

            {/* Location Info */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">📍</span>
                  <span className="text-gray-700">
                    Pick Up: International Airport | Big Ben- International
                    Airport
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">🕐</span>
                  <span className="text-gray-700">
                    Duration: <span className="font-semibold">6N - 7D</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Main Image */}
            <div className="relative h-96 rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800"
                alt="Tour"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Image Gallery */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {images.map((img, index) => (
                <div
                  key={index}
                  className="relative h-24 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition"
                >
                  <img
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="flex overflow-x-auto border-b">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition ${
                      activeTab === tab.id
                        ? "text-teal-600 border-b-2 border-teal-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {/* Overview & Highlights */}
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-4">
                        Overview & Highlights
                      </h2>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {[
                          "Boat",
                          "Bus Long Tour",
                          "Hotel",
                          "Rio Taxi",
                          "Sea way",
                          "Rio de Ribio",
                          "Big Deals",
                          "Top Spots",
                        ].map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        Discover London with a 24-hour hop-on, hop-off bus
                        ticket that includes a one-way River Thames cruise.
                        Explore the city at your own pace aboard an open-top
                        double-decker bus, hopping on and off at key locations
                        including Big Ben, the Tower of London, Westminster
                        Abbey, the London Eye, Tower Bridge, Buckingham Palace,
                        the Shard, and the Houses of Parliament. You can also
                        use your Thames River Pass to cruise down the River
                        Thames to the Tower of London and back. With commentary,
                        or see the city illuminated at night. Upgrade your
                        ticket for a 48- or 72-hour pass to make the most of
                        your tour.
                      </p>
                    </div>
                    <button className="text-teal-600 font-medium">
                      Read More
                    </button>
                  </div>
                )}

                {/* Itinerary */}
                {activeTab === "itinerary" && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                      Itinerary
                    </h2>
                    {itinerary.map((item) => (
                      <div
                        key={item.day}
                        className="border border-teal-200 rounded-lg overflow-hidden"
                      >
                        <button className="w-full flex items-center justify-between p-4 bg-teal-50 hover:bg-teal-100 transition">
                          <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-10 h-10 bg-teal-600 text-white rounded-full font-bold">
                              {item.day}
                            </span>
                            <span className="font-semibold text-gray-900">
                              Day {item.day}
                            </span>
                            <span className="text-gray-700">{item.title}</span>
                          </div>
                          <svg
                            className="w-5 h-5 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Inclusions */}
                {activeTab === "inclusions" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-4">
                        Inclusions
                      </h2>
                      <ul className="space-y-2">
                        {inclusions.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-gray-700"
                          >
                            <span className="text-green-600 mt-1">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-3">
                        Health Precautions
                      </h3>
                      <ul className="space-y-2">
                        {healthPrecautions.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-sm text-gray-700"
                          >
                            <span className="text-green-600 mt-1">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Exclusions */}
                {activeTab === "exclusions" && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                      Exclusions
                    </h2>
                    <ul className="space-y-2">
                      {exclusions.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-gray-700"
                        >
                          <span className="text-red-600 mt-1">✗</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 bg-red-50 p-4 rounded-lg">
                      <ul className="space-y-2">
                        {exclusions.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-sm text-gray-700"
                          >
                            <span className="text-red-600 mt-1">✗</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Other Info */}
                {activeTab === "other" && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                      Other Info
                    </h2>
                    <ul className="space-y-2">
                      {otherInfo.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-gray-700"
                        >
                          <span className="text-teal-600 mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <div className="mb-6">
                <div className="text-sm text-gray-600 mb-1">
                  Priced against 4/5 to Person For Tour
                </div>
                <div className="text-3xl font-bold text-gray-900">₹72,000</div>
                <div className="text-sm text-gray-600">
                  ₹74,999{" "}
                  <span className="text-green-600 font-medium">Per Person</span>
                </div>
              </div>

              <button className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-lg transition mb-6">
                CONFIRM BOOKING
              </button>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Booking
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    From
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                    <span className="absolute right-3 top-2.5 text-gray-400">
                      📅
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    To
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                    <span className="absolute right-3 top-2.5 text-gray-400">
                      📅
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    No. Of Guest
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                    <option>2 adults</option>
                    <option>1 adult</option>
                    <option>3 adults</option>
                    <option>4 adults</option>
                  </select>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between items-center text-lg">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="font-bold text-teal-600">₹72,000</span>
                </div>
              </div>

              <button className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-lg transition">
                CONFIRM BOOKING
              </button>

              <div className="mt-6 text-center">
                <button className="text-yellow-600 font-semibold text-lg">
                  ⭐ Download Itinerary
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
