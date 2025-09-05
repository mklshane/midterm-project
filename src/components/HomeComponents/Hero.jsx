import React from "react";
import { Link } from "react-router";
import illustration from "/illus2.png";

const Hero = () => {
  return (
    <div className="w-full flex justify-center items-center px-4 py-8 mx-auto">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        {/* Text Content */}
        <div className="flex flex-col space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Study anytime, <span className="text-green">wherever you are</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-700 max-w-md mx-auto md:mx-0">
            Discover the perfect study environments across the Philippines.
            Reserve your ideal workspace in just a few clicks.
          </p>
        </div>

        {/* Image Content */}
        <div className="flex justify-center">
          <img
            src={illustration}
            alt="Students studying together"
            className="w-[80%] h-auto "
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
