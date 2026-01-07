import React, { useState, useEffect } from "react";
import HotelCard from "./HotelCard";

export default function HotelCarousel({ packages }) {
  const [activeHotel, setActiveHotel] = useState(0);
  const [imageLoaded, setImageLoaded] = useState({});
  const [rating] = useState(() => Number((Math.random() * (5 - 3.5) + 3.5).toFixed(1)));

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHotel((prev) => (prev + 1) % packages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [packages.length]);

  return (
    <div className="px-4 py-4 space-y-3 overflow-y-auto h-[490px] bg-gray-50">
      {packages.map((hotel, idx) => (
        <HotelCard
          key={idx}
          hotel={hotel}
          idx={idx}
          activeHotel={activeHotel}
          setImageLoaded={setImageLoaded}
          imageLoaded={imageLoaded}
          rating={rating}
        />
      ))}
    </div>
  );
}
