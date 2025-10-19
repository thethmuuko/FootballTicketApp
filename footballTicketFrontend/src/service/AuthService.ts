import type { RegisterDto } from "../dto/RegisterDto";
import type { LoginDto } from "../dto/LoginDto";
import API from "./axiosInstance";

const AUTH_BASE_URL = "/auth";

export const registerUser = (registerDto: RegisterDto) =>
  API.post(`${AUTH_BASE_URL}/register`, registerDto);

export const loginUser = (loginDto: LoginDto) =>
  API.post(`${AUTH_BASE_URL}/login`, loginDto);

export const refreshToken = () =>
  API.post(`${AUTH_BASE_URL}/refresh`, {}, { withCredentials: true });

// local/session storage helpers
export const setToken = (token: string) => localStorage.setItem("token", token);
export const getToken = () => localStorage.getItem("token");

export const setLoginUserEmail = (email: string) =>
  sessionStorage.setItem("loginEmail", email);
export const getLoginUserEmail = () => sessionStorage.getItem("loginEmail");

export const setLoginUserPassword = (password: string) =>
  sessionStorage.setItem("loginPassword", password);
export const getLoginUserPassword = () =>
  sessionStorage.getItem("loginPassword");

export const setLoginUserRole = (role: string) =>
  sessionStorage.setItem("loginRole", role);
export const getLoginUserRole = () => sessionStorage.getItem("loginRole");

export const logout = () => {
  sessionStorage.clear();
  localStorage.removeItem("token");
};

export const isLoginedIn = () => getLoginUserEmail() !== null;
