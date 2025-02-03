import { Link, NavLink } from "react-router-dom";
import SharedNavbar from "../SharedNavbar/SharedNavbar";

function LoggedOutNavbar() {
  return (
    <nav className=" sticky top-0">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Link className="font-bold text-3xl" to="/">
          StepUp
        </Link>

        <div className="flex items-center gap-2.5">
          <SharedNavbar />
          <NavLink
            to="/login"
            className="border border-[#3A4C59] font-medium py-2.5 px-6 rounded-lg"
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className="border transition ease-in-out duration-200 hover:bg-white hover:text-[#3A4C59] border-[#3A4C59] font-medium bg-[#3A4C59] text-white py-2 px-6 rounded-lg"
          >
            Sign up
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default LoggedOutNavbar;
