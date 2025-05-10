import { Link } from "react-router-dom";
import internShipIcon from "/public/images/internShipIcon.png";
import projectIcon from "/public/images/projectIcon.png";
import roadMapIcon from "/public/images/roadMapIcon.png";
function Posts() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="container mx-auto px-3">
        <div className="flex justify-center flex-col items-center w-full">
          <div className="w-full py-10">
            <h2 className="text-[24px] font-medium text-center">
              Create new post
            </h2>
            <p className="text-[#707D7D] text-[18px] text-center">
              Choose what you want to share—an internship, a project, or a
              roadmap to guide students.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-[32px] py-4 px-5 w-[698px]">
            <div className="my-20 space-y-4">
              <h2 className="text-[24px] font-bold">
                What do you want to post?
              </h2>
              <p className="text-[#707D7D] text-[16px]">
                Select an option to get started
              </p>
            </div>
            <div className="flex gap-8 items-center flex-wrap w-full space-y-4 pb-5">
              <Link
                to={`/post/addinternship`}
                className="cursor-pointer flex gap-4 w-[284px] items-center transition duration-300 ease-in-out border border-[transparent] hover:border-[#095544] rounded-[16px] p-4 shadow-lg"
              >
                <div className="bg-[rgba(9,85,68,0.15)] rounded-full w-16 h-16 flex justify-center items-center">
                  <img className="" src={internShipIcon} alt="internShipIcon" />
                </div>
                <div>
                  <h2 className="text-[18px] font-medium text-[#032221]">
                    Internship
                  </h2>
                </div>
              </Link>
              <Link
                to={`/post/addproject`}
                className="cursor-pointer flex gap-4 w-[284px] items-center transition duration-300 ease-in-out border border-[transparent] hover:border-[#095544] rounded-[16px] p-4 shadow-lg"
              >
                <div className="bg-[rgba(9,85,68,0.15)] rounded-full w-16 h-16 flex justify-center items-center">
                  <img className="" src={projectIcon} alt="projectIcon" />
                </div>
                <div>
                  <h2 className="text-[18px] font-medium text-[#032221]">
                    Project
                  </h2>
                </div>
              </Link>
              <Link
                to={`/post/addRoadmap`}
                className="cursor-pointer flex gap-4 w-[284px] items-center transition duration-300 ease-in-out border border-[transparent] hover:border-[#095544] rounded-[16px] p-4 shadow-lg"
              >
                <div className="bg-[rgba(9,85,68,0.15)] rounded-full w-16 h-16 flex justify-center items-center">
                  <img className="" src={roadMapIcon} alt="roadMapIcon" />
                </div>
                <div>
                  <h2 className="text-[18px] font-medium text-[#032221]">
                    Roadmap
                  </h2>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
