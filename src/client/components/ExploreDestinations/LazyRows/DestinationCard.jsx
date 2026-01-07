import React, { memo, useState } from "react";
import { useNavigate } from "react-router-dom";

const DestinationCard = memo(function DestinationCard({ item }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const TRIP_ROUTE_MAP = {
    "India Trips": "india-trips",
    "International Trips": "international-trips",
    "Honeymoon Packages": "honeymoon-packages",
    "Group Tours": "group-tours",
  };

  const handleNavigate = () => {
    const category = item?.tripCategories?.[0];
    const tripPrefix = TRIP_ROUTE_MAP[category];
    if (!tripPrefix) return;

    navigate(
      `/${tripPrefix}/${encodeURIComponent(
        item?.countries || item?.Destination?.name
      )}`,
      { state: { id: item?._id } }
    );
  };

  return (
    <div
      className="w-72 h-56 shrink-0 relative !cursor-pointer group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg">
        <img
          loading="lazy"
          src={`${import.meta.env.VITE_BACKEND_URL}${item?.cardMedia?.fileUrl}`}
          alt={item?.packageTitle}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

        <div className="absolute bottom-0 p-4 text-white">
          <h3 className="text-xl font-bold">{item?.Destination?.name}</h3>
          <p className="text-sm opacity-80 ">{item.packageTitle}</p>

          <button
            onClick={handleNavigate}
            className={`mt-3 px-4 py-2 bg-white text-teal-600 rounded-full font-semibold transition cursor-pointer ${
              hovered ? "opacity-100" : "opacity-0"
            }`}
          >
            Explore →
          </button>
        </div>
      </div>
    </div>
  );
});

export default DestinationCard;
