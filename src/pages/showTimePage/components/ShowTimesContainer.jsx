import React from "react";

export default function ShowTimesContainer({
  showtimes,
  format,
  handleShowtimeClick,
  price,
}) {
  return (
    <>
      <div className="mb-2">
        <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-sm">
          {format}
        </span>
      </div>

      {/* Showtimes */}
      <div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {showtimes.map((showtime, index) => (
            <button
              key={index}
              onClick={() => handleShowtimeClick(showtime)}
              className="bg-gray-700 hover:bg-blue-600 text-white py-1 cursor-pointer px-1 rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95"
            >
              <div className="font-bold text-lg">{showtime.startTime}</div>
              <div className="text-sm text-gray-300">${price}</div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
