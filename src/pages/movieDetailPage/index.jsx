// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { Badge } from "../../components/Badge";
import { Card, CardContent } from "../../components/Card";
import {
  IoArrowBack,
  IoCalendarOutline,
  IoTimeOutline,
  IoStar,
  IoPlay,
  IoChevronForward,
} from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { getDetailMovie } from "../../api/movie";
import LoadingPage from "../../components/LoadingPage";
import {
  formatIsoDateToFullEnglishDate,
  formatMinutesToHourMinute,
  generateDates,
} from "../../utils/DateUtil";
import { HiClock } from "react-icons/hi";
import ShowTimeGroup from "./components/ShowTimeGroup";
import { MovieStatus } from "../../constants/MovieStatus";

export default function MovieDetailPage() {
  const [dates, setDates] = useState(generateDates(5));
  const [showTrailer, setShowTrailer] = useState(false);
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();
  const scrollToShowtimes = () => {
    const showtimeSection = document.getElementById("showtimes");
    showtimeSection?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchDetailMovie = async () => {
      try {
        const data = await getDetailMovie(movieId);
        setMovie(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDetailMovie();
  }, [movieId]);
  if (movie == null) return <LoadingPage />;
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Breadcrumb Navigation */}
      <div className="bg-gray-800/50 border-b border-gray-700">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm">
            <button className="text-gray-400 hover:text-white transition-colors">
              Home
            </button>
            <IoChevronForward className="w-4 h-4 text-gray-500" />
            <button className="text-gray-400 hover:text-white transition-colors">
              Movies
            </button>
            <IoChevronForward className="w-4 h-4 text-gray-500" />
            <span className="text-white">{movie.title}</span>
          </nav>
        </div>
      </div>

      {/* Back Button */}
      <Link to={"/movies"}>
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            className="text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-200"
          >
            <IoArrowBack className="w-4 h-4 mr-2" />
            Back to Movies
          </Button>
        </div>
      </Link>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Movie posterPath */}
          <div className="lg:col-span-1">
            <div className="relative group">
              <img
                src={movie.posterPath || "/placeholder.svg"}
                alt={movie.title}
                className="w-full rounded-lg shadow-2xl transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>

          {/* Movie Details */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {movie.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="bg-red-600 text-white px-2 py-1 rounded text-sm font-medium">
                  {movie.ageRating}
                </span>
                {movie.genres.map((g) => (
                  <Badge
                    key={g.id}
                    variant="secondary"
                    className="bg-red-600/20 text-red-400 border-red-600/30"
                  >
                    {g.name}
                  </Badge>
                ))}
                <div className="flex items-center text-gray-400">
                  <IoTimeOutline className="w-4 h-4 mr-1" />
                  {formatMinutesToHourMinute(movie.duration)}
                </div>
                <div className="flex items-center text-gray-400">
                  <IoCalendarOutline className="w-4 h-4 mr-1" />
                  {formatIsoDateToFullEnglishDate(movie.releaseDate)}
                </div>
                <div className="flex items-center text-yellow-400">
                  <IoStar className="w-4 h-4 mr-1 fill-current" />
                  {movie.rating}
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">Overview</h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                {movie.overview}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Director</h3>
                <p className="text-gray-300">{movie.director}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Cast</h3>
                <p className="text-gray-300">{movie.cast?.join(", ")}</p>
              </div>
            </div>

            {/* Trailer Preview */}
            <div className="relative">
              <h3 className="text-xl font-semibold mb-4">Trailer</h3>
              <div
                className="relative group cursor-pointer"
                onClick={() => setShowTrailer(true)}
              >
                <img
                  src={movie.trailer || "/placeholder.svg"}
                  alt="Movie Trailer"
                  className="w-full rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-lg group-hover:bg-black/60 transition-all duration-300">
                  <div className="bg-red-600 rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                    <IoPlay className="w-8 h-8 text-white fill-current" />
                  </div>
                </div>
              </div>
            </div>

            <Button
              onClick={scrollToShowtimes}
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-red-600/25"
            >
              Book Tickets
            </Button>
          </div>
        </div>
      </div>
      {movie.status === MovieStatus.NOW_SHOWING && (
        <div id="showtimes" className="bg-gray-800/50 py-12 mt-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Select Showtime
            </h2>
            {dates.map((date) => (
              <ShowTimeGroup key={date.date} date={date} movie={movie} />
            ))}
          </div>
        </div>
      )}

      {/* Trailer Modal */}
      {showTrailer && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setShowTrailer(false)}
        >
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute -top-12 right-0 text-white hover:text-red-400 transition-colors"
            >
              <span className="text-2xl">×</span>
            </button>
            <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
              <p className="text-gray-400">Trailer would play here</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
