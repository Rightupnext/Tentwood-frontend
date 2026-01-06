import React from "react";
import { Card, Button, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import {
  EnvironmentOutlined,
  CalendarOutlined,
  RightOutlined,
  HeartOutlined,
} from "@ant-design/icons";

export default function PackageCard({ pkg }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${pkg._id}`);
  };

  // ✅ AntD supported colors
  const TRIP_COLORS = {
    "International Trips": "blue",
    "India Trips": "green",
    "Group Tours": "orange",
    "Honeymoon Packages": "magenta",
  };

  // ✅ FIXED (array → single name)
  const tripCategories = pkg?.tripCategories || [];

  return (
    <Card
      hoverable
      className="rounded-2xl overflow-hidden border-0 shadow-xl
      transition-all duration-300 hover:shadow-2xl hover:-translate-y-2
      bg-white/90 backdrop-blur-md"
      cover={
        <div className="relative h-[50vh] overflow-hidden group">
          <img
            alt={pkg.packageTitle}
            src={`${import.meta.env.VITE_BACKEND_URL}${
              pkg?.cardMedia?.fileUrl
            }`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* ❤️ Favorite */}
          <div className="absolute top-3 right-3">
            <Button
              type="text"
              icon={<HeartOutlined className="text-red-500" />}
              className="bg-white/90 rounded-full w-10 h-10 shadow-md"
            />
          </div>

          {/* 🏷 Trip Category */}
          {/* 🏷 Trip Categories (MULTI LABEL) */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {tripCategories.map((cat) => (
              <Tag
                key={cat}
                color={TRIP_COLORS[cat] || "blue"}
                className="font-semibold px-4 py-1 rounded-full shadow-md text-sm"
              >
                {cat}
              </Tag>
            ))}
          </div>
        </div>
      }
    >
      <div className="p-2">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {pkg.packageTitle}
        </h3>

        <div className="flex items-center gap-2 text-gray-600 mb-3">
          <EnvironmentOutlined className="text-blue-500" />
          <span className="text-sm truncate">{pkg.locations}</span>
        </div>

        <div className="flex justify-between items-center mb-3 text-sm">
          <span className="flex items-center gap-1">
            <CalendarOutlined className="text-green-500" />
            {pkg.durationDays}
          </span>

          <span className="text-blue-600 font-bold text-base">
            ₹{pkg.price?.toLocaleString("en-IN")}
          </span>
        </div>

        <Button
          type="primary"
          size="large"
          block
          onClick={handleClick}
          className="h-12 rounded-xl font-semibold
          bg-gradient-to-r from-blue-500 to-blue-600 border-0"
        >
          View Details <RightOutlined />
        </Button>
      </div>
    </Card>
  );
}
