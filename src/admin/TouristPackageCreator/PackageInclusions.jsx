import React from "react";
import { Card, Form, Input, List, Button, Space } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons";
const smartSplit = (text) => {
    if (!text) return [];

    let parts = [];

    if (text.includes(".")) {
      parts = text.split(".");
    } else if (text.includes("\n")) {
      parts = text.split("\n");
    } else if (text.includes("•")) {
      parts = text.split("•");
    } else if (text.includes("- ")) {
      parts = text.split("- ");
    } else {
      // fallback: split every 120 characters
      const size = 120;
      for (let i = 0; i < text.length; i += size) {
        parts.push(text.slice(i, i + size));
      }
    }

    return parts.map((p) => p.trim()).filter(Boolean);
  };
const renderListSection = (name, title, icon, placeholder) => (
  <Card title={<>{icon} {title}</>} bordered={false}>
    <Form.List name={name}>
      {(fields, { add, remove }) => (
        <>
          <List
            dataSource={fields}
            renderItem={({ key, name, ...rest }) => (
              <List.Item
                key={key}
                actions={[
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => remove(name)}
                  />,
                ]}
              >
                <Form.Item
                  {...rest}
                  name={name}
                  rules={[{ required: true, message: "Required" }]}
                  style={{ flex: 1 }}
                >
                  <Input
                    placeholder={placeholder}
                    onPaste={(e) => {
                      const pasted = e.clipboardData.getData("text");
                      const lines = smartSplit(pasted);

                      if (lines.length > 1) {
                        e.preventDefault();
                        remove(name);
                        lines.forEach((line) => add(line));
                      }
                    }}
                  />
                </Form.Item>
              </List.Item>
            )}
          />

          <Button
            type="dashed"
            block
            icon={<PlusOutlined />}
            onClick={() => add("")}
          >
            Add Item
          </Button>
        </>
      )}
    </Form.List>
  </Card>
);


export default function PackageInclusions() {
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      {renderListSection("inclusions", "Inclusions", <CheckCircleOutlined />, "e.g., Flight Tickets")}
      {renderListSection("exclusions", "Exclusions", <CloseCircleOutlined />, "e.g., Visa Fees")}
      {/* {renderListSection("notes", "Important Notes", <WarningOutlined />, "e.g., Carry ID Proof")} */}
    </Space>
  );
}
