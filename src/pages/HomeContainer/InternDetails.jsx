import { useState } from "react";
import { useParams } from "react-router";
import axiosInstance from "../../Api/axiosInstance";

function InternDetails() {
  const { id } = useParams();
  const [internDetails, setInternDetails] = useState([]);
  const handelGetInternDetails = async () => {
    try {
      const response = await axiosInstance.get(
        `Internship/GetInternshipById/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessUsertoken")}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div>sacdsac</div>
    </div>
  );
}

export default InternDetails;
