import React, { useState, useEffect } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import { Button, Layout, Menu, theme, Dropdown, Avatar, Space } from "antd";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { logOutUser } from "../store/slices/userSlice";
import { useDispatch } from "react-redux";

const { Header, Sider, Content } = Layout;

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("1"); // active menu key
  const navigate = useNavigate();
  const location = useLocation(); // get current path
  const { token } = theme.useToken();
  const dispatch = useDispatch();

  // Update selected menu key based on path
  useEffect(() => {
    if (location.pathname.includes("/admin/countries")) {
      setSelectedKey("2");
    } else if (location.pathname === "/admin") {
      setSelectedKey("1");
    } else {
      setSelectedKey(""); // default
    }
  }, [location.pathname]);

  const handleLogout = async () => {
    await dispatch(logOutUser());
    navigate("/login");
  };

  const dropdownItems = [
    {
      key: "1",
      label: "Profile",
      icon: <SettingOutlined />,
      onClick: () => navigate("/profile"),
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: "Logout",
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]} // highlight active
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "Dashboard",
              onClick: () => navigate("/admin"),
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "Country Management",
              onClick: () => navigate("/admin/countries"),
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "Destinations",
              onClick: () => navigate("/admin/destinations"),
            },
          ]}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            padding: "0 20px",
            background: token.colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: 16, width: 64, height: 64 }}
          />

          <Dropdown menu={{ items: dropdownItems }} trigger={["click"]}>
            <div style={{ cursor: "pointer" }}>
              <Space>
                <Avatar icon={<UserOutlined />} />
                <span style={{ fontWeight: 500 }}>Admin</span>
              </Space>
            </div>
          </Dropdown>
        </Header>

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "100vh",
            background: token.colorBgContainer,
            borderRadius: token.borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
