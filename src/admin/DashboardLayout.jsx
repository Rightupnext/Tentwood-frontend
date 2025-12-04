import React, { useState } from "react";
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
import { Outlet, useNavigate } from "react-router-dom";
import { logOutUser } from "../store/slices/userSlice";
import { useDispatch } from "react-redux";
const { Header, Sider, Content } = Layout;

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { token } = theme.useToken();
  const dispatch = useDispatch();

  const Logout = async () => {
    await dispatch(logOutUser());
    navigate("/login");
  };
  // 🔥 **Dropdown Items (same structure as your sample)**
  const items = [
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
      onClick: async () => {
        await Logout();
      },
    },
  ];

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            { key: "1", icon: <UserOutlined />, label: "nav 1" },
            { key: "2", icon: <VideoCameraOutlined />, label: "nav 2" },
            { key: "3", icon: <UploadOutlined />, label: "nav 3" },
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
          {/* Menu Toggle */}
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: 16, width: 64, height: 64 }}
          />

          {/* 🔥 Right Side Dropdown (same style + behavior as your sample) */}
          <Dropdown menu={{ items }} trigger={["click"]}>
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
            height: "100vh",
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
