import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  containerVariants,
  slideInLeft,
  slideInRight,
} from "@/utils/animation";

const Hero = () => {
  const controls = useAnimation();
  const location = useLocation();

  useEffect(() => {
    controls.start("visible");
  }, [controls, location.pathname, location.hash]);

  return (
    <div
      className="w-[99%] mx-auto h-[98%] relative overflow-hidden rounded-3xl"
      id="home"
    >
      <div className="relative h-full">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/back.jpg)" }}
        />
        <motion.div
          className="hero-overlay h-full flex flex-col justify-center items-center px-4 py-8 relative"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <div className="w-[90%] relative z-10 mx-auto flex justify-between items-center">
            <motion.h1
              className="text-6xl font-bold text-white w-[50%]"
              variants={slideInLeft}
            >
              Find Your Perfect Place to Focus.
            </motion.h1>
            <motion.p
              className="text-xl text-white text-left w-[50%]"
              variants={slideInRight}
            >
              The right environment can change the way you learn. Discover study
              spaces designed for productivity, comfort, and success.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
