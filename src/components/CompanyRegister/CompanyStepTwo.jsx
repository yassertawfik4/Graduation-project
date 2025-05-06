import { ErrorMessage, Field, useFormikContext } from "formik";
import { useState } from "react";
import { AiFillExclamationCircle } from "react-icons/ai";
import { FaUserTie } from "react-icons/fa";
import Swal from "sweetalert2";

function CompanyStepTwo({
  handleNext,
  handleSkip,
  isSubmitting,
  isValid,
  dirty,
}) {
  const { setFieldValue, values } = useFormikContext();
  const [previewImage, setPreviewImage] = useState(null);
  const handleImageChange = (e) => {
    const file = e.currentTarget.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire({
          icon: "error",
          title: "File too large",
          text: "Please upload an image smaller than 5MB.",
        });
        return;
      }
      if (!file.type.startsWith("image/")) {
        Swal.fire({
          icon: "error",
          title: "Invalid file type",
          text: "Please upload an image file.",
        });
        return;
      }
      setFieldValue("profilePictureUrl", file);
      console.log(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        setFieldValue("profilePictureUrl", base64Image);
        setPreviewImage(base64Image);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div>
      <div className="w-[404px] px-5 py-10">
        <h2 className="font-[rubik] font-bold text-center text-3xl text-[#010318] py-5">
          Complete Profile{" "}
        </h2>
        {/*image Company*/}

        <div className="flex items-center justify-center relative">
          <label className="cursor-pointer relative">
            <img
              loading="lazy"
              decoding="async"
              className="w-[170px] h-[170px] rounded-full object-cover border"
              src={
                previewImage ||
                values.profilePictureUrl ||
                "/images/profileImage.png"
              }
              alt="profile"
            />
            <div className="absolute bottom-2 right-2 bg-[#3A4C59] text-white p-2 rounded-full">
              📷
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>
        {/*name Company*/}
        <div className="relative w-full my-4">
          <FaUserTie className="absolute left-3 top-6 transform -translate-y-1/2 text-gray-500 text-xl" />
          <div className="relative">
            <Field
              type="text"
              name="companyName"
              placeholder="Company Name"
              className="w-full py-2 px-10 border font-semibold border-[#010318] opacity-80 rounded-lg mt-1"
            />
            {/* نجمة حمراء */}
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 font-bold text-red-500">
              *
            </span>
          </div>
          <ErrorMessage
            name="companyName"
            render={(msg) => (
              <div className="text-[14px] text-red-500 font-medium font-[roboto] flex gap-2 items-center my-1">
                <AiFillExclamationCircle size={16} />
                <span>{msg}</span>
              </div>
            )}
          />
        </div>
        {/*Tax Id Company*/}

        <div className="relative w-full my-4">
          <FaUserTie className="absolute left-3 top-6 transform -translate-y-1/2 text-gray-500 text-xl" />
          <div className="relative">
            <Field
              type="text"
              name="taxId"
              placeholder="taxId"
              className="w-full py-2 px-10 border font-semibold border-[#010318] opacity-80 rounded-lg mt-1"
            />
            {/* نجمة حمراء */}
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 font-bold text-red-500">
              *
            </span>
          </div>
          <ErrorMessage
            name="taxId"
            render={(msg) => (
              <div className="text-[14px] text-red-500 font-medium font-[roboto] flex gap-2 items-center my-1">
                <AiFillExclamationCircle size={16} />
                <span>{msg}</span>
              </div>
            )}
          />
        </div>
        {/*governorate Company*/}
        <div className="relative w-full my-4">
          <FaUserTie className="absolute left-3 top-6 transform -translate-y-1/2 text-gray-500 text-xl" />
          <div className="relative">
            <Field
              type="text"
              name="governorate"
              placeholder="governorate"
              className="w-full py-2 px-10 border font-semibold border-[#010318] opacity-80 rounded-lg mt-1"
            />
            {/* نجمة حمراء */}
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 font-bold text-red-500">
              *
            </span>
          </div>
          <ErrorMessage
            name="governorate"
            render={(msg) => (
              <div className="text-[14px] text-red-500 font-medium font-[roboto] flex gap-2 items-center my-1">
                <AiFillExclamationCircle size={16} />
                <span>{msg}</span>
              </div>
            )}
          />
        </div>

        <button
          disabled={isSubmitting || !isValid || !dirty}
          type="button"
          className={`bg-[#3A4C59]  text-white py-2 mt-4  w-full text-center px-5 rounded-lg ${
            !isValid || !dirty
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer"
          }`}
          onClick={handleNext}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default CompanyStepTwo;
