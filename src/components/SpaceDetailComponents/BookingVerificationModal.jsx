import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";

const BookingVerificationModal = ({ booking, isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green/20 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-green"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Booking Confirmed!
                </h2>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <p className="text-black mt-2 text-sm">
              Your booking has been successfully confirmed
            </p>
          </div>

          {/* Booking Details */}
          <div className="p-6 space-y-4">
            <div className="flex items-center space-x-4">
              <img
                src={booking.image}
                alt={booking.spaceName}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-800">
                  {booking.spaceName}
                </h3>
                <p className="text-black font-bold">₱{booking.price}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Date:</span>
                <p className="font-medium text-gray-800">
                  {new Date(booking.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div>
                <span className="text-gray-500">Time Slot:</span>
                <p className="font-medium text-gray-800">{booking.timeSlot}</p>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-700 text-sm mb-2">
                Important Information
              </h4>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Please arrive 15 minutes before your scheduled time</li>
                <li>• Bring a valid ID for verification</li>
                <li>• Payment will be processed upon arrival</li>
              </ul>
            </div>
          </div>

          {/* Actions */}
          <div className="p-6 border-t border-gray-200 flex space-x-3">
            <Link to="/my-bookings">
              <button
                onClick={onClose}
                className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                View All Bookings
              </button>
            </Link>
            <button
              onClick={onConfirm}
              className="flex-1 bg-green hover:bg-black text-black hover:text-green border border-transparent py-3 px-4 rounded-xl font-semibold transition-all duration-300"
            >
              Done
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BookingVerificationModal;
