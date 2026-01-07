import React from "react";

const Header = ({ isLg, isSm }) => (
  <div className="space-y-4">
    <h1
      className="font-bold leading-tight"
      style={{
        fontSize: isLg ? "3.75rem" : isSm ? "3rem" : "2.25rem",
      }}
    >
      Smart City Tour
      <br />
      <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent animate-gradient">
        TentWood Mobile App
      </span>
    </h1>
    <p className="text-cyan-100 text-lg font-medium">Available on iOS & Android</p>
    <p className="text-white/90 text-base leading-relaxed max-w-xl">
      TentWood Mobile App transforms the way you explore cities. From iconic landmarks to local secrets, enjoy curated tours, real-time navigation, and smart travel planning—all crafted to deliver a smooth, immersive travel experience wherever you go.
    </p>
  </div>
);

export default Header;
