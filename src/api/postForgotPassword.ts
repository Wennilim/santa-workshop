import { serverApi } from "./axios";

type TRequestBody = {
  email: string;
};

export const postForgotPassword = async (body: TRequestBody) => {
  const response = await serverApi.post(`/auth/forgotPassword`, body);
  return response.data;
};
