import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, Button, Grid, Drawer, Menu } from "antd";
import { DownOutlined, MenuOutlined, CloseOutlined } from "@ant-design/icons";
import logo from "../../assets/home/logo.2.png";

const { useBreakpoint } = Grid;

export default function BottomNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const screens = useBreakpoint();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Home", link: "/" },
    { name: "About Us", link: "/about-us" },
    {
      name: "International",
      submenu: [
        "Europe",
        "Vietnam",
        "Bali",
        "Thailand",
        "Japan",
        "Dubai",
        "Georgia",
        "Sri Lanka",
        "Bhutan",
        "Philippines",
        "Kazakhstan",
        "Singapore",
        "Malaysia",
        "Maldives",
        "Mauritius",
        "South Africa",
        "Kenya",
        "Switzerland",
        "France",
        "New Zealand",
        "Spain",
        "Turkey",
        "Australia",
      ],
    },
    {
      name: "India",
      submenu: [
        "Rajasthan",
        "Kashmir",
        "Meghalaya",
        "Sikkim",
        "Andaman",
        "Arunachal Pradesh",
        "Spiti",
        "Uttarakhand",
        "Ladakh",
        "Himachal Pradesh",
        "Nagaland",
        "Weekend Getaways",
        "Kerala",
      ],
    },
    { name: "Group Tour", link: "/group-tour" },
    { name: "HoneyMoon Packages", link: "/Vintagedouble" },
    { name: "Our Packages", link: "/Travel" },
    { name: "Contact", link: "/contact" },
  ];

  // Desktop dropdown menu items for Ant Design
  const getDropdownItems = (submenu) => {
    return submenu.map((subItem, idx) => ({
      key: `${subItem}-${idx}`,
      label: (
        <Link
          to={`/destination/${subItem.toLowerCase().replace(/\s+/g, "-")}`}
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
                      items: getDropdownItems(item.submenu),
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
