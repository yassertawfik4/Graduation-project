import { useState } from "react";
import { FaPen } from "react-icons/fa";

function StudentProjects() {
  const [isEditing, setIsEditing] = useState(false);
  const [project, setProject] = useState({
    projectName: "Responsive Portfolio Website",
    projectLink: "#",
    description:
      "Developed a personal portfolio website to showcase my front-end development skills and projects. Utilized React, HTML5, CSS3 (with Sass preprocessor), and responsive design principles to create a visually appealing and user-friendly website that adapts seamlessly to different screen sizes.",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="mt-6 mb-6 bg-white border border-[#C9C9C9] rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-[#3A4C59]">Projects</h2>
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
          {/* Project Name */}
          <div>
            <label
              htmlFor="projectName"
              className="block text-sm font-medium text-[#3A4C59]"
            >
              Project Name
            </label>
            <input
              type="text"
              id="projectName"
              name="projectName"
              value={project.projectName}
              onChange={handleChange}
              className="border border-[#C9C9C9] p-2 rounded w-full mt-1 outline-none"
            />
          </div>

          {/* Project Link */}
          <div>
            <label
              htmlFor="projectLink"
              className="block text-sm font-medium text-[#3A4C59]"
            >
              Project Link
            </label>
            <input
              type="text"
              id="projectLink"
              name="projectLink"
              value={project.projectLink}
              onChange={handleChange}
              className="border border-[#C9C9C9] p-2 rounded w-full mt-1 outline-none"
            />
          </div>

          {/* Description */}
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
              value={project.description}
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
          <p className="font-semibold text-[#3A4C59] mb-3">
            {project.projectName}
          </p>

          <a href={project.projectLink} className="flex items-center space-x-1">
            <span>🔗</span>
            <span>Open Project</span>
          </a>

          <p className="text-[#3A4C59] font-medium mt-2">
            {project.description || "No description provided."}
          </p>
        </>
      )}
    </div>
  );
}

export default StudentProjects;
