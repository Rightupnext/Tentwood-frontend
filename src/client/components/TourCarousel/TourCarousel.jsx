import React, { useState, useRef, useEffect } from "react";
import Section from "./Section";

export default function TourCarousel({ Title1, Title2, internationalTrips, indiaTrips }) {
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
    <div className="min-h-screen bg-gradient-to-b from-[#ffffff] via-[#ffffff] to-[#ffffff] p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Section title={Title1} tours={internationalTrips || []} refEl={r1} sc={sc1} setSc={setSc1} idx={0} />
        <Section title={Title2} tours={indiaTrips || []} refEl={r2} sc={sc2} setSc={setSc2} idx={1} />
      </div>
    </div>
  );
}
