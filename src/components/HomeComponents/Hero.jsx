import { Link } from "react-router";
import { useState, useEffect } from "react";

const Hero = () => {

  return (
    <div
      className="w-[98%] mx-auto h-[97%] relative overflow-hidden rounded-4xl"
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

      </div>
    </div>
  );
};

export default Hero;
