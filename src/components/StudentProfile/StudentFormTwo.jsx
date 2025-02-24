import { ErrorMessage, Field } from "formik";
import { FaArrowRight, FaPhoneAlt, FaUserTie } from "react-icons/fa";
import profileimage from "/public/images/profileImage.png";
import { AiFillExclamationCircle } from "react-icons/ai";
import { useState } from "react";
function StudentFormTwo({
  handleNext,
  handleSkip,
  isSubmitting,
  isValid,
  dirty,
}) {
  const [previewImage, setPreviewImage] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="w-[920px] relative flex items-center justify-center">
      <div className="w-[404px] px-5 py-10">
        <h2 className="font-[rubik] font-bold text-center text-3xl text-[#010318] py-5">
          Complete Profile{" "}
        </h2>
        <div className="flex items-center justify-center relative">
          <label className="cursor-pointer relative">
            <img
              loading="lazy"
              decoding="async"
              className="w-[170px] h-[170px] rounded-full object-cover border"
              src={previewImage || "/images/profileImage.png"}
              alt="profile"
            />
            {/* أيقونة الكاميرا فوق الصورة */}
            <div className="absolute bottom-2 right-2 bg-[#3A4C59] text-white p-2 rounded-full">
              📷
            </div>
            {/* input file مخفي */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>
        <div className="relative w-full my-4">
          <FaUserTie className="absolute left-3 top-6 transform -translate-y-1/2 text-gray-500 text-xl" />
          <div className="relative">
            <Field
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="w-full py-2 px-10 border font-semibold border-[#010318] opacity-80 rounded-lg mt-1"
            />
            {/* نجمة حمراء */}
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 font-bold text-red-500">
              *
            </span>
          </div>
          <ErrorMessage
            name="fullName"
            render={(msg) => (
              <div className="text-[14px] text-red-500 font-medium font-[roboto] flex gap-2 items-center my-1">
                <AiFillExclamationCircle size={16} />
                <span>{msg}</span>
              </div>
            )}
          />
        </div>
        <div className=" w-full my-4">
          <Field
            as="textarea"
            name="bio"
            id="bio"
            placeholder="Tell us about yourself..."
            className="w-full py-2 px-4 border font-semibold border-[#010318] opacity-80 rounded-lg mt-1"
          />
        </div>
        <div className="relative w-full my-4">
          <Field
            type="number"
            name="age"
            min="15"
            placeholder="Age"
            className="w-full py-2 px-4 border font-semibold border-[#010318] opacity-80 rounded-lg mt-1"
          />
        </div>
        <div className="relative w-full my-4">
          <FaPhoneAlt className="absolute left-3 top-6 transform -translate-y-1/2 text-gray-500 text-xl" />
          <Field
            type="text" // بدل number بـ text
            name="phoneNumber"
            placeholder="Phone Number"
            className="w-full py-2 px-10 border font-semibold border-[#010318] opacity-80 rounded-lg mt-1"
          />
          {/* نجمة حمراء */}
          <span className="absolute right-3 top-6 transform -translate-y-1/2 font-bold text-red-500">
            *
          </span>

          <ErrorMessage
            name="phoneNumber"
            render={(msg) => (
              <div className="text-[14px] text-red-600 font-medium font-[roboto] flex gap-2 items-center my-1">
                <AiFillExclamationCircle size={16} />
                <span>{msg}</span>
              </div>
            )}
          />
        </div>
        <div className="relative w-full my-4">
          <FaUserTie className="absolute left-3 top-6 transform -translate-y-1/2 text-gray-500 text-xl" />
          <Field
            as="select"
            name="gender"
            className="w-full py-2 px-10 border font-semibold  border-[#010318] opacity-80 rounded-lg mt-1"
          >
            <option value="" disabled>
              Choose Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Field>
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
      <div className="absolute top-0 text-end w-full px-20 pt-5">
        {/* <button
          className="border font-semibold py-2 px-2 border-[#3A4C59] cursor-pointer rounded-lg"
          type="button"
          onClick={handleNext}
        >
          <FaArrowRight />
        </button> */}
        <button
          className="border font-semibold border-[#3A4C59] py-2 px-2 cursor-pointer rounded-lg"
          type="button"
          onClick={handleSkip}
        >
          Skip
        </button>
      </div>
    </div>
  );
}

export default StudentFormTwo;
