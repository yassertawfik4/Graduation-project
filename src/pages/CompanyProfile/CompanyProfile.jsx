import { useEffect, useState } from "react";
import SideNav from "../StudentProfilePage/sideNav/SideNav";
import CompanyProfileHeader from "./CompanyProfileHeader";
import axiosInstance from "../../Api/axiosInstance";
import { useParams } from "react-router-dom";
import CompanyPosts from "./CompanyPosts";
import CompanyFounding from "./CompanyFounding";
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
        <CompanyProfileHeader
          company={company}
          handleGetCompany={handleGetCompany}
        />

        {/* Founding Info */}
        <CompanyFounding company={company} />

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
        <CompanyPosts company={company} />
      </div>
    </div>
  );
}

export default CompanyProfile;
