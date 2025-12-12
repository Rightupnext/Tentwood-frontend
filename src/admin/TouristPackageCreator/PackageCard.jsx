import React from "react";
import { Card, Button, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import {
  EnvironmentOutlined,
  CalendarOutlined,
  UserOutlined,
  RightOutlined,
  HeartOutlined,
} from "@ant-design/icons";

export default function PackageCard({ pkg }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${pkg._id}`);
  };

  return (
    <Card
      hoverable
      className="
        rounded-2xl overflow-hidden border-0 shadow-xl 
        transition-all duration-300 
        hover:shadow-2xl hover:-translate-y-2
        bg-white/80 backdrop-blur-md
      "
      cover={
        <div className="relative h-[50vh] overflow-hidden group">
          <img
            alt={pkg.packageTitle}
            src={`${import.meta.env.VITE_BACKEND_URL}${
              pkg?.cardMedia?.fileUrl
            }`}
            className="
              w-full h-full  
              transition-transform duration-700 
              group-hover:scale-110
            "
          />

          {/* Favorites Icon */}
          <div className="absolute top-3 right-3">
            <Button
              type="text"
              icon={<HeartOutlined className="text-red-500" />}
              className="
                bg-white/90 backdrop-blur-xl 
                hover:bg-white shadow-md 
                rounded-full w-10 h-10 flex items-center justify-center
              "
            />
          </div>

          {/* Seats Badge */}
          <div className="absolute top-3 left-3">
            <Tag
              color="gold"
              className="
                font-semibold px-4 py-1 rounded-full 
                shadow-md text-sm
              "
            >
              {pkg.seatsTotal - pkg.seatsBooked} Seats Left
            </Tag>
          </div>
        </div>
      }
    >
      {/* Content */}
      <div className="p-1">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {pkg.packageTitle}
        </h3>

        <div className="flex items-center gap-2 text-gray-600 mb-3">
          <EnvironmentOutlined className="text-blue-500" />
          <span className="text-sm truncate">{pkg.locations}</span>
        </div>

        {/* Info Row */}
        <div className="flex items-center justify-between mb-3 text-sm font-medium text-gray-700">
          <span className="flex items-center gap-1">
            <CalendarOutlined className="text-green-500" />
            {pkg.durationDays} Days
          </span>

          <span className="flex items-center gap-1">
            <UserOutlined className="text-purple-500" />
            {pkg.seatsTotal} Seats
          </span>

          <span className="text-blue-600 font-semibold text-base">
            ₹{pkg.price.toLocaleString()}
          </span>
        </div>

        {/* Highlights */}
        <div className="flex flex-wrap gap-2 mb-4">
          {pkg.highlights?.slice(0, 2).map((h, i) => (
            <Tag
              key={i}
              color="blue"
              className="rounded-full px-3 py-1 text-xs font-medium"
            >
              {h}
            </Tag>
          ))}
        </div>

        {/* CTA Button */}
        <Button
          type="primary"
          size="large"
          block
          className="
            h-12 rounded-xl text-base font-semibold 
            bg-gradient-to-r from-blue-500 to-blue-600
            hover:from-blue-600 hover:to-blue-700
            border-0 flex items-center justify-center gap-2
          "
          onClick={handleClick}
        >
          View Details
          <RightOutlined />
        </Button>
      </div>
    </Card>
  );
}
