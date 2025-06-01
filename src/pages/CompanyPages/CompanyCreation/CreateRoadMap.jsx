import { useState } from "react";
import axiosInstance from "../../../Api/axiosInstance";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function CreateRoadMap() {
  const navigate = useNavigate();
  const [roadmap, setRoadmap] = useState({
    title: "",
    description: "",
    
    technology: "",
    isPremium: false,
    price: 0,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!roadmap.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!roadmap.technology.trim()) {
      newErrors.technology = "Technology is required";
    }
    if (roadmap.isPremium && (!roadmap.price || roadmap.price <= 0)) {
      newErrors.price = "يجب إدخال سعر صالح عند اختيار Premium";
    }
    if (!roadmap.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (roadmap.isPremium === "") {
      newErrors.isPremium = "Please select if the roadmap is premium";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "isPremium") {
      newValue = value === "true";

      // لو المستخدم رجعها false، نخلي السعر بصفر تلقائيًا
      if (!newValue) {
        setRoadmap((prev) => ({
          ...prev,
          [name]: newValue,
          price: 0,
        }));
        return;
      }
    }

    if (name === "price") {
      newValue = parseFloat(value);
    }

    setRoadmap({ ...roadmap, [name]: newValue });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fill in all required fields correctly",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axiosInstance.post(`Roadmap/create`, roadmap, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessUsertoken")}`,
        },
      });

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Roadmap created successfully",
      });
      console.log(response.data);

      navigate(`/post/addRoadmap/${response.data}/addSectionRoadmap`);
      // Reset form after successful submission
      setRoadmap({
        title: "",
        description: "",
        technology: "",
        isPremium: false,
        price: 0,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.message || "Failed to create roadmap",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="my-10">
      <div className="container mx-auto px-3">
        <div className="w-full shadow-lg rounded-[32px] py-10 px-12">
          <h2 className="text-[24px] text-[#021B1A] font-medium">
            Create new Roadmap
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-4 w-full my-4">
              <div className="flex flex-col gap-2 w-full">
                <label>Roadmap Title *</label>
                <input
                  className={`border ${
                    errors.title ? "border-red-500" : "border-[#F1F7F6]"
                  } px-5 py-4 rounded-[8px] outline-none text-[#707D7D]`}
                  name="title"
                  type="text"
                  value={roadmap.title}
                  onChange={handleChange}
                  placeholder="Add internship title, role, etc"
                />
                {errors.title && (
                  <span className="text-red-500 text-sm">{errors.title}</span>
                )}
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label>Roadmap technology *</label>
                <input
                  className={`border ${
                    errors.technology ? "border-red-500" : "border-[#F1F7F6]"
                  } px-5 py-4 rounded-[8px] outline-none text-[#707D7D]`}
                  name="technology"
                  type="text"
                  value={roadmap.technology}
                  onChange={handleChange}
                  placeholder="Add RoadMap technology, Go, React, etc"
                />
                {errors.technology && (
                  <span className="text-red-500 text-sm">
                    {errors.technology}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label>isPremium *</label>
                <select
                  className={`border ${
                    errors.isPremium ? "border-red-500" : "border-[#F1F7F6]"
                  } px-5 py-4 rounded-[8px] outline-none text-[#707D7D]`}
                  name="isPremium"
                  value={roadmap.isPremium}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="true">true</option>
                  <option value="false">false</option>
                </select>
                {errors.isPremium && (
                  <span className="text-red-500 text-sm">
                    {errors.isPremium}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4 w-full my-4">
              <div className="flex flex-col gap-2 w-full">
                <label>Price *</label>
                <input
                  className={`border ${
                    errors.isPremium ? "border-red-500" : "border-[#F1F7F6]"
                  } px-5 py-4 rounded-[8px] outline-none text-[#707D7D] ${
                    roadmap.isPremium ? "" : "cursor-not-allowed"
                  }`}
                  name="price"
                  type="number"
                  disabled={!roadmap.isPremium}
                  value={roadmap.price}
                  onChange={handleChange}
                  placeholder="Add price"
                />
                {errors.price && (
                  <span className="text-red-500 text-sm">{errors.price}</span>
                )}
              </div>
            </div>
            <div className="my-4">
              <div className="flex flex-col gap-2 w-full">
                <label>description *</label>
                <textarea
                  className={`border ${
                    errors.description ? "border-red-500" : "border-[#F1F7F6]"
                  } px-5 py-4 rounded-[8px] outline-none text-[#707D7D]`}
                  name="description"
                  value={roadmap.description}
                  onChange={handleChange}
                  placeholder="add description"
                  rows={4}
                />
                {errors.description && (
                  <span className="text-red-500 text-sm">
                    {errors.description}
                  </span>
                )}
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#021B1A] text-white px-6 py-3 rounded-[8px] hover:bg-opacity-90 disabled:opacity-50"
              >
                {isSubmitting ? "Creating..." : "Create Roadmap"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateRoadMap;
