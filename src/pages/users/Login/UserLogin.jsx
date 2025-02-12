import { Formik, Form, Field } from "formik";
import { ToastContainer, toast } from "react-toastify";

import loginPhoto from "/public/images/loginPhoto.png";
import { useState } from "react";
import { LuEyeClosed } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { PiEye } from "react-icons/pi";
import { userLogin } from "../../../Api/userAuth";
import { FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
function UserLogin() {
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Email Is Required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Invalid Email";
    }

    if (!values.password) {
      errors.password = "Password Is Required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    return errors;
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const data = await userLogin(values.email, values.password);
      console.log(data);

      toast.success("تم تسجيل الدخول بنجاح!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } catch (error) {
      toast.error("فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      console.error("Login Error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="my-16">
      <div className="container mx-auto px-2 flex justify-center">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="flex justify-center gap-24 w-[1032px] rounded-xl py-20 bg-[rgba(153,153,153,0.2)]">
          <div className="w-[444px]">
            <img
              className="w-[444px] h-[444px]"
              src={loginPhoto}
              loading="lazy"
              decoding="async"
              alt="login Photo"
            />
          </div>
          <div className="bg-white w-[436px] rounded-xl">
            <h2 className="font-[rubik] font-semibold text-3xl text-center py-5 text-[#010318CC]">
              Welcome back
            </h2>
            <div className="px-6">
              {/* 🔹 Formik Form */}
              <Formik
                initialValues={initialValues}
                validate={validate}
                onSubmit={handleSubmit}
              >
                {({ values, errors, touched, isSubmitting }) => (
                  <Form className="flex flex-col gap-4">
                    {/* 📌 حقل البريد الإلكتروني */}
                    <div className="relative">
                      <Field
                        type="email"
                        name="email"
                        className="w-full p-2 border border-[#010318] opacity-80 rounded-lg mt-1"
                      />
                      {!values.email && (
                        <div className="absolute text-[#3A4C59] opacity-80 left-3 top-3 flex items-center gap-2 pointer-events-none transition-opacity duration-300">
                          <MdOutlineEmail size={20} />
                          <span className="font-[rubik]">Email</span>
                        </div>
                      )}

                      {errors.email && touched.email && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.email}
                        </div>
                      )}
                    </div>

                    {/* 📌 حقل كلمة المرور مع أيقونة العين */}
                    <div className="relative">
                      <div className="relative">
                        <Field
                          type={showPassword ? "text" : "password"}
                          name="password"
                          className="w-full p-2 border rounded mt-1 pr-10"
                        />
                        {!values.password && (
                          <div className="absolute text-[#3A4C59] opacity-80 left-3 top-3 flex items-center gap-2 pointer-events-none transition-opacity duration-300">
                            <FaLock size={20} />
                            <span className="font-[rubik] ">Password</span>
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
                      {errors.password && touched.password && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.password}
                        </div>
                      )}
                    </div>
                    {/* 📌 Forget Password*/}
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <Field
                          type="checkbox"
                          name="rememberMe"
                          id="rememberMe"
                          className="mr-1"
                        />
                        <label
                          htmlFor="rememberMe"
                          className="text-[14px] text-[#010318CC] font-medium font-[rubik]"
                        >
                          Remember me
                        </label>
                      </div>
                      <div>
                        <Link
                          to="/forgetPassword"
                          className="text-[14px] font-medium font-[rubik] text-[#010318CC] underline"
                        >
                          Forget Password
                        </Link>
                      </div>
                    </div>
                    <div className="text-center my-2">
                      <p className="text-[13px] text-blue-500 font-[rubik] font-medium">
                        Not a part of our community ? 
                        <Link to="/user/register" className="underline"> Create an account</Link>
                      </p>
                    </div>
                    {/* 📌 زر تسجيل الدخول */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-[#3A4C59] text-white py-2 border-2 border-[#3A4C59] cursor-pointer 
                      transition duration-300 ease-in-out rounded-lg font-[rubik] font-medium hover:bg-white hover:text-[#3A4C59]
                       disabled:bg-gray-400"
                    >
                      {isSubmitting ? "Logging in..." : "Log in"}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
