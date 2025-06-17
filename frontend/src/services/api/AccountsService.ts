import api, { type ApiResponse } from "./api";

type SignupArgs = {
  email: string;
  password: string;
};
type LoginArgs = SignupArgs;

async function postSignup(data: SignupArgs): Promise<ApiResponse<number>> {
  try {
    const response = await api.post("/accounts/signup", {
      data,
    });
    return [response.status, null];
  } catch (error) {
    console.error("Error signing up: ", (error as Error).message);
    return [null, error as Error];
  }
}

async function postLogin(data: LoginArgs): Promise<ApiResponse<number>> {
  try {
    const response = await api.post("/accounts/login", { data });
    return [response.status, null];
  } catch (error) {
    console.error("Error logging in: ", (error as Error).message);
    return [null, error as Error];
  }
}

export default {
  postSignup,
  postLogin,
};
