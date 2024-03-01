import apiClient from "./client";
const endpoint = "/user/api/v1/auth";

const registerUser = (data) => apiClient.post(endpoint + "/register-user", data);
const logIn = (data) => apiClient.post(endpoint + "/login", data);
const sendCode = (data) => apiClient.post(endpoint + "/send-code", data);
const verifyCode = (data) => apiClient.post(endpoint + "/verify-code", data);
const changePassword = (data) => apiClient.post(endpoint + "/change-password", data);

export default {
  registerUser,
  logIn,
  sendCode,
  verifyCode,
  changePassword
};
