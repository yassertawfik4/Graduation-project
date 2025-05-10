import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
  transformRequest: [
    function (data, headers) {
      // Remove Content-Type header for FormData to let browser set it correctly with boundary
      if (data instanceof FormData) {
        delete headers["Content-Type"];
        return data;
      }

      // For JSON data, keep the default transformation
      if (typeof data === "object" && !(data instanceof FormData)) {
        headers["Content-Type"] = "application/json";
        return JSON.stringify(data);
      }

      return data;
    },
  ],
});

export default axiosInstance;
