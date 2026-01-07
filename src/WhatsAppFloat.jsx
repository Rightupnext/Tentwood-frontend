import React, { useState } from "react";
import {
  WhatsAppOutlined,
  SendOutlined,
  CloseOutlined,
} from "@ant-design/icons";

export default function WhatsAppFloat() {
  const phoneNumber = import.meta.env.VITE_PHONE; // countrycode + number
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(
    "Hello! I want to know more about your tour packages."
  );

  const sendMessage = () => {
    if (!message.trim()) return;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
    setOpen(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 cursor-pointer right-5 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppOutlined className="text-2xl" />
      </button>

      {/* Popup Box */}
      {open && (
        <div className="fixed bottom-20 right-5 z-50 w-72 bg-white rounded-2xl shadow-2xl animate-slideUp overflow-hidden">
          {/* Header */}
          <div className="bg-[#25D366] text-white px-4 py-3 flex justify-between items-center">
            <span className="font-semibold text-sm">Chat with us</span>
            <CloseOutlined
              onClick={() => setOpen(false)}
              className="cursor-pointer hover:opacity-80"
            />
          </div>

          {/* Body */}
          <div className="p-4 space-y-3">
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full border border-gray-300 rounded-lg p-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            <button
              onClick={sendMessage}
              className="w-full cursor-pointer bg-[#25D366] hover:bg-[#20bd5a] text-white py-2 rounded-lg flex items-center justify-center gap-2 transition-all"
            >
              <SendOutlined />
              Send on WhatsApp
            </button>
          </div>
        </div>
      )}
    </>
  );
}
