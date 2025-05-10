import { CiCamera } from "react-icons/ci";
import studentprofile from "/public/images/studentprofile.png";
import { FaGraduationCap, FaPen } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import axiosInstance from "../../../Api/axiosInstance";
import Swal from "sweetalert2";

function StudentProfileHeader({ data, handleGetProfile }) {
  const [isEditing, setIsEditing] = useState(false);
  const isCompany = localStorage.getItem("isCompany");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    fullName: "",
    university: "",
    faculty: "",
    graduationYear: 0,
    enrollmentYear: 0,
    age: 0,
    bio: "",
    gender: "",
    Role: "",
  });

  // Initialize userData when data prop changes
  useEffect(() => {
    if (data && data.basicInfo && data.education) {
      setUserData({
        fullName: data.basicInfo.fullName || "",
        jobTitle: data.basicInfo.jobTitle || "",
        bio: data.bio || "",
        university: data.education.university || "",
        faculty: data.education.faculty || "",
        graduationYear: data.education.graduationYear || "",
        enrollmentYear: data.education.enrollmentYear || "",
        age: data.basicInfo.age || "",
        gender: data.basicInfo.gender || "",
        Role: data.education.role || "",
      });
    }
  }, [data]);

  const [profileImage, setProfileImage] = useState(studentprofile);
  const fileInputRef = useRef(null);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSave = async () => {
    try {
      setLoading(true);

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

      const payload = {
        fullName: userData.fullName,
        university: userData.university,
        faculty: userData.faculty,
        graduationYear: Number(userData.graduationYear),
        enrollmentYear: Number(userData.enrollmentYear),
        age: Number(userData.age),
        bio: userData.bio,
        gender: userData.gender,
      };

      await axiosInstance.put("Student/profiles/info", payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessUsertoken")}`,
        },
      });
      await axiosInstance.put(
        "Student/profiles/bio",
        {
          bio: userData.bio,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessUsertoken")}`,
          },
        }
      );
      await axiosInstance.put(
        "Student/profiles/Education",
        {
          university: userData.university,
          faculty: userData.faculty,
          graduationYear: Number(userData.graduationYear),
          enrollmentYear: Number(userData.enrollmentYear),
          Role: userData.Role,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessUsertoken")}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile has been updated successfully",
        timer: 2000,
        timerProgressBar: true,
        confirmButtonColor: "#3A4C59",
      });

      setIsEditing(false);
      handleGetProfile();
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="relative">
        <div className="h-[254px] relative bg-gradient-to-r from-[#C5C5C7] via-[#F3F3F3] to-[#8C8B8E]/81 rounded-tl-[70px]"></div>

        {isEditing ? (
          <div>
            <div className="flex items-center justify-between">
              <div
                className="w-[160px] h-[160px] relative bottom-10 rounded-full border-4 border-white shadow-lg overflow-hidden cursor-pointer"
                onClick={handleImageClick}
              >
                <img
                  src={studentprofile}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                {/* Camera icon inside the image */}
                <div className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md">
                  <CiCamera size={20} className="text-gray-600" />
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="flex items-center justify-center gap-2 px-8 py-1 bg-[#3A4C59] border-2 border-[#3A4C59] text-white transition-all duration-300 ease-in-out cursor-pointer font-semibold rounded-md hover:bg-white hover:text-[#3A4C59]"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update"}
                </button>

                <button
                  onClick={() => {
                    setIsEditing(false);
                    // Reset to original data
                  }}
                  className="flex items-center justify-center gap-2 px-8 py-1 border border-[#C51800] rounded-md  text-[#C51800] font-semibold cursor-pointer"
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-6">
              <div className="pr-4 border p-3 rounded-2xl border-[#C9C9C9]">
                <div className="space-y-2">
                  <div>
                    <label className="block text-[17px] text-gray-600 font-bold mb-3">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={userData.fullName}
                      onChange={handleOnChange}
                      className="text-[#3A4C59] font-bold border outline-none border-[#C9C9C9] px-2 py-2 rounded-sm w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[17px] text-gray-600 font-bold mb-3">
                      Role <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="Role"
                      value={userData.Role}
                      onChange={handleOnChange}
                      className="text-[#3A4C59] font-bold border outline-none border-[#C9C9C9] px-2 py-2 rounded-sm w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[17px] text-gray-600 font-bold mb-3">
                      university <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="university"
                      value={userData.university}
                      onChange={handleOnChange}
                      className="text-[#3A4C59] font-bold border outline-none border-[#C9C9C9] px-2 py-2 rounded-sm w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[17px] text-gray-600 font-bold mb-3">
                      faculty <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="faculty"
                      value={userData.faculty}
                      onChange={handleOnChange}
                      className="text-[#3A4C59] font-bold border outline-none border-[#C9C9C9] px-2 py-2 rounded-sm w-full"
                      required
                    />
                  </div>
                  <div className="relative w-full my-4">
                    <FaGraduationCap className="absolute left-3 top-6 transform -translate-y-1/2 text-gray-500 text-xl" />
                    <div className="relative">
                      <select
                        name="graduationYear"
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
                  <div className="relative w-full my-4">
                    <FaGraduationCap className="absolute left-3 top-6 transform -translate-y-1/2 text-gray-500 text-xl" />
                    <div className="relative">
                      <select
                        name="enrollmentYear"
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
                    <label className="block text-[17px] text-gray-600 font-bold mb-3">
                      age <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={userData.age}
                      onChange={handleOnChange}
                      className="text-[#3A4C59] font-bold border outline-none border-[#C9C9C9] px-2 py-2 rounded-sm w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[17px] text-gray-600 font-bold mb-3">
                      gender <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="gender"
                      value={userData.gender}
                      onChange={handleOnChange}
                      className="text-[#3A4C59] font-bold border outline-none border-[#C9C9C9] px-2 py-2 rounded-sm w-full"
                      required
                    >
                      <option value="" disabled>
                        Select gender
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            {/* Image */}
            <div
              className="w-[160px] h-[160px] relative bottom-10 rounded-full border-4 border-white shadow-lg overflow-hidden flex-shrink-0 cursor-pointer"
              onClick={handleImageClick}
            >
              <img
                src={
                  studentprofile || studentprofile // ← ضع هنا مسار الصورة البديلة
                }
                alt="Profile"
                className="w-[160px] h-[160px] rounded-full object-cover"
              />
              {/* Camera icon inside the image */}
              {isCompany !== "Company" && (
                <>
                  <div className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-md">
                    <CiCamera size={20} className="text-gray-600" />
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </>
              )}
            </div>

            <div className="flex flex-grow justify-between  ml-6">
              <div className="flex flex-col gap-2 flex-grow">
                <h2 className="text-3xl font-bold font-[roboto]">
                  {data?.basicInfo?.fullName}
                </h2>
                <p className="text-[#3A4C59] font-medium text-lg leading-6 pb-3">
                  {data?.education?.role}
                </p>
              </div>
              {isCompany !== "Company" && (
                <div className="flex-shrink-0 mt-3">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-transparent cursor-pointer font-bold text-[#8D9499] border border-[#C9C9C9] rounded-md hover:bg-gray-100"
                  >
                    <FaPen size={15} />
                    Edit Profile
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
        <div>
          {isEditing ? (
            <div>
              <label className="block text-[22px] text-[#000000] font-bold my-3">
                About
              </label>
              <textarea
                name="bio"
                value={userData.bio}
                onChange={handleOnChange}
                placeholder="Write something about you"
                className="text-[#3A4C59] font-medium text-[16px] leading-7 border h-[162px] outline-none border-[#C9C9C9] px-2 py-1 rounded-md w-full"
              />
            </div>
          ) : (
            <div className=" rounded-xl w-full px-2 py-1">
              <h2 className="block text-[22px] font-[roboto] text-[#000000] font-bold my-3 ">
                About
              </h2>
              <p className="text-[#3A4C59] font-medium text-sm leading-6 pb-3">
                {data?.bio || userData.bio || "No bio provided yet."}
              </p>
            </div>
          )}
          {isEditing && (
            <div className="flex justify-end my-3">
              <button
                onClick={handleSave}
                className="bg-[#3A4C59] text-white py-3 px-6 rounded-lg cursor-pointer font-[roboto]"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

StudentProfileHeader.propTypes = {
  data: PropTypes.shape({
    basicInfo: PropTypes.shape({
      fullName: PropTypes.string,
      jobTitle: PropTypes.string,
      bio: PropTypes.string,
    }),
  }),
};

export default StudentProfileHeader;
