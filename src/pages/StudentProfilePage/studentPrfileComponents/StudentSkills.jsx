import { useState } from "react";
import { FaPen, FaPlus, FaSearch, FaTimes } from "react-icons/fa";

function StudentSkills() {
  const [skills, setSkills] = useState([
    "React",
    "Responsive Design",
    "Git",
    "Sass",
  ]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [recommendedSkills, setRecommendedSkills] = useState([
    "UI/UX Principles",
    "English",
    "German",
    "CSS",
    "Problem Solving",
    "MySQL",
    "JSON",
  ]);

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleSelectRecommendedSkill = (skill) => {
    setNewSkill(skill);
  };

  const handleRemoveSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="mt-6 bg-white border border-[#C9C9C9] rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Skills</h3>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white text-[#8D9499] border border-[#C9C9C9] cursor-pointer font-bold rounded-md "
          >
            <FaPen size={15} />
            Edit Skills
          </button>
        ) : (
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white text-[#8D9499] border border-[#C9C9C9] cursor-pointer font-bold rounded-md "
          >
            <FaPlus size={15} />
            Add
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="flex items-center gap-2 border border-[#8D9499] px-3 py-1 font-semibold rounded"
          >
            <span className="text-[#3A4C59]">{skill}</span>
            {isEditing && (
              <button
                onClick={() => handleRemoveSkill(index)}
                className="text-red-500 font-bold"
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>

      {isEditing && (
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-white font-medium text-[#C51800] border cursor-pointer border-[#C51800] rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-[#3A4C59] font-medium text-white cursor-pointer rounded-md"
          >
            Update
          </button>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#000000]/[0.43]">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[536px]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Add Skills</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 cursor-pointer hover:text-gray-800"
              >
                <FaTimes size={24} />
              </button>
            </div>

            <div className="relative mb-4">
              <FaSearch className="absolute left-3 top-3 text-[#C9C9C9]" />
              <input
                type="text"
                className="w-full pl-10 p-2 border border-gray-300 rounded-md outline-none"
                placeholder="Search here [ex: Product Design]"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
              />
            </div>

            <p className="text-[16px] text-[#3A4C59] opacity-75 mb-2 font-medium">
              Recommended skills based on your profile
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {recommendedSkills.map((skill, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectRecommendedSkill(skill)}
                  className="flex text-[#3A4C59] font-medium items-center gap-1 border border-[#8D9499] px-3 py-1 rounded-md hover:bg-gray-200"
                >
                  {skill} <FaPlus size={12} />
                </button>
              ))}
            </div>

            <div className="flex justify-between gap-2 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-white font-medium text-[16px] text-[#C51800] border cursor-pointer border-[#C51800] rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSkill}
                className="px-6 py-4 bg-[#3A4C59] font-medium text-[16px] text-white cursor-pointer rounded-md"
              >
                Add Skills
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentSkills;
