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
   * Check if a time slot is in the future for the selected date
   */
  const isTimeSlotInFuture = (date, timeSlot) => {
    if (!date || !timeSlot) return true; // If no date or slot, don't filter yet

    const now = new Date();
    const selectedDate = new Date(date);
    const currentDate = new Date(now.toISOString().split("T")[0]);

    // If the selected date is before today, no slots are available
    if (selectedDate < currentDate) return false;

    // If the selected date is today, check if the time slot is in the future
    if (selectedDate.toDateString() === currentDate.toDateString()) {
      // Parse the time slot (assumes format like "9am - 1pm" or "Morning")
      let slotStartTime;
      if (timeSlot.includes("-")) {
        // For formats like "9am - 1pm"
        const startTimeStr = timeSlot.split(" - ")[0];
        const [hours, minutes = "00"] = startTimeStr.match(/\d+/)[0].split(":");
        const isPM = startTimeStr.toLowerCase().includes("pm");
        slotStartTime = new Date(date);
        slotStartTime.setHours(
          parseInt(hours) + (isPM && hours !== "12" ? 12 : 0),
          parseInt(minutes)
        );
      } else {
        // for vague slots like "Morning", "Afternoon", "Evening"
        const slotMap = {
          Morning: 6, // morning starts at 6 AM
          Afternoon: 12, // afternoon starts at 12 PM
          Evening: 17, // evening starts at 5 PM
          "Full Day": 0, // Full Day starts at midnight
          "Night Shift": 21, // Night Shift starts at 9 PM
          "Night Owl Pass": 21, // Night Owl Pass starts at 9 PM
          "Night Pass": 21, // Night Pass starts at 9 PM
        };
        slotStartTime = new Date(date);
        slotStartTime.setHours(slotMap[timeSlot] || 0, 0);
      }

      return slotStartTime > now;
    }

    // If the date is in the future, all slots are available
    return true;
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

    // If slot becomes invalid after date change, reset it
    if (field === "date" && bookingDetails.timeSlot && bookingDetails.date) {
      const isStillValid =
        !isTimeSlotBooked(value, bookingDetails.timeSlot) &&
        isTimeSlotInFuture(value, bookingDetails.timeSlot);
      if (!isStillValid) {
        handleBookingChange("timeSlot", "");
      }
    }
  };

  // Check if the selected slot is already booked or in the past
  const isSelectedSlotBookedOrPast =
    bookingDetails.date &&
    bookingDetails.timeSlot &&
    (isTimeSlotBooked(bookingDetails.date, bookingDetails.timeSlot) ||
      !isTimeSlotInFuture(bookingDetails.date, bookingDetails.timeSlot));

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
              onChange={(e) => handleBookingChange("date", e.target.value)}
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
                    const isPast =
                      bookingDetails.date &&
                      !isTimeSlotInFuture(bookingDetails.date, slot);
                    const isDisabled = isBooked || isPast;
                    return (
                      <option
                        key={index}
                        value={slot}
                        disabled={isDisabled}
                        className={
                          isDisabled ? "text-gray-400 bg-gray-100" : ""
                        }
                      >
                        {slot} {isBooked && "(Booked)"}{" "}
                        {isPast && !isBooked && "(Past)"}
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
            className="w-full bg-green hover:bg-black hover:text-green hover:border text-black py-3 px-6 rounded-4xl font-semibold transition-all duration-300 hover:scale-103 disabled:bg-gray-400 disabled:text-black disabled:hover:scale-100 disabled:cursor-not-allowed disabled:transform-none"
            disabled={
              !bookingDetails.date ||
              !bookingDetails.timeSlot ||
              isSelectedSlotBookedOrPast
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
