import { CiBookmark, CiCreditCard1, CiSettings } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import { GoBell } from "react-icons/go";
import { IoPersonSharp } from "react-icons/io5";
import { LiaSitemapSolid } from "react-icons/lia";
import { TbDoorEnter } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import useWindowSize from "../../../hooks/useWindowSize"; // استورد الـ custom hook

function SideNav() {
  const { width } = useWindowSize(); // احصل على عرض النافذة
  const isMobile = width < 850; // تحقق إذا كان العرض أقل من 768px

  const links = [
    {
      label: "Home",
      path: "/",
      icon: <FaHome size={18} />,
    },
    {
      label: "Roadmaps",
      path: "/Roadmaps",
      icon: <LiaSitemapSolid size={18} />,
    },
    {
      label: "Bookmarks",
      path: "/Bookmarks",
      icon: <CiBookmark size={18} />,
    },
    {
      label: "Alerts",
      path: "/Alerts",
      icon: <GoBell size={18} />,
    },
    {
      label: "Profile",
      path: "/studentProdile",
      icon: <IoPersonSharp size={18} />,
    },
  ];
  const otherLinks = [
    {
      label: "Payment",
      path: "/Payment",
      icon: <CiCreditCard1 size={18} />,
    },
    {
      label: "Settings",
      path: "/Settings",
      icon: <CiSettings size={18} />,
    },
    {
      label: "Log-out",
      path: "/Log-out",
      icon: <TbDoorEnter size={18} />,
    },
  ];
  return (
    <div className="flex w-[15%] h-screen flex-col justify-between border-e border-gray-100 bg-white sticky top-0">
      <div className="px-4 py-6">
        <span className="grid h-10 w-full place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
          Logo
        </span>

        <ul className="mt-6 space-y-1">
          {links.map((link, index) => (
            <li key={index} className="">
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `py-2 text-sm flex items-center px-2 gap-2 font-medium ${
                    isActive
                      ? "text-[#3A4C59] bg-[rgba(58,76,89,0.19)] border-l-3 "
                      : "text-gray-700"
                  }`
                }
              >
                <span>{link.icon}</span>
                {!isMobile && <span>{link.label}</span>}{" "}
                {/* إخفاء النص إذا كان mobile */}
              </NavLink>
            </li>
          ))}
        </ul>
        <h2 className="text-sm py-5 text-[#767F8C] opacity-55 ms-5">other</h2>
        <ul className=" space-y-1">
          {otherLinks.map((link, index) => (
            <li key={index} className="">
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `py-2 text-sm flex items-center px-2 gap-2 font-medium ${
                    isActive
                      ? "text-[#3A4C59] bg-[rgba(58,76,89,0.19)] border-l-3 "
                      : "text-gray-700"
                  }`
                }
              >
                <span>{link.icon}</span>
                {!isMobile && <span>{link.label}</span>}{" "}
                {/* إخفاء النص إذا كان mobile */}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SideNav;
