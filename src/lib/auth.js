import { api } from "./api";

export function normalizeRole(role) {
  if (!role) return "patient";

  const value = String(role).toLowerCase();

  if (value === "patient") return "patient";
  if (value === "user") return "patient";

  return "patient";
}

export function saveAuth({ accessToken, refreshToken, role = "patient" }) {
  localStorage.setItem("access_token", accessToken);
  localStorage.setItem("refresh_token", refreshToken || "");
  localStorage.setItem("role", normalizeRole(role));
}

export function clearAuth() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("role");
}

export function getToken() {
  return localStorage.getItem("access_token");
}

export function getRefreshToken() {
  return localStorage.getItem("refresh_token");
}

export function getRole() {
  return normalizeRole(localStorage.getItem("role"));
}

export function isAuthenticated() {
  return Boolean(getToken());
}

export async function loginRequest({ email, password }) {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  const accessToken = response.data?.access_token;
  const refreshToken = response.data?.refresh_token;

  if (!accessToken) {
    throw new Error("Backend не вернул access_token");
  }

  /**
   * Backend /auth/login возвращает access_token и refresh_token,
   * но role в ответе не возвращает. В системе сейчас разрешена только роль patient.
   */
  saveAuth({
    accessToken,
    refreshToken,
    role: "patient",
  });

  return response.data;
}

export async function registerRequest({ email, password }) {
  const response = await api.post("/auth/register", {
    email,
    password,
    role: "patient",
  });

  return response.data;
}

export async function meRequest() {
  const response = await api.get("/auth/me");
  return response.data;
}

export async function refreshTokenRequest() {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    throw new Error("Refresh token отсутствует");
  }

  const response = await api.post("/auth/refresh", {
    refresh_token: refreshToken,
  });

  const accessToken = response.data?.access_token;
  const newRefreshToken = response.data?.refresh_token;

  if (!accessToken) {
    throw new Error("Backend не вернул access_token");
  }

  saveAuth({
    accessToken,
    refreshToken: newRefreshToken,
    role: "patient",
  });

  return response.data;
}