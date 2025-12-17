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
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  useEffect(() => {
    if (currentPackage?.Destination?.type && destinations.length) {
      const filtered = destinations.filter(
        (d) => d.type === currentPackage.Destination.type
      );
      setFilteredDestinations(filtered);
    }
  }, [currentPackage, destinations]);

  return (
    <Card title="✨ Basic Information" bordered={false}>
      {/* PACKAGE TITLE */}
      <Form.Item
        name="packageTitle"
        label="Package Title"
        rules={[{ required: true, message: "Please enter the package title" }]}
      >
        <Input placeholder="e.g., Amazing Thailand Tour" />
      </Form.Item>

      {/* 1️⃣ SELECT TYPE FIRST */}
      <Form.Item
        name="type"
        label="Type"
        rules={[{ required: true, message: "Select type" }]}
      >
        <Select
          placeholder="Select type"
          allowClear
          loading={destLoading}
          onChange={(selectedType) => {
            const filtered = destinations.filter(
              (d) => d.type === selectedType
            );
            setFilteredDestinations(filtered);

            // ✅ ONLY clear if user is creating NEW package
            if (!currentPackage) {
              form.setFieldsValue({
                Destination: null,
                tripCategory: null,
              });
            }
          }}
        >
          {[...new Set(destinations.map((d) => d.type))].map((type) => (
            <Option key={type} value={type}>
              {type}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {/* 2️⃣ NOW SELECT DESTINATION (FILTERED BY TYPE) */}
      <Form.Item
        name="Destination"
        label="Destination"
        rules={[{ required: true, message: "Select destination" }]}
      >
        <Select placeholder="Select Destination" loading={destLoading}>
          {[
            ...new Map(
              filteredDestinations.map((d) => [d.Destination, d])
            ).values(),
          ].map((d) => (
            <Option key={d._id} value={d._id}>
              {d.Destination}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {/* 3️⃣ TRIP CATEGORY (UNIQUE) */}
      <Form.Item
        name="tripCategory"
        label="Trip Category"
        rules={[{ required: true, message: "Select Trip Category" }]}
      >
        <Select
          placeholder="Select Trip Category"
          loading={destLoading}
          allowClear
        >
          {[...new Set(destinations.map((d) => d.trip))].map((trip) => (
            <Option key={trip} value={trip}>
              <Tag color={TRIP_COLORS[trip] || "default"}>{trip}</Tag>
            </Option>
          ))}
        </Select>
      </Form.Item>

      {/* IMAGE UPLOADS */}
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
            <Input placeholder="e.g., 5N - 6D" />
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
