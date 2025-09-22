import React, { useEffect, useState } from "react";
import Navbar from "../components/HomeComponents/Navbar";
import Hero from "@/components/HomeComponents/Hero";
import Spaces from "@/components/HomeComponents/Spaces";
import spacesData from "../data/spaces.json";
import Footer from "@/components/HomeComponents/Footer";

const Homepage = () => {
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    setSpaces(spacesData);
  }, []);

  return (
    <div
      className="w-full relative"
      style={{
        background: `
      radial-gradient(circle at 50% 30%, #ffffff 0%, #f7f7f7 60%, #f2f2f2 100%)
    `,
      }}
    >
      <div className="w-full h-[100dvh] flex flex-col">
        <Navbar />
        <div className="flex-1 flex justify-center items-center">
          <Hero />
        </div>
      </div>
      <div className="w-full py-10 ">
        <Spaces filteredSpaces={spaces} />
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
