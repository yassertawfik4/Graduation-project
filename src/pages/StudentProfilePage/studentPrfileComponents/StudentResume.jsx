import { useState } from "react";
import {
  FaPen,
  FaTrash,
  FaUpload,
  FaEllipsisV,
  FaPlus,
  FaSave,
  FaTimes,
} from "react-icons/fa";

function StudentResume() {
  const [resumes, setResumes] = useState([
    { name: "Front-End Developer.pdf", size: "1.3 MB" },
    { name: "Product Designer.pdf", size: "4.7 MB" },
  ]);
  const [menuIndex, setMenuIndex] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newFileName, setNewFileName] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [newFile, setNewFile] = useState(null);

  const handleDelete = (index) => {
    setResumes(resumes.filter((_, i) => i !== index));
    setMenuIndex(null);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileSize = (file.size / (1024 * 1024)).toFixed(1) + " MB";
      setNewFile({ file, name: file.name, size: fileSize });
    }
  };

  const handleSaveNew = () => {
    if (newFile) {
      setResumes([...resumes, { name: newFile.name, size: newFile.size }]);
    }
    setNewFile(null);
    setIsAdding(false);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setNewFile(null);
  };

  const handleSaveEdit = (index) => {
    const newResumes = [...resumes];
    newResumes[index].name = newFileName || newResumes[index].name;
    setResumes(newResumes);
    setEditingIndex(null);
    setMenuIndex(null);
    setNewFileName("");
  };

  return (
    <div className="mt-6 bg-white border border-[#C9C9C9] rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Your CV/Resume</h2>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-4 py-2 bg-transparent cursor-pointer font-bold text-[#8D9499] border border-[#C9C9C9] rounded-md hover:bg-gray-100"
          >
            <FaPlus size={16} />
            Add
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-6">
        {resumes.map((resume, index) => (
          <div
            key={index}
            className="relative flex items-center justify-between bg-gray-100 p-4 rounded-lg w-full md:w-auto"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">📄</span>
              <div>
                {editingIndex === index ? (
                  <input
                    type="text"
                    className="border p-1 rounded-md"
                    defaultValue={resume.name}
                    onChange={(e) => setNewFileName(e.target.value)}
                  />
                ) : (
                  <>
                    <p className="font-medium">{resume.name}</p>
                    <p className="text-sm text-gray-500">{resume.size}</p>
                  </>
                )}
              </div>
            </div>

            <div className="relative">
              <button
                onClick={() => setMenuIndex(menuIndex === index ? null : index)}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <FaEllipsisV size={18} />
              </button>

              {menuIndex === index && (
                <div className="absolute right-0 mt-2 w-32 bg-white shadow-md rounded-md p-2 z-10">
                  {editingIndex === index ? (
                    <button
                      onClick={() => handleSaveEdit(index)}
                      className="block w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-100"
                    >
                      <FaSave className="inline mr-2" /> Save
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => setEditingIndex(index)}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        <FaPen className="inline mr-2" /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                      >
                        <FaTrash className="inline mr-2" /> Delete
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {isAdding && (
        <div className="mt-6">
          <div className="border border-dashed border-gray-400 rounded-lg p-4 text-center cursor-pointer">
            <label className="flex flex-col items-center cursor-pointer">
              <FaUpload size={24} className="text-gray-500 mb-2" />
              <span className="font-medium text-gray-600">Upload New CV</span>
              <span className="text-sm text-gray-400">
                Only PDF files allowed
              </span>
              <input
                type="file"
                onChange={handleFileSelect}
                className="hidden"
                accept=".pdf"
              />
            </label>
          </div>

          {newFile && (
            <div className="mt-4 bg-gray-100 p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <span>📄</span>
                <div>
                  <p className="font-medium">{newFile.name}</p>
                  <p className="text-sm text-gray-500">{newFile.size}</p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-white font-medium text-[#C51800] border cursor-pointer border-[#C51800] rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveNew}
              className="px-4 py-2 bg-[#3A4C59] font-medium text-white cursor-pointer rounded-md"
            >
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentResume;
