import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/HomeComponents/Navbar";
import Hero from "@/components/HomeComponents/Hero";
import Spaces from "@/components/HomeComponents/Spaces";
import Footer from "@/components/HomeComponents/Footer";
import spacesData from "@/data/spaces.json";

const Homepage = () => {
  const [spaces, setSpaces] = useState([]);
  const location = useLocation();

  useEffect(() => {
    setSpaces(spacesData);
  }, []);

  useEffect(() => {
    if (location.hash) {
      const section = location.hash.replace("#", "");
      const element = document.getElementById(section);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80,
          behavior: "smooth",
        });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.hash]);

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
          <Hero key="hero" />
        </div>
      </div>
      <div className="w-full py-10">
        <Spaces filteredSpaces={spaces} id="spaces" />
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
