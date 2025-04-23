import { ErrorMessage, Field } from "formik";
import { AiFillExclamationCircle } from "react-icons/ai";
import { FaUserTie } from "react-icons/fa";

function CompanyStepThree({ handleNext, isSubmitting, isValid, dirty }) {
  return (
    <div className="py-8">
      <h2 className="font-[rubik] font-bold text-center sm:text-3xl text-xl text-[#010318] py-5">
        Founding Infos
      </h2>
      {/*name Company*/}
      <div className="relative w-full my-4">
        <FaUserTie className="absolute left-3 top-6 transform -translate-y-1/2 text-gray-500 text-xl" />
        <div className="relative">
          <Field
            type="text"
            name="fullName"
            placeholder="Company Name"
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
      <div className="relative w-full my-4">
        <FaUserTie className="absolute left-3 top-6 transform -translate-y-1/2 text-gray-500 text-xl" />
        <div className="relative">
          <Field
            type="text"
            name="fullName"
            placeholder="Company Name"
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
      {/*address Company*/}
      <div className=" w-full my-4">
        <Field
          as="textarea"
          name="address"
          id="address"
          placeholder="Address"
          className="w-full py-2 px-4 border font-semibold border-[#010318] opacity-80 rounded-lg mt-1"
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
        Finish
      </button>
    </div>
  );
}

export default CompanyStepThree;
