import React from "react";
import TourCard from "../../components/TourCarousel/TourCard";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

export default function Section({ title, tours, refEl, sc, setSc, idx }) {
  const handleScroll = (ref, d) => {
    const c = ref.current;
    if (!c) return;
    const viewportWidth = c.offsetWidth;
    const scrollAmount = viewportWidth * 0.8;
    const targetScroll =
      d === "left" ? c.scrollLeft - scrollAmount : c.scrollLeft + scrollAmount;
    c.scrollTo({ left: targetScroll, behavior: "smooth" });
    setTimeout(() => setSc(c.scrollLeft), 400);
  };

  return (
    <div
      className="mb-12 sm:mb-16"
      style={{ animation: `fadeInUp 0.8s ease-out ${idx * 200}ms both` }}
    >
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#19203c] relative inline-block group cursor-pointer">
          {title}
          <div className="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full group-hover:w-full transition-all duration-500" />
        </h2>
        <div className="flex gap-2 sm:gap-3">
          <button
            onClick={() => handleScroll(refEl, "left")}
            disabled={sc <= 0}
            className="w-10 h-10 sm:w-12 sm:h-12 cursor-pointer bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <LeftOutlined className="!w-5 !h-5 !sm:w-6 !sm:h-6 !!text-white" />
          </button>
          <button
            onClick={() => handleScroll(refEl, "right")}
            className="w-10 h-10 sm:w-12 sm:h-12 cursor-pointer bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300"
          >
            <RightOutlined className="!w-5 !h-5 !sm:w-6 !sm:h-6 !text-white" />
          </button>
        </div>
      </div>

      <div
        ref={refEl}
        className="flex gap-4 sm:gap-6 overflow-x-hidden pb-4 scrollbar-hide scroll-smooth snap-x snap-mandatory"
        style={{ scrollPaddingLeft: "24px" }}
      >
        {tours.map((t, i) => (
          <div key={i} className="snap-start">
            <TourCard t={t} i={i} title={title} />
          </div>
        ))}
      </div>
    </div>
  );
}
