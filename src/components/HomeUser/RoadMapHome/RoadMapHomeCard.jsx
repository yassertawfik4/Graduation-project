import { CiBookmark } from "react-icons/ci";
import MapLogo from "/public/images/Mapbox.png";
import applicationUser from "/public/images/applicationUser.png";
import Swal from "sweetalert2";
import axiosInstance from "../../../Api/axiosInstance";
import { useState } from "react";
import { BsBookmarkFill } from "react-icons/bs";
import { Link } from "react-router-dom";

export const RoadMapHomeCard = ({ item }) => {
  const [isBookmarked, setIsBookmarked] = useState(item.isBookmarked || false);
  const [isLoading, setIsLoading] = useState(false);

  {
    /* make bookmark */
  }
  const handleBookmark = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      if (isBookmarked) {
        // Unbookmark
        await axiosInstance.delete(`Bookmarks/roadmaps/${item.id}`, {
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
          `Bookmarks/roadmaps/${item.id}`,
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
  console.log(item)
  return (
    <div className="bg-white rounded-lg p-4 shadow-lg my-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 my-3 ">
          <div>
            <img
              className="w-[64px] h-[64px]"
              loading="lazy"
              decoding="async"
              src={MapLogo}
              alt="tailwind"
            />
          </div>
          <div>
            <Link to={`/roadmap/${item.id}`} className="text-[#010318] font-bold font-[roboto] text-[24px]">
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

      <div className="my-4 flex gap-3 items-center">
        <img className="w-[70px]" src={applicationUser} alt="applicationUser" />
        <p className="text-[#3A4C59] font-[roboto] text-[13px] font-medium my-2">
          20 Bookmarks
        </p>
      </div>
    </div>
  );
};
