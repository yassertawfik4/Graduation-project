import { Form, Formik } from "formik";
import {
  completeCompanyProfile,
  completeStudentProfile,
  userRegister,
} from "../../../Api/userAuth";
import RegisterStepOne from "./RegisterStepOne";
import { useState } from "react";
import StudentFormTwo from "../../../components/StudentProfile/StudentFormTwo";
import StudentFormThree from "../../../components/StudentProfile/StudentFormThree";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import CompanyStepTwo from "../../../components/CompanyRegister/CompanyStepTwo";
import CompanyStepThree from "../../../components/CompanyRegister/CompanyStepThree";

function UserRegister() {
  const [step, setStep] = useState(1);
  const [isStudent, setIsStudent] = useState(true);
  const navigate = useNavigate();
  // Initial values for both student and company
  const initialValues = {
    // Common fields
    username: "",
    email: "",
    password: "",

    // Student specific fields
    fullName: "",
    profilePicture: null,
    bio: "",
    phoneNumber: "",
    age: "",
    gender: "",
    university: "",
    faculty: "",
    graduationYear: "",
    enrollmentYear: "",

    // Company specific fields
    companyName: "",
    taxId: "",
    governorate: "",
    city: "",
    street: "",
    industry: "",
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
      if (isStudent) {
        // Student validation for step 2
        if (!values.fullName) errors.fullName = "Full Name is required";
        if (!values.gender) errors.gender = "Gender is required";
        if (!values.phoneNumber) {
          errors.phoneNumber = "Phone Number is required";
        } else if (!/^\+?\d+$/.test(values.phoneNumber)) {
          errors.phoneNumber =
            "Phone Number must contain only numbers with optional + prefix";
        }
      } else {
        // Company validation for step 2
        if (!values.companyName)
          errors.companyName = "Company Name is required";
        if (!values.taxId) errors.taxId = "Tax ID is required";
        if (!values.governorate) errors.governorate = "Governorate is required";
        // Industry check moved to step 3 or set a default value
      }
    }

    if (step === 3) {
      if (isStudent) {
        // Student validation for step 3
        if (!values.university)
          errors.university = "University Name Is Required";
        if (!values.faculty) errors.faculty = "Major Name Is Required";
        if (!values.graduationYear)
          errors.graduationYear = "Graduation Year Name Is Required";
        if (!values.enrollmentYear)
          errors.enrollmentYear = "Entry Year Year Name Is Required";
      } else {
        // Company validation for step 3
        if (!values.industry) errors.industry = "Industry is required";
        if (!values.city) errors.city = "City is required";
        if (!values.street) errors.street = "Street is required";
      }
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
          Swal.fire({
            icon: "success",
            title: "Registration Successful",
            text: "Proceed to complete your profile.",
          });
          handleNext();
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            html: "<strong>Registration failed, Please try again.</strong>",
          });
        }
      } else {
        // Prepare profile data based on user type
        let response;
        try {
          if (isStudent) {
            const formData = new FormData();
            // Ensure all required fields are included and formatted correctly
            formData.append("fullName", values.fullName);
            formData.append("university", values.university);
            formData.append("faculty", values.faculty);
            formData.append("graduationYear", values.graduationYear);
            formData.append("enrollmentYear", values.enrollmentYear);
            formData.append("age", values.age);
            formData.append("gender", values.gender);
            formData.append("phoneNumber", values.phoneNumber);
            formData.append("bio", values.bio || "");

            // Handle file upload correctly
            if (values.profilePicture instanceof File) {
              formData.append("profilePicture", values.profilePicture);
            }

            // Log the form data for debugging
            for (let pair of formData.entries()) {
              console.log(pair[0] + ": " + pair[1]);
            }

            // Call backend API that accepts FormData
            response = await completeStudentProfile(formData);
            console.log("Profile completed successfully:", response);
          } else {
            const formData = new FormData();
            formData.append("companyName", values.companyName);
            formData.append("industry", values.industry);
            formData.append("governorate", values.governorate);
            formData.append("taxId", values.taxId);
            formData.append("city", values.city);
            formData.append("street", values.street);
            formData.append("logo", values.profilePicture);
            // Log the form data for debugging
            for (let pair of formData.entries()) {
              console.log(pair[0] + ": " + pair[1]);
            }
            // Call company-specific endpoint
            response = await completeCompanyProfile(formData);
          }

          if (response) {
            Swal.fire({
              icon: "success",
              title: "Profile Completed!",
              text: "Your profile has been successfully updated.",
            });
            navigate("/");
          }
        } catch (error) {
          console.error("Submission error:", error);
          let errorMessage = "Failed to complete profile.";

          if (
            error.response &&
            error.response.data &&
            error.response.data.errors
          ) {
            const errorData = error.response.data.errors;
            const errorDetails = Object.entries(errorData)
              .map(([field, msgs]) => `${field}: ${msgs.join(", ")}`)
              .join("\n");

            errorMessage = `Validation errors:\n${errorDetails}`;
          }

          Swal.fire({
            icon: "error",
            title: "Error",
            text: errorMessage,
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
        <div className="bg-[rgba(153,153,153,0.2)] rounded-lg my-14">
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
                {step === 2 && isStudent && (
                  <StudentFormTwo
                    handleNext={handleNext}
                    handleSkip={() =>
                      handleSkipWithValidation(values, setErrors, setTouched)
                    }
                    isSubmitting={isSubmitting}
                    isValid={isValid}
                    dirty={dirty}
                    values={values}
                  />
                )}
                {step === 2 && !isStudent && (
                  <CompanyStepTwo
                    handleNext={handleNext}
                    handleSkip={() =>
                      handleSkipWithValidation(values, setErrors, setTouched)
                    }
                    isSubmitting={isSubmitting}
                    isValid={isValid}
                    dirty={dirty}
                    values={values}
                  />
                )}
                {step === 3 && isStudent && (
                  <StudentFormThree
                    isSubmitting={isSubmitting}
                    isValid={isValid}
                    dirty={dirty}
                    handleSkip={() =>
                      handleSkipWithValidation(values, setErrors, setTouched)
                    }
                  />
                )}
                {step === 3 && !isStudent && (
                  <CompanyStepThree
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
