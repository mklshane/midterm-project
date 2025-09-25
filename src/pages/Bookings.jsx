import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useBookings } from "@/contexts/BookingsContext";
import ConfirmModal from "@/components/BookingComponents/ConfirmModal";
import BookingsHeader from "@/components/BookingComponents/BookingsHeader";
import BookingsContent from "@/components/BookingComponents/BookingsContent";
import LoginRequired from "@/components/BookingComponents/LoginRequired";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/HomeComponents/Navbar";
import animations from "@/utils/animation";

const { pageVariants, pageTransition } = animations.page;

const Bookings = () => {
  // get authentication and booking context values
  const { isLoggedIn } = useAuth();
  const { bookings, removeBooking } = useBookings();

  // ui and state management
  const [filterDate, setFilterDate] = useState("");
  const [bookingToCancel, setBookingToCancel] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState("closest");

  // get today's date in yyyy-mm-dd format
  const today = new Date().toISOString().split("T")[0];

  // separates bookings into upcoming and past
  const separateBookings = (bookingsList) => {
    const upcoming = [];
    const past = [];

    bookingsList.forEach((booking) => {
      if (booking.date >= today) {
        upcoming.push(booking);
      } else {
        past.push(booking);
      }
    });

    return { upcoming, past };
  };

  // filter bookings by selected date (if any)
  const filteredBookings = filterDate
    ? bookings.filter((booking) => booking.date === filterDate)
    : bookings;

  // split filtered bookings into upcoming and past
  const { upcoming: filteredUpcoming, past: filteredPast } =
    separateBookings(filteredBookings);

  // sort upcoming bookings by "closest" or "newest"
  const sortedUpcoming = [...filteredUpcoming].sort((a, b) => {
    if (sortBy === "closest") {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      const todayDate = new Date(today);

      const diffA = Math.abs(dateA - todayDate);
      const diffB = Math.abs(dateB - todayDate);

      return diffA - diffB;
    } else {
      return new Date(b.date) - new Date(a.date);
    }
  });

  // sort past bookings by newest first
  const sortedPast = [...filteredPast].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // merge sorted bookings
  const sortedBookings = [...sortedUpcoming, ...sortedPast];

  // group bookings by date
  const groupedBookings = sortedBookings.reduce((groups, booking) => {
    const date = booking.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(booking);
    return groups;
  }, {});

  // count total bookings
  const totalBookings = sortedBookings.length;

  // handle booking cancellation click
  const handleCancelClick = (booking) => {
    setBookingToCancel(booking);
    setIsModalOpen(true);
  };

  // confirm cancellation and remove booking
  const handleCancelConfirm = () => {
    if (bookingToCancel) {
      removeBooking(bookingToCancel.id);
      setBookingToCancel(null);
    }
    setIsModalOpen(false);
  };

  // close cancel modal without removing booking
  const handleCancelCancel = () => {
    setBookingToCancel(null);
    setIsModalOpen(false);
  };

  // change sorting automatically based on filter state
  useEffect(() => {
    if (filterDate) {
      setSortBy("newest");
    } else {
      setSortBy("closest");
    }
  }, [filterDate]);

  // if user is not logged in, show login required component
  if (!isLoggedIn) {
    return <LoginRequired />;
  }

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen bg-gray-50"
    >
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-25">
        {/* header with filter and sort controls */}
        <BookingsHeader
          totalBookings={totalBookings}
          filterDate={filterDate}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onFilterDateChange={setFilterDate}
        />

        {/* bookings list */}
        <AnimatePresence mode="wait">
          <BookingsContent
            key={`${filterDate}-${sortBy}`}
            groupedBookings={groupedBookings}
            totalBookings={totalBookings}
            filterDate={filterDate}
            today={today}
            onCancelClick={handleCancelClick}
          />
        </AnimatePresence>

        {/* cancel booking confirmation modal */}
        <AnimatePresence>
          {isModalOpen && (
            <ConfirmModal
              isOpen={isModalOpen}
              onClose={handleCancelCancel}
              onConfirm={handleCancelConfirm}
              title="Cancel Booking"
              message={`Are you sure you want to cancel your booking for ${bookingToCancel?.spaceName} on ${bookingToCancel?.date} at ${bookingToCancel?.timeSlot}?`}
              confirmText="Yes, Cancel Booking"
              cancelText="Keep Booking"
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Bookings;
