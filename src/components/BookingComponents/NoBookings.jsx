import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import animations from "@/utils/animation";

const { noBookingsContainerVariants, itemVariants } = animations.containers;

const NoBookings = ({ filterDate }) => {
  return (
    <motion.div
      variants={noBookingsContainerVariants}
      initial="hidden"
      animate="visible"
      className="bg-white rounded-2xl shadow-xl p-8 text-center"
    >
      <motion.div
        variants={itemVariants}
        className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <svg
          className="w-12 h-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      </motion.div>
      <motion.h2
        variants={itemVariants}
        className="text-xl font-semibold text-gray-800 mb-4"
      >
        No bookings yet
      </motion.h2>
      <motion.p variants={itemVariants} className="text-gray-600 mb-6">
        {filterDate
          ? `You don't have any bookings on ${new Date(
              filterDate
            ).toLocaleDateString()}.`
          : "You haven't booked any study spaces yet."}
      </motion.p>
      <motion.div variants={itemVariants}>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
        >
          Browse Spaces
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default NoBookings;
