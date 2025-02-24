import { Form, Formik } from "formik";
import { completeProfile, userRegister } from "../../../Api/userAuth";
import RegisterStepOne from "./RegisterStepOne";
import { useState } from "react";
import StudentFormTwo from "../../../components/StudentProfile/StudentFormTwo";
import StudentFormThree from "../../../components/StudentProfile/StudentFormThree";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function UserRegister() {
  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState(null);
  const [IsStudent, setIsStudent] = useState(false);
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    email: "",
    password: "",
    fullName: "",
    image: null,
    bio: "",
    age: "",
    phoneNumber: "",
    gender: "",
    university: "",
    faculty: "",
    graduationYear: "",
    enrollmentYear: "",
  };
  const handleNext = () => setStep((prev) => prev + 1);
  const handleSkip = () => setStep((prev) => prev + 1);
  const handleSkipWithValidation = (values, setErrors, setTouched) => {
    const errors = validate(values);

    if (Object.keys(errors).length > 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        html: "<strong>Please fill in all required fields before skipping.</strong>",
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          const touchedFields = {};
          Object.keys(errors).forEach((field) => {
            touchedFields[field] = true;
          });

          setTouched(touchedFields);
          setErrors(errors);
        }
      });
    } else {
      handleSkip();
    }
  };
  const validate = (values) => {
    const errors = {};
    if (step === 1) {
      if (!values.username) errors.username = "Username is required";
      if (!values.email) errors.email = "Email is required";
      if (!values.password) errors.password = "Password is required";
    }
    if (step === 2) {
      if (!values.fullName) errors.fullName = "Full Name is required";

      if (!values.phoneNumber) {
        errors.phoneNumber = "Phone Number is required";
      } else if (!/^\d+$/.test(values.phoneNumber)) {
        errors.phoneNumber = "Phone Number must contain only numbers";
      } else if (!/^0\d{10}$/.test(values.phoneNumber)) {
        errors.phoneNumber =
          "Phone Number must start with 0 and be exactly 11 digits";
      }
    }
    if (step === 3) {
      if (!values.university) errors.university = "University Name Is Required";
      if (!values.faculty) errors.faculty = "Major Name Is Required";
      if (!values.graduationYear)
        errors.graduationYear = "Graduation Year Name Is Required";
      if (!values.enrollmentYear)
        errors.enrollmentYear = " Entry Year Year Name Is Required";
    }
    return errors;
  };
  const handleSubmit = async (values) => {
    try {
      if (step === 1) {
        const data = await userRegister(
          values.email,
          values.username,
          values.password
        );
        if (data) {
          console.log(data);
          setUserId(data);
          Swal.fire({
            icon: "success",
            title: "Registration Successful",
            text: "Proceed to complete your profile.",
          });
          // if (IsStudent) {
          //   navigate("/register/complete-student-profile");
          // } else {
          //   navigate("/register/complete-company-profile");
          // }
          handleNext();
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            html: "<strong>Registration failed,Please try again.</strong>",
          });
        }
        console.log("Registration successful:", data);
      } else {
        const formData = new FormData();
        formData.append("userId", userId);
        for (const key in values) {
          if (!["username", "email", "password"].includes(key)) {
            formData.append(key, values[key]);
          }
        }
        const response = await completeProfile(formData);
        if (response && response.success) {
          Swal.fire({
            icon: "success",
            title: "Profile Completed!",
            text: "Your profile has been successfully updated.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to complete profile.",
          });
        }
      }
    } catch (err) {
      console.error("Submission failed:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong. Please try again.",
      });
    }
  };
  return (
    <div className="">
      <div className="container mx-auto px-2">
        <div className=" md:bg-[rgba(153,153,153,0.2)] rounded-lg my-14">
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={handleSubmit}
          >
            {({
              values,
              isSubmitting,
              isValid,
              dirty,
              handleSubmit,
              setErrors,
              setTouched,
            }) => (
              <Form
                onSubmit={handleSubmit}
                className="flex items-center justify-center"
              >
                {step === 1 && (
                  <RegisterStepOne
                    handleSubmit={handleSubmit}
                    setIsStudent={setIsStudent}
                  />
                )}
                {step === 2 && (
                  <StudentFormTwo
                    handleNext={handleNext}
                    handleSkip={() =>
                      handleSkipWithValidation(values, setErrors, setTouched)
                    }
                    isSubmitting={isSubmitting}
                    isValid={isValid}
                    dirty={dirty}
                  />
                )}
                {step === 3 && (
                  <StudentFormThree
                    isSubmitting={isSubmitting}
                    isValid={isValid}
                    dirty={dirty}
                    handleSkip={() =>
                      handleSkipWithValidation(values, setErrors, setTouched)
                    }
                  />
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default UserRegister;
