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
    <footer className="bg-[#010318] rounded-t-2xl">
      <div className="container mx-auto px-2">
        سأقوم بتعديل الـ grid layout ليكون شكل المطلوب: jsxCopy
        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-24 py-10">
          {/* Logo and Social Icons - Full width on tablet */}
          <div className="col-span-3 sm:col-span-3 lg:col-span-1">
            <h3 className="text-[#F3F3F3] font-rubik font-bold text-2xl md:text-[28px]">
              Step<span className="text-[#3A4C59]">Up</span>
            </h3>
            <div className="flex md:gap-8 gap-3 mt-4">
              {soicalIcons.map((icon, index) => (
                <Link
                  key={index}
                  to={icon.link}
                  target="_blank"
                  className="text-white w-8 h-8 md:text-[28px] text-[20px]"
                >
                  {icon.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Platform Section */}
          <div className="text-[#F3F3F3]">
            <h3 className="font-rubik font-bold text-sm md:text-xl lg:text-[28px]">
              platform
            </h3>
            <ul className="mt-3 ml-8 flex flex-col gap-4 text-[9px] sm:text-[13px] md:text-[15px] lg:text-xl font-bold list-disc">
              <li>For companies</li>
              <li>For Students</li>
              <li>
                How Step<span className="text-[#3A4C59]">Up</span> works?
              </li>
            </ul>
          </div>

          {/* Explore Section */}
          <div className="text-[#F3F3F3]">
            <h3 className="font-rubik font-bold text-sm md:text-xl lg:text-[28px]">
              Explore
            </h3>
            <ul className="mt-3 flex flex-col gap-4 text-[10px] sm:text-[13px] md:text-[15px] lg:text-xl font-bold">
              <li>Home</li>
              <li>Roadmaps</li>
              <li>Bookmarks</li>
              <li>About us</li>
            </ul>
          </div>

          {/* Help Section */}
          <div className="text-[#F3F3F3]">
            <h3 className="font-rubik font-bold text-sm md:text-xl lg:text-[28px]">
              Help
            </h3>
            <ul className="mt-3 flex flex-col gap-4 text-[10px] sm:text-[13px] md:text-[15px] lg:text-xl font-bold">
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
