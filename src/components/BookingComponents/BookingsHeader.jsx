import React from "react";
import { motion } from "framer-motion";

const BookingsHeader = ({
  totalBookings,
  filterDate,
  sortBy,
  onSortChange,
  onFilterDateChange,
}) => {
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold text-gray-800">My Bookings</h1>
        <p className="text-gray-600 mt-2">
          {totalBookings} {totalBookings === 1 ? "booking" : "bookings"} total
          {filterDate && ` on ${new Date(filterDate).toLocaleDateString()}`}
        </p>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0"
      >
        {!filterDate && (
          <SortDropdown sortBy={sortBy} onSortChange={onSortChange} />
        )}

        <DateFilter
          filterDate={filterDate}
          onFilterDateChange={onFilterDateChange}
        />
      </motion.div>
    </motion.div>
  );
};

const SortDropdown = ({ sortBy, onSortChange }) => {
  const dropdownVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <motion.div variants={dropdownVariants}>
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
          onChange={(e) => onSortChange(e.target.value)}
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
    </motion.div>
  );
};

const DateFilter = ({ filterDate, onFilterDateChange }) => {
  const filterVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut", delay: 0.1 },
    },
  };

  return (
    <motion.div variants={filterVariants}>
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
          onChange={(e) => onFilterDateChange(e.target.value)}
          className="p-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {filterDate && (
          <ClearFilterButton onClear={() => onFilterDateChange("")} />
        )}
      </div>
    </motion.div>
  );
};

const ClearFilterButton = ({ onClear }) => {
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 500, damping: 15 },
    },
    hover: { scale: 1.1, rotate: 90 },
    tap: { scale: 0.9 },
  };

  return (
    <motion.button
      variants={buttonVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
      onClick={onClear}
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
    </motion.button>
  );
};

export default BookingsHeader;
