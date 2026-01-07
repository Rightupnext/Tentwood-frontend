import React from "react";
import { StarFilled, StarOutlined } from "@ant-design/icons";

const StarRating = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[...Array(5)].map((_, idx) => {
      if (idx + 1 <= rating)
        return <StarFilled key={idx} className="w-4 h-4 !text-yellow-400" />;
      else if (idx + 0.5 <= rating)
        return <StarFilled key={idx} className="w-4 h-4 !text-yellow-200" />;
      else return <StarOutlined key={idx} className="w-4 h-4 text-gray-300" />;
    })}
    <span className="ml-2 text-sm">{rating}</span>
  </div>
);

export default StarRating;
