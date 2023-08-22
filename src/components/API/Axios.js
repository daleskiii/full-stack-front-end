import axios from "axios";

// const AxiosInstance = axios.create({
//   baseURL:
//     process.env.NODE_ENV === "development"
//       ? "http://localhost:3006"
//       : "https://fullstack-backend-86m7.onrender.com",
//   timeout: 50000,
// });

const BASE_URL =
  process.env.REACT_APP_URL || "https://fullstack-backend-86m7.onrender.com";
const AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

export default AxiosInstance;
