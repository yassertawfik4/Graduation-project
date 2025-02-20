import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { forgetPassword } from "../../../Api/userAuth";
import { toast, ToastContainer } from "react-toastify";

const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Email Is Required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Invalid Email";
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
            Verify Your Identity
          </h2>
          <p className="text-[#3A4C59] font-[roboto]">
            Enter your email to receive reset code
          </p>

          <Formik
            initialValues={{ email: "" }}
            validate={validate}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="mt-5">
                <div className="relative w-full">
                  <MdOutlineEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full py-2 px-10 border border-[#010318] rounded-lg font-medium"
                  />
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

export default ForgetPassword;
