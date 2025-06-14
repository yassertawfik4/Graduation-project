import React, { useEffect, useState } from "react";
import { FaRegCirclePlay } from "react-icons/fa6";
import { GoBook } from "react-icons/go";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../../Api/axiosInstance";

function SectionInfo({ setAddQuiz , setIsCreate }) {
  const [roadMap, setRoadMap] = useState([]);
  const [checkedItems, setCheckedItems] = useState({}); // لحفظ الحالة لكل عنصر
  const { roadMapId } = useParams();

  const handelGetRoadMapSections = async () => {
    try {
      const response = await axiosInstance.get(
        `Roadmap/${roadMapId}?includeSections=true`
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
      <div className="">
        <h2 className="text-center text-[32px] font-medium">
          See what you ve done so far
        </h2>
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
                    <h2 className="text-[#032221] font-medium px-4">
                      {item.title}
                    </h2>
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
      <div className="w-full flex justify-between items-center">
        <button className="border border-[#095544] px-5 py-4 w-[130px] rounded-[8px] text-[#095544] font-medium cursor-pointer">
          Previous
        </button>
        <div>
          <button
            onClick={() =>{
              setIsCreate(false)
              setAddQuiz(true)
            }}
            className="bg-[#095544] text-white rounded-[8px] px-5 py-4 cursor-pointer font-medium "
          >
            Add quiz for this section
          </button>
        </div>
      </div>
    </div>
  );
}

export default SectionInfo;
