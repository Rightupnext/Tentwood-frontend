import React from "react";
import { Card, Form, Input, List, Button, Space } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons";

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
                  <Button type="text" danger icon={<DeleteOutlined />} onClick={() => remove(name)} />,
                ]}
              >
                <Form.Item
                  {...rest}
                  name={name}
                  rules={[{ required: true, message: "Required" }]}
                  style={{ flex: 1 }}
                >
                  <Input placeholder={placeholder} />
                </Form.Item>
              </List.Item>
            )}
          />

          <Button type="dashed" block icon={<PlusOutlined />} onClick={() => add()}>
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
      {renderListSection("notes", "Important Notes", <WarningOutlined />, "e.g., Carry ID Proof")}
    </Space>
  );
}
