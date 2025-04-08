import { useState } from "react";
import { FaPen } from "react-icons/fa";

function StudentEducation() {
  const [isEditing, setIsEditing] = useState(false);
  const [educationData, setEducationData] = useState({
    uniName: "Cairo University",
    facultyName: "Faculty of Engineering",
    major: "Computer Engineering",
    track: "Frontend",
    entryYear: "2021",
    graduationYear: "2025",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEducationData({ ...educationData, [name]: value });
  };

  const handleSave = () => {
    console.log("Saving education data:", educationData);
    setIsEditing(false);
  };

  return (
    <div className="mt-6 bg-white border border-[#C9C9C9] rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Education</h2>

        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-transparent cursor-pointer font-bold text-[#8D9499] border border-[#C9C9C9] rounded-md hover:bg-gray-100"
          >
            <FaPen size={15} />
            Edit Education
          </button>
        )}
      </div>

      {isEditing ? (
        // وضع التحرير
        <div className="flex gap-6">
          {/* العمود الأول */}
          <div className="w-1/2 space-y-4">
            <div>
              <label className="block text-sm text-[#8D9499]">
                University Name
              </label>
              <input
                type="text"
                name="uniName"
                value={educationData.uniName}
                onChange={handleChange}
                className="text-[#3A4C59] font-semibold border border-gray-300 px-2 py-1 rounded-md w-full mt-1"
              />
            </div>

            <div>
              <label className="block text-sm text-[#8D9499]">Major</label>
              <input
                type="text"
                name="major"
                value={educationData.major}
                onChange={handleChange}
                className="text-[#3A4C59] font-semibold border border-gray-300 px-2 py-1 rounded-md w-full mt-1"
              />
            </div>

            <div>
              <label className="block text-sm text-[#8D9499]">Entry Year</label>
              <input
                type="text"
                name="entryYear"
                value={educationData.entryYear}
                onChange={handleChange}
                className="text-[#3A4C59] font-semibold border border-gray-300 px-2 py-1 rounded-md w-full mt-1"
              />
            </div>
          </div>

          {/* العمود الثاني */}
          <div className="w-1/2 space-y-4">
            <div>
              <label className="block text-sm text-[#8D9499]">
                Faculty Name
              </label>
              <input
                type="text"
                name="facultyName"
                value={educationData.facultyName}
                onChange={handleChange}
                className="text-[#3A4C59] font-semibold border border-gray-300 px-2 py-1 rounded-md w-full mt-1"
              />
            </div>

            <div>
              <label className="block text-sm text-[#8D9499]">Track</label>
              <input
                type="text"
                name="track"
                value={educationData.track}
                onChange={handleChange}
                className="text-[#3A4C59] font-semibold border border-gray-300 px-2 py-1 rounded-md w-full mt-1"
              />
            </div>

            <div>
              <label className="block text-sm text-[#8D9499]">
                Graduation Year (Expected)
              </label>
              <input
                type="text"
                name="graduationYear"
                value={educationData.graduationYear}
                onChange={handleChange}
                className="text-[#3A4C59] font-semibold border border-gray-300 px-2 py-1 rounded-md w-full mt-1"
              />
            </div>
          </div>
        </div>
      ) : (
        // وضع العرض
        <div className="flex gap-6 text-gray-700">
          <div>
            <p className="text-[#8D9499] font-semibold">University Name</p>
            <p className="text-[#3A4C59] font-semibold">
              {educationData.uniName}
            </p>

            <p className="text-[#8D9499] font-semibold mt-4">Major</p>
            <p className="text-[#3A4C59] font-semibold">
              {educationData.major}
            </p>

            <p className="text-[#8D9499] font-semibold mt-4">Entry Year</p>
            <p className="text-[#3A4C59] font-semibold">
              {educationData.entryYear}
            </p>
          </div>

          <div>
            <p className="text-[#8D9499] font-semibold">Faculty Name</p>
            <p className="text-[#3A4C59] font-semibold">
              {educationData.facultyName}
            </p>

            <p className="text-[#8D9499] font-semibold mt-4">Track</p>
            <p className="text-[#3A4C59] font-semibold">
              {educationData.track}
            </p>

            <p className="text-[#8D9499] font-semibold mt-4">
              Graduation Year (Expected)
            </p>
            <p className="text-[#3A4C59] font-semibold">
              {educationData.graduationYear}
            </p>
          </div>
        </div>
      )}

      {/* أزرار الحفظ والإلغاء */}
      {isEditing && (
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
      )}
    </div>
  );
}

export default StudentEducation;
