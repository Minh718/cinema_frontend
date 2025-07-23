// @ts-nocheck
import React from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
export default function BannerMovies({ movies }) {
  return (
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
                    {movie.overview}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
