import { FaArrowRight } from "react-icons/fa";
import roadmapImage from "/public/images/roadmap.png";

function RoadMap() {
  return (
    <div className="my-4">
      <div className="container mx-auto px-3">
        <div className="flex justify-between items-center my-12">
          <div className="w-[630px] flex flex-col gap-8">
            <h2 className="font-[Rubik] text-[40px] text-[#021B1A] font-bold">
              Step<span className="text-[#095544]">Up</span> The Career ladder
            </h2>
            <p className="text-[#032221] font-[Roboto]  text-[32px] font-medium">
              Begin a transformative journey with our comprehensive roadmap to
              achievement. From initial steps to career advancement, we provide
              the guidance and structure necessary to map your road ahead and
              navigate towards your desired future
            </p>
          </div>
          <div>
            <img loading="lazy" src={roadmapImage} alt="roadmapImage" />
          </div>
        </div>
        <div>
          <h2 className="font-[Rubik] text-[32px] text-center text-[#021B1A] font-bold">
            Choose Your path
          </h2>
          <div className="grid grid-cols-2 gap-12 my-14">
            <div className="font-[Rubik] border-l-8 shadow-sm rounded-xl border-[#095544] border-b-14 rounded-l-xl rounded-br-xl rounded-b-none text-[32px] text-center text-[#032221] font-bold">
              <div className="flex justify-between rounded-xl cursor-pointer text-[#095544] p-8 bg-white">
                <h2 className="text-[#021B1A]">Frontend</h2>
                <FaArrowRight />
              </div>
            </div>
            <div className="font-[Rubik] border-l-8 shadow-sm rounded-xl border-[#095544] border-b-14 rounded-l-xl rounded-br-xl rounded-b-none text-[32px] text-center text-[#032221] font-bold">
              <div className="flex justify-between rounded-xl text-[#095544] p-8 bg-white">
                <h2 className="text-[#021B1A]">Frontend</h2>
                <FaArrowRight />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoadMap;
