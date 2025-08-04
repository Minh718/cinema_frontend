// @ts-nocheck
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import Dashboard from "./admin/page/Dashboard";
import "./App.css";
import { getNearestCinema } from "./features/cinema/cinemaSlice";
import Home from "./pages";
import Authenticate from "./pages/authenticate";
import BookingPage from "./pages/bookingPage";
import CinemaChatPage from "./pages/chatPage";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/login";
import MovieDetailPage from "./pages/movieDetailPage";
import MoviesPage from "./pages/moviesPage";
import NotFoundPage from "./pages/notFoundPage";
import PollingBookingPage from "./pages/pollingBookingPage";
import ShowtimePage from "./pages/showTimePage";
import PrivateAdminRoute from "./PrivateAdminRoute";
import PrivateRoute from "./PrivateRoute";
function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNearestCinema());
  }, [dispatch]);
  const router = createBrowserRouter([
    {
      path: "/admin",
      element: <PrivateAdminRoute />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "dashboard",
          element: <Dashboard />,
        },
      ],
    },
    {
      path: "/community",
      element: <PrivateRoute />,
      children: [
        {
          index: true,
          element: <CinemaChatPage />,
        },
      ],
    },
    {
      path: "/authenticate",
      element: <Authenticate />,
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
          path: "/movies",
          element: <MoviesPage />,
        },
        {
          path: "/movie/:movieId",
          element: <MovieDetailPage />,
        },
        {
          path: "/showtimes",
          element: <ShowtimePage />,
        },
        {
          path: "/login",
          element: isAuthenticated ? (
            <Navigate to="/" replace />
          ) : (
            <LoginPage />
          ),
        },
        {
          element: <PrivateRoute />,
          children: [
            {
              path: "/booking",
              element: <BookingPage />,
            },
            {
              path: "/booking/polling/:id",
              element: <PollingBookingPage />,
            },
          ],
        },
        {
          path: "/*",
          element: <NotFoundPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
