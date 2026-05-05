import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api/v1";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

function clearAuthData() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("token");
  localStorage.removeItem("role");
}

function isAuthPage() {
  return (
    window.location.pathname === "/login" ||
    window.location.pathname === "/register"
  );
}

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if ((status === 401 || status === 403) && !isAuthPage()) {
      clearAuthData();

      const currentPath = window.location.pathname + window.location.search;

      window.location.href = `/login?expired=1&next=${encodeURIComponent(
        currentPath
      )}`;
    }

    return Promise.reject(error);
  }
);

export function getApiError(error, fallback = "Ошибка запроса") {
  const status = error?.response?.status;

  if (status === 401 || status === 403) {
    return "Сессия истекла. Пожалуйста, войдите снова.";
  }

  const detail = error?.response?.data?.detail;

  if (typeof detail === "string") {
    return detail;
  }

  if (Array.isArray(detail)) {
    return detail
      .map((item) => item?.msg || item?.message || JSON.stringify(item))
      .join(", ");
  }

  if (detail) {
    return JSON.stringify(detail);
  }

  if (error?.message) {
    return error.message;
  }

  return fallback;
}