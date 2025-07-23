import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => (
  <div className="relative group overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
    <img
      src={movie.backdropPath}
      alt={movie.title}
      className="w-full h-[200px] object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
      <div className="absolute bottom-0 p-4 w-full">
        <h3 className="text-xl font-bold text-white mb-2">{movie.title}</h3>
        <div className="flex gap-2 mb-3 flex-wrap">
          {movie.genres.map((genre, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-red-600 text-white text-sm rounded-full"
            >
              {genre}
            </span>
          ))}
        </div>
        <Link to={`/movie/${movie.id}`}>
          <button className="cursor-pointer w-full bg-white text-black py-2 rounded-md hover:bg-red-600 hover:text-white transition-colors">
            View Details
          </button>
        </Link>
      </div>
    </div>
  </div>
);

export default MovieCard;
