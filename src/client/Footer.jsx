import React, { useState } from "react";
import { ChevronDown, Facebook, Twitter, Instagram, Globe } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [hoveredSocial, setHoveredSocial] = useState(null);

  const links = {
    company: [
      { name: "About Us", to: "/about-us" },
      { name: "Blog", to: "#" },
      { name: "Press Room", to: "#" },
      { name: "Careers", href: "#" }
    ],
    help: [
      { name: "Contact us", href: "/contact" },
      { name: "FAQs", href: "/FAQ" },
      { name: "Terms and conditions", href: "#" },
      { name: "Privacy policy", href: "#" },
      { name: "Sitemap", href: "#" }
    ]
  };

  const payments = [
    { name: "Mastercard", img: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg", color: "from-red-500 to-orange-500" },
    { name: "Visa", img: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg", color: "from-blue-500 to-blue-700" },
    { name: "PayPal", img: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg", color: "from-blue-500 to-blue-600" },
    { name: "Stripe", img: "https://res.cloudinary.com/dttvw0p7p/image/upload/v1765618446/strip_gplo60.jpg", color: "from-blue-600 to-purple-600" },
    { name: "Amex", img: "https://res.cloudinary.com/dttvw0p7p/image/upload/v1765618538/amez_mfg55w.jpg", color: "from-blue-400 to-blue-600" },
    // { name: "Discover", img: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Discover_Card_logo.svg", color: "from-orange-500 to-orange-600" },
   { name: "Bitcoin", img: "https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg", color: "from-yellow-500 to-orange-500" },
    { name: "GPay", img: "https://res.cloudinary.com/dttvw0p7p/image/upload/v1765618714/Gpay_qvwfkm.png", color: "from-green-500 to-blue-500" },
    { name: "Apple Pay", img: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg", color: "from-gray-800 to-gray-900" },
    { name: "Maestro", img: "https://res.cloudinary.com/dttvw0p7p/image/upload/v1765618818/Maestro_Logo.svg_qx4v3w.png", color: "from-red-600 to-blue-600" }
  ];

  const socials = [
    { icon: Facebook, color: "bg-blue-600 hover:bg-blue-500", name: "Facebook" },
    { icon: Twitter, color: "bg-sky-500 hover:bg-sky-400", name: "Twitter" },
    { icon: Instagram, color: "bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500", name: "Instagram" },
    { icon: Globe, color: "bg-red-600 hover:bg-red-500", name: "Pinterest" }
  ];

  const Dropdown = ({ label, value, icon, options }) => {
    const [open, setOpen] = useState(false);
    return (
      <div className="relative w-full">
        <button 
          onClick={() => setOpen(!open)} 
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-center justify-between text-white/90 hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-sm sm:text-base"
        >
          <span className="flex items-center gap-2">
            {icon && <span className="text-lg">{icon}</span>}
            {value}
          </span>
          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        </button>
        {open && (
          <div className="absolute top-full mt-2 w-full bg-slate-800 border border-white/10 rounded-xl shadow-2xl animate-slideDown z-50 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
            {options.map((opt, i) => (
              <button 
                key={i} 
                onClick={() => setOpen(false)} 
                className="w-full px-4 py-2 text-left text-sm text-white/80 hover:bg-white/10 transition-colors duration-200"
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.6); }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
          
          {/* Language and Currency Dropdowns */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white/60">Language</h3>
            <Dropdown 
              value="🇬🇧 English (UK)" 
              icon="🇬🇧" 
              options={[
                "🇬🇧 English (UK)",
                "🇪🇸 Spanish",
                "🇫🇷 French",
                "🇩🇪 German",
                "🇮🇹 Italian",
                "🇯🇵 Japanese",
                "🇨🇳 Chinese",
                "🇰🇷 Korean",
                "🇵🇹 Portuguese",
                "🇷🇺 Russian"
              ]} 
            />
            <h3 className="text-sm font-bold uppercase tracking-wider text-white/60 pt-4">Currency</h3>
            <Dropdown 
              value="₹ INR - India" 
              options={[
                "₹ INR - India",
                "$ USD - United States",
                "€ EUR - Europe",
                "£ GBP - United Kingdom",
                "¥ JPY - Japan",
                "$ AUD - Australia",
                "$ CAD - Canada",
                "CHF - Switzerland",
                "¥ CNY - China",
                "kr SEK - Sweden"
              ]} 
            />
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white/60 mb-4 sm:mb-6">Company</h3>
            <ul className="space-y-3">
              {links.company.map((l, i) => (
                <li key={i}>
                  <Link 
                    href={l.href} 
                    onMouseEnter={() => setHoveredLink(`c${i}`)} 
                    onMouseLeave={() => setHoveredLink(null)} 
                    className="text-white/70 hover:text-white transition-all relative text-sm sm:text-base"
                  >
                    <span className="relative">
                      {l.name}
                      <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ${hoveredLink === `c${i}` ? "w-full" : "w-0"}`} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white/60 mb-4 sm:mb-6">Help</h3>
            <ul className="space-y-3">
              {links.help.map((l, i) => (
                <li key={i}>
                  <Link 
                    href={l.href} 
                    onMouseEnter={() => setHoveredLink(`h${i}`)} 
                    onMouseLeave={() => setHoveredLink(null)} 
                    className="text-white/70 hover:text-white transition-all relative text-sm sm:text-base"
                  >
                    <span className="relative">
                      {l.name}
                      <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ${hoveredLink === `h${i}` ? "w-full" : "w-0"}`} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Payment Methods */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white/60 mb-4 sm:mb-6">Payment methods possible</h3>
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 mb-6">
              {payments.map((p, i) => (
                <div key={i} className="group relative bg-white rounded-lg p-2 hover:scale-110 transition-all cursor-pointer">
                  <div className={`absolute inset-0 bg-gradient-to-br ${p.color} rounded-lg opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <div className="relative h-6 flex items-center justify-center">
                    <img src={p.img} alt={p.name} className="h-full object-contain relative z-10" />
                  </div>
                </div>
              ))}
            </div>

            <h3 className="text-sm font-bold uppercase tracking-wider text-white/60 mb-2 sm:mb-4">Company</h3>
            <a href="#" className="text-white/70 hover:text-white transition-colors inline-block hover:translate-x-1 text-sm sm:text-base">
              Become a Tour guide for Us
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm text-center sm:text-left">
            Copyright 2021 Tour Guide. All Rights Reserved
          </p>

          <div className="flex gap-3 justify-center flex-wrap">
            {socials.map((s, i) => (
              <button 
                key={i} 
                onMouseEnter={() => setHoveredSocial(i)} 
                onMouseLeave={() => setHoveredSocial(null)} 
                className={`${s.color} w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all transform hover:scale-110 hover:-translate-y-1 shadow-lg`}
                style={{ animation: hoveredSocial === i ? "pulse-glow 1.5s ease-in-out infinite" : "none" }}
              >
                <s.icon className="w-5 h-5 text-white" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}