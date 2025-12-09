import React, { useState } from "react";

export default function FileUpload({ label, setFile, setPreview }) {
  const [localPreview, setLocalPreview] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file); // <-- pass raw file
      const reader = new FileReader();
      reader.onloadend = () => {
        setLocalPreview(reader.result);
        if (setPreview) setPreview(reader.result); // pass preview
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setLocalPreview(null);
    setFile(null);
    if (setPreview) setPreview(null);
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-semibold mb-2">{label}</label>

      {localPreview ? (
        <div className="relative w-full h-48 border rounded overflow-hidden">
          <img
            src={localPreview}
            alt="Preview"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 flex gap-2">
            <label className="bg-white text-sm px-2 py-1 rounded cursor-pointer shadow hover:bg-gray-100">
              Change
              <input type="file" accept="image/*" className="hidden" onChange={handleChange} />
            </label>
            <button
              onClick={handleRemove}
              className="bg-red-500 text-white text-sm px-2 py-1 rounded shadow hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div className="border-dashed border-2 border-gray-300 rounded h-48 flex items-center justify-center cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="absolute w-full h-full opacity-0 cursor-pointer"
            onChange={handleChange}
          />
          <span className="text-gray-400">Click to upload image</span>
        </div>
      )}
    </div>
  );
}

