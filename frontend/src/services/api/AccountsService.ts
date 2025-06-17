import api, { type ApiResponse } from "./api";

type SignupArgs = {
  email: string;
  password: string;
};

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

export default {
  postSignup,
};
