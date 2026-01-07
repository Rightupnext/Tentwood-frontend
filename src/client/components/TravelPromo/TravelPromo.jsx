import React, { useState, useEffect, useMemo } from "react";
import Hero from "./Hero";
import PromoCard from "./PromoCard";
import {
  nature,
  cities,
  promo1,
  promo2,
  promo3,
  promo4,
  promo5,
  promo6,
} from "./assets";

export default function TravelPromo() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const isMobile = useMemo(() => window.innerWidth < 768, []);

  useEffect(() => {
    setIsLoaded(true);

    if (!isMobile) {
      const move = (e) => setMousePos({ x: e.clientX, y: e.clientY });
      window.addEventListener("mousemove", move);
      return () => window.removeEventListener("mousemove", move);
    }

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 p-8 relative overflow-hidden">
      <div className="grid md:grid-cols-2 rounded-[2.5rem] overflow-hidden shadow-2xl mb-10">
        <Hero
          img={nature}
          title="Nature"
          side="left"
          mousePos={mousePos}
          scrollY={scrollY}
          isLoaded={isLoaded}
          isMobile={isMobile}
        />
        <Hero
          img={cities}
          title="Cities"
          side="right"
          mousePos={mousePos}
          scrollY={scrollY}
          isLoaded={isLoaded}
          isMobile={isMobile}
        />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <PromoCard
          bg="bg-gradient-to-br from-blue-500 to-blue-700"
          color="text-white"
          title="We Make Every"
          subtitle="Trips Special"
          images={[promo1, promo2]}
        />
        <PromoCard
          bg="bg-gradient-to-br from-yellow-400 to-orange-500"
          color="text-gray-900"
          title="Buy 1, Get 1 Free"
          subtitle="Attractions"
          images={[promo3, promo4]}
        />
        <PromoCard
          bg="bg-gradient-to-br from-green-500 to-cyan-600"
          color="text-white"
          title="Buy 1, Get 1 Free"
          subtitle="Attractions"
          images={[promo5, promo6]}
        />
      </div>
    </div>
  );
}
