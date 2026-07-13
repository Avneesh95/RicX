import axios from "axios";

const hostname = window.location.hostname;

// 1. Explicitly isolate local development environments
const isLocalEnv = 
  hostname === "localhost" || 
  hostname === "127.0.0.1" || 
  hostname.startsWith("192.168.") || 
  hostname.endsWith(".local");

// 2. FORCE OPTION 1: Override local logic entirely to use the production URL
const liveBaseURL = "https://ricx.onrender.com/api";

const api = axios.create({
  baseURL: liveBaseURL,
});

// For absolute confirmation during testing, log the resolved string out
console.log("🚀 Custom Axios BaseURL Initialized to (FORCED LIVE):", liveBaseURL);

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
  (error) => Promise.reject(error)
);

// =========================
// RESPONSE INTERCEPTOR
// =========================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("❌ API ERROR:", {
      message: error.response?.data?.message || error.message,
      status: error.response?.status,
      data: error.response?.data,
    });

    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;