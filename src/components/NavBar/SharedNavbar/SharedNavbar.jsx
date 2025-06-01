import { NavLink } from "react-router-dom";

function SharedNavbar() {
  const isCompany = localStorage.getItem("isCompany");
  const links = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "Roadmaps",
      path: "/Roadmaps",
    },
    {
      label: "Bookmarks",
      path: "/Bookmarks",
    },
    {
      label: "Alerts",
      path: "/Alerts",
    },
  ];
  const linksCompany = [
    {
      label: "Overview",
      path: "/Overview",
    },
    {
      label: "Post",
      path: "/Post",
    },

    {
      label: "Alerts",
      path: "/Alerts",
    },
  ];
  return (
    <ul className="flex lg:flex-row flex-col gap-5 lg:gap-2">
      {isCompany
        ? linksCompany.map((link, index) => (
            <li
              key={index}
              className={`w-full text-center cursor-pointer transition ease-in-out duration-200 ${
                link.isActive ? "bg-[#095544]" : ""
              }`}
            >
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `text-[16px] w-full block py-2 px-4 rounded-lg font-medium transition ease-in-out duration-200 ${
                    isActive
                      ? "bg-[#095544] text-[#F3F3F3]"
                      : "text-black hover:bg-[#095544] hover:text-[#F3F3F3]"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))
        : links.map((link, index) => (
            <li
              key={index}
              className={`w-full text-center cursor-pointer transition ease-in-out duration-200 ${
                link.isActive ? "bg-[#3A4C59]" : ""
              }`}
            >
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `text-[16px] w-full block py-2 px-4 rounded-lg font-medium transition ease-in-out duration-200 ${
                    isActive
                      ? "bg-[#095544] text-[#F3F3F3]"
                      : "text-black hover:bg-[#095544] hover:text-[#F3F3F3]"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
    </ul>
  );
}

export default SharedNavbar;
