import { useEffect, useState } from "react";
import LoggedInNavbar from "../LoggedInNavbar/LoggedInNavbar";
import LoggedOutNavbar from "../LoggedOutNavbar/LoggedOutNavbar";

function NavbarContainer() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
//   useEffect(() => {
//     const token = localStorage.getItem("accessTokenUser");
//     setIsLoggedIn(!!token);
//   }, []);
  return isLoggedIn ? <LoggedInNavbar /> : <LoggedOutNavbar />;
}

export default NavbarContainer;
