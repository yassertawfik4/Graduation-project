import { useState, useEffect } from "react";
import { FaPen, FaPlus, FaSearch, FaTimes, FaTrash } from "react-icons/fa";
import axiosInstance from "../../../Api/axiosInstance";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

function StudentSkills({ data }) {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [availableSkills, setAvailableSkills] = useState([]);
  const isCompany = localStorage.getItem("isCompany");

  // Initialize skills from props data
  useEffect(() => {
    if (data && data.skills && data.skills.length > 0) {
      setSkills(data.skills);
    }
    // Fetch all available skills
    fetchAllSkills();
  }, [data]);

  // Fetch all available skills from the API
  const fetchAllSkills = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`Skill`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessUsertoken")}`,
        },
      });

      setAvailableSkills(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching skills:", error);
      Swal.fire({
        icon: "error",
        title: "Error Loading Skills",
        text: "Unable to load available skills. Please try again later.",
        confirmButtonColor: "#3A4C59",
      });
    } finally {
      setLoading(false);
    }
  };

  // Filter skills based on search term
  const filteredSkills = availableSkills.filter((skill) =>
    skill.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add a skill to the student profile
  const handleAddSkill = async () => {
    if (!selectedSkill) {
      Swal.fire({
        icon: "warning",
        title: "Selection Required",
        text: "Please select a skill to add",
        confirmButtonColor: "#3A4C59",
      });
      return;
    }

    try {
      setLoading(true);

      const skillToAdd = availableSkills.find(
        (skill) => skill.id === selectedSkill
      );

      if (!skillToAdd) {
        Swal.fire({
          icon: "error",
          title: "Skill Not Found",
          text: "The selected skill could not be found",
          confirmButtonColor: "#3A4C59",
        });
        return;
      }

      // Check if skill already exists in user skills
      if (skills.some((s) => s.id === skillToAdd.id)) {
        Swal.fire({
          icon: "warning",
          title: "Skill Already Added",
          text: "This skill is already in your profile",
          confirmButtonColor: "#3A4C59",
        });
        return;
      }

      // Add skill to the student's profile
      await axiosInstance.post(
        `Skill/student/${skillToAdd.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessUsertoken")}`,
          },
        }
      );

      // Add to local state
      setSkills([...skills, skillToAdd]);
      setSelectedSkill("");
      setShowModal(false);

      Swal.fire({
        icon: "success",
        title: "Skill Added",
        text: `${skillToAdd.name} has been added to your profile.`,
        timer: 2000,
        timerProgressBar: true,
        confirmButtonColor: "#3A4C59",
      });
    } catch (error) {
      console.error("Error adding skill:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to add skill",
        confirmButtonColor: "#3A4C59",
      });
    } finally {
      setLoading(false);
    }
  };

  // Remove a skill from the student profile
  const handleRemoveSkill = async (skillId, skillName) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Remove ${skillName} from your skills?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3A4C59",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);

          // Delete skill from the server
          await axiosInstance.delete(`Skill/info?id=${skillId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                "accessUsertoken"
              )}`,
            },
          });

          // Remove from local state
          setSkills(skills.filter((skill) => skill.id !== skillId));

          Swal.fire({
            icon: "success",
            title: "Removed!",
            text: `${skillName} has been removed from your skills.`,
            timer: 2000,
            timerProgressBar: true,
            confirmButtonColor: "#3A4C59",
          });
        } catch (error) {
          console.error("Error removing skill:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.response?.data?.message || "Failed to remove skill",
            confirmButtonColor: "#3A4C59",
          });
        } finally {
          setLoading(false);
        }
      }
    });
  };

  const handleSave = async () => {
    setIsEditing(false);
    Swal.fire({
      icon: "success",
      title: "Skills Updated",
      text: "Your skills have been updated successfully.",
      timer: 1500,
      timerProgressBar: true,
      confirmButtonColor: "#3A4C59",
    });
  };

  return (
    <div className="mt-6 bg-white border border-[#C9C9C9] rounded-lg p-6">
      <div className="flex justify-between items-center mb-4 pb-5">
        <h3 className="text-xl font-bold text-[#3A4C59]">Skills</h3>
        {!isEditing && isCompany !== "Company" ? (
          <button
            onClick={() => {
              if (skills.length > 0) {
                setIsEditing(true);
              } else {
                setShowModal(true);
              }
            }}
            className="flex items-center gap-2 px-4 py-2 bg-transparent cursor-pointer font-bold text-[#8D9499] border border-[#C9C9C9] rounded-md hover:bg-gray-100"
            disabled={loading}
          >
            {skills.length > 0 ? (
              <>
                <FaPen size={15} />
                Edit Skills
              </>
            ) : (
              <>
                <FaPlus size={15} />
                Add Skills
              </>
            )}
          </button>
        ) : (
          isCompany !== "Company" && (
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-transparent cursor-pointer font-bold text-[#8D9499] border border-[#C9C9C9] rounded-md hover:bg-gray-100"
              disabled={loading}
            >
              <FaPlus size={15} />
              Add Skill
            </button>
          )
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.length > 0 ? (
          skills.map((skill) => (
            <div
              key={skill.id}
              className="flex items-center gap-2 border border-[#8D9499] px-3 py-1 font-semibold rounded"
            >
              <span className="text-[#3A4C59]">{skill.name}</span>
              {isEditing && (
                <button
                  onClick={() => handleRemoveSkill(skill.id, skill.name)}
                  className="text-red-500 hover:text-red-700"
                  disabled={loading}
                >
                  <FaTrash size={12} />
                </button>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8 w-full">
            <p className="text-[#8D9499] mb-4">No skills added yet.</p>
            {isCompany !== "Company" && (
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#3A4C59] text-white rounded-md hover:bg-opacity-90"
                disabled={loading}
              >
                <FaPlus size={14} />
                Add Your First Skill
              </button>
            )}
          </div>
        )}
      </div>

      {isEditing && (
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() => {
              setIsEditing(false);
              Swal.fire({
                icon: "info",
                title: "Cancelled",
                text: "No changes have been saved.",
                timer: 1500,
                timerProgressBar: true,
                confirmButtonColor: "#3A4C59",
              });
            }}
            className="px-4 py-2 bg-white font-medium text-[#C51800] border cursor-pointer border-[#C51800] rounded-md"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-[#3A4C59] font-medium text-white cursor-pointer rounded-md"
            disabled={loading}
          >
            Update
          </button>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-[#000000]/[0.43]">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[536px]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Add Skills</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 cursor-pointer hover:text-gray-800"
                disabled={loading}
              >
                <FaTimes size={24} />
              </button>
            </div>

            <div className="relative mb-4">
              <FaSearch className="absolute left-3 top-3 text-[#C9C9C9]" />
              <input
                type="text"
                className="w-full pl-10 p-2 border border-gray-300 rounded-md outline-none"
                placeholder="Search for skills"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="skillSelect"
                className="block text-sm font-medium text-[#3A4C59] mb-2"
              >
                Select a skill
              </label>
              <select
                id="skillSelect"
                className="w-full p-2 border border-gray-300 rounded-md outline-none"
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                disabled={loading}
              >
                <option value="">-- Select a skill --</option>
                {filteredSkills.map((skill) => (
                  <option key={skill.id} value={skill.id}>
                    {skill.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-between gap-2 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-white font-medium text-[16px] text-[#C51800] border cursor-pointer border-[#C51800] rounded-md"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleAddSkill}
                className="px-6 py-4 bg-[#3A4C59] font-medium text-[16px] text-white cursor-pointer rounded-md"
                disabled={loading || !selectedSkill}
              >
                {loading ? "Adding..." : "Add Skill"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

StudentSkills.propTypes = {
  data: PropTypes.shape({
    skills: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
      })
    ),
  }),
};

export default StudentSkills;
