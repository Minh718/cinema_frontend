import { useState } from "react";
import {
  HiChevronLeft,
  HiChevronRight,
  HiPlay,
  HiClock,
  HiUsers,
} from "react-icons/hi";
import { Button } from "../../components/Button";

// Mock data for movies and showtimes
const moviesData = {
  "2024-01-15": [
    {
      id: 1,
      title: "Avengers: Endgame",
      originalTitle: "Avengers: Endgame",
      poster: "/placeholder.svg?height=300&width=200",
      ageRating: "T13",
      duration: "3h01'",
      genres: ["Action", "Adventure", "Science Fiction"],
      format: "2D Phụ Đề Việt",
      showtimes: [
        { time: "09:00", price: "45K" },
        { time: "12:30", price: "55K" },
        { time: "16:00", price: "65K" },
        { time: "19:30", price: "75K" },
        { time: "22:45", price: "65K" },
      ],
    },
    {
      id: 2,
      title: "The Dark Knight",
      originalTitle: "The Dark Knight",
      poster: "/placeholder.svg?height=300&width=200",
      ageRating: "T16",
      duration: "2h32'",
      genres: ["Action", "Crime", "Drama"],
      format: "2D Phụ Đề Việt",
      showtimes: [
        { time: "10:15", price: "50K" },
        { time: "13:45", price: "60K" },
        { time: "17:15", price: "70K" },
        { time: "20:45", price: "80K" },
      ],
    },
  ],
  "2024-01-16": [
    {
      id: 3,
      title: "Inception",
      originalTitle: "Inception",
      poster: "/placeholder.svg?height=300&width=200",
      ageRating: "T13",
      duration: "2h28'",
      genres: ["Action", "Thriller", "Science Fiction"],
      format: "2D Phụ Đề Việt",
      showtimes: [
        { time: "09:30", price: "45K" },
        { time: "14:00", price: "60K" },
        { time: "18:30", price: "70K" },
        { time: "21:00", price: "70K" },
      ],
    },
  ],
};

// Generate dates for the next 7 days
const generateDates = () => {
  const dates = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const dayNames = [
      "Chủ Nhật",
      "Thứ Hai",
      "Thứ Ba",
      "Thứ Tư",
      "Thứ Năm",
      "Thứ Sáu",
      "Thứ Bảy",
    ];

    dates.push({
      date: date.toISOString().split("T")[0],
      displayDate: `${date.getDate()}/${date.getMonth() + 1}`,
      dayName: dayNames[date.getDay()],
      isToday: i === 0,
    });
  }

  return dates;
};

// const Button = ({ children, variant = "default", size = "default", className = "", ...props }) => {
//   const baseClasses =
//     "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"

//   const variants = {
//     default: "bg-primary text-primary-foreground hover:bg-primary/90",
//     ghost: "hover:bg-accent hover:text-accent-foreground",
//   }

//   const sizes = {
//     default: "h-10 py-2 px-4",
//     sm: "h-9 px-3 rounded-md",
//   }

//   const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`

//   return (
//     <button className={classes} {...props}>
//       {children}
//     </button>
//   )
// }

export default function ShowtimePage() {
  const [selectedDate, setSelectedDate] = useState("2024-01-15");
  const dates = generateDates();

  const selectedMovies = moviesData[selectedDate] || [];

  const handleShowtimeClick = (movieId, time, price) => {
    // Handle booking flow - in a real app, this would navigate to booking page
    alert(`Booking movie ${movieId} at ${time} for ${price}`);
  };

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
              <div className="flex space-x-3 pb-2">
                {dates.map((dateItem) => (
                  <button
                    key={dateItem.date}
                    onClick={() => setSelectedDate(dateItem.date)}
                    className={`flex-shrink-0 px-4 py-3 rounded-lg text-center transition-all duration-200 min-w-[80px] ${
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
        {selectedMovies.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">
              Không có suất chiếu nào trong ngày này
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {selectedMovies.map((movie) => (
              <div
                key={movie.id}
                className="bg-gray-800 rounded-xl shadow-xl overflow-hidden"
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Movie Poster */}
                  <div className="lg:w-48 flex-shrink-0">
                    <img
                      src={movie.poster || "/placeholder.svg"}
                      alt={movie.title}
                      className="w-full h-64 lg:h-80 object-cover"
                    />
                  </div>

                  {/* Movie Details */}
                  <div className="flex-1 p-6">
                    <div className="mb-4">
                      <h2 className="text-2xl lg:text-3xl font-bold mb-2">
                        {movie.title}
                      </h2>
                      <p className="text-gray-400 text-lg mb-2">
                        {movie.originalTitle}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 mb-3">
                        <span className="bg-red-600 text-white px-2 py-1 rounded text-sm font-medium">
                          {movie.ageRating}
                        </span>
                        <span className="flex items-center text-gray-300">
                          <HiClock className="w-4 h-4 mr-1" />
                          {movie.duration}
                        </span>
                        <button className="flex items-center text-blue-400 hover:text-blue-300 transition-colors">
                          <HiPlay className="w-4 h-4 mr-1" />
                          Trailer
                        </button>
                      </div>

                      <div className="mb-3">
                        <span className="text-gray-400 text-sm">
                          {movie.genres.join(", ")}
                        </span>
                      </div>

                      <div className="mb-4">
                        <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-sm">
                          {movie.format}
                        </span>
                      </div>
                    </div>

                    {/* Showtimes */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center">
                        <HiUsers className="w-5 h-5 mr-2" />
                        Suất Chiếu
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                        {movie.showtimes.map((showtime, index) => (
                          <button
                            key={index}
                            onClick={() =>
                              handleShowtimeClick(
                                movie.id,
                                showtime.time,
                                showtime.price
                              )
                            }
                            className="bg-gray-700 hover:bg-blue-600 text-white py-3 px-4 rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95"
                          >
                            <div className="font-bold text-lg">
                              {showtime.time}
                            </div>
                            <div className="text-sm text-gray-300">
                              {showtime.price}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
