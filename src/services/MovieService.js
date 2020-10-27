import { baseUrl } from "../config.json";

import HttpService from "../services/HttpService";

const apiEndpoint = `${baseUrl}/movies`;

function getMovies() {
  return HttpService.get(apiEndpoint);
}

function getMovie(movieId) {
  return HttpService.get(`${apiEndpoint}/${movieId}`);
}

function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return HttpService.put(`${apiEndpoint}/${movie._id}`, body);
  }

  return HttpService.post(apiEndpoint, movie);
}

function deleteMovie(movieId) {
  return HttpService.delete(`${apiEndpoint}/${movieId}`);
}

export { getMovies, getMovie, saveMovie, deleteMovie };
