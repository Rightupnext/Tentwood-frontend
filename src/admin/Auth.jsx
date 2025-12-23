// Auth.jsx
import React from "react";
import { Tabs, Form, Input, Button, notification, Divider } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";

const { TabPane } = Tabs;

export default function Auth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.users);

  const openNotification = (type, message, description = "") => {
    notification[type]({ message, description });
  };

  const handleLogin = async (values) => {
    const res = await dispatch(loginUser(values));

    if (loginUser.fulfilled.match(res)) {
      const { user } = res.payload; // ✅ extract user correctly
      console.log("user", user);

      if (user.logout === true && user.role === "admin") {
        navigate("/admin"); // 🚀 navigate immediately
      } else {
        notification.error({
          message: "Login blocked",
          description: "Your account is logged out or role not allowed",
        });
      }
    }
  };

  // --- REGISTER HANDLER ---
  const handleRegister = async (values) => {
    const res = await dispatch(registerUser(values));

    if (registerUser.fulfilled.match(res)) {
      // clear register fields
      registerFormRef.current?.resetFields();

      // navigate to login tab
      setActiveTab("1");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-center mb-2">Welcome</h2>
          <p className="text-sm text-center text-gray-500 mb-4">
            Sign in or create an account
          </p>

          <Tabs defaultActiveKey="1" centered type="line">
            {/* ---------------- LOGIN TAB ---------------- */}
            <TabPane tab="Login" key="1">
              <Form
                name="login"
                layout="vertical"
                onFinish={handleLogin}
                requiredMark={false}
              >
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: "Please enter your email" },
                    { type: "email", message: "Enter a valid email" },
                  ]}
                >
                  <Input
                    prefix={<MailOutlined />}
                    placeholder="you@example.com"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    { required: true, message: "Please enter your password" },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Password"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    loading={loading.loginUser}
                    disabled={loading.loginUser}
                  >
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>

            {/* ---------------- REGISTER TAB ---------------- */}
            <TabPane tab="Register" key="2">
              <Form
                name="register"
                layout="vertical"
                onFinish={handleRegister}
                requiredMark={false}
              >
                <Form.Item
                  name="name"
                  label="Full name"
                  rules={[
                    { required: true, message: "Please enter your name" },
                  ]}
                >
                  <Input prefix={<UserOutlined />} placeholder="John Doe" />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: "Please enter your email" },
                    { type: "email", message: "Enter a valid email" },
                  ]}
                >
                  <Input
                    prefix={<MailOutlined />}
                    placeholder="you@example.com"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    { required: true, message: "Please enter a password" },
                    { min: 6, message: "Minimum 6 characters" },
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Password"
                  />
                </Form.Item>

                <Form.Item
                  name="confirm"
                  label="Confirm password"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    { required: true, message: "Please confirm your password" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("The two passwords do not match")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Confirm password"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    loading={loading.registerUser}
                    disabled={loading.registerUser}
                  >
                    Register
                  </Button>
                </Form.Item>

                <Divider className="my-2">Or</Divider>
                <div className="flex gap-2">
                  <Button block>Continue with Google</Button>
                  <Button block>Continue with GitHub</Button>
                </div>
              </Form>
            </TabPane>
          </Tabs>
        </div>

        <div className="bg-gray-50 px-6 py-4 text-center text-xs text-gray-500">
          By continuing you agree to our{" "}
          <span className="text-blue-600">Terms</span> and{" "}
          <span className="text-blue-600">Privacy</span>.
        </div>
      </div>
    </div>
  );
}
