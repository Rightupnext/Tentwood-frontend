import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, Button, Grid, Drawer, Menu } from "antd";
import { DownOutlined, MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/home/logo.2.png";

const { useBreakpoint } = Grid;

function BottomNavbar() {
  const navigate = useNavigate();
  const screens = useBreakpoint();

  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const packages = useSelector((state) => state.packages.list);

  // 🔹 Category → Route map
  const categoryRouteMap = {
    "International Trips": "international-trips",
    "India Trips": "india-trips",
    "Group Tours": "group-tours",
    "Honeymoon Packages": "honeymoon-packages",
  };

  // 🔹 Scroll effect
  useEffect(() => {
    let last = false;

    const onScroll = () => {
      const current = window.scrollY > 20;
      if (current !== last) {
        last = current;
        setIsScrolled(current);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 🔹 Group Destinations by Category
  const destinationsByCategory = useMemo(() => {
    const map = {};
    packages.forEach((pkg) => {
      pkg.tripCategories?.forEach((category) => {
        if (!map[category]) map[category] = new Map();
        if (pkg.Destination?._id) {
          map[category].set(pkg.Destination._id, pkg.Destination.name);
        }
      });
    });
    Object.keys(map).forEach((key) => {
      map[key] = Array.from(map[key].values());
    });
    return map;
  }, [packages]);

  // 🔹 Menu structure
  const menuItems = [
    { name: "Home", link: "/" },
    { name: "About Us", link: "/about-us" },

    ...Object.keys(categoryRouteMap).map((category) => ({
      name: category,
      submenu: destinationsByCategory[category] || [],
      routeKey: categoryRouteMap[category],
    })),

    { name: "Contact", link: "/contact" },
  ];

  // 🔹 Route builder
  const getDestinationRoute = (dest, routeKey) =>
    `/${routeKey}/${dest.toLowerCase().replace(/\s+/g, "-")}`;

  // 🔹 Desktop dropdown items
  const getDropdownItems = (submenu, routeKey) =>
    submenu.map((dest, idx) => ({
      key: `${dest}-${idx}`,
      label: (
        <Link
          to={getDestinationRoute(dest, routeKey)}
          className="text-gray-700 hover:text-teal-600"
        >
          {dest}
        </Link>
      ),
    }));
  const dropdownCache = useMemo(() => {
    const cache = {};
    menuItems.forEach((item) => {
      if (item.submenu) {
        cache[item.name] = getDropdownItems(item.submenu, item.routeKey);
      }
    });
    return cache;
  }, [menuItems]);
  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white shadow-lg"
          : "bg-gradient-to-r from-teal-500 to-cyan-500"
      }`}
    >
      <div className="mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* LOGO */}
          <div onClick={() => navigate("/")} className="cursor-pointer">
            <img
              src={logo}
              alt="Logo"
              className={`transition-all duration-300 ${
                isScrolled ? "w-32" : "w-44"
              }`}
            />
          </div>

          {/* DESKTOP */}
          {screens.xl && (
            <div className="flex items-center space-x-4">
              {menuItems.map((item) =>
                item.submenu ? (
                  <Dropdown
                    key={item.name}
                    trigger={["hover"]}
                    menu={{ items: dropdownCache[item.name] }}
                  >
                    <Button
                      type="text"
                      className={`font-medium ${
                        isScrolled ? "text-gray-700 !font-medium" : "!text-white !font-medium"
                      }`}
                    >
                      {item.name} <DownOutlined />
                    </Button>
                  </Dropdown>
                ) : (
                  <Link
                    key={item.name}
                    to={item.link}
                    className={`px-3 py-2 font-medium ${
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
                onClick={() => navigate("/login")}
                className="!bg-yellow-400 !text-gray-900"
              >
                Sign In
              </Button>
            </div>
          )}

          {/* MOBILE ICON */}
          {!screens.xl && (
            <Button
              type="text"
              icon={drawerVisible ? <CloseOutlined /> : <MenuOutlined />}
              onClick={() => setDrawerVisible(!drawerVisible)}
              className={isScrolled ? "text-gray-700" : "text-white"}
            />
          )}
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <Drawer
        placement="left"
        open={drawerVisible}
        onClose={() => setDrawerVisible(false)}
      >
        <Menu mode="inline">
          {menuItems.map((item) =>
            item.submenu ? (
              <Menu.SubMenu key={item.name} title={item.name}>
                {item.submenu.map((dest) => (
                  <Menu.Item key={dest}>
                    <Link
                      to={getDestinationRoute(dest, item.routeKey)}
                      onClick={() => setDrawerVisible(false)}
                    >
                      {dest}
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
        </Menu>
      </Drawer>
    </nav>
  );
}
export default React.memo(BottomNavbar);
