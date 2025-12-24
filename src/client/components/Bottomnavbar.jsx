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

  const { list: destinations } = useSelector((state) => state.destinations);

  /* ---------------- HELPERS ---------------- */

  const getUniqueDestinations = (list) => {
    const map = new Map();
    list.forEach((d) => {
      if (!map.has(d.Destination)) {
        map.set(d.Destination, d);
      }
    });
    return [...map.values()];
  };

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

  const menuItems = [
    { name: "Home", link: "/" },
    { name: "About Us", link: "/about-us" },
    {
      name: "International",
      submenu: internationalTrips.map((d) => d.Destination),
      category: "International Trips",
    },
    {
      name: "India",
      submenu: indiaTrips.map((d) => d.Destination),
      category: "India Trips",
    },
    {
      name: "Group Tour",
      submenu: groupTours.map((d) => d.Destination),
      category: "Group Tours",
    },
    {
      name: "Honeymoon Packages",
      submenu: honeymoonPackages.map((d) => d.Destination),
      category: "Honeymoon Packages",
    },
    { name: "Contact", link: "/contact" },
  ];

  const getDestinationRoute = (destName, category) => {
    const dest = destinations.find(
      (d) => d.Destination === destName && d.trip === category
    );

    if (!dest || !dest.route) return "#";

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
  };

  const getDropdownItems = (submenu, category) =>
    submenu.map((item, idx) => ({
      key: `${item}-${idx}`,
      label: (
        <Link
          to={getDestinationRoute(item, category)}
          className="text-gray-700 hover:text-teal-600"
        >
          {item}
        </Link>
      ),
    }));

  /* ---------------- EFFECTS ---------------- */

  useEffect(() => {
    dispatch(fetchDestinations());
  }, [dispatch]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---------------- JSX ---------------- */
  const handleNavigate = () => {
    navigate("/login");
  };
  return (
    <nav
      className={`w-full max-w-full sticky top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white shadow-lg"
          : "bg-gradient-to-r from-teal-500 to-cyan-500"
      }`}
    >
      <div className="mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* LOGO */}
          <div className="cursor-pointer" onClick={() => navigate("/")}>
            <img
              src={logo}
              alt="Logo"
              className={`transition-all duration-300 object-contain ${
                isScrolled
                  ? "w-24 sm:w-28 md:w-32 lg:w-36 xl:w-40"
                  : "w-20 xs:w-24 sm:w-28 md:w-32 lg:w-36 xl:w-52"
              }`}
            />
          </div>

          {/* DESKTOP MENU (ONLY ≥1200px) */}
          {screens.xl && (
            <div className="flex items-center space-x-2 xl:space-x-4">
              {menuItems.map((item) =>
                item.submenu ? (
                  <Dropdown
                    key={item.name}
                    trigger={["hover"]}
                    placement="bottomLeft"
                    menu={{
                      items: getDropdownItems(item.submenu, item.category),
                      style: {
                        maxHeight: 400,
                        overflowY: "auto",
                        display: "grid",
                        gridTemplateColumns: "repeat(4, minmax(150px, 1fr))",
                        gap: 8,
                        padding: 12,
                      },
                    }}
                  >
                    <Button
                      type="text"
                      className={`!font-medium !transition ${
                        isScrolled
                          ? "text-gray-700 hover:text-teal-600 "
                          : "!text-white"
                      }`}
                      style={{ fontSize: 15 }}
                    >
                      {item.name} <DownOutlined />
                    </Button>
                  </Dropdown>
                ) : (
                  <Link
                    key={item.name}
                    to={item.link}
                    className={`px-3 py-2 font-medium rounded-lg transition ${
                      isScrolled
                        ? "text-gray-700 hover:text-teal-600"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              )}

              <Button
                onClick={handleNavigate}
                type="primary"
                className="!bg-yellow-400 !text-gray-900 !font-semibold"
              >
                Sign In
              </Button>
            </div>
          )}

          {/* MOBILE / LAPTOP MENU BUTTON (<1200px) */}
          {!screens.xl && (
            <Button
              type="text"
              icon={
                drawerVisible ? (
                  <CloseOutlined
                    style={{
                      fontSize: window.innerWidth < 360 ? "20px" : "26px",
                    }}
                  />
                ) : (
                  <MenuOutlined
                    style={{
                      fontSize: window.innerWidth < 360 ? "20px" : "26px",
                    }}
                  />
                )
              }
              onClick={() => setDrawerVisible(!drawerVisible)}
              className={isScrolled ? "text-gray-700" : "text-white"}
            />
          )}
        </div>
      </div>

      {/* DRAWER MENU */}
      <Drawer
        placement="left"
        open={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        title={
          <img
            src={logo}
            alt="Logo"
            className="h-12 cursor-pointer"
            onClick={() => {
              navigate("/");
              setDrawerVisible(false);
            }}
          />
        }
        styles={{ body: { padding: 0 } }}
      >
        <Menu mode="inline" style={{ border: "none" }}>
          {menuItems.map((item) =>
            item.submenu ? (
              <Menu.SubMenu key={item.name} title={item.name}>
                {item.submenu.map((sub, idx) => (
                  <Menu.Item key={`${sub}-${idx}`}>
                    <Link
                      to={getDestinationRoute(sub, item.category)}
                      onClick={() => setDrawerVisible(false)}
                    >
                      {sub}
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

          <Menu.Item>
            <Button
              onClick={handleNavigate}
              type="primary"
              className="w-full !bg-yellow-400 !text-gray-900"
            >
              Sign In
            </Button>
          </Menu.Item>
        </Menu>
      </Drawer>
    </nav>
  );
}
