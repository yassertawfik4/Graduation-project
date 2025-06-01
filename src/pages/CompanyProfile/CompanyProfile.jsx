import { useEffect, useState } from "react";
import SideNav from "../StudentProfilePage/sideNav/SideNav";
import CompanyProfileHeader from "./CompanyProfileHeader";
import axiosInstance from "../../Api/axiosInstance";
import CompanyPosts from "./CompanyPosts";
import CompanyFounding from "./CompanyFounding";
import CompanyContact from "./CompanyContact";
function CompanyProfile() {
  const [company, setCompany] = useState({});
  
  // const { companyid } = useParams();
  const handleGetCompany = async () => {
    try {
      const response = await axiosInstance.get(`Company/profiles`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessUsertoken")}`,
        },
      });

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
        <CompanyFounding
          company={company}
          handleGetCompany={handleGetCompany}
        />

        {/* Contact */}
        <CompanyContact company={company} handleGetCompany={handleGetCompany} />

        {/* Recent Posts */}
        <CompanyPosts company={company} handleGetCompany={handleGetCompany} />
      </div>
    </div>
  );
}

export default CompanyProfile;
