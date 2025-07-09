import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { loadUser } from "./features/auth/authSlice";
import HomePage from "./pages/homePage";
import Home from "./pages";
import MovieDetailPage from "./pages/movieDetailPage";
import ShowtimePage from "./pages/showTimePage";
import LoginPage from "./pages/login";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  const router = createBrowserRouter([
    // {
    //   path: "/authenticate",
    //   element: <Authenticate />,
    //   // loader: teamLoader,
    // },
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
