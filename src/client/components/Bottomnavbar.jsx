import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, Button, Grid, Drawer, Menu } from "antd";
import { DownOutlined, MenuOutlined, CloseOutlined } from "@ant-design/icons";
import logo from "../../assets/home/logo.2.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchDestinations } from "../../store/slices/destinationSlice";
const { useBreakpoint } = Grid;

export default function BottomNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const screens = useBreakpoint();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { list: destinations, loading: destLoading } = useSelector(
    (state) => state.destinations
  );
  // Helper: remove duplicates by Destination name
  const getUniqueDestinations = (list) => {
    const map = new Map();
    list.forEach((d) => {
      if (!map.has(d.Destination)) {
        map.set(d.Destination, d);
      }
    });
    return [...map.values()];
  };

  // Group destinations by trip
  const internationalTrips = getUniqueDestinations(
    destinations.filter((d) => d.trip === "International Trips")
  );
  const indiaTrips = getUniqueDestinations(
    destinations.filter((d) => d.trip === "India Trips")
  );
  const groupTours = getUniqueDestinations(
    destinations.filter((d) => d.trip === "Group Tours")
  );
  const honeymoonPackages = getUniqueDestinations(
    destinations.filter((d) => d.trip === "Honeymoon Packages")
  );

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    dispatch(fetchDestinations());
  }, [dispatch]);
  const menuItems = [
    { name: "Home", link: "/" },
    { name: "About Us", link: "/about-us" },
    {
      name: "International",
      submenu: internationalTrips.map((d) => d.Destination),
    },
    {
      name: "India",
      submenu: indiaTrips.map((d) => d.Destination),
    },
    { name: "Group Tour", submenu: groupTours.map((d) => d.Destination) },
    {
      name: "HoneyMoon Packages",
      submenu: honeymoonPackages.map((d) => d.Destination),
    },

    { name: "Contact", link: "/contact" },
  ];
  // Helper: map destination name to route
  const getDestinationRoute = (destName, category) => {
    const dest = destinations.find(
      (d) => d.Destination === destName && d.trip === category
    );
    if (dest && dest.route) {
      // Add prefix based on category
      switch (category) {
        case "International Trips":
          return `/international-trips/${dest.route}`;
        case "India Trips":
          return `/india-trips/${dest.route}`;
        case "Group Tours":
          return `/group-tours/${dest.route}`;
        case "Honeymoon Packages":
          return `/honeymoon-packages/${dest.route}`;
        default:
          return `/destination/${dest.route}`;
      }
    }
    return "#";
  };
  // Pass the parent category name as 'category'
  const getDropdownItems = (submenu, category) => {
    return submenu.map((subItem, idx) => ({
      key: `${subItem}-${idx}`,
      label: (
        <Link
          to={getDestinationRoute(
            subItem,
            category === "International"
              ? "International Trips"
              : category === "India"
              ? "India Trips"
              : category === "Group Tour"
              ? "Group Tours"
              : "Honeymoon Packages"
          )}
          className="text-gray-700 hover:text-teal-600"
        >
          {subItem}
        </Link>
      ),
    }));
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white shadow-lg"
          : "bg-gradient-to-r from-teal-500 to-cyan-500"
      }`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* LOGO */}
          <div
            className="flex-shrink-0 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              src={logo}
              alt="Tentwood Logo"
              className={`h-auto object-contain transition-all duration-300 ${
                isScrolled
                  ? "w-24 sm:w-32 md:w-36 lg:w-40"
                  : "w-28 sm:w-36 md:w-44 lg:w-52"
              }`}
            />
          </div>

          {/* Desktop Menu */}
          {screens.lg && (
            <div className="flex items-center space-x-4">
              {menuItems.map((item) =>
                item.submenu ? (
                  <Dropdown
                    key={item.name}
                    menu={{
                      items: getDropdownItems(item.submenu, item.name),
                      style: {
                        maxHeight: "400px",
                        overflowY: "auto",
                        display: "grid",
                        gridTemplateColumns: "repeat(4, minmax(150px, 1fr))",
                        gap: "8px",
                        padding: "12px",
                      },
                    }}
                    placement="bottomLeft"
                    trigger={["hover"]}
                  >
                    <Button
                      type="text"
                      className={`px-4 py-2 rounded-lg !text-base !font-medium !transition-all !duration-300 ${
                        isScrolled
                          ? "text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                          : "!text-white !hover:bg-white/10"
                      }`}
                    >
                      {item.name} <DownOutlined />
                    </Button>
                  </Dropdown>
                ) : (
                  <Link
                    key={item.name}
                    to={item.link}
                    className={`px-4 py-2 rounded-lg text-base font-medium transition-all duration-300 ${
                      isScrolled
                        ? "text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              )}

              {/* Sign In */}
              <Button
                type="primary"
                className="!bg-yellow-400 !text-gray-900 !font-semibold !hover:bg-yellow-300 !transition-all !duration-300"
              >
                Sign In
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          {!screens.lg && (
            <Button
              type="text"
              icon={drawerVisible ? <CloseOutlined /> : <MenuOutlined />}
              onClick={() => setDrawerVisible(!drawerVisible)}
              className={`${isScrolled ? "text-gray-700" : "text-white"}`}
            />
          )}
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <Drawer
        title={
          <img
            src={logo}
            alt="Tentwood Logo"
            className="h-12 object-contain cursor-pointer"
            onClick={() => {
              navigate("/");
              setDrawerVisible(false);
            }}
          />
        }
        placement="left"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        styles={{ body: { padding: 0 } }}
      >
        <Menu mode="inline" style={{ border: "none" }}>
          {menuItems.map((item) =>
            item.submenu ? (
              <Menu.SubMenu key={item.name} title={item.name}>
                {item.submenu.map((subItem, idx) => (
                  <Menu.Item key={`${subItem}-${idx}`}>
                    <Link
                      to={`/destination/${subItem
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      onClick={() => setDrawerVisible(false)}
                    >
                      {subItem}
                    </Link>
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            ) : (
              <Menu.Item key={item.name}>
                <Link to={item.link} onClick={() => setDrawerVisible(false)}>
                  {item.name}
                </Link>
              </Menu.Item>
            )
          )}

          <Menu.Item key="sign-in">
            <Button
              type="primary"
              className="w-full !bg-yellow-400 !text-gray-900 !hover:bg-yellow-300 !transition-all !duration-300"
            >
              Sign In
            </Button>
          </Menu.Item>
        </Menu>
      </Drawer>
    </nav>
  );
}
