// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../../../components/Card";
import { getShowTimeGroupsbyMovieInDate } from "../../../api/showtime";
import Cookies from "js-cookie";
import {
  convert24HourToAmPm,
  formatIsoDateToFullEnglishDate,
} from "../../../utils/DateUtil";
import LoadingComponent from "../../../components/LoadingComponent";
import { TypeShowTime } from "../../../constants/TypeShowTime";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const showtimes = [
  {
    date: "Today",
    dateValue: "2024-03-15",
    times: [
      { time: "2:30 PM", room: "IMAX Theater 1", price: "$18.50" },
      { time: "6:00 PM", room: "Premium Theater 2", price: "$15.50" },
      { time: "9:30 PM", room: "Standard Theater 3", price: "$12.50" },
    ],
  },
  {
    date: "Tomorrow",
    dateValue: "2024-03-16",
    times: [
      { time: "1:00 PM", room: "IMAX Theater 1", price: "$18.50" },
      { time: "4:30 PM", room: "Premium Theater 2", price: "$15.50" },
      { time: "8:00 PM", room: "Standard Theater 3", price: "$12.50" },
      { time: "10:45 PM", room: "Premium Theater 4", price: "$15.50" },
    ],
  },
  {
    date: "Sun, Mar 17",
    dateValue: "2024-03-17",
    times: [
      { time: "12:30 PM", room: "IMAX Theater 1", price: "$18.50" },
      { time: "3:45 PM", room: "Premium Theater 2", price: "$15.50" },
      { time: "7:15 PM", room: "Standard Theater 3", price: "$12.50" },
    ],
  },
];

export default function ShowTimeGroup({ date, movie }) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleBookNow = ({ roomId, showTimeId }) => {
    const bookingData = {
      movie: movie,
      showTimeId,
      roomId,
    };
    if (!isAuthenticated) {
      Cookies.set("bookingIntent", JSON.stringify(bookingData), {
        expires: 1 / 288,
      });
      navigate("/login");
    } else navigate("/booking", { state: { bookingData } });
  };
  const [showTimeGroups, setShowTimeGroups] = useState([]);
  useEffect(() => {
    const fetchShowTimeGroupsbyMovieInDate = async () => {
      try {
        const data = await getShowTimeGroupsbyMovieInDate({
          date: date.date,
          movieId: movie.id,
        });
        setShowTimeGroups(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchShowTimeGroupsbyMovieInDate();
  }, [date, movie.id]);
  if (showTimeGroups.length === 0) return <LoadingComponent />;
  return (
    <div className="space-y-6 mb-8">
      <h3 className="text-xl font-semibold mb-2 text-red-400">
        {formatIsoDateToFullEnglishDate(date.date)}
      </h3>
      <Card className="bg-gray-800 border-gray-700 overflow-hidden pt-2">
        <CardContent className="p-6">
          <div>
            {showTimeGroups.map((showTimeGroup) => (
              <div
                key={showTimeGroup.id}
                className="flex flex-col lg:flex-row gap-6"
              >
                <div className="flex-1 space-y-4">
                  <div>
                    <h5 className="text-lg font-semibold text-white mb-3">
                      {showTimeGroup.type === TypeShowTime.SUBTITLE
                        ? "2D Dubbed Movie"
                        : "2D Subtitle Movie"}
                    </h5>

                    {/* Showtime Buttons */}
                    <div className="flex flex-wrap gap-3">
                      {showTimeGroup.showTimes.map((showtime, index) => (
                        <button
                          key={index}
                          onClick={() =>
                            handleBookNow({
                              roomId: showTimeGroup.roomId,
                              showTimeId: showtime.id,
                            })
                          }
                          className="flex flex-col cursor-pointer items-center justify-center min-w-[80px] h-16 bg-gray-700 hover:bg-red-600 border border-gray-600 hover:border-red-500 rounded-lg transition-all duration-300 hover:scale-105 group"
                        >
                          <span className="text-white font-semibold text-sm group-hover:text-white">
                            {convert24HourToAmPm(showtime.startTime)}
                          </span>
                          <span className="text-gray-400 text-xs group-hover:text-red-100">
                            ${showTimeGroup.basePrice}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
