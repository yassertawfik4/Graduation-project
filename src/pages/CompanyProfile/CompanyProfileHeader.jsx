import { CiCamera } from "react-icons/ci";
import companyLogo from "/public/images/profileImage.png";
import { FaGithub, FaLinkedin, FaPen } from "react-icons/fa";
import { IoIosLink } from "react-icons/io";
import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import axiosInstance from "../../Api/axiosInstance";

function CompanyProfileHeader({ company, handleGetCompany }) {
  const [isEditing, setIsEditing] = useState(false);

  const [about, setAbout] = useState({
    companyName: "",
    description: "",
    industry: "",
    size: "",
    websiteUrl: "",
  });
  // const [socialIcons, setSocialIcons] = useState([
  //   {
  //     icon: <FaGithub size={28} />,
  //     url: "https://github.com/framertech",
  //     name: "GitHub",
  //   },
  //   {
  //     icon: <IoIosLink size={28} />,
  //     url: "https://framer.com",
  //     name: "Website",
  //   },
  //   {
  //     icon: <FaLinkedin size={28} />,
  //     url: "https://linkedin.com/company/framer",
  //     name: "LinkedIn",
  //   },
  // ]);
  const handleAddabout = async () => {
    const data = {
      name: about.companyName,
      description: about.description,
      industry: about.industry,
      companySize: about.size,
      websiteUrl: about.websiteUrl,
    };
    try {
      const response = await axiosInstance.patch(
        `Company/profiles/me/basic`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessUsertoken")}`,
          },
        }
      );
      console.log(response);
      handleGetCompany();
    } catch (error) {
      console.log(error);
    }
  };
  const handelGetAbout = async () => {
    try {
      const response = await axiosInstance.get(`Company/profiles/basic`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessUsertoken")}`,
        },
      });
      console.log(response);
      setAbout(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const [profileImage, setProfileImage] = useState(companyLogo);
  const fileInputRef = useRef(null);


  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setAbout({ ...about, [name]: value });
  };

 

  const handleSave = () => {
    console.log("Saving company data:", { about });
    setIsEditing(false);
    handleAddabout();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };
  useEffect(() => {
    handelGetAbout();
  }, []);
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="relative">
        <div className="h-64 relative bg-gradient-to-r from-[#C5C5C7] via-[#F3F3F3] to-[#8C8B8E]/81 rounded-tl-[70px]">
          <button className="absolute right-4 bottom-4 bg-[#D2D2D3] py-2 px-5 rounded-lg shadow">
            <CiCamera size={25} className="text-white" />
          </button>
        </div>

        {isEditing ? (
          <div>
            <div className="flex items-center justify-between">
              <div
                className="w-40 h-40 relative bottom-10 rounded-full border-4 border-white shadow-lg overflow-hidden cursor-pointer"
                onClick={handleImageClick}
              >
                <img
                  src={profileImage}
                  alt="Company Logo"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md">
                  <CiCamera size={20} className="text-gray-600" />
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="flex items-center justify-center gap-2 px-8 py-1 bg-[#05302B] border-2 border-[#05302B] text-white transition-all duration-300 ease-in-out cursor-pointer font-semibold rounded-md hover:bg-white hover:text-[#05302B]"
                >
                  Update
                </button>

                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center justify-center gap-2 px-8 py-1 border border-[#C51800] rounded-md text-[#C51800] font-semibold cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-6">
              <div className="pr-4 border p-3 rounded-2xl border-[#C9C9C9]">
                <div className="space-y-2">
                  <div>
                    <label className="block text-[17px] text-gray-600 font-bold mb-3">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={about.companyName}
                      onChange={handleOnChange}
                      placeholder="Your company's name"
                      className="text-[#3A4C59] font-bold border outline-none border-[#C9C9C9] px-2 py-2 rounded-sm w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-[17px] text-gray-600 font-bold my-3">
                      Industry
                    </label>
                    <input
                      name="industry"
                      value={about.industry}
                      onChange={handleOnChange}
                      placeholder="Your company's industry"
                      className="text-[#3A4C59] font-bold border outline-none border-[#C9C9C9] px-2 py-1 rounded-md w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-[17px] text-gray-600 font-bold my-3">
                      companySize
                    </label>
                    <input
                      name="size"
                      value={about.size}
                      onChange={handleOnChange}
                      placeholder="Your company's companySize"
                      className="text-[#3A4C59] font-bold border outline-none border-[#C9C9C9] px-2 py-1 rounded-md w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-[17px] text-gray-600 font-bold my-3">
                      websiteUrl
                    </label>
                    <input
                      name="websiteUrl"
                      value={about.websiteUrl}
                      onChange={handleOnChange}
                      placeholder="Your company's websiteUrl"
                      className="text-[#3A4C59] font-bold border outline-none border-[#C9C9C9] px-2 py-1 rounded-md w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div
              className="w-40 h-40 relative bottom-10 rounded-full border-4 border-white shadow-lg overflow-hidden flex-shrink-0 cursor-pointer"
              onClick={handleImageClick}
            >
              <img
                src={profileImage}
                alt="Company Logo"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-md">
                <CiCamera size={20} className="text-gray-600" />
              </div>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            <div className="flex flex-grow justify-between ml-6">
              <div className="flex flex-col gap-2 flex-grow mt-2">
                <h2 className="text-3xl font-bold font-[roboto]">
                  {company?.basicInfo?.companyName || "Company Name"}
                </h2>
                <p className="text-[#3A4C59] font-bold max-w-[650px] break-words">
                  {company?.basicInfo?.industry || "Industry Type"}
                </p>
              </div>

              <div className="flex-shrink-0 mt-3">
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-transparent cursor-pointer font-bold text-[#8D9499] border border-[#C9C9C9] rounded-md hover:bg-gray-100"
                >
                  <FaPen size={15} />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        )}
        <div>
          {isEditing ? (
            <div>
              <label className="block text-[22px] text-[#000000] font-bold my-3">
                Company Description
              </label>
              <textarea
                name="description"
                value={about.description}
                onChange={handleOnChange}
                placeholder="Write about your company"
                className="text-[#3A4C59] font-medium text-[16px] leading-7 border h-20 outline-none border-[#C9C9C9] px-2 py-1 rounded-md w-full"
              />
            </div>
          ) : (
            <div className="rounded-xl w-full px-2 py-1 ">
              <h2 className="block text-[22px] font-[roboto] text-[#000000] font-bold my-3">
                Description
              </h2>
              {company?.basicInfo?.description}
            </div>
          )}
          {isEditing && (
            <div className="flex justify-end my-3">
              <button
                onClick={handleSave}
                className="bg-[#05302B] text-white py-3 px-6 rounded-lg cursor-pointer font-[roboto]"
              >
                Save
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

CompanyProfileHeader.propTypes = {
  company: PropTypes.shape({
    basicInfo: PropTypes.shape({
      companyName: PropTypes.string,
      industry: PropTypes.string,
    }),
    tagline: PropTypes.string,
    address: PropTypes.shape({
      street: PropTypes.string,
      city: PropTypes.string,
      governorate: PropTypes.string,
    }),
  }),
};

export default CompanyProfileHeader;
