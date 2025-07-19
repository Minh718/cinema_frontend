// @ts-nocheck
import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUsers,
  FaCreditCard,
} from "react-icons/fa";
import { Button } from "../../components/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/Card";
import { Badge } from "../../components/Badge";
const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];
export default function ShowtimeBooking() {
  // Sample movie data
  const movieData = {
    title: "Dune: Part Two",
    poster: "/placeholder.svg?height=300&width=200",
    room: "Cinema Hall 1",
    date: "March 15, 2024",
    time: "7:30 PM",
    duration: "2h 46m",
    pricePerSeat: 45000,
  };

  // Generate seat layout (8 rows, 12 seats per row)
  const generateSeats = () => {
    const seats = [];
    const seatsPerRow = 12;

    // Some pre-booked seats for demonstration
    const bookedSeats = ["A5", "A6", "C3", "C9", "E7", "F4", "F5", "G8"];

    // Held seats (temporarily reserved by other users)
    const heldSeats = ["F4", "G6"];

    rows.forEach((row) => {
      for (let i = 1; i <= seatsPerRow; i++) {
        const seatId = `${row}${i}`;
        let status = "available";

        if (bookedSeats.includes(seatId)) {
          status = "booked";
        } else if (heldSeats.includes(seatId)) {
          status = "held";
        }

        seats.push({
          id: seatId,
          row,
          number: i,
          status: status,
        });
      }
    });

    return seats;
  };

  const [seats, setSeats] = useState(generateSeats());
  const selectedSeats = seats.filter((seat) => seat.status === "selected");
  const totalPrice = selectedSeats.length * movieData.pricePerSeat;

  const handleSeatClick = (seatId) => {
    setSeats((prevSeats) =>
      prevSeats.map((seat) => {
        if (
          seat.id === seatId &&
          seat.status !== "booked" &&
          seat.status !== "held"
        ) {
          return {
            ...seat,
            status: seat.status === "selected" ? "available" : "selected",
          };
        }
        return seat;
      })
    );
  };

  const getSeatClassName = (seat) => {
    const baseClasses =
      "w-8 h-8 rounded-t-lg text-xs font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400";

    switch (seat.status) {
      case "available":
        return `${baseClasses} bg-gray-600 hover:bg-gray-500 text-gray-200 cursor-pointer hover:scale-105`;
      case "selected":
        return `${baseClasses} bg-blue-600 hover:bg-blue-500 text-white cursor-pointer scale-105 ring-2 ring-blue-400`;
      case "booked":
        return `${baseClasses} bg-red-500 text-red-200 cursor-not-allowed opacity-60`;
      case "held":
        return `${baseClasses} bg-yellow-500 text-yellow-900 cursor-not-allowed opacity-80 animate-pulse`;
      default:
        return baseClasses;
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header with movie information */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={movieData.poster || "/placeholder.svg"}
              alt={movieData.title}
              className="w-32 h-48 object-cover rounded-lg shadow-lg"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-4">{movieData.title}</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="w-5 h-5 text-blue-400" />
                  <span>{movieData.room}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="w-5 h-5 text-blue-400" />
                  <span>{movieData.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock className="w-5 h-5 text-blue-400" />
                  <span>{movieData.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaUsers className="w-5 h-5 text-blue-400" />
                  <span>{movieData.duration}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Seat Map Section */}
          <div className="lg:col-span-3">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-center">
                  Select Your Seats
                </CardTitle>

                {/* Screen indicator */}
                <div className="flex justify-center mb-6">
                  <div className="bg-gradient-to-r from-gray-600 via-gray-400 to-gray-600 h-2 w-3/4 rounded-full shadow-lg">
                    <div className="text-center text-sm text-gray-400 mt-2">
                      SCREEN
                    </div>
                  </div>
                </div>

                {/* Seat Legend */}
                <div className="flex justify-center gap-4 mb-6 text-sm flex-wrap">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-600 rounded-t"></div>
                    <span className="text-gray-300">Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-600 rounded-t"></div>
                    <span className="text-gray-300">Selected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded-t animate-pulse"></div>
                    <span className="text-gray-300">Held</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded-t"></div>
                    <span className="text-gray-300">Booked</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                {/* Seat Grid */}
                <div className="space-y-3">
                  {rows.map((row) => (
                    <div
                      key={row}
                      className="flex items-center justify-center gap-2"
                    >
                      <div className="w-6 text-center text-gray-400 font-medium">
                        {row}
                      </div>
                      <div className="flex gap-1">
                        {seats
                          .filter((seat) => seat.row === row)
                          .slice(0, 6)
                          .map((seat) => (
                            <button
                              key={seat.id}
                              onClick={() => handleSeatClick(seat.id)}
                              disabled={
                                seat.status === "booked" ||
                                seat.status === "held"
                              }
                              className={getSeatClassName(seat)}
                              aria-label={`Seat ${seat.id}, ${seat.status}`}
                              title={
                                seat.status === "held"
                                  ? "This seat is temporarily held by another user"
                                  : undefined
                              }
                            >
                              {seat.number}
                            </button>
                          ))}
                      </div>
                      <div className="w-8"></div> {/* Aisle space */}
                      <div className="flex gap-1">
                        {seats
                          .filter((seat) => seat.row === row)
                          .slice(6, 12)
                          .map((seat) => (
                            <button
                              key={seat.id}
                              onClick={() => handleSeatClick(seat.id)}
                              disabled={
                                seat.status === "booked" ||
                                seat.status === "held"
                              }
                              className={getSeatClassName(seat)}
                              aria-label={`Seat ${seat.id}, ${seat.status}`}
                              title={
                                seat.status === "held"
                                  ? "This seat is temporarily held by another user"
                                  : undefined
                              }
                            >
                              {seat.number}
                            </button>
                          ))}
                      </div>
                      <div className="w-6 text-center text-gray-400 font-medium">
                        {row}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-800 border-gray-700 sticky top-4">
              <CardHeader>
                <CardTitle className="text-white">Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedSeats.length > 0 ? (
                  <>
                    <div>
                      <h3 className="font-medium text-gray-300 mb-2">
                        Selected Seats
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedSeats.map((seat) => (
                          <Badge
                            key={seat.id}
                            variant="secondary"
                            className="bg-blue-600 text-white"
                          >
                            {seat.id}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-gray-700 pt-4">
                      <div className="flex justify-between text-sm text-gray-300 mb-2">
                        <span>{selectedSeats.length} × Ticket</span>
                        <span>{formatPrice(movieData.pricePerSeat)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span className="text-blue-400">
                          {formatPrice(totalPrice)}
                        </span>
                      </div>
                    </div>

                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      size="lg"
                    >
                      <FaCreditCard className="w-4 h-4 mr-2" />
                      Continue to Payment
                    </Button>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <FaUsers className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">Select seats to continue</p>
                  </div>
                )}

                <div className="text-xs text-gray-500 mt-4">
                  <p>• Click on available seats to select</p>
                  <p>• You can select multiple seats</p>
                  <p>• Yellow seats are temporarily held</p>
                  <p>• Red seats are already booked</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
