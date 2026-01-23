import React from "react";
import { Card, Form, Input, Button } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

const { TextArea } = Input;

export default function PackageItinerary() {
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

  return (
    <Card title="📅 Itinerary" bordered={false}>
      <Form.List name="itinerary">
        {(fields, { add, remove }) => (
          <div style={{ width: "100%" }}>
            {fields.map(({ key, name }, index) => (
              <Card
                key={key}
                size="small"
                title={`Day ${index + 1}`}
                style={{ marginBottom: 16 }}
                extra={
                  <Button
                    danger
                    type="text"
                    icon={<DeleteOutlined />}
                    onClick={() => remove(name)}
                  />
                }
              >
                {/* Day Title */}
                <Form.Item
                  name={[name, "title"]}
                  rules={[{ required: true, message: "Enter day title" }]}
                >
                  <Input placeholder="Title (e.g. Arrival & City Tour)" />
                </Form.Item>

                {/* Description */}
                <Form.List name={[name, "description"]}>
                  {(descFields, { add: addDesc, remove: removeDesc }) => (
                    <div style={{ width: "100%" }}>
                      {descFields.map(({ key, name: descName }) => (
                        <div
                          key={key}
                          style={{
                            display: "flex",
                            gap: 8,
                            width: "100%",
                            marginBottom: 8,
                          }}
                        >
                          <Form.Item
                            name={[descName]}
                            rules={[
                              {
                                required: true,
                                message: "Enter description",
                              },
                            ]}
                            style={{ flex: 1, marginBottom: 0 }}
                          >
                            <TextArea
                              rows={3}
                              placeholder="Full description of the day"
                              onPaste={(e) => {
                                const pasted = e.clipboardData.getData("text");
                                const lines = smartSplit(pasted);

                                if (lines.length > 1) {
                                  e.preventDefault();
                                  removeDesc(descName);
                                  lines.forEach((line) => addDesc(line));
                                }
                              }}
                            />
                          </Form.Item>

                          <Button
                            danger
                            type="text"
                            icon={<DeleteOutlined />}
                            onClick={() => removeDesc(descName)}
                          />
                        </div>
                      ))}

                      <Button
                        type="dashed"
                        icon={<PlusOutlined />}
                        onClick={() => addDesc("")}
                      >
                        Add Description
                      </Button>
                    </div>
                  )}
                </Form.List>
              </Card>
            ))}

            {/* Add Day */}
            <Button
              type="dashed"
              block
              icon={<PlusOutlined />}
              onClick={() =>
                add({
                  title: "",
                  description: [""],
                })
              }
            >
              Add Day
            </Button>
          </div>
        )}
      </Form.List>
    </Card>
  );
}
