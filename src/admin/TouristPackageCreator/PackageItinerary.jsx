import React from "react";
import { Card, Form, Input, List, Button, Space, Typography } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

const { Title } = Typography;

export default function PackageItinerary() {
  return (
    <Card title="📅 Itinerary" bordered={false}>
      <Form.List name="itinerary">
        {(days, { add: addDay, remove: removeDay }) => (
          <Space direction="vertical" style={{ width: "100%" }}>
            {days.map(({ key, name, fieldKey, ...rest }, index) => (
              <Card
                key={key}
                title={`Day ${index + 1}`}
                extra={
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => removeDay(name)}
                  >
                    Remove Day
                  </Button>
                }
              >
                <Form.Item
                  {...rest}
                  name={[name, "dayTitle"]}
                  rules={[{ required: true, message: "Enter day title" }]}
                >
                  <Input placeholder="e.g., Arrival at Phuket & Hotel Check-in" />
                </Form.Item>

                <Title level={5}>Activities:</Title>

                <Form.List name={[name, "activities"]}>
                  {(acts, { add: addActivity, remove: removeActivity }) => (
                    <>
                      <List
                        dataSource={acts}
                        renderItem={({ key, name: actName, ...rf }) => (
                          <List.Item
                            key={key}
                            actions={[
                              <Button
                                type="text"
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() => removeActivity(actName)}
                              />,
                            ]}
                          >
                            <Form.Item
                              {...rf}
                              name={actName}
                              rules={[{ required: true, message: "Enter activity" }]}
                              style={{ flex: 1 }}
                            >
                              <Input.TextArea rows={2} placeholder="Activity..." />
                            </Form.Item>
                          </List.Item>
                        )}
                      />

                      <Button
                        type="dashed"
                        icon={<PlusOutlined />}
                        onClick={() => addActivity()}
                      >
                        Add Activity
                      </Button>
                    </>
                  )}
                </Form.List>
              </Card>
            ))}

            <Button
              type="primary"
              block
              icon={<PlusOutlined />}
              onClick={() => addDay({ dayTitle: "", activities: [""] })}
            >
              Add Day
            </Button>
          </Space>
        )}
      </Form.List>
    </Card>
  );
}
