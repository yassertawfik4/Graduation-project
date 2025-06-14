import React, { useEffect, useState } from "react";
import { BsBookmarkFill } from "react-icons/bs";
import { CiBookmark, CiClock2 } from "react-icons/ci";
import { FaArrowRight, FaLocationDot } from "react-icons/fa6";
import Swal from "sweetalert2";
import axiosInstance from "../../Api/axiosInstance";
import applicationUser from "/public/images/applicationUser.png";
import Mapbox from "/public/images/Mapbox.png";
import { Link } from "react-router-dom";
function RoadMapVeiwAll() {
  const [premiumRoadMap, setPremiumRoadMap] = useState([]);
  const token = localStorage.getItem("accessUsertoken");

  const handelGetRoadMap = async () => {
    try {
      const response = await axiosInstance.get(`Roadmap/premium`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPremiumRoadMap(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handelGetRoadMap();
  }, []);
  return (
    <div className="min-h-screen my-10">
      <div className="container mx-auto px-3">
        {premiumRoadMap.map((data) => (
          <div
            key={data.id}
            className="bg-white rounded-lg p-6 shadow-lg mb-6 max-w-7xl w-[60%] mx-auto"
          >
            <div className="flex justify-between items-center">
              <div className="flex gap-4 my-2">
                <div>
                  <img
                    className="w-16 h-16"
                    loading="lazy"
                    decoding="async"
                    src={Mapbox}
                    alt={` logo`}
                  />
                </div>
                <div>
                  <Link
                    to={`/roadmap/${data.id}`}
                    className="text-gray-900 font-bold font-roboto text-2xl"
                  >
                    asx
                  </Link>
                  <p className="text-gray-700 font-roboto text-base font-bold">
                    asx
                  </p>
                </div>
              </div>
              <div className="handleBookmark">
                <BsBookmarkFill
                  size={35}
                  className="cursor-pointer text-black transition-colors duration-200"
                />
              </div>
            </div>

            <div className="my-4 flex gap-3 items-center">
              <img
                className="w-[70px]"
                src={applicationUser}
                alt="applicationUser"
              />
              <p className="text-[#3A4C59] font-[roboto] text-[13px] font-medium my-2">
                20 Bookmarks
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoadMapVeiwAll;
