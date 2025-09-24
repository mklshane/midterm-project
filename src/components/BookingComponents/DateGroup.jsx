import React from "react";
import { motion } from "framer-motion";
import DateSeparator from "./DateSeparator";
import BookingCard from "./BookingCard";
import animations from "@/utils/animation";

const { groupVariants } = animations.bookings;

const DateGroup = ({ date, dateBookings, today, onCancelClick, index }) => {
  const isPastDate = date < today;

  return (
    <motion.div variants={groupVariants} initial="hidden" animate="visible">
      <DateSeparator date={date} today={today} isPastDate={isPastDate} />

      <motion.div className="grid gap-6" layout>
        {dateBookings.map((booking, cardIndex) => (
          <BookingCard
            key={booking.id}
            booking={booking}
            isPastDate={isPastDate}
            onCancelClick={onCancelClick}
            cardIndex={cardIndex}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default DateGroup;
