import React from "react";
import { Card, Form, Input, List, Button } from "antd";
import { PlusOutlined, DeleteOutlined, StarOutlined } from "@ant-design/icons";

export default function PackageHighlights() {
  return (
    <Card title={<><StarOutlined /> Highlights</>} bordered={false}>
      <Form.List name="highlights">
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
                    style={{ flex: 1 }}
                    rules={[{ required: true, message: "Enter highlight" }]}
                  >
                    <Input placeholder="Enter highlight (e.g., Phi Phi Island)" />
                  </Form.Item>
                </List.Item>
              )}
            />

            <Button
              type="dashed"
              block
              onClick={() => add()}
              icon={<PlusOutlined />}
            >
              Add Highlight
            </Button>
          </>
        )}
      </Form.List>
    </Card>
  );
}
