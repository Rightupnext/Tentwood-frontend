import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCountries,
  createCountry,
  updateCountry,
  deleteCountry,
} from "../store/slices/countrySlice";
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
  const { list: countries, loading } = useSelector((state) => state.countries);

  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCountry, setEditingCountry] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchCountries());
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
      await dispatch(updateCountry({ id: editingCountry._id, ...values }));
    } else {
      await dispatch(createCountry(values));
    }
    setModalVisible(false);
  };

  const handleDelete = async (id) => {
    await dispatch(deleteCountry({ id }));
  };

  const filteredCountries = countries.filter(
    (c) =>
      (c.name?.toLowerCase() || "").includes(searchText.toLowerCase()) ||
      (c.region?.toLowerCase() || "").includes(searchText.toLowerCase())
  );

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "ISO2", dataIndex: "iso2", key: "iso2" },
    { title: "ISO3", dataIndex: "iso3", key: "iso3" },
    { title: "Currency", dataIndex: "currency", key: "currency" },
    { title: "Region", dataIndex: "region", key: "region" },
    {
      title: "Languages",
      dataIndex: "languages",
      key: "languages",
      render: (langs) => langs?.join(", "),
    },
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
          Country Management
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
        key={countries.length} // forces re-render on array length change
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
          <Form.Item name="iso2" label="ISO2" rules={[{ required: true }]}>
            <Input placeholder="IN" maxLength={2} />
          </Form.Item>
          <Form.Item name="iso3" label="ISO3">
            <Input placeholder="IND" maxLength={3} />
          </Form.Item>
          <Form.Item
            name="currency"
            label="Currency"
            rules={[{ required: true }]}
          >
            <Input placeholder="INR" />
          </Form.Item>
          <Form.Item name="region" label="Region">
            <Select placeholder="Select Region" allowClear>
              <Option value="Asia">Asia</Option>
              <Option value="Europe">Europe</Option>
              <Option value="Africa">Africa</Option>
              <Option value="Americas">Americas</Option>
            </Select>
          </Form.Item>
          <Form.Item name="languages" label="Languages (comma separated)">
            <Input
              placeholder="English,Hindi"
              onChange={(e) => {
                const value = e.target.value;
                form.setFieldValue(
                  "languages",
                  value.split(",").map((v) => v.trim())
                );
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CountryManagement;
