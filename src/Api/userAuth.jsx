import axiosInstance from "./axiosInstance";

export const userLogin = async (email, password) => {
  try {
    const response = await axiosInstance.post("/Identity/Login", {
      email,
      password,
    });
    console.log("User Login", response.data);
    return response.data;
  } catch (error) {
    console.log("User Login", error);
  }
};
export const userRegister = async (email, username, password) => {
  try {
    const response = await axiosInstance.post("Identity/Register", {
      email,
      username,
      password,
    });
    console.log(response);
    localStorage.setItem("accessUsertoken", response.data);
    return response.data;
  } catch (error) {
    console.log("User Register", error.response?.data || error.message);
  }
};

export const forgetPassword = async (email) => {
  try {
    const response = await axiosInstance.post("Identity/ForgotPassword", {
      email,
    });
    return response.data;
  } catch (error) {
    console.log("User forgetPassword", error);
  }
};
export const resetUserPassword = async (email, resetCode, newPassword) => {
  try {
    const response = await axiosInstance.post("Identity/ResetPassword", {
      email,
      resetCode,
      newPassword,
    });
    return response.data;
  } catch (error) {
    console.log("User ResetPassword", error);
  }
};

export const logOut = async () => {
  try {
    const response = await axiosInstance.post(
      "Identity/Logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessUsertoken")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("User LogOut", error);
  }
};
// complete Student Profile
export const completeStudentProfile = async (profileData) => {
  try {
    // Log all fields being sent for debugging
    console.log("Sending profile data to API:");
    for (let [key, value] of profileData.entries()) {
      console.log(`${key}: ${value instanceof File ? value.name : value}`);
    }

    const response = await axiosInstance.post("Student/Profiles", profileData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessUsertoken")}`,
        // Important: Do not manually set Content-Type for FormData
      },
    });

    localStorage.setItem("studentId", response.data);
    localStorage.setItem("isStudent", "Student");
    console.log("studentId", response.data);
    return response.data;
  } catch (error) {
    console.log("completeProfile error:", error);
    if (error.response) {
      console.log("Error response data:", error.response.data);
      console.log("Error response status:", error.response.status);
      console.log("Error response headers:", error.response.headers);
    }
    throw error; // Re-throw the error so it can be caught in the component
  }
};

// complete Company Profile
export const completeCompanyProfile = async (profiledata) => {
  try {
    console.log("Sending profile data to API:");
    for (let [key, value] of profiledata.entries()) {
      console.log(`${key}: ${value instanceof File ? value.name : value}`);
    }
    const response = await axiosInstance.post(`Company/profiles`, profiledata, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessUsertoken")}`,
      },
    });

    localStorage.setItem("isCompany", "Company");
    localStorage.setItem("companyId", response.data);

    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
};
export const fetchStudentProfile = async () => {
  try {
    const response = await axiosInstance.get("Student/profiles/basic/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessUsertoken")}`,
      },
    });

    localStorage.setItem("isStudent", "Student");
    localStorage.setItem("studentId", response.data); // نخزن ال StudentID

    return response.data;
  } catch (error) {
    console.error("Error fetching student profile:", error);
    return null;
  }
};
