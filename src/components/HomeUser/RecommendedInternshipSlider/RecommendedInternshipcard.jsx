import { CiBookmark, CiClock2 } from "react-icons/ci";
import tailLogo from "/public/images/tailwind.png";
import applicationUser from "/public/images/applicationUser.png";
import { FaLocationDot } from "react-icons/fa6";
function RecommendedInternshipcard() {
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
              <h2 className="text-[#010318] font-bold font-[roboto] text-[24px]">
                UI/UX designer
              </h2>
              <p className="text-[#3A4C59] font-[roboto] text-[16px] font-bold">
                Tailwind
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
            Remote
          </button>
          <button className="bg-[#3A4C59] flex items-center font-semibold rounded-lg gap-2 opacity-85 text-white px-3 py-2">
            internship
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
              20 Application
            </p>
          </div>
          <div>
            <p className="text-[#010318] font-medium font-[roboto] text-[16px]">
              00$-00$ <span className="text-[#B8B8B8]">/month</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecommendedInternshipcard;
