import { useEffect, useState } from "react";
import SideNav from "../StudentProfilePage/sideNav/SideNav";
import CompanyProfileHeader from "./CompanyProfileHeader";
import axiosInstance from "../../Api/axiosInstance";
import { useParams } from "react-router-dom";
function CompanyProfile() {
  const [company, setCompany] = useState({});
  const { companyid } = useParams();
  const handleGetCompany = async () => {
    try {
      const response = await axiosInstance.get(
        `Company/profiles/${companyid}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessUsertoken")}`,
          },
        }
      );

      console.log(response.data);
      setCompany(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetCompany();
  }, []);
  return (
    <div className="w-full flex">
      <SideNav />
      <div className="w-full p-6 space-y-6">
        {/*profile*/}
        <CompanyProfileHeader company={company} />

        {/* Founding Info */}
        <div className="border border-[#C9C9C9] rounded-lg p-4 bg-white shadow-sm">
          <h2 className="text-lg font-bold mb-4 font-[roboto]">
            Founding Info
          </h2>
          <div className="grid grid-cols-2 gap-4 text-gray-700">
            {/* العمود الأول */}
            <div>
              <p className="text-[#8D9499] font-semibold">Industry Type</p>
              <p className="text-[#3A4C59] font-semibold">
                {company?.basicInfo?.industry}
              </p>

              <p className="text-[#8D9499] font-semibold mt-4">
                Year of Establishment
              </p>
              <p className="text-[#3A4C59] font-semibold">2020</p>
            </div>

            {/* العمود الثاني */}
            <div>
              <p className="text-[#8D9499] font-semibold">Size</p>
              <p className="text-[#3A4C59] font-semibold">Enterprise</p>

              <p className="text-[#8D9499] font-semibold mt-4">
                Company Website
              </p>
              <p className="text-[#3A4C59] font-semibold">website</p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="border border-[#C9C9C9] rounded-lg p-4 bg-white shadow-sm">
          <h2 className="text-lg font-bold mb-4 font-[roboto]">Contact</h2>
          <div className="grid grid-cols-2 gap-4 text-gray-700">
            {/* العمود الأول */}
            <div>
              <p className="text-[#8D9499] font-semibold">Email</p>
              <p className="text-[#3A4C59] font-semibold">@gmail.com</p>
            </div>

            {/* العمود الثاني */}
            <div>
              <p className="text-[#8D9499] font-semibold">Address</p>
              <p className="text-[#3A4C59] font-semibold">
                {company?.address?.street} , {company?.address?.city} ,{" "}
                {company?.address?.governorate}
              </p>
            </div>
          </div>
        </div>

        {/* Recent Posts */}
        <div className="border border-[#C9C9C9] rounded-lg p-4 bg-white shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Recent posts</h2>
            <a href="#" className="text-[16px] font-bold font-[roboto]">
              Show all &rarr;
            </a>
          </div>

          <div className="space-y-3">
            {/* Post 1 */}
            <div className="border-x border-[#C9C9C9] shadow-md rounded-lg p-4 grid grid-cols-4 items-center">
              <div>
                <h3 className="font-semibold text-gray-900">UI/UX Designer</h3>
                <p className="text-sm text-gray-600">
                  Project • 27 days remaining
                </p>
              </div>
              <div className="flex items-center text-green-600 text-sm font-medium">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
                Active
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M3 18.433C3 16.4308 4.45485 14.7254 6.43204 14.4098L6.61013 14.3814C8.19336 14.1287 9.80664 14.1287 11.3899 14.3814L11.568 14.4098C13.5451 14.7254 15 16.4308 15 18.433C15 19.2984 14.2984 20 13.433 20H4.56697C3.70156 20 3 19.2984 3 18.433Z"
                    stroke="#363853"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M12.5 7.5C12.5 9.433 10.933 11 9 11C7.067 11 5.5 9.433 5.5 7.5C5.5 5.567 7.067 4 9 4C10.933 4 12.5 5.567 12.5 7.5Z"
                    stroke="#363853"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M15 11C16.933 11 18.5 9.433 18.5 7.5C18.5 5.567 16.933 4 15 4M17.3899 20H19.433C20.2984 20 21 19.2984 21 18.433C21 16.4308 19.5451 14.7254 17.568 14.4098V14.4098C17.4494 14.3909 17.3293 14.3814 17.2093 14.3814C16.8895 14.3814 16.7902 14.3814 16.2412 14.3814"
                    stroke="#363853"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                799 Applications
              </div>
              <div className="text-right">
                <button className="bg-[#095544] text-white text-sm px-4 py-2 rounded-md">
                  View Applications
                </button>
              </div>
            </div>

            {/* Post 2 */}
            <div className="border-x border-[#C9C9C9] shadow-md rounded-lg p-4 grid grid-cols-4 items-center">
              <div>
                <h3 className="font-semibold text-gray-900">
                  Senior UX Designer
                </h3>
                <p className="text-sm text-gray-600">
                  Internship • 8 days remaining
                </p>
              </div>
              <div className="flex items-center text-green-600 text-sm font-medium">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
                Active
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M3 18.433C3 16.4308 4.45485 14.7254 6.43204 14.4098L6.61013 14.3814C8.19336 14.1287 9.80664 14.1287 11.3899 14.3814L11.568 14.4098C13.5451 14.7254 15 16.4308 15 18.433C15 19.2984 14.2984 20 13.433 20H4.56697C3.70156 20 3 19.2984 3 18.433Z"
                    stroke="#363853"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M12.5 7.5C12.5 9.433 10.933 11 9 11C7.067 11 5.5 9.433 5.5 7.5C5.5 5.567 7.067 4 9 4C10.933 4 12.5 5.567 12.5 7.5Z"
                    stroke="#363853"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M15 11C16.933 11 18.5 9.433 18.5 7.5C18.5 5.567 16.933 4 15 4M17.3899 20H19.433C20.2984 20 21 19.2984 21 18.433C21 16.4308 19.5451 14.7254 17.568 14.4098V14.4098C17.4494 14.3909 17.3293 14.3814 17.2093 14.3814C16.8895 14.3814 16.7902 14.3814 16.2412 14.3814"
                    stroke="#363853"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                100 Applications
              </div>
              <div className="text-right">
                <button className="bg-[#095544] text-white text-sm px-4 py-2 rounded-md">
                  View Applications
                </button>
              </div>
            </div>

            {/* Post 3 */}
            <div className="border-x border-[#C9C9C9] shadow-md rounded-lg p-4 grid grid-cols-4 items-center">
              <div>
                <h3 className="font-semibold text-gray-900">UI/UX Design</h3>
                <p className="text-sm text-gray-600">
                  Roadmap • 8 days remaining
                </p>
              </div>
              <div className="flex items-center text-green-600 text-sm font-medium">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
                Active
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M3 18.433C3 16.4308 4.45485 14.7254 6.43204 14.4098L6.61013 14.3814C8.19336 14.1287 9.80664 14.1287 11.3899 14.3814L11.568 14.4098C13.5451 14.7254 15 16.4308 15 18.433C15 19.2984 14.2984 20 13.433 20H4.56697C3.70156 20 3 19.2984 3 18.433Z"
                    stroke="#363853"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M12.5 7.5C12.5 9.433 10.933 11 9 11C7.067 11 5.5 9.433 5.5 7.5C5.5 5.567 7.067 4 9 4C10.933 4 12.5 5.567 12.5 7.5Z"
                    stroke="#363853"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M15 11C16.933 11 18.5 9.433 18.5 7.5C18.5 5.567 16.933 4 15 4M17.3899 20H19.433C20.2984 20 21 19.2984 21 18.433C21 16.4308 19.5451 14.7254 17.568 14.4098V14.4098C17.4494 14.3909 17.3293 14.3814 17.2093 14.3814C16.8895 14.3814 16.7902 14.3814 16.2412 14.3814"
                    stroke="#363853"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                185 Bookmarks
              </div>
              <div className="text-right">
                <button className="bg-[#095544] text-white text-sm px-4 py-2 rounded-md">
                  View Applications
                </button>
              </div>
            </div>

            {/* Post 4 */}
            <div className="border-x border-[#C9C9C9] shadow-md rounded-lg p-4 grid grid-cols-4 items-center">
              <div>
                <h3 className="font-semibold text-gray-900">
                  Junior Graphic Designer
                </h3>
                <p className="text-sm text-gray-600">
                  Internship • Dec 7, 2024
                </p>
              </div>
              <div className="flex items-center text-red-600 text-sm font-medium">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
                Expire
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M3 18.433C3 16.4308 4.45485 14.7254 6.43204 14.4098L6.61013 14.3814C8.19336 14.1287 9.80664 14.1287 11.3899 14.3814L11.568 14.4098C13.5451 14.7254 15 16.4308 15 18.433C15 19.2984 14.2984 20 13.433 20H4.56697C3.70156 20 3 19.2984 3 18.433Z"
                    stroke="#363853"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M12.5 7.5C12.5 9.433 10.933 11 9 11C7.067 11 5.5 9.433 5.5 7.5C5.5 5.567 7.067 4 9 4C10.933 4 12.5 5.567 12.5 7.5Z"
                    stroke="#363853"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M15 11C16.933 11 18.5 9.433 18.5 7.5C18.5 5.567 16.933 4 15 4M17.3899 20H19.433C20.2984 20 21 19.2984 21 18.433C21 16.4308 19.5451 14.7254 17.568 14.4098V14.4098C17.4494 14.3909 17.3293 14.3814 17.2093 14.3814C16.8895 14.3814 16.7902 14.3814 16.2412 14.3814"
                    stroke="#363853"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                328 Applications
              </div>
              <div className="text-right">
                <button className="bg-[#095544] text-white text-sm px-4 py-2 rounded-md">
                  View Applications
                </button>
              </div>
            </div>

            {/* Post 5 */}
            <div className="border-x border-[#C9C9C9] shadow-md rounded-lg p-4 grid grid-cols-4 items-center">
              <div>
                <h3 className="font-semibold text-gray-900">
                  Front End Developer
                </h3>
                <p className="text-sm text-gray-600">
                  Internship • Dec 7, 2024
                </p>
              </div>
              <div className="flex items-center text-red-600 text-sm font-medium">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
                Expire
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M3 18.433C3 16.4308 4.45485 14.7254 6.43204 14.4098L6.61013 14.3814C8.19336 14.1287 9.80664 14.1287 11.3899 14.3814L11.568 14.4098C13.5451 14.7254 15 16.4308 15 18.433C15 19.2984 14.2984 20 13.433 20H4.56697C3.70156 20 3 19.2984 3 18.433Z"
                    stroke="#363853"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M12.5 7.5C12.5 9.433 10.933 11 9 11C7.067 11 5.5 9.433 5.5 7.5C5.5 5.567 7.067 4 9 4C10.933 4 12.5 5.567 12.5 7.5Z"
                    stroke="#363853"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M15 11C16.933 11 18.5 9.433 18.5 7.5C18.5 5.567 16.933 4 15 4M17.3899 20H19.433C20.2984 20 21 19.2984 21 18.433C21 16.4308 19.5451 14.7254 17.568 14.4098V14.4098C17.4494 14.3909 17.3293 14.3814 17.2093 14.3814C16.8895 14.3814 16.7902 14.3814 16.2412 14.3814"
                    stroke="#363853"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                340 Applications
              </div>
              <div className="text-right">
                <button className="bg-[#095544] text-white text-sm px-4 py-2 rounded-md">
                  View Applications
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyProfile;
