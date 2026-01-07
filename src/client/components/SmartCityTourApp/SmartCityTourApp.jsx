import React, { useState, useEffect } from "react";
import HotelList from "./HotelList";
import Header from "./Header";
import Stats from "./Stats";
import AppDownloadButtons from "./AppDownloadButtons";
import BackgroundEffects from "./BackgroundEffects";

const SmartCityTourApp = ({ packages }) => {


  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-800 to-cyan-500 relative">
      <BackgroundEffects />
      <div className="container mx-auto px-4 py-8 lg:pt-16 relative z-10 max-w-[1280px]">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
          <HotelList hotels={packages} />
          <div className="text-white space-y-8">
            <Header />
            <AppDownloadButtons />
            <Stats />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartCityTourApp;
