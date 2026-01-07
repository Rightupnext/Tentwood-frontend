import React, { useState, useEffect } from "react";

import { useWindowWidth } from "./hooks/useWindowWidth";
import HotelList from "./HotelList";
import Header from "./Header";
import Stats from "./Stats";
import AppDownloadButtons from "./AppDownloadButtons";
import BackgroundEffects from "./BackgroundEffects";

const SmartCityTourApp = ({ packages }) => {
  const width = useWindowWidth();

  const isLg = width >= 1024;
  const isSm = width >= 640;

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-800 to-cyan-500 relative">
      <BackgroundEffects />
      <div
        className="container mx-auto px-4 py-8 relative z-10"
        style={{ maxWidth: "1280px", paddingTop: isLg ? "4rem" : "2rem" }}
      >
        <div
          className="grid gap-8 items-center"
          style={{
            gridTemplateColumns: isLg ? "1fr 1fr" : "1fr",
            gap: isLg ? "4rem" : "2rem",
          }}
        >
          <HotelList hotels={packages} />
          <div className="text-white space-y-8">
            <Header isLg={isLg} isSm={isSm} />
            <AppDownloadButtons isSm={isSm} />
            <Stats />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartCityTourApp;
