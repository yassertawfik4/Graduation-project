import { useEffect, useState } from "react";
import axiosInstance from "../../Api/axiosInstance";

function CompanyFounding({ company }) {
  const [getFounding, setGetFounding] = useState({
    name: "",
    industry: "",
    description: "",
    websiteUrl: "",
    companySize: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setGetFounding((prev) => ({ ...prev, [name]: value }));
  };
  const handleGetFounding = async () => {
    try {
      const response = await axiosInstance.get(`Company/profiles/basic`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessUsertoken")}`,
        },
      });
      console.log(response.data);
      setGetFounding(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetFounding();
  }, []);
  return (
    <div className="border border-[#C9C9C9] rounded-lg p-4 bg-white shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold mb-4 font-[roboto]">Founding Info</h2>
        <button
          onClick={() => setIsEditing(true)}
          className="cursor-pointer border border-[#C9C9C9] rounded-lg px-4 py-2"
        >
          Edit
        </button>
      </div>
      {isEditing ? (
        <div className="grid grid-cols-2 gap-4 text-gray-700">
          {/* العمود الأول */}
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <label className="text-[#8D9499] font-semibold">
                Industry Type
              </label>
              <input
                type="text"
                name="industry"
                value={getFounding.industry}
                onChange={handleChange}
                className="border border-[#C9C9C9] rounded-lg px-4 py-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[#8D9499] font-semibold">
                Industry Type
              </label>
              <input
                type="text"
                className="border border-[#C9C9C9] rounded-lg px-4 py-2"
              />
            </div>
          </div>

          {/* العمود الثاني */}
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <label className="text-[#8D9499] font-semibold">
                Industry Type
              </label>
              <input
                type="text"
                className="border border-[#C9C9C9] rounded-lg px-4 py-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[#8D9499] font-semibold">
                Industry Type
              </label>
              <input
                type="text"
                className="border border-[#C9C9C9] rounded-lg px-4 py-2"
              />
            </div>
          </div>
        </div>
      ) : (
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

            <p className="text-[#8D9499] font-semibold mt-4">Company Website</p>
            <p className="text-[#3A4C59] font-semibold">website</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CompanyFounding;
