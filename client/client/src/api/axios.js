import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
});

// =========================
// REQUEST INTERCEPTOR
// =========================
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// =========================
// RESPONSE INTERCEPTOR (IMPORTANT)
// =========================
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("❌ API ERROR:", {
      message: error.response?.data?.message || error.message,
      status: error.response?.status,
      data: error.response?.data,
    });

    // Optional: auto-handle unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;