// @ts-nocheck
import React, { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaCreditCard,
  FaMapMarkerAlt,
  FaUsers,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { getDetailRoomByRoomId } from "../../api/cinema";
import sockjs from "sockjs-client/dist/sockjs";
import { Stomp } from "@stomp/stompjs";

import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/Card";
import { getBookableDetailShowTime } from "../../api/showtime";
import {
  getBookedSeatsOfShowTime,
  getheatSeatsOfShowTime,
} from "../../api/seat";
import BookingConfirmationModal from "./components/BookingConfirmationModal";
import { useSelector } from "react-redux";
import { processSeatsBooking } from "../../api/booking";
import { API_URL } from "../../constants/baseURL";
import { TypeSeat } from "../../constants/TypeSeat";
import { TypeMessageSeat } from "../../constants/TypeMessageSeat";
const movieData = {
  title: "Dune: Part Two",
  poster: "/placeholder.svg?height=300&width=200",
  room: "Cinema Hall 1",
  date: "March 15, 2024",
  time: "7:30 PM",
  duration: "2h 46m",
  pricePerSeat: 45000,
};
export default function ShowtimeBooking() {
  const [seats, setSeats] = useState([]);
  const [movie, setMovie] = useState([]);
  const [showTime, setShowTime] = useState({});
  const [room, setRoom] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingData } = location.state;
  const { cinema, auth } = useSelector((state) => state);
  const [stompClient, setStompClient] = useState(null);
  const handleSeatClick = (seatId) => {
    const seat = seats.find((seat) => seat.id === seatId);
    if (seat.status === TypeSeat.SELECTED) {
      sendSeatsMessage({
        type: TypeMessageSeat.RELEASE,
        seatIds: [seatId],
      });
    } else if (seat.status === TypeSeat.AVAILABLE) {
      sendSeatsMessage({
        type: TypeMessageSeat.HEAT,
        seatIds: [seatId],
      });
    } else return;
    setSeats((prevSeats) =>
      prevSeats.map((seat) => {
        if (seat.id === seatId) {
          return {
            ...seat,
            status:
              seat.status === TypeSeat.SELECTED
                ? TypeSeat.AVAILABLE
                : TypeSeat.SELECTED,
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
      case TypeSeat.AVAILABLE:
        return `${baseClasses} bg-gray-600 hover:bg-gray-500 text-gray-200 cursor-pointer hover:scale-105`;
      case TypeSeat.SELECTED:
        return `${baseClasses} bg-blue-600 hover:bg-blue-500 text-white cursor-pointer scale-105 ring-2 ring-blue-400`;
      case TypeSeat.BOOKED:
        return `${baseClasses} bg-red-500 text-red-200 cursor-not-allowed opacity-60`;
      case TypeSeat.HELD:
        return `${baseClasses} bg-yellow-500 text-yellow-900 cursor-not-allowed opacity-80 animate-pulse`;
      default:
        return baseClasses;
    }
  };
  useEffect(() => {
    if (!bookingData) {
      navigate("/", { replace: true });
    }
  }, [bookingData, navigate]);

  useEffect(() => {
    if (!bookingData) return;
    setMovie(bookingData.movie);
    const fetchInitialData = async () => {
      try {
        const [roomRes, showtime, bookedSeats, headSeats] = await Promise.all([
          getDetailRoomByRoomId(bookingData.roomId),
          getBookableDetailShowTime(bookingData.showTimeId),
          getBookedSeatsOfShowTime(bookingData.showTimeId),
          getheatSeatsOfShowTime(bookingData.showTimeId),
        ]);
        setRoom({ ...roomRes, seats: null });
        const seatsdata = roomRes.seats.map((seat) => {
          if (bookedSeats.includes(seat.id)) {
            seat.status = TypeSeat.BOOKED;
          } else if (headSeats.includes(seat.id)) {
            seat.status = TypeSeat.HELD;
          }
          return seat;
        });
        setSeats(seatsdata);
        console.log(showtime);
        setShowTime(showtime);
      } catch (err) {
        console.error("Error loading data:", err);
      }
    };

    fetchInitialData();
  }, [bookingData]);
  const getColumnLetter = (index) => {
    return String.fromCharCode("A".charCodeAt(0) + index);
  };
  const range1ToN = (n) => Array.from({ length: n }, (_, i) => i + 1);
  const sendSeatsMessage = ({ type, seatIds }) => {
    if (stompClient) {
      stompClient.send(
        "/app/seats",
        {},
        JSON.stringify({
          type,
          seatIds,
          showTimeId: showTime.id,
          senderId: auth.sub,
        })
      );
    }
  };
  useEffect(() => {
    if (!bookingData) return;

    const socket = new sockjs(
      API_URL + "/ws/heatseat/heatseat-ws?token=" + auth.token
    );
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
      stompClient.subscribe(`/topic/seats/${bookingData.showTimeId}`, (msg) => {
        const payload = JSON.parse(msg.body);
        const seats = payload.seats;
        if (payload.senderId === auth.sub) return;
        if (payload.type === TypeMessageSeat.HEAT) {
          setSeats((prevSeats) => {
            return prevSeats.map((seat) => {
              if (seats.includes(seat.id)) {
                return { ...seat, status: TypeSeat.HELD };
              }
              return seat;
            });
          });
        } else if (payload.type === TypeMessageSeat.RELEASE) {
          setSeats((prevSeats) => {
            return prevSeats.map((seat) => {
              if (seats.includes(seat.id)) {
                return { ...seat, status: TypeSeat.AVAILABLE };
              }
              return seat;
            });
          });
        }
      });
    });
    setStompClient(stompClient);
    return () => {
      const seatIds = seats
        .filter((seat) => seat.status === TypeSeat.SELECTED)
        .map((seat) => seat.id);
      sendSeatsMessage({
        type: TypeMessageSeat.RELEASE,
        seatIds,
        showTimeId: bookingData.showTimeId,
      });
      stompClient.disconnect();
    };
  }, [bookingData]);
  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleContinue = () => {
    setModalOpen(true);
  };
  const handlePayment = async (paymentMethod) => {
    const bookingsSeats = seats
      .filter((seat) => seat.status === TypeSeat.SELECTED)
      .map((seat) => ({
        id: seat.id,
        code: seat.code,
      }));

    try {
      const res = await processSeatsBooking({
        seats: bookingsSeats,
        paymentMethod,
        showTimeId: showTime.id,
        totalPrice: bookingsSeats.length * showTime.basePrice,
      });
      navigate(`/booking/polling/${res.id}`);
    } catch (e) {
      console.log(e);
    }
  };
  const selectedSeats = seats.filter(
    (seat) => seat.status === TypeSeat.SELECTED
  );
  const totalPrice = selectedSeats.length * showTime.basePrice;

  if (room == null) return <div>Loading...</div>;
  return (
    <>
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
                    {range1ToN(room.numberOfRows).map((row) => (
                      <div
                        key={row}
                        className="flex items-center justify-center gap-2"
                      >
                        <div className="w-6 text-center text-gray-400 font-medium">
                          {getColumnLetter(row - 1)}
                        </div>
                        <div className="flex gap-1">
                          {seats
                            .filter((seat) => seat.row === row)
                            .map((seat) => (
                              <button
                                key={seat.id}
                                onClick={() => handleSeatClick(seat.id)}
                                disabled={
                                  seat.status === TypeSeat.BOOKED ||
                                  seat.status === TypeSeat.HELD
                                }
                                className={getSeatClassName(seat)}
                                aria-label={`Seat ${seat.id}, ${seat.status}`}
                                title={
                                  seat.status === TypeSeat.HELD
                                    ? "This seat is temporarily held by another user"
                                    : undefined
                                }
                              >
                                {seat.number}
                              </button>
                            ))}
                        </div>
                        <div className="w-6 text-center text-gray-400 font-medium">
                          {getColumnLetter(row - 1)}
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
                              {seat.code}
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
                        onClick={handleContinue}
                      >
                        <FaCreditCard className="w-4 h-4 mr-2" />
                        Continue
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
      <BookingConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        bookingData={{
          cinemaName: cinema.cinemas.find((c) => c.id === cinema.cinemaId).name,
          movieTitle: movie?.title,
          showTime: `${showTime.startTime} - ${showTime.endTime} | ${showTime.date}`,
          seats: selectedSeats.map((seat) => seat.code).join(", "),
          customerName: auth.user.name,
          phone: "0919701101",
          email: auth.user.email,
          totalPrice: 130500,
        }}
        onConfirm={handlePayment}
      />
    </>
  );
}
