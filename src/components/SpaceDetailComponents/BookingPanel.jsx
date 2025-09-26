import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useBookings } from "@/contexts/BookingsContext";
import BookingVerificationModal from "./BookingVerificationModal";

const BookingPanel = ({ space, bookingDetails, onBookingChange }) => {
  const { isLoggedIn } = useAuth();
  const { bookings, addBooking } = useBookings();
  const { id: spaceId, name, price, time_slots, main_image } = space;
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [latestBooking, setLatestBooking] = useState(null);

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
        booking.status !== "cancelled"
    );
  };

  /**
   * Check if a time slot is available for the selected date
   * Current time slot is available if we're currently within its time range
   */
  const isTimeSlotAvailable = (date, timeSlot) => {
    if (!date || !timeSlot) return true;

    const fullDayPasses = ["Full Day", "Full Day Pass", "24 Hours", "All Day"];
    if (fullDayPasses.some((pass) => timeSlot.includes(pass))) return true;

    const now = new Date();
    const selectedDate = new Date(date);
    const currentDate = new Date(now.toISOString().split("T")[0]);

    if (selectedDate < currentDate) return false;

    // if the selected date is today, check time slot availability
    if (selectedDate.toDateString() === currentDate.toDateString()) {
      // extract time range from slot name ("Morning (8 AM - 12 PM)" -> "8 AM - 12 PM")
      let timeRange = timeSlot;
      if (timeSlot.includes("(") && timeSlot.includes(")")) {
        timeRange = timeSlot.match(/\(([^)]+)\)/)[1];
      }

      // parse the time range
      if (timeRange.includes("-")) {
        const [startTimeStr, endTimeStr] = timeRange.split(" - ");

        // convert time strings to 24-hour format
        const parseTime = (timeStr) => {
          const time = timeStr.trim();
          const isPM = time.toLowerCase().includes("pm");
          const hourMatch = time.match(/(\d+)/);
          if (!hourMatch) return null;

          let hours = parseInt(hourMatch[1]);
          if (isPM && hours !== 12) hours += 12;
          if (!isPM && hours === 12) hours = 0;

          return hours;
        };

        const startHour = parseTime(startTimeStr);
        const endHour = parseTime(endTimeStr);
        const currentHour = now.getHours();

        if (startHour !== null && endHour !== null) {
          // check if we're currently within this time slot
          const isCurrentlyInSlot =
            currentHour >= startHour && currentHour < endHour;
          if (isCurrentlyInSlot) return true;

          // if not currently in slot, check if it's in the future
          return startHour > currentHour;
        }
      }

      // for slots without specific time ranges, use default logic
      const slotMap = {
        Morning: 6,
        Afternoon: 12,
        Evening: 17,
        "Night Shift": 21,
        "Night Owl Pass": 21,
        "Night Pass": 21,
      };

      // find matching slot name
      for (const [slotName, startHour] of Object.entries(slotMap)) {
        if (timeSlot.includes(slotName)) {
          const currentHour = now.getHours();
          // check if we're currently within this time slot
          const isCurrentlyInSlot =
            (slotName === "Morning" && currentHour >= 6 && currentHour < 12) ||
            (slotName === "Afternoon" &&
              currentHour >= 12 &&
              currentHour < 18) ||
            (slotName === "Evening" && currentHour >= 17 && currentHour < 23) ||
            (slotName.includes("Night") &&
              (currentHour >= 21 || currentHour < 6));

          if (isCurrentlyInSlot) return true;
          return startHour > currentHour;
        }
      }
    }

    return true;
  };

  /**
   * Handle booking submission
   * Validates required fields, then creates and stores a booking
   */
  const handleBookNow = () => {
    if (!bookingDetails.date || !bookingDetails.timeSlot) return;

    const newBooking = {
      id: `BK-${Date.now()}`,
      spaceId: spaceId,
      spaceName: name,
      date: bookingDetails.date,
      timeSlot: bookingDetails.timeSlot,
      price: price,
      status: "confirmed",
      image: main_image,
      bookedAt: new Date().toISOString(),
    };

    addBooking(newBooking);
    setLatestBooking(newBooking);
    setShowVerificationModal(true);

    // Reset the form
    onBookingChange("timeSlot", "");
    onBookingChange("date", "");
  };

  /**
   * Handle modal close
   */
  const handleCloseModal = () => {
    setShowVerificationModal(false);
    setLatestBooking(null);
  };

  // handle modal confirmation
  const handleConfirmModal = () => {
    setShowVerificationModal(false);
    setLatestBooking(null);
  };

  // pass changes back to parent
  const handleBookingChange = (field, value) => {
    onBookingChange(field, value);

    // if slot becomes invalid after date change, reset it
    if (field === "date" && bookingDetails.timeSlot && bookingDetails.date) {
      const isStillValid =
        !isTimeSlotBooked(value, bookingDetails.timeSlot) &&
        isTimeSlotAvailable(value, bookingDetails.timeSlot);
      if (!isStillValid) {
        onBookingChange("timeSlot", "");
      }
    }
  };

  // check if the selected slot is already booked or unavailable
  const isSelectedSlotBookedOrUnavailable =
    bookingDetails.date &&
    bookingDetails.timeSlot &&
    (isTimeSlotBooked(bookingDetails.date, bookingDetails.timeSlot) ||
      !isTimeSlotAvailable(bookingDetails.date, bookingDetails.timeSlot));

  return (
    <>
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
                      const isUnavailable =
                        bookingDetails.date &&
                        !isTimeSlotAvailable(bookingDetails.date, slot);
                      const isDisabled = isBooked || isUnavailable;
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
                          {isUnavailable && !isBooked && "(Unavailable)"}
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
                isSelectedSlotBookedOrUnavailable
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

      {/* Booking Verification Modal */}
      <BookingVerificationModal
        isOpen={showVerificationModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmModal}
        booking={latestBooking}
      />
    </>
  );
};

export default BookingPanel;
