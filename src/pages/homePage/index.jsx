import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { BsCalendar3, BsClock, BsFilm } from "react-icons/bs";
import { format } from "date-fns";

const MovieCard = ({ movie }) => (
  <div className="relative group overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
    <img
      src={movie.poster}
      alt={movie.title}
      className="w-full h-[400px] object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
      <div className="absolute bottom-0 p-4 w-full">
        <h3 className="text-xl font-bold text-white mb-2">{movie.title}</h3>
        <div className="flex gap-2 mb-3">
          {movie.genres.map((genre, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-red-600 text-white text-sm rounded-full"
            >
              {genre}
            </span>
          ))}
        </div>
        <button className="w-full bg-white text-black py-2 rounded-md hover:bg-red-600 hover:text-white transition-colors">
          View Details
        </button>
      </div>
    </div>
  </div>
);

const HomePage = () => {
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const movies = [
    {
      id: 1,
      title: "The Dark Knight",
      description:
        "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham...",
      poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb",
      genres: ["Action", "Crime", "Drama"],
    },
    {
      id: 2,
      title: "Inception",
      description:
        "A thief who steals corporate secrets through the use of dream-sharing technology...",
      poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728",
      genres: ["Action", "Sci-Fi"],
    },
    {
      id: 3,
      title: "Interstellar",
      description: "A team of explorers travel through a wormhole in space...",
      poster: "https://images.unsplash.com/photo-1596727147705-61a532a659bd",
      genres: ["Adventure", "Drama", "Sci-Fi"],
    },
    {
      id: 4,
      title: "Pulp Fiction",
      description:
        "The lives of two mob hitmen, a boxer, a gangster and his wife...",
      poster: "https://images.unsplash.com/photo-1542204165-65bf26472b9b",
      genres: ["Crime", "Drama"],
    },
    // {
    //   id: 5,
    //   title: "Pulp Fiction",
    //   description:
    //     "The lives of two mob hitmen, a boxer, a gangster and his wife...",
    //   poster: "https://images.unsplash.com/photo-1542204165-65bf26472b9b",
    //   genres: ["Crime", "Drama"],
    // },
  ];

  const timeSlots = ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM", "10:00 PM"];

  const isFormComplete = selectedMovie && selectedDate && selectedTime;

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        navigation
        pagination={{ clickable: true }}
        className="h-[600px]"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="relative w-full h-full">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent">
                <div className="container mx-auto px-4 h-full flex items-end pb-20">
                  <div className="text-white">
                    <h2 className="text-4xl md:text-6xl font-bold mb-4">
                      {movie.title}
                    </h2>
                    <p className="text-lg md:text-xl max-w-2xl mb-6">
                      {movie.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

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
                {movies.map((movie) => (
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
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
