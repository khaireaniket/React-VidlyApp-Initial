import { baseUrl } from "../config.json";

import HttpService from "../services/HttpService";

const apiEndpoint = `${baseUrl}/genres`;

function getGenres() {
  return HttpService.get(apiEndpoint);
}

export { getGenres };
