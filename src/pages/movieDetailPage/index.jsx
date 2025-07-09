"use client";

import { useState } from "react";
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

// Mock data for the movie
const movieData = {
  title: "Dune: Part Two",
  genre: ["Sci-Fi", "Adventure", "Drama"],
  duration: "2h 46min",
  releaseDate: "March 1, 2024",
  rating: 8.5,
  synopsis:
    "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, he endeavors to prevent a terrible future only he can foresee.",
  poster: "/placeholder.svg?height=600&width=400",
  trailerThumbnail: "/placeholder.svg?height=315&width=560",
  director: "Denis Villeneuve",
  cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Josh Brolin"],
};

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

export default function MovieDetailPage() {
  const [selectedDate, setSelectedDate] = useState("Today");
  const [showTrailer, setShowTrailer] = useState(false);

  const scrollToShowtimes = () => {
    const showtimeSection = document.getElementById("showtimes");
    showtimeSection?.scrollIntoView({ behavior: "smooth" });
  };

  const handleBookNow = (time, room, price) => {
    alert(`Booking ${movieData.title} at ${time} in ${room} for ${price}`);
  };

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
            <span className="text-white">{movieData.title}</span>
          </nav>
        </div>
      </div>

      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Button
          variant="ghost"
          className="text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-200"
        >
          <IoArrowBack className="w-4 h-4 mr-2" />
          Back to Movies
        </Button>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Movie Poster */}
          <div className="lg:col-span-1">
            <div className="relative group">
              <img
                src={movieData.poster || "/placeholder.svg"}
                alt={movieData.title}
                className="w-full rounded-lg shadow-2xl transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>

          {/* Movie Details */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {movieData.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                {movieData.genre.map((g) => (
                  <Badge
                    key={g}
                    variant="secondary"
                    className="bg-red-600/20 text-red-400 border-red-600/30"
                  >
                    {g}
                  </Badge>
                ))}
                <div className="flex items-center text-gray-400">
                  <IoTimeOutline className="w-4 h-4 mr-1" />
                  {movieData.duration}
                </div>
                <div className="flex items-center text-gray-400">
                  <IoCalendarOutline className="w-4 h-4 mr-1" />
                  {movieData.releaseDate}
                </div>
                <div className="flex items-center text-yellow-400">
                  <IoStar className="w-4 h-4 mr-1 fill-current" />
                  {movieData.rating}/10
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">Synopsis</h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                {movieData.synopsis}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Director</h3>
                <p className="text-gray-300">{movieData.director}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Cast</h3>
                <p className="text-gray-300">{movieData.cast.join(", ")}</p>
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
                  src={movieData.trailerThumbnail || "/placeholder.svg"}
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

            {/* Book Ticket Button */}
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

      {/* Showtime Selection Section */}
      <div id="showtimes" className="bg-gray-800/50 py-12 mt-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Select Showtime
          </h2>

          <div className="space-y-6">
            {showtimes.map((day) => (
              <div key={day.date} className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-red-400">
                  {day.date}
                </h3>

                <Card className="bg-gray-800 border-gray-700 overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Movie Poster */}
                      <div className="flex-shrink-0">
                        <img
                          src={movieData.poster || "/placeholder.svg"}
                          alt={movieData.title}
                          className="w-[120px] h-[180px] object-cover rounded-lg shadow-lg"
                        />
                      </div>

                      {/* Movie Info and Showtimes */}
                      <div className="flex-1 space-y-4">
                        {/* Movie Title and Details */}
                        <div>
                          <h4 className="text-xl font-bold text-white mb-2">
                            {movieData.title}
                          </h4>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-2">
                            <span>Jurassic World Rebirth</span>
                            <span>113 · 2h14'</span>
                            <button className="text-red-400 hover:text-red-300 transition-colors">
                              Trailer
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {movieData.genre.map((g) => (
                              <span key={g} className="text-gray-400 text-sm">
                                {g}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Showtime Format */}
                        <div>
                          <h5 className="text-lg font-semibold text-white mb-3">
                            2D Phụ Đề Việt
                          </h5>

                          {/* Showtime Buttons */}
                          <div className="flex flex-wrap gap-3">
                            {day.times.map((showtime, index) => (
                              <button
                                key={index}
                                onClick={() =>
                                  handleBookNow(
                                    showtime.time,
                                    showtime.room,
                                    showtime.price
                                  )
                                }
                                className="flex flex-col items-center justify-center min-w-[80px] h-16 bg-gray-700 hover:bg-red-600 border border-gray-600 hover:border-red-500 rounded-lg transition-all duration-300 hover:scale-105 group"
                              >
                                <span className="text-white font-semibold text-sm group-hover:text-white">
                                  {showtime.time}
                                </span>
                                <span className="text-gray-400 text-xs group-hover:text-red-100">
                                  45K
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>

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
