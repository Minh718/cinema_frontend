import React from "react";
import { convert24HourToAmPm } from "../../../utils/DateUtil";

export default function ShowTimesContainer({
  showtimes,
  format,
  handleShowtimeClick,
  price,
}) {
  return (
    <div>
      <h5 className="text-lg font-semibold text-white mb-3">{format}</h5>

      {/* Showtimes */}
      <div>
        {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"> */}
        <div className="flex flex-wrap gap-3">
          {showtimes.map((showtime, index) => (
            <button
              key={index}
              onClick={() => handleShowtimeClick(showtime)}
              // className="bg-gray-700 hover:bg-blue-600 text-white py-1 cursor-pointer px-1 rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95"
              className="flex cursor-pointer flex-col items-center justify-center min-w-[80px] h-16 bg-gray-700 hover:bg-red-600 border border-gray-600 hover:border-red-500 rounded-lg transition-all duration-300 hover:scale-105 group"
            >
              {/* <div className="font-bold text-lg">{showtime.startTime}</div>
              <div className="text-sm text-gray-300">${price}</div> */}
              <span className="text-white font-semibold text-sm group-hover:text-white">
                {convert24HourToAmPm(showtime.startTime)}
              </span>
              <span className="text-gray-400 text-xs group-hover:text-red-100">
                ${price}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
