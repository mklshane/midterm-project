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
  const { isLoggedIn } = useAuth();
  const { bookings, removeBooking } = useBookings();
  const [filterDate, setFilterDate] = useState("");
  const [bookingToCancel, setBookingToCancel] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState("closest");

  const today = new Date().toISOString().split("T")[0];

  // Separate bookings into upcoming and past
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

  // Filter bookings by date if a filter is set
  const filteredBookings = filterDate
    ? bookings.filter((booking) => booking.date === filterDate)
    : bookings;

  // Separate filtered bookings into upcoming and past
  const { upcoming: filteredUpcoming, past: filteredPast } =
    separateBookings(filteredBookings);

  // Sort bookings based on selected sort option (only for upcoming bookings)
  const sortedUpcoming = [...filteredUpcoming].sort((a, b) => {
    if (sortBy === "closest") {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      const todayDate = new Date(today);

      // Calculate days difference from today
      const diffA = Math.abs(dateA - todayDate);
      const diffB = Math.abs(dateB - todayDate);

      return diffA - diffB;
    } else {
      // Sort by newest date
      return new Date(b.date) - new Date(a.date);
    }
  });

  // Sort past bookings by most recent first
  const sortedPast = [...filteredPast].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // Combine sorted upcoming and past bookings
  const sortedBookings = [...sortedUpcoming, ...sortedPast];

  // Group bookings by date
  const groupedBookings = sortedBookings.reduce((groups, booking) => {
    const date = booking.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(booking);
    return groups;
  }, {});

  const totalBookings = sortedBookings.length;

  const handleCancelClick = (booking) => {
    setBookingToCancel(booking);
    setIsModalOpen(true);
  };

  const handleCancelConfirm = () => {
    if (bookingToCancel) {
      removeBooking(bookingToCancel.id);
      setBookingToCancel(null);
    }
    setIsModalOpen(false);
  };

  const handleCancelCancel = () => {
    setBookingToCancel(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (filterDate) {
      setSortBy("newest");
    } else {
      setSortBy("closest");
    }
  }, [filterDate]);

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
        <BookingsHeader
          totalBookings={totalBookings}
          filterDate={filterDate}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onFilterDateChange={setFilterDate}
        />

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
