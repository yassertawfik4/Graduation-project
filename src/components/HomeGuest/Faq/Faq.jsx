import {
  FaFacebook,
  FaGoogle,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import FaqPhoto from "/public/images/FaqPhoto.webp";
import { Link } from "react-router-dom";
function Faq() {
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
    <section className="my-32">
      <div className="container mx-auto">
        <div className="bg-[rgba(58,76,89,0.15)] flex md:justify-between justify-center flex-wrap md:flex-nowrap items-center p-14 ">
          <div className="w-[400px] ">
            <h2 className="font-[roboto] xl:text-[32px] md:text-[28px] text-[25px] tracking-[3.75px] font-bold text-[#010318]">
              Get matched with
              <br />
              great internships
            </h2>
            <p className="font-[roboto] mt-7 xl:text-[32px] md:text-[28px] text-[25px] tracking-[3.75%] font-bold text-[#010318]">
              Easy applying...
            </p>
          </div>
          <div>
            <img
              className="xl:w-[684px] xl:h-[392.38px] md:w-[466px] md:h-[392.38px] w-[343px] h-[186.24px] md:mt-0 mt-10"
              src={FaqPhoto}
              decoding="async"
              loading="lazy"
              alt="FaqPhoto"
            />
          </div>
        </div>
        <div className="my-32 flex gap-20 justify-between ">
          <div className="w-[576px]">
            <h2 className="font-[roboto] text-[55px] tracking-[1.79px] font-bold text-[#010318]">
              Frequently Asked Questions
            </h2>
            <div className="bg-[rgba(1,3,24,0.63)] w-[311px] py-4 px-4 rounded-lg">
              <p className="text-[#F3F3F3] font-[roboto] text-[32px] tracking-[-0.25px] font-bold">
                Step<span className="text-[#010318]">Up</span>
              </p>
              <div className="flex justify-between items-center mt-3">
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
          </div>
          <div className="w-[720px]">
            <details
              className=" my-8 group [&_summary::-webkit-details-marker]:hidden "
              open
            >
              <summary className="flex border-l-2 border-[#3A4C59] group-open:border-[#010318]  cursor-pointer items-center justify-between gap-1.5  p-4 text-gray-900">
                <h2 className="font-medium ">
                  Can I access company roadmaps without signing up?{" "}
                </h2>

                <svg
                  className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>

              <p className="pt-4 border-l-2 border-[#3A4C59] group-open:border-[#010318]  px-4 leading-relaxed tracking-[-0.25px] text-[rgba(1,3,24,0.7)] font-[roboto] text-[15px] font-medium">
                Yes, the platform includes a progress tracker that helps you
                monitor your skills
              </p>
            </details>
            <details className="my-8 group [&_summary::-webkit-details-marker]:hidden ">
              <summary className="flex border-l-2 border-[#3A4C59] group-open:border-[#010318] cursor-pointer items-center justify-between gap-1.5 p-4 text-gray-900">
                <h2 className="font-medium ">
                  Can I access company roadmaps without signing up?{" "}
                </h2>

                <svg
                  className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>

              <p className="pt-4 border-l-2 border-[#3A4C59] group-open:border-[#010318]  px-4 leading-relaxed tracking-[-0.25px] text-[rgba(1,3,24,0.7)] font-[roboto] text-[15px] font-medium">
                Yes, the platform includes a progress tracker that helps you
                monitor your skills
              </p>
            </details>
            <details className="my-8 group [&_summary::-webkit-details-marker]:hidden ">
              <summary className="flex border-l-2 border-[#3A4C59] group-open:border-[#010318]  cursor-pointer items-center justify-between gap-1.5 p-4 text-gray-900">
                <h2 className="font-medium ">
                  Can I edit or update my profile after completing it?{" "}
                </h2>

                <svg
                  className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>

              <p className="pt-4 px-4 border-l-2 border-[#3A4C59] group-open:border-[#010318]  leading-relaxed tracking-[-0.25px] text-[rgba(1,3,24,0.7)] font-[roboto] text-[15px] font-medium">
                Yes, the platform includes a progress tracker that helps you
                monitor your skills
              </p>
            </details>
            <details className="my-8 group [&_summary::-webkit-details-marker]:hidden ">
              <summary className="flex border-l-2 border-[#3A4C59] group-open:border-[#010318]  cursor-pointer items-center justify-between gap-1.5 p-4 text-gray-900">
                <h2 className="font-medium ">
                  Can we set custom requirements for internship applications?{" "}
                </h2>

                <svg
                  className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>

              <p className="pt-4 px-4 border-l-2 border-[#3A4C59] group-open:border-[#010318]  leading-relaxed tracking-[-0.25px] text-[rgba(1,3,24,0.7)] font-[roboto] text-[15px] font-medium">
                Yes, the platform includes a progress tracker that helps you
                monitor your skills
              </p>
            </details>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Faq;
