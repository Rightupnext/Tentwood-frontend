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
import {
  createPackage,
  fetchPackageById,
  updatePackage,
} from "../../store/slices/packageSlice";

// Child Components
import PackageBasicInfo from "./PackageBasicInfo";
import PackageHighlights from "./PackageHighlights";
import PackageItinerary from "./PackageItinerary";
import PackageInclusions from "./PackageInclusions";
import PackageEssentials from "./PackageEssentials";
import PackageGallery from "./PackageGallery";
import { useNavigate, useParams } from "react-router-dom";

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
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list: destinations, loading: destLoading } = useSelector(
    (state) => state.destinations
  );
  const { selected: currentPackage, loading: packageLoading } = useSelector(
    (state) => state.packages
  );
  const [activeSection, setActiveSection] = useState("basic");
  const [form] = Form.useForm();
  const [gallery, setGallery] = useState([]);
  const [bannerImage, setBannerImage] = useState(null);
  const [cardImage, setCardImage] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [cardPreview, setCardPreview] = useState(null);
  // In TouristPackageCreator.jsx
  const [removedGalleryIds, setRemovedGalleryIds] = useState([]);

  useEffect(() => {
    if (id) {
      dispatch(fetchPackageById({ id }));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (!currentPackage) return;

    form.setFieldsValue({
      packageTitle: currentPackage.packageTitle,
      pickup: currentPackage.pickup,
      drop: currentPackage.drop,
      duration: currentPackage.durationDays,
      locations: currentPackage.locations,
      overview: currentPackage.overview,
      price: currentPackage.price,
      Destination: currentPackage.Destination?._id,
      tripCategory: currentPackage?.Destination?.trip,
      type: currentPackage.Destination?.type,

      highlights: currentPackage.highlights?.length
        ? currentPackage.highlights
        : [""],

      inclusions: currentPackage.inclusions?.length
        ? currentPackage.inclusions
        : [""],

      exclusions: currentPackage.exclusions?.length
        ? currentPackage.exclusions
        : [""],

      notes: currentPackage.notes?.length ? currentPackage.notes : [""],

      travelEssentials: {
        mustCarry: currentPackage.travelEssentials?.mustCarry || [""],
        gears: currentPackage.travelEssentials?.gears || [""],
        clothes: currentPackage.travelEssentials?.clothes || [""],
        footwear: currentPackage.travelEssentials?.footwear || [""],
        medication: currentPackage.travelEssentials?.medication || [""],
        personalAccessories: currentPackage.travelEssentials
          ?.personalAccessories || [""],
      },

      itinerary: currentPackage.itinerary?.map((day) => ({
        dayTitle: day.title,
        summary: day.summary,
        details: day.details,
        activities: day.optionalActivities?.length
          ? day.optionalActivities
          : [""],
        meals: day.meals,
      })) || [{ dayTitle: "", activities: [""] }],
    });

    // Media previews
    if (currentPackage.heroMedia) {
      setBannerPreview(
        import.meta.env.VITE_BACKEND_URL + currentPackage.heroMedia.fileUrl
      );
    }

    if (currentPackage.cardMedia) {
      setCardPreview(
        import.meta.env.VITE_BACKEND_URL + currentPackage.cardMedia.fileUrl
      );
    }

    if (currentPackage.gallery?.length) {
      setGallery(
        currentPackage.gallery.map((img) => ({
          uid: img._id,
          url: import.meta.env.VITE_BACKEND_URL + img.fileUrl,
          status: "done",
          isExisting: true,
        }))
      );
    }
  }, [currentPackage, form]);
  useEffect(() => {
    dispatch(fetchDestinations());
  }, [dispatch]);

  const handleSave = async () => {
    try {
      await form.validateFields();
      const allValues = form.getFieldsValue(true);

      const formData = new FormData();

      // Append regular fields
      Object.keys(allValues).forEach((key) => {
        if (allValues[key] !== undefined && key !== "gallery") {
          // If field is object or array, stringify it
          if (typeof allValues[key] === "object") {
            formData.append(key, JSON.stringify(allValues[key]));
          } else {
            formData.append(key, allValues[key]);
          }
        }
      });

      // Append banner & card images
      if (bannerImage) formData.append("bannerImage", bannerImage);
      if (cardImage) formData.append("cardImage", cardImage);

      // Append gallery images
      gallery.forEach((item) => {
        formData.append("gallery", item.file); // ✅ only file objects
      });
      // ✅ removed gallery images
      if (removedGalleryIds.length) {
        formData.append("removedGallery", JSON.stringify(removedGalleryIds));
      }
      // Dispatch
      if (id) {
        await dispatch(updatePackage({ id: id, data: formData }));
        // navigate("/admin/package");
      } else {
        await dispatch(createPackage({ data: formData }));
        navigate("/admin/package");
      }
    } catch (err) {
      console.log("Validation Failed:", err);
      message.error("Please fill required fields!");
    }
  };
  const handleReset = () => {
    if (id && currentPackage) {
      // 🔁 Reset back to existing package values (EDIT MODE)
      form.resetFields();
      setRemovedGalleryIds([]);

      // Reset previews
      setBannerPreview(
        currentPackage.heroMedia
          ? import.meta.env.VITE_BACKEND_URL + currentPackage.heroMedia.fileUrl
          : null
      );

      setCardPreview(
        currentPackage.cardMedia
          ? import.meta.env.VITE_BACKEND_URL + currentPackage.cardMedia.fileUrl
          : null
      );

      // Reset gallery
      setGallery(
        currentPackage.gallery?.map((img) => ({
          uid: img._id,
          url: import.meta.env.VITE_BACKEND_URL + img.fileUrl,
          status: "done",
          isExisting: true,
        })) || []
      );

      setBannerImage(null);
      setCardImage(null);
    } else {
      // 🧹 Completely reset (CREATE MODE)
      form.resetFields();
      setGallery([]);
      setBannerImage(null);
      setCardImage(null);
      setBannerPreview(null);
      setCardPreview(null);
      setRemovedGalleryIds([]);
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
    {
      id: "packageGallery",
      label: "packageGallery",
      icon: <ContainerOutlined />,
    },
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
        <Button danger onClick={handleReset}>
          Reset
        </Button>
        <Button
          type="primary"
          icon={<SaveOutlined />}
          onClick={handleSave}
          style={{
            backgroundColor: id ? "#fa8c16" : "#52c41a", // orange : green
            borderColor: id ? "#fa8c16" : "#52c41a",
          }}
        >
          {id ? "Update Package" : "Save Package"}
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
                currentPackage={currentPackage}
              />
            )}
            {activeSection === "highlights" && <PackageHighlights />}
            {activeSection === "itinerary" && <PackageItinerary />}
            {activeSection === "inclusions" && <PackageInclusions />}
            {activeSection === "essentials" && <PackageEssentials />}
            {activeSection === "packageGallery" && (
              <PackageGallery
                gallery={gallery}
                setGallery={setGallery}
                currentPackage={currentPackage}
                setRemovedGalleryIds={setRemovedGalleryIds}
              />
            )}
          </div>
        </div>
      </Form>
    </div>
  );
}
