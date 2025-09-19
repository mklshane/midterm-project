import { Link } from "react-router";
import { useState, useEffect } from "react";

const Hero = ({ searchValue, setSearchValue }) => {
  const [inputValue, setInputValue] = useState(searchValue || "");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (setSearchValue) {
        setSearchValue(inputValue);
      }
    }, 300); 

    return () => clearTimeout(timeoutId);
  }, [inputValue, setSearchValue]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div
      className="w-[98%] mx-auto h-[98%] relative overflow-hidden rounded-4xl"
      id="home"
    >
      <div
        className="hero-overlay h-full flex flex-col justify-center items-center px-4 py-8 bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: "url(/back.jpg)" }}
      >
        <div className="w-[90%] relative z-10 mx-auto flex justify-between items-center">
          <h1 className="text-6xl font-bold text-white w-[50%]">
            Find Your Perfect Place to Focus.
          </h1>
          <p className="text-xl text-white text-left w-[50%]">
            The right environment can change the way you learn. Discover study
            spaces designed for productivity, comfort, and success.
          </p>
        </div>

        {/* Search bar positioned at the bottom */}
        <div className="w-[50%] mb-8 absolute z-10 bottom-20">
          <div className="relative">
            <input
              type="text"
              placeholder="Search study spaces..."
              value={inputValue}
              onChange={handleInputChange}
              className="w-full p-4 pl-12 rounded-full bg-white bg-opacity-90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-lg transition-all duration-300"
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
