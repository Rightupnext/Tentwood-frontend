import React, { useState, useEffect } from "react";
import {
  SendOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";

import map from "../../assets/contact/map.1.jpg";
import LocationMap from "./LocationMap";
export default function ContactUs() {
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    startPlace: "",
    destination: "",
    persons: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const {
      name,
      phone,
      email,
      startPlace,
      destination,
      persons,
      startDate,
      endDate,
    } = formData;

    const message = `
🌍 *New Travel Enquiry*

👤 Name: ${name}
📞 Phone: ${phone}
✉️ Email: ${email}

📍 Start Place: ${startPlace}
🎯 Destination: ${destination}
👥 Persons: ${persons}

📅 Start Date: ${startDate}
🏁 End Date: ${endDate}
  `;

    const whatsappURL = `https://wa.me/${
      import.meta.env.VITE_PHONE
    }?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank");
  };

  const mapDots = [
    { top: "15%", left: "20%", delay: "0s" },
    { top: "25%", left: "35%", delay: "0.3s" },
    { top: "20%", left: "50%", delay: "0.6s" },
    { top: "30%", left: "65%", delay: "0.9s" },
    { top: "25%", left: "80%", delay: "1.2s" },
    { top: "45%", left: "15%", delay: "1.5s" },
    { top: "50%", left: "30%", delay: "1.8s" },
    { top: "55%", left: "45%", delay: "2.1s" },
    { top: "60%", left: "60%", delay: "2.4s" },
    { top: "50%", left: "75%", delay: "2.7s" },
    { top: "70%", left: "25%", delay: "3s" },
    { top: "75%", left: "40%", delay: "3.3s" },
    { top: "80%", left: "55%", delay: "3.6s" },
    { top: "75%", left: "70%", delay: "3.9s" },
    { top: "85%", left: "85%", delay: "4.2s" },
  ];

  const formFields = [
    { label: "Name", name: "name", type: "text", icon: "👤" },
    { label: "Phone", name: "phone", type: "tel", icon: "📱" },
    { label: "Email", name: "email", type: "email", icon: "✉️" },
    { label: "Start Place", name: "startPlace", type: "text", icon: "📍" },
    { label: "Destination", name: "destination", type: "text", icon: "🎯" },
    { label: "How many persons", name: "persons", type: "number", icon: "👥" },
  ];

  const contactCards = [
    {
      icon: <EnvironmentOutlined className="!text-white text-3xl" />,
      title: "Office Location",
      text: "2nd floor city sq complex,\nKarumbukkadai, Coimbatore,\nTamil Nadu - 641008",
      gradient: "from-cyan-500 to-blue-500",
      type: "location",
    },
    {
      icon: <PhoneOutlined className="!text-white text-3xl" />,
      title: "For Contact",
      text: import.meta.env.VITE_PHONE,
      gradient: "from-purple-500 to-pink-500",
      type: "phone",
    },
    {
      icon: <MailOutlined className="!text-white text-3xl" />,
      title: "For Email",
      text: "Tentwoodtrips@gmail.com",
      gradient: "from-orange-500 to-red-500",
      type: "email",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50 py-12 px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#3CAD9B]/10 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-float-slow-reverse"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse-gentle"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          <p className="text-sm text-gray-600 mb-2 tracking-wider uppercase animate-fade-in">
            Contact US / Home Contact
          </p>
          <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-[#3CAD9B] via-cyan-500 to-blue-500 bg-clip-text text-transparent mb-4 animate-gradient-text">
            Contact Us
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed text-base md:text-lg">
            Blessing welcomed ladyship she met humoured sir breeding her. Six
            curiosity day assurance bed necessary.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-16">
          {/* Form Section */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
          >
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 md:p-8 border border-white/50 hover:shadow-[#3CAD9B]/20 hover:shadow-3xl transition-all duration-500">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="text-3xl animate-wave">👋</span> Get In Touch
              </h2>

              <div className="space-y-5">
                {formFields.map((field, idx) => (
                  <div
                    key={field.name}
                    className="group"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <span className="text-lg">{field.icon}</span>
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="w-full px-5 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:border-[#3CAD9B] focus:ring-4 focus:ring-[#3CAD9B]/20 outline-none transition-all duration-300 hover:border-[#3CAD9B]/50 group-hover:shadow-lg"
                    />
                  </div>
                ))}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <span className="text-lg">📅</span> Start Date
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="w-full px-5 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:border-[#3CAD9B] focus:ring-4 focus:ring-[#3CAD9B]/20 outline-none transition-all duration-300 hover:border-[#3CAD9B]/50 group-hover:shadow-lg"
                    />
                  </div>
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <span className="text-lg">🏁</span> End Date
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      className="w-full px-5 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:border-[#3CAD9B] focus:ring-4 focus:ring-[#3CAD9B]/20 outline-none transition-all duration-300 hover:border-[#3CAD9B]/50 group-hover:shadow-lg"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#3CAD9B] to-cyan-500 text-white font-bold rounded-full shadow-lg flex items-center justify-center gap-3 hover:scale-105 hover:shadow-2xl hover:shadow-[#3CAD9B]/50 transition-all duration-300 group mt-6"
                >
                  <span className="text-lg">Send Message</span>
                  <SendOutlined
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div
            className={`transition-all duration-1000 delay-400 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            }`}
          >
            <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] bg-white/60 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden group border border-white/50">
              {/* Map Image Background */}
              <img
                src={map}
                alt="World Map"
                className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-500"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#3CAD9B]/20 via-cyan-400/20 to-blue-500/20 animate-gradient-shift"></div>

              {/* Animated Dots on Map */}
              {mapDots.map((d, i) => (
                <div
                  key={i}
                  className="absolute group/dot cursor-pointer"
                  style={{ top: d.top, left: d.left, animationDelay: d.delay }}
                >
                  <div className="relative">
                    <div className="w-4 h-4 bg-[#3CAD9B] rounded-full animate-pulse-dot shadow-lg shadow-[#3CAD9B]/50 group-hover/dot:scale-150 transition-transform duration-300">
                      <div className="absolute inset-0 bg-[#3CAD9B] rounded-full animate-ping opacity-70"></div>
                    </div>
                    {/* Ripple Effect */}
                    <div className="absolute inset-0 -m-2 border-2 border-[#3CAD9B]/50 rounded-full animate-ripple"></div>
                  </div>
                </div>
              ))}

              {/* Decorative Lines Between Dots */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                <defs>
                  <linearGradient
                    id="lineGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#3CAD9B" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                {mapDots.slice(0, -1).map((d, i) => {
                  const nextDot = mapDots[i + 1];
                  return (
                    <line
                      key={i}
                      x1={`${parseFloat(d.left)}%`}
                      y1={`${parseFloat(d.top)}%`}
                      x2={`${parseFloat(nextDot.left)}%`}
                      y2={`${parseFloat(nextDot.top)}%`}
                      stroke="url(#lineGrad)"
                      strokeWidth="2"
                      className="animate-draw-line"
                      style={{ animationDelay: d.delay }}
                    />
                  );
                })}
              </svg>

              {/* Glowing Border Effect */}
              <div className="absolute inset-0 rounded-3xl border-2 border-[#3CAD9B]/30 animate-border-glow"></div>
            </div>
          </div>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {contactCards.map((c, i) => (
            <div
              key={i}
              className={`group relative bg-white/90 backdrop-blur-lg rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-[#3CAD9B]/50 overflow-hidden ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${600 + i * 200}ms` }}
            >
              {/* Animated Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#3CAD9B]/0 to-[#3CAD9B]/0 group-hover:from-[#3CAD9B] group-hover:to-cyan-500 transition-all duration-500 rounded-2xl"></div>

              {/* Shine Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine"></div>
              </div>

              <div className="relative z-10">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${c.gradient} rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                >
                  {c.icon}
                </div>
                <h3 className="text-xl font-bold text-[#3CAD9B] mb-3 group-hover:text-white transition-colors duration-300">
                  {c.title}
                </h3>
                <p className="text-gray-700 whitespace-pre-line text-sm md:text-base leading-relaxed group-hover:text-white transition-colors duration-300">
                  {c.type === "phone" ? (
                    <a href={`tel:+91${c.text}`} className="hover:underline">
                      +91 {c.text}
                    </a>
                  ) : c.type === "email" ? (
                    <a href={`mailto:${c.text}`} className="hover:underline">
                      {c.text}
                    </a>
                  ) : (
                    c.text
                  )}
                </p>
              </div>

              {/* Corner Decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#3CAD9B]/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-[#3CAD9B] to-cyan-500 text-white rounded-full shadow-2xl hover:shadow-[#3CAD9B]/50 flex items-center justify-center transition-all duration-500 group hover:scale-110 z-50 ${
          showScrollTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-12 pointer-events-none"
        }`}
      >
        <ArrowUpOutlined
          size={24}
          className="group-hover:animate-bounce !text-white"
        />
        <div className="absolute inset-0 rounded-full border-2 border-[#3CAD9B] animate-ping-slow opacity-50"></div>
      </button>

   
      <LocationMap />
    </div>
  );
}
