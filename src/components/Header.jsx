import React, { useEffect, useState } from "react";
import { FaCog, FaMoon, FaSignOutAlt, FaSun, FaUser } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import keycloak from "../keycloak";
import { logout } from "../features/auth/authSlice";
import { setCinemaManually } from "../features/cinema/cinemaSlice";

const Header = () => {
  const { cinemas, cinemaId } = useSelector((state) => state.cinema);
  const [selectedCinemaId, setSelectedCinemaId] = useState(cinemaId);
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const handleLogout = () => {
    // keycloak.logout();
    dispatch(logout());
  };
  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const navigationLinks = [
    { name: "Home", path: "/" },
    { name: "Showtimes", path: "/showtimes" },
    { name: "Community", path: "/community" },
    { name: "Contact", path: "#" },
  ];
  const handleChangeCinema = (e) => {
    dispatch(setCinemaManually(e.target.value));
    setSelectedCinemaId(e.target.value);
    navigate("/");
  };
  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isDarkMode ? "bg-gray-900" : "bg-white"
      } ${scrolled ? "shadow-lg" : ""}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className={`text-2xl font-bold font-sans ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              CineVerse
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`${
                  isDarkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-700 hover:text-black"
                } px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <select
              id="cinema-select"
              value={selectedCinemaId}
              onChange={handleChangeCinema}
              className="bg-white backdrop-blur-lg text-gray-800 px-2 py-1 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            >
              {cinemas?.map((cinema) => (
                <option key={cinema.id} value={cinema.id}>
                  {cinema.name}
                </option>
              ))}
            </select>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${
                isDarkMode
                  ? "text-yellow-400 hover:bg-gray-700"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
            </button>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2"
                >
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
                    alt="User avatar"
                    className="w-8 h-8 rounded-full"
                  />
                </button>

                {isDropdownOpen && (
                  <div
                    className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ${
                      isDarkMode ? "bg-gray-800" : "bg-white"
                    } ring-1 ring-black ring-opacity-5`}
                  >
                    <a
                      href="#"
                      className={`flex items-center px-4 py-2 text-sm ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      } hover:bg-gray-700`}
                    >
                      <FaUser className="mr-2" /> Profile
                    </a>
                    <a
                      href="#"
                      className={`flex items-center px-4 py-2 text-sm ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      } hover:bg-gray-700`}
                    >
                      <FaCog className="mr-2" /> Settings
                    </a>
                    {["admin", "manager", "customer-support"].some((role) =>
                      user.realm_access.roles.includes(role)
                    ) && (
                      <Link
                        to="/admin"
                        className={`flex items-center px-4 py-2 text-sm ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        } hover:bg-gray-700`}
                      >
                        <FaCog className="mr-2" /> Dashboard
                      </Link>
                    )}
                    <a
                      href="#"
                      onClick={handleLogout}
                      className={`flex items-center px-4 py-2 text-sm ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      } hover:bg-gray-700`}
                    >
                      <FaSignOutAlt className="mr-2" /> Logout
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <button className="cursor-pointer bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                  Login
                </button>
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div
              className={`px-2 pt-2 pb-3 space-y-1 ${
                isDarkMode ? "bg-gray-900" : "bg-white"
              }`}
            >
              {navigationLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isDarkMode
                      ? "text-gray-300 hover:text-white hover:bg-gray-700"
                      : "text-gray-700 hover:text-black hover:bg-gray-100"
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
