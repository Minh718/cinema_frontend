import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { loadUser } from "./features/auth/authSlice";
import HomePage from "./pages/homePage";
import Home from "./pages";

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
