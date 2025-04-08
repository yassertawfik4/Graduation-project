import SideNav from "./sideNav/SideNav";

import StudentProfileHeader from "./studentPrfileComponents/StudentProfileHeader";
import StudentPersonalInformation from "./studentPrfileComponents/StudentPersonalInformation";
import StudentEducation from "./studentPrfileComponents/StudentEducation";
import StudentSkills from "./studentPrfileComponents/StudentSkills";
import StudentResume from "./studentPrfileComponents/studentResume";
import StudentExperiences from "./studentPrfileComponents/StudentExperiences";
import StudentProjects from "./studentPrfileComponents/StudentProjects";
function ProfileDetailes() {
  return (
    <div className="w-full flex">
      <SideNav />
      <div className="flex-1">
        <div className="container mx-auto px-2">
          <h2 className="my-10 font-bold text-[#010318] font-[roboto] text-4xl">
            My Profile
          </h2>

          {/* Profile Header */}
          <StudentProfileHeader />

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
