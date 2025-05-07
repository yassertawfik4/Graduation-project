import { CiBookmark, CiClock2 } from "react-icons/ci";
import tailLogo from "/public/images/tailwind.png";
import applicationUser from "/public/images/applicationUser.png";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
function RecommendedInternshipcard({ item }) {
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
          <div>
            <CiBookmark size={35} className="cursor-pointer" />
          </div>
        </div>
        <div className="flex gap-2">
          <button className="bg-[#3A4C59] flex items-center font-semibold rounded-lg gap-2 opacity-85 text-white px-3 py-2">
            <span>
              <CiClock2 size={20} />
            </span>
            Full Time
          </button>
          <button className="bg-[#3A4C59] flex items-center font-semibold rounded-lg gap-2 opacity-85 text-white px-3 py-2">
            <span>
              <FaLocationDot size={20} />
            </span>
            {item.workingModel || item.projectType}
          </button>
          <button className="bg-[#3A4C59] flex items-center font-semibold rounded-lg gap-2 opacity-85 text-white px-3 py-2">
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

export default RecommendedInternshipcard;
