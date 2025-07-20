import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailBooking } from "../../api/booking";

export default function PollingBookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await getDetailBooking(id);
      if (res.bookingStatus === "CONFIRMED") {
        window.location.href = res.urlPayment;
      } else if (
        res.bookingStatus === "CANCELED" ||
        res.bookingStatus === "FAILED"
      ) {
        navigate(`/booking/failure`);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);
  return <div className="h-screen">Loading</div>;
}
