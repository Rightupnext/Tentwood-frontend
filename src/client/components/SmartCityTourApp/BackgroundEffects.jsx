import React from "react";

const BackgroundEffects = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute w-96 h-96 bg-purple-400/20 rounded-full blur-3xl top-10 -left-20 animate-pulse" style={{ animationDuration: "4s" }} />
    <div className="absolute w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl bottom-20 -right-20 animate-pulse" style={{ animationDuration: "5s" }} />
    <div className="absolute w-72 h-72 bg-pink-400/10 rounded-full blur-3xl top-1/2 left-1/2 animate-pulse" style={{ animationDuration: "6s" }} />
  </div>
);

export default BackgroundEffects;
