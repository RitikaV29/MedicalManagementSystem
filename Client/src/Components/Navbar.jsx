import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState({ name: "", email: "" });
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:5000/showUser");
        const users = response.data.user;
        if (Array.isArray(users) && users.length > 0) {
          setUser(users[0]);
        }
      } catch (err) {
        alert("API fault");
      }
    };
    fetchUser();
  }, []);

  const navLinks = [
    { name: "Home", path: "/home" },
    { name: "Appointment", path: "/appointment" },
    { name: "Lab", path: "/labHome" },
    { name: "Doctor", path: "/doctor" },
    { name: "Your History", path: "/history" },
  ];

  return (
    <nav className="w-full fixed bg-blue-500 shadow-md text-black z-50">
      <div className="max-w-7xl mx-auto py-4 px-4">
        {/* Top navbar row */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold tracking-wide">
            <span className="text-3xl text-white">C</span>linic
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-10 flex-wrap">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative text-md font-bold transition-all duration-300 ease-in-out ${
                  location.pathname === link.path
                    ? "text-white font-bold"
                    : "text-black"
                } hover:text-white`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-white rounded"></span>
                )}
              </Link>
            ))}
          </div>

          {/* User Info (Desktop) */}
          <div className="hidden lg:flex items-center space-x-2 ml-2">
            <FaUserCircle className="text-4xl text-white" />
            <div className="text-sm">
              <div className="font-semibold text-white">{user.name || "Guest"}</div>
              <div className="text-xs text-gray-700">{user.email}</div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Navigation & User Info */}
        {menuOpen && (
          <div className="lg:hidden mt-9 space-y-4">
            {/* Mobile Links */}
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`block py-2 px-3 rounded font-semibold cursor-pointer transition ${
                  location.pathname === link.path
                    ? "text-blue-600 bg-white"
                    : "text-red-100"
                } hover:bg-blue-600 hover:text-white`}
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile User Info */}
            <div className="flex items-center border border-red-500 rounded-2xl bg-white py-2  space-x-2 mt-4 px-3">
              <FaUserCircle className="text-3xl text-black" />
              <div className="text-sm">
                <div className="font-semibold">{user.name || "Guest"}</div>
                <div className="text-xs text-gray-700">{user.email}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
