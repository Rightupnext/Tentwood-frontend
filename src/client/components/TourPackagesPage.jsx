import React, { useEffect, useState } from "react";
import { Card, Button, Carousel } from "antd";
import {
  ClockCircleOutlined,
  StarOutlined,
  StarFilled,
  CarOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import india_img from "../../assets/india.jpg";
import honey_img from "../../assets/honeymoon.jpg";
import group_img from "../../assets/group.jpg";
import international_img from "../../assets/international.jpg";
import { fetchPackages } from "../../store/slices/packageSlice";

// --------- TRIP ROUTES & CATEGORY ---------
const TRIP_ROUTE_MAP = {
  "India Trips": "india-trips",
  "International Trips": "international-trips",
  "Honeymoon Packages": "honeymoon-packages",
  "Group Tours": "group-tours",
};

const CATEGORY_MAP = {
  "group-tours": "Group Tours",
  "india-trips": "India Trips",
  "international-trips": "International Trips",
  "honeymoon-packages": "Honeymoon Packages",
};

// --------- TourCard Component ---------
const TourCard = ({ t, i }) => {
  const navigate = useNavigate();
  const [hov, setHov] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const location = useLocation();
  const routeSlug = location.pathname.split("/")[1];

  const activeCategory = CATEGORY_MAP[routeSlug] || t?.tripCategories?.[0];

  const handleNavigate = (a) => {
    const tripPrefix = TRIP_ROUTE_MAP[a?.tripCategories?.[0]];
    if (!tripPrefix) return;
    navigate(`/${tripPrefix}/${a?.Destination?.name}/${a?.packageTitle}`, {
      state: { id: a?._id },
    });
  };

  const rating = parseFloat((Math.random() * (5 - 3.5) + 3.5).toFixed(1));
  const reviews = Math.floor(Math.random() * (500 - 50) + 50);

  return (
    <div
      className="tour-card flex-shrink-0 bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 group cursor-pointer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ animation: `fadeInUp 0.6s ease-out ${i * 100}ms both` }}
    >
      <div className="relative h-48 sm:h-52 md:h-56 w-full overflow-hidden bg-gray-200">
        {!imgLoaded && (
          <div
            className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
            style={{
              animation: "shimmer 2s infinite",
              backgroundSize: "200% 100%",
            }}
          />
        )}

        <img
          src={`${import.meta.env.VITE_BACKEND_URL}${t?.cardMedia?.fileUrl}`}
          alt={t.packageTitle}
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 ${
            imgLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          } group-hover:scale-110`}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-xl transform transition-all duration-300 group-hover:scale-110">
          <StarOutlined className="text-xs" />
          {activeCategory}
        </div>

        {hov && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={() => handleNavigate(t)}
              className="bg-white/95 cursor-pointer backdrop-blur-sm px-6 py-3 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 shadow-2xl"
            >
              <span className="text-sm font-bold text-gray-900">
                View Details →
              </span>
            </button>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-teal-600 transition-colors duration-300 text-base min-h-[3rem]">
          {t.packageTitle}
        </h3>

        <div className="space-y-2.5 text-sm text-gray-600">
          <div className="flex items-center gap-2 transform transition-transform duration-300 group-hover:translate-x-1">
            <ClockCircleOutlined className="text-teal-600" />
            <span>Duration {t.durationDays}</span>
          </div>
          <div className="flex items-center gap-2 transform transition-transform duration-300 group-hover:translate-x-1">
            <CarOutlined className="text-teal-600" />
            <span>Transport Facility</span>
          </div>
          <div className="flex items-center gap-2 transform transition-transform duration-300 group-hover:translate-x-1">
            <TeamOutlined className="text-teal-600" />
            <span>Family Plan</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-4">
          <div>
            <div className="flex items-center gap-1 mb-1">
              {[...Array(5)].map((_, idx) => {
                if (idx + 1 <= rating) {
                  return (
                    <StarFilled key={idx} className="text-sm text-yellow-400" />
                  );
                } else if (idx + 0.5 <= rating) {
                  return (
                    <StarFilled key={idx} className="text-sm text-yellow-200" />
                  );
                } else {
                  return (
                    <StarOutlined key={idx} className="text-sm text-gray-300" />
                  );
                }
              })}
              <span className="ml-2 text-sm">{rating}</span>
            </div>
            <span className="text-xs text-gray-500">{reviews} reviews</span>
          </div>

          <div className="text-right">
            <div className="text-2xl font-bold text-teal-600 group-hover:scale-110 transition-transform duration-300">
              ₹{t.price?.toLocaleString("en-IN")}
            </div>
            <div className="text-xs text-gray-500">per person</div>
          </div>
        </div>
      </div>

      <div className="h-1 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </div>
  );
};

// --------- TourPackagesPage Component ---------
const TourPackagesPage = ({ slide = true }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tripType, destination } = useParams();
  const packages = useSelector((state) => state.packages.list || []);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [relatedPackages, setRelatedPackages] = useState([]);
  const [bannerImages, setBannerImages] = useState([]);
  const selectedCategoryLabel = CATEGORY_MAP[tripType] || "";

  useEffect(() => {
    dispatch(fetchPackages());
  }, [dispatch]);

  useEffect(() => {
    if (!packages.length) return;

    const selectedCategory = CATEGORY_MAP[tripType];

    const normalize = (str) => str?.toLowerCase().replace(/\s+/g, "-").trim();

    const main = packages.filter(
      (pkg) =>
        pkg.tripCategories?.some(
          (cat) => normalize(cat) === normalize(selectedCategory)
        ) && normalize(pkg.Destination?.name) === normalize(destination)
    );

    const related = packages.filter(
      (pkg) =>
        normalize(pkg.Destination?.name) === normalize(destination) &&
        !pkg.tripCategories?.some(
          (cat) => normalize(cat) === normalize(selectedCategory)
        )
    );

    setFilteredPackages(main);
    setRelatedPackages(related);

    // --------- Hero Images ---------
    const heroImages = main
      .map((pkg) => {
        // Use the first gallery image only
        if (pkg?.gallery?.length > 0) {
          let filePath = pkg.gallery[0].fileUrl;
          if (!filePath.startsWith("/")) filePath = "/" + filePath;
          return `${import.meta.env.VITE_BACKEND_URL}${filePath}`;
        }
        return null; // skip if no gallery
      })
      .filter(Boolean) // remove nulls
      .slice(0, 5); // limit to 5 slides

    console.log("heroImages", heroImages);
    if (heroImages.length > 0) {
      setBannerImages(heroImages);
    } else {
      const TRIP_BANNER_MAP = {
        "india-trips": india_img,
        "international-trips": international_img,
        "honeymoon-packages": honey_img,
        "group-tours": group_img,
      };
      setBannerImages([TRIP_BANNER_MAP[tripType] || india_img]);
    }
  }, [packages, tripType, destination]);

  const getMinimumPrice = () => {
    if (!filteredPackages.length) return null;
    const prices = filteredPackages
      .map((pkg) => Number(pkg.price))
      .filter((p) => !isNaN(p) && p > 0);
    return prices.length ? Math.min(...prices) : null;
  };
  const formatPrice = (price) => price?.toLocaleString("en-IN");

  const getPageTitle = () =>
    destination
      ? `Best ${
          destination.charAt(0).toUpperCase() + destination.slice(1)
        } Tour Packages`
      : "Best Tour Packages";

  const getPageDescription = () =>
    destination
      ? `Handpicked ${
          destination.charAt(0).toUpperCase() + destination.slice(1)
        } Packages with amazing destinations and experiences`
      : "Handpicked Tour Packages with Paris, Swiss Alps, Nordic Beauty and More";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[70vh]">
        {slide && bannerImages.length > 0 ? (
          <Carousel autoplay effect="fade" dots>
            {bannerImages.map((img, idx) => (
              <div
                key={idx}
                className="h-[70vh] flex justify-center items-center"
              >
                <img
                  src={img}
                  alt={`Slide ${idx}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </Carousel>
        ) : (
          <div className="h-[70vh] w-full">
            <img
              src={bannerImages[0]}
              alt="Banner"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Overlay Text */}
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-2">
            {getPageTitle()}
          </h1>
          <p className="text-white text-lg mb-6">{getPageDescription()}</p>

          {getMinimumPrice() && (
            <div className="flex items-center gap-2 mb-4 text-white">
              <ClockCircleOutlined className="text-xl" />
              <span className="font-semibold">
                Starting Price: ₹{formatPrice(getMinimumPrice())}/- Per Person
              </span>
            </div>
          )}

          <Button
            type="primary"
            size="large"
            className="w-fit bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
          >
            Request a Callback
          </Button>
        </div>
      </div>

      {/* Packages Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4">
            About{" "}
            {destination
              ? destination.charAt(0).toUpperCase() + destination.slice(1)
              : ""}{" "}
            Tour Packages
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Explore {destination} trips with amazing itineraries. Prices start
            from ₹{formatPrice(getMinimumPrice())}/- Per Person.
          </p>
        </div>

        {/* Filtered Packages */}
        {filteredPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPackages.map((trip, idx) => (
              <TourCard key={trip._id} t={trip} i={idx} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Button size="large" type="primary" onClick={() => navigate("/")}>
              Browse All Packages
            </Button>
          </div>
        )}

        {/* Related Packages */}
        {relatedPackages.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-2 text-purple-700">
              Related {selectedCategoryLabel} Tour Packages
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {relatedPackages.map((trip, idx) => (
                <TourCard key={trip._id} t={trip} i={idx} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TourPackagesPage;
