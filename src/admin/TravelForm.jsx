import React, { useEffect, useState } from "react";
import {
  Layout,
  Menu,
  Button,
  Form,
  Input,
  Upload,
  message,
  Card,
  Row,
  Col,
  Space,
  List,
  Typography,
  Select,
} from "antd";
import {
  SaveOutlined,
  PlusOutlined,
  DeleteOutlined,
  UploadOutlined,
  StarOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ContainerOutlined,
  GlobalOutlined,
  DollarCircleOutlined,
  ClockCircleOutlined,
  PushpinOutlined,
  FileTextOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { fetchDestinations } from "../store/slices/destinationSlice";
import { useDispatch, useSelector } from "react-redux";
const { Header, Content } = Layout;
const { Option } = Select;
const { Title, Text } = Typography;

// Initial state structure for Antd's Form.List, which expects arrays of objects/strings.
const initialValues = {
  packageTitle: "",
  pickup: "",
  drop: "",
  duration: "",
  locations: "",
  overview: "",
  price: "",
  highlights: [""], // Initialize with one empty field
  itinerary: [{ dayTitle: "", activities: [""] }], // Initialize with Day 1
  inclusions: [""],
  exclusions: [""],
  notes: [""],
  travelEssentials: {
    mustCarry: [""],
    gears: [""],
    clothes: [""],
    footwear: [""],
    medication: [""],
    personalAccessories: [""],
  },
};

export default function TouristPackageCreator() {
  const dispatch = useDispatch();
  const { list: destinations, loading: destLoading } = useSelector(
    (state) => state.destinations
  );
  console.log("destinations", destinations);
  const [activeSection, setActiveSection] = useState("basic");
  const [form] = Form.useForm(); // Antd form instance

  // Local state for non-form elements (Images)
  const [bannerImage, setBannerImage] = useState(null);
  const [cardImage, setCardImage] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [cardPreview, setCardPreview] = useState(null);
  useEffect(() => {
  if (destinations.length === 0) {
    dispatch(fetchDestinations());
  }
}, [dispatch, destinations.length]);


  const handleMenuClick = (e) => {
    setActiveSection(e.key);
  };

  // Image Upload Handler
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
      message.success(`${file.name} image selected for preview`);
      return false; // Prevent automatic upload
    },
  });

  const handleSave = async () => {
    try {
      await form.validateFields(); // validates only visible tab
      const allValues = form.getFieldsValue(true); // gets ALL TAB DATA

      const finalData = {
        ...allValues,
        bannerImage,
        cardImage,
      };

      console.log("FINAL FULL PACKAGE DATA:", finalData);
      message.success("Package saved successfully!");
    } catch (error) {
      console.log("Validation Failed:", error);
      message.error("Please fill required fields!");
    }
  };

  const sections = [
    { id: "basic", label: "Basic Info", icon: <StarOutlined /> },
    { id: "highlights", label: "Highlights", icon: <StarOutlined /> },
    { id: "itinerary", label: "Itinerary", icon: <CalendarOutlined /> },
    {
      id: "inclusions",
      label: "Inclusions/Exclusions",
      icon: <CheckCircleOutlined />,
    },
    { id: "essentials", label: "Essentials", icon: <ContainerOutlined /> },
  ];

  // Helper function for rendering an Array-based list section using Form.List
  const renderListSection = (name, title, icon, placeholder) => (
    <Card
      title={
        <>
          {icon} {title}
        </>
      }
      bordered={false}
      style={{ borderRadius: "8px" }}
    >
      <Form.List name={name}>
        {(fields, { add, remove }) => (
          <>
            <List
              dataSource={fields}
              renderItem={({ key, name: fieldName, ...restField }) => (
                <List.Item
                  key={key}
                  actions={[
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => remove(fieldName)}
                    />,
                  ]}
                >
                  <Form.Item
                    {...restField}
                    name={fieldName}
                    style={{ flex: 1, margin: 0 }}
                    rules={[
                      {
                        required: true,
                        message: `Please enter a ${name.slice(0, -1)}`,
                      },
                    ]}
                  >
                    <Input placeholder={placeholder} />
                  </Form.Item>
                </List.Item>
              )}
            />
            <Button
              type="dashed"
              onClick={() => add()}
              block
              icon={<PlusOutlined />}
              style={{ marginTop: 16 }}
            >
              Add {title.split(" ")[0]}
            </Button>
          </>
        )}
      </Form.List>
    </Card>
  );

  // Ant Design Layout
  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
      {/* Header */}
      <Header
        style={{
          background: "#fff",
          padding: "0 24px",
          boxShadow: "0 1px 4px rgba(0, 21, 41, 0.08)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Title level={3} style={{ margin: 0, color: "#1890ff" }}>
            Create Tourist Package ✈️
          </Title>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            size="large"
            onClick={handleSave}
          >
            Save Package
          </Button>
        </div>
      </Header>

      <Layout
        style={{
          maxWidth: "1200px",
          margin: "24px auto",
          background: "#f0f2f5",
          display: "flex",
          flexDirection: "row",
        }}
      >
        {/* Section Navigation (Left Sidebar) */}
        <Menu
          mode="inline"
          selectedKeys={[activeSection]}
          onClick={handleMenuClick}
          style={{
            width: 200,
            marginRight: 10,
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.09)",
            flexShrink: 0,
          }}
        >
          {sections.map((section) => (
            <Menu.Item key={section.id} icon={section.icon}>
              {section.label}
            </Menu.Item>
          ))}
        </Menu>

        {/* Content Area */}
        <Content style={{ minWidth: 1000, flex: 1 }}>
          <Form form={form} layout="vertical" initialValues={initialValues}>
            {/* Basic Information */}
            {activeSection === "basic" && (
              <Card
                title="✨ Basic Information"
                bordered={false}
                style={{ borderRadius: "8px" }}
              >
                <Form.Item
                  label="Package Title"
                  name="packageTitle"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the package title",
                    },
                  ]}
                >
                  <Input placeholder="e.g., Fantastic Thailand Vacation" />
                </Form.Item>
                <Form.Item
                  label="Destination"
                  name="Destination"
                  rules={[
                    { required: true, message: "Destination is required" },
                  ]}
                >
                  <Select
                    placeholder="Select destination"
                    allowClear
                    loading={destLoading}
                  >
                    {destinations?.map((dest) => (
                      <Option key={dest._id} value={dest._id}>
                        {dest.Destination}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Banner Image (16:9 recommended)" required>
                      <Upload {...uploadProps("banner")}>
                        {bannerPreview ? (
                          <img
                            src={bannerPreview}
                            alt="Banner Preview"
                            style={{
                              width: "100%",
                              maxHeight: "100px",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              paddingTop: "20px",
                              paddingBottom: "20px",
                            }}
                          >
                            <UploadOutlined />
                            <div style={{ marginTop: 8 }}>Upload Banner</div>
                          </div>
                        )}
                      </Upload>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Card Image (3:2 recommended)" required>
                      <Upload {...uploadProps("card")}>
                        {cardPreview ? (
                          <img
                            src={cardPreview}
                            alt="Card Preview"
                            style={{
                              width: "100%",
                              maxHeight: "100px",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              paddingTop: "20px",
                              paddingBottom: "20px",
                            }}
                          >
                            <UploadOutlined />
                            <div style={{ marginTop: 8 }}>Upload Card</div>
                          </div>
                        )}
                      </Upload>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label={
                        <>
                          <PushpinOutlined /> Pickup Location
                        </>
                      }
                      name="pickup"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the pickup location",
                        },
                      ]}
                    >
                      <Input placeholder="e.g., Phuket Airport" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label={
                        <>
                          <PushpinOutlined /> Drop Location
                        </>
                      }
                      name="drop"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the drop location",
                        },
                      ]}
                    >
                      <Input placeholder="e.g., Phuket Airport" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label={
                        <>
                          <ClockCircleOutlined /> Duration
                        </>
                      }
                      name="duration"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the duration",
                        },
                      ]}
                    >
                      <Input placeholder="e.g., 6N - 7D" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label={
                        <>
                          <DollarCircleOutlined /> Price (₹)
                        </>
                      }
                      name="price"
                      rules={[
                        { required: true, message: "Please enter the price" },
                      ]}
                    >
                      <Input placeholder="e.g., 74,999" />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  label={
                    <>
                      <GlobalOutlined /> Locations Covered
                    </>
                  }
                  name="locations"
                >
                  <Input placeholder="e.g., Phuket - Krabi - Koh Phangan" />
                </Form.Item>

                <Form.Item
                  label={
                    <>
                      <FileTextOutlined /> Overview
                    </>
                  }
                  name="overview"
                >
                  <Input.TextArea
                    rows={4}
                    placeholder="Describe the package overview..."
                  />
                </Form.Item>
              </Card>
            )}

            {/* Highlights (Using renderListSection helper) */}
            {activeSection === "highlights" &&
              renderListSection(
                "highlights",
                "Highlights",
                <StarOutlined />,
                "Enter key highlight (e.g., Phi Phi Island Tour)"
              )}

            {/* Itinerary (Refactored to use Form.List for days and nested Form.List for activities) */}
            {activeSection === "itinerary" && (
              <Card
                title="📅 Itinerary"
                bordered={false}
                style={{ borderRadius: "8px" }}
              >
                <Form.List name="itinerary">
                  {(days, { add: addDay, remove: removeDay }) => (
                    <Space
                      direction="vertical"
                      style={{ width: "100%" }}
                      size="middle"
                    >
                      {days.map(
                        (
                          {
                            key: dayKey,
                            name: dayName,
                            fieldKey: dayFieldKey,
                            ...restDayField
                          },
                          index
                        ) => (
                          <Card
                            key={dayKey}
                            title={`Day ${index + 1}`}
                            extra={
                              <Button
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() => removeDay(dayName)}
                              >
                                Remove Day
                              </Button>
                            }
                            style={{ border: "1px solid #1890ff1f" }}
                          >
                            <Form.Item
                              {...restDayField}
                              name={[dayName, "dayTitle"]}
                              fieldKey={[dayFieldKey, "dayTitle"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter a Day Title",
                                },
                              ]}
                              style={{ marginBottom: 16 }}
                            >
                              <Input placeholder="Day Title (e.g., Arrival at Phuket & Check-in)" />
                            </Form.Item>

                            <Title level={5} style={{ marginTop: 0 }}>
                              Activities:
                            </Title>
                            <Form.List name={[dayName, "activities"]}>
                              {(
                                activities,
                                { add: addActivity, remove: removeActivity }
                              ) => (
                                <>
                                  <List
                                    dataSource={activities}
                                    renderItem={({
                                      key: actKey,
                                      name: actName,
                                      fieldKey: actFieldKey,
                                      ...restActivityField
                                    }) => (
                                      <List.Item
                                        key={actKey}
                                        actions={[
                                          <Button
                                            type="text"
                                            danger
                                            icon={<DeleteOutlined />}
                                            onClick={() =>
                                              removeActivity(actName)
                                            }
                                          />,
                                        ]}
                                        style={{ padding: 0 }}
                                      >
                                        <Form.Item
                                          {...restActivityField}
                                          name={actName}
                                          fieldKey={actFieldKey}
                                          rules={[
                                            {
                                              required: true,
                                              message:
                                                "Please enter an activity",
                                            },
                                          ]}
                                          style={{ flex: 1, margin: 0 }}
                                        >
                                          <Input.TextArea
                                            rows={2}
                                            placeholder="Activity description"
                                          />
                                        </Form.Item>
                                      </List.Item>
                                    )}
                                  />
                                  <Button
                                    type="dashed"
                                    size="small"
                                    icon={<PlusOutlined />}
                                    onClick={() => addActivity()}
                                    style={{ marginTop: 8 }}
                                  >
                                    Add Activity
                                  </Button>
                                </>
                              )}
                            </Form.List>
                          </Card>
                        )
                      )}
                      <Button
                        type="primary"
                        onClick={() =>
                          addDay({ dayTitle: "", activities: [""] })
                        } // Add a day with one default empty activity
                        block
                        icon={<PlusOutlined />}
                        style={{ marginTop: 16 }}
                      >
                        Add Day
                      </Button>
                    </Space>
                  )}
                </Form.List>
              </Card>
            )}

            {/* Inclusions & Exclusions */}
            {activeSection === "inclusions" && (
              <Space
                direction="vertical"
                style={{ width: "100%" }}
                size="large"
              >
                {renderListSection(
                  "inclusions",
                  "Inclusions",
                  <CheckCircleOutlined />,
                  "Enter inclusion (e.g., Flight tickets)"
                )}

                {renderListSection(
                  "exclusions",
                  "Exclusions",
                  <CloseCircleOutlined />,
                  "Enter exclusion (e.g., Visa fees)"
                )}

                {renderListSection(
                  "notes",
                  "Important Notes",
                  <WarningOutlined />,
                  "Enter an important note or warning"
                )}
              </Space>
            )}

            {/* Travel Essentials */}
            {activeSection === "essentials" && (
              <Space
                direction="vertical"
                style={{ width: "100%" }}
                size="large"
              >
                {/* Iterate over the travelEssentials keys to create sections */}
                {Object.keys(initialValues.travelEssentials).map((category) => (
                  <Card
                    key={category}
                    title={`🎒 ${category.replace(/([A-Z])/g, " $1").trim()}`}
                    bordered={false}
                    style={{ borderRadius: "8px" }}
                  >
                    <Form.List name={["travelEssentials", category]}>
                      {(fields, { add, remove }) => (
                        <>
                          <List
                            dataSource={fields}
                            renderItem={({
                              key,
                              name: fieldName,
                              ...restField
                            }) => (
                              <List.Item
                                key={key}
                                actions={[
                                  <Button
                                    type="text"
                                    danger
                                    icon={<DeleteOutlined />}
                                    onClick={() => remove(fieldName)}
                                  />,
                                ]}
                              >
                                <Form.Item
                                  {...restField}
                                  name={fieldName}
                                  rules={[
                                    {
                                      required: true,
                                      message: `Please enter a ${category} item`,
                                    },
                                  ]}
                                  style={{ flex: 1, margin: 0 }}
                                >
                                  <Input
                                    placeholder={`Enter ${category
                                      .replace(/([A-Z])/g, " $1")
                                      .trim()} item`}
                                  />
                                </Form.Item>
                              </List.Item>
                            )}
                          />
                          <Button
                            type="dashed"
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                            style={{ marginTop: 16 }}
                          >
                            Add Item
                          </Button>
                        </>
                      )}
                    </Form.List>
                  </Card>
                ))}
              </Space>
            )}
          </Form>
        </Content>
      </Layout>
    </Layout>
  );
}
