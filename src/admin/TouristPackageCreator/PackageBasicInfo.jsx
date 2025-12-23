import React, { useEffect, useState } from "react";
import { Card, Form, Input, Select, Row, Col, Upload, Tag } from "antd";
import {
  UploadOutlined,
  PushpinOutlined,
  ClockCircleOutlined,
  DollarCircleOutlined,
  GlobalOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

const { Option } = Select;

const TRIP_COLORS = {
  "International Trips": "blue",
  "India Trips": "green",
  "Group Tours": "orange",
  "Honeymoon Packages": "pink",
  "Adventure Trips": "volcano",
  "Family Trips": "cyan",
  "Beach Holidays": "gold",
};

export default function PackageBasicInfo({
  destinations,
  destLoading,
  bannerPreview,
  cardPreview,
  setBannerPreview,
  setCardPreview,
  setBannerImage,
  setCardImage,
  form,
  currentPackage,
}) {
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);

  // Remove duplicate destinations by Destination name
  const getUniqueDestinations = (destList) => {
    const map = new Map();
    destList.forEach((d) => {
      if (!map.has(d.Destination)) {
        map.set(d.Destination, d);
      }
    });
    return [...map.values()];
  };

  // Remove duplicate trips
  const getUniqueTrips = (trips) => [...new Set(trips)];

  useEffect(() => {
    if (selectedType) {
      const filtered = destinations.filter((d) => d.type === selectedType);
      setFilteredDestinations(filtered);

      // Reset destination & trip if type changes
      form.setFieldsValue({ Destination: null, tripCategory: null });
      setSelectedDestination(null);
      setFilteredTrips([]);
    }
  }, [selectedType, destinations, form]);

  useEffect(() => {
    if (selectedDestination) {
      const filtered = destinations
        .filter((d) => d._id === selectedDestination)
        .map((d) => d.trip);
      setFilteredTrips(getUniqueTrips(filtered));

      // Reset trip category if destination changes
      form.setFieldsValue({ tripCategory: null });
    }
  }, [selectedDestination, destinations, form]);

  const uploadProps = (type) => ({
    name: "file",
    listType: "picture-card",
    accept: "image/*",
    showUploadList: false,
    beforeUpload: (file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "banner") {
          setBannerPreview(reader.result);
          setBannerImage(file);
        } else {
          setCardPreview(reader.result);
          setCardImage(file);
        }
      };
      reader.readAsDataURL(file);
      return false;
    },
  });

  return (
    <Card title="✨ Basic Information" bordered={false}>
      {/* Package Title */}
      <Form.Item
        name="packageTitle"
        label="Package Title"
        rules={[{ required: true, message: "Please enter the package title" }]}
      >
        <Input placeholder="e.g., Amazing Thailand Tour" />
      </Form.Item>

      {/* Select Type */}
      <Form.Item
        name="type"
        label="Type"
        rules={[{ required: true, message: "Select type" }]}
      >
        <Select
          placeholder="Select type"
          allowClear
          loading={destLoading}
          onChange={(value) => setSelectedType(value)}
        >
          {[...new Set(destinations.map((d) => d.type))].map((type) => (
            <Option key={type} value={type}>
              {type}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {/* Select Destination (Filtered by Type, deduplicated) */}
      <Form.Item
        name="Destination"
        label="Destination"
        rules={[{ required: true, message: "Select destination" }]}
      >
        <Select
          placeholder="Select Destination"
          loading={destLoading}
          onChange={(value) => setSelectedDestination(value)}
        >
          {getUniqueDestinations(filteredDestinations).map((d) => (
            <Option key={d._id} value={d._id}>
              {d.Destination}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {/* Trip Category (Filtered by Destination, deduplicated) */}
      <Form.Item
        name="tripCategory"
        label="Trip Category"
        rules={[{ required: true, message: "Select Trip Category" }]}
      >
        <Select placeholder="Select Trip Category" loading={destLoading}>
          {filteredTrips.map((trip) => (
            <Option key={trip} value={trip}>
              <Tag color={TRIP_COLORS[trip] || "default"}>{trip}</Tag>
            </Option>
          ))}
        </Select>
      </Form.Item>

      {/* Banner & Card Upload */}
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Banner Image (16:9)">
            <Upload {...uploadProps("banner")}>
              {bannerPreview ? (
                <img
                  src={bannerPreview}
                  alt="banner"
                  style={{ width: "100%", maxHeight: 100, objectFit: "cover" }}
                />
              ) : (
                <div style={{ padding: 20 }}>
                  <UploadOutlined />
                  <div>Upload Banner</div>
                </div>
              )}
            </Upload>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Card Image (3:2)">
            <Upload {...uploadProps("card")}>
              {cardPreview ? (
                <img
                  src={cardPreview}
                  alt="card"
                  style={{ width: "100%", maxHeight: 100, objectFit: "cover" }}
                />
              ) : (
                <div style={{ padding: 20 }}>
                  <UploadOutlined />
                  <div>Upload Card</div>
                </div>
              )}
            </Upload>
          </Form.Item>
        </Col>
      </Row>

      {/* Other Fields */}
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="pickup"
            label={
              <>
                <PushpinOutlined /> Pickup Location
              </>
            }
            rules={[{ required: true, message: "Enter pickup location" }]}
          >
            <Input placeholder="e.g., Phuket Airport" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="drop"
            label={
              <>
                <PushpinOutlined /> Drop Location
              </>
            }
            rules={[{ required: true, message: "Enter drop location" }]}
          >
            <Input placeholder="e.g., Phuket Airport" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="duration"
            label={
              <>
                <ClockCircleOutlined /> Duration
              </>
            }
            rules={[{ required: true, message: "Enter duration" }]}
          >
            <Input placeholder="e.g., 5 Nights / 6 Days" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="price"
            label={
              <>
                <DollarCircleOutlined /> Price (Per Person)
              </>
            }
            rules={[{ required: true, message: "Enter price" }]}
          >
            <Input placeholder="e.g., 75,000" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="locations"
        label={
          <>
            <GlobalOutlined /> Locations Covered
          </>
        }
      >
        <Input placeholder="e.g., Phuket - Krabi - Bangkok" />
      </Form.Item>

      <Form.Item
        name="overview"
        label={
          <>
            <FileTextOutlined /> Overview
          </>
        }
      >
        <Input.TextArea
          rows={4}
          placeholder="Describe the package overview..."
        />
      </Form.Item>
    </Card>
  );
}
