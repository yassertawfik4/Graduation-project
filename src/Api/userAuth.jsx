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
    const response = await axiosInstance.post("Student/Profiles", profileData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessUsertoken")}`,
      },
    });
    localStorage.setItem("studentId", response.data);
    localStorage.setItem("isStudent", "Student");
    console.log("studentId", response.data);
    return response.data;
  } catch (error) {
    console.log("completeProfile ", error);
    console.log(error);
  }
};
// complete Company Profile
export const completeCompanyProfile = async (profiledata) => {
  try {
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
