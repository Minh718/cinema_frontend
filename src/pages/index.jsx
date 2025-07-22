import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

export default function Home() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      const showtimeDataStr = Cookies.get("bookingIntent");

      if (showtimeDataStr) {
        navigate("/booking", {
          state: { bookingData: JSON.parse(showtimeDataStr) },
          replace: true,
        });
      }
    }
  }, [isAuthenticated]);
  return (
    <div className="relative">
      <Header />
      <main className="pt-16">
        <div className="flex justify-center bg-slate-200">
          {/* <div className="max-w-screen-2xl w-[95%]"> */}
          <div className="w-full">
            <Outlet />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
