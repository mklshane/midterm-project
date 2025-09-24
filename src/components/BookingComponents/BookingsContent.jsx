import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import DateGroup from "./DateGroup";
import NoBookings from "./NoBookings";
import animations from "@/utils/animation";

const { containerVariants } = animations.containers;

const BookingsContent = ({
  groupedBookings,
  totalBookings,
  filterDate,
  today,
  onCancelClick,
}) => {
  if (totalBookings === 0) {
    return <NoBookings filterDate={filterDate} />;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={Object.keys(groupedBookings).length}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="space-y-8"
      >
        {Object.entries(groupedBookings).map(([date, dateBookings], index) => (
          <DateGroup
            key={date}
            date={date}
            dateBookings={dateBookings}
            today={today}
            onCancelClick={onCancelClick}
            index={index}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default BookingsContent;
