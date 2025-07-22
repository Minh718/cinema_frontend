// @ts-nocheck
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { HiClock, HiPlay, HiUsers } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDetailMovie } from "../../../api/movie";
import LoadingComponent from "../../../components/LoadingComponent";
import { TypeShowTime } from "../../../constants/TypeShowTime";
import ShowTimesContainer from "./ShowTimesContainer";
export default function ShowTimeGroupContainer({
  showTimeGroup,
  typeShowTime,
}) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const handleShowtimeClick = (showtime) => {
    const bookingData = {
      movie,
      showTimeId: showtime.id,
      roomId: showTimeGroup.roomId,
    };
    if (!isAuthenticated) {
      Cookies.set("bookingIntent", JSON.stringify(bookingData), {
        expires: 1 / 288,
      });
      navigate("/login");
    } else navigate("/booking", { state: { bookingData } });
  };
  useEffect(() => {
    const fetchDetailMovie = async () => {
      try {
        const data = await getDetailMovie(showTimeGroup.movieId);
        setMovie(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDetailMovie();
  }, [showTimeGroup]);
  if (movie === null) return <LoadingComponent />;
  return (
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
            <p className="text-gray-400 text-lg mb-2">{movie.originalTitle}</p>

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
                {movie.genres?.map((genre) => genre.name).join(", ")}
              </span>
            </div>

            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <HiUsers className="w-5 h-5 mr-2" />
              Suất Chiếu
            </h3>
          </div>
          <ShowTimesContainer
            handleShowtimeClick={handleShowtimeClick}
            format={
              typeShowTime === TypeShowTime.DUBBED
                ? "2D Dubbed Movie"
                : "2D Subtitle Movie"
            }
            showtimes={showTimeGroup.showTimes}
            price={showTimeGroup.basePrice}
          />
        </div>
      </div>
    </div>
  );
}
