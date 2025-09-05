import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router";
import LoginModal from "./LoginModal";

const Navbar = () => {
  const { isLoggedIn, userName, logout } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = () => setIsProfileDropdownOpen(false);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav
      className={`py-4 z-50 transition-all duration-300 ${
        isScrolled ? "shadow-md bg-white" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
          <span>StudySpot PH</span>
        </Link>

        {/* Desktop Navigation */}
        {isLoggedIn ? (
          <div className="flex items-center space-x-8">
            <Link
              to="/bookings"
              className="text-gray-700 hover:text-[#95b700] hover:font-bold transition-all"
            >
              My Bookings
            </Link>

            <Link
              to="/contact"
              className="text-gray-700 hover:text-[#95b700] hover:font-bold transition-all"
            >
              Contact
            </Link>

            {/* Profile Dropdown */}
            <div className="relative bg-white py-1 px-2 border border-black rounded-lg cust-shadow">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsProfileDropdownOpen(!isProfileDropdownOpen);
                }}
                className="flex items-center space-x-2 text-gray-700 hover:text-[#b0ce29] transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#faffe4] flex items-center justify-center text-[#96b702] font-medium ">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <span>Hi, {userName}</span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    isProfileDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#faffe4]"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <button
            className="primary-button transition-colors"
            onClick={() => setIsLoginOpen(true)}
          >
            Login
          </button>
        )}
      </div>

      {/* Login Modal */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </nav>
  );
};

export default Navbar;
  