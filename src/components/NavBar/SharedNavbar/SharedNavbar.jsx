import { NavLink } from "react-router-dom";

function SharedNavbar() {
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
  return (
    <ul className="flex gap-2">
      {links.map((link, index) => (
        <li key={index}>
          <NavLink
            to={link.path}
            className={({ isActive }) =>
              `text-[16px] py-2 px-4 rounded-lg font-medium transition ease-in-out duration-200 hover:bg-[#3A4C59] hover:text-[#F3F3F3]  hover:rounded-lg ${
                isActive
                  ? "border border-[#3A4C59] bg-[#3A4C59] text-[#F3F3F3]   "
                  : "text-black"
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
