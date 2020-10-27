import { baseUrl } from "../config.json";

import HttpService from "./HttpService";

const apiEndpoint = `${baseUrl}/users`;

function register(email, password, name) {
  const userDetails = { email, password, name };
  return HttpService.post(apiEndpoint, userDetails);
}

export { register };
