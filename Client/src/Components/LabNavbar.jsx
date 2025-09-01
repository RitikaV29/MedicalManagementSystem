import { Link } from "react-router-dom";
import img2 from "../assets/img2.webp";
import { useEffect, useState } from "react";
import img3 from "../assets/hamburger.png";

function LabNavbar() {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const token = localStorage.getItem("token");
  let user = null;

  if (token) {
    try {
      const payload = token.split(".")[1];
      user = JSON.parse(atob(payload));
    } catch (err) {
      console.error("Invalid token", err);
    }
  }

  
   const id = user ? user._id : null;

  useEffect(() => {

    if (id) {
       fetch(`${import.meta.env.VITE_API_URL}/api/auth/user/${id}`, { method: "GET",
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`}
        })
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched user:", data);
          setUserData(data); // backend se fresh data
        })
        .catch((err) => console.error("Error fetching user:", err));
    
      
    }
  }, [id]);

  return (
    <nav className="bg-white shadow-md px-4 py-3 flex justify-between items-center">
      {/* Logo */}
      <h1 className="text-2xl font-bold">MediLab</h1>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-8 text-lg">
        <Link className="hover:underline hover:decoration-blue-300" to="/">
          Home
        </Link>
        <Link className="hover:underline hover:decoration-blue-300" to="/userDashboard/about">
          About
        </Link>
        <Link className="hover:underline hover:decoration-blue-300" to="/userDashboard/labs">
          Labs
        </Link>
      </div>

      {/* User Section / Sign Up */}
      {user ? (
        <Link
          className="hidden md:flex cursor-pointer items-center gap-3"
          to="/userDashboard/profile"
        >
          <img
            className="w-10 h-10 rounded-full border"
            src={img2}
            alt="user"
          />
          <p className="font-medium">{userData?.name || "Loading..."}</p>
        </Link>
      ) : (
        <div className="hidden md:block relative">
          <button
            onClick={() => setOpen(!open)}
            className="hover:underline hover:decoration-blue-300 text-lg mr-4"
          >
            Sign Up
          </button>

          {open && (
            <div className="absolute right-0 bg-white text-black rounded shadow-md mt-2">
              <a
                href="/userRegister"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Sign Up as User
              </a>
              <a
                href="/labsRegister"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Sign Up as Lab
              </a>
            </div>
          )}
        </div>
      )}

      {/* Hamburger for mobile */}
      <button
        className="md:hidden flex items-center"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <img src={img3} alt="menu" className="w-5 h-5" />
      </button>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-16 right-4 bg-white shadow-lg rounded-lg p-4 w-48 flex flex-col gap-4 md:hidden z-50">
          <Link
            to="/"
            className="hover:underline hover:decoration-blue-300"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/userDashboard/about"
            className="hover:underline hover:decoration-blue-300"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/userDashboard/labs"
            className="hover:underline hover:decoration-blue-300"
            onClick={() => setMenuOpen(false)}
          >
            Labs
          </Link>

          {user ? (
            <Link
              to="/userDashboard/profile"
              className="flex items-center gap-2"
              onClick={() => setMenuOpen(false)}
            >
              <img
                className="w-8 h-8 rounded-full border"
                src={img2}
                alt="user"
              />
              <p>{userData.name}</p>
            </Link>
          ) : (
            <div className="flex flex-col gap-2">
              <a
                href="/userRegister"
                className="px-3 py-1 rounded hover:bg-gray-100"
              >
                Sign Up as User
              </a>
              <a
                href="/labsRegister"
                className="px-3 py-1 rounded hover:bg-gray-100"
              >
                Sign Up as Lab
              </a>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default LabNavbar;
