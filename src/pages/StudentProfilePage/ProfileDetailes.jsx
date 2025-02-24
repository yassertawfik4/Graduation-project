import React from "react";
import SideNav from "./sideNav/SideNav";

function ProfileDetailes() {
  return (
    <div className="w-full flex">
      <SideNav />
      <div className="">
        <div className="container mx-auto px-2">
          <h2 className="my-10 font-bold text-[#010318] font-[roboto] text-4xl">
            My Profile
          </h2>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetailes;
