import axiosInstance from "./axiosInstance";

export const userLogin = async (email, password) => {
  try {
    const response = await axiosInstance.post("/Identity/Login", {
      email,
      password,
    });
    console.log(response);
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
    localStorage.setItem("userId", response.data);
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

export const completeProfile = async (values) => {
  try {
    const response = await axiosInstance.post("Student/profiles", values, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("userId")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("completeProfile ", error);
  }
};
