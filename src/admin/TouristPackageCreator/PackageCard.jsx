// components/PackageCard.jsx
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
      className="rounded-xl shadow-lg border-0 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 overflow-hidden"
      cover={
        <div className="relative overflow-hidden h-48">
          <img
            alt={pkg.packageTitle}
            src={pkg.cardMedia?.fileUrl}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute top-3 right-3">
            <Button
              type="text"
              icon={<HeartOutlined />}
              className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-md rounded-full"
              size="large"
            />
          </div>
          <div className="absolute top-3 left-3">
            <Tag color="gold" className="font-semibold px-3 py-1 rounded-full">
              {pkg.seatsTotal - pkg.seatsBooked} Seats Left
            </Tag>
          </div>
        </div>
      }
    >
      <div className="p-2">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
          {pkg.packageTitle}
        </h3>

        <div className="flex items-center gap-2 text-gray-600 mb-3">
          <EnvironmentOutlined className="text-blue-500" />
          <span className="text-sm truncate">{pkg.locations}</span>
        </div>

        <div className="flex items-center justify-between mb-3 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <CalendarOutlined className="text-green-500" />
            {pkg.durationDays} Days
          </span>
          <span className="flex items-center gap-1">
            <UserOutlined className="text-purple-500" />
            {pkg.seatsTotal} Seats
          </span>
          <span className="font-medium text-gray-700">
            ₹{pkg.price.toLocaleString()}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {pkg.highlights?.slice(0, 3).map((h, i) => (
            <Tag key={i} color="blue" className="rounded-full text-xs">
              {h}
            </Tag>
          ))}
        </div>

        <Button
          type="primary"
          className="mt-3 w-full bg-gradient-to-r from-blue-500 to-blue-600 border-0 rounded-lg hover:from-blue-600 hover:to-blue-700 h-12 font-semibold"
          onClick={handleClick}
          icon={<RightOutlined />}
          iconPosition="end"
        >
          View Details
        </Button>
      </div>
    </Card>
  );
}
