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
                        <Button type="text" danger icon={<DeleteOutlined />} onClick={() => remove(name)} />,
                      ]}
                    >
                      <Form.Item
                        {...rest}
                        name={name}
                        rules={[{ required: true, message: "Required" }]}
                        style={{ flex: 1 }}
                      >
                        <Input placeholder={`Enter ${categories[cat]} item`} />
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
      ))}
    </Space>
  );
}
