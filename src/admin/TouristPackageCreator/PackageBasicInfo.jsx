import React from "react";
import { Card, Form, Input, Select, Row, Col, Upload } from "antd";
import {
  UploadOutlined,
  PushpinOutlined,
  ClockCircleOutlined,
  DollarCircleOutlined,
  GlobalOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

const { Option } = Select;

export default function PackageBasicInfo({
  destinations,
  destLoading,
  bannerPreview,
  cardPreview,
  setBannerPreview,
  setCardPreview,
  setBannerImage,
  setCardImage,
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
          setBannerImage(file); // ✅ this is correct
        } else {
          setCardPreview(reader.result);
          setCardImage(file); // ✅ this is correct
        }
      };
      reader.readAsDataURL(file);
      return false; // prevent auto upload
    },
  });

  return (
    <Card title="✨ Basic Information" bordered={false}>
      <Form.Item
        name="packageTitle"
        label="Package Title"
        rules={[{ required: true, message: "Please enter the package title" }]}
      >
        <Input placeholder="e.g., Amazing Thailand Tour" />
      </Form.Item>

      <Form.Item
        name="Destination"
        label="Destination"
        rules={[{ required: true, message: "Destination is required" }]}
      >
        <Select
          placeholder="Select destination"
          loading={destLoading}
          allowClear
        >
          {destinations?.map((d) => (
            <Option key={d._id} value={d._id}>
              {d.Destination}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Banner Image (16:9)">
            <Upload {...uploadProps("banner")}>
              {bannerPreview ? (
                <img
                  src={bannerPreview}
                  alt="Banner"
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
                  alt="Card"
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
                <DollarCircleOutlined /> Price
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
