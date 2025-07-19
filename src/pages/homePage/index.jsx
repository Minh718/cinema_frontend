import React, { useState } from "react";
import { BsCalendar3, BsClock, BsFilm } from "react-icons/bs";
import { format } from "date-fns";
import BannerMovies from "./components/BannerMovies";
import MovieCard from "./components/MovieCard";
const HomePage = () => {
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [nowShowingMovies, setNowShowingMovies] = useState([]);
  const [upcomngMovies, setUpcomingMovies] = useState([]);
  const [nowShowingMovieIds, setNowShowingMovieIds] = useState([1, 2]);

  const timeSlots = ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM", "10:00 PM"];

  const isFormComplete = selectedMovie && selectedDate && selectedTime;

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <BannerMovies movies={nowShowingMovies} />
      {/* Booking Form */}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-gray-800 rounded-xl p-6 md:p-8 max-w-4xl mx-auto -mt-20 relative z-10 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6">
            Book Your Movie
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <BsFilm className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                value={selectedMovie}
                onChange={(e) => setSelectedMovie(e.target.value)}
                className="w-full bg-gray-700 text-white pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-red-500"
              >
                <option value="">Select Movie</option>
                {nowShowingMovies.map((movie) => (
                  <option key={movie.id} value={movie.id}>
                    {movie.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <BsCalendar3 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={format(new Date(), "yyyy-MM-dd")}
                className="w-full bg-gray-700 text-white pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="relative">
              <BsClock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full bg-gray-700 text-white pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-red-500"
              >
                <option value="">Select Time</option>
                {timeSlots.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            <button
              disabled={!isFormComplete}
              className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                isFormComplete
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-gray-600 text-gray-400 cursor-not-allowed"
              }`}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Now Showing Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-white mb-8">Now Showing</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {nowShowingMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
