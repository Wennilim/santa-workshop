import { serverApi } from "./axios";

type TRequestBody = {
  email: string;
  password: string;
};

export const postLogin = async (body: TRequestBody) => {
  const response = await serverApi.post(`/auth/login`, body);
  return response.data;
};
