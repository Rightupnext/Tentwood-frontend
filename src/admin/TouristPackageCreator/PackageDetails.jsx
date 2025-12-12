// pages/PackageDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Tabs,
  Collapse,
  Tag,
  Carousel,
  Spin,
  Button,
  Card,
  Divider,
} from "antd";
import { packagesMock } from "./mockData";
import {
  ArrowLeftOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  StarFilled,
  ClockCircleOutlined,
  HeartOutlined,
  ShareAltOutlined,
  RightOutlined,
} from "@ant-design/icons";

const { Panel } = Collapse;

export default function PackageDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with mock data
    setLoading(true);
    setTimeout(() => {
      const foundPackage = packagesMock.find((p) => p._id === id);
      setPkg(foundPackage);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Package Not Found
        </h2>
        <Button type="primary" onClick={() => navigate("/packages")}>
          Back to Packages
        </Button>
      </div>
    );
  }

  const tabItems = [
    {
      key: "1",
      label: <span className="font-semibold">Itinerary</span>,
      children: (
        <Collapse accordion className="bg-transparent border-0">
          {pkg.itinerary?.map((day, index) => (
            <Panel
              header={
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <span className="font-semibold text-gray-800">
                    {day.dayTitle}
                  </span>
                </div>
              }
              key={index}
              className="mb-2 bg-gray-50 rounded-lg border-0"
            >
              <ul className="space-y-2 pl-11">
                {day.activities?.map((act, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-600">
                    <RightOutlined className="text-blue-500 mt-1" />
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </Panel>
          ))}
        </Collapse>
      ),
    },
    {
      key: "2",
      label: <span className="font-semibold">Inclusions & Exclusions</span>,
      children: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-bold text-green-600 mb-3 flex items-center gap-2">
              ✓ Included
            </h3>
            <ul className="space-y-2">
              {pkg.inclusions?.map((inc, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-700">
                  <span className="text-green-500 font-bold">✓</span>
                  {inc}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-red-600 mb-3 flex items-center gap-2">
              ✗ Not Included
            </h3>
            <ul className="space-y-2">
              {pkg.exclusions?.map((exc, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-700">
                  <span className="text-red-500 font-bold">✗</span>
                  {exc}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ),
    },
    {
      key: "3",
      label: <span className="font-semibold">Travel Essentials</span>,
      children: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(pkg.travelEssentials || {}).map(([key, items]) => (
            <div key={key} className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-bold text-gray-800 mb-2 capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </h4>
              <ul className="space-y-1">
                {items.map((i, idx) => (
                  <li
                    key={idx}
                    className="text-gray-600 text-sm flex items-start gap-2"
                  >
                    <span className="text-blue-500">•</span>
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ),
    },
    {
      key: "4",
      label: <span className="font-semibold">Gallery</span>,
      children: (
        <Carousel autoplay className="rounded-lg overflow-hidden">
          {pkg.gallery?.map((img, i) => (
            <div key={i}>
              <img
                src={img.fileUrl}
                alt={`Gallery ${i}`}
                className="w-full h-96 object-cover"
              />
            </div>
          ))}
        </Carousel>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative w-full h-96 md:h-[500px]">
        <img
          src={pkg.heroMedia?.fileUrl}
          alt={pkg.packageTitle}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div className="absolute top-6 left-6">
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
            size="large"
            className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-full hover:bg-white"
          >
            Back
          </Button>
        </div>

        <div className="absolute top-6 right-6 flex gap-2">
          <Button
            icon={<HeartOutlined />}
            size="large"
            className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-full hover:bg-white"
          />
          <Button
            icon={<ShareAltOutlined />}
            size="large"
            className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-full hover:bg-white"
            onClick={async () => {
              if (navigator.share) {
                try {
                  await navigator.share({
                    title: pkg.packageTitle,
                    text: `Check out this amazing package: ${pkg.packageTitle}`,
                    url: window.location.href,
                  });
                  console.log("Package shared successfully!");
                } catch (err) {
                  console.error("Error sharing:", err);
                }
              } else {
                // Fallback for desktop browsers
                const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  `Check out this amazing package: ${pkg.packageTitle}`
                )}&url=${encodeURIComponent(window.location.href)}`;
                window.open(shareUrl, "_blank");
              }
            }}
          />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {pkg.packageTitle}
            </h1>
            <div className="flex flex-wrap gap-4 items-center text-lg">
              <Tag className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border-0 text-white">
                <CalendarOutlined />
                {pkg.durationDays} Days / {pkg.nights} Nights
              </Tag>
              <Tag className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border-0 text-white">
                <EnvironmentOutlined />
                {pkg.locations.split(",")[0]}
              </Tag>
              <Tag className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border-0 text-white">
                <StarFilled className="text-yellow-400" />
                4.8 Rating
              </Tag>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Overview */}
            <Card className="mb-6 rounded-xl shadow-md border-0">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Overview
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {pkg.overview}
              </p>
              <div className="flex flex-wrap gap-2">
                {pkg.highlights?.map((h, i) => (
                  <Tag
                    key={i}
                    color="blue"
                    className="px-3 py-1 text-sm rounded-full"
                  >
                    {h}
                  </Tag>
                ))}
              </div>
            </Card>

            {/* Tabs */}
            <Card className="rounded-xl shadow-md border-0">
              <Tabs defaultActiveKey="1" size="large" items={tabItems} />
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="rounded-xl shadow-xl border-0 sticky top-6">
              <div className="text-center mb-6">
                <span className="text-gray-500 text-sm">Starting from</span>
                <div className="text-4xl font-bold text-blue-600 mb-1">
                  ₹{pkg.price.toLocaleString()}
                </div>
                <span className="text-gray-500 text-sm">per person</span>
              </div>

              <Divider />

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <EnvironmentOutlined className="text-blue-500 text-lg mt-1" />
                  <div>
                    <div className="text-xs text-gray-500">Pickup Point</div>
                    <div className="font-semibold text-gray-800">
                      {pkg.pickup}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <EnvironmentOutlined className="text-red-500 text-lg mt-1" />
                  <div>
                    <div className="text-xs text-gray-500">Drop Point</div>
                    <div className="font-semibold text-gray-800">
                      {pkg.drop}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ClockCircleOutlined className="text-green-500 text-lg mt-1" />
                  <div>
                    <div className="text-xs text-gray-500">Meeting Point</div>
                    <div className="font-semibold text-gray-800">
                      {pkg.meetingPoint}
                    </div>
                  </div>
                </div>
              </div>

              <Button
                type="primary"
                size="large"
                block
                className="bg-gradient-to-r from-blue-500 to-blue-600 border-0 h-12 text-lg font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700"
              >
                Book Now
              </Button>

              <div className="mt-4 p-3 bg-green-50 rounded-lg text-center">
                <span className="text-green-600 text-sm font-semibold">
                  🎉 Only {pkg.seatsTotal - pkg.seatsBooked} seats remaining!
                </span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
