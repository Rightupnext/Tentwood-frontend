import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/home/logo.2.png'

export default function BottomNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Home", link: "/" },
    { name: "Testimonal", link: "/Testimonal" },
    { name: "About Us", link: "/about-us" },
    { name: "Popular Destinations", link: "/Vintagedouble" },  // ✅ Correct: Shows Thingtodo
    { name: "Our Packages", link: "/Travel" },      // ✅ Correct: Shows Vintagedouble
    { name: "Contact", link: "/contact" },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white shadow-lg"
          : "bg-gradient-to-r from-teal-500 to-cyan-500"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navbar container */}
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* LOGO — CLICK TO GO HOME */}
          <div
            className="flex-shrink-0 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="flex items-center space-x-2">
              <img
                src={logo}
                alt="Tentwood Logo"
                className={`h-auto object-contain transition-all duration-300 ${
                  isScrolled
                    ? 'w-24 sm:w-32 md:w-36 lg:w-40'
                    : 'w-28 sm:w-36 md:w-44 lg:w-52'
                }`}
              />
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item, idx) => (
              <div
                key={idx}
                className="relative group"
                onMouseEnter={() =>
                  item.submenu && setActiveDropdown(item.name)
                }
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.link || "#"}
                  className={`flex items-center px-4 py-2 rounded-lg text-base font-medium transition-all duration-300 ${
                    isScrolled
                      ? "text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  {item.name}
                  {item.submenu && (
                    <svg
                      className={`w-4 h-4 ml-1 transition-transform duration-300 ${
                        activeDropdown === item.name ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 9l6 6 6-6"
                      />
                    </svg>
                  )}
                </Link>

                {/* Dropdown */}
                {item.submenu && (
                  <div
                    className={`absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-300 ${
                      activeDropdown === item.name
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible -translate-y-2"
                    }`}
                  >
                    <div className="py-2">
                      {item.submenu.map((subItem, subIdx) => (
                        <a
                          key={subIdx}
                          href="#"
                          className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-teal-50 hover:to-cyan-50 hover:text-teal-600 transition-all duration-200 hover:translate-x-1"
                        >
                          {subItem}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Sign In */}
          <div className="hidden lg:flex items-center">
            <button className="px-6 py-2.5 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-300 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              Sign In
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden transition-colors duration-300 p-2 ${
              isScrolled ? "text-gray-700" : "text-white"
            }`}
          >
            {isMobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden bg-white border-t transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-4 space-y-2">
          {menuItems.map((item, idx) => (
            <div key={idx}>
              <Link
                to={item.link || "#"}
                className="block py-3 px-4 text-gray-700 hover:bg-teal-50 hover:text-teal-600 rounded-lg font-medium transition-all duration-200"
              >
                {item.name}
              </Link>

              {item.submenu && (
                <div className="pl-4 space-y-1 mt-1">
                  {item.submenu.map((subItem, subIdx) => (
                    <a
                      key={subIdx}
                      href="#"
                      className="block py-2 px-4 text-sm text-gray-600 hover:text-teal-600 transition-colors duration-200"
                    >
                      {subItem}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}

          <button className="w-full mt-4 px-6 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-300 transition-all duration-300">
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
}