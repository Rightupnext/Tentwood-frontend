// pages/PackagesList.jsx
import React, { useState } from "react";
import { Row, Col, Input, Slider, Select, Button, Card, Spin, Tag } from "antd";
import PackageCard from "./PackageCard";
import { packagesMock } from "./mockData";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";

const { Option } = Select;

const categories = ["International Trips", "India Trips", "Group Tours", "Honeymoon Packages"];

export default function PackagesList() {
  const [packages, setPackages] = useState(packagesMock);
  const [loading, setLoading] = useState(false);

  // Filters
  const [category, setCategory] = useState("");
  const [destination, setDestination] = useState("");
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [duration, setDuration] = useState("");

  const applyFilters = () => {
    setLoading(true);
    let filtered = packagesMock;

    if (category) {
      filtered = filtered.filter((pkg) => pkg.category === category);
    }

    if (destination) {
      filtered = filtered.filter((pkg) =>
        pkg.locations.toLowerCase().includes(destination.toLowerCase())
      );
    }

    filtered = filtered.filter(
      (pkg) => pkg.price >= priceRange[0] && pkg.price <= priceRange[1]
    );

    if (duration) {
      const [min, max] = duration.split("-").map(Number);
      filtered = filtered.filter(
        (pkg) => pkg.durationDays >= min && pkg.durationDays <= max
      );
    }

    setTimeout(() => {
      setPackages(filtered);
      setLoading(false);
    }, 300);
  };

  const stats = [
    { label: "Total Packages", value: "150+", icon: "🎒" },
    { label: "Happy Travelers", value: "5000+", icon: "😊" },
    { label: "Countries", value: "25+", icon: "🌍" },
    { label: "Avg Rating", value: "4.8★", icon: "⭐" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Available Packages</h1>
          <p className="text-xl text-blue-100">Discover amazing travel experiences</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-8">
        {/* Search & Filters Card */}
        <Card className="mb-8 rounded-xl shadow-xl border-0">
          <Row gutter={[16, 16]}>
            <Col xs={24} md={6}>
              <Input
                placeholder="Search destination..."
                prefix={<SearchOutlined />}
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                size="large"
                className="rounded-lg"
              />
            </Col>

            <Col xs={24} md={6}>
              <div>
                <div className="text-sm text-gray-600 mb-2">
                  Price: ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
                </div>
                <Slider range max={200000} step={5000} value={priceRange} onChange={setPriceRange} />
              </div>
            </Col>

            <Col xs={24} md={6}>
              <Select
                placeholder="Duration"
                value={duration}
                onChange={setDuration}
                size="large"
                className="w-full"
              >
                <Option value="">All Durations</Option>
                <Option value="2-3">2-3 Days</Option>
                <Option value="5-6">5-6 Days</Option>
                <Option value="7-8">7-8 Days</Option>
              </Select>
            </Col>

            <Col xs={24} md={6}>
              <Button
                type="primary"
                size="large"
                icon={<FilterOutlined />}
                onClick={applyFilters}
                block
                className="bg-gradient-to-r from-blue-500 to-blue-600 border-0 rounded-lg hover:from-blue-600 hover:to-blue-700"
              >
                Apply Filters
              </Button>
            </Col>
          </Row>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 mt-4">
            {categories.map((cat) => (
              <Tag
                key={cat}
                color={category === cat ? "blue" : "default"}
                className="cursor-pointer px-4 py-1 rounded-full text-sm"
                onClick={() => setCategory(cat)}
              >
                {cat}
              </Tag>
            ))}
            {category && (
              <Tag
                color="red"
                className="cursor-pointer px-3 py-1 rounded-full text-sm"
                onClick={() => setCategory("")}
              >
                Clear
              </Tag>
            )}
          </div>
        </Card>

        {/* Stats Bar */}
        <Row gutter={[16, 16]} className="my-8">
          {stats.map((stat, i) => (
            <Col xs={12} md={6} key={i}>
              <Card className="text-center rounded-xl shadow-md border-0 hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Package Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Packages</h2>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Spin size="large" />
            </div>
          ) : packages && packages.length > 0 ? (
            <Row gutter={[24, 24]}>
              {packages.map((pkg) => (
                <Col xs={24} sm={12} lg={8} key={pkg._id}>
                  <PackageCard pkg={pkg} />
                </Col>
              ))}
            </Row>
          ) : (
            <p className="text-center text-gray-500 py-20">No packages found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
