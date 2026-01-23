// pages/PackagesList.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Row, Col, Input, Slider, Card, Spin, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchPackages } from "../../store/slices/packageSlice";
import PackageCard from "./PackageCard";

const categories = [
  "International Trips",
  "India Trips",
  "Group Tours",
  "Honeymoon Packages",
];

export default function PackagesList() {
  const dispatch = useDispatch();
  const { list: packages, loadings } = useSelector((state) => state.packages);

  const [category, setCategory] = useState("");
  const [destination, setDestination] = useState("");
  const [priceRange, setPriceRange] = useState([0, 0]);

  useEffect(() => {
    dispatch(fetchPackages());
  }, [dispatch]);

  // ✅ Auto detect max price
  const maxPrice = useMemo(() => {
    return Math.max(...packages.map((p) => p.price || 0), 0);
  }, [packages]);

  // ✅ Initialize slider when data loads
  useEffect(() => {
    if (maxPrice > 0) {
      setPriceRange([0, maxPrice]);
    }
  }, [maxPrice]);

  // ✅ Optimized filtering (NO extra state / effects)
  const filteredPackages = useMemo(() => {
    return packages.filter((pkg) => {
      const q = destination.toLowerCase();

      const matchSearch =
        !q ||
        pkg?.packageTitle?.toLowerCase().includes(q) ||
        pkg?.locations?.toLowerCase().includes(q) ||
        pkg?.price?.toString().includes(q);

      const matchCategory =
        !category || pkg?.tripCategories?.includes(category);

      const matchPrice =
        pkg.price != null &&
        typeof pkg.price === "number" &&
        pkg.price >= priceRange[0] &&
        pkg.price <= priceRange[1];

      return matchSearch && matchCategory && matchPrice;
    });
  }, [packages, destination, category, priceRange]);

  return (
    <div className="min-h-screen px-6">
      {/* Filters */}
      <Card className="mb-8 rounded-xl shadow border-0">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={6}>
            <Input
              placeholder="Search destination..."
              prefix={<SearchOutlined />}
              size="large"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </Col>

          <Col xs={24} md={6}>
            <div className="text-sm text-gray-600 mb-2">
              Price: ₹{priceRange[0].toLocaleString("en-IN")} – ₹
              {priceRange[1].toLocaleString("en-IN")}
            </div>
            <Slider
              range
              min={0}
              max={maxPrice}
              step={5000}
              value={priceRange}
              onChange={setPriceRange}
            />
          </Col>
        </Row>

        {/* Categories */}
        <div className="flex flex-wrap gap-3 mt-4">
          {categories.map((cat) => (
            <Tag
              key={cat}
              color={category === cat ? "blue" : "default"}
              className="cursor-pointer px-4 py-1 rounded-full"
              onClick={() => setCategory(category === cat ? "" : cat)}
            >
              {cat}
            </Tag>
          ))}
          {category && (
            <Tag
              color="red"
              className="cursor-pointer px-3 py-1 rounded-full"
              onClick={() => setCategory("")}
            >
              Clear
            </Tag>
          )}
        </div>
      </Card>

      {/* Packages */}
      {loadings?.fetchPackages ? (
        <div className="flex justify-center py-20">
          <Spin size="large" />
        </div>
      ) : filteredPackages.length ? (
        <Row gutter={[24, 24]}>
          {filteredPackages.map((pkg) => (
            <Col xs={24} sm={12} lg={8} key={pkg._id}>
              <PackageCard pkg={pkg} />
            </Col>
          ))}
        </Row>
      ) : (
        <p className="text-center text-gray-500 py-20">No packages found.</p>
      )}
    </div>
  );
}
