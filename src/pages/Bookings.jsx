import Navbar from "@/components/HomeComponents/Navbar";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useBookings } from "@/contexts/BookingsContext";
import { Link } from "react-router";
import ConfirmModal from "@/components/BookingComponents/ConfirmModal";

const Bookings = () => {
  const { isLoggedIn } = useAuth();
  const { bookings, removeBooking } = useBookings();
  const [filterDate, setFilterDate] = useState("");
  const [bookingToCancel, setBookingToCancel] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState("closest");

  const today = new Date().toISOString().split("T")[0];

  // Separate bookings into upcoming (including today) and past
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
      // Sort by closest date (including today and future dates)
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      const todayDate = new Date(today);

      // Calculate days difference from today
      const diffA = Math.abs(dateA - todayDate);
      const diffB = Math.abs(dateB - todayDate);

      return diffA - diffB;
    } else {
      // Sort by newest date (default)
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

  // Update sort method when filter date changes
  useEffect(() => {
    if (filterDate) {
      setSortBy("newest");
    } else {
      setSortBy("closest");
    }
  }, [filterDate]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-10">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-20">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center mt-20">
            <div className="w-24 h-24 bg-green/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-12 h-12 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Authentication Required
            </h2>
            <p className="text-gray-600 mb-8">
              Please log in to view your bookings and manage your reserved
              spaces.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-25">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Bookings</h1>
            <p className="text-gray-600 mt-2">
              {totalBookings} {totalBookings === 1 ? "booking" : "bookings"}{" "}
              total
              {filterDate && ` on ${new Date(filterDate).toLocaleDateString()}`}
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0">
            {!filterDate && (
              <div>
                <label
                  htmlFor="sort-by"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Sort by
                </label>
                <div className="relative">
                  <select
                    id="sort-by"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none pr-10"
                  >
                    <option value="closest">Closest Date</option>
                    <option value="newest">Newest First</option>
                  </select>
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

            <div>
              <label
                htmlFor="date-filter"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Filter by date
              </label>
              <div className="flex items-center">
                <input
                  type="date"
                  id="date-filter"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="p-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {filterDate && (
                  <button
                    onClick={() => setFilterDate("")}
                    className="ml-2 p-2 text-gray-500 hover:text-gray-700"
                    title="Clear filter"
                  >
                    <svg
                      className="w-5 h-5"
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
                )}
              </div>
            </div>
          </div>
        </div>

        {sortedBookings.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              No bookings yet
            </h2>
            <p className="text-gray-600 mb-6">
              {filterDate
                ? `You don't have any bookings on ${new Date(
                    filterDate
                  ).toLocaleDateString()}.`
                : "You haven't booked any study spaces yet."}
            </p>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
            >
              Browse Spaces
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedBookings).map(([date, dateBookings]) => {
              const isPastDate = date < today;

              return (
                <div key={date}>
                  {/* Date Separator */}
                  <div className="relative flex items-center py-4">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="flex-shrink mx-4 text-lg font-semibold text-gray-700">
                      {new Date(date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                      {date === today && (
                        <span className="ml-2 text-sm bg-green/30 text-black px-2 py-1 rounded-full">
                          Today
                        </span>
                      )}
                      {isPastDate && (
                        <span className="ml-2 text-sm bg-gray-300 text-gray-700 px-2 py-1 rounded-full">
                          Past
                        </span>
                      )}
                    </span>
                    <div className="flex-grow border-t border-gray-300"></div>
                  </div>

                  {/* Bookings for this date */}
                  <div className="grid gap-6">
                    {dateBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className={`bg-white rounded-2xl shadow-xl overflow-hidden ${
                          isPastDate ? "opacity-70" : ""
                        }`}
                      >
                        <div className="p-4  md:flex md:items-center md:justify-between">
                          <div className="flex-1">
                            <div className="flex items-center">
                              <img
                                src={booking.image}
                                alt={booking.spaceName}
                                className="w-50 h-26 object-cover rounded-xl mr-6"
                              />
                              <div>
                                <h3 className="text-xl font-semibold text-gray-800">
                                  {booking.spaceName}
                                </h3>
                                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="flex items-center">
                                    <svg
                                      className="w-5 h-5 text-gray-500 mr-2"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                      />
                                    </svg>
                                    <span className="text-gray-700">
                                      {booking.timeSlot}
                                    </span>
                                  </div>
                                  <div className="flex items-center">
                                    <svg
                                      className="w-5 h-5 text-gray-500 mr-2"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                      />
                                    </svg>
                                    <span className="text-gray-700">
                                      ₱{booking.price}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 md:mt-0 md:ml-6">
                            {!isPastDate && (
                              <button
                                onClick={() => handleCancelClick(booking)}
                                className="px-4 py-2 bg-white border border-red-200 text-sm text-red-700  rounded-xl font-medium hover:bg-red-50 transition-colors"
                              >
                                Cancel Booking
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <ConfirmModal
          isOpen={isModalOpen}
          onClose={handleCancelCancel}
          onConfirm={handleCancelConfirm}
          title="Cancel Booking"
          message={`Are you sure you want to cancel your booking for ${bookingToCancel?.spaceName} on ${bookingToCancel?.date} at ${bookingToCancel?.timeSlot}?`}
          confirmText="Yes, Cancel Booking"
          cancelText="Keep Booking"
        />
      </div>
    </div>
  );
};

export default Bookings;
