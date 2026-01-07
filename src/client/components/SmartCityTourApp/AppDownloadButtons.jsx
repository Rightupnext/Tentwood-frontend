import React from "react";
import Icon from "./UI/Icon";

const AppDownloadButtons = ({ isSm }) => (
  <div className="flex gap-4" style={{ flexDirection: isSm ? "row" : "column" }}>
    <button className="group bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-8 py-4 rounded-full font-bold text-sm flex items-center justify-center gap-3 shadow-2xl hover:shadow-yellow-400/50 transform hover:scale-105 active:scale-95 transition-all duration-300">
      <Icon type="smartphone" size={24} color="currentColor" />
      <div className="text-left">
        <div className="text-xs opacity-80">Download For</div>
        <div className="text-base font-bold">iOS</div>
      </div>
    </button>
    <button className="group bg-gradient-to-r from-green-400 to-cyan-400 text-gray-900 px-8 py-4 rounded-full font-bold text-sm flex items-center justify-center gap-3 shadow-2xl hover:shadow-cyan-400/50 transform hover:scale-105 active:scale-95 transition-all duration-300">
      <Icon type="smartphone" size={24} color="currentColor" />
      <div className="text-left">
        <div className="text-xs opacity-80">Download For</div>
        <div className="text-base font-bold">Android</div>
      </div>
    </button>
  </div>
);

export default AppDownloadButtons;
