import { useState, useEffect } from "react";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa";
import PropTypes from "prop-types";
import axiosInstance from "../../../Api/axiosInstance";
import Swal from "sweetalert2";

function StudentProjects({ data }) {
  const [isEditing, setIsEditing] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const isCompany = localStorage.getItem("isCompany");
  const [currentProject, setCurrentProject] = useState({
    projectName: "",
    projectUrl: "",
    description: "",
  });
  const studentId = localStorage.getItem("studentId");

  // Initialize projects from props data when it's available
  useEffect(() => {
    if (data && data.projects && data.projects.length > 0) {
      setProjects(data.projects);
    }
  }, [data]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle adding/updating project
  const handleUpdateProject = async () => {
    try {
      setLoading(true);

      // Validate required fields
      if (!currentProject.projectName) {
        Swal.fire({
          icon: "warning",
          title: "Required Field Missing",
          text: "Project name is required",
          confirmButtonColor: "#3A4C59",
        });
        setLoading(false);
        return;
      }

      const projectData = {
        projectName: currentProject.projectName,
        description: currentProject.description || "",
        projectUrl: currentProject.projectUrl || "",
      };

      if (currentProject.id) {
        // Update existing project on the server
        await axiosInstance.put(
          `/Student/profiles/${studentId}/projects/${currentProject.id}`,
          projectData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                "accessUsertoken"
              )}`,
            },
          }
        );

        // Update local state
        setProjects((prev) =>
          prev.map((proj) =>
            proj.id === currentProject.id ? currentProject : proj
          )
        );

        Swal.fire({
          icon: "success",
          title: "Project Updated",
          text: "Your project has been updated successfully",
          timer: 2000,
          timerProgressBar: true,
          confirmButtonColor: "#3A4C59",
        });
      } else {
        // Add new project to the server
        const response = await axiosInstance.post(
          "Student/profiles/me/projects",
          projectData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                "accessUsertoken"
              )}`,
            },
          }
        );

        // Add to local state with the ID from the response
        const newProject = {
          ...currentProject,
          id: response.data.id || crypto.randomUUID(),
        };

        setProjects((prev) => [...prev, newProject]);

        Swal.fire({
          icon: "success",
          title: "Project Added",
          text: "Your new project has been added successfully",
          timer: 2000,
          timerProgressBar: true,
          confirmButtonColor: "#3A4C59",
        });
      }

      // Reset current project and exit editing mode
      setCurrentProject({
        projectName: "",
        projectUrl: "",
        description: "",
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving project:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to save project",
        confirmButtonColor: "#3A4C59",
      });
    } finally {
      setLoading(false);
    }
  };

  // Delete a project
  const handleDeleteProject = async (id, projectName) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Delete project "${projectName}"?`,
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
          await axiosInstance.delete(
            `Student/profiles/${localStorage.getItem(
              "studentId"
            )}/projects/${id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem(
                  "accessUsertoken"
                )}`,
              },
            }
          );

          // Remove from local state
          setProjects((prev) => prev.filter((proj) => proj.id !== id));

          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Your project has been deleted successfully.",
            timer: 2000,
            timerProgressBar: true,
            confirmButtonColor: "#3A4C59",
          });
        } catch (error) {
          console.error("Error deleting project:", error);
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: error.response?.data?.message || "Failed to delete project",
            confirmButtonColor: "#3A4C59",
          });
        } finally {
          setLoading(false);
        }
      }
    });
  };

  // Edit an existing project
  const handleEditProject = (project) => {
    setCurrentProject(project);
    setIsEditing(true);
  };

  // Add new project
  const handleAddNewProject = () => {
    setCurrentProject({
      projectName: "",
      projectUrl: "",
      description: "",
    });
    setIsEditing(true);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    Swal.fire({
      title: "Cancel Changes?",
      text: "Any unsaved changes will be lost",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3A4C59",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel",
      cancelButtonText: "Continue editing",
    }).then((result) => {
      if (result.isConfirmed) {
        setCurrentProject({
          projectName: "",
          projectUrl: "",
          description: "",
        });
        setIsEditing(false);

        Swal.fire({
          icon: "info",
          title: "Cancelled",
          text: "No changes have been saved.",
          timer: 1500,
          timerProgressBar: true,
          confirmButtonColor: "#3A4C59",
        });
      }
    });
  };

  return (
    <div className="mt-6 mb-6 bg-white border border-[#C9C9C9] rounded-lg p-6">
      <div className="flex justify-between items-center mb-4 pb-5">
        <h2 className="text-xl font-bold text-[#3A4C59]">Projects</h2>
        {!isEditing && isCompany !== "Company" && (
          <button
            onClick={handleAddNewProject}
            className="flex items-center gap-2 px-4 py-2 bg-transparent cursor-pointer font-bold text-[#8D9499] border border-[#C9C9C9] rounded-md hover:bg-gray-100"
            disabled={loading}
          >
            <FaPlus size={15} />
            Add New Project
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="font-medium text-[#3A4C59] mb-2">
            {currentProject.id ? "Edit Project" : "Add New Project"}
          </h3>

          {/* Project Name */}
          <div>
            <label
              htmlFor="projectName"
              className="block text-sm font-medium text-[#3A4C59]"
            >
              Project Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="projectName"
              name="projectName"
              value={currentProject.projectName}
              onChange={handleChange}
              className="border border-[#C9C9C9] p-2 rounded w-full mt-1 outline-none"
              required
            />
          </div>

          {/* Project Link */}
          <div>
            <label
              htmlFor="projectUrl"
              className="block text-sm font-medium text-[#3A4C59]"
            >
              Project Link
            </label>
            <input
              type="text"
              id="projectUrl"
              name="projectUrl"
              value={currentProject.projectUrl}
              onChange={handleChange}
              className="border border-[#C9C9C9] p-2 rounded w-full mt-1 outline-none"
              placeholder="https://example.com"
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
              value={currentProject.description}
              onChange={handleChange}
              className="border border-[#C9C9C9] p-2 rounded w-full mt-1 outline-none"
              rows="4"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleUpdateProject}
              className="px-4 py-2 bg-[#3A4C59] font-medium text-white cursor-pointer rounded-md"
              disabled={loading}
            >
              {loading ? "Saving..." : currentProject.id ? "Update" : "Add"}
            </button>
            <button
              onClick={handleCancelEdit}
              className="px-4 py-2 bg-gray-300 font-medium text-[#3A4C59] cursor-pointer rounded-md"
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          {projects.length > 0 ? (
            projects.map((proj, index) => (
              <div
                key={proj.id}
                className={`${
                  index > 0 ? "mt-6 pt-6 border-t border-gray-200" : ""
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-3">
                    <p className="font-semibold text-[#3A4C59] text-xl">
                      {proj.projectName}
                    </p>

                    {proj.projectUrl && (
                      <a
                        href={
                          proj.projectUrl.startsWith("http")
                            ? proj.projectUrl
                            : `https://${proj.projectUrl}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline inline-flex items-center space-x-1"
                      >
                        <span>🔗</span>
                        <span>Open Project</span>
                      </a>
                    )}

                    {proj.description && (
                      <p className="text-[#3A4C59] font-medium mt-2">
                        {proj.description}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditProject(proj)}
                      className="flex items-center gap-1 px-3 py-1 cursor-pointer text-[#3A4C59] bg-gray-100 hover:bg-gray-200 rounded-md"
                    >
                      <FaPen size={12} />
                      <span className="text-sm">Edit</span>
                    </button>
                    <button
                      onClick={() =>
                        handleDeleteProject(proj.id, proj.projectName)
                      }
                      className="flex items-center gap-1 px-3 py-1 cursor-pointer text-red-600 bg-gray-100 hover:bg-gray-200 rounded-md"
                      disabled={loading}
                    >
                      <FaTrash size={12} />
                      <span className="text-sm">Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-[#3A4C59] mb-4">No projects added yet.</p>
              {isCompany !== "Company" && (
                <button
                  onClick={handleAddNewProject}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#3A4C59] text-white rounded-md hover:bg-opacity-90"
                >
                  <FaPlus size={14} />
                  Add Your First Project
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

StudentProjects.propTypes = {
  data: PropTypes.shape({
    projects: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        projectName: PropTypes.string,
        description: PropTypes.string,
        projectUrl: PropTypes.string,
      })
    ),
  }),
};

export default StudentProjects;
