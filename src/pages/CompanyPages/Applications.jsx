import application from "/public/images/application.png";
import imageApp from "/public/images/imageApp.png";
import { MdMoreHoriz, MdOutlineFileDownload } from "react-icons/md";
import { FaArrowRightLong, FaRegTrashCan } from "react-icons/fa6";
import "../../styles/ScrollHidden.css";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../Api/axiosInstance";
import { useEffect, useState } from "react";
import { GoPlusCircle } from "react-icons/go";
import Swal from "sweetalert2";
import applicationImage from "/public/images/ApplicationImage.png";
function Applications() {
  const [applications, setApplications] = useState([]);
  const [activeMenuId, setActiveMenuId] = useState(null);

  const { internshipId } = useParams();
  const handelGetApplications = async () => {
    try {
      const response = await axiosInstance.get(
        `Internship/GetApplicationsByInternshipId/${internshipId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessUsertoken")}`,
          },
        }
      );
      console.log(response.data);
      setApplications(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handelDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await axiosInstance.delete(
          `Internship/DeleteApplication/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                "accessUsertoken"
              )}`,
            },
          }
        );
        console.log(response.data);
        handelGetApplications();

        Swal.fire("Deleted!", "The application has been deleted.", "success");
      } catch (error) {
        console.log(error);
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  };
  useEffect(() => {
    handelGetApplications();
  }, []);
  return (
    <div>
      <div className="container mx-auto px-3">
        <div className="relative flex justify-center items-center">
          <img src={application} alt="application" />
        </div>
        <div className="my-20">
          <div className="flex justify-between items-center">
            <h2 className="text-[32px] font-medium text-[#021B1A]">
              Applications
            </h2>
            <button className="bg-[#095544] px-8 py-1.5 rounded-[8px] flex items-center gap-2 text-white cursor-pointer text-[18px] font-medium">
              Sort
            </button>
          </div>
        </div>
        {applications.length > 0 ? (
          <div className="grid grid-cols-3 gap-4 pb-8">
            <div className="bg-[#F1F7F6] rounded-[8px] p-4 max-h-[500px]  overflow-y-auto space-y-5 no-scrollbar">
              <h2 className="py-3.5">
                All Application ({applications.length})
              </h2>
              {applications.map((application) => (
                <div
                  key={application.id}
                  className=" bg-[#FFFFFF] py-3 px-4 space-y-5 rounded-[8px]"
                >
                  <div className="flex justify-between w-full items-center">
                    <div className="flex gap-2.5 items-center">
                      <div>
                        <img src={imageApp} alt="imageApp" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <h2>{application.studentName}</h2>
                        <p className="text-[14px] text-[#707D7D] ">
                          {application.studentTitle}
                        </p>
                      </div>
                    </div>
                    <div className="relative">
                      <MdMoreHoriz
                        className="cursor-pointer"
                        size={30}
                        onClick={() =>
                          setActiveMenuId(
                            activeMenuId === application.id
                              ? null
                              : application.id
                          )
                        }
                      />
                      {activeMenuId === application.id && (
                        <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md z-20 p-2 w-32">
                          <button className="text-left flex items-center gap-2 cursor-pointer w-full px-3 py-2 text-sm hover:bg-gray-100">
                            <GoPlusCircle size={20} /> Add
                          </button>
                          <button
                            onClick={() => handelDelete(application.id)}
                            className="text-left flex items-center gap-2 cursor-pointer w-full px-3 py-2 text-sm hover:bg-gray-100 text-red-600"
                          >
                            <FaRegTrashCan size={20} /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <ul className="flex flex-col justify-start gap-2 list-disc px-6">
                      <li className="text-[14px] text-[#707D7D] ">
                        Education: {application.education}
                      </li>
                      <li className="text-[14px] text-[#707D7D] ">
                        Applied:{" "}
                        {new Date(application.appliedAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </li>
                    </ul>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <a
                      href={application.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#095544] py-2 cursor-pointer text-[18px] font-medium flex items-center gap-2"
                    >
                      <MdOutlineFileDownload size={24} />
                      Download CV
                    </a>
                    <Link
                      to={`/profile/${application.studentProfileId}`}
                      className="bg-[#F1F7F6] text-[#095544] px-5 py-2 cursor-pointer text-[18px] font-medium flex items-center gap-2"
                    >
                      View Profile <FaArrowRightLong size={24} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="py-6 w-full">
            <div className="flex justify-center flex-col items-center">
              <img src={applicationImage} alt="ApplicationImage" className="" />
              <div className="flex flex-col items-center gap-2 my-3">
                <h2 className="text-[#021B1A] text-[32px] font-bold">
                  No Applications yet?
                </h2>
                <p className="text-[#707D7D] text-[24px] font-medium">
                  {" "}
                  Please check back later.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Applications;
