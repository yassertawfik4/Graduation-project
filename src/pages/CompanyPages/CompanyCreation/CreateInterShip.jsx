import { useState } from "react";
import axiosInstance from "../../../Api/axiosInstance";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function CreateInterShip() {
  const navigate = useNavigate();
  const [internShip, setInternShip] = useState({
    title: "",
    about: "",
    keyResponsibilities: "",
    requirements: "",
    type: "",
    workingModel: "",
    salary: 0,
    currency: "EGP",
    startDate: "",
    endDate: "",
    applicationDeadline: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    about: "",
    keyResponsibilities: "",
    requirements: "",
    type: "",
    workingModel: "",
    salary: "",
    startDate: "",
    endDate: "",
    applicationDeadline: "",
  });

  const validate = (name, value) => {
    switch (name) {
      case "title":
        return value ? "" : "Internship title is required";
      case "about":
        return value ? "" : "About internship is required";
      case "keyResponsibilities":
        return value ? "" : "Responsibilities are required";
      case "requirements":
        return value ? "" : "Requirements are required";
      case "type":
        return value ? "" : "Internship type is required";
      case "workingModel":
        return value ? "" : "Working model is required";
      case "salary":
        return value >= 0 ? "" : "Salary must be a positive number";
      case "startDate":
        return value ? "" : "Start date is required";
      case "endDate":
        return value ? "" : "End date is required";
      case "applicationDeadline":
        return value ? "" : "Application deadline is required";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInternShip({
      ...internShip,
      [name]: name === "salary" ? Number(value) : value,
    });

    // Validate the field
    setErrors({
      ...errors,
      [name]: validate(name, value),
    });
  };

  const formatDateToISO = (dateStr) => {
    return dateStr ? new Date(dateStr).toISOString() : "";
  };

  const validateAllFields = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(internShip).forEach((field) => {
      const error = validate(field, internShip[field]);
      newErrors[field] = error;
      if (error) isValid = false;
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields before submission
    if (!validateAllFields()) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fill in all required fields correctly.",
      });
      return;
    }

    const formattedData = {
      ...internShip,
      startDate: formatDateToISO(internShip.startDate),
      endDate: formatDateToISO(internShip.endDate),
      applicationDeadline: formatDateToISO(internShip.applicationDeadline),
    };

    console.log(formattedData);

    try {
      const response = await axiosInstance.post(
        `Internship/CreateInternship`,
        formattedData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessUsertoken")}`,
          },
        }
      );
      console.log(response.data);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Internship created successfully.",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: error.response?.data?.message || "Failed to create internship.",
      });
    }
  };

  const errorStyle = {
    color: "red",
    fontSize: "16px",
    fontWeight: "500",
    marginTop: "4px",
  };

  return (
    <div className="my-10">
      <div className="container mx-auto px-3">
        <div className="w-full shadow-lg rounded-[32px] py-10 px-12">
          <h2 className="text-[24px] text-[#021B1A] font-medium">
            Create new internship
          </h2>
          <form onSubmit={handleSubmit} className="py-4 space-y-6">
            {/* Internship Tittle*/}
            <div className="flex flex-col gap-2">
              <label className="text-[16px] font-semibold">
                Internship Tittle
              </label>
              <input
                className="border border-[#F1F7F6] px-5 py-4 rounded-[8px] outline-none text-[#707D7D]"
                name="title"
                type="text"
                value={internShip.title}
                onChange={handleChange}
                placeholder="Add internship tittle, role, etc"
              />
              {errors.title && <p style={errorStyle}>{errors.title}</p>}
            </div>
            {/* Internship types*/}
            <div className="flex gap-4 items-center w-full">
              {/* Internship type*/}
              <div className="flex flex-col gap-2 w-full">
                <label className="text-[16px] font-semibold">
                  Internship Type
                </label>
                <select
                  name="type"
                  value={internShip.type}
                  onChange={handleChange}
                  className="border border-[#F1F7F6] px-5 py-4 rounded-[8px] outline-none text-[#707D7D]"
                >
                  <option value="" disabled>
                    Select Type
                  </option>
                  <option value="Traditional">InternShip</option>
                </select>
                {errors.type && <p style={errorStyle}>{errors.type}</p>}
              </div>
              {/* Internship workingModel*/}
              <div className="flex flex-col gap-2 w-full">
                <label className="text-[16px] font-semibold">
                  Working model
                </label>
                <select
                  name="workingModel"
                  value={internShip.workingModel}
                  onChange={handleChange}
                  className="border border-[#F1F7F6] px-5 py-4 rounded-[8px] outline-none text-[#707D7D]"
                >
                  <option value="" disabled>
                    Select Type
                  </option>
                  <option value="Hybrid">Hybrid</option>
                </select>
                {errors.workingModel && (
                  <p style={errorStyle}>{errors.workingModel}</p>
                )}
              </div>
            </div>
            <div className="flex gap-4 items-center w-full">
              {/* Internship startDate*/}
              <div className="flex flex-col gap-2 w-full">
                <label className="text-[16px] font-semibold">start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={internShip.startDate}
                  onChange={handleChange}
                  className="border border-[#F1F7F6] px-5 py-4 rounded-[8px] outline-none text-[#707D7D]"
                />
                {errors.startDate && (
                  <p style={errorStyle}>{errors.startDate}</p>
                )}
              </div>
              {/* Internship endDate*/}
              <div className="flex flex-col gap-2 w-full">
                <label className="text-[16px] font-semibold">
                  Expiration Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={internShip.endDate}
                  onChange={handleChange}
                  className="border border-[#F1F7F6] px-5 py-4 rounded-[8px] outline-none text-[#707D7D]"
                />
                {errors.endDate && <p style={errorStyle}>{errors.endDate}</p>}
              </div>
              {/* Internship applicationDeadline*/}
              <div className="flex flex-col gap-2 w-full">
                <label className="text-[16px] font-semibold">
                  Application Deadline
                </label>
                <input
                  type="date"
                  name="applicationDeadline"
                  value={internShip.applicationDeadline}
                  onChange={handleChange}
                  className="border border-[#F1F7F6] px-5 py-4 rounded-[8px] outline-none text-[#707D7D]"
                />
                {errors.applicationDeadline && (
                  <p style={errorStyle}>{errors.applicationDeadline}</p>
                )}
              </div>
            </div>
            {/* Internship salary*/}
            <div className="flex flex-col gap-2">
              <label className="text-[16px] font-semibold">Salary</label>
              <div className="flex items-center w-full">
                <input
                  className="border border-[#F1F7F6] px-5 py-4 rounded-[8px] outline-none text-[#707D7D] w-full"
                  name="salary"
                  type="number"
                  value={internShip.salary}
                  onChange={handleChange}
                  placeholder="Add internship tittle, role, etc"
                  min={0}
                />
                <select
                  name="currency"
                  value={internShip.currency}
                  onChange={handleChange}
                  className="cursor-pointer text-[16px] font-normal bg-[#AACBC4] px-5 py-4 text-[#05302B] rounded-[8px] outline-none"
                >
                  <option value="EGP">EGP</option>
                  <option value="USD">USD</option>
                </select>
              </div>
              {errors.salary && <p style={errorStyle}>{errors.salary}</p>}
            </div>
            {/* Internship about*/}
            <div className="flex flex-col gap-2">
              <div className="my-4">
                <h2 className="text-[#021B1A] text-[18px] font-bold">
                  Description & Responsibility
                </h2>
              </div>
              <label className="text-[16px] font-semibold">
                About internship
              </label>
              <textarea
                className="border border-[#F1F7F6] px-5 py-4 rounded-[8px] outline-none text-[#707D7D]"
                name="about"
                value={internShip.about}
                onChange={handleChange}
                placeholder="Add your internship description..."
                rows={4}
              />
              {errors.about && <p style={errorStyle}>{errors.about}</p>}
            </div>
            {/* Internship keyResponsibilities*/}
            <div className="flex flex-col gap-2">
              <label className="text-[16px] font-semibold">
                Responsibilities
              </label>
              <textarea
                className="border border-[#F1F7F6] px-5 py-4 rounded-[8px] outline-none text-[#707D7D]"
                name="keyResponsibilities"
                value={internShip.keyResponsibilities}
                onChange={handleChange}
                placeholder="Add your internship responsibilities..."
                rows={4}
              />
              {errors.keyResponsibilities && (
                <p style={errorStyle}>{errors.keyResponsibilities}</p>
              )}
            </div>
            {/* Internship requirements*/}
            <div className="flex flex-col gap-2">
              <label className="text-[16px] font-semibold">Requirements</label>
              <textarea
                className="border border-[#F1F7F6] px-5 py-4 rounded-[8px] outline-none text-[#707D7D]"
                name="requirements"
                value={internShip.requirements}
                onChange={handleChange}
                placeholder="Add your internship requirements..."
                rows={4}
              />
              {errors.requirements && (
                <p style={errorStyle}>{errors.requirements}</p>
              )}
            </div>
            <div className="flex justify-between items-center my-2">
              <button
                type="submit"
                className="bg-[#021B1A] text-white px-5 py-4 rounded-[8px] cursor-pointer"
              >
                Post internship
              </button>
              <button
                type="button"
                onClick={() => navigate("/Post")}
                className="text-[#095544] px-5 py-4 rounded-[8px] cursor-pointer border border-[#095544]"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateInterShip;
