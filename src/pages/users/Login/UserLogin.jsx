import { Formik, Form, Field } from "formik";
import { ToastContainer, toast } from "react-toastify";

import loginPhoto from "/public/images/loginPhoto.png";
import { useState } from "react";
import { LuEyeClosed } from "react-icons/lu";
import { PiEye } from "react-icons/pi";
import { userLogin } from "../../../Api/userAuth";
import { FaGithub, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
function UserLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
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
      if (data) {
        localStorage.setItem("accessUsertoken", data);

        toast.success("You have successfully logged in!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });

        navigate("/");
      } else {
        toast.error("Login failed. Please try again.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error("Login failed. Please try again.", {
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
        <div className="flex justify-center gap-24 lg:w-[1032px] w-[600px] rounded-xl md:py-20 py-10 shadow-2xl lg:shadow-none md:bg-[rgba(153,153,153,0.2)]">
          <div className="w-[444px] lg:block hidden">
            <img
              className="w-[444px] h-[444px]"
              src={loginPhoto}
              loading="lazy"
              decoding="async"
              alt="login Photo"
            />
          </div>
          <div className="bg-white md:w-[436px] w-[343px] rounded-xl">
            <h2 className="font-[rubik] font-semibold text-3xl text-center py-5 text-[#010318CC]">
              Welcome back
            </h2>
            <div className="px-6">
              <Formik
                initialValues={initialValues}
                validate={validate}
                onSubmit={handleSubmit}
              >
                {({ errors, touched, isSubmitting, isValid, dirty }) => (
                  <Form className="flex flex-col gap-4">
                    <div className="relative w-full">
                      <MdEmail className="absolute left-3 top-6 transform -translate-y-1/2 text-gray-500 text-xl" />
                      <Field
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full py-2 px-10 border border-[#010318] opacity-80 rounded-lg mt-1"
                      />

                      {errors.email && touched.email && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.email}
                        </div>
                      )}
                    </div>

                    <div className="relative">
                      <div className="relative">
                        <FaLock className="absolute left-3 top-6 transform -translate-y-1/2 text-gray-500 text-xl" />

                        <Field
                          type={showPassword ? "text" : "password"}
                          name="password"
                          placeholder="Password"
                          className="w-full py-2 px-10 border rounded mt-1 pr-10"
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
                      {errors.password && touched.password && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.password}
                        </div>
                      )}
                    </div>
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
                          to="/user/forgetPassword"
                          className="text-[14px] font-medium font-[rubik] text-[#010318CC] underline"
                        >
                          Forget Password
                        </Link>
                      </div>
                    </div>
                    <div className="text-center my-2">
                      <p className="text-[13px] font-[rubik] font-medium">
                        Not a part of our community ?
                        <Link
                          to="/user/register"
                          className="underline text-blue-500 "
                        >
                          {" "}
                          Create an account
                        </Link>
                      </p>
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting || !isValid || !dirty}
                      className={`bg-[#3A4C59] text-white py-2 border-2 border-[#3A4C59] 
                      transition duration-300 ease-in-out rounded-lg font-[rubik] font-medium 
                       disabled:bg-gray-400
                       ${
                         !isValid || !dirty
                           ? "opacity-50 cursor-not-allowed"
                           : "cursor-pointer hover:bg-white hover:text-[#3A4C59]"
                       }
                       `}
                    >
                      {isSubmitting ? "Logging in..." : "Log in"}
                    </button>
                    <div className="text-center pb-7">
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
