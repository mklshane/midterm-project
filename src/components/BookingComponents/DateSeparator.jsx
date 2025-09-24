import React from "react";

const DateSeparator = ({ date, today, isPastDate }) => {
  return (
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
  );
};

export default DateSeparator;
