import React from "react";

export default function TopNavbar() {
  const text = "🎄 Christmas & New Year sale is live, get up to ₹ 5000 off 🎉";
  const repeat = Array(4).fill(text);

  return (
    <>
      <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 text-white py-1 sm:py-2 overflow-hidden text-xs sm:text-sm md:text-base">
        <div className="scroll-text flex whitespace-nowrap">
          {[...repeat, ...repeat].map((item, i) => (
            <span key={i} className="inline-block px-4 sm:px-8">
              {item}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        .scroll-text {
          display: inline-flex;
          animation: scroll 20s linear infinite;
        }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </>
  );
}
