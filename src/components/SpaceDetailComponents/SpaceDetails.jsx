import React from "react";
import { motion } from "framer-motion";
import animations from "@/utils/animation";

const { itemVariants, slideInLeft } = animations;

const SpaceDetails = ({ description, amenities, hours, time_slots }) => {
  return (
    <>
      {/* Description */}
      <motion.div className="mb-8" variants={itemVariants}>
        <motion.h2
          className="text-xl font-semibold mb-4 text-gray-800"
          variants={slideInLeft}
          initial="hidden"
          animate="visible"
        >
          Description
        </motion.h2>
        <motion.p
          className="text-gray-700 leading-relaxed"
          variants={slideInLeft}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
        >
          {description}
        </motion.p>
      </motion.div>

      {/* Amenities */}
      {amenities && amenities.length > 0 && (
        <motion.div className="mb-8" variants={itemVariants}>
          <motion.h2
            className="text-xl font-semibold mb-4 text-gray-800"
            variants={slideInLeft}
            initial="hidden"
            animate="visible"
          >
            Amenities
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {amenities.map((amenity, index) => (
              <motion.div
                key={index}
                className="flex items-center"
                variants={slideInLeft}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <motion.span
                  className="w-2 h-2 bg-green rounded-full mr-3"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.3 + index * 0.1,
                    type: "spring",
                  }}
                />
                <span className="text-gray-700">{amenity}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Operating Hours */}
      {hours && (
        <motion.div className="mb-8" variants={itemVariants}>
          <motion.h2
            className="text-xl font-semibold mb-4 text-gray-800"
            variants={slideInLeft}
            initial="hidden"
            animate="visible"
          >
            Operating Hours
          </motion.h2>
          <motion.p
            className="text-gray-700"
            variants={slideInLeft}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
          >
            {hours}
          </motion.p>
        </motion.div>
      )}

      {/* Available Time Slots */}
      {time_slots && time_slots.length > 0 && (
        <motion.div className="mb-8" variants={itemVariants}>
          <motion.h2
            className="text-xl font-semibold mb-4 text-gray-800"
            variants={slideInLeft}
            initial="hidden"
            animate="visible"
          >
            Available Time Slots
          </motion.h2>
          <div className="flex flex-wrap gap-3">
            {time_slots.map((slot, index) => (
              <motion.span
                key={index}
                className="bg-green/10 text-green-800 px-4 py-2 rounded-full text-sm font-medium border border-green/20"
                variants={slideInLeft}
                initial="hidden"
                animate="visible"
                transition={{
                  delay: 0.2 + index * 0.1,
                  type: "spring",
                  stiffness: 200,
                }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(34, 197, 94, 0.2)",
                }}
              >
                {slot}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </>
  );
};

export default SpaceDetails;
