import React, { useEffect, useState } from "react";
import Navbar from "../components/HomeComponents/Navbar";
import Hero from "@/components/HomeComponents/Hero";
import Spaces from "@/components/HomeComponents/Spaces";
import spacesData from "../data/spaces.json";

const Homepage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    setSpaces(spacesData);
    console.log(spacesData);
  }, []);

  const filteredSpaces = () => {
    if (!searchValue.trim()) {
      return spaces;
    }
    const searchTerm = searchValue.toLowerCase().trim();

    return spaces.filter((space) => {
      const { name, location } = space;

      return (
        name?.toLowerCase().includes(searchTerm) ||
        location?.toLowerCase().includes(searchTerm)
      );
    });
  };

  return (
    <div className="w-full bg-[#f5f5dc] relative">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        radial-gradient(circle at 20% 80%, rgba(120,119,198,0.3) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255,255,255,0.5) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(120,119,198,0.1) 0%, transparent 50%)`,
        }}
      />
      <div className="w-full h-[100dvh] flex flex-col">
        <Navbar />
        <div className="flex-1 flex justify-center items-center">
          <Hero searchValue={searchValue} setSearchValue={setSearchValue} />
        </div>
      </div>
      <div className="w-full py-10 ">
        <Spaces filteredSpaces={filteredSpaces()} />
      </div>
    </div>
  );
};

export default Homepage;

