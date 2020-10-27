import jwtDecode from "jwt-decode";
import HttpService from "./HttpService";
import { baseUrl } from "../config.json";

const apiEndpoint = `${baseUrl}/auth`;
const tokenKey = "token";

HttpService.setAuthToken(getAuthToken());

async function login(email, password) {
  const authDetails = { email, password };
  const { data: token } = await HttpService.post(apiEndpoint, authDetails);
  localStorage.setItem(tokenKey, token);
}

function loginWithToken(token) {
  localStorage.setItem(tokenKey, token);
}

function logout() {
  localStorage.removeItem(tokenKey);
}

function getCurrentUser() {
  try {
    const token = localStorage.getItem(tokenKey);
    return jwtDecode(token);
  } catch (ex) {
    return null;
  }
}

function getAuthToken() {
  return localStorage.getItem(tokenKey);
}

// function isAdminUser() {
//   const user = getCurrentUser();
//   if (user && user["isAdmin"]) {
//     return true;
//   }

//   return false;
// }

export default {
  login,
  loginWithToken,
  logout,
  getCurrentUser,
  getAuthToken,
  // isAdminUser,
};
