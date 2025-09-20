import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useBookings } from "@/contexts/BookingsContext";

const BookingPanel = ({ space, bookingDetails, onBookingChange }) => {
  const { isLoggedIn } = useAuth();
  const { bookings, addBooking } = useBookings();
  const { id: spaceId, name, price, time_slots } = space;

  // Check if a time slot is already booked for the selected date
  const isTimeSlotBooked = (date, timeSlot) => {
    return bookings.some(
      (booking) =>
        booking.spaceId === spaceId &&
        booking.date === date &&
        booking.timeSlot === timeSlot &&
        booking.status !== "cancelled"
    );
  };

  const handleBookNow = () => {
    if (!bookingDetails.date || !bookingDetails.timeSlot) return;


    const newBooking = {
      id: Date.now().toString(),
      spaceId: spaceId,
      spaceName: name,
      date: bookingDetails.date,
      timeSlot: bookingDetails.timeSlot,
      price: price,
      status: "confirmed",
      image: space.main_image,
    };

    addBooking(newBooking);
    onBookingChange("timeSlot", "");
  };

  const handleBookingChange = (field, value) => {
    onBookingChange(field, value);
  };

  // Check if selected slot is booked (for UI feedback)
  const isSelectedSlotBooked =
    bookingDetails.date &&
    bookingDetails.timeSlot &&
    isTimeSlotBooked(bookingDetails.date, bookingDetails.timeSlot);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6">
      {isLoggedIn ? (
        <>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Book This Space
          </h2>

          {/* Date Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              type="date"
              className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green focus:border-transparent"
              value={bookingDetails.date}
              onChange={(e) => {
                handleBookingChange("date", e.target.value);
                // Reset time slot when date changes to avoid conflicts
                handleBookingChange("timeSlot", "");
              }}
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          {/* Time Slot Selection */}
          {time_slots && time_slots.length > 0 && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time Slot
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green focus:border-transparent"
                value={bookingDetails.timeSlot}
                onChange={(e) =>
                  handleBookingChange("timeSlot", e.target.value)
                }
              >
                <option value="">Select a time slot</option>
                {time_slots.map((slot, index) => {
                  const isBooked =
                    bookingDetails.date &&
                    isTimeSlotBooked(bookingDetails.date, slot);
                  return (
                    <option
                      key={index}
                      value={slot}
                      disabled={isBooked}
                      className={isBooked ? "text-gray-400 bg-gray-100" : ""}
                    >
                      {slot} {isBooked && "(Booked)"}
                    </option>
                  );
                })}
              </select>

             
            </div>
          )}

          {/* Price Summary */}
          <div className="pt-2 mb-4">
            <div className="flex justify-between items-center text-lg font-bold mt-3 pt-3 border-t border-gray-200">
              <span>Total</span>
              <span className="text-green">₱{price}</span>
            </div>
          </div>

          {/* Book Now Button */}
          <button
            onClick={handleBookNow}
            className="w-full bg-black hover:bg-gray-800 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none"
            disabled={
              !bookingDetails.date ||
              !bookingDetails.timeSlot ||
              isSelectedSlotBooked
            }
          >
            Book Now
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            You will not be charged yet
          </p>
        </>
      ) : (
        <div className="text-center py-8">
          <div className="w-20 h-20 bg-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-green"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Ready to Book?
          </h3>
          <p className="text-gray-600 mb-6">
            Login to reserve this space and start your productive session
          </p>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">
              Use the login button in the navigation to get started
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPanel;
