import React, { useEffect, useState } from "react";
import { Layout, Menu, Button, Typography, message } from "antd";
import {
  SaveOutlined,
  StarOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  ContainerOutlined,
} from "@ant-design/icons";
import { Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchDestinations } from "../../store/slices/destinationSlice";
import { createPackage, updatePackage } from "../../store/slices/packageSlice";

// Child Components
import PackageBasicInfo from "./PackageBasicInfo";
import PackageHighlights from "./PackageHighlights";
import PackageItinerary from "./PackageItinerary";
import PackageInclusions from "./PackageInclusions";
import PackageEssentials from "./PackageEssentials";

const { Header, Content } = Layout;
const { Title } = Typography;

const initialValues = {
  packageTitle: "",
  pickup: "",
  drop: "",
  duration: "",
  locations: "",
  overview: "",
  price: "",
  highlights: [""],
  itinerary: [{ dayTitle: "", activities: [""] }],
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

  const [activeSection, setActiveSection] = useState("basic");
  const [form] = Form.useForm();

  const [bannerImage, setBannerImage] = useState(null);
  const [cardImage, setCardImage] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [cardPreview, setCardPreview] = useState(null);

  useEffect(() => {
    dispatch(fetchDestinations());
  }, []);

  const handleSave = async () => {
    try {
      await form.validateFields(); // validates only visible tab
      const allValues = form.getFieldsValue(true); // gets ALL TAB DATA

      const finalData = {
        ...allValues,
        bannerImage,
        cardImage,
      };
      // Now send images separately using FormData
      const imageData = new FormData();
      if (bannerImage) imageData.append("bannerImage", bannerImage);
      if (cardImage) imageData.append("cardImage", cardImage);

      // Dispatch action (make sure backend expects FormData)
      await dispatch(createPackage(finalData));
      console.log("FINAL FULL PACKAGE DATA:", finalData);
      // message.success("Package saved successfully!");
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

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "16px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <Title level={3} style={{ margin: 0, color: "#1890ff" }}>
          Create Tourist Package ✈️
        </Title>
        <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>
          Save Package
        </Button>
      </div>

      <Form form={form} layout="vertical" initialValues={initialValues}>
        <div style={{ display: "flex", gap: 16 }}>
          {/* Sidebar Menu */}
          <Menu
            mode="inline"
            selectedKeys={[activeSection]}
            onClick={(e) => setActiveSection(e.key)}
            style={{ width: 220 }}
          >
            {sections.map((s) => (
              <Menu.Item key={s.id} icon={s.icon}>
                {s.label}
              </Menu.Item>
            ))}
          </Menu>

          {/* Content */}
          <div style={{ flex: 1 }}>
            {activeSection === "basic" && (
              <PackageBasicInfo
                destinations={destinations}
                destLoading={destLoading}
                bannerPreview={bannerPreview}
                cardPreview={cardPreview}
                setBannerPreview={setBannerPreview}
                setCardPreview={setCardPreview}
                setBannerImage={setBannerImage}
                setCardImage={setCardImage}
                form={form}
              />
            )}
            {activeSection === "highlights" && <PackageHighlights />}
            {activeSection === "itinerary" && <PackageItinerary />}
            {activeSection === "inclusions" && <PackageInclusions />}
            {activeSection === "essentials" && <PackageEssentials />}
          </div>
        </div>
      </Form>
    </div>
  );
}
