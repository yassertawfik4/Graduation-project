import { CiBookmark, CiClock2 } from "react-icons/ci";
import { BsBookmarkFill } from "react-icons/bs";
import tailLogo from "/public/images/tailwind.png";
import applicationUser from "/public/images/applicationUser.png";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import axiosInstance from "../../../Api/axiosInstance";
import { useState } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

function RecommendedInternshipcard({ item }) {
  const [isBookmarked, setIsBookmarked] = useState(item.isBookmarked || false);
  const [isLoading, setIsLoading] = useState(false);

  const handleBookmark = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      if (isBookmarked) {
        // Unbookmark
        await axiosInstance.delete(`Bookmarks/internships/${item.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessUsertoken")}`,
          },
        });
        Swal.fire({
          icon: "success",
          title: "Removed from Bookmarks",
          text: "The roadmap has been removed from your bookmarks",
          timer: 2000,
          showConfirmButton: false,
          position: "top-end",
          toast: true,
        });
      } else {
        // Bookmark
        await axiosInstance.post(
          `Bookmarks/internships/${item.id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                "accessUsertoken"
              )}`,
            },
          }
        );
        Swal.fire({
          icon: "success",
          title: "Added to Bookmarks",
          text: "The roadmap has been added to your bookmarks",
          timer: 2000,
          showConfirmButton: false,
          position: "top-end",
          toast: true,
        });
      }
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error("Error handling bookmark:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please try again.",
        timer: 2000,
        showConfirmButton: false,
        position: "top-end",
        toast: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="my-4">
      <div className="bg-white rounded-lg p-4 shadow-lg ">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 my-3 ">
            <div>
              <img
                className="w-[64px] h-[64px]"
                loading="lazy"
                decoding="async"
                src={tailLogo}
                alt="tailwind"
              />
            </div>
            <div>
              <Link
                to={`/detailes/${item.id}`}
                className="text-[#010318] font-bold font-[roboto] text-[24px]"
              >
                {item.title}
              </Link>
              <p className="text-[#3A4C59] font-[roboto] text-[16px] font-bold">
                {item.companyName}
              </p>
            </div>
          </div>
          <div className="handleBookmark" onClick={handleBookmark}>
            {isBookmarked ? (
              <BsBookmarkFill
                size={35}
                className="cursor-pointer text-black transition-colors duration-200"
              />
            ) : (
              <CiBookmark
                size={35}
                className="cursor-pointer text-gray-500 transition-colors duration-200"
              />
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <button className="bg-[#3A4C59] flex items-center text-[13px] lg:font-semibold rounded-lg gap-2 opacity-85 text-white px-3 py-2 ">
            <span className="lg:block hidden">
              <CiClock2 size={20} />
            </span>
            Full Time
          </button>
          <button className="bg-[#3A4C59] flex items-center text-[13px] lg:font-semibold rounded-lg gap-2 opacity-85 text-white px-3 py-2">
            <span className="lg:block hidden">
              <FaLocationDot size={20} />
            </span>
            {item.workingModel || item.projectType}
          </button>
          <button className="bg-[#3A4C59] flex items-center text-[13px] lg:font-semibold rounded-lg gap-2 opacity-85 text-white px-3 py-2 ">
            {item.type || item.technologies}
          </button>
        </div>
        <div className="flex justify-between items-center">
          <div className="my-4">
            <img
              className="w-[70px]"
              src={applicationUser}
              alt="applicationUser"
            />
            <p className="text-[#3A4C59] font-[roboto] text-[13px] font-medium my-2">
              {item.applicationCount} Application
            </p>
          </div>
          <div>
            <p className="text-[#010318] font-medium font-[roboto] text-[16px]">
              {item.salary} {item.currency}{" "}
              <span className="text-[#B8B8B8]">/month</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

RecommendedInternshipcard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    companyName: PropTypes.string.isRequired,
    workingModel: PropTypes.string,
    projectType: PropTypes.string,
    type: PropTypes.string,
    technologies: PropTypes.string,
    applicationCount: PropTypes.number,
    salary: PropTypes.number,
    currency: PropTypes.string,
    isBookmarked: PropTypes.bool,
  }).isRequired,
};

export default RecommendedInternshipcard;
