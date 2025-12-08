// src/pages/DestinationManagement.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDestinations,
  createDestination,
  updateDestination,
  deleteDestination,
} from "../store/slices/destinationSlice";
import { fetchCountries } from "../store/slices/countrySlice";
import countryMetaTemplates from "./countryMetaTemplates";
import {
  Form,
  Select,
  Button,
  Table,
  Spin,
  Space,
  Popconfirm,
  Modal,
  notification,
  Input,
  Tabs,
  Tag,
  Row,
  Col,
} from "antd";

const { Option } = Select;
const { TextArea } = Input;

const DESTINATION_OPTIONS = [
  "International Trips",
  "India Trips",
  "Group Tours",
  "Honeymoon Packages",
];

// Assign colors to each trip category
const TRIP_COLORS = {
  "International Trips": "blue",
  "India Trips": "green",
  "Group Tours": "orange",
  "Honeymoon Packages": "pink",
};

const DestinationManagement = () => {
  const dispatch = useDispatch();
  const { list: destinations, loading: destLoading } = useSelector(
    (state) => state.destinations
  );
  const { list: countries, loading: countryLoading } = useSelector(
    (state) => state.countries
  );

  const [form] = Form.useForm();
  const [editId, setEditId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    dispatch(fetchDestinations());
    dispatch(fetchCountries());
  }, [dispatch]);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    form.resetFields();
    setEditId(null);
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    const payload = {
      Destination: values.Destination,
      trip: values.trip,
      country: values.country,
      type: values.type,
      description: values.description,
    };

    if (editId) {
      dispatch(updateDestination({ id: editId, ...payload }))
        .unwrap()
        .then(() => notification.success({ message: "Destination Updated" }))
        .catch((err) =>
          notification.error({
            message: "Update Failed",
            description: err.message,
          })
        );
    } else {
      dispatch(createDestination(payload))
        .unwrap()
        .then(() => notification.success({ message: "Destination Created" }))
        .catch((err) =>
          notification.error({
            message: "Create Failed",
            description: err.message,
          })
        );
    }

    closeModal();
  };

  const handleEdit = (record) => {
    setEditId(record._id);
    form.setFieldsValue({
      Destination: record.Destination,
      trip: record.trip,
      country: record.country?._id,
      type: record.type,
      description: record.description,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteDestination(id))
      .then(() => notification.success({ message: "Destination Deleted" }))
      .catch((err) =>
        notification.error({
          message: "Delete Failed",
          description: err.message,
        })
      );
  };

  // Filter destinations by active tab (trip category)
  const filteredDestinations =
    activeTab === "All"
      ? destinations
      : destinations.filter((d) => d.trip === activeTab);

  const columns = [
    { title: "Destination", dataIndex: "Destination", key: "Destination" },
    {
      title: "Trip Category",
      dataIndex: "trip",
      key: "trip",
      render: (text) => <Tag color={TRIP_COLORS[text]}>{text}</Tag>,
    },
    { title: "Country", dataIndex: ["country", "name"], key: "country" },
    { title: "Type", dataIndex: "type", key: "type" },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure?"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const loading = destLoading || countryLoading;
  const TYPE_OPTIONS = [
    { value: "city", label: "City" },
    { value: "sight", label: "Sight" },
    { value: "region", label: "Region" },
    { value: "village", label: "Village" },
    { value: "beach", label: "Beach" },
    { value: "mountain", label: "Mountain" },
    { value: "island", label: "Island" },
    { value: "historical", label: "Historical" },
    { value: "resort", label: "Resort" },
    { value: "adventure", label: "Adventure" },
    { value: "cultural", label: "Cultural" },
  ];
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Destination Management</h2>
        <Button type="primary" onClick={openModal}>
          + Add Destination
        </Button>
      </div>

      {/* Tabs Filter with Color Tags */}
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        className="mb-4"
        type="card"
      >
        <Tabs.TabPane tab={<Tag color="default">All</Tag>} key="All" />
        {DESTINATION_OPTIONS.map((dest) => (
          <Tabs.TabPane
            key={dest}
            tab={<Tag color={TRIP_COLORS[dest]}>{dest}</Tag>}
          />
        ))}
      </Tabs>

      {/* Table */}
      <div className="bg-white p-6 rounded-md shadow">
        {loading ? (
          <div className="flex justify-center py-10">
            <Spin size="large" />
          </div>
        ) : (
          <Table
            dataSource={filteredDestinations}
            columns={columns}
            rowKey="_id"
            pagination={{ pageSize: 10 }}
          />
        )}
      </div>

      {/* Modal */}
      <Modal
        title={editId ? "Edit Destination" : "Add Destination"}
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        width={900} // Increase width (default is 520)
        bodyStyle={{ maxHeight: "80vh" }}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={16}>
            {/* Destination Name */}
            <Col span={12}>
              <Form.Item
                label="Destination Name"
                name="Destination"
                rules={[{ required: true, message: "Destination is required" }]}
              >
                <Input placeholder="Enter destination name" />
              </Form.Item>
            </Col>

            {/* Trip Category */}
            <Col span={12}>
              <Form.Item
                label="Trip Category"
                name="trip"
                rules={[
                  { required: true, message: "Trip category is required" },
                ]}
              >
                <Select placeholder="Select trip category" allowClear>
                  {DESTINATION_OPTIONS.map((dest) => (
                    <Option key={dest} value={dest}>
                      {dest}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            {/* Country */}
            <Col span={12}>
              <Form.Item
                label="Country"
                name="country"
                rules={[{ required: true, message: "Country is required" }]}
              >
                <Select
                  placeholder="Select country"
                  showSearch
                  optionFilterProp="children"
                  onChange={(countryId) => {
                    const country = countries.find((c) => c._id === countryId);
                    if (country) {
                      const metaTemplate =
                        countryMetaTemplates[country.name.toLowerCase()];
                      form.setFieldsValue({
                        metaTitle: metaTemplate?.metaTitle || "",
                        metaDescription: metaTemplate?.metaDescription || "",
                      });
                    }
                  }}
                >
                  {countries.map((c) => (
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            {/* Type */}
            <Col span={12}>
              <Form.Item
                label="Type"
                name="type"
                initialValue="city"
                rules={[{ required: true, message: "Type is required" }]}
              >
                <Select
                  placeholder="Select type"
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                >
                  {TYPE_OPTIONS.map((type) => (
                    <Option key={type.value} value={type.value}>
                      {type.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            {/* Description */}
            <Col span={12}>
              <Form.Item label="Description" name="description">
                <TextArea rows={3} placeholder="Optional description" />
              </Form.Item>
            </Col>

            {/* Meta Title */}
            <Col span={12}>
              <Form.Item label="Meta Title" name="metaTitle">
                <Input placeholder="Meta Title will auto-fill based on country" />
              </Form.Item>
            </Col>

            {/* Meta Description */}
            <Col span={24}>
              <Form.Item label="Meta Description" name="metaDescription">
                <TextArea
                  rows={2}
                  placeholder="Meta Description will auto-fill based on country"
                />
              </Form.Item>
            </Col>
          </Row>

          {/* Buttons */}
          <div className="flex justify-end mt-4">
            <Button onClick={closeModal} className="mr-2">
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              {editId ? "Update" : "Create"}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default DestinationManagement;
