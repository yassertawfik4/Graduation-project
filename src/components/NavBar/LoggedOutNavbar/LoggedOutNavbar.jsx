import { Link, NavLink } from "react-router-dom";
import SharedNavbar from "../SharedNavbar/SharedNavbar";
import { useState } from "react";

function LoggedOutNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white sticky z-20 top-0 shadow-sm">
      <div className="container mx-auto py-4 flex justify-between items-center px-4">
        {/* Logo */}
        <Link to="/" className="font-bold text-3xl text-black ">
          Step<span className="text-[#3A4C59]">Up</span>
        </Link>

        {/* Navigation and Actions Container */}
        <div className="flex items-center gap-6">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <SharedNavbar />
          </div>

          {/* Login and Register Links */}
          <div className="flex items-center gap-4">
            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <NavLink
                to="/user/login"
                className="border border-[#3A4C59] text-[#3A4C59] md:text-[17px] text-[13px] font-medium py-2 md:px-6 px-3 rounded-lg hover:bg-[#F3F3F3] transition duration-200"
              >
                Login
              </NavLink>
              <NavLink
                to="/user/register"
                className="bg-[#3A4C59] text-white font-medium py-2 md:px-6 px-3 md:text-[17px] text-[13px] rounded-lg hover:bg-opacity-90 transition duration-200"
              >
                Sign up
              </NavLink>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="lg:hidden text-gray-600 hover:text-gray-800 focus:outline-none"
            aria-label="toggle menu"
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 8h16M4 16h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-md lg:hidden">
            <div className="container mx-auto px-4 py-4">
              <SharedNavbar />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default LoggedOutNavbar;
