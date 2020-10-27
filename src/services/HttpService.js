import axios from "axios";
import { toast } from "react-toastify";
import LoggerService from "./LoggerService";

axios.interceptors.response.use(null, (error) => {
  if (error && error.response && error.response.status >= 500) {
    LoggerService.log(error);
    toast.error("Unexpected error occurred");
  }

  return Promise.reject(error);
});

function setAuthToken(token) {
  axios.defaults.headers.common["x-auth-token"] = token;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setAuthToken,
};
