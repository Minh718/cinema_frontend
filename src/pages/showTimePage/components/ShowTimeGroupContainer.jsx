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
import { formatMinutesToHourMinute } from "../../../utils/DateUtil";
import { Card, CardContent } from "../../../components/Card";
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
    <Card className="bg-gray-800 border-gray-700 overflow-hidden">
      <CardContent className="p-2">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Movie Poster */}
          <div className="flex-shrink-0">
            <img
              src={movie.posterPath || "/placeholder.svg"}
              alt={movie.title}
              className="w-[120px] h-[180px] object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Movie Details */}
          <div className="flex-1 space-y-4">
            <div>
              <h4 className="text-xl font-bold text-white mb-2">
                {movie.title}
              </h4>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-2">
                <span>{movie.originalTitle}</span>
                <span className="flex items-center">
                  <HiClock className="w-4 h-4 mr-1" />
                  {formatMinutesToHourMinute(movie.duration)}
                </span>
                <button className="text-red-400 hover:text-red-300 transition-colors">
                  Trailer
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mb-4 items-center">
                <span className="bg-red-600 text-white px-1 py-1 rounded text-sm font-medium">
                  {movie.ageRating}
                </span>
                {movie.genres.map((g) => (
                  <span key={g.id} className="text-gray-400 text-sm">
                    {g.name}
                  </span>
                ))}
              </div>
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
      </CardContent>
    </Card>
  );
}
