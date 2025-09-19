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
    <>
      <div className="w-full h-[100dvh] bg-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex justify-center items-center">
          <Hero searchValue={searchValue} setSearchValue={setSearchValue} />
        </div>
      </div>
      <div className="w-full py-10 bg-white">
        <Spaces filteredSpaces={filteredSpaces()} />
      </div>
    </>
  );
};

export default Homepage;
