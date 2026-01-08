import React from "react";
import { RightOutlined } from "@ant-design/icons";

export default function PromoCard({ color, bg, title, subtitle, images,onNavigate }) {
  return (
    <div
      className={`${bg} ${color} rounded-3xl p-8 overflow-hidden relative group cursor-pointer transition-all duration-700 hover:scale-[1.05]`}
    >
      <div className="relative z-10">
        <span className="text-xs font-extrabold uppercase px-4 py-2 bg-black/30 rounded-full mb-5 inline-block">
          Limited Offers
        </span>

        <h3 className="text-4xl font-extrabold mb-3">{title}</h3>
        <p className="text-3xl font-extrabold mb-8 line-clamp-2 pb-1">{subtitle}</p>

        <button onClick={onNavigate} className="cursor-pointer group/btn px-7 py-3 bg-black/80 text-white rounded-full font-bold">
          <span className="flex items-center gap-3">
            View More
            <RightOutlined />
          </span>
        </button>
      </div>

      <div className="absolute bottom-0 right-0 flex gap-3 p-6">
        {images.map((img, i) => (
          <div
            key={i}
            className="w-24 h-24 rounded-2xl bg-cover bg-center shadow-2xl"
            style={{
              backgroundImage: `url(${import.meta.env.VITE_BACKEND_URL}${img})`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
