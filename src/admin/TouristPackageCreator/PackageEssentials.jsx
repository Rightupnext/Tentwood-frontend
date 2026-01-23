import React from "react";
import { Card, Form, Input, List, Button, Space } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

const categories = {
  mustCarry: "Must Carry",
  gears: "Gears",
  clothes: "Clothes",
  footwear: "Footwear",
  medication: "Medication",
  personalAccessories: "Personal Accessories",
};
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
export default function PackageEssentials() {
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      {Object.keys(categories).map((cat) => (
        <Card key={cat} title={`🎒 ${categories[cat]}`} bordered={false}>
          <Form.List name={["travelEssentials", cat]}>
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
                          placeholder={`Enter ${categories[cat]} item`}
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
                  onClick={() => add()}
                >
                  Add Item
                </Button>
              </>
            )}
          </Form.List>
        </Card>
      ))}
    </Space>
  );
}
