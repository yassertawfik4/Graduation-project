import  { useState } from "react";
import { FaPen } from "react-icons/fa";

function StudentPersonalInformation() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    fullName: "Ahmed Mohammed",
    phoneNumber: "+201000000000",
    gender: "Male",
    location: "Cairo, Egypt",
    email: "AhmedMohammed@gmail.com",
    age: "20"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSave = () => {
    console.log("Saving personal information:", userData);
    setIsEditing(false);
  };

  return (
    <div className="mt-6 bg-white border border-[#C9C9C9] rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Personal Information</h3>
        
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-transparent cursor-pointer font-bold text-[#8D9499] border border-[#C9C9C9] rounded-md hover:bg-gray-100"
          >
            <FaPen size={15} />
            Edit Information
          </button>
        )}
      </div>

      {isEditing ? (
        // وضع التحرير
        <div>
          <div className="flex gap-6">
            {/* العمود الأول */}
            <div className="w-1/2 space-y-4">
              <div>
                <label className="block text-sm text-[#8D9499]">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={userData.fullName}
                  onChange={handleChange}
                  className="text-[#3A4C59] font-semibold border border-gray-300 px-2 py-1 rounded-md w-full mt-1"
                />
              </div>
              
              <div>
                <label className="block text-sm text-[#8D9499]">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={userData.phoneNumber}
                  onChange={handleChange}
                  className="text-[#3A4C59] font-semibold border border-gray-300 px-2 py-1 rounded-md w-full mt-1"
                />
              </div>
              
              <div>
                <label className="block text-sm text-[#8D9499]">Gender</label>
                <select
                  name="gender"
                  value={userData.gender}
                  onChange={handleChange}
                  className="text-[#3A4C59] font-semibold border border-gray-300 px-2 py-1 rounded-md w-full mt-1"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
            
            {/* العمود الثاني */}
            <div className="w-1/2 space-y-4">
              <div>
                <label className="block text-sm text-[#8D9499]">Location</label>
                <input
                  type="text"
                  name="location"
                  value={userData.location}
                  onChange={handleChange}
                  className="text-[#3A4C59] font-semibold border border-gray-300 px-2 py-1 rounded-md w-full mt-1"
                />
              </div>
              
              <div>
                <label className="block text-sm text-[#8D9499]">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  className="text-[#3A4C59] font-semibold border border-gray-300 px-2 py-1 rounded-md w-full mt-1"
                />
              </div>
              
              <div>
                <label className="block text-sm text-[#8D9499]">Age</label>
                <input
                  type="text"
                  name="age"
                  value={userData.age}
                  onChange={handleChange}
                  className="text-[#3A4C59] font-semibold border border-gray-300 px-2 py-1 rounded-md w-full mt-1"
                />
              </div>
            </div>
          </div>
          
          {/* أزرار الحفظ والإلغاء */}
          <div className="flex gap-2 mt-6">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-[#3A4C59] font-medium text-white cursor-pointer rounded-md"
            >
              Update
            </button>
            
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-white font-medium text-[#C51800] border cursor-pointer border-[#C51800] rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex gap-6 text-gray-700">
          {/* العمود الأول */}
          <div>
            <p className="text-[#8D9499] font-semibold">Full Name</p>
            <p className="text-[#3A4C59] font-semibold">{userData.fullName}</p>

            <p className="text-[#8D9499] font-semibold mt-4">Phone Number</p>
            <p className="text-[#3A4C59] font-semibold">{userData.phoneNumber}</p>

            <p className="text-[#8D9499] font-semibold mt-4">Gender</p>
            <p className="text-[#3A4C59] font-semibold">{userData.gender}</p>
          </div>

          {/* العمود الثاني */}
          <div>
            <p className="text-[#8D9499] font-semibold">Location</p>
            <p className="text-[#3A4C59] font-semibold">{userData.location}</p>

            <p className="text-[#8D9499] font-semibold mt-4">Email Address</p>
            <p className="text-[#3A4C59] font-semibold">{userData.email}</p>

            <p className="text-[#8D9499] font-semibold mt-4">Age</p>
            <p className="text-[#3A4C59] font-semibold">{userData.age}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentPersonalInformation;