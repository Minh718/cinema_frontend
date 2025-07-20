// @ts-nocheck
import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Admin from "./admin/index";
import Dashboard from "./admin/page/Dashboard";
import "./App.css";
import keycloak from "./keycloak";
import Home from "./pages";
import Authenticate from "./pages/authenticate";
import BookingPage from "./pages/bookingPage";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/login";
import MovieDetailPage from "./pages/movieDetailPage";
import ShowtimePage from "./pages/showTimePage";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./features/auth/authSlice";
import { getNearestCinema } from "./features/cinema/cinemaSlice";
import PollingBookingPage from "./pages/pollingBookingPage";
function App() {
  const { isAuthenticated, user, keycloak } = useSelector(
    (state) => state.auth
  );
  console.log(keycloak?.token);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNearestCinema());
  }, [dispatch]);
  const router = createBrowserRouter([
    {
      path: "/admin",
      element: <Admin />,
      children: [
        {
          index: true, // default child when path === "/admin"
          element: <Dashboard />,
        },
        {
          path: "dashboard", // becomes /admin/dashboard
          element: <Dashboard />,
        },
      ],
      // loader: teamLoader,
    },
    {
      path: "/authenticate",
      element: <Authenticate />,
      // loader: teamLoader,
    },
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/movie/1",
          element: <MovieDetailPage />,
        },
        {
          path: "/showtimes",
          element: <ShowtimePage />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/booking",
          element: <BookingPage />,
        },
        {
          path: "/booking/polling/:id",
          element: <PollingBookingPage />,
        },
        // {
        //   path: "/*",
        //   element: <NotFoundPage />,
        // },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
