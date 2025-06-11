import { AxiosError } from "axios";

type BadRequestResponse = {
  message: string;
};

const ERROR_MESSAGE_NETWORK_OR_CORS = "Network or CORS error";
const ERROR_MESSAGE_UNAUTHORIZED = "Not authorized";
const ERROR_MESSAGE_UNAUTHENTICATED = "Not authenticated";
const ERROR_MESSAGE_SERVER = "Server error";
const ERROR_MESSAGE_UNKNOWN = "Unknown error. Please try again";

export function handleApiError(axiosResponseError: AxiosError): Error {
  const error = new Error();

  if (!axiosResponseError.response) {
    error.message = ERROR_MESSAGE_NETWORK_OR_CORS;
    console.error("Response error: ", error.message);
    return error;
  }

  const { status, data } = axiosResponseError.response;

  switch (status) {
    case 400:
      error.message = (data as BadRequestResponse).message;
      break;

    case 401:
      error.message = ERROR_MESSAGE_UNAUTHENTICATED;
      break;

    case 403:
      error.message = ERROR_MESSAGE_UNAUTHORIZED;
      break;

    case 500:
      error.message = ERROR_MESSAGE_SERVER;
      break;

    default:
      error.message = ERROR_MESSAGE_UNKNOWN;
      break;
  }

  console.error("Response error: ", error.message);
  return error;
}
