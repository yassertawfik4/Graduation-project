import {
  FaFacebook,
  FaGoogle,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  const soicalIcons = [
    {
      label: <FaFacebook />,
      link: "#",
    },

    {
      label: <FaInstagram />,
      link: "#",
    },
    {
      label: <FaTwitter />,
      link: "#",
    },
    {
      label: <FaGoogle />,
      link: "#",
    },
    {
      label: <FaYoutube />,
      link: "#",
    },
  ];
  return (
    <footer className="bg-[#010318]">
      <div className="container mx-auto">
        <div className="grid grid-cols-4 gap-20 py-10 ">
          <div>
            <h3 className="text-[#F3F3F3] font-[rubik] font-bold text-[28px] ">
              Step<span className="text-[#3A4C59]">Up</span>
            </h3>
            <div className="flex justify-between items-center mt-4">
              {soicalIcons.map((icon, index) => (
                <Link
                  to={icon.link}
                  target="_blank"
                  className="text-[28px] w-[32px] h-[32px] text-[#FFFFFF]"
                  key={index}
                >
                  {icon.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="text-[#F3F3F3]">
            <h3 className=" font-[rubik] font-bold text-[28px]">platform</h3>
            <ul className="list-disc text-[20px] font-bold flex flex-col gap-4 ms-8 mt-3">
              <li>For companies</li>
              <li>For Students</li>
              <li>
                How Step<span className="text-[#3A4C59] ">Up</span> works?{" "}
              </li>
            </ul>
          </div>
          <div className="text-[#F3F3F3]">
            <h3 className=" font-[rubik] font-bold text-[28px]">Explore</h3>
            <ul className=" text-[20px] font-bold flex flex-col gap-4 mt-3">
              <li>Home</li>
              <li>Roadmaps</li>
              <li>Bookmarks</li>
              <li>About us</li>
            </ul>
          </div>
          <div className="text-[#F3F3F3]">
            <h3 className=" font-[rubik] font-bold text-[28px]">Help</h3>
            <ul className=" text-[20px] font-bold flex flex-col gap-4 mt-3">
              <li>Contact us</li>
              <li>FAQ</li>
              <li>User guide</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
