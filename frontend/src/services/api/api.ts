import axios from "axios";
import { config } from "../../config";
import { handleApiError } from "./error_handlers";

export type ApiResponse<T> = [results: T | null, error: Error | null];

const api = axios.create({
  baseURL: config.apiBaseURL,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const error: Error = handleApiError(err);
    return Promise.reject(error);
  },
);

export default api;
