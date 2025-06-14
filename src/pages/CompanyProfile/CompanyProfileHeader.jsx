import { CiCamera } from "react-icons/ci";
import companyLogo from "/public/images/profileImage.png";
import { FaPen } from "react-icons/fa";
import { useState, useRef, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import axiosInstance from "../../Api/axiosInstance";
import Swal from "sweetalert2";

function CompanyProfileHeader({ company, handleGetCompany }) {
  const [isEditing, setIsEditing] = useState(false);

  const companyid = localStorage.getItem("companyId");
  const [about, setAbout] = useState({
    name: "",
    description: "",
    industry: "",
    size: "",
    websiteUrl: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setAbout({ ...about, [name]: value });
  };

  const handleSave = () => {
    console.log("Saving company data:", { about });
    setIsEditing(false);
    handelEdit();
  };
  const handelGetAbout = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`Company/profiles/info`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessUsertoken")}`,
        },
      });
      console.log(response);
      setAbout(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);
  const handelEdit = async () => {
    try {
      const response = await axiosInstance.patch(
        `Company/profiles/info`,
        {
          name: about.name,
          description: about.description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessUsertoken")}`,
          },
        }
      );
      Swal.fire("Updated!", "Your profile has been updated.", "success");
      console.log(response);
      handleGetCompany();
    } catch (error) {
      console.log(error);
    }
  };
  // handel get photo
  const handelGetPhoto = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`Company/company-logo/${companyid}`,
        {
          responseType: 'blob',
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessUsertoken")}`,
          }
      })
      console.log(response);
      const imageUrl = URL.createObjectURL(response.data);
      setProfileImage(imageUrl);
    } catch (error) {
      console.log(error);
    }
  }, [companyid]);
  
  // Handle image click to open file selector
  const handleImageClick = () => {
    fileInputRef.current.click();
  }
  
  // Handle image upload
  const handleImageChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Create a preview of the selected image
      const previewUrl = URL.createObjectURL(file);
      setProfileImage(previewUrl);
      
      // Upload the image to the server
      try {
        setIsUploading(true);
        
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await axiosInstance.post(
          'Company/upload-logo',
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessUsertoken")}`,
            }
          }
        );
        
        const imageUrl = response.data; 
        setProfileImage(imageUrl); 
        console.log('Image upload response:', response);
        Swal.fire("Updated!", "Company logo has been updated.", "success");
        handleGetCompany();
        
      } catch (error) {
        console.error('Error uploading image:', error);
        Swal.fire("Error!", "Failed to upload company logo.", "error");
      } finally {
        setIsUploading(false);
      }
    }
  }
  useEffect(() => {
    handelGetAbout();
    handelGetPhoto();
  }, [handelGetAbout, handelGetPhoto]);

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
                {isUploading ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <div className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md">
                    <CiCamera size={20} className="text-gray-600" />
                  </div>
                )}
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
                      name="name"
                      value={about.name}
                      onChange={handleOnChange}
                      placeholder="Your company's name"
                      className="text-[#3A4C59] font-bold border outline-none border-[#C9C9C9] px-2 py-2 rounded-sm w-full"
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
                src={profileImage || company?.logo || companyLogo}
                alt="Company Logo"
                className="w-full h-full object-cover"
              />
              {isUploading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <div className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-md">
                  <CiCamera size={20} className="text-gray-600" />
                </div>
              )}
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
                  {company?.info?.name || "Company Name"}
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
              {company?.info?.description}
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
    info: PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string
    }),
    logo: PropTypes.string,
    tagline: PropTypes.string,
    address: PropTypes.shape({
      street: PropTypes.string,
      city: PropTypes.string,
      governorate: PropTypes.string,
    }),
  }),
  handleGetCompany: PropTypes.func.isRequired
};

export default CompanyProfileHeader;
