// /**
//  * src/api/axiosInstance.js
//  * Axios setup for connecting React frontend with backend.
//  */

// import axios from "axios";

// // Base Axios instance
// const axiosInstance = axios.create({
//   baseURL: "http://localhost:8000/api", // ✅ your backend API base
//   withCredentials: true, // enable cookies for refresh tokens
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // 🧩 Request Interceptor — add access token to all requests
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("access_token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // 🧩 Response Interceptor — auto-refresh token if expired
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (
//       error.response &&
//       error.response.status === 401 &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;
//       try {
//         const { data } = await axios.post(
//           "http://localhost:8000/api/auth/refresh",
//           {},
//           { withCredentials: true }
//         );

//         const newToken = data.data.accessToken;
//         localStorage.setItem("access_token", newToken);

//         originalRequest.headers.Authorization = `Bearer ${newToken}`;
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         console.error("Token refresh failed:", refreshError);
//         localStorage.removeItem("access_token");
//         window.location.href = "/login"; // Redirect to login
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;


/**
 * src/api/axiosInstance.js
 * Axios setup with silent token refresh + SweetAlert2 session handling.
 */

import axios from "axios";
import Swal from "sweetalert2";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api", // ✅ backend base URL
  withCredentials: true, // include cookies for refresh tokens
  headers: {
    "Content-Type": "application/json",
  },
});

// 🧩 Request Interceptor — attach access token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// 🧩 Response Interceptor — handle expired token automatically
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Token expired and not retried yet
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        // 🔁 Request new access token using refresh token cookie
        const { data } = await axios.post(
          "http://localhost:8000/api/auth/refresh",
          {},
          { withCredentials: true }
        );

        const newToken = data.data.accessToken;
        localStorage.setItem("access_token", newToken);

        // 🧠 Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);

        // ❌ Both tokens expired → logout + show alert
        Swal.fire({
          icon: "warning",
          title: "Session Expired",
          text: "Please log in again to continue.",
          confirmButtonText: "OK",
          confirmButtonColor: "#e11d48",
        }).then(() => {
          localStorage.removeItem("access_token");
          localStorage.removeItem("user");
          window.location.href = "/login";
        });
      }
    }

    // Other error types (for clarity)
    if (error.response?.status === 403) {
      Swal.fire("Access Denied", "You don’t have permission to perform this action.", "error");
    } else if (error.response?.status === 404) {
      Swal.fire("Not Found", "The requested resource was not found.", "error");
    } else if (error.response?.status >= 500) {
      Swal.fire("Server Error", "Something went wrong on the server.", "error");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
