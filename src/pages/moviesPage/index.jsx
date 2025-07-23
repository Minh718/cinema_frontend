import React, { useState, useEffect } from "react";
import { getAllMovies } from "../../api/movie";
import Pagination from "../../components/Pagination";
import MovieCard from "./components/MovieCard";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [metadata, setMetadata] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [size, setSize] = useState(15);
  const [sortBy, setSortBy] = useState("createdAt");
  const [orderBy, setOrderBy] = useState("ASC");
  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const data = await getAllMovies({
          page: currentPage,
          size,
          sortBy,
          orderBy,
        });
        setMovies(data.result);
        setMetadata(data.metadata);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllMovies();
  }, [currentPage, size, sortBy, orderBy]);

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-black mb-8 text-center">Movies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <div className="flex justify-end items-center px-4 py-2">
        <Pagination
          pageCount={metadata?.totalPages ?? 6}
          handlePageClick={({ selected }) => setCurrentPage(selected)}
          page={currentPage}
        />
      </div>
    </div>
  );
};

export default MoviesPage;
