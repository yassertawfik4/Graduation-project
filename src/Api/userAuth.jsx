import axiosInstance from "./axiosInstance";

export const userLogin = async (email, password) => {
  try {
    const response = await axiosInstance.post("/user/login", {
      email,
      password,
    });
    localStorage.setItem("accessUsertoken", response.data.token);
    return response.data;
  } catch (error) {
    console.log("User Login", error);
  }
};
export const userRegister = async (name, username, email, password) => {
  try {
    const response = await axiosInstance.post("/user/register", {
      name,
      username,
      email,
      password,
    });
    localStorage.setItem("accessUsertoken", response.data.token);
    return response.data;
  } catch (error) {
    console.log("User Register", error);
  }
};
