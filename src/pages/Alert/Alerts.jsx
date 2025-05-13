import React from "react";
import { BsBell } from "react-icons/bs";
import { HiMiniXMark } from "react-icons/hi2";

function Alerts() {
  return (
    <div className="my-10 h-screen">
      <div className="container mx-auto px-3">
        <h2 className="text-[32px] font-normal text-[#021B1A]">Alerts</h2>
        <div className="my-10">
          <div className="flex items-center gap-3 shadow-lg p-4 rounded-lg border-l-7 border-[#095544] justify-between">
            <div className="flex items-center gap-3">
              <div className=" rounded-full bg-[#FEEDE8] p-4">
                <BsBell className="text-[#FF0000]" size={24} />
              </div>
              <div>
                <h3>Internship Alerts</h3>
                <p>
                  {" "}
                  You now have 5 internship alerts! Check them out to explore
                  new opportunities.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-[#707D7D] text-sm">10:00 AM</p>
              <button className=" px-4 py-2 rounded-lg">
                <HiMiniXMark className="text-[#707D7D]" size={28} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Alerts;
