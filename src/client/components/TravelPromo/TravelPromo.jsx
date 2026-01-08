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
import { useNavigate } from "react-router-dom";

export default function TravelPromo({ packages }) {
  const navigate = useNavigate();
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
  const getPackageImages = (pkg) => {
    const images = [];

    if (pkg?.cardMedia?.fileUrl) {
      images.push(pkg.cardMedia.fileUrl);
    }

    if (pkg?.heroMedia?.fileUrl) {
      images.push(pkg.heroMedia.fileUrl);
    }

    // If we already have 2 images, return
    if (images.length >= 2) return images.slice(0, 2);

    // Fallback to gallery images
    if (pkg?.gallery?.length) {
      pkg.gallery.forEach((g) => {
        if (images.length < 2 && g?.fileUrl) {
          images.push(g.fileUrl);
        }
      });
    }

    return images.slice(0, 2);
  };
  const promoGradients = [
    "bg-gradient-to-br from-blue-500 to-blue-700",
    "bg-gradient-to-br from-yellow-400 to-orange-500",
    "bg-gradient-to-br from-green-500 to-cyan-600",
  ];
  const TRIP_ROUTE_MAP = {
    "India Trips": "india-trips",
    "International Trips": "international-trips",
    "Honeymoon Packages": "honeymoon-packages",
    "Group Tours": "group-tours",
  };
  const handleNavigate = (a) => {
    const tripPrefix = TRIP_ROUTE_MAP[a?.tripCategories?.[0]];
    if (!tripPrefix) return;
    navigate(`/${tripPrefix}/${a?.Destination?.name}/${a?.packageTitle}`, {
      state: { id: a?._id },
    });
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#ffffff] via-[#ffffff] to-[#ffffff] p-8 relative overflow-hidden">
      <div className="grid md:grid-cols-2 rounded-[2.5rem] overflow-hidden shadow-2xl mb-10">
        <Hero
          img={nature}
          title="Unforgettable Travel Packages"
          side="left"
          mousePos={mousePos}
          scrollY={scrollY}
          isLoaded={isLoaded}
          isMobile={isMobile}
        />
        <Hero
          img={cities}
          title="Curated Travel Experiences"
          side="right"
          mousePos={mousePos}
          scrollY={scrollY}
          isLoaded={isLoaded}
          isMobile={isMobile}
        />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages?.slice(0, 3).map((pkg, index) => {
          const images = getPackageImages(pkg);

          return (
            <PromoCard
              key={pkg._id}
              bg={promoGradients[index % promoGradients.length]}
              color="text-white"
              title={pkg.Destination?.name}
              subtitle={pkg.packageTitle}
              images={images}
              pkg={pkg}
               onNavigate={() => handleNavigate(pkg)}
            />
          );
        })}
      </div>
    </div>
  );
}
