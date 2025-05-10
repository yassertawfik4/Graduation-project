import { useEffect, useState } from "react";
import { FaGraduationCap, FaPen } from "react-icons/fa";
import axiosInstance from "../../../Api/axiosInstance";
import Swal from "sweetalert2";

function StudentEducation({ data, handleGetProfile }) {
  const [isEditing, setIsEditing] = useState(false);
  const isCompany = localStorage.getItem("isCompany");
  const [educationData, setEducationData] = useState({
    University: "",
    Faculty: "",
    GraduationYear: "",
    EnrollmentYear: "",
    Role: "",
  });
  useEffect(() => {
    if (data && data.education) {
      setEducationData({
        University: data.education.university || "",
        Faculty: data.education.faculty || "",
        GraduationYear: data.education.graduationYear || "",
        EnrollmentYear: data.education.enrollmentYear || "",
        Role: data.education.role || "",
      });
    }
  }, [data]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEducationData({ ...educationData, [name]: value });
  };

  const handleSave = async () => {
    const payload = {
      University: educationData.University,
      Faculty: educationData.Faculty,
      GraduationYear: Number(educationData.GraduationYear),
      EnrollmentYear: Number(educationData.EnrollmentYear),
      Role: educationData.Role,
    };
    try {
      await axiosInstance.put("Student/profiles/Education", payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessUsertoken")}`,
        },
      });
      handleGetProfile();
      Swal.fire({
        icon: "success",
        title: "Updated",
        text: "Education data has been updated successfully",
        timer: 2000,
        timerProgressBar: true,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.response?.data?.message || "Something went wrong.",
      });
    }
    setIsEditing(false);
  };

  return (
    <div className="mt-6 bg-white border border-[#C9C9C9] rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Education</h2>
        {!isEditing && isCompany !== "Company" && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-transparent cursor-pointer font-bold text-[#8D9499] border border-[#C9C9C9] rounded-md hover:bg-gray-100"
          >
            <FaPen size={15} />
            Edit Education
          </button>
        )}
      </div>
      {isEditing ? (
        // وضع التحرير
        <div className="flex gap-6">
          {/* العمود الأول */}
          <div className="w-1/2 space-y-4">
            <div>
              <label className="block text-sm text-[#8D9499]">
                University Name
              </label>
              <input
                type="text"
                name="University"
                value={educationData.University}
                onChange={handleChange}
                className="text-[#3A4C59] font-semibold border border-gray-300 px-2 py-1 rounded-md w-full mt-1"
              />
            </div>

            <div>
              <label className="block text-sm text-[#8D9499]">Faculty</label>
              <input
                type="text"
                name="Faculty"
                value={educationData.Faculty}
                onChange={handleChange}
                className="text-[#3A4C59] font-semibold border border-gray-300 px-2 py-1 rounded-md w-full mt-1"
              />
            </div>
            <div className="relative w-full my-4">
              <FaGraduationCap className="absolute left-3 top-6 transform -translate-y-1/2 text-gray-500 text-xl" />
              <div className="relative">
                <select
                  name="GraduationYear"
                  value={educationData.GraduationYear}
                  onChange={handleChange}
                  className="w-full py-2 px-10 border font-semibold border-[#010318] opacity-80 rounded-lg mt-1"
                >
                  <option value="" disabled>
                    Select Graduation Year
                  </option>
                  {[...Array(50)].map((_, i) => {
                    const year = new Date().getFullYear() - i;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>

          {/* العمود الثاني */}
          <div className="w-1/2 space-y-4">
            <div className="relative w-full my-4">
              <FaGraduationCap className="absolute left-3 top-6 transform -translate-y-1/2 text-gray-500 text-xl" />
              <div className="relative">
                <select
                  name="EnrollmentYear"
                  value={educationData.EnrollmentYear}
                  onChange={handleChange}
                  className="w-full py-2 px-10 border font-semibold border-[#010318] opacity-80 rounded-lg mt-1"
                >
                  <option value="" disabled>
                    Select enrollmentYear Year
                  </option>
                  {[...Array(50)].map((_, i) => {
                    const year = new Date().getFullYear() - i;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#8D9499]">Role</label>
              <input
                type="text"
                name="Role"
                value={educationData.Role}
                onChange={handleChange}
                className="text-[#3A4C59] font-semibold border border-gray-300 px-2 py-1 rounded-md w-full mt-1"
              />
            </div>
          </div>
        </div>
      ) : (
        // وضع العرض
        <div className="flex gap-6 text-gray-700">
          <div>
            <p className="text-[#8D9499] font-semibold">University </p>
            <p className="text-[#3A4C59] font-semibold">
              {data?.education?.university}
            </p>
            <p className="text-[#8D9499] font-semibold">faculty</p>
            <p className="text-[#3A4C59] font-semibold">
              {data?.education?.faculty}
            </p>

            <p className="text-[#8D9499] font-semibold mt-4">Role</p>
            <p className="text-[#3A4C59] font-semibold">
              {data?.education?.role}
            </p>
          </div>

          <div>
            <p className="text-[#8D9499] font-semibold">EnrollmentYear</p>
            <p className="text-[#3A4C59] font-semibold">
              {data?.education?.enrollmentYear}
            </p>
            <p className="text-[#8D9499] font-semibold mt-4">Entry Year</p>
            <p className="text-[#3A4C59] font-semibold">
              {data?.education?.graduationYear}
            </p>
          </div>
        </div>
      )}

      {/* أزرار الحفظ والإلغاء */}
      {isEditing && (
        <div className="flex gap-2 mt-6">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-[#3A4C59] font-medium text-white cursor-pointer rounded-md"
          >
            Update
          </button>

          <button
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 bg-white font-medium text-[#C51800] border cursor-pointer border-[#C51800] rounded-md"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default StudentEducation;
