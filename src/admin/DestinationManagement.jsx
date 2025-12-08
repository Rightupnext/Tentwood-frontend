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

import {
  Form,
  Input,
  Select,
  Button,
  Table,
  Spin,
  Space,
  Popconfirm,
  Modal,
  notification,
} from "antd";

const { Option } = Select;
const { TextArea } = Input;

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

  useEffect(() => {
    dispatch(fetchDestinations());
    dispatch(fetchCountries());
  }, [dispatch]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    form.resetFields();
    setEditId(null);
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    const payload = {
      name: values.name,
      country: values.country,
      type: values.type,
      description: values.description,
    };

    if (editId) {
      dispatch(updateDestination({ id: editId, ...payload }))
        .unwrap()
        .then(() => notification.success({ message: "Destination Updated" }))
        .catch((err) =>
          notification.error({ message: "Update Failed", description: err.message })
        );
    } else {
      dispatch(createDestination(payload))
        .unwrap()
        .then(() => notification.success({ message: "Destination Created" }))
        .catch((err) =>
          notification.error({ message: "Create Failed", description: err.message })
        );
    }

    closeModal();
  };

  const handleEdit = (record) => {
    setEditId(record._id);
    form.setFieldsValue({
      name: record.name,
      country: record.country?._id,
      type: record.type,
      description: record.description,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteDestination(id))
      .unwrap()
      .then(() => notification.success({ message: "Destination Deleted" }))
      .catch((err) =>
        notification.error({ message: "Delete Failed", description: err.message })
      );
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
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

  return (
    <div className="p-6">

      {/* Title */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Destination Management</h2>

        <Button type="primary" onClick={openModal}>
          + Add Destination
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white p-6 rounded-md shadow">
        {loading ? (
          <div className="flex justify-center py-10">
            <Spin size="large" />
          </div>
        ) : (
          <Table
            dataSource={destinations}
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
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Destination Name"
            name="name"
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input placeholder="Enter destination name" />
          </Form.Item>

          <Form.Item
            label="Country"
            name="country"
            rules={[{ required: true, message: "Country is required" }]}
          >
            <Select placeholder="Select country" showSearch optionFilterProp="children">
              {countries.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Type"
            name="type"
            initialValue="city"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="city">City</Option>
              <Option value="sight">Sight</Option>
              <Option value="region">Region</Option>
              <Option value="village">Village</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Description" name="description">
            <TextArea rows={3} placeholder="Optional description" />
          </Form.Item>

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
