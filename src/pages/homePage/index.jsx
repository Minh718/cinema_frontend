// @ts-nocheck
import React, { useEffect, useState } from "react";
import { BsCalendar3, BsClock, BsFilm } from "react-icons/bs";
import { useSelector } from "react-redux";
import {
  getFutureShowDatesByMovieId,
  getShowTimesByMovieIdAndDate,
  getMovieIdsHaveShowtimeByCinemaId,
} from "../../api/showtime";
import Cookies from "js-cookie";
import BannerMovies from "./components/BannerMovies";
import MovieCard from "./components/MovieCard";
import { getMoviesForHomePage } from "../../api/movie";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const { cinemaId } = useSelector((state) => state.cinema);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedShowTime, setSelectedShowTime] = useState(null);
  const [nowShowingMovies, setNowShowingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [moviesHaveShowtime, setMoviesHaveShowtime] = useState([]);
  const [dates, setDates] = useState([]);
  const [showTimes, setShowTimes] = useState([]);
  const navigate = useNavigate();
  const isFormComplete = selectedMovie && selectedDate && selectedShowTime;
  const handleBookNow = () => {
    const bookingData = {
      movie: moviesHaveShowtime.find((movie) => movie.id === selectedMovie),
      showTimeId: selectedShowTime,
      roomId: showTimes.find((showTime) => showTime.id === selectedShowTime)
        .roomId,
    };
    if (!isAuthenticated) {
      Cookies.set("bookingIntent", JSON.stringify(bookingData), {
        expires: 1 / 288,
      });
      navigate("/login");
    } else navigate("/booking", { state: { bookingData } });
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const [movieData, idsWithShowtime] = await Promise.all([
          getMoviesForHomePage(),
          getMovieIdsHaveShowtimeByCinemaId({ cinemaId }),
        ]);

        setNowShowingMovies(movieData.nowShowing);
        setUpcomingMovies(movieData.upcoming);

        const filtered = movieData.nowShowing.filter((movie) =>
          idsWithShowtime.includes(movie.id)
        );
        setMoviesHaveShowtime(filtered);
        setSelectedMovie("");
        setSelectedDate("");
        setSelectedShowTime("");
      } catch (err) {
        console.error(err);
      }
    }

    if (cinemaId) {
      fetchData();
    }
  }, [cinemaId]);
  useEffect(() => {
    if (selectedMovie && cinemaId) {
      getFutureShowDatesByMovieId({ movieId: selectedMovie, cinemaId })
        .then(setDates)
        .catch(console.error);
    } else {
      setDates([]);
      setSelectedDate("");
    }
  }, [selectedMovie, cinemaId]);

  useEffect(() => {
    const fetchShowTimes = async () => {
      if (selectedMovie && cinemaId && selectedDate) {
        try {
          const result = await getShowTimesByMovieIdAndDate({
            movieId: selectedMovie,
            cinemaId,
            date: selectedDate,
          });
          const showtimes = [
            ...result.dubShows.map((show) => ({ ...show, type: "Dub" })),
            ...result.subShows.map((show) => ({ ...show, type: "Sub" })),
          ];
          showtimes.sort((a, b) => a.startTime.localeCompare(b.startTime));
          setShowTimes(showtimes);
        } catch (error) {
          console.error(error);
        }
      } else {
        setShowTimes([]);
        setSelectedShowTime("");
      }
    };

    fetchShowTimes();
  }, [selectedMovie, cinemaId, selectedDate]);
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
                onChange={(e) => setSelectedMovie(Number(e.target.value))}
                className="w-full bg-gray-700 text-white pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-red-500"
              >
                <option value="">Select Movie</option>
                {moviesHaveShowtime.map((movie) => (
                  <option key={movie.id} value={movie.id}>
                    {movie.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <BsCalendar3 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-gray-700 text-white pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-red-500"
              >
                <option value="">Select date</option>
                {dates.map((date, index) => (
                  <option key={index} value={date}>
                    {date}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <BsClock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                value={selectedShowTime}
                onChange={(e) => setSelectedShowTime(Number(e.target.value))}
                className="w-full bg-gray-700 text-white pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-red-500"
              >
                <option value="">Select Time</option>
                {showTimes.map((showtime) => (
                  <option key={showtime.id} value={showtime.id}>
                    {showtime.startTime} ({showtime.type})
                  </option>
                ))}
              </select>
            </div>

            <button
              disabled={!isFormComplete}
              onClick={handleBookNow}
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

      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-white mb-8">Upcoming</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {upcomingMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
