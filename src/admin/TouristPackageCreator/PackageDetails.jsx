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
  Popconfirm,
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
  CheckCircleOutlined,
  CloseCircleOutlined,
  CompassOutlined,
  PictureOutlined,
  DeleteOutlined,
  EditFilled,
} from "@ant-design/icons";

import {
  deletePackage,
  fetchPackageById,
} from "../../store/slices/packageSlice";
import { useDispatch, useSelector } from "react-redux";
const { Panel } = Collapse;

export default function PackageDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selected: pkg, loading } = useSelector((state) => state.packages);
  console.log("packages", pkg);

  useEffect(() => {
    dispatch(fetchPackageById({ id }));
  }, [dispatch, id]);
  const handleDeletePkg = async (id) => {
    dispatch(deletePackage({ id: id })).unwrap();
    navigate("/admin/package");
  };
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
      label: (
        <span className="flex items-center gap-2 font-semibold">
          <CalendarOutlined className="text-lg" />
          Itinerary
        </span>
      ),
      children: (
        <Collapse accordion className="bg-transparent border-0">
          {pkg.itinerary?.map((day, index) => (
            <Panel
              header={
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl w-12 h-12 flex items-center justify-center font-bold text-base shadow-lg">
                    {day.dayNumber}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-900 text-base">
                      {day.title || `Day ${index + 1}`}
                    </span>
                  </div>
                </div>
              }
              key={day._id}
              className="mb-3 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              {day.description.map((point, idx) => (
                <div key={idx} className="flex gap-3">
                  <span className="text-sm text-blue-500 font-semibold">
                    {idx + 1}.
                  </span>
                  <p className="text-gray-600 leading-relaxed">{point}</p>
                </div>
              ))}

              {day.optionalActivities?.length > 0 && (
                <div className="mt-4 bg-blue-50 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-blue-800 mb-3 flex items-center gap-2">
                    <CompassOutlined />
                    Optional Activities
                  </h4>
                  <ul className="space-y-2">
                    {day.optionalActivities.map((act, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-gray-700"
                      >
                        <RightOutlined className="text-blue-500 mt-1 text-xs" />
                        <span className="text-sm">{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Panel>
          ))}
        </Collapse>
      ),
    },
    {
      key: "2",
      label: (
        <span className="flex items-center gap-2 font-semibold">
          <CheckCircleOutlined className="text-lg" />
          Inclusions & Exclusions
        </span>
      ),
      children: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
            <h3 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-3">
              <CheckCircleOutlined className="text-2xl" />
              What's Included
            </h3>
            <ul className="space-y-3">
              {pkg.inclusions?.map((inc, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <CheckCircleOutlined className="text-green-500 text-lg mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">{inc}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-6 border border-red-200">
            <h3 className="text-xl font-bold text-red-700 mb-4 flex items-center gap-3">
              <CloseCircleOutlined className="text-2xl" />
              Not Included
            </h3>
            <ul className="space-y-3">
              {pkg.exclusions?.map((exc, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <CloseCircleOutlined className="text-red-500 text-lg mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">{exc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <span className="flex items-center gap-2 font-semibold">
          <CompassOutlined className="text-lg" />
          Travel Essentials
        </span>
      ),
      children: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.entries(pkg.travelEssentials || {}).map(([key, items]) => (
            <div
              key={key}
              className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <h4 className="font-bold text-gray-800 mb-3 text-base flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                {key.replace(/([A-Z])/g, " $1").trim()}
              </h4>
              <ul className="space-y-2">
                {items.map((i, idx) => (
                  <li
                    key={idx}
                    className="text-gray-600 text-sm flex items-start gap-2 leading-relaxed"
                  >
                    <RightOutlined className="text-blue-500 text-xs mt-1 flex-shrink-0" />
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
      label: (
        <span className="flex items-center gap-2 font-semibold">
          <PictureOutlined className="text-lg" />
          Gallery
        </span>
      ),
      children: (
        <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200">
          <Carousel autoplay autoplaySpeed={3000} effect="fade">
            {pkg.gallery?.map((img, i) => (
              <div key={i} className="relative">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}${img.fileUrl}`}
                  alt={`Gallery ${i}`}
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
            ))}
          </Carousel>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative w-full h-96 md:h-[500px]">
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}${pkg.heroMedia?.fileUrl}`}
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
            icon={<EditFilled />}
            danger
            onClick={() => navigate(`/admin/package/edit/${pkg._id}`)}
            size="large"
            className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-full hover:bg-red-500"
          />
          <Popconfirm
            title="Delete Package"
            description="Are you sure you want to delete this package?"
            okText="Yes, Delete"
            cancelText="Cancel"
            okButtonProps={{ danger: true }}
            onConfirm={() => handleDeletePkg(pkg._id)}
          >
            <Button
              icon={<DeleteOutlined />}
              danger
              size="large"
              className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-full hover:bg-red-500"
            />
          </Popconfirm>

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
                {pkg.durationDays} Days
              </Tag>
              <Tag className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border-0 text-white">
                <EnvironmentOutlined />
                {pkg.locations}
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
              <p className="text-gray-600 leading-relaxed mb-4 whitespace-pre-line">
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
                {/* <div className="flex items-start gap-3">
                  <ClockCircleOutlined className="text-green-500 text-lg mt-1" />
                  <div>
                    <div className="text-xs text-gray-500">Meeting Point</div>
                    <div className="font-semibold text-gray-800">
                      {pkg.meetingPoint}
                    </div>
                  </div>
                </div> */}
              </div>

              <Button
                type="primary"
                size="large"
                block
                className="bg-gradient-to-r from-blue-500 to-blue-600 border-0 h-12 text-lg font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700"
              >
                Book Now
              </Button>

              {/* <div className="mt-4 p-3 bg-green-50 rounded-lg text-center">
                <span className="text-green-600 text-sm font-semibold">
                  🎉 Only {pkg.seatsTotal - pkg.seatsBooked} seats remaining!
                </span>
              </div> */}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
