import { ErrorMessage, Field, useFormikContext } from "formik";
import { useState } from "react";
import { FaGithub, FaGoogle, FaLock, FaUserTie } from "react-icons/fa";
import { LuEyeClosed } from "react-icons/lu";
import { MdEmail } from "react-icons/md";
import { PiEye } from "react-icons/pi";
import registerImage from "/public/images/registerImage.png";
import { AiFillExclamationCircle } from "react-icons/ai";

function RegisterStepOne({ setIsStudent, handleSubmit }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isStudentSubmitting, setIsStudentSubmitting] = useState(false);
  const [isCompanySubmitting, setIsCompanySubmitting] = useState(false);

  const { isSubmitting, isValid, dirty } = useFormikContext();

  const handleStudentClick = async () => {
    setIsStudent(true);
    setIsStudentSubmitting(true);
    try {
      await handleSubmit();
    } finally {
      setIsStudentSubmitting(false);
    }
  };

  const handleCompanyClick = () => {
    setIsStudent(false);
    setIsCompanySubmitting(true);
    handleSubmit().finally(() => {
      setIsCompanySubmitting(false);
    });
  };

  return (
    <div className="flex justify-center items-center gap-36">
      <div className="sm:w-[404px] px-5">
        <h2 className="font-[rubik] font-bold text-center sm:text-3xl text-xl text-[#010318] py-5">
          Create an account
        </h2>

        {/* Username */}
        <div className="relative w-full my-4">
          <FaUserTie className="absolute left-3 top-6 transform -translate-y-1/2 text-gray-500 text-xl" />
          <Field
            type="text"
            name="username"
            placeholder="User Name"
            className="w-full py-2 px-10 border font-semibold border-[#010318] opacity-80 rounded-lg mt-1"
          />
          <ErrorMessage
            name="username"
            render={(msg) => (
              <div className="text-[14px] text-red-500 font-medium font-[roboto] flex gap-2 items-center my-1">
                <AiFillExclamationCircle size={16} />
                <span>{msg}</span>
              </div>
            )}
          />
        </div>

        {/* Email */}
        <div className="relative w-full my-4">
          <MdEmail className="absolute left-3 top-6 transform -translate-y-1/2 text-gray-500 text-xl" />
          <Field
            type="email"
            name="email"
            placeholder="Email"
            className="w-full py-2 px-10 border font-semibold border-[#010318] opacity-80 rounded-lg mt-1"
          />
          <ErrorMessage
            name="email"
            render={(msg) => (
              <div className="text-[14px] text-red-500 font-medium font-[roboto] flex gap-2 items-center my-1">
                <AiFillExclamationCircle size={16} />
                <span>{msg}</span>
              </div>
            )}
          />
        </div>

        {/* Password */}
        <div className="relative w-full my-4">
          <FaLock className="absolute left-3 top-6 transform -translate-y-1/2 text-gray-500 text-xl" />
          <Field
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="w-full py-2 px-10 border border-[#010318] font-semibold opacity-80 rounded-lg mt-1"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 cursor-pointer flex items-center text-gray-500"
          >
            {showPassword ? <PiEye size={20} /> : <LuEyeClosed size={20} />}
          </button>
          <ErrorMessage
            name="password"
            render={(msg) => (
              <div className="text-[14px] text-red-500 font-medium font-[roboto] flex gap-2 items-center my-1">
                <AiFillExclamationCircle size={16} />
                <span>{msg}</span>
              </div>
            )}
          />
        </div>

        {/* Remember Me */}
        <div className="flex items-center">
          <Field
            type="checkbox"
            name="rememberMe"
            id="rememberMe"
            className="mr-2 h-4 w-4 bg-[rgba(153,153,153,0.2)] border-gray-300 rounded focus:ring-2 focus:ring-blue-500 checked:bg-blue-600"
          />
          <label
            htmlFor="rememberMe"
            className="text-sm text-[#010318CC] font-medium font-[rubik] cursor-pointer"
          >
            Remember me
          </label>
        </div>

        {/* Submit Buttons */}
        <div className="text-center">
          <button
            type="button"
            disabled={isSubmitting || !isValid || !dirty}
            onClick={handleStudentClick}
            className={`bg-[#3A4C59] text-white py-2 border-2 border-[#3A4C59] 
            transition duration-300 ease-in-out rounded-lg font-[rubik] font-medium  w-full my-4
            disabled:bg-gray-400
            ${
              !isValid || !dirty
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer hover:bg-white hover:text-[#3A4C59]"
            }
          `}
          >
            {isStudentSubmitting ? "Registering..." : "Continue as student"}
          </button>
          <button
            type="button"
            onClick={handleCompanyClick}
            disabled={isSubmitting || !isValid || !dirty}
            className={`bg-[#3A4C59] text-white py-2 border-2 border-[#3A4C59] 
            transition duration-300 ease-in-out rounded-lg font-[rubik] font-medium  w-full 
            disabled:bg-gray-400
            ${
              !isValid || !dirty
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer hover:bg-white hover:text-[#3A4C59]"
            }
          `}
          >
            {isCompanySubmitting ? "Registering..." : "Continue as company"}
          </button>
        </div>

        {/* Social Sign Up */}
        <div className="text-center pb-7 pt-4">
          <h3 className="font-[rubik] text-[#010318] opacity-80">
            Or sign up using
          </h3>
          <div className="flex justify-center items-center gap-4 pt-5">
            <FaGithub
              size={30}
              className="text-[£3A4C59] opacity-80 cursor-pointer"
            />
            <FaGoogle
              size={30}
              className="text-[£3A4C59] opacity-80 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Right Side Image */}
      <div className="lg:block hidden">
        <img
          loading="lazy"
          decoding="async"
          src={registerImage}
          alt="Register"
        />
        <h2 className="font-[rubik] font-bold text-start leading-13 my-4 tracking-[3.75px] text-3xl text-[#3A4C59]">
          Expand <br /> Your Opportunities
        </h2>
      </div>
    </div>
  );
}

export default RegisterStepOne;
