import { useState, useEffect } from "react";
import { FaPen } from "react-icons/fa";
import PropTypes from "prop-types";
import axiosInstance from "../../../Api/axiosInstance";
import Swal from "sweetalert2";

function StudentPersonalInformation({ data }) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    fullName: "",
    phoneNumber: "",
    gender: "",
    university: "",
    faculty: "",
    graduationYear: "",
    enrollmentYear: "",
    email: "",
    age: "",
    bio: "",
  });

  // Initialize userData when data prop changes
  useEffect(() => {
    if (data && data.basicInfo) {
      setUserData({
        fullName: data.basicInfo.fullName || "",
        phoneNumber: data.basicInfo.phoneNumber || "",
        gender: data.basicInfo.gender || "Male",
        university: data.basicInfo.university || "",
        faculty: data.basicInfo.faculty || "",
        graduationYear: data.basicInfo.graduationYear || "",
        enrollmentYear: data.basicInfo.enrollmentYear || "",
        email: data.basicInfo.email || "",
        age: data.basicInfo.age || "",
        bio: data.basicInfo.bio || "",
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      // Validate required fields
      if (!userData.fullName) {
        Swal.fire({
          icon: "warning",
          title: "Required Field Missing",
          text: "Full name is required",
          confirmButtonColor: "#3A4C59",
        });
        setLoading(false);
        return;
      }

      // Prepare data to send to the API
      const dataToUpdate = {
        fullName: userData.fullName,
        university: userData.university,
        faculty: userData.faculty,
        graduationYear: parseInt(userData.graduationYear) || null,
        enrollmentYear: parseInt(userData.enrollmentYear) || null,
        age: parseInt(userData.age) || null,
        bio: userData.bio,
        gender: userData.gender,
      };

      // Send update request to the API
      await axiosInstance.put("Student/profiles/me", dataToUpdate, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessUsertoken")}`,
        },
      });

      // Show success message
      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your personal information has been updated successfully",
        timer: 2000,
        timerProgressBar: true,
        confirmButtonColor: "#3A4C59",
      });

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.response?.data?.message || "Failed to update your profile",
        confirmButtonColor: "#3A4C59",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 bg-white border border-[#C9C9C9] rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-[#3A4C59]">
          Personal Information
        </h3>

        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-transparent cursor-pointer font-bold text-[#8D9499] border border-[#C9C9C9] rounded-md hover:bg-gray-100"
            disabled={loading}
          >
            <FaPen size={15} />
            Edit Information
          </button>
        )}
      </div>

      {isEditing ? (
        <div>
          <div className="flex gap-6">
            {/* First Column */}
            <div className="w-1/2 space-y-4">
              <div>
                <label className="block text-sm text-[#8D9499]">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={userData.fullName}
                  onChange={handleChange}
                  className="text-[#3A4C59] font-semibold border border-gray-300 px-2 py-1 rounded-md w-full mt-1"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-[#8D9499]">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={userData.phoneNumber}
                  onChange={handleChange}
                  className="text-[#3A4C59] font-semibold border border-gray-300 px-2 py-1 rounded-md w-full mt-1"
                />
              </div>

              <div>
                <label className="block text-sm text-[#8D9499]">Gender</label>
                <select
                  name="gender"
                  value={userData.gender}
                  onChange={handleChange}
                  className="text-[#3A4C59] font-semibold border border-gray-300 px-2 py-1 rounded-md w-full mt-1"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-[#8D9499]">Age</label>
                <input
                  type="number"
                  name="age"
                  value={userData.age}
                  onChange={handleChange}
                  className="text-[#3A4C59] font-semibold border border-gray-300 px-2 py-1 rounded-md w-full mt-1"
                />
              </div>
            </div>

            {/* Second Column */}
            <div className="w-1/2 space-y-4">
              <div>
                <label className="block text-sm text-[#8D9499]">
                  University
                </label>
                <input
                  type="text"
                  name="university"
                  value={userData.university}
                  onChange={handleChange}
                  className="text-[#3A4C59] font-semibold border border-gray-300 px-2 py-1 rounded-md w-full mt-1"
                />
              </div>

              <div>
                <label className="block text-sm text-[#8D9499]">Faculty</label>
                <input
                  type="text"
                  name="faculty"
                  value={userData.faculty}
                  onChange={handleChange}
                  className="text-[#3A4C59] font-semibold border border-gray-300 px-2 py-1 rounded-md w-full mt-1"
                />
              </div>

              <div>
                <label className="block text-sm text-[#8D9499]">
                  Enrollment Year
                </label>
                <input
                  type="number"
                  name="enrollmentYear"
                  value={userData.enrollmentYear}
                  onChange={handleChange}
                  className="text-[#3A4C59] font-semibold border border-gray-300 px-2 py-1 rounded-md w-full mt-1"
                />
              </div>

              <div>
                <label className="block text-sm text-[#8D9499]">
                  Graduation Year
                </label>
                <input
                  type="number"
                  name="graduationYear"
                  value={userData.graduationYear}
                  onChange={handleChange}
                  className="text-[#3A4C59] font-semibold border border-gray-300 px-2 py-1 rounded-md w-full mt-1"
                />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm text-[#8D9499]">Bio</label>
            <textarea
              name="bio"
              value={userData.bio}
              onChange={handleChange}
              rows="4"
              className="text-[#3A4C59] font-semibold border border-gray-300 px-2 py-1 rounded-md w-full mt-1"
            />
          </div>

          {/* Save and Cancel buttons */}
          <div className="flex gap-2 mt-6">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-[#3A4C59] font-medium text-white cursor-pointer rounded-md"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </button>

            <button
              onClick={() => {
                setIsEditing(false);
                // Reset to original data
                if (data && data.basicInfo) {
                  setUserData({
                    fullName: data.basicInfo.fullName || "",
                    phoneNumber: data.basicInfo.phoneNumber || "",
                    gender: data.basicInfo.gender || "Male",
                    university: data.basicInfo.university || "",
                    faculty: data.basicInfo.faculty || "",
                    graduationYear: data.basicInfo.graduationYear || "",
                    enrollmentYear: data.basicInfo.enrollmentYear || "",
                    email: data.basicInfo.email || "",
                    age: data.basicInfo.age || "",
                    bio: data.basicInfo.bio || "",
                  });
                }

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
          </div>
        </div>
      ) : (
        <div className="flex gap-6 text-gray-700">
          {/* First Column */}
          <div className="w-1/2">
            <p className="text-[#8D9499] font-semibold">Full Name</p>
            <p className="text-[#3A4C59] font-semibold mb-4">
              {data?.basicInfo?.fullName || "Not provided"}
            </p>

            <p className="text-[#8D9499] font-semibold">Phone Number</p>
            <p className="text-[#3A4C59] font-semibold mb-4">
              {data?.basicInfo?.phoneNumber || "Not provided"}
            </p>

            <p className="text-[#8D9499] font-semibold">Gender</p>
            <p className="text-[#3A4C59] font-semibold mb-4">
              {data?.basicInfo?.gender || "Not provided"}
            </p>

            <p className="text-[#8D9499] font-semibold">Age</p>
            <p className="text-[#3A4C59] font-semibold">
              {data?.basicInfo?.age || "Not provided"}
            </p>
          </div>

          {/* Second Column */}
          <div className="w-1/2">
            <p className="text-[#8D9499] font-semibold">University</p>
            <p className="text-[#3A4C59] font-semibold mb-4">
              {data?.basicInfo?.university || "Not provided"}
            </p>

            <p className="text-[#8D9499] font-semibold">Faculty</p>
            <p className="text-[#3A4C59] font-semibold mb-4">
              {data?.basicInfo?.faculty || "Not provided"}
            </p>

            <p className="text-[#8D9499] font-semibold">Enrollment Year</p>
            <p className="text-[#3A4C59] font-semibold mb-4">
              {data?.basicInfo?.enrollmentYear || "Not provided"}
            </p>

            <p className="text-[#8D9499] font-semibold">Graduation Year</p>
            <p className="text-[#3A4C59] font-semibold">
              {data?.basicInfo?.graduationYear || "Not provided"}
            </p>
          </div>
        </div>
      )}

      {!isEditing && data?.basicInfo?.bio && (
        <div className="mt-6">
          <p className="text-[#8D9499] font-semibold">Bio</p>
          <p className="text-[#3A4C59] font-medium mt-2">
            {data.basicInfo.bio}
          </p>
        </div>
      )}
    </div>
  );
}

StudentPersonalInformation.propTypes = {
  data: PropTypes.shape({
    basicInfo: PropTypes.shape({
      fullName: PropTypes.string,
      phoneNumber: PropTypes.string,
      gender: PropTypes.string,
      university: PropTypes.string,
      faculty: PropTypes.string,
      graduationYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      enrollmentYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      email: PropTypes.string,
      age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      bio: PropTypes.string,
    }),
  }),
};

export default StudentPersonalInformation;
