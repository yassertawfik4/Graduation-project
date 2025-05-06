import { useEffect, useState } from "react";
import { CiBookmark } from "react-icons/ci";
import { FaRegCirclePlay } from "react-icons/fa6";
import { FiShare2 } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../Api/axiosInstance";
import { GoBook } from "react-icons/go";
function RoadMapDetailes() {
  const [roadMap, setRoadMap] = useState(null);
  const { roadmapid } = useParams();
  const [checkedItems, setCheckedItems] = useState({}); // لحفظ الحالة لكل عنصر
  const handelGetRoadMapSections = async () => {
    try {
      const response = await axiosInstance.get(
        `Roadmap/${roadmapid}?includeSections=true`
      );
      setRoadMap(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handelGetRoadMapSections();
  }, []);
  const toggleCheckbox = (id) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div>
      <div className="container mx-auto px-3">
        <div className="my-6">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <h2 className="text-[32px] font-normal text-[#021B1A]">
                {roadMap?.title}
              </h2>
              <span className="w-[96px] h-[4px] my- [background:linear-gradient(to_left,_#095544_75%,_#021B1A_100%)]"></span>
            </div>
            <div className="flex items-center gap-3">
              <CiBookmark className="cursor-pointer" size={35} />
              <FiShare2 className="cursor-pointer" size={35} />
            </div>
          </div>
          <div className="my-3">
            <p className="text-[#032221] text-[18px] font-semibold">
              Technology : {roadMap?.technology}
            </p>
          </div>
          <div className="my-3">
            <p className="text-[#032221] text-[18px] font-semibold">
              Type : {roadMap?.isPremium ? "Premium" : "Free"}
            </p>
          </div>
          <div className="my-3">
            <p className="text-[#032221] text-[18px] font-semibold">
              Company :{" "}
              <Link
                className="text-[#095544] underline"
                to={`/company/${roadMap?.companyId}`}
              >
                Company Profile
              </Link>
            </p>
          </div>
          <div className="w-[80%] my-3">
            <p className="text-[#032221] text-[18px] font-semibold">
              {roadMap?.description}
            </p>
          </div>
        </div>

        {/* Sections */}
        <div className="my-20 space-y-10">
          {roadMap?.sections?.map((section, index) => (
            <div
              key={section.id}
              className={`flex ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`${
                  index % 2 === 0
                    ? "border-b-7 border-l-7"
                    : "border-b-7 border-r-7"
                } border-[#095544] rounded-[24px] px-4 py-3 shadow-xl w-[702px]`}
              >
                <h3 className="bg-[#095544] w-fit px-5 py-0.5 rounded-[24px] text-white font-medium text-[22px] border-5 border-[#AACBC4]">
                  {section.order}
                </h3>
                <div className="flex items-center gap-2 py-3 bg-white">
                  <input
                    type="checkbox"
                    id={`checkbox-${section.id}`}
                    className="w-5 h-5 accent-[#095544]"
                    checked={!!checkedItems[section.id]}
                    onChange={() => toggleCheckbox(section.id)}
                  />
                  <label
                    htmlFor={`checkbox-${section.id}`}
                    className={`text-[24px] font-semibold cursor-pointer ${
                      checkedItems[section.id]
                        ? "line-through text-gray-500"
                        : ""
                    }`}
                  >
                    {section.title}
                  </label>
                </div>
                {section.items?.map((item) => (
                  <div key={item.title} className="">
                    {/* Resources */}
                    <ul className="pb-5 pt-3 space-y-2">
                      <h2 className="text-[#032221] font-medium px-4">
                        {item.type}
                      </h2>
                      {item.resources?.map((res, i) => (
                        <li key={i} className="flex items-center gap-2">
                          {item.type === "video" ? (
                            <FaRegCirclePlay size={20} />
                          ) : (
                            <GoBook size={20} />
                          )}

                          <Link
                            className="text-[16px] font-normal underline"
                            to={res.url}
                            target="_blank"
                          >
                            : {res.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RoadMapDetailes;
