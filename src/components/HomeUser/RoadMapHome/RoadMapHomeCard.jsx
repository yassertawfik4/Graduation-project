import { CiBookmark } from "react-icons/ci";
import MapLogo from "/public/images/Mapbox.png";
import applicationUser from "/public/images/applicationUser.png";

export const RoadMapHomeCard = () => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-lg ">
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
            <h2 className="text-[#010318] font-bold font-[roboto] text-[24px]">
              Back End roadmap
            </h2>
            <p className="text-[#3A4C59] font-[roboto] text-[16px] font-bold">
              Mapbox
            </p>
          </div>
        </div>
        <div>
          <CiBookmark size={35} className="cursor-pointer" />
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
