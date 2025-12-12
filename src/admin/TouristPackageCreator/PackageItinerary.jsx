import React from "react";
import { Card, Form, Input, List, Button, Space, Typography, Checkbox } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

const { Title } = Typography;

export default function PackageItinerary() {
  return (
    <Card title="📅 Itinerary" bordered={false}>
      <Form.List name="itinerary">
        {(days, { add, remove }) => (
          <Space direction="vertical" style={{ width: "100%" }}>
            {days.map(({ key, name }, index) => (
              <Card
                key={key}
                title={`Day ${index + 1}`}
                extra={
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => remove(name)}
                  >
                    Remove Day
                  </Button>
                }
              >
                {/* Day Number */}
                <Form.Item name={[name, "dayNumber"]} initialValue={index + 1}>
                  <Input type="number" placeholder="Day Number" />
                </Form.Item>

                {/* Title */}
                <Form.Item
                  name={[name, "title"]}
                  rules={[{ required: true, message: "Enter day title" }]}
                >
                  <Input placeholder="Title" />
                </Form.Item>

                {/* Summary */}
                <Form.Item name={[name, "summary"]}>
                  <Input placeholder="Short summary" />
                </Form.Item>

                {/* Details */}
                <Form.Item name={[name, "details"]}>
                  <Input.TextArea rows={3} placeholder="Full description / details" />
                </Form.Item>

                {/* Optional Activities */}
                <Title level={5}>Optional Activities</Title>
                <Form.List name={[name, "optionalActivities"]}>
                  {(acts, { add: addAct, remove: removeAct }) => (
                    <>
                      <List
                        dataSource={acts}
                        renderItem={({ key, name: actName }) => (
                          <List.Item
                            key={key}
                            actions={[
                              <Button
                                danger
                                type="text"
                                icon={<DeleteOutlined />}
                                onClick={() => removeAct(actName)}
                              />,
                            ]}
                          >
                            <Form.Item
                              name={[actName]}
                              style={{ flex: 1 }}
                            >
                              <Input placeholder="Optional activity" />
                            </Form.Item>
                          </List.Item>
                        )}
                      />

                      <Button type="dashed" icon={<PlusOutlined />} onClick={() => addAct()}>
                        Add Optional Activity
                      </Button>
                    </>
                  )}
                </Form.List>

                {/* Meals */}
                <Title level={5}>Meals</Title>
                <Space>
                  <Form.Item name={[name, "meals", "breakfast"]} valuePropName="checked">
                    <Checkbox>Breakfast</Checkbox>
                  </Form.Item>
                  <Form.Item name={[name, "meals", "lunch"]} valuePropName="checked">
                    <Checkbox>Lunch</Checkbox>
                  </Form.Item>
                  <Form.Item name={[name, "meals", "dinner"]} valuePropName="checked">
                    <Checkbox>Dinner</Checkbox>
                  </Form.Item>
                </Space>
              </Card>
            ))}

            {/* Add Day */}
            <Button
              type="primary"
              block
              icon={<PlusOutlined />}
              onClick={() =>
                add({
                  dayNumber: days.length + 1,
                  title: "",
                  summary: "",
                  details: "",
                  optionalActivities: [],
                  meals: { breakfast: false, lunch: false, dinner: false }
                })
              }
            >
              Add Day
            </Button>
          </Space>
        )}
      </Form.List>
    </Card>
  );
}
