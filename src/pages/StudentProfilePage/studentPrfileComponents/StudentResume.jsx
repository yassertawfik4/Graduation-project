import { useState } from "react";
import {
  FaPen,
  FaTrash,
  FaUpload,
  FaEllipsisV,
  FaPlus,
  FaSave,
} from "react-icons/fa";
import axiosInstance from "../../../Api/axiosInstance";
import Swal from "sweetalert2";

function StudentResume({ data, handleGetProfile }) {
  const [isAdding, setIsAdding] = useState(false);
  const [newFile, setNewFile] = useState(null);
  const [resumeUrl, setResumeUrl] = useState([]); // ✅
  const isCompany = localStorage.getItem("isCompany");

  const handelAddResume = async () => {
    if (!newFile?.file) {
      Swal.fire("No file selected", "Please select a file first.", "warning");
      return;
    }

    const formData = new FormData();
    formData.append("file", newFile.file); // <-- مهم جداً أن يكون "file" وليس أي اسم آخر

    try {
      const response = await axiosInstance.post(
        "Student/upload-resume",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessUsertoken")}`,
          },
        }
      );
      handleGetProfile();
      Swal.fire("Success", "Resume uploaded successfully", "success");

      // لو الاستجابة ترجع الرابط أو البيانات المرفوعة
      setResumeUrl((prev) => [...prev, response.data]);
      setIsAdding(false);
      setNewFile(null);
    } catch (error) {
      Swal.fire("Error", "Failed to upload resume", "error");
      console.error(error);
    }
  };
  const handleDelete = (id) => {};

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileSize = (file.size / (1024 * 1024)).toFixed(1) + " MB";
      setNewFile({ file, name: file.name, size: fileSize });
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setNewFile(null);
  };

  return (
    <div className="mt-6 bg-white border border-[#C9C9C9] rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Your CV/Resume</h2>{" "}
        {!isAdding && isCompany !== "Company" && (
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
        {data && data.resumeUrl ? (
          <div className="flex flex-wrap gap-6">
            <div className="relative flex items-center justify-between bg-gray-100 p-4 rounded-lg w-full md:w-auto">
              <div className="flex items-center gap-3">
                <span className="text-lg">📄</span>
                <div>
                  <p className="font-medium">
                    {data.resumeUrl.split("/").pop()}
                  </p>
                  <a
                    href={data.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 underline"
                  >
                    View / Download
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No resume uploaded yet.</p>
        )}
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
              onClick={handelAddResume}
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
