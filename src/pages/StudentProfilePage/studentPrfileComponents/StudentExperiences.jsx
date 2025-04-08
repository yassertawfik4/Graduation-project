import { useState } from "react";
import { FaPen } from "react-icons/fa";

function StudentExperiences() {
  const [isEditing, setIsEditing] = useState(false);
  const [experience, setExperience] = useState({
    startDate: "2021-06-01", // Updated to match date input format (YYYY-MM-DD)
    endDate: "2025-04-01", // Updated to match date input format (YYYY-MM-DD)
    role: "Frontend Developer",
    companyName: "Talent",
    description:
      "Contributed to the development of a new e-commerce platform,Learned and applied best practices for front-end development, including code optimization techniques for performance,Collaborated with senior developers on implementing new product display features and fixing bugs related to responsive design on mobile devices",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setExperience((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="mt-6 bg-white border border-[#C9C9C9] rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-[#3A4C59]">Experiences</h2>{" "}
        {/* Updated text color */}
        {!isEditing && ( // Show the Edit button only when not in editing mode
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-transparent cursor-pointer font-bold text-[#8D9499] border border-[#C9C9C9] rounded-md hover:bg-gray-100"
          >
            <FaPen size={15} />
            Edit
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-3">
          {/* Flex container for start date, end date, role, and company name */}
          <div className="flex flex-wrap gap-4">
            {/* First row: startDate and endDate */}
            <div className="flex gap-4 w-full">
              <div className="w-1/2">
                <label
                  htmlFor="endDate"
                  className="block text-sm font-medium text-[#3A4C59]"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={experience.startDate}
                  onChange={handleChange}
                  className="border border-[#C9C9C9] p-2 rounded w-full mt-1 outline-none"
                />
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="endDate"
                  className="block text-sm font-medium text-[#3A4C59]"
                >
                  End Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={experience.endDate}
                  onChange={handleChange}
                  className="border border-[#C9C9C9] p-2 rounded w-full mt-1 outline-none"
                />
              </div>
            </div>

            <div className="flex gap-4 w-full">
              <div className="w-1/2">
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-[#3A4C59]"
                >
                  Role
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={experience.role}
                  onChange={handleChange}
                  className="border border-[#C9C9C9] p-2 rounded w-full mt-1 outline-none"
                />
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="companyName"
                  className="block text-sm font-medium text-[#3A4C59]"
                >
                  {" "}
                  {/* Updated text color */}
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={experience.companyName}
                  onChange={handleChange}
                  className="border border-[#C9C9C9] p-2 rounded w-full mt-1 outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-[#3A4C59]"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={experience.description}
              onChange={handleChange}
              className="border border-[#C9C9C9] p-2 rounded w-full mt-1 outline-none"
              rows="4"
            />
          </div>

          <button
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 bg-[#3A4C59] font-medium text-white cursor-pointer rounded-md"
          >
            Update
          </button>
        </div>
      ) : (
        <>
          <p className="text-[#3A4C59] font-semibold">
            {" "}
            {/* Updated text color */}
            {new Date(experience.startDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
            })}{" "}
            -{" "}
            {new Date(experience.endDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
            })}
          </p>
          <p className="font-semibold text-[#3A4C59]">{experience.role}</p>{" "}
          {/* Updated text color */}
          <p className="text-[#3A4C59]">{experience.companyName}</p>{" "}
          {/* Updated text color */}
          <p className="text-[#3A4C59] font-medium mt-2">
            {" "}
            {/* Updated text color and font weight */}
            {experience.description || "No description provided."}
          </p>
        </>
      )}
    </div>
  );
}

export default StudentExperiences;
