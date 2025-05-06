import SideNav from "./sideNav/SideNav";

import StudentProfileHeader from "./studentPrfileComponents/StudentProfileHeader";
import StudentPersonalInformation from "./studentPrfileComponents/StudentPersonalInformation";
import StudentEducation from "./studentPrfileComponents/StudentEducation";
import StudentSkills from "./studentPrfileComponents/StudentSkills";
import StudentResume from "./studentPrfileComponents/studentResume";
import StudentExperiences from "./studentPrfileComponents/StudentExperiences";
import StudentProjects from "./studentPrfileComponents/StudentProjects";
import { useEffect, useState } from "react";
import axiosInstance from "../../Api/axiosInstance";
function ProfileDetailes() {
  const [myProfile, setMyProfile] = useState({});
  const studentid = localStorage.getItem("studentId");

  const handleGetProfile = async () => {
    try {
      const response = await axiosInstance.get(
        `Student/profiles/${studentid}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessUsertoken")}`,
          },
        }
      );
      console.log(response.data);
      setMyProfile(response.data);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  };
  useEffect(() => {
    handleGetProfile();
  }, []);
  return (
    <div className="w-full flex">
      <SideNav />
      <div className="flex-1">
        <div className="container mx-auto px-2">
          <h2 className="my-10 font-bold text-[#010318] font-[roboto] text-4xl">
            My Profile
          </h2>

          {/* Profile Header */}
          <StudentProfileHeader data={myProfile} />

          {/* Personal Information */}
          <StudentPersonalInformation data={myProfile} />

          {/* Education */}
          <StudentEducation data={myProfile} />

          {/* Skills */}
          <StudentSkills data={myProfile} />

          {/* CV/Resume Section */}
          <StudentResume />

          {/* Experiences Section */}
          <StudentExperiences data={myProfile} />

          {/* Projects Section */}
          <StudentProjects data={myProfile} />
        </div>
      </div>
    </div>
  );
}

export default ProfileDetailes;
