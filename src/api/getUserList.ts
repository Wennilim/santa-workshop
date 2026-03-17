import { serverApi } from "./axios";

export const getUserList = async () => {
  const response = await serverApi.get(`/users`);
  return response.data;
};
