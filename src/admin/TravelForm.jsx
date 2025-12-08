import React, { useState } from "react";

export default function TouristPackageCreator() {
  const [formData, setFormData] = useState({
    packageTitle: "",
    bannerImage: null,
    cardImage: null,
    pickup: "",
    drop: "",
    duration: "",
    locations: "",
    overview: "",
    highlights: [],
    itinerary: [],
    inclusions: [],
    exclusions: [],
    notes: [],
    travelEssentials: {
      mustCarry: [],
      gears: [],
      clothes: [],
      footwear: [],
      medication: [],
      personalAccessories: [],
    },
    price: "",
  });

  const [bannerPreview, setBannerPreview] = useState(null);
  const [cardPreview, setCardPreview] = useState(null);
  const [activeSection, setActiveSection] = useState("basic");

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "banner") {
          setBannerPreview(reader.result);
          setFormData((prev) => ({ ...prev, bannerImage: file }));
        } else {
          setCardPreview(reader.result);
          setFormData((prev) => ({ ...prev, cardImage: file }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const addArrayItem = (field, item = "") => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], item],
    }));
  };

  const updateArrayItem = (field, index, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const addItineraryDay = () => {
    addArrayItem("itinerary", {
      day: formData.itinerary.length + 1,
      title: "",
      activities: [""],
    });
  };

  const updateItinerary = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      itinerary: prev.itinerary.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addItineraryActivity = (dayIndex) => {
    setFormData((prev) => ({
      ...prev,
      itinerary: prev.itinerary.map((item, i) =>
        i === dayIndex
          ? { ...item, activities: [...item.activities, ""] }
          : item
      ),
    }));
  };

  const updateItineraryActivity = (dayIndex, actIndex, value) => {
    setFormData((prev) => ({
      ...prev,
      itinerary: prev.itinerary.map((item, i) =>
        i === dayIndex
          ? {
              ...item,
              activities: item.activities.map((act, j) =>
                j === actIndex ? value : act
              ),
            }
          : item
      ),
    }));
  };

  const removeItineraryActivity = (dayIndex, actIndex) => {
    setFormData((prev) => ({
      ...prev,
      itinerary: prev.itinerary.map((item, i) =>
        i === dayIndex
          ? {
              ...item,
              activities: item.activities.filter((_, j) => j !== actIndex),
            }
          : item
      ),
    }));
  };

  const updateTravelEssential = (category, index, value) => {
    setFormData((prev) => ({
      ...prev,
      travelEssentials: {
        ...prev.travelEssentials,
        [category]: prev.travelEssentials[category].map((item, i) =>
          i === index ? value : item
        ),
      },
    }));
  };

  const addTravelEssential = (category) => {
    setFormData((prev) => ({
      ...prev,
      travelEssentials: {
        ...prev.travelEssentials,
        [category]: [...prev.travelEssentials[category], ""],
      },
    }));
  };

  const removeTravelEssential = (category, index) => {
    setFormData((prev) => ({
      ...prev,
      travelEssentials: {
        ...prev.travelEssentials,
        [category]: prev.travelEssentials[category].filter(
          (_, i) => i !== index
        ),
      },
    }));
  };

  const handleSave = () => {
    console.log("Package Data:", formData);
    alert("Package saved successfully! Check console for data.");
  };

  const sections = [
    { id: "basic", label: "✨ Basic Info" },
    { id: "highlights", label: "⭐ Highlights" },
    { id: "itinerary", label: "📅 Itinerary" },
    { id: "inclusions", label: "✓ Inclusions" },
    { id: "essentials", label: "🎒 Essentials" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Create Tourist Package
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Design your perfect travel experience
              </p>
            </div>
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-semibold"
            >
              💾 Save Package
            </button>
          </div>
        </div>
      </div>

      <div className="flex max-w-7xl mx-auto">
        {/* Left Side - Form */}
        <div className="w-full p-6 overflow-y-auto h-screen">
          {/* Section Navigation */}
          <div className="bg-white rounded-2xl shadow-lg p-4 mb-6 sticky top-0 z-10">
            <div className="flex gap-2 overflow-x-auto">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${
                    activeSection === section.id
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </div>

          {/* Basic Information */}
          {activeSection === "basic" && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                  ✨ Basic Information
                </h2>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Package Title *
                    </label>
                    <input
                      type="text"
                      value={formData.packageTitle}
                      onChange={(e) =>
                        handleInputChange("packageTitle", e.target.value)
                      }
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                      placeholder="e.g., Fantastic Thailand Vacation"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Banner Image *
                      </label>
                      <div className="relative border-2 border-dashed border-purple-300 rounded-xl p-6 text-center bg-gradient-to-br from-purple-50 to-blue-50 hover:border-purple-500 transition-all duration-300 cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, "banner")}
                          className="hidden"
                          id="banner-upload"
                        />
                        <label
                          htmlFor="banner-upload"
                          className="cursor-pointer"
                        >
                          {bannerPreview ? (
                            <img
                              src={bannerPreview}
                              alt="Banner"
                              className="w-full h-32 object-cover rounded-lg"
                            />
                          ) : (
                            <>
                              <svg
                                className="mx-auto h-10 w-10 text-purple-400 mb-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                              <span className="text-sm text-gray-600">
                                Upload Banner
                              </span>
                            </>
                          )}
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Card Image *
                      </label>
                      <div className="relative border-2 border-dashed border-blue-300 rounded-xl p-6 text-center bg-gradient-to-br from-blue-50 to-purple-50 hover:border-blue-500 transition-all duration-300 cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, "card")}
                          className="hidden"
                          id="card-upload"
                        />
                        <label htmlFor="card-upload" className="cursor-pointer">
                          {cardPreview ? (
                            <img
                              src={cardPreview}
                              alt="Card"
                              className="w-full h-32 object-cover rounded-lg"
                            />
                          ) : (
                            <>
                              <svg
                                className="mx-auto h-10 w-10 text-blue-400 mb-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                              <span className="text-sm text-gray-600">
                                Upload Card
                              </span>
                            </>
                          )}
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        📍 Pickup Location
                      </label>
                      <input
                        type="text"
                        value={formData.pickup}
                        onChange={(e) =>
                          handleInputChange("pickup", e.target.value)
                        }
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., Phuket Airport"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        📍 Drop Location
                      </label>
                      <input
                        type="text"
                        value={formData.drop}
                        onChange={(e) =>
                          handleInputChange("drop", e.target.value)
                        }
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="e.g., Phuket Airport"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        ⏱️ Duration
                      </label>
                      <input
                        type="text"
                        value={formData.duration}
                        onChange={(e) =>
                          handleInputChange("duration", e.target.value)
                        }
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="e.g., 6N - 7D"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        💰 Price (₹)
                      </label>
                      <input
                        type="text"
                        value={formData.price}
                        onChange={(e) =>
                          handleInputChange("price", e.target.value)
                        }
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="e.g., 74,999"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      🌍 Locations Covered
                    </label>
                    <input
                      type="text"
                      value={formData.locations}
                      onChange={(e) =>
                        handleInputChange("locations", e.target.value)
                      }
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="e.g., Phuket - Krabi - Koh Phangan"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      📝 Overview
                    </label>
                    <textarea
                      value={formData.overview}
                      onChange={(e) =>
                        handleInputChange("overview", e.target.value)
                      }
                      rows="6"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Describe the package overview..."
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Highlights */}
          {activeSection === "highlights" && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                ⭐ Highlights
              </h2>
              <div className="space-y-3">
                {formData.highlights.map((highlight, index) => (
                  <div key={index} className="flex gap-3 group">
                    <input
                      type="text"
                      value={highlight}
                      onChange={(e) =>
                        updateArrayItem("highlights", index, e.target.value)
                      }
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="Enter highlight"
                    />
                    <button
                      onClick={() => removeArrayItem("highlights", index)}
                      className="px-4 py-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-all duration-300 opacity-0 group-hover:opacity-100"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addArrayItem("highlights", "")}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-semibold"
                >
                  ➕ Add Highlight
                </button>
              </div>
            </div>
          )}

          {/* Itinerary */}
          {activeSection === "itinerary" && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                  📅 Itinerary
                </h2>
                <div className="space-y-4">
                  {formData.itinerary.map((day, dayIndex) => (
                    <div
                      key={dayIndex}
                      className="border-2 border-blue-100 rounded-xl p-5 bg-gradient-to-br from-blue-50 to-indigo-50 hover:border-blue-300 transition-all duration-300"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                            {day.day}
                          </div>
                          <h3 className="font-bold text-gray-700">
                            Day {day.day}
                          </h3>
                        </div>
                        <button
                          onClick={() => removeArrayItem("itinerary", dayIndex)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-100 p-2 rounded-lg transition-all duration-300"
                        >
                          🗑️
                        </button>
                      </div>
                      <input
                        type="text"
                        value={day.title}
                        onChange={(e) =>
                          updateItinerary(dayIndex, "title", e.target.value)
                        }
                        className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                        placeholder="Day title"
                      />

                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-gray-600 mb-2">
                          Activities:
                        </p>
                        {day.activities.map((activity, actIndex) => (
                          <div key={actIndex} className="flex gap-2">
                            <textarea
                              value={activity}
                              onChange={(e) =>
                                updateItineraryActivity(
                                  dayIndex,
                                  actIndex,
                                  e.target.value
                                )
                              }
                              rows="2"
                              className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                              placeholder="Activity description"
                            />
                            <button
                              onClick={() =>
                                removeItineraryActivity(dayIndex, actIndex)
                              }
                              className="px-3 py-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-all duration-300"
                            >
                              ✖️
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => addItineraryActivity(dayIndex)}
                          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                        >
                          + Add Activity
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={addItineraryDay}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-semibold"
                  >
                    ➕ Add Day
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Inclusions & Exclusions */}
          {activeSection === "inclusions" && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                  ✅ Inclusions
                </h2>
                <div className="space-y-3">
                  {formData.inclusions.map((inclusion, index) => (
                    <div key={index} className="flex gap-3 group">
                      <input
                        type="text"
                        value={inclusion}
                        onChange={(e) =>
                          updateArrayItem("inclusions", index, e.target.value)
                        }
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Enter inclusion"
                      />
                      <button
                        onClick={() => removeArrayItem("inclusions", index)}
                        className="px-4 py-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-all duration-300 opacity-0 group-hover:opacity-100"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addArrayItem("inclusions", "")}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-semibold"
                  >
                    ➕ Add Inclusion
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                  ❌ Exclusions
                </h2>
                <div className="space-y-3">
                  {formData.exclusions.map((exclusion, index) => (
                    <div key={index} className="flex gap-3 group">
                      <input
                        type="text"
                        value={exclusion}
                        onChange={(e) =>
                          updateArrayItem("exclusions", index, e.target.value)
                        }
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Enter exclusion"
                      />
                      <button
                        onClick={() => removeArrayItem("exclusions", index)}
                        className="px-4 py-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-all duration-300 opacity-0 group-hover:opacity-100"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addArrayItem("exclusions", "")}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-400 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-semibold"
                  >
                    ➕ Add Exclusion
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                  ⚠️ Important Notes
                </h2>
                <div className="space-y-3">
                  {formData.notes.map((note, index) => (
                    <div key={index} className="flex gap-3 group">
                      <input
                        type="text"
                        value={note}
                        onChange={(e) =>
                          updateArrayItem("notes", index, e.target.value)
                        }
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Enter note"
                      />
                      <button
                        onClick={() => removeArrayItem("notes", index)}
                        className="px-4 py-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-all duration-300 opacity-0 group-hover:opacity-100"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addArrayItem("notes", "")}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-semibold"
                  >
                    ➕ Add Note
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Travel Essentials */}
          {activeSection === "essentials" && (
            <div className="space-y-4">
              {Object.entries(formData.travelEssentials).map(
                ([category, items]) => (
                  <div
                    key={category}
                    className="bg-white rounded-2xl shadow-lg p-6"
                  >
                    <h3 className="text-lg font-bold text-gray-800 mb-4 capitalize">
                      🎒 {category.replace(/([A-Z])/g, " $1").trim()}
                    </h3>
                    <div className="space-y-3">
                      {items.map((item, index) => (
                        <div key={index} className="flex gap-3 group">
                          <input
                            type="text"
                            value={item}
                            onChange={(e) =>
                              updateTravelEssential(
                                category,
                                index,
                                e.target.value
                              )
                            }
                            className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            placeholder={`Enter ${category} item`}
                          />
                          <button
                            onClick={() =>
                              removeTravelEssential(category, index)
                            }
                            className="px-4 py-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-all duration-300 opacity-0 group-hover:opacity-100"
                          >
                            🗑️
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => addTravelEssential(category)}
                        className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        + Add Item
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
