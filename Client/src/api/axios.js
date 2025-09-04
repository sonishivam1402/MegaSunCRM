import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Attach JWT token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 and refresh access token
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and not retried already
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          // No refresh token, force logout
          localStorage.clear();
          window.location.href = "/login";
          return Promise.reject(error);
        }

        // Call refresh API
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refreshToken`,
          { refreshToken }
        );

        if (res.data.accessToken) {
          // Save new token
          localStorage.setItem("token", res.data.accessToken);

          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
          return API(originalRequest);
        } else {
          // No access token in response
          localStorage.clear();
          window.location.href = "/login";
          return Promise.reject(error);
        }
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    // // Don't log 401 errors at all - they're handled by the refresh logic
    // if (error.response?.status !== 401) {
    //   console.error("API error:", error);
    // }

    return Promise.reject(error);
  }
);

export default API;