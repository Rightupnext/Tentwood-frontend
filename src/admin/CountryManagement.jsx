import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDestinations,
  deleteDestination,
  createDestination,
  updateDestination,
} from "../store/slices/destinationSlice";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Space,
  Popconfirm,
  Typography,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const { Option } = Select;
const { Title } = Typography;

const CountryManagement = () => {
  const dispatch = useDispatch();
  const { list: destinations, loading } = useSelector(
    (state) => state.destinations
  );

  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCountry, setEditingCountry] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchDestinations());
  }, [dispatch]);

  const handleSearch = (value) => setSearchText(value);

  const openModal = (country = null) => {
    setEditingCountry(country);
    if (country) {
      form.setFieldsValue(country);
    } else {
      form.resetFields();
    }
    setModalVisible(true);
  };

  const handleSubmit = async () => {
    const values = await form.validateFields();
    if (editingCountry) {
      await dispatch(updateDestination({ id: editingCountry._id, ...values }));
    } else {
      await dispatch(createDestination(values));
    }
    setModalVisible(false);
  };

  const handleDelete = async (id) => {
    await dispatch(deleteDestination({ id }));
  };

  const filteredCountries = destinations.filter(
    (c) =>
      (c.name?.toLowerCase() || "").includes(searchText.toLowerCase()) ||
      (c.region?.toLowerCase() || "").includes(searchText.toLowerCase())
  );

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => openModal(record)} />
          <Popconfirm
            title="Are you sure you want to delete this country?"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <Title level={3} className="m-0">
          Destination Management
        </Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => openModal()}
        >
          Add Country
        </Button>
      </div>

      <div className="mb-4 flex gap-2">
        <Input
          placeholder="Search by name or region..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          className="max-w-xs"
        />
      </div>

      <Table
        key={destinations.length} // forces re-render on array length change
        columns={columns}
        dataSource={[...filteredCountries]} // spread to create new array reference
        rowKey="_id"
        loading={loading}
        bordered
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title={editingCountry ? "Edit Country" : "Add Country"}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={handleSubmit}
        okText={editingCountry ? "Update" : "Create"}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            name="name"
            label="Country Name"
            rules={[{ required: true }]}
          >
            <Input placeholder="India" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CountryManagement;
