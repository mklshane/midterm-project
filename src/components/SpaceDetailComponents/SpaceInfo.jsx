import React from "react";
import { motion } from "framer-motion";
import animations from "@/utils/animation";

const { itemVariants, slideInLeft, slideInRight } = animations;

const SpaceInfo = ({ name, spaceLocation, price }) => {
  return (
    <motion.div
      className="flex justify-between items-start mb-6"
      variants={itemVariants}
    >
      <div>
        <motion.h1
          className="text-3xl font-bold text-gray-800 mb-2"
          variants={slideInLeft}
          initial="hidden"
          animate="visible"
        >
          {name}
        </motion.h1>
        <motion.p
          className="text-gray-600 mb-2"
          variants={slideInLeft}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
        >
          {spaceLocation}
        </motion.p>
      </div>
      <motion.div
        className="text-right"
        variants={slideInRight}
        initial="hidden"
        animate="visible"
      >
        <p className="text-2xl font-bold text-gray-800">₱{price}</p>
        <p className="text-sm text-gray-500">Starting price</p>
      </motion.div>
    </motion.div>
  );
};

export default SpaceInfo;
