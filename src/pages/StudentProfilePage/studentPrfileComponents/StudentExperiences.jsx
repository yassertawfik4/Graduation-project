import { useState, useEffect } from "react";
import { FaPen, FaPlus } from "react-icons/fa";
import PropTypes from "prop-types";
import axiosInstance from "../../../Api/axiosInstance";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function StudentExperiences({ data }) {
  const [isEditing, setIsEditing] = useState(false);
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentExperience, setCurrentExperience] = useState({
    startDate: "",
    endDate: "",
    jobTitle: "",
    companyName: "",
  });

  // Initialize experiences from props data when it's available
  useEffect(() => {
    if (data && data.experiences && data.experiences.length > 0) {
      setExperiences(
        data.experiences.map((exp) => ({
          ...exp,
          startDate: exp.startDate
            ? new Date(exp.startDate).toISOString().split("T")[0]
            : "",
          endDate: exp.endDate
            ? new Date(exp.endDate).toISOString().split("T")[0]
            : "",
          description: exp.description || "",
        }))
      );
    }
  }, [data]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentExperience((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle adding/updating experience
  const handleUpdateExperience = async () => {
    try {
      setLoading(true);

      // Validate required fields
      if (
        !currentExperience.jobTitle ||
        !currentExperience.companyName ||
        !currentExperience.startDate ||
        !currentExperience.endDate
      ) {
        toast.error("Please fill all required fields");
        setLoading(false);
        return;
      }

      // Format dates for API
      const formattedExperience = {
        ...currentExperience,
        startDate: new Date(currentExperience.startDate).toISOString(),
        endDate: new Date(currentExperience.endDate).toISOString(),
      };

      if (currentExperience.id) {
        // Update existing experience on the server
        await axiosInstance.put(
          `Student/profiles/me/experience/${currentExperience.id}`,
          formattedExperience,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                "accessUsertoken"
              )}`,
            },
          }
        );

        // Update local state
        setExperiences((prev) =>
          prev.map((exp) =>
            exp.id === currentExperience.id ? currentExperience : exp
          )
        );

        toast.success("Experience updated successfully");
      } else {
        // Add new experience to the server
        const response = await axiosInstance.post(
          "Student/profiles/me/experience",
          formattedExperience,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                "accessUsertoken"
              )}`,
            },
          }
        );

        // Add to local state with the ID from the response
        const newExperience = {
          ...currentExperience,
          id: response.data.id || crypto.randomUUID(),
        };

        setExperiences((prev) => [...prev, newExperience]);
        toast.success("Experience added successfully");
      }

      // Reset current experience and exit editing mode
      setCurrentExperience({
        startDate: "",
        endDate: "",
        jobTitle: "",
        companyName: "",
        description: "",
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving experience:", error);
      toast.error(error.response?.data?.message || "Failed to save experience");
    } finally {
      setLoading(false);
    }
  };

  // Delete an experience
  const handleDeleteExperience = async (id, jobTitle) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Delete experience as ${jobTitle}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3A4C59",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);

          // Delete from server
          await axiosInstance.delete(`Student/profiles/me/experience/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                "accessUsertoken"
              )}`,
            },
          });

          // Remove from local state
          setExperiences((prev) => prev.filter((exp) => exp.id !== id));

          Swal.fire("Deleted!", "Your experience has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting experience:", error);
          Swal.fire(
            "Error!",
            error.response?.data?.message || "Failed to delete experience",
            "error"
          );
        } finally {
          setLoading(false);
        }
      }
    });
  };

  // Edit an existing experience
  const handleEditExperience = (experience) => {
    setCurrentExperience(experience);
    setIsEditing(true);
  };

  // Add new experience
  const handleAddNewExperience = () => {
    setCurrentExperience({
      startDate: "",
      endDate: "",
      jobTitle: "",
      companyName: "",
    });
    setIsEditing(true);
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="mt-6 bg-white border border-[#C9C9C9] rounded-lg p-6">
      <div className="flex justify-between items-center mb-4 pb-5">
        <h2 className="text-xl font-bold text-[#3A4C59]">Experiences</h2>
        {!isEditing && (
          <button
            onClick={handleAddNewExperience}
            className="flex items-center gap-2 px-4 py-2 bg-transparent cursor-pointer font-bold text-[#8D9499] border border-[#C9C9C9] rounded-md hover:bg-gray-100"
            disabled={loading}
          >
            <FaPlus size={15} />
            Add New Experience
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="font-medium text-[#3A4C59] mb-2">
            {currentExperience.id ? "Edit Experience" : "Add New Experience"}
          </h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex gap-4 w-full">
              <div className="w-1/2">
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium text-[#3A4C59]"
                >
                  Start Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={currentExperience.startDate}
                  onChange={handleChange}
                  className="border border-[#C9C9C9] p-2 rounded w-full mt-1 outline-none"
                  required
                />
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="endDate"
                  className="block text-sm font-medium text-[#3A4C59]"
                >
                  End Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={currentExperience.endDate}
                  onChange={handleChange}
                  className="border border-[#C9C9C9] p-2 rounded w-full mt-1 outline-none"
                  required
                />
              </div>
            </div>

            <div className="flex gap-4 w-full">
              <div className="w-1/2">
                <label
                  htmlFor="jobTitle"
                  className="block text-sm font-medium text-[#3A4C59]"
                >
                  Role <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="jobTitle"
                  name="jobTitle"
                  value={currentExperience.jobTitle}
                  onChange={handleChange}
                  className="border border-[#C9C9C9] p-2 rounded w-full mt-1 outline-none"
                  required
                />
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="companyName"
                  className="block text-sm font-medium text-[#3A4C59]"
                >
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={currentExperience.companyName}
                  onChange={handleChange}
                  className="border border-[#C9C9C9] p-2 rounded w-full mt-1 outline-none"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleUpdateExperience}
              className="px-4 py-2 bg-[#3A4C59] font-medium text-white cursor-pointer rounded-md"
              disabled={loading}
            >
              {loading ? "Saving..." : currentExperience.id ? "Update" : "Add"}
            </button>
            <button
              onClick={() => {
                setCurrentExperience({
                  startDate: "",
                  endDate: "",
                  jobTitle: "",
                  companyName: "",
                  description: "",
                });
                setIsEditing(false);
              }}
              className="px-4 py-2 bg-gray-300 font-medium text-[#3A4C59] cursor-pointer rounded-md"
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          {experiences.length > 0 ? (
            experiences.map((exp, index) => (
              <div
                key={exp.id}
                className={`${
                  index > 0 ? "mt-6 pt-6 border-t border-gray-200" : ""
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-3">
                    <p className="text-[#3A4C59] font-semibold text-xl">
                      {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                    </p>
                    <p className="font-semibold text-[#3A4C59]">
                      Job Title: {exp.jobTitle}
                    </p>
                    <p className="text-[#3A4C59] font-semibold">
                      Company: {exp.companyName}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditExperience(exp)}
                      className="flex items-center gap-1 px-3 py-1 cursor-pointer text-[#3A4C59] bg-gray-100 hover:bg-gray-200 rounded-md"
                    >
                      <FaPen size={12} />
                      <span className="text-sm">Edit</span>
                    </button>
                    <button
                      onClick={() =>
                        handleDeleteExperience(exp.id, exp.jobTitle)
                      }
                      className="flex items-center gap-1 px-3 py-1 cursor-pointer text-red-600 bg-gray-100 hover:bg-gray-200 rounded-md"
                      disabled={loading}
                    >
                      <span className="text-sm">Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-[#3A4C59] mb-4">No experiences added yet.</p>
              <button
                onClick={handleAddNewExperience}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#3A4C59] text-white rounded-md hover:bg-opacity-90"
              >
                <FaPlus size={14} />
                Add Your First Experience
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

StudentExperiences.propTypes = {
  data: PropTypes.shape({
    experiences: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        jobTitle: PropTypes.string,
        companyName: PropTypes.string,
        startDate: PropTypes.string,
        endDate: PropTypes.string,
        description: PropTypes.string,
      })
    ),
  }),
};

export default StudentExperiences;
