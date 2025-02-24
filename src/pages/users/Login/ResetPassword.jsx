import { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { FaArrowRightLong, FaLock } from "react-icons/fa6";
import { resetUserPassword } from "../../../Api/userAuth";
import { toast, ToastContainer } from "react-toastify";
import { PiEye } from "react-icons/pi";
import { LuEyeClosed } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const email = queryParams.get("email");
  const initialValues = {
    email: email || "",
    resetCode: token || "",
    newPassword: "",
    confirmPassword: "",
  };
  const validate = (values) => {
    const errors = {};
    if (!values.newPassword) {
      errors.newPassword = "Password is required";
    } else if (values.newPassword.length < 6) {
      errors.newPassword = "Password must be at least 6 characters long";
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (values.confirmPassword !== values.newPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };
  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      const data = await resetUserPassword({
        email: values.email,
        resetCode: values.resetCode,
        newPassword: values.newPassword,
      });
      if (data) {
        toast.success("Update password successfully", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.error("Failed to update password. Please try again.", {
        position: "top-right",
        autoClose: 2000,
      });
      console.log(error);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };
  useEffect(() => {
    if (token && email) {
      setIsValid(true);
    } else {
      navigate("/user/login");
    }
  }, [token, email, navigate]);

  if (!isValid) {
    return null;
  }
  return (
    <div className="flex justify-center items-center my-16">
      <ToastContainer position="top-right" autoClose={5000} />
      <div className="bg-[rgba(153,153,153,0.2)] w-[1032px] h-[672px] rounded-xl flex justify-center items-center">
        <div className="text-center ">
          <h2 className="font-[rubik] font-bold text-3xl text-[#010318] py-5">
            Enter your new password
          </h2>
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, isValid, dirty, errors, touched }) => (
              <Form className="mt-5">
                <div className="relative w-full my-5">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className="w-full py-2 px-10 border border-[#010318] rounded-lg font-medium"
                  />
                  {errors.newPassword && touched.newPassword && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.newPassword}
                    </div>
                  )}
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
                  {errors.confirmPassword && touched.confirmPassword && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.confirmPassword}
                    </div>
                  )}
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
                  disabled={isSubmitting || !isValid || !dirty}
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
