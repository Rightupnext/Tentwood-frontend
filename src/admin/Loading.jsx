import React from "react";
import { EnvironmentOutlined } from "@ant-design/icons";
function Loading() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center">
          {/* Animated Logo */}
          <div className="mb-8 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 border-4 border-emerald-200 rounded-full animate-ping"></div>
            </div>
            <div className="relative flex items-center justify-center">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
                <EnvironmentOutlined className="!w-10 !h-10 text-6xl !text-white" />
              </div>
            </div>
          </div>

          {/* Brand Name */}
          <h2 className="text-3xl font-bold text-slate-900 mb-4 animate-pulse">
            TentWood
          </h2>

          {/* Loading Bar */}
          <div className="w-64 h-2 bg-slate-200 rounded-full overflow-hidden mx-auto">
            <div className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full animate-loading-bar"></div>
          </div>

          <p className="text-slate-600 mt-4 animate-pulse">
            Preparing your journey...
          </p>
        </div>

        <style jsx>{`
          @keyframes loading-bar {
            0% {
              width: 0%;
              transform: translateX(0);
            }
            50% {
              width: 70%;
            }
            100% {
              width: 100%;
              transform: translateX(0);
            }
          }
          .animate-loading-bar {
            animation: loading-bar 2s ease-in-out;
          }
        `}</style>
      </div>
    </>
  );
}

export default Loading;
