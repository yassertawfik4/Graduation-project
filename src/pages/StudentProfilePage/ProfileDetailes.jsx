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
  const [myProfile, setMyProfile] = useState([]);
  const handleGetProfile = async () => {
    try {
      const response = await axiosInstance.get(`Student/profiles/basic/me`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwMTk2M2FiYy0yNDljLTdhYmUtODAwYi1lZmEyOGUzZjVlNDAiLCJlbWFpbCI6Inlhc3NlcnRpdG82ODJAZ21haWwuY29tIiwibmFtZSI6Inlhenp6IiwianRpIjoiOWViNmVhOTQtNWNiZC00ZjljLWFiMjYtMDk1NGIxZTIzMTI2IiwiYXVkIjpbIlN3YWdnZXJVSSIsIlN3YWdnZXJVSSJdLCJuYmYiOjE3NDQ3NDIyNTYsImV4cCI6MTc0NTM0NzA1NiwiaWF0IjoxNzQ0NzQyMjU2LCJpc3MiOiJJbnRlcm5zaGlwLVBsYXRmb3JtIn0.NWzMLbQ6a8uULZcl2y3XpHfgZmOy5X9nUUFcYSzjv5Y`,
        },
      });
      console.log(response);
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
          <StudentPersonalInformation />

          {/* Education */}
          <StudentEducation />

          {/* Skills */}
          <StudentSkills />

          {/* CV/Resume Section */}
          <StudentResume />

          {/* Experiences Section */}
          <StudentExperiences />

          {/* Projects Section */}
          <StudentProjects />
        </div>
      </div>
    </div>
  );
}

export default ProfileDetailes;
