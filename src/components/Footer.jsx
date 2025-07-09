import React from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Branding Section */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-purple-500">CineVerse</h2>
            <p className="text-gray-400 italic">Your gateway to the movies</p>
            <p className="text-sm text-gray-400 mt-4">
              Experience the magic of cinema like never before. Join us for an
              unforgettable movie journey.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["Now Showing", "Upcoming", "Booking", "Contact", "FAQ"].map(
                (link) => (
                  <li key={link}>
                    <button
                      className="text-gray-400 hover:text-purple-500 transition-colors duration-300 hover:scale-105 transform"
                      onClick={() => console.log(`Navigate to ${link}`)}
                    >
                      {link}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <FaPhone className="text-purple-500" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-purple-500" />
                <a
                  href="mailto:info@cineverse.com"
                  className="hover:text-purple-500 transition-colors duration-300"
                >
                  info@cineverse.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-purple-500" />
                <span>123 Movie Plaza, Cinema Street, CA 90210</span>
              </div>
            </div>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {[
                {
                  icon: FaFacebookF,
                  label: "Facebook",
                  link: "https://facebook.com",
                },
                {
                  icon: FaInstagram,
                  label: "Instagram",
                  link: "https://instagram.com",
                },
                {
                  icon: FaYoutube,
                  label: "YouTube",
                  link: "https://youtube.com",
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${social.label}`}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-500 transition-all duration-300 hover:scale-110"
                >
                  <social.icon className="text-white" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-gray-800 mt-8">
        <div className="container mx-auto px-4 py-4">
          <p className="text-center text-gray-400 text-sm">
            Copyright © {currentYear} CineVerse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
