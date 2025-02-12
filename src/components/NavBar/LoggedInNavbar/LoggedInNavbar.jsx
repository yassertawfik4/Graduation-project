import SharedNavbar from "../SharedNavbar/SharedNavbar";
import { Link, NavLink } from "react-router-dom";
import { IoPersonOutline } from "react-icons/io5";

function LoggedInNavbar() {

  return (
    <nav className=" sticky top-0">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Link className="font-bold text-3xl" to="/">
          StepUp
        </Link>
        <div className="flex items-center gap-2.5">
          <SharedNavbar />
          <NavLink to="/profile">
            <IoPersonOutline className=" text-3xl" />
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default LoggedInNavbar;
