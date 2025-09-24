import React from "react";
import { motion } from "framer-motion";
import animations from "@/utils/animation";

const { cardVariants, bookingDetailVariants, cancelButtonVariants } =
  animations.bookings;

const BookingCard = ({ booking, isPastDate, onCancelClick, cardIndex }) => {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
      className={`bg-green/10 border-1 border-black/10 rounded-2xl shadow-xl overflow-hidden ${
        isPastDate ? "opacity-70" : ""
      }`}
    >
      <div className="p-4 md:flex md:items-center md:justify-between">
        <div className="flex-1">
          <div className="flex items-center">
            <motion.img
              src={booking.image}
              alt={booking.spaceName}
              className="w-50 h-26 object-cover rounded-xl mr-6"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                {booking.spaceName}
              </h3>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <BookingDetail
                  icon={
                    <motion.svg
                      className="w-5 h-5 text-gray-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      whileHover={{ rotate: 15 }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </motion.svg>
                  }
                  text={booking.timeSlot}
                />
                <BookingDetail
                  icon={
                    <motion.svg
                      className="w-5 h-5 text-gray-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      whileHover={{ rotate: 15 }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </motion.svg>
                  }
                  text={`₱${booking.price}`}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 md:mt-0 md:ml-6">
          {!isPastDate && (
            <CancelButton onClick={() => onCancelClick(booking)} />
          )}
        </div>
      </div>
    </motion.div>
  );
};

const BookingDetail = ({ icon, text }) => (
  <motion.div
    className="flex items-center"
    variants={bookingDetailVariants}
    whileHover="hover"
    transition={bookingDetailVariants.transition}
  >
    {icon}
    <span className="text-gray-700">{text}</span>
  </motion.div>
);

const CancelButton = ({ onClick }) => {
  return (
    <motion.button
      variants={cancelButtonVariants}
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
      className="px-4 py-2 bg-white border border-red-200 text-sm text-red-700 rounded-xl font-medium transition-colors"
    >
      Cancel Booking
    </motion.button>
  );
};

export default BookingCard;
