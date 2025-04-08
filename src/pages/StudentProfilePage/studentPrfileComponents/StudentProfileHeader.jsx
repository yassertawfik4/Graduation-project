import { CiCamera } from "react-icons/ci";
import studentprofile from "/public/images/dd.jpg";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaPen } from "react-icons/fa";
import { IoIosLink } from "react-icons/io";
import { useState, useRef } from "react";
import { MdOutlineCancel } from "react-icons/md";

function StudentProfileHeader() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "Yasser Tawfik",
    jobTitle: "Front-End Developer",
    bio: "Driven by a love for problem-solving and a keen eye for detail, I'm a front-end developer seeking an internship to expand my expertise. I'm committed to learning new technologies and contributing to a dynamic team while building impactful user interfaces.",
  });

  const [socialIcons, setSocialIcons] = useState([
    { icon: <FaGithub size={28} />, url: "https://github.com", name: "GitHub" },
    {
      icon: <IoIosLink size={28} />,
      url: "https://portfolio.com",
      name: "Portfolio",
    },
    {
      icon: <FaLinkedin size={28} />,
      url: "https://linkedin.com",
      name: "LinkedIn",
    },
  ]);

  const [profileImage, setProfileImage] = useState(studentprofile);
  const fileInputRef = useRef(null);

  const availableIcons = [
    { icon: <FaGithub size={23} />, name: "GitHub" },
    { icon: <IoIosLink size={23} />, name: "Website" },
    { icon: <FaLinkedin size={23} />, name: "LinkedIn" },
  ];

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleIconUrlChange = (index, newUrl) => {
    const updatedIcons = [...socialIcons];
    updatedIcons[index].url = newUrl;
    setSocialIcons(updatedIcons);
  };

  const handleRemoveIcon = (index) => {
    const updatedIcons = socialIcons.filter((_, i) => i !== index);
    setSocialIcons(updatedIcons);
  };

  const handleAddIcon = (iconObject) => {
    setSocialIcons([...socialIcons, { ...iconObject, url: "" }]);
  };

  const handleSave = () => {
    console.log("Saving data:", { userData, socialIcons });
    setIsEditing(false);
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

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="relative">
        <div className="h-[254px] relative bg-gradient-to-r from-[#C5C5C7] via-[#F3F3F3] to-[#8C8B8E]/81 rounded-tl-[70px]">
          <button className="absolute right-4 bottom-4 bg-[#D2D2D3] py-2 px-5 rounded-lg shadow">
            <CiCamera size={25} className="text-white" />
          </button>
        </div>

        {isEditing ? (
          <div>
            <div className="flex items-center justify-between">
              <div
                className="w-[160px] h-[160px] relative bottom-10 rounded-full border-4 border-white shadow-lg overflow-hidden cursor-pointer"
                onClick={handleImageClick}
              >
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                {/* أيقونة الكاميرا داخل الصورة */}
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
                  className="flex items-center justify-center gap-2 px-8 py-1 bg-[#3A4C59] border-2 border-[#3A4C59] text-white transition-all duration-300 ease-in-out cursor-pointer font-semibold rounded-md hover:bg-white hover:text-[#3A4C59]"
                >
                  Update
                </button>

                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center justify-center gap-2 px-8 py-1 border border-[#C51800] rounded-md  text-[#C51800] font-semibold cursor-pointer"
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
                      User Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={userData.name}
                      onChange={handleOnChange}
                      className="text-[#3A4C59] font-bold border outline-none border-[#C9C9C9] px-2 py-2 rounded-sm w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-[17px] text-gray-600 font-bold my-3">
                      Jopt Title
                    </label>
                    <input
                      name="jobTitle"
                      value={userData.jobTitle}
                      onChange={handleOnChange}
                      placeholder="Write something about you"
                      className="text-[#3A4C59] font-bold border outline-none border-[#C9C9C9] px-2 py-1 rounded-md w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="px-4">
                <h3 className="font-bold text-gray-700 mb-2">Social Media</h3>
                <div className="space-y-2">
                  {socialIcons.map((social, index) => (
                    <div key={index} className="flex items-center gap-2 my-3">
                      <span className="text-gray-600">{social.icon}</span>
                      <input
                        type="text"
                        value={social.url}
                        onChange={(e) =>
                          handleIconUrlChange(index, e.target.value)
                        }
                        placeholder={`Enter ${social.name} URL`}
                        className="border border-gray-300 px-2 py-3  rounded text-sm w-full"
                      />
                      <button
                        onClick={() => handleRemoveIcon(index)}
                        className="text-black p-1 cursor-pointer bg-[#F1F2F4] px-3 py-3 shadow-sm my-2"
                        title="Remove"
                      >
                        <MdOutlineCancel size={22} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pl-4">
                <h3 className="font-bold text-gray-700 mb-2">
                  Add Social Media
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-600 mb-1">Add new icon:</p>
                  <div className="flex gap-2 mb-6">
                    {availableIcons.map((iconOption, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAddIcon(iconOption)}
                        className="p-2 border cursor-pointer border-gray-300 rounded-md hover:bg-gray-100"
                        title={`Add ${iconOption.name}`}
                      >
                        {iconOption.icon}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            {/* الصورة */}
            <div
              className="w-[160px] h-[160px] relative bottom-10 rounded-full border-4 border-white shadow-lg overflow-hidden flex-shrink-0 cursor-pointer"
              onClick={handleImageClick}
            >
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
              {/* أيقونة الكاميرا داخل الصورة */}
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

            <div className="flex flex-grow justify-between  ml-6">
              <div className="flex flex-col gap-2 flex-grow mt-2">
                <h2 className="text-3xl font-bold font-[roboto]">
                  {userData.name}
                </h2>
                <p className="text-[#3A4C59] font-bold max-w-[650px] break-words">
                  {userData.jobTitle}
                </p>
                <div className="flex gap-3 mt-2 text-gray-600">
                  {socialIcons.map((social, index) => (
                    <Link
                      key={index}
                      to={social.url}
                      target="_blank"
                      title={social.name}
                      className="cursor-pointer "
                    >
                      {social.icon}
                    </Link>
                  ))}
                </div>
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
                About
              </label>
              <textarea
                name="jobTitle"
                value={userData.bio}
                onChange={handleOnChange}
                placeholder="Write something about you"
                className="text-[#3A4C59] font-medium text-[16px] leading-7 border h-[162px] outline-none border-[#C9C9C9] px-2 py-1 rounded-md w-full"
              />
            </div>
          ) : (
            <div className=" rounded-xl w-full px-2 py-1">
              <h2 className="block text-[22px] font-[roboto] text-[#000000] font-bold my-3 ">
                About
              </h2>
              <p className="text-[#3A4C59] font-medium text-sm leading-6 pb-3">
                {userData.bio}
              </p>
            </div>
          )}
          {isEditing && (
            <div className="flex justify-end my-3">
              <button
                onClick={handleSave}
                className="bg-[#3A4C59] text-white py-3 px-6 rounded-lg cursor-pointer font-[roboto] "
              >
                save
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentProfileHeader;