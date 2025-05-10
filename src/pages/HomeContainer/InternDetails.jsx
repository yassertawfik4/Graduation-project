import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../Api/axiosInstance";
import { IoMdArrowBack } from "react-icons/io";
import {
  FaRegBookmark,
  FaBookmark,
  FaShareAlt,
  FaMapMarkerAlt,
  FaWallet,
} from "react-icons/fa";
import { AiOutlineClockCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

// Placeholder company logo
const DUMMY_LOGO_URL = "https://via.placeholder.com/80"; // Replace with actual logo logic later

function InternDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [internDetails, setInternDetails] = useState(null);
  const [activeTab, setActiveTab] = useState("about");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFullCompanyDesc, setShowFullCompanyDesc] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);
  const studentId = localStorage.getItem("studentId");
  useEffect(() => {
    const fetchInternDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get(
          `Internship/GetInternship/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                "accessUsertoken"
              )}`,
            },
          }
        );
        setInternDetails(response.data);
        setIsBookmarked(!!response.data.isBookmarked);
        console.log("Fetched Intern Details:", response.data);
      } catch (err) {
        console.error("Error fetching intern details:", err);
        setError(
          err.response?.data?.message || "Failed to fetch internship details."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchInternDetails();
    }
  }, [id]);

  const handleBookmarkClick = async () => {
    console.log(
      "handleBookmarkClick called. Current status:",
      isBookmarked,
      "Internship ID:",
      id
    );
    setBookmarkLoading(true);
    const currentBookmarkStatus = isBookmarked;

    try {
      if (currentBookmarkStatus) {
        console.log("Attempting to DELETE bookmark (unbookmark)...");
        await axiosInstance.delete(`Bookmarks/internships/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessUsertoken")}`,
          },
        });
        console.log("DELETE request successful.");
        setIsBookmarked(false);
        toast.success("Bookmark removed");
      } else {
        console.log("Attempting to POST bookmark (bookmark)...");
        await axiosInstance.post(
          `Bookmarks/internships/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                "accessUsertoken"
              )}`,
            },
          }
        );
        console.log("POST request successful.");
        setIsBookmarked(true);
        toast.success("Internship bookmarked!");
      }
    } catch (err) {
      console.error(
        `Error ${
          currentBookmarkStatus ? "unbookmarking" : "bookmarking"
        } internship:`,
        err
      );
      console.error("Error response:", err.response);
      console.error("Error request:", err.request);
      console.error("Error message:", err.message);

      toast.error(
        err.response?.data?.message ||
          `Failed to ${
            currentBookmarkStatus ? "remove bookmark" : "bookmark internship"
          }.`
      );
    } finally {
      console.log("Setting bookmarkLoading to false.");
      setBookmarkLoading(false);
    }
  };
  const [studentData, setStudentData] = useState([]);

  const handelGetStudentData = async () => {
    try {
      const response = await axiosInstance.get(
        `Student/profiles/${studentId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessUsertoken")}`,
          },
        }
      );
      setStudentData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handelGetStudentData();
  }, []);
  const handelCreateApplication = async (internshipId) => {
    try {
      const response = await axiosInstance.post(
        `Internship/CreateApplication/${internshipId}`,
        {
          resumeUrl: studentData.resumeUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessUsertoken")}`,
          },
        }
      );
      console.log(response);
      Swal.fire({
        title: "Success",
        text: "Application created successfully",
        icon: "success",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error",
        text: "Failed to create application",
        icon: "error",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-red-500">
        <p>{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!internDetails) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p>Internship details not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>
    );
  }

  // Split responsibilities, requirements, mission, and vision strings into arrays.
  const splitStringByNewline = (str) =>
    str
      ? str
          .split(/\\n/)
          .map((s) => s.trim())
          .filter((s) => s)
      : [];

  // Parse responsibilities and requirements
  const keyResponsibilities =
    splitStringByNewline(internDetails.keyResponsibilities) ||
    internDetails.keyResponsibilities?.split(",").map((item) => item.trim()) ||
    [];

  const requirements =
    splitStringByNewline(internDetails.requirements) ||
    internDetails.requirements?.split(",").map((item) => item.trim()) ||
    [];

  const missionList =
    splitStringByNewline(internDetails.mission) ||
    internDetails.mission?.split(",").map((item) => item.trim()) ||
    [];

  const visionList =
    splitStringByNewline(internDetails.vision) ||
    internDetails.vision?.split(",").map((item) => item.trim()) ||
    [];

  const location = `${internDetails.city || ""}, ${
    internDetails.government || ""
  }`.trim();
  const aboutInternship = internDetails.about || "";
  const companyName = internDetails.companyName || "";
  const aboutCompany = internDetails.aboutCompany || "";
  const salary = internDetails.salary
    ? `${internDetails.salary} ${internDetails.currency || ""}`
    : "Not specified";
  const workingModel = internDetails.workingModel || "Not specified";

  const companyLogoUrl = DUMMY_LOGO_URL;

  return (
    <div className="min-h-screen bg-[rgba(112,125,125,0.6)]  flex flex-col items-center justify-start py-8 px-4 md:px-8">
      {/* Top Controls Container */}
      <div className="w-full max-w-4xl flex justify-between items-center mb-15">
        <button
          onClick={() => navigate(-1)}
          className="text-2xl text-gray-100 hover:text-white p-2  bg-opacity-30 hover:bg-opacity-50 transition-opacity"
          aria-label="Go back"
        >
          <IoMdArrowBack />
        </button>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleBookmarkClick}
            disabled={bookmarkLoading}
            className={`text-xl p-2  bg-opacity-30 cursor-pointer hover:bg-opacity-50 disabled:opacity-50 transition-opacity ${
              isBookmarked ? "text-gray-100" : "text-white"
            }`}
            aria-label="Bookmark"
          >
            {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
          </button>
          <button
            className="text-xl text-gray-100 hover:text-white p-2 bg-opacity-30 hover:bg-opacity-50 transition-opacity"
            aria-label="Share"
            onClick={() => alert("Share functionality not implemented yet.")}
          >
            <FaShareAlt />
          </button>
        </div>
      </div>

      {/* Main Card Container */}
      <div className="relative bg-white rounded-2xl shadow-xl max-w-4xl w-full px-8 pt-16 pb-8">
        {/* Logo */}
        <div className="absolute left-1/2 -top-12 transform -translate-x-1/2">
          <img
            src={companyLogoUrl}
            alt="Company Logo"
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg bg-gray-100 object-cover"
          />
        </div>

        {/* Title & Company */}
        <div className="text-center mt-4">
          <h1 className="text-2xl font-bold text-emerald-950 pb-8">
            {companyName}
          </h1>
          <div className="text-md text-emerald-950 font-semibold mt-1">
            {companyName}
          </div>
          <div className="flex items-center justify-center gap-2 mt-2">
            <FaMapMarkerAlt className="w-4 h-4 text-emerald-950" />
            <span className="text-lg font-semibold text-emerald-950">
              {location}
            </span>
          </div>
        </div>

        {/* Info Tags */}
        <div className="flex justify-between gap-4 mt-6">
          {/* Working Model */}
          <div className="w-[200px] h-[55px] bg-emerald-950 text-white rounded-[8px] px-2 py-1 flex items-center gap-2">
            <FaMapMarkerAlt className="text-xl flex-shrink-0" />
            <div className="flex flex-col">
              <span className="text-xs">Working model</span>
              <span className="text-sm font-semibold">{workingModel}</span>
            </div>
          </div>

          {/* Internship Type */}
          <div className="w-[200px] h-[55px] bg-emerald-950 text-white rounded-[8px] px-2 py-1 flex items-center gap-2">
            <AiOutlineClockCircle className="text-xl flex-shrink-0" />
            <div className="flex flex-col">
              <span className="text-xs">Internship type</span>
              <span className="text-sm font-semibold">
                {internDetails.type || "Not specified"}
              </span>
            </div>
          </div>

          {/* Salary */}
          <div className="w-[200px] h-[55px] bg-emerald-950 text-white rounded-[8px] px-2 py-1 flex items-center gap-2">
            <FaWallet className="text-xl flex-shrink-0" />
            <div className="flex flex-col">
              <span className="text-xs">Salary (monthly)</span>
              <span className="text-sm font-semibold">{salary}</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-between mt-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("about")}
            className={`px-6 py-2 font-bold ${
              activeTab === "about"
                ? "border-b-4 border-green-900 text-green-900"
                : "text-gray-500"
            }`}
          >
            About
          </button>
          <button
            onClick={() => setActiveTab("company")}
            className={`px-6 py-2 font-bold ${
              activeTab === "company"
                ? "border-b-4 border-green-900 text-green-900"
                : "text-gray-500"
            }`}
          >
            Company
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === "about" && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                About the Internship
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6 whitespace-pre-line">
                {aboutInternship}
              </p>

              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Key Responsibilities
              </h2>
              <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 mb-6">
                {keyResponsibilities.map((item, index) => (
                  <li key={`resp-${index}`}>{item}</li>
                ))}
              </ul>

              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Requirements
              </h2>
              <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2">
                {requirements.map((item, index) => (
                  <li key={`req-${index}`}>{item}</li>
                ))}
              </ul>

              <div className="mt-4 text-gray-700">
                <p>
                  <strong>Duration:</strong>{" "}
                  {new Date(internDetails.startDate).toLocaleDateString()} -{" "}
                  {new Date(internDetails.endDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}

          {activeTab === "company" && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                About {companyName || "the Company"}
              </h2>
              {aboutCompany ? (
                <>
                  <p className="text-gray-700 leading-relaxed mb-2 whitespace-pre-line">
                    {showFullCompanyDesc
                      ? aboutCompany
                      : aboutCompany.slice(0, 200) +
                        (aboutCompany.length > 200 ? "..." : "")}
                  </p>
                  {aboutCompany.length > 200 && (
                    <button
                      onClick={() => setShowFullCompanyDesc((prev) => !prev)}
                      className="text-sm text-emerald-950 underline mb-6"
                    >
                      {showFullCompanyDesc ? "Show less" : "Read more"}
                    </button>
                  )}
                </>
              ) : (
                <p className="text-gray-500 mb-6">
                  Company description not available.
                </p>
              )}

              {missionList.length > 0 && (
                <>
                  <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
                    Our Mission
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
                    {missionList.map((item, i) => (
                      <li key={`mission-${i}`}>{item}</li>
                    ))}
                  </ul>
                </>
              )}

              {visionList.length > 0 && (
                <>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Our Vision
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {visionList.map((item, i) => (
                      <li key={`vision-${i}`}>{item}</li>
                    ))}
                  </ul>
                </>
              )}

              {!aboutCompany &&
                missionList.length === 0 &&
                visionList.length === 0 && (
                  <p className="text-gray-500">
                    Detailed company information is not available.
                  </p>
                )}
            </div>
          )}
        </div>

        {/* Apply Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => {
              if (studentData.resumeUrl && studentData.resumeUrl !== "") {
                handelCreateApplication(internDetails.id);
              } else {
                Swal.fire({
                  title: "Error",
                  text: "Please upload your resume first",
                  icon: "error",
                });
              }
            }}
            className="bg-emerald-950 cursor-pointer text-white font-bold py-3 px-12 rounded-lg shadow transition"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default InternDetails;
