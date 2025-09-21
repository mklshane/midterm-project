import React from "react";

const Footer = () => {
  return (
    <div className="w-full bg-black text-white py-8">
      <div className="w-[85%] mx-auto flex flex-col items-center">
        {/* Brand Section */}
        <div className="flex items-center mb-4">
          <span className="text-green font-bold text-xl">Study</span>
          <span className="text-white font-bold text-xl ml-1">Spot PH</span>
        </div>

        {/* Tagline */}
        <p className="text-gray-400 text-sm mb-6 text-center">
          Find your perfect study environment in the Philippines
        </p>

        {/* Links */}
        <div className="flex space-x-6 mb-6">
          <a href="#" className="text-gray-400 hover:text-white text-sm">
            About
          </a>
          <a href="#" className="text-gray-400 hover:text-white text-sm">
            Contact
          </a>
          <a href="#" className="text-gray-400 hover:text-white text-sm">
            Privacy
          </a>
        </div>

        {/* Copyright */}
        <div className="text-gray-500 text-xs">
          © {new Date().getFullYear()} Study Spot PH
        </div>
      </div>
    </div>
  );
};

export default Footer;
