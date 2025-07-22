import React, { useEffect, useState } from "react";
import {
  HiChevronLeft,
  HiChevronRight,
  HiPlay,
  HiClock,
  HiUsers,
} from "react-icons/hi";
import { Button } from "../../components/Button";
import { generateDates } from "../../utils/DateUtil";
import MovieContainer from "./components/MovieContainer";
import { getNowShowingMovies } from "../../api/movie";

// Mock data for movies and showtimes
// const moviesData = {
//   "2024-01-15": [
//     {
//       id: 1,
//       title: "Avengers: Endgame",
//       originalTitle: "Avengers: Endgame",
//       poster: "/placeholder.svg?height=300&width=200",
//       ageRating: "T13",
//       duration: "3h01'",
//       genres: ["Action", "Adventure", "Science Fiction"],
//       format: "2D Phụ Đề Việt",
//       showtimes: [
//         { time: "09:00", price: "45K" },
//         { time: "12:30", price: "55K" },
//         { time: "16:00", price: "65K" },
//         { time: "19:30", price: "75K" },
//         { time: "22:45", price: "65K" },
//       ],
//     },
//     {
//       id: 2,
//       title: "The Dark Knight",
//       originalTitle: "The Dark Knight",
//       poster: "/placeholder.svg?height=300&width=200",
//       ageRating: "T16",
//       duration: "2h32'",
//       genres: ["Action", "Crime", "Drama"],
//       format: "2D Phụ Đề Việt",
//       showtimes: [
//         { time: "10:15", price: "50K" },
//         { time: "13:45", price: "60K" },
//         { time: "17:15", price: "70K" },
//         { time: "20:45", price: "80K" },
//       ],
//     },
//   ],
//   "2024-01-16": [
//     {
//       id: 3,
//       title: "Inception",
//       originalTitle: "Inception",
//       poster: "/placeholder.svg?height=300&width=200",
//       ageRating: "T13",
//       duration: "2h28'",
//       genres: ["Action", "Thriller", "Science Fiction"],
//       format: "2D Phụ Đề Việt",
//       showtimes: [
//         { time: "09:30", price: "45K" },
//         { time: "14:00", price: "60K" },
//         { time: "18:30", price: "70K" },
//         { time: "21:00", price: "70K" },
//       ],
//     },
//   ],
// };

export default function ShowtimePage() {
  const [selectedDate, setSelectedDate] = useState("2024-01-15");
  const [dates, setDates] = useState(generateDates());
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchNowShowingMovies = async () => {
      try {
        const data = await getNowShowingMovies();
        setMovies(data);
      } catch (error) {
        return <></>;
      }
    };

    fetchNowShowingMovies();
  }, []);
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-center">Lịch Chiếu Phim</h1>
        </div>
      </div>

      {/* Date Selector */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
            >
              <HiChevronLeft className="w-4 h-4" />
            </Button>

            <div className="flex-1 overflow-x-auto">
              <div className="flex space-x-3 pb-2 justify-center">
                {dates.map((dateItem) => (
                  <button
                    key={dateItem.date}
                    onClick={() => setSelectedDate(dateItem.date)}
                    className={` cursor-pointer flex-shrink-0 px-4 py-3 rounded-lg text-center transition-all duration-200 min-w-[80px] ${
                      selectedDate === dateItem.date
                        ? "bg-blue-600 text-white font-bold shadow-lg"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
                    }`}
                  >
                    <div className="text-sm font-medium">
                      {dateItem.displayDate}
                    </div>
                    <div className="text-xs mt-1">{dateItem.dayName}</div>
                    {dateItem.isToday && (
                      <div className="text-xs text-blue-300 mt-1">Hôm nay</div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
            >
              <HiChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="container mx-auto px-4 py-4">
        <div className="bg-yellow-900/30 border border-yellow-600/50 rounded-lg p-4">
          <p className="text-yellow-200 text-center">
            💡 Nhấn vào suất chiếu để tiến hành mua vé
          </p>
        </div>
      </div>

      {/* Movies List */}
      <div className="container mx-auto px-4 pb-8">
        {movies.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">
              Không có suất chiếu nào trong ngày này
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {movies.map((movie) => (
              <MovieContainer
                movie={movie}
                key={movie.id}
                date={selectedDate}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
