import { ErrorMessage, Field } from "formik";
import { FaUniversity, FaGraduationCap } from "react-icons/fa";
import { AiFillExclamationCircle } from "react-icons/ai";

function RegisterStepThree({
  handleNext,
  handleSkip,
  isSubmitting,
  isValid,
  dirty,
}) {
  return (
    <div className="w-[920px] relative flex items-center justify-center">
      <div className="w-[404px] px-5 py-10">
        <h2 className="font-[rubik] font-bold text-center text-3xl text-[#010318] py-5">
          Academic Information
        </h2>

        {/* University Field */}
        <div className="relative w-full my-4">
          <FaUniversity className="absolute left-3 top-6 transform -translate-y-1/2 text-gray-500 text-xl" />
          <div className="relative">
            <Field
              type="text"
              name="university"
              placeholder="University Name"
              className="w-full py-2 px-10 border font-semibold border-[#010318] opacity-80 rounded-lg mt-1"
            />
            {/* نجمة حمراء */}
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 font-bold text-red-500">
              *
            </span>
          </div>
          <ErrorMessage
            name="university"
            render={(msg) => (
              <div className="text-[14px] text-red-500 font-medium font-[roboto] flex gap-2 items-center my-1">
                <AiFillExclamationCircle size={16} />
                <span>{msg}</span>
              </div>
            )}
          />
        </div>

        {/* Faculty Field */}
        <div className="relative w-full my-4">
          <FaUniversity className="absolute left-3 top-6 transform -translate-y-1/2 text-gray-500 text-xl" />
          <div className="relative">
            <Field
              type="text"
              name="faculty"
              placeholder="Major"
              className="w-full py-2 px-10 border font-semibold border-[#010318] opacity-80 rounded-lg mt-1"
            />
            {/* نجمة حمراء */}
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 font-bold text-red-500">
              *
            </span>
          </div>
          <ErrorMessage
            name="faculty"
            render={(msg) => (
              <div className="text-[14px] text-red-500 font-medium font-[roboto] flex gap-2 items-center my-1">
                <AiFillExclamationCircle size={16} />
                <span>{msg}</span>
              </div>
            )}
          />
        </div>

        {/* Graduation Year Field */}
        <div className="relative w-full my-4">
          <FaGraduationCap className="absolute left-3 top-6 transform -translate-y-1/2 text-gray-500 text-xl" />
          <div className="relative">
            <Field
              as="select"
              name="graduationYear"
              className="w-full py-2 px-10 border font-semibold border-[#010318] opacity-80 rounded-lg mt-1"
            >
              <option value="" disabled>
                Select Graduation Year
              </option>
              {[...Array(50)].map((_, i) => {
                const year = new Date().getFullYear() - i;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </Field>
            {/* نجمة حمراء */}
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 font-bold text-red-500">
              *
            </span>
          </div>
          <ErrorMessage
            name="graduationYear"
            render={(msg) => (
              <div className="text-[14px] text-red-500 font-medium font-[roboto] flex gap-2 items-center my-1">
                <AiFillExclamationCircle size={16} />
                <span>{msg}</span>
              </div>
            )}
          />
        </div>

        {/* Enrollment Year Field */}
        <div className="relative w-full my-4">
          <FaGraduationCap className="absolute left-3 top-6 transform -translate-y-1/2 text-gray-500 text-xl" />
          <div className="relative">
            <Field
              as="select"
              name="enrollmentYear"
              className="w-full py-2 px-10 border font-semibold border-[#010318] opacity-80 rounded-lg mt-1"
            >
              <option value="" disabled>
                Select Year
              </option>
              {[...Array(50)].map((_, i) => {
                const year = new Date().getFullYear() - i;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </Field>
            {/* نجمة حمراء */}
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 font-bold text-red-500">
              *
            </span>
          </div>
          <ErrorMessage
            name="enrollmentYear"
            render={(msg) => (
              <div className="text-[14px] text-red-500 font-medium font-[roboto] flex gap-2 items-center my-1">
                <AiFillExclamationCircle size={16} />
                <span>{msg}</span>
              </div>
            )}
          />
        </div>

        {/* Continue Button */}
        <button
          disabled={isSubmitting || !isValid || !dirty}
          type="submit"
          className={`bg-[#3A4C59] text-white py-2 mt-4 w-full text-center px-5 rounded-lg ${
            !isValid || !dirty
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer"
          }`}
        >
          Continue
        </button>
      </div>

      {/* Skip Button */}
      <div className="absolute top-0 text-end w-full px-20 pt-5">
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

export default RegisterStepThree;
