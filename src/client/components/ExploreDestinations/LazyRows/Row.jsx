import React, { memo } from "react";
import DestinationCard from "./DestinationCard";

const Row = memo(function Row({ list, reverse }) {
  return (
    <div className="relative overflow-hidden mb-8">
      <div
        className={`flex gap-6 ${
          reverse
            ? "animate-[scrollLeft_35s_linear_infinite]"
            : "animate-[scrollRight_35s_linear_infinite]"
        }`}
      >
        {[...list, ...list].map((item, i) => (
          <DestinationCard key={`${item._id}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
});

export default Row;
