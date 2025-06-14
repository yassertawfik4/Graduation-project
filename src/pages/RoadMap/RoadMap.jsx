import { FaArrowRight } from "react-icons/fa";
import roadmapImage from "/public/images/roadmap.png";
import { useEffect, useState } from "react";
import axiosInstance from "../../Api/axiosInstance";
import { Link } from "react-router-dom";

function RoadMap() {
  const [roadmaps, setRoadmaps] = useState([]);
  // const token = localStorage.getItem("accessUsertoken");
  const handelGetAllRoudmaps = async () => {
    try {
      const response = await axiosInstance.get(`Roadmap/public`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessUsertoken")}`,
        },
      });
      setRoadmaps(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  // const handelGetRoadMapPrumium = async () => {
  //   try {
  //     const response = await axiosInstance.get(`Roadmap/premium`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     setRoadmaps(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  useEffect(() => {
    handelGetAllRoudmaps();
    // handelGetRoadMapPrumium();
  }, []);
  return (
    <div className="my-4">
      <div className="container mx-auto px-3">
        <div className="flex justify-between items-center my-12">
          <div className="w-[630px] flex flex-col gap-8">
            <h2 className="font-[Rubik] xl:text-[40px] lg:text-[36px] md:text-[32px] text-[28px] text-[#021B1A] font-bold">
              Step<span className="text-[#095544]">Up</span> The Career ladder
            </h2>
            <p className="text-[#032221] font-[Roboto] xl:text-[32px] lg:text-[28px] md:text-[24px] text-[20px] font-medium">
              Begin a transformative journey with our comprehensive roadmap to
              achievement. From initial steps to career advancement, we provide
              the guidance and structure necessary to map your road ahead and
              navigate towards your desired future
            </p>
          </div>
          <div className="md:block hidden">
            <img loading="lazy" src={roadmapImage} alt="roadmapImage" />
          </div>
        </div>
        <div>
          <h2 className="font-[Rubik] text-[32px] text-center text-[#021B1A] font-bold">
            Choose Your path
          </h2>
          <div
            className={`grid gap-12 my-14 ${
              roadmaps.length === 0 ? "w-full grid-cols-1" : " grid-cols-2 "
            }`}
          >
            {roadmaps.length === 0 ? (
              <p className="text-center font-medium text-[#021B1A]">
                No roadmaps available
              </p>
            ) : (
              roadmaps.map((item) => (
                <div
                  key={item.id}
                  className="font-[Rubik] border-l-8 shadow-sm rounded-xl border-[#095544] border-b-14 rounded-l-xl rounded-br-xl rounded-b-none text-[32px] text-center text-[#032221] font-bold"
                >
                  <Link
                    onClick={() => console.log(item.id)}
                    to={`/roadmap/${item.id}`}
                    className="flex justify-between rounded-xl cursor-pointer text-[#095544] p-8 bg-white"
                  >
                    <h2 className="text-[#021B1A]">{item.title}</h2>
                    <FaArrowRight />
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoadMap;
