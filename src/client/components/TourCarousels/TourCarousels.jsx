import React, { useState, useRef, useEffect } from "react";
import Section from "../TourCarousel/Section";

export default function TourCarousels({
  Title4,
  Title3,
  honeymoonTrips,
  GroupTrips,
}) {
  const [sc1, setSc1] = useState(0);
  const [sc2, setSc2] = useState(0);
  const r1 = useRef(null);
  const r2 = useRef(null);

  useEffect(() => {
    const onResize = () => {
      setSc1(r1.current?.scrollLeft || 0);
      setSc2(r2.current?.scrollLeft || 0);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Section
          title={Title3}
          tours={GroupTrips || []}
          refEl={r1}
          sc={sc1}
          setSc={setSc1}
          idx={0}
        />
        <Section
          title={Title4}
          tours={honeymoonTrips || []}
          refEl={r2}
          sc={sc2}
          setSc={setSc2}
          idx={1}
        />
      </div>
    </div>
  );
}
