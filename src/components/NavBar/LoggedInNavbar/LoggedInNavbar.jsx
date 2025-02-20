import SharedNavbar from "../SharedNavbar/SharedNavbar";
import { Link, useNavigate } from "react-router-dom";
import { IoExitOutline, IoPersonOutline, IoPersonSharp } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { logOut } from "../../../Api/userAuth";

function LoggedInNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      const data = await logOut();
      console.log(data);
      if (data) {
        localStorage.removeItem("accessUsertoken");
        navigate("/user/login");
      }
    } catch (error) {
      console.log("User LogOut", error);
    }
  };
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsShow(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <nav className="bg-white sticky z-20 top-0 shadow-sm">
      <div className="container mx-auto py-4 flex justify-between items-center px-4">
        <Link to="/" className="font-bold text-3xl text-black ">
          Step<span className="text-[#3A4C59]">Up</span>
        </Link>

        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-6">
            <SharedNavbar />
          </div>

          <div className="flex items-center gap-4">
            <div className="relative" ref={dropdownRef}>
              <IoPersonOutline
                className="cursor-pointer text-gray-700 "
                size={25}
                onClick={() => setIsShow(!isShow)}
              />

              {isShow && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md border border-gray-200 py-2 transition-opacity duration-300">
                  <ul className="text-gray-700">
                    <li className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer font-medium font-[roboto] text-[15px]">
                      Profile
                      <span className="">
                        <IoPersonSharp className="font-bold" size={17} />{" "}
                      </span>
                    </li>
                    <li
                      className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer border-t border-gray-200 font-medium font-[roboto] text-[15px]"
                      onClick={() => handleLogOut()}
                    >
                      Log Out{" "}
                      <span className="">
                        <IoExitOutline className="font-bold" size={17} />{" "}
                      </span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

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

export default LoggedInNavbar;
