import { CiBookmark } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import { GoBell } from "react-icons/go";
import { IoPersonSharp } from "react-icons/io5";
import { LiaSitemapSolid } from "react-icons/lia";
import { NavLink } from "react-router-dom";

function SideNav() {
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
  return (
    <div className="flex w-[20%] h-screen flex-col justify-between border-e border-gray-100 bg-white">
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
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SideNav;
