import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useBookings } from "@/contexts/BookingsContext";

const BookingPanel = ({ space, bookingDetails, onBookingChange }) => {
  const { isLoggedIn } = useAuth(); 
  const { bookings, addBooking } = useBookings(); 
  const { id: spaceId, name, price, time_slots } = space;

  /**
   * Check if a specific time slot is already booked for a given date
   * Prevents users from double-booking the same slot
   */
  const isTimeSlotBooked = (date, timeSlot) => {
    return bookings.some(
      (booking) =>
        booking.spaceId === spaceId &&
        booking.date === date &&
        booking.timeSlot === timeSlot &&
        booking.status !== "cancelled" // cancelled slots are available again
    );
  };

  /**
   * Handle booking submission
   * Validates required fields, then creates and stores a booking
   */
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

    addBooking(newBooking); // save booking in context
    onBookingChange("timeSlot", ""); // reset time slot after booking
  };

  /**
   * Pass changes back to parent (date or timeSlot updates)
   */
  const handleBookingChange = (field, value) => {
    onBookingChange(field, value);
  };

  // check if the selected slot is already booked
  const isSelectedSlotBooked =
    bookingDetails.date &&
    bookingDetails.timeSlot &&
    isTimeSlotBooked(bookingDetails.date, bookingDetails.timeSlot);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6">
      {isLoggedIn ? (
        <>
          {/* Title */}
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

                // if slot becomes invalid after date change, reset it
                if (bookingDetails.timeSlot && bookingDetails.date) {
                  const isStillValid = !isTimeSlotBooked(
                    e.target.value,
                    bookingDetails.timeSlot
                  );
                  if (!isStillValid) {
                    handleBookingChange("timeSlot", "");
                  }
                }
              }}
              min={new Date().toISOString().split("T")[0]} // prevent past dates
            />
          </div>

          {/* Time Slot Selection */}
          {time_slots && time_slots.length > 0 && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time Slot
              </label>
              <div className="relative">
                <select
                  className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green focus:border-transparent appearance-none pr-10"
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

                {/* dropdown arrow */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* Price Summary */}
          <div className="pt-2 mb-4">
            <div className="flex justify-between items-center text-lg font-bold mt-3 pt-3 border-t border-gray-200">
              <span>Total</span>
              <span className="text-black">₱{price}</span>
            </div>
          </div>

          {/* Book Now Button */}
          <button
            onClick={handleBookNow}
            className="w-full bg-green hover:bg-black hover:text-green hover:border text-black py-3 px-6 rounded-4xl font-semibold transition-all duration-300 hover:scale-103 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none"
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
              className="w-10 h-10 text-black/80"
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
