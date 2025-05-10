import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axiosInstance from "../../Api/axiosInstance";

function CompanyContact({ company, handleGetCompany }) {
  const [isEditing, setIsEditing] = useState(false);
  const [contact, setContact] = useState({
    governorate: "",
    city: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };
  const handleSave = () => {
    handleGetCompany();
  };
  const handleGetContact = async () => {
    const response = await axiosInstance.get(`Company/profiles/contact`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessUsertoken")}`,
      },
    });
  };
  const handleEditContact = async () => {
    try {
      await axiosInstance.patch(`Company/profiles/contact`, {
        email: contact.email,
        address: contact.address,
      });
      Swal.fire("Updated!", "Your profile has been updated.", "success");
      setIsEditing(false);
      handleGetCompany();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetContact();
  }, []);
  return (
    <div className="border border-[#C9C9C9] rounded-lg p-4 bg-white shadow-sm">
      <h2 className="text-lg font-bold mb-4 font-[roboto]">Contact</h2>
      <div className="grid grid-cols-2 gap-4 text-gray-700">
        {/* العمود الأول */}
        <div>
          <p className="text-[#8D9499] font-semibold">Email</p>
          <p className="text-[#3A4C59] font-semibold">
            {company?.address?.email}
          </p>
        </div>

        {/* العمود الثاني */}
        <div>
          <p className="text-[#8D9499] font-semibold">Address</p>
          <p className="text-[#3A4C59] font-semibold">
            {company?.address?.governorate} , {company?.address?.city}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CompanyContact;
