import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { FaArrowRightLong, FaLock } from "react-icons/fa6";
import { forgetPassword } from "../../../Api/userAuth";
import { toast, ToastContainer } from "react-toastify";
import { PiEye } from "react-icons/pi";
import { LuEyeClosed } from "react-icons/lu";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validate = (values) => {
    const errors = {};
    if (!values.password) {
      errors.password = "Password Is Required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    return errors;
  };
  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    const data = await forgetPassword(values.email);
    if (data) {
      toast.success("Request sent successfully, check your email", {
        position: "top-right",
        autoClose: 2000,
      });
    }
    setLoading(false);
    setSubmitting(false);
  };

  return (
    <div className="flex justify-center items-center my-16">
      <ToastContainer position="top-right" autoClose={5000} />
      <div className="bg-[rgba(153,153,153,0.2)] w-[1032px] h-[672px] rounded-xl flex justify-center items-center">
        <div className="text-center ">
          <h2 className="font-[rubik] font-bold text-3xl text-[#010318] py-5">
            Enter your new password
          </h2>
          <Formik
            initialValues={{ email: "" }}
            validate={validate}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting ,values }) => (
              <Form className="mt-5">
                <div className="relative w-full my-5">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className="w-full py-2 px-10 border border-[#010318] rounded-lg font-medium"
                  />
                  
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 cursor-pointer flex items-center text-gray-500"
                  >
                    {showPassword ? (
                      <PiEye size={20} />
                    ) : (
                      <LuEyeClosed size={20} />
                    )}
                  </button>
                </div>
                <div className="relative w-full">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
                  <Field
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="w-full py-2 px-10 border border-[#010318] rounded-lg font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-3 cursor-pointer flex items-center text-gray-500"
                  >
                    {showConfirmPassword ? (
                      <PiEye size={20} />
                    ) : (
                      <LuEyeClosed size={20} />
                    )}
                  </button>
                </div>
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="bg-[#3A4C59] text-white py-2 mt-4 flex justify-between w-full items-center px-5 rounded-lg"
                >
                  {loading ? "Loading..." : "Continue"}{" "}
                  {!loading && <FaArrowRightLong />}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
