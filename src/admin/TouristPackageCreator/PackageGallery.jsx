import React from "react";
import { Upload, Button, Image } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

export default function PackageGallery({ gallery = [], setGallery }) {
  
  const uploadProps = {
    accept: "image/*",
    showUploadList: false,
    beforeUpload: (file) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        setGallery((prev) => [...prev, { file, preview: reader.result }]);
      };

      reader.readAsDataURL(file);
      return false; // prevent actual upload
    }
  };

  const deleteImage = (index) => {
    setGallery((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h3>Image Gallery</h3>

      <Upload {...uploadProps}>
        <Button icon={<PlusOutlined />}>Upload Image</Button>
      </Upload>

      <div style={{ marginTop: 20, display: "flex", gap: 16, flexWrap: "wrap" }}>
        {gallery.map((g, index) => (
          <div key={index} style={{ position: "relative" }}>
            <Image
              src={g.preview}
              width={150}
              height={120}
              style={{ objectFit: "cover", borderRadius: 8 }}
            />

            <Button
              danger
              size="small"
              icon={<DeleteOutlined />}
              onClick={() => deleteImage(index)}
              style={{
                position: "absolute",
                top: 4,
                right: 4,
                background: "#fff",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
